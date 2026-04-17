'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function GestaoQuartos() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quartos, setQuartos] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    numero: '', nome: '', descricao: '', tipo: 'Simples', preco: '', capacidade: '2', status: 'disponivel'
  });

  const fetchQuartos = async () => {
    const { data, error } = await supabase
      .from('quartos')
      .select('*')
      .order('numero', { ascending: true });
    if (!error) setQuartos(data || []);
  };

  useEffect(() => { fetchQuartos(); }, []);

  const handleExcluir = async (id) => {
    if (confirm("Tem certeza que deseja remover este quarto permanentemente?")) {
      const { error } = await supabase.from('quartos').delete().eq('id', id);
      if (error) alert("Erro ao excluir: " + error.message);
      else fetchQuartos();
    }
  };

  const handleCadastrar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        const fileName = `${Math.random()}.${imageFile.name.split('.').pop()}`;
        const { error: upErr } = await supabase.storage.from('imagens-quartos').upload(fileName, imageFile);
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from('imagens-quartos').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const { error: dbErr } = await supabase.from('quartos').insert([{ 
        numero: formData.numero, nome: formData.nome, descricao: formData.descricao,
        tipo: formData.tipo, preco_diaria: parseFloat(formData.preco), 
        capacidade: parseInt(formData.capacidade), status: formData.status, imagem_url: imageUrl
      }]);

      if (dbErr) throw dbErr;
      setShowModal(false);
      fetchQuartos();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 relative font-poppins">
      <header className="max-w-7xl mx-auto mb-12 flex justify-between items-end relative z-10">
        <div>
          <button onClick={() => router.push('/gerente/dashboard')} className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 block">← Voltar</button>
          <h1 className="text-3xl font-light">GESTÃO DE <span className="font-black text-[#C6A85B] italic">QUARTOS</span></h1>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#C6A85B] text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-tighter hover:scale-105 transition-all">
          + Adicionar Quarto
        </button>
      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {quartos.map((q) => (
          <div key={q.id} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
            <div className="h-48 bg-gray-900 relative">
              {q.imagem_url && <img src={q.imagem_url} className="w-full h-full object-cover" />}
              <div className={`absolute top-4 right-4 h-2 w-2 rounded-full ${q.status === 'disponivel' ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold italic uppercase">{q.nome || `Quarto ${q.numero}`}</h3>
                <span className="text-[#C6A85B] text-xs font-bold">#{q.numero}</span>
              </div>
              <p className="text-gray-400 text-xs line-clamp-2 mb-4 italic">{q.descricao || "Sem descrição."}</p>
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xl font-light">R$ {q.preco_diaria}</span>
                <button onClick={() => handleExcluir(q.id)} className="text-[9px] font-black uppercase text-red-500 hover:text-red-400">Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="w-full max-w-[500px] bg-[#0A0A0A] border border-white/10 p-10 rounded-[3rem]">
            <form onSubmit={handleCadastrar} className="flex flex-col gap-4">
              <input required placeholder="Nº do Quarto" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setFormData({...formData, numero: e.target.value})} />
              <input placeholder="Nome da Suíte" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setFormData({...formData, nome: e.target.value})} />
              <textarea placeholder="Descrição" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none h-24 resize-none" onChange={e => setFormData({...formData, descricao: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Preço" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setFormData({...formData, preco: e.target.value})} />
                <input required type="number" placeholder="Capacidade" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setFormData({...formData, capacidade: e.target.value})} />
              </div>
              <input type="file" accept="image/*" className="text-xs file:bg-[#C6A85B] file:border-0 file:px-4 file:py-2 file:rounded-full file:font-bold" onChange={e => setImageFile(e.target.files[0])} />
              <button type="submit" disabled={loading} className="bg-[#C6A85B] text-black p-4 rounded-xl font-black uppercase text-xs mt-4">
                {loading ? 'Salvando...' : 'Confirmar Registro'}
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="text-[9px] text-gray-500 uppercase font-bold text-center">Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}