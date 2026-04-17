'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function GerenteDashboard() {
  const [stats, setStats] = useState({ disponiveis: 0, ocupados: 0, servicos: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  // Busca estatísticas em tempo real para o Gerente
  const fetchStats = async () => {
    setLoading(true);
    const { data: quartos } = await supabase.from('quartos').select('status');
    const { count: servicosCount } = await supabase.from('servicos').select('*', { count: 'exact', head: true });

    if (quartos) {
      const disponiveis = quartos.filter(q => q.status === 'disponivel').length;
      const ocupados = quartos.filter(q => q.status === 'ocupado').length;
      setStats({ disponiveis, ocupados, servicos: servicosCount || 0 });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const menuActions = [
    { title: 'Quartos', icon: '🛌', path: '/gerente/quartos', desc: 'Gerir inventário e tipos' },
    { title: 'Serviços', icon: '✨', path: '/gerente/servicos', desc: 'Manutenção de extras' },
    { title: 'Recepção', icon: '👔', path: '/gerente/recepcao', desc: 'Equipe presencial' },
    { title: 'Promoções', icon: '🏷️', path: '/gerente/promocoes', desc: 'Ajustar ofertas' },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 font-poppins relative">
      {/* Glow de fundo Gold */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C6A85B]/5 rounded-full blur-[120px] pointer-events-none" />

      <header className="max-w-7xl mx-auto flex justify-between items-end mb-16 relative z-10">
        <div>
          <p className="text-[#C6A85B] text-[10px] uppercase tracking-[0.4em] font-bold mb-2 text-shadow-glow">Gerência Eden</p>
          <h1 className="text-4xl font-light tracking-tighter">
            CONTROLE <span className="font-black italic uppercase">Operacional</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
           <button 
            onClick={() => fetchStats()}
            className="p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all"
            title="Atualizar Dados"
          >
            🔄
          </button>
        </div>
      </header>

      {/* STATUS DOS QUARTOS (Destaque do Gerente) */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
        <div className="bg-black/60 border border-[#C6A85B]/20 p-10 rounded-[3.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:scale-110 transition-transform">🏨</div>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Quartos Disponíveis</p>
          <h3 className="text-6xl font-light mt-4 text-[#C6A85B] italic">
            {loading ? '...' : stats.disponiveis.toString().padStart(2, '0')}
          </h3>
        </div>

        <div className="bg-black/40 border border-white/5 p-10 rounded-[3.5rem] backdrop-blur-2xl transition-all hover:border-white/10">
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Ocupação Atual</p>
          <h3 className="text-6xl font-light mt-4 text-white italic">
            {loading ? '...' : stats.ocupados.toString().padStart(2, '0')}
          </h3>
        </div>

        <div className="bg-black/40 border border-white/5 p-10 rounded-[3.5rem] backdrop-blur-2xl">
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Serviços no Catálogo</p>
          <h3 className="text-6xl font-light mt-4 text-gray-400 italic font-mono">
            {loading ? '...' : stats.servicos.toString().padStart(2, '0')}
          </h3>
        </div>
      </section>

      {/* GRID DE NAVEGAÇÃO */}
      <section className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-white/80">Módulos de Gestão</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C6A85B]/50 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuActions.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className="group relative bg-white/[0.03] border border-white/5 p-8 rounded-[3rem] text-left transition-all hover:bg-[#C6A85B]/[0.05] hover:border-[#C6A85B]/30 hover:-translate-y-2 active:scale-95 shadow-lg"
            >
              <div className="text-4xl mb-6 bg-black/40 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/5 group-hover:border-[#C6A85B]/50 transition-all">
                {item.icon}
              </div>
              <h4 className="text-[#C6A85B] font-black uppercase text-xs tracking-widest mb-2 italic">
                {item.title}
              </h4>
              <p className="text-[10px] text-gray-500 uppercase leading-relaxed font-bold tracking-tighter">
                {item.desc}
              </p>
              
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-[#C6A85B]">
                →
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}