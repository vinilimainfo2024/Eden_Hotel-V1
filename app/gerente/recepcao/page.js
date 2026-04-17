'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function GestaoRecepcionistas() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recepcionistas, setRecepcionistas] = useState([]);
  const router = useRouter();
  const supabase = createClient();
  
  // Estado inicial com todos os campos solicitados
  const [formData, setFormData] = useState({
    nome: '', 
    email: '', 
    cpf: '', 
    rg: '', 
    endereco: '', 
    telefone: '', 
    horario: '', 
    login: '', 
    senha: ''
  });

  // Função para carregar a lista de recepcionistas (RF011)
  const fetchRecepcionistas = async () => {
    const { data, error } = await supabase
      .from('recepcionistas')
      .select('*')
      .order('nome_completo', { ascending: true });
    
    if (error) console.error("Erro ao buscar:", error.message);
    else setRecepcionistas(data || []);
  };

  useEffect(() => {
    fetchRecepcionistas();
  }, []);

  // Função para eliminar recepcionista (RF011)
  const handleExcluir = async (id, nome) => {
    if (confirm(`Deseja remover ${nome} do sistema?`)) {
      const { error } = await supabase
        .from('recepcionistas')
        .delete()
        .eq('id', id);
      
      if (error) alert("Erro ao excluir: " + error.message);
      else fetchRecepcionistas();
    }
  };

  // Função para cadastrar (RF010)
  const handleCadastrar = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Cria o utilizador no Supabase Auth (Login)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
      });

      if (authError) throw authError;

      // 2. Insere os dados detalhados na tabela 'recepcionistas'
      const { error: dbError } = await supabase.from('recepcionistas').insert([
        {
          id: authData.user.id, // Liga o Auth à Tabela
          nome_completo: formData.nome,
          email: formData.email,
          cpf: formData.cpf,
          rg: formData.rg,
          endereco: formData.endereco,
          telefone: formData.telefone,
          horario: formData.horario,
          login: formData.login
        }
      ]);

      if (dbError) throw dbError;

      alert("Recepcionista cadastrado com sucesso!");
      setShowModal(false);
      setFormData({ nome: '', email: '', cpf: '', rg: '', endereco: '', telefone: '', horario: '', login: '', senha: '' });
      fetchRecepcionistas();

    } catch (error) {
      alert("Erro no cadastro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 font-poppins relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C6A85B]/5 rounded-full blur-[100px] pointer-events-none" />

      <header className="max-w-7xl mx-auto mb-12 relative z-10 flex justify-between items-center">
        <div>
          <button onClick={() => router.push('/gerente/dashboard')} className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 block hover:text-[#C6A85B] transition-colors">
            ← Voltar para Dashboard
          </button>
          <h1 className="text-3xl font-light tracking-tighter">
            EQUIPE DE <span className="font-black text-[#C6A85B] uppercase italic">Receção</span>
          </h1>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#C6A85B] text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
        >
          + Contratar Recepcionista
        </button>
      </header>

      {/* Tabela de Recepcionistas */}
      <section className="max-w-7xl mx-auto relative z-10">
        <div className="bg-black/60 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/5">
                <th className="px-10 py-6 font-bold">Nome / Login</th>
                <th className="px-10 py-6 font-bold">Horário</th>
                <th className="px-10 py-6 font-bold">Contacto</th>
                <th className="px-10 py-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recepcionistas.length > 0 ? (
                recepcionistas.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-10 py-5">
                      <p className="font-medium uppercase italic">{r.nome_completo}</p>
                      <p className="text-[10px] text-[#C6A85B]">User: {r.login}</p>
                    </td>
                    <td className="px-10 py-5 font-light">{r.horario}</td>
                    <td className="px-10 py-5 text-gray-400 font-light">
                      {r.email}<br/>{r.telefone}
                    </td>
                    <td className="px-10 py-5 text-center">
                      <button 
                        onClick={() => handleExcluir(r.id, r.nome_completo)}
                        className="text-[10px] uppercase font-black text-red-500 hover:underline"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-10 py-20 text-center text-gray-600 uppercase text-[10px] tracking-widest italic">
                    Nenhum recepcionista encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal de Cadastro */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="relative w-full max-w-[600px] bg-[#0A0A0A] border border-white/10 p-10 rounded-[3.5rem] shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-light text-center uppercase tracking-widest mb-8 text-white">
              Nova Ficha: <span className="text-[#C6A85B] font-black italic">Recepcionista</span>
            </h2>
            
            <form onSubmit={handleCadastrar} className="grid grid-cols-2 gap-4">
              <input required placeholder="Nome Completo" className="col-span-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, nome: e.target.value})} />
              
              <input required placeholder="CPF" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, cpf: e.target.value})} />
              
              <input required placeholder="RG" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, rg: e.target.value})} />

              <input required placeholder="Endereço" className="col-span-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, endereco: e.target.value})} />

              <input required placeholder="Telefone" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, telefone: e.target.value})} />

              <input required placeholder="Horário (ex: 08h-16h)" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, horario: e.target.value})} />

              <div className="col-span-2 border-t border-white/5 my-2 pt-4">
                <p className="text-[10px] uppercase text-gray-500 mb-4 tracking-widest">Credenciais de Acesso</p>
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Login/User" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                    onChange={e => setFormData({...formData, login: e.target.value})} />
                  
                  <input required type="email" placeholder="Email (Login)" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                    onChange={e => setFormData({...formData, email: e.target.value})} />
                  
                  <input required type="password" placeholder="Senha" className="col-span-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                    onChange={e => setFormData({...formData, senha: e.target.value})} />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="col-span-2 py-5 bg-[#C6A85B] text-black font-black uppercase text-[11px] tracking-widest rounded-2xl mt-4 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'A Guardar...' : 'Finalizar Contratação'}
              </button>

              <button type="button" onClick={() => setShowModal(false)} className="col-span-2 text-[9px] uppercase text-gray-500 font-bold mt-2 hover:text-white transition-colors text-center w-full">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}