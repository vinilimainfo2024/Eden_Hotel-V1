'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function GestaoServicos() {
  const [servicos, setServicos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    descricao: '',
    categoria: 'Geral'
  });

  // 1. Carregar serviços do banco (RF006)
  const fetchServicos = async () => {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .order('nome', { ascending: true });
    
    if (error) console.error("Erro ao procurar serviços:", error.message);
    else setServicos(data || []);
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  // 2. Cadastrar novo serviço (RF006)
  const handleCadastrar = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('servicos').insert([
        {
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco), // Garante que vai como número decimal
          categoria: formData.categoria
        }
      ]);

      if (error) throw error;

      alert("Serviço adicionado com sucesso!");
      setShowModal(false);
      setFormData({ nome: '', preco: '', descricao: '', categoria: 'Geral' });
      fetchServicos();
    } catch (error) {
      alert("Erro ao salvar serviço: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Ativar/Desativar Promoção (RF013)
  const gerenciarPromocao = async (servico) => {
    const novoStatus = !servico.em_promocao;
    let precoPromo = null;

    if (novoStatus) {
      // Aplica 20% de desconto se estiver a ativar
      precoPromo = (servico.preco * 0.8).toFixed(2);
    }

    const { error } = await supabase
      .from('servicos')
      .update({ 
        em_promocao: novoStatus, 
        preco_promocional: precoPromo 
      })
      .eq('id', servico.id);

    if (error) alert("Erro na promoção: " + error.message);
    else fetchServicos();
  };

  // 4. Eliminar Serviço
  const handleExcluir = async (id) => {
    if (confirm("Deseja remover este serviço permanentemente?")) {
      await supabase.from('servicos').delete().eq('id', id);
      fetchServicos();
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 font-poppins relative">
      {/* Estilo visual igual ao de receção */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C6A85B]/5 rounded-full blur-[100px] pointer-events-none" />

      <header className="max-w-7xl mx-auto mb-12 relative z-10 flex justify-between items-center">
        <div>
          <button onClick={() => router.push('/gerente/dashboard')} className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 block hover:text-[#C6A85B]">
            ← Voltar
          </button>
          <h1 className="text-3xl font-light tracking-tighter text-white">
            SERVIÇOS & <span className="font-black text-[#C6A85B] uppercase italic">Promoções</span>
          </h1>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#C6A85B] text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
        >
          + Adicionar Serviço
        </button>
      </header>

      {/* Grid de Cards de Serviços */}
      <section className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicos.length > 0 ? (
          servicos.map((s) => (
            <div key={s.id} className="bg-black/60 border border-white/10 p-8 rounded-[3rem] backdrop-blur-2xl hover:border-[#C6A85B]/30 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#C6A85B] bg-[#C6A85B]/10 px-3 py-1 rounded-full">
                  {s.categoria}
                </span>
                <button onClick={() => handleExcluir(s.id)} className="text-gray-600 hover:text-red-500 text-[10px] uppercase font-bold">Remover</button>
              </div>

              <h3 className="text-xl font-black uppercase italic mb-2">{s.nome}</h3>
              <p className="text-gray-500 text-xs font-light mb-6 h-12 overflow-hidden">{s.descricao}</p>

              <div className="flex items-end gap-3 mb-8">
                {s.em_promocao ? (
                  <>
                    <span className="text-3xl font-black text-white italic">R$ {s.preco_promocional}</span>
                    <span className="text-sm text-gray-600 line-through mb-1">R$ {s.preco}</span>
                  </>
                ) : (
                  <span className="text-3xl font-black text-white italic">R$ {s.preco}</span>
                )}
              </div>

              <button 
                onClick={() => gerenciarPromocao(s)}
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                  s.em_promocao 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                  : 'bg-white text-black hover:bg-[#C6A85B]'
                }`}
              >
                {s.em_promocao ? 'Remover Promoção' : 'Ativar 20% Desconto'}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-600 uppercase text-[10px] tracking-widest italic">
            Nenhum serviço registado.
          </div>
        )}
      </section>

      {/* Modal de Cadastro */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="relative w-full max-w-[500px] bg-[#0A0A0A] border border-white/10 p-10 rounded-[3.5rem] shadow-2xl">
            <h2 className="text-xl font-light text-center uppercase tracking-widest mb-8 text-white">
              Novo <span className="text-[#C6A85B] font-black italic">Serviço</span>
            </h2>
            
            <form onSubmit={handleCadastrar} className="flex flex-col gap-4">
              <input required placeholder="Nome do Serviço" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, nome: e.target.value})} />
              
              <input required type="number" step="0.01" placeholder="Preço (R$)" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm" 
                onChange={e => setFormData({...formData, preco: e.target.value})} />

              <select className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm text-gray-400 appearance-none"
                onChange={e => setFormData({...formData, categoria: e.target.value})}>
                <option value="Geral">Geral</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Bem-estar">Bem-estar</option>
              </select>

              <textarea placeholder="Pequena descrição do serviço" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] text-sm h-32 resize-none" 
                onChange={e => setFormData({...formData, descricao: e.target.value})} />

              <button 
                type="submit" 
                disabled={loading} 
                className="py-5 bg-[#C6A85B] text-black font-black uppercase text-[11px] tracking-widest rounded-2xl mt-4 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'A Guardar...' : 'Confirmar Registo'}
              </button>

              <button type="button" onClick={() => setShowModal(false)} className="text-[9px] uppercase text-gray-500 font-bold mt-2 hover:text-white transition-colors text-center w-full">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}