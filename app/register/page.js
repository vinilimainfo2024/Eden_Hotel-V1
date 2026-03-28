'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado para o Card de Mensagem (Toast)
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' ou 'error'

  const router = useRouter();
  const supabase = createClient();

  // Efeito para sumir a mensagem após 4 segundos
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          nome: nome, 
          email: email, 
          senha: password
        },
      ])
      .select()
      .single();

    if (error) {
      // Se o erro for de e-mail duplicado ou algo do tipo
      setMessage({ 
        text: `Erro ao cadastrar: ${error.message === 'duplicate key value violates unique constraint "users_email_key"' ? 'Este e-mail já está em uso.' : error.message}`, 
        type: 'error' 
      });
      setLoading(false);
    } else {
      setMessage({ text: 'Cadastro realizado! Bem-vindo ao Paraíso.', type: 'success' });
      
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        nome: data.nome,
        email: data.email
      }));

      // Delay para o usuário ler a mensagem de sucesso
      setTimeout(() => {
        router.push('/initialpage');
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative overflow-hidden font-poppins" style={{ backgroundImage: "url('/fundo_register.png')" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* --- CARD DE MENSAGEM (TOAST) --- */}
      {message.text && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-500 animate-in fade-in zoom-in slide-in-from-top-10 
          ${message.type === 'success' 
            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
            : 'bg-red-500/20 border-red-500/50 text-red-400'}`}>
          <div className="flex items-center gap-3">
            {message.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{message.text}</p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md p-10 mx-4 bg-black/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl text-white">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-[0.15em] uppercase">Eden<span className="font-black text-emerald-500">Hotel</span></h1>
          <div className="h-[1px] w-full bg-emerald-500 mx-auto mt-2 opacity-50"></div>
          <p className="mt-4 text-[10px] tracking-[0.3em] uppercase font-extralight">registrar no banco</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">Nome Completo</label>
            <input required type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full outline-none focus:border-emerald-500/50 transition-all text-sm text-white placeholder:text-gray-500 backdrop-blur-sm" />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">E-mail</label>
            <input required type="email" placeholder="exemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full outline-none focus:border-emerald-500/50 transition-all text-sm text-white placeholder:text-gray-500 backdrop-blur-sm" />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-emerald-500/80 mb-2 ml-4 font-bold">Senha</label>
            <input required type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full outline-none focus:border-emerald-500/50 transition-all text-sm text-white placeholder:text-gray-500 backdrop-blur-sm" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:opacity-50 font-bold py-4 rounded-full transition-all duration-300 uppercase text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.2)] mt-4">
            {loading ? 'Processando...' : 'Criar conta'}
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