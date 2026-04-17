'use client';
import React, { useState, useEffect } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleContact = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setMessage({ text: 'Mensagem enviada com sucesso!', type: 'success' });
      setName('');
      setEmail('');
      setMessageText('');
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <style jsx global>{`
  /* 1. CURSOR DELTA (SETINHA) */
  /* O '0 0' indica que o clique é na ponta superior esquerda da imagem */
  html, body, header, section, div, header * {
    cursor: url('http://www.rw-designer.com/cursor-extern.php?id=108768') 0 0, auto !important;
  }

  /* 2. CURSOR DE LINKS E BOTÕES */
  /* Forçamos o delta também em elementos clicáveis */
  a, button, [role="button"], .btn-reservar {
    cursor: url('http://www.rw-designer.com/cursor-extern.php?id=170684') 0 0, pointer !important;
  }

  /* 3. CURSOR DE TEXTO DOURADO */
  /* O '16 16' centraliza o clique no meio da imagem (ideal para o traço de texto) */
  input, textarea, p, span, h1, h2, h3, .text-selection {
    cursor: url('http://www.rw-designer.com/cursor-extern.php?id=108773') 16 16, text !important;
  }

  /* 4. SELEÇÃO DE TEXTO */
  ::selection {
    background: rgba(198, 168, 91, 0.3);
    color: #C6A85B;
  }
`}</style>

      <main className="min-h-screen bg-[#050505] text-white pt-24 px-8 relative overflow-x-hidden">
        
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
            <h1 className="text-sm tracking-[0.4em] font-light text-white">EDEN</h1>
            <nav className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] text-gray-300">
              <a href="/acomodacoes" className="hover:text-white transition">Acomodações</a>
              <a href="/experiencias" className="hover:text-white transition">Experiências</a>
              <a href="/galeria" className="hover:text-white transition">Galeria</a>
              <a href="/contact" className="hover:text-white transition">Contato</a>
            </nav>
            <button className="border border-[#C6A85B] text-[#C6A85B] px-6 py-2 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#C6A85B] hover:text-black transition-all">
              Reservar
            </button>
          </div>
        </header>

        {/* GLOW DE FUNDO */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#C6A85B]/5 rounded-full blur-[120px]" />

        {/* HEADER PAGE */}
        <section className="max-w-5xl mx-auto text-center mb-12 relative z-10">
          <h1 className="text-3xl font-light tracking-tighter">
            FALE <span className="font-black text-[#C6A85B] italic">CONOSCO</span>
          </h1>
          <div className="h-[1px] w-16 bg-[#C6A85B]/50 mx-auto mt-4"></div>
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mt-4">
            Atendimento Premium Eden Hotel
          </p>
        </section>

        {/* FEEDBACK MENSAGEM */}
        {message.text && (
          <div className={`fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-xs uppercase tracking-widest z-50
            ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
          {/* FORMULÁRIO */}
          <div className="bg-black/60 border border-white/10 p-10 rounded-[3rem] backdrop-blur-2xl shadow-xl">
            <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C6A85B]/90 mb-6">
              Enviar Mensagem
            </h2>
            <form onSubmit={handleContact} className="flex flex-col gap-4">
              <input
                required
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-[#C6A85B]/20 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-[#C6A85B]/20 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] transition-colors"
              />
              <textarea
                required
                placeholder="Mensagem"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full bg-white/5 border border-[#C6A85B]/20 px-6 py-4 rounded-2xl outline-none focus:border-[#C6A85B] transition-colors"
                rows={4}
              />
              <button
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-[#C6A85B] text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl mt-2 shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Solicitar Atendimento'}
              </button>
            </form>
          </div>

          {/* INFO DE CONTATO */}
          <div className="flex flex-col gap-6">
            <div className="bg-black/60 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-2xl">
              <p className="text-[#C6A85B]/80 text-[10px] uppercase tracking-widest">Atendimento</p>
              <h3 className="text-xl mt-2">24 horas</h3>
            </div>
            <div className="bg-black/40 border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-2xl">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">Email</p>
              <h3 className="text-lg mt-2 text-gray-300">contato@edenhotel.com</h3>
            </div>
            <div className="bg-black/40 border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-2xl">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">WhatsApp</p>
              <h3 className="text-lg mt-2 text-gray-300">Resposta média 5 min</h3>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}