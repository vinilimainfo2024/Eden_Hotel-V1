'use client';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Insere os dados no banco
    const { data, error } = await supabase
      .from('register')
      .insert([
        { 
          nome: nome, 
          email: email, 
          senha: password
        },
      ])
      .select() // Adicione o .select() para retornar os dados inseridos
      .single();

    setLoading(false);

    if (error) {
      alert(`Erro ao cadastrar: ${error.message}`);
    } else {
      // 2. "Login Automático": Salva no localStorage igual você fez no Login
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        nome: data.nome,
        email: data.email
      }));

      alert('Cadastro realizado! Bem-vindo ao EdenHotel.');
      
      // 3. Vai direto para a página inicial
      router.push('/initialpage');
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "url('/fundo_register.png')" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      <div className="relative z-10 w-full max-w-md p-10 mx-4 bg-black/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl font-poppins text-white">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-[0.15em] uppercase">Eden<span className="font-black text-emerald-500">Hotel</span></h1>
          <div className="h-[1px] w-full bg-emerald-500 mx-auto mt-2 opacity-50"></div>
          <p className="mt-4 text-[10px] tracking-[0.3em] uppercase font-extralight">registrar no banco</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">Nome Completo</label>
            <input required type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full outline-none focus:border-emerald-500/50 transition-all text-sm text-white" />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">E-mail</label>
            <input required type="email" placeholder="exemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full outline-none focus:border-emerald-500/50 transition-all text-sm text-white" />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">Senha</label>
            <input required type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full outline-none focus:border-emerald-500/50 transition-all text-sm text-white" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 font-bold py-4 rounded-full transition-all uppercase text-xs tracking-[0.2em] shadow-lg">
            {loading ? 'Enviando...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/login" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            Já possui uma conta? <span className="text-emerald-500 font-bold">login</span>
          </a>
        </div>
      </div>
    </main>
  );
}