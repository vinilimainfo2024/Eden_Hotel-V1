'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gerentes, setGerentes] = useState([]);
  
  // Estado para o formulário de cadastro (UC002)
  const [gerenteData, setGerenteData] = useState({
    nome: '', email: '', cpf: '', endereco: '', telefone: '', login: '', senha: ''
  });

  const supabase = createClient();

  // Função para buscar gerentes (RF014)
  const fetchGerentes = async () => {
    try {
      const { data, error } = await supabase
        .from('gerentes')
        .select('*');
      
      if (error) throw error;
      setGerentes(data || []);
    } catch (error) {
      console.error("Erro ao carregar gerentes:", error.message);
    }
  };

  useEffect(() => {
    fetchGerentes();
  }, []);

  // Função para cadastrar o gerente e criar acesso no sistema
  const cadastrarGerente = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Cria o utilizador no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: gerenteData.email,
        password: gerenteData.senha,
      });

      if (authError) throw authError;

      // 2. Vincula o tipo de utilizador na tabela 'usuarios'
      const { error: typeError } = await supabase.from('usuarios').insert([
        { id: authData.user.id, email: gerenteData.email, tipo: 'gerente' }
      ]);
      if (typeError) throw typeError;

      // 3. Insere os dados detalhados na tabela 'gerentes' (UC002)
      const { error: dbError } = await supabase.from('gerentes').insert([
        {
          id: authData.user.id,
          nome_completo: gerenteData.nome,
          cpf: gerenteData.cpf,
          email: gerenteData.email,
          endereco: gerenteData.endereco,
          telefone: gerenteData.telefone,
          login_acesso: gerenteData.login
        }
      ]);
      if (dbError) throw dbError;

      // Sucesso
      alert("Gerente registado com sucesso!");
      setShowModal(false);
      setGerenteData({ nome: '', email: '', cpf: '', endereco: '', telefone: '', login: '', senha: '' });
      fetchGerentes(); // Atualiza a lista na hora

    } catch (error) {
      alert("Erro no processo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 font-poppins relative overflow-x-hidden">
      
      {/* Glow de fundo Gold #C6A85B */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C6A85B]/5 rounded-full blur-[120px] pointer-events-none" />

      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 relative z-10">
        <div>
          <h1 className="text-3xl font-light tracking-tighter">
            PAINEL <span className="font-black text-[#C6A85B] uppercase italic">Admin</span>
          </h1>
          <div className="h-[1px] w-12 bg-[#C6A85B]/50 mt-2"></div>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#C6A85B] hover:brightness-110 text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(198,168,91,0.2)] active:scale-95"
        >
          + Novo Gerente
        </button>
      </header>

      {/* CARDS DE RELATÓRIO (UC017 / RF014) */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
        <div className="bg-black/60 border border-white/10 p-8 rounded-[3rem] backdrop-blur-2xl shadow-xl">
          <p className="text-[#C6A85B]/80 text-[10px] uppercase font-bold tracking-widest">Gerentes Ativos</p>
          <h3 className="text-5xl font-light mt-2 italic text-white">
            {gerentes.length.toString().padStart(2, '0')}
          </h3>
        </div>

        <div className="bg-black/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-2xl">
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Relatórios Mensais</p>
          <h3 className="text-5xl font-light mt-2 italic text-gray-800 font-mono">00</h3>
        </div>

        <div className="bg-black/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-2xl">
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Logs de Sistema</p>
          <h3 className="text-5xl font-light mt-2 italic text-gray-800 font-mono">--</h3>
        </div>
      </section>

      {/* TABELA DE GERENTES (RF009) */}
      <section className="max-w-7xl mx-auto relative z-10">
        <div className="bg-black/60 border border-white/10 rounded-[3.5rem] overflow-hidden backdrop-blur-2xl shadow-2xl">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C6A85B]/90">Gestão de Funcionários</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/5">
                  <th className="px-10 py-5 font-bold">Nome</th>
                  <th className="px-10 py-5 font-bold">CPF</th>
                  <th className="px-10 py-5 font-bold">E-mail</th>
                  <th className="px-10 py-5 font-bold text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {gerentes.length > 0 ? (
                  gerentes.map((g) => (
                    <tr key={g.id} className="border-b border-white/5 hover:bg-[#C6A85B]/[0.03] transition-colors">
                      <td className="px-10 py-6 font-medium text-white/90">{g.nome_completo}</td>
                      <td className="px-10 py-6 text-gray-500 font-mono">{g.cpf}</td>
                      <td className="px-10 py-6 text-gray-400">{g.email}</td>
                      <td className="px-10 py-6 text-center">
                        <button className="text-[9px] uppercase font-bold text-gray-600 hover:text-red-500 transition-colors">Remover</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-10 py-16 text-center text-gray-600 uppercase text-[10px] tracking-widest">
                      Nenhum gerente encontrado no sistema.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MODAL DE CADASTRO - COR GOLD #C6A85B */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-[400px] bg-black border border-white/10 p-10 rounded-[3.5rem] shadow-2xl my-auto">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-white uppercase tracking-[0.2em]">
                Eden<span className="text-[#C6A85B] font-black italic">Admin</span>
              </h2>
              <div className="h-[1px] w-12 bg-[#C6A85B]/40 mx-auto mt-4"></div>
            </div>
            
            <form onSubmit={cadastrarGerente} className="flex flex-col gap-4">
              {[
                { label: 'Nome Completo', key: 'nome', type: 'text' },
                { label: 'E-mail Corporativo', key: 'email', type: 'email' },
                { label: 'CPF', key: 'cpf', type: 'text' },
                { label: 'Telefone', key: 'telefone', type: 'text' },
                { label: 'Endereço', key: 'endereco', type: 'text' },
                { label: 'Login de Acesso', key: 'login', type: 'text' },
                { label: 'Senha Provisória', key: 'senha', type: 'password' },
              ].map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[9px] uppercase text-[#C6A85B]/80 font-bold ml-4 tracking-[0.2em]">{field.label}</label>
                  <input 
                    required
                    type={field.type}
                    className="w-full bg-white/5 border border-[#C6A85B]/20 px-6 py-3 rounded-2xl outline-none focus:border-[#C6A85B] transition-all text-sm text-white"
                    onChange={(e) => setGerenteData({...gerenteData, [field.key]: e.target.value})}
                  />
                </div>
              ))}
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-[#C6A85B] text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl mt-4 shadow-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? 'A Registar...' : 'Confirmar Registro'}
              </button>
              
              <button 
                type="button" 
                onClick={() => setShowModal(false)} 
                className="text-[9px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors font-bold mt-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}