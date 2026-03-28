'use client';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Consulta a tabela 'register' em busca do usuário
    const { data, error } = await supabase
      .from('register')
      .select('*')
      .eq('email', email)
      .eq('senha', password) 
      .single(); 

    if (error || !data) {
      alert('Erro ao entrar: E-mail ou senha incorretos.');
      console.error('Detalhes do erro:', error);
    } else {
      alert(`Bem-vindo de volta, ${data.nome}!`);
      
      // Armazena os dados básicos para identificar o usuário logado
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        nome: data.nome,
        email: data.email
      }));

      router.push('/initialpage'); 
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden font-poppins"
      style={{ backgroundImage: "url('/fundo_register.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-md p-10 mx-4 bg-black/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-white tracking-[0.15em] uppercase">
            Eden<span className="font-black text-emerald-500">Hotel</span>
          </h1>
          <div className="h-[1px] w-full bg-emerald-500 mx-auto mt-2 opacity-50"></div>
          <p className="mt-4 text-[10px] font-extralight tracking-[0.3em] text-white uppercase">
            login via banco de dados
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">E-mail</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gmail.com"
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full text-white placeholder:text-gray-500 outline-none focus:bg-white/10 focus:border-emerald-500/50 transition-all text-sm backdrop-blur-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">Senha</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full text-white placeholder:text-gray-500 outline-none focus:bg-white/10 focus:border-emerald-500/50 transition-all text-sm backdrop-blur-sm"
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 mt-4 uppercase text-xs tracking-[0.2em] disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'fazer login na conta'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/register" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            não possui uma conta? <span className="text-emerald-500 font-bold">registrar</span>
          </a>
        </div>
      </div>
    </main>
  );
}