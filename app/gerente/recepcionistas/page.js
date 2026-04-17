'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation'; // Importe o router

export default function GestaoRecepcionistas() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recepcionistas, setRecepcionistas] = useState([]);
  const router = useRouter(); // Instancie o router
  
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', telefone: '', turno: 'Manhã', senha: ''
  });

  const supabase = createClient();

  // ... (mantenha as funções fetchRecepcionistas e handleCadastrar iguais)

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 font-poppins relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C6A85B]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER COM BOTÃO VOLTAR */}
      <header className="max-w-7xl mx-auto mb-12 relative z-10">
        <button 
          onClick={() => router.push('/gerente/dashboard')}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-[#C6A85B] transition-all mb-6 font-bold"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> 
          Voltar para Dashboard
        </button>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light tracking-tighter">
              EQUIPE DE <span className="font-black text-[#C6A85B] uppercase italic">Recepção</span>
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Gerenciamento de Colaboradores</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#C6A85B] text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(198,168,91,0.2)] active:scale-95"
          >
            + Contratar Recepcionista
          </button>
        </div>
      </header>

      {/* ... restante da tabela e modal seguem iguais) */}
    </main>
  );
}