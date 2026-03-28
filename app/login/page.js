'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado para o Card de Mensagem
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' ou 'error'

  const router = useRouter();
  const supabase = createClient();

  // Efeito para sumir a mensagem após 4 segundos
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 6000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('senha', password) 
      .single(); 

    if (error || !data) {
      setMessage({ text: 'E-mail ou senha incorretos. Tente novamente.', type: 'error' });
      console.error('Detalhes do erro:', error);
    } else {
      setMessage({ text: `Bem-vindo de volta, ${data.nome}! Redirecionando...`, type: 'success' });
      
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        nome: data.nome,
        email: data.email
      }));

      // Pequeno delay para o usuário ver a mensagem de sucesso antes de mudar de página
      setTimeout(() => {
        router.push('/initialpage'); 
        router.refresh();
      }, 1500);
    }
    setLoading(false);
  };

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden font-poppins"
      style={{ backgroundImage: "url('/fundo_register.png')" }}
    >
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
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{message.text}</p>
          </div>
        </div>
      )}

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