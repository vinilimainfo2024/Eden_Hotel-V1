'use client';
import { useEffect, useRef, useState } from 'react';
import HollywoodLoader from './components/HollywoodLoader'; // 👈 ADD AQUI

export default function HomePage() {
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  // Lógica para esconder/mostrar Header
  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        // Se rolar para baixo e passar de 100px, esconde. Se subir, mostra.
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
        
        // Mantém a lógica da sombra/background que você já tinha
        setScrolled(window.scrollY > 30);
      }
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / scrollH) * 100);
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const quartos = [
    { nome: "Suíte Imperial", tag: "Categoria Premium", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", desc: "Luxo absoluto com vista panorâmica e design refinado em cada detalhe." },
    { nome: "Villa Privativa", tag: "Exclusiva", img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80", desc: "Piscina exclusiva e conexão total com a natureza exuberante." },
    { nome: "Suíte Premium", tag: "Superior", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80", desc: "Conforto elevado com detalhes sofisticados e vista deslumbrante." },
  ];

  const experiencias = [
    { num: "01", title: "Spa & Bem-Estar", text: "Tratamentos premium com técnicas ancestrais para revitalizar corpo, mente e espírito." },
    { num: "02", title: "Alta Gastronomia", text: "Criações exclusivas de chefs renomados com ingredientes selecionados e vinhos premiados." },
    { num: "03", title: "Passeios Privados", text: "Experiências exclusivas e personalizadas pensadas especialmente para cada hóspede." },
    { num: "04", title: "Eventos Exclusivos", text: "Celebrações inesquecíveis em ambientes únicos com toda a assistência que você merece." },
  ];

  const galeria = [
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80",
    span: true // resort com piscina infinita na natureza
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80" // bangalô luxo natureza
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" // piscina hotel premium
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" // quarto luxo com vista
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" // suíte sofisticada
  }
];

  // Cursor
  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);
    const animRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animRing);
    };
    animRing();
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

 
  // Scroll animations
  useEffect(() => {
    const els = document.querySelectorAll('.anim');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Counters
  useEffect(() => {
    const counters = document.querySelectorAll('[data-target]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target);
          let start = 0;
          const step = () => {
            start += Math.ceil((target - start) / 12);
            el.textContent = start;
            if (start < target) requestAnimationFrame(step);
            else el.textContent = target;
          };
          step();
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Hero entrance
  useEffect(() => {
    setTimeout(() => {
      const hc = document.getElementById('heroContent');
      if (hc) hc.classList.add('visible');
      const bg = document.querySelector('.hero-bg');
      if (bg) bg.classList.add('loaded');
    }, 200);
  }, []);

  return (
  
  
    <>
    {loading && <HollywoodLoader onFinish={() => setLoading(false)} />}
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --gold: #C6A85B;
          --gold-light: #E8D5A3;
          --gold-dark: #9A7A35;
          --dark: #020403;
          --dark2: #040706;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--dark); color: #fff; font-family: 'Georgia', serif; cursor: none; overflow-x: hidden; }

        /* CURSOR */
        .cursor { position: fixed; width: 10px; height: 10px; background: var(--gold); border-radius: 50%; pointer-events: none; z-index: 99999; transform: translate(-50%, -50%); transition: transform .1s, width .2s, height .2s; mix-blend-mode: difference; }
        .cursor-ring { position: fixed; width: 36px; height: 36px; border: 1px solid rgba(198,168,91,.5); border-radius: 50%; pointer-events: none; z-index: 99998; transform: translate(-50%, -50%); transition: width .3s, height .3s, border-color .3s; }

        /* PROGRESS BAR */
        .progress-bar { position: fixed; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light)); z-index: 9999; transition: width .1s; }

        /* PARTICLES */
        .particle { position: fixed; width: 2px; height: 2px; background: var(--gold); border-radius: 50%; pointer-events: none; animation: floatUp linear infinite; }
        @keyframes floatUp { 0% { opacity: 0; transform: translateY(0); } 10% { opacity: .5; } 90% { opacity: .15; } 100% { opacity: 0; transform: translateY(-100vh) translateX(20px); } }

        /* HEADER */
        .site-header { position: fixed; top: 0; backdrop-filter: blur(10px); width: 100%; z-index: 1000; padding: 10px 48px; display: flex; justify-content: space-between; align-items: center; transition: all .5s; border-bottom: 1px solid rgba(198,168,91,.15); padding: 10px 48px; }
        .site-logo { font-size: 11px; letter-spacing: .5em; color: #fff; text-decoration: none; font-family: 'Arial', sans-serif; font-weight: 300; }
        .site-nav { display: flex; gap: 40px; }
        .site-nav a { color: rgba(255,255,255,.7); text-decoration: none; font-size: 11px; letter-spacing: .2em; font-family: 'Arial', sans-serif; text-transform: uppercase; position: relative; transition: color .3s; cursor: none; }
        .site-nav a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: var(--gold); transition: width .4s; }
        .site-nav a:hover { color: var(--gold); }
        .site-nav a:hover::after { width: 100%; }
        .btn-reservar { border: 1px solid var(--gold); color: var(--gold); padding: 10px 24px; border-radius: 30px; font-size: 10px; letter-spacing: .2em; font-family: 'Arial', sans-serif; text-transform: uppercase; background: transparent; cursor: none; transition: all .4s; position: relative; overflow: hidden; }
        .btn-reservar::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform .4s; z-index: -1; }
        .btn-reservar:hover { color: #000; }
        .btn-reservar:hover::before { transform: scaleX(1); }

        /* HERO */
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;    /* Centraliza verticalmente */
  justify-content: center; /* Centraliza horizontalmente */
  overflow: hidden;
  text-align: center;      /* Garante que textos internos fiquem no meio */
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  transform: scale(1.08);
  transition: transform 8s ease-out;

  /* leve melhoria de cor */
  filter: saturate(1.1) contrast(1.05);
}

/* 🔥 EFEITO NOTURNO (SÓ NA IMAGEM) */
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(2, 4, 3, 0.95) 0%,
    rgba(2, 4, 3, 0.7) 35%,
    rgba(2, 4, 3, 0.4) 60%,
    rgba(2, 4, 3, 0.2) 100%
  );

  pointer-events: none;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0; /* 👈 IMPORTANTE */
  background-image: url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  transform: scale(1.08);
  transition: transform 8s ease-out;
  

  /* escurece direto a imagem (garante efeito) */
  filter: brightness(0.65) contrast(1.1) saturate(1.1);
  
}


.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1; /* 👈 ENTRE imagem e texto */

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.2) 100%
  );
  
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;           /* Adicionado */
  flex-direction: column;  /* Itens um embaixo do outro */
  align-items: center;     /* Centraliza itens horizontalmente dentro da div */
  max-width: 900px;        /* Opcional: limita a largura para leitura */
  padding: 0 20px;
}

.hero-eyebrow {
  font-family: 'Arial', sans-serif;
  font-size: 10px;
  letter-spacing: .5em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: all .8s .3s;
}

.hero-title {
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 300;
  line-height: 1.05;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(30px);
  transition: all .9s .5s;
}

.hero-title em {
  color: var(--gold);
  font-style: italic;
}

.hero-sub {
  color: rgba(255,255,255,.65);
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  letter-spacing: .1em;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(20px);
  transition: all .8s .7s;
}

.hero-cta {
  display: inline-block;
  border: 1px solid rgba(255,255,255,.5);
  padding: 16px 40px;
  border-radius: 30px;
  font-size: 10px;
  letter-spacing: .3em;
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
  cursor: none;
  opacity: 0;
  transform: translateY(20px);
  transition: all .8s .9s, border-color .3s, background .3s;
  color: #fff;
  text-decoration: none;
}

.hero-cta:hover {
  border-color: var(--gold);
  background: rgba(198,168,91,.1);
}

#heroContent.visible .hero-eyebrow,
#heroContent.visible .hero-title,
#heroContent.visible .hero-sub,
#heroContent.visible .hero-cta {
  opacity: 1;
  transform: translateY(0);
}

        /* SCROLL INDICATOR */
        .scroll-ind { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: .5; }
        .scroll-ind span { font-size: 9px; letter-spacing: .3em; font-family: 'Arial', sans-serif; }
        .scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, rgba(198,168,91,0), var(--gold), rgba(198,168,91,0)); animation: scrollPulse 2s infinite; }
        @keyframes scrollPulse { 0%, 100% { opacity: .3; transform: scaleY(.8); } 50% { opacity: 1; transform: scaleY(1); } }

        /* GOLD DIVIDER */
        .gold-divider { display: flex; align-items: center; gap: 16px; justify-content: center; margin: 0 auto 48px; width: fit-content; }
        .gold-divider span { width: 60px; height: 1px; background: linear-gradient(to right, transparent, var(--gold)); }
        .gold-divider span:last-child { background: linear-gradient(to left, transparent, var(--gold)); }
        .gold-divider i { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); display: block; }

        /* SECTIONS */
        .section-tag { font-size: 10px; letter-spacing: .4em; color: var(--gold); font-family: 'Arial', sans-serif; text-transform: uppercase; margin-bottom: 20px; }
        .section-title { font-size: clamp(32px, 4vw, 52px); font-weight: 300; line-height: 1.2; margin-bottom: 24px; }
        .section-title em { color: var(--gold); font-style: italic; }
        .section-text { color: rgba(255,255,255,.55); line-height: 1.9; max-width: 560px; margin: 0 auto; font-family: 'Arial', sans-serif; font-size: 14px; }

        /* SOBRE */
        .sobre { padding: 120px 48px; text-align: center; position: relative; }
        .sobre::before { content: 'EDEN'; position: absolute; top: 40px; left: 50%; transform: translateX(-50%); font-size: 160px; font-weight: 700; color: rgba(198,168,91,.04); letter-spacing: .2em; pointer-events: none; font-family: 'Arial', sans-serif; white-space: nowrap; }
        .stats-row { display: flex; justify-content: center; gap: 80px; margin-top: 64px; flex-wrap: wrap; }
        .stat-num { font-size: 42px; font-weight: 300; color: var(--gold); line-height: 1; }
        .stat-label { font-size: 10px; letter-spacing: .2em; color: rgba(255,255,255,.4); font-family: 'Arial', sans-serif; text-transform: uppercase; margin-top: 8px; }

        /* SEPARATOR */
        .gold-line-wrap { padding: 0 48px; max-width: 1200px; margin: 0 auto; }
        .gold-line { height: 1px; background: linear-gradient(to right, transparent, var(--gold) 20%, var(--gold) 80%, transparent); opacity: .3; }

        /* SUÍTES */
        .suites { padding: 100px 48px; background: var(--dark2); }
        .suites-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .suite-card { position: relative; border-radius: 16px; overflow: hidden; cursor: none; }
        .suite-card img { width: 100%; height: 440px; object-fit: cover; transition: transform .8s cubic-bezier(.25,.46,.45,.94), filter .5s; }
        .suite-card:hover img { transform: scale(1.07); filter: brightness(.85); }
        .suite-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(2,4,3,.95) 0%, rgba(2,4,3,.3) 50%, transparent 100%); }
        .suite-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px; transform: translateY(8px); transition: transform .4s; }
        .suite-card:hover .suite-info { transform: translateY(0); }
        .suite-tag { font-size: 9px; letter-spacing: .3em; color: var(--gold); font-family: 'Arial', sans-serif; text-transform: uppercase; margin-bottom: 10px; }
        .suite-name { font-size: 22px; font-weight: 300; margin-bottom: 8px; }
        .suite-desc { font-size: 12px; color: rgba(255,255,255,.6); font-family: 'Arial', sans-serif; line-height: 1.6; max-height: 0; overflow: hidden; transition: max-height .4s, opacity .4s; opacity: 0; }
        .suite-card:hover .suite-desc { max-height: 60px; opacity: 1; }
        .suite-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; letter-spacing: .2em; color: var(--gold); font-family: 'Arial', sans-serif; text-transform: uppercase; margin-top: 14px; opacity: 0; transition: opacity .3s .1s; }
        .suite-card:hover .suite-btn { opacity: 1; }
        .suite-btn::after { content: '→'; font-size: 12px; }

        /* EXPERIÊNCIAS */
        .experiencias { padding: 100px 48px; }
        .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; max-width: 1200px; margin: 64px auto 0; background: rgba(198,168,91,.1); }
        .exp-item { background: var(--dark); padding: 56px 48px; position: relative; overflow: hidden; transition: background .4s; cursor: none; }
        .exp-item::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(198,168,91,.06) 0%, transparent 60%); opacity: 0; transition: opacity .4s; }
        .exp-item:hover { background: rgba(198,168,91,.04); }
        .exp-item:hover::before { opacity: 1; }
        .exp-num { font-size: 64px; font-weight: 300; color: rgba(198,168,91,.1); line-height: 1; margin-bottom: 16px; font-family: 'Arial', sans-serif; transition: color .4s; }
        .exp-item:hover .exp-num { color: rgba(198,168,91,.2); }
        .exp-title { font-size: 22px; font-weight: 300; margin-bottom: 12px; }
        .exp-text { font-size: 13px; color: rgba(255,255,255,.45); line-height: 1.8; font-family: 'Arial', sans-serif; max-width: 360px; }
        .exp-arrow { position: absolute; right: 40px; top: 50%; transform: translateY(-50%); font-size: 20px; color: var(--gold); opacity: 0; transition: opacity .3s, transform .3s; }
        .exp-item:hover .exp-arrow { opacity: 1; transform: translateY(-50%) translateX(4px); }

        /* GALERIA */
        .galeria { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: auto; }
        .gal-item { overflow: hidden; position: relative; }
        .gal-item.span-row { grid-row: span 2; }
        .gal-item img { width: 100%; height: 100%; min-height: 280px; object-fit: cover; transition: transform .8s cubic-bezier(.25,.46,.45,.94), filter .5s; filter: grayscale(20%); }
        .gal-item:hover img { transform: scale(1.05); filter: grayscale(0%); }
        .gal-overlay { position: absolute; inset: 0; background: rgba(198,168,91,0); transition: background .4s; }
        .gal-item:hover .gal-overlay { background: rgba(198,168,91,.05); }

        /* CTA */
        .cta-section { padding: 120px 48px; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(198,168,91,.06) 0%, transparent 70%); pointer-events: none; }
        .cta-title { font-size: clamp(36px, 5vw, 64px); font-weight: 300; margin-bottom: 16px; line-height: 1.1; }
        .cta-sub { color: rgba(255,255,255,.45); font-family: 'Arial', sans-serif; font-size: 13px; letter-spacing: .1em; margin-bottom: 48px; }
        .btn-gold { background: var(--gold); color: #000; border: none; padding: 18px 52px; border-radius: 30px; font-size: 10px; letter-spacing: .3em; font-family: 'Arial', sans-serif; text-transform: uppercase; cursor: none; transition: transform .4s; position: relative; overflow: hidden; }
        .btn-gold::before { content: ''; position: absolute; inset: 0; background: var(--gold-light); transform: scaleX(0); transform-origin: left; transition: transform .4s; z-index: 0; }
        .btn-gold:hover { transform: scale(1.04); }
        .btn-gold:hover::before { transform: scaleX(1); }
        .btn-gold span { position: relative; z-index: 1; }

        /* FOOTER */
        .site-footer { border-top: 1px solid rgba(198,168,91,.12); padding: 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
        .footer-logo { font-size: 11px; letter-spacing: .5em; font-family: 'Arial', sans-serif; color: rgba(255,255,255,.5); }
        .footer-links { display: flex; gap: 32px; }
        .footer-links a { font-size: 11px; color: rgba(255,255,255,.35); text-decoration: none; font-family: 'Arial', sans-serif; letter-spacing: .1em; transition: color .3s; cursor: none; }
        .footer-links a:hover { color: var(--gold); }
        .footer-copy { font-size: 11px; color: rgba(255,255,255,.25); font-family: 'Arial', sans-serif; }

        /* ANIMATE ON SCROLL */
        .anim { opacity: 0; transform: translateY(40px); transition: opacity .9s, transform .9s; }
        .anim.in { opacity: 1; transform: translateY(0); }
        .anim-delay-1 { transition-delay: .15s; }
        .anim-delay-2 { transition-delay: .3s; }
        .anim-delay-3 { transition-delay: .45s; }

        @media (max-width: 768px) {
          .site-header { padding: 12px 24px; }
          .site-nav { display: none; }
          .suites-grid { grid-template-columns: 1fr; }
          .exp-grid { grid-template-columns: 1fr; }
          .galeria { grid-template-columns: 1fr; }
          .gal-item.span-row { grid-row: span 1; }
          .stats-row { gap: 40px; }
          .sobre { padding: 80px 24px; }
          .suites, .experiencias, .cta-section { padding: 80px 24px; }
        }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Progress */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          bottom: `${Math.random() * 20}%`,
          animationDuration: `${8 + Math.random() * 12}s`,
          animationDelay: `${Math.random() * 8}s`,
        }} />
      ))}

      <header 
        className={`site-header fixed top-0 w-full z- transition-transform duration-500 ease-in-out
          ${scrolled ? 'scrolled py-4' : 'py-8'} 
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex justify-between items-center w-full px-12">
          <a href="#" className="site-logo">EDEN</a>
          <nav className="site-nav hidden md:flex gap-10">
            <a href="#suites">Acomodações</a>
            <a href="#experiencias">Experiências</a>
            <a href="#galeria">Galeria</a>
            <a href="#cta">Contato</a>
          </nav>
          <button className="btn-reservar">Reservar</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content" id="heroContent">
          <div className="hero-eyebrow">Luxury Resort & Spa</div>
          <h1 className="hero-title">Uma Experiência<br /><em>Inesquecível</em></h1>
          <p className="hero-sub">Onde natureza e sofisticação se encontram em harmonia perfeita</p>
          <a href="#suites" className="hero-cta">Descobrir o Eden</a>
        </div>
      </section>

      {/* Sobre */}
      <section className="sobre">
        <div className="section-tag anim">A Nossa Filosofia</div>
        <div className="gold-divider anim anim-delay-1"><span /><i /><span /></div>
        <h2 className="section-title anim anim-delay-1">Um novo conceito<br />de <em>luxo absoluto</em></h2>
        <p className="section-text anim anim-delay-2">
          Projetado para transcender o ordinário — combinando arquitetura contemporânea,
          natureza exuberante e serviços de alto padrão em uma experiência verdadeiramente única.
        </p>
        <div className="stats-row">
          {[{ target: 15, label: 'Anos de excelência' }, { target: 48, label: 'Suítes exclusivas' }, { target: 98, label: '% satisfação' }].map((s, i) => (
            <div className={`anim anim-delay-${i + 1}`} key={s.label}>
              <div className="stat-num" data-target={s.target}>0</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-line-wrap"><div className="gold-line" /></div>

      {/* Suítes */}
      <section className="suites" id="suites">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag anim">Acomodações</div>
          <div className="gold-divider anim anim-delay-1"><span /><i /><span /></div>
          <h2 className="section-title anim anim-delay-1">Nossas <em>Suítes</em></h2>
        </div>
        <div className="suites-grid">
          {quartos.map((q, i) => (
            <div className={`suite-card anim${i > 0 ? ` anim-delay-${i}` : ''}`} key={q.nome}>
              <img src={q.img} alt={q.nome} />
              <div className="suite-overlay" />
              <div className="suite-info">
                <div className="suite-tag">{q.tag}</div>
                <h3 className="suite-name">{q.nome}</h3>
                <p className="suite-desc">{q.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experiências */}
      <section className="experiencias" id="experiencias">
        <div style={{ textAlign: 'center' }}>
          <div className="section-tag anim">Serviços</div>
          <div className="gold-divider anim anim-delay-1"><span /><i /><span /></div>
          <h2 className="section-title anim anim-delay-1">Experiências <em>Únicas</em></h2>
        </div>
        <div className="exp-grid">
          {experiencias.map((e, i) => (
            <div className={`exp-item anim${i > 0 ? ` anim-delay-${Math.min(i, 3)}` : ''}`} key={e.num}>
              <div className="exp-num">{e.num}</div>
              <h3 className="exp-title">{e.title}</h3>
              <p className="exp-text">{e.text}</p>
              <span className="exp-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* Galeria */}
      <section className="galeria" id="galeria">
        {galeria.map((g, i) => (
          <div className={`gal-item${g.span ? ' span-row' : ''}`} key={i}>
            <img src={g.src} alt={`Galeria ${i + 1}`} />
            <div className="gal-overlay" />
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="section-tag anim">Reserve Agora</div>
        <div className="gold-divider anim anim-delay-1"><span /><i /><span /></div>
        <h2 className="cta-title anim anim-delay-1">Comece a sua<br />experiência <em>Eden</em></h2>
        <p className="cta-sub anim anim-delay-2">Disponibilidade limitada. Atendimento personalizado 24 horas.</p>
        <button className="btn-gold anim anim-delay-2"><span>Reservar Minha Estadia</span></button>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-logo">EDEN RESORT</div>
        <div className="footer-links">
          <a href="#">Sobre</a>
          <a href="#">Acomodações</a>
          <a href="#">Experiências</a>
          <a href="#">Contato</a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Eden Resort — Todos os direitos reservados</div>
      </footer>
    </>
  );
}