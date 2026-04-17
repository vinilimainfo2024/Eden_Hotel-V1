<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Eden Hotel — Where Nature Meets Luxury</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap" rel="stylesheet">

<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --sage: #8A9E7E;
    --sage-light: #B5C4A8;
    --stone: #C8BEB0;
    --sand: #E8E0D4;
    --linen: #F4F0EA;
    --cream: #FAF8F5;
    --bark: #6B5D4F;
    --forest: #3A4A35;
    --charcoal: #2C2C2A;
    --white: #FDFCFB;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--charcoal);
    cursor: none;
    overflow-x: hidden;
  }

  /* ── Custom Cursor ── */
  #cursor {
    position: fixed; top: 0; left: 0;
    width: 10px; height: 10px;
    background: var(--forest);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, background 0.3s ease;
    mix-blend-mode: multiply;
  }
  #cursor-ring {
    position: fixed; top: 0; left: 0;
    width: 36px; height: 36px;
    border: 1px solid var(--sage);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.4s cubic-bezier(.25,.46,.45,.94), opacity 0.3s;
    opacity: 0.6;
  }
  body:hover #cursor-ring { opacity: 1; }
  .cursor-grow #cursor { transform: scale(3); background: var(--sage-light); }
  .cursor-grow #cursor-ring { transform: scale(1.5); opacity: 0.3; }

  /* ── Noise Overlay ── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 10; opacity: 0.4;
  }

  /* ── Header ── */
  header {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 2rem 4rem;
    transition: background 0.6s ease, backdrop-filter 0.6s;
  }
  header.scrolled {
    background: rgba(244, 240, 234, 0.88);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(138,158,126,0.15);
  }

  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: 0.25em;
    color: var(--forest);
    text-transform: uppercase;
    text-decoration: none;
  }
  .logo span { color: var(--sage); font-style: italic; }

  nav { display: flex; gap: 3rem; align-items: center; }
  nav a {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--bark);
    text-decoration: none;
    font-weight: 300;
    position: relative;
    transition: color 0.3s;
  }
  nav a::after {
    content: '';
    position: absolute; bottom: -3px; left: 0;
    width: 0; height: 1px;
    background: var(--sage);
    transition: width 0.4s ease;
  }
  nav a:hover { color: var(--forest); }
  nav a:hover::after { width: 100%; }

  .nav-cta {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white);
    background: var(--forest);
    padding: 0.75rem 1.8rem;
    text-decoration: none;
    font-weight: 300;
    transition: background 0.3s, transform 0.2s;
  }
  .nav-cta:hover { background: var(--sage); transform: translateY(-1px); }

  /* ── Hero ── */
  #hero {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10rem 5rem 5rem 6rem;
    position: relative;
    z-index: 2;
  }

  .hero-tag {
    font-size: 0.65rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 2rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-tag::before {
    content: '';
    display: block; width: 40px; height: 1px;
    background: var(--sage);
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 6vw, 6rem);
    font-weight: 300;
    line-height: 1.05;
    color: var(--forest);
    margin-bottom: 2.5rem;
  }
  .hero-title em {
    font-style: italic;
    color: var(--sage);
  }

  .hero-desc {
    font-size: 0.85rem;
    line-height: 1.9;
    color: var(--bark);
    font-weight: 300;
    max-width: 340px;
    margin-bottom: 3.5rem;
  }

  .hero-actions { display: flex; gap: 1.5rem; align-items: center; }

  .btn-primary {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white);
    background: var(--forest);
    padding: 1rem 2.5rem;
    text-decoration: none;
    font-weight: 300;
    transition: all 0.3s;
    display: inline-block;
  }
  .btn-primary:hover { background: var(--sage); transform: translateY(-2px); }

  .btn-ghost {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--bark);
    text-decoration: none;
    font-weight: 300;
    display: flex; align-items: center; gap: 0.7rem;
    transition: color 0.3s;
  }
  .btn-ghost svg { transition: transform 0.3s; }
  .btn-ghost:hover { color: var(--forest); }
  .btn-ghost:hover svg { transform: translateX(4px); }

  .hero-right {
    position: relative;
    overflow: hidden;
  }

  /* SVG Scene – Floresta */
  .hero-svg-wrap {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
  }

  .hero-right::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to right, var(--cream) 0%, transparent 20%);
    z-index: 2;
  }

  .hero-scroll-hint {
    position: absolute;
    bottom: 3rem; left: 6rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.8rem;
    z-index: 3;
  }
  .hero-scroll-hint span {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--stone);
    writing-mode: vertical-rl;
  }
  .scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--sage), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.15); }
  }

  /* ── Section Base ── */
  section { padding: 8rem 6rem; }

  .section-tag {
    font-size: 0.62rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .section-tag::before {
    content: '';
    display: block; width: 30px; height: 1px;
    background: var(--sage);
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    color: var(--forest);
  }
  .section-title em { font-style: italic; color: var(--sage); }

  /* ── About ── */
  #about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
    background: var(--linen);
  }

  .about-visual { position: relative; }

  .about-main-img {
    width: 100%; aspect-ratio: 3/4;
    border-radius: 2px;
    overflow: hidden;
  }

  .about-accent-img {
    position: absolute;
    bottom: -3rem; right: -3rem;
    width: 55%;
    aspect-ratio: 1;
    border-radius: 2px;
    overflow: hidden;
    border: 6px solid var(--cream);
    box-shadow: 0 20px 60px rgba(58,74,53,0.12);
  }

  .about-content { padding: 2rem 0; }
  .about-content .section-title { margin-bottom: 2rem; }

  .about-text {
    font-size: 0.88rem;
    line-height: 2;
    color: var(--bark);
    font-weight: 300;
    margin-bottom: 1.5rem;
  }

  .about-stats {
    display: flex; gap: 3rem;
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid var(--stone);
  }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 300;
    color: var(--forest);
    line-height: 1;
  }
  .stat-label {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sage);
    margin-top: 0.4rem;
  }

  /* ── Rooms ── */
  #rooms {
    background: var(--cream);
    padding-bottom: 10rem;
  }

  .rooms-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 5rem;
  }

  .rooms-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 1.5rem;
  }

  .room-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .room-card:first-child { grid-row: span 1; aspect-ratio: 3/4; }
  .room-card:not(:first-child) { aspect-ratio: 4/5; }

  .room-img {
    width: 100%; height: 100%;
    transition: transform 0.8s cubic-bezier(.25,.46,.45,.94);
  }
  .room-card:hover .room-img { transform: scale(1.06); }

  .room-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(44,44,42,0.75) 0%, transparent 60%);
    opacity: 0.7;
    transition: opacity 0.4s;
  }
  .room-card:hover .room-overlay { opacity: 0.9; }

  .room-info {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 2rem;
    transform: translateY(0);
    transition: transform 0.4s ease;
  }

  .room-type {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--sage-light);
    margin-bottom: 0.5rem;
  }
  .room-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--white);
  }
  .room-price {
    font-size: 0.78rem;
    color: var(--stone);
    margin-top: 0.4rem;
    font-weight: 200;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.4s 0.1s;
  }
  .room-card:hover .room-price { opacity: 1; transform: translateY(0); }

  /* ── Experiences ── */
  #experiences {
    background: var(--forest);
    padding: 8rem 6rem;
    position: relative;
    overflow: hidden;
  }
  #experiences::before {
    content: '';
    position: absolute;
    top: -20%; right: -10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(138,158,126,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  #experiences .section-tag { color: var(--sage-light); }
  #experiences .section-tag::before { background: var(--sage-light); }
  #experiences .section-title { color: var(--white); }

  .exp-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
    margin-top: 5rem;
  }

  .exp-card {
    padding: 2.5rem 2rem;
    border: 1px solid rgba(138,158,126,0.2);
    position: relative;
    overflow: hidden;
    transition: border-color 0.4s, transform 0.4s;
  }
  .exp-card::before {
    content: '';
    position: absolute; bottom: 0; left: 0;
    width: 100%; height: 0;
    background: rgba(138,158,126,0.08);
    transition: height 0.5s ease;
  }
  .exp-card:hover { border-color: rgba(138,158,126,0.5); transform: translateY(-4px); }
  .exp-card:hover::before { height: 100%; }

  .exp-icon {
    width: 48px; height: 48px;
    margin-bottom: 2rem;
    color: var(--sage-light);
  }

  .exp-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--white);
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  .exp-desc {
    font-size: 0.78rem;
    line-height: 1.9;
    color: rgba(244,240,234,0.55);
    font-weight: 200;
  }

  /* ── Gallery ── */
  #gallery {
    background: var(--linen);
    padding: 8rem 6rem;
  }

  .gallery-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 4rem;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, 280px);
    gap: 1rem;
  }

  .g-item { overflow: hidden; border-radius: 2px; }
  .g-item:nth-child(1) { grid-column: 1/6; grid-row: 1; }
  .g-item:nth-child(2) { grid-column: 6/9; grid-row: 1; }
  .g-item:nth-child(3) { grid-column: 9/13; grid-row: 1/3; }
  .g-item:nth-child(4) { grid-column: 1/4; grid-row: 2; }
  .g-item:nth-child(5) { grid-column: 4/9; grid-row: 2; }

  .g-item svg {
    width: 100%; height: 100%;
    display: block;
    transition: transform 0.8s cubic-bezier(.25,.46,.45,.94);
  }
  .g-item:hover svg { transform: scale(1.07); }

  /* ── Testimonial ── */
  #testimonial {
    background: var(--cream);
    padding: 8rem 6rem;
    text-align: center;
  }

  .quote-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 8rem;
    color: var(--sage-light);
    line-height: 0.5;
    margin-bottom: 2rem;
    display: block;
    opacity: 0.5;
  }
  .quote-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 300;
    font-style: italic;
    color: var(--forest);
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.5;
  }
  .quote-author {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--sage);
  }

  .testimonials-dots {
    display: flex; gap: 0.5rem; justify-content: center;
    margin-top: 3rem;
  }
  .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--stone);
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }
  .dot.active { background: var(--sage); transform: scale(1.4); }

  /* ── Reserve ── */
  #reserve {
    background: var(--sand);
    padding: 6rem 6rem;
    position: relative;
    overflow: hidden;
  }
  #reserve::after {
    content: 'EDEN';
    position: absolute;
    right: -2rem; bottom: -3rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16rem;
    font-weight: 300;
    color: rgba(138,158,126,0.08);
    letter-spacing: 0.1em;
    pointer-events: none;
    white-space: nowrap;
  }

  .reserve-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }

  .reserve-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
    position: relative; z-index: 1;
  }

  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-group.full { grid-column: span 2; }

  .form-group label {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--bark);
    font-weight: 300;
  }

  .form-group input,
  .form-group select {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--stone);
    padding: 0.75rem 0;
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    color: var(--charcoal);
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s;
    appearance: none;
    cursor: pointer;
  }
  .form-group input:focus,
  .form-group select:focus { border-color: var(--sage); }

  .btn-reserve {
    grid-column: span 2;
    background: var(--forest);
    color: var(--white);
    border: none;
    padding: 1.1rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    font-weight: 300;
    margin-top: 0.5rem;
  }
  .btn-reserve:hover { background: var(--sage); transform: translateY(-2px); }

  /* ── Footer ── */
  footer {
    background: var(--charcoal);
    color: var(--sand);
    padding: 5rem 6rem 3rem;
  }

  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid rgba(200,190,176,0.1);
  }

  .footer-brand .logo {
    color: var(--sand);
    display: block;
    margin-bottom: 1.5rem;
  }
  .footer-brand .logo span { color: var(--sage-light); }

  .footer-tagline {
    font-size: 0.8rem;
    line-height: 1.9;
    color: rgba(232,224,212,0.5);
    font-weight: 200;
    max-width: 260px;
  }

  .footer-social {
    display: flex; gap: 1rem; margin-top: 2rem;
  }
  .social-link {
    width: 36px; height: 36px;
    border: 1px solid rgba(200,190,176,0.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--stone);
    text-decoration: none;
    transition: all 0.3s;
    font-size: 0.75rem;
  }
  .social-link:hover { border-color: var(--sage-light); color: var(--sage-light); }

  .footer-col h4 {
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--sage-light);
    margin-bottom: 1.8rem;
    font-weight: 300;
  }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 0.9rem; }
  .footer-col a {
    font-size: 0.8rem;
    color: rgba(232,224,212,0.5);
    text-decoration: none;
    font-weight: 200;
    transition: color 0.3s;
  }
  .footer-col a:hover { color: var(--sand); }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 3rem;
  }
  .footer-bottom p {
    font-size: 0.7rem;
    color: rgba(232,224,212,0.3);
    font-weight: 200;
    letter-spacing: 0.05em;
  }

  /* ── Reveal Animations ── */
  .reveal { opacity: 0; transform: translateY(30px); transition: all 0.9s cubic-bezier(.25,.46,.45,.94); }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-30px); transition: all 0.9s cubic-bezier(.25,.46,.45,.94); }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(30px); transition: all 0.9s cubic-bezier(.25,.46,.45,.94); }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-12px) rotate(1deg); }
    66% { transform: translateY(-6px) rotate(-1deg); }
  }
  .float-anim { animation: float 8s ease-in-out infinite; }
  .float-anim-2 { animation: float 10s ease-in-out infinite 1s; }
  .float-anim-3 { animation: float 12s ease-in-out infinite 2s; }

  /* Parallax */
  .parallax-layer { will-change: transform; }

  /* Page Loader */
  #loader {
    position: fixed; inset: 0;
    background: var(--forest);
    z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 1.5rem;
  }
  .loader-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 300;
    color: var(--white);
    letter-spacing: 0.4em;
    text-transform: uppercase;
    opacity: 0;
    animation: loaderFade 0.8s ease 0.3s forwards;
  }
  .loader-bar {
    width: 180px; height: 1px;
    background: rgba(255,255,255,0.15);
    position: relative; overflow: hidden;
  }
  .loader-bar::after {
    content: '';
    position: absolute; inset: 0;
    background: var(--sage-light);
    transform: translateX(-100%);
    animation: loaderBar 1.5s ease 0.2s forwards;
  }
  @keyframes loaderFade { to { opacity: 1; } }
  @keyframes loaderBar { to { transform: translateX(0); } }
</style>
</head>
<body>

<!-- Loader -->
<div id="loader">
  <div class="loader-logo">Eden Hotel</div>
  <div class="loader-bar"></div>
</div>

<!-- Cursor -->
<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- ═══════════════ HEADER ═══════════════ -->
<header id="header">
  <a href="#" class="logo">Eden <span>Hotel</span></a>
  <nav>
    <a href="#about">Sobre</a>
    <a href="#rooms">Suítes</a>
    <a href="#experiences">Experiências</a>
    <a href="#gallery">Galeria</a>
    <a href="#reserve" class="nav-cta">Reservar</a>
  </nav>
</header>

<!-- ═══════════════ HERO ═══════════════ -->
<section id="hero">
  <div class="hero-left">
    <div class="hero-tag reveal">Natureza. Silêncio. Sofisticação.</div>
    <h1 class="hero-title reveal" style="transition-delay:0.1s">
      Onde a <em>natureza</em><br>encontra o luxo
    </h1>
    <p class="hero-desc reveal" style="transition-delay:0.2s">
      No coração das montanhas, o Eden Hotel oferece uma fuga serena onde cada detalhe é cuidadosamente orquestrado pela natureza.
    </p>
    <div class="hero-actions reveal" style="transition-delay:0.3s">
      <a href="#reserve" class="btn-primary">Reservar Estadia</a>
      <a href="#rooms" class="btn-ghost">
        Ver Suítes
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>

  <div class="hero-right">
    <div class="hero-svg-wrap">
      <!-- Forest Scene SVG -->
      <svg viewBox="0 0 700 900" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C8D4C0"/>
            <stop offset="100%" stop-color="#E8E4DC"/>
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7A8A6E"/>
            <stop offset="100%" stop-color="#5A6B52"/>
          </linearGradient>
          <linearGradient id="tree1Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4A5E44"/>
            <stop offset="100%" stop-color="#3A4A35"/>
          </linearGradient>
          <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(244,240,234,0)"/>
            <stop offset="100%" stop-color="rgba(244,240,234,0.8)"/>
          </linearGradient>
          <filter id="blur1"><feGaussianBlur stdDeviation="3"/></filter>
          <filter id="blur2"><feGaussianBlur stdDeviation="6"/></filter>
          <filter id="blur3"><feGaussianBlur stdDeviation="12"/></filter>
        </defs>

        <!-- Sky -->
        <rect width="700" height="900" fill="url(#skyGrad)"/>

        <!-- Distant mountains -->
        <ellipse cx="150" cy="500" rx="250" ry="150" fill="#A8B89C" opacity="0.3" filter="url(#blur3)"/>
        <ellipse cx="550" cy="520" rx="200" ry="120" fill="#9BAD8F" opacity="0.25" filter="url(#blur3)"/>

        <!-- Far trees (blurry) -->
        <g opacity="0.4" filter="url(#blur2)">
          <polygon points="80,620 100,440 120,620" fill="#5A6B52"/>
          <polygon points="140,640 165,470 190,640" fill="#4A5E44"/>
          <polygon points="560,630 580,450 600,630" fill="#5A6B52"/>
          <polygon points="610,650 635,480 660,650" fill="#4A5E44"/>
        </g>

        <!-- Mid trees (slightly blurry) -->
        <g opacity="0.7" filter="url(#blur1)" class="float-anim-3">
          <polygon points="50,700 80,520 110,700" fill="#3A4A35"/>
          <rect x="78" y="690" width="4" height="30" fill="#5A3E28"/>
          <polygon points="190,720 215,560 240,720" fill="#4A5E44"/>
          <rect x="213" y="710" width="4" height="30" fill="#5A3E28"/>
          <polygon points="490,700 510,540 530,700" fill="#4A5E44"/>
          <rect x="508" y="690" width="4" height="30" fill="#5A3E28"/>
          <polygon points="600,710 625,545 650,710" fill="#3A4A35"/>
          <rect x="623" y="700" width="4" height="30" fill="#5A3E28"/>
        </g>

        <!-- Main trees (sharp) -->
        <g class="float-anim-2">
          <polygon points="130,810 170,540 210,810" fill="url(#tree1Grad)"/>
          <polygon points="150,730 175,590 200,730" fill="#8A9E7E" opacity="0.4"/>
          <rect x="168" y="798" width="6" height="50" fill="#5A3E28"/>

          <polygon points="470,820 520,530 570,820" fill="url(#tree1Grad)"/>
          <polygon points="490,740 525,580 560,740" fill="#8A9E7E" opacity="0.35"/>
          <rect x="518" y="808" width="7" height="50" fill="#5A3E28"/>
        </g>

        <!-- Foreground trees (biggest) -->
        <g class="float-anim">
          <polygon points="-10,900 60,580 130,900" fill="#2C3828"/>
          <rect x="57" y="880" width="8" height="60" fill="#4A2E18"/>

          <polygon points="580,900 650,560 720,900" fill="#2C3828"/>
          <rect x="647" y="880" width="8" height="60" fill="#4A2E18"/>

          <polygon points="270,900 350,500 430,900" fill="#3A4A35"/>
          <polygon points="295,800 350,600 405,800" fill="#4A5E44" opacity="0.6"/>
          <rect x="347" y="885" width="7" height="55" fill="#4A2E18"/>
        </g>

        <!-- Ground -->
        <ellipse cx="350" cy="870" rx="400" ry="80" fill="url(#groundGrad)"/>

        <!-- Hotel building silhouette -->
        <g opacity="0.85">
          <rect x="260" y="720" width="180" height="130" rx="2" fill="#E8E0D0"/>
          <rect x="270" y="700" width="160" height="25" rx="1" fill="#D4CABC"/>
          <!-- Roof -->
          <polygon points="255,720 350,680 445,720" fill="#C0B8A8"/>
          <!-- Windows -->
          <rect x="280" y="740" width="30" height="40" rx="1" fill="#8A9E7E" opacity="0.6"/>
          <rect x="325" y="740" width="30" height="40" rx="1" fill="#8A9E7E" opacity="0.7"/>
          <rect x="370" y="740" width="30" height="40" rx="1" fill="#8A9E7E" opacity="0.6"/>
          <!-- Door -->
          <rect x="330" y="800" width="40" height="50" rx="1" fill="#7A8A6E" opacity="0.7"/>
          <!-- Light glow -->
          <ellipse cx="350" cy="825" rx="50" ry="20" fill="#E8D080" opacity="0.1" filter="url(#blur2)"/>
        </g>

        <!-- Fireflies / lights -->
        <g opacity="0.7">
          <circle cx="200" cy="600" r="2" fill="#D4E880" opacity="0.8"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="250" cy="650" r="1.5" fill="#D4E880" opacity="0.6"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.5s" repeatCount="indefinite"/></circle>
          <circle cx="450" cy="580" r="2" fill="#D4E880" opacity="0.7"><animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite"/></circle>
          <circle cx="490" cy="640" r="1.5" fill="#D4E880"><animate attributeName="opacity" values="1;0.2;1" dur="3.5s" repeatCount="indefinite"/></circle>
          <circle cx="160" cy="680" r="1" fill="#D4E880"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle>
          <circle cx="540" cy="620" r="1.5" fill="#D4E880" opacity="0.8"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="3s" repeatCount="indefinite"/></circle>
        </g>

        <!-- Moon -->
        <circle cx="120" cy="120" r="45" fill="#F0EBE0" opacity="0.6" filter="url(#blur1)"/>
        <circle cx="120" cy="120" r="35" fill="#F4F0E8" opacity="0.8"/>
        <!-- Moon glow -->
        <circle cx="120" cy="120" r="60" fill="#F0EBE0" opacity="0.15" filter="url(#blur2)"/>

        <!-- Stars -->
        <g opacity="0.5">
          <circle cx="200" cy="80" r="1.2" fill="#F4F0E8"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite"/></circle>
          <circle cx="300" cy="50" r="1" fill="#F4F0E8"><animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="420" cy="90" r="1.5" fill="#F4F0E8"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite"/></circle>
          <circle cx="550" cy="60" r="1" fill="#F4F0E8"><animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.5s" repeatCount="indefinite"/></circle>
          <circle cx="620" cy="100" r="1.2" fill="#F4F0E8"><animate attributeName="opacity" values="0.4;0.9;0.4" dur="4.5s" repeatCount="indefinite"/></circle>
          <circle cx="380" cy="140" r="0.8" fill="#F4F0E8"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite"/></circle>
        </g>

        <!-- Mist layer -->
        <rect width="700" height="900" fill="url(#mist)"/>
      </svg>
    </div>
  </div>

  <div class="hero-scroll-hint">
    <div class="scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- ═══════════════ ABOUT ═══════════════ -->
<section id="about">
  <div class="about-visual reveal-left">
    <div class="about-main-img">
      <svg viewBox="0 0 500 667" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
        <defs>
          <linearGradient id="poolGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7AB5A8"/>
            <stop offset="100%" stop-color="#5A9080"/>
          </linearGradient>
          <filter id="softBlur"><feGaussianBlur stdDeviation="2"/></filter>
        </defs>
        <rect width="500" height="667" fill="#D4CABC"/>
        <!-- Sky bg -->
        <rect width="500" height="350" fill="#C8D4C0"/>
        <!-- Trees backdrop -->
        <g opacity="0.6" filter="url(#softBlur)">
          <polygon points="0,350 40,180 80,350" fill="#4A5E44"/>
          <polygon points="60,350 100,200 140,350" fill="#3A4A35"/>
          <polygon points="360,350 400,160 440,350" fill="#4A5E44"/>
          <polygon points="430,350 470,190 510,350" fill="#3A4A35"/>
        </g>
        <g opacity="0.9">
          <polygon points="150,360 190,150 230,360" fill="#3A4A35"/>
          <polygon points="280,360 320,130 360,360" fill="#4A5E44"/>
        </g>
        <!-- Ground terrace -->
        <rect x="0" y="340" width="500" height="327" fill="#C8BEB0"/>
        <!-- Pool -->
        <rect x="60" y="380" width="380" height="180" rx="4" fill="url(#poolGrad)" opacity="0.85"/>
        <!-- Pool reflection shimmer -->
        <g opacity="0.4">
          <line x1="80" y1="400" x2="440" y2="400" stroke="white" stroke-width="1"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/></line>
          <line x1="80" y1="430" x2="440" y2="430" stroke="white" stroke-width="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite"/></line>
          <line x1="80" y1="460" x2="440" y2="460" stroke="white" stroke-width="1"><animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite"/></line>
          <line x1="80" y1="500" x2="440" y2="500" stroke="white" stroke-width="0.5"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/></line>
        </g>
        <!-- Loungers -->
        <g fill="#E8E0D4">
          <rect x="80" y="570" width="100" height="25" rx="3"/>
          <rect x="85" y="557" width="30" height="20" rx="2"/>
          <rect x="310" y="570" width="100" height="25" rx="3"/>
          <rect x="375" y="557" width="30" height="20" rx="2"/>
        </g>
        <!-- Plants -->
        <g>
          <rect x="46" y="535" width="5" height="40" fill="#5A3E28"/>
          <ellipse cx="48" cy="520" rx="18" ry="28" fill="#5A7A50"/>
          <rect x="448" y="535" width="5" height="40" fill="#5A3E28"/>
          <ellipse cx="450" cy="520" rx="18" ry="28" fill="#5A7A50"/>
        </g>
        <!-- Hotel facade -->
        <rect x="120" y="280" width="260" height="100" fill="#E8E0D0"/>
        <!-- Windows -->
        <rect x="140" y="295" width="35" height="50" rx="1" fill="#8A9E7E" opacity="0.7"/>
        <rect x="195" y="295" width="35" height="50" rx="1" fill="#8A9E7E" opacity="0.6"/>
        <rect x="250" y="295" width="35" height="50" rx="1" fill="#8A9E7E" opacity="0.7"/>
        <rect x="305" y="295" width="35" height="50" rx="1" fill="#8A9E7E" opacity="0.6"/>
        <!-- Pergola -->
        <g stroke="#8A7060" stroke-width="2" fill="none" opacity="0.8">
          <line x1="80" y1="350" x2="80" y2="380"/>
          <line x1="420" y1="350" x2="420" y2="380"/>
          <line x1="60" y1="350" x2="440" y2="350"/>
          <line x1="90" y1="345" x2="90" y2="365"/>
          <line x1="130" y1="345" x2="130" y2="365"/>
          <line x1="170" y1="345" x2="170" y2="365"/>
          <line x1="210" y1="345" x2="210" y2="365"/>
          <line x1="250" y1="345" x2="250" y2="365"/>
          <line x1="290" y1="345" x2="290" y2="365"/>
          <line x1="330" y1="345" x2="330" y2="365"/>
          <line x1="370" y1="345" x2="370" y2="365"/>
          <line x1="410" y1="345" x2="410" y2="365"/>
        </g>
        <!-- Vines on pergola -->
        <g fill="#6A8A5A" opacity="0.6">
          <ellipse cx="110" cy="348" rx="12" ry="6"/>
          <ellipse cx="160" cy="346" rx="10" ry="5"/>
          <ellipse cx="250" cy="349" rx="14" ry="6"/>
          <ellipse cx="330" cy="347" rx="11" ry="5"/>
          <ellipse cx="390" cy="348" rx="10" ry="6"/>
        </g>
      </svg>
    </div>
    <div class="about-accent-img">
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
        <rect width="300" height="300" fill="#E8E0D4"/>
        <!-- Tea / wellness setup -->
        <rect x="60" y="180" width="180" height="5" rx="2" fill="#C8A878"/>
        <rect x="50" y="185" width="200" height="3" rx="1" fill="#B89868"/>
        <!-- Teapot -->
        <ellipse cx="150" cy="155" rx="45" ry="35" fill="#8A9E7E"/>
        <ellipse cx="150" cy="128" rx="20" ry="8" fill="#7A8E6E"/>
        <rect x="145" y="120" width="10" height="12" rx="3" fill="#6A7E5E"/>
        <path d="M195,145 Q220,145 215,165 Q210,175 195,165" stroke="#7A8E6E" stroke-width="3" fill="none"/>
        <path d="M105,145 Q80,145 85,165 Q90,175 105,165" stroke="#7A8E6E" stroke-width="3" fill="none"/>
        <!-- Steam -->
        <g opacity="0.5">
          <path d="M140,120 Q135,105 140,90" stroke="#B5C4A8" stroke-width="1.5" fill="none"><animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite"/></path>
          <path d="M150,118 Q145,100 150,85" stroke="#B5C4A8" stroke-width="1.5" fill="none"><animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/></path>
          <path d="M160,120 Q165,103 160,88" stroke="#B5C4A8" stroke-width="1.5" fill="none"><animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite"/></path>
        </g>
        <!-- Cups -->
        <ellipse cx="100" cy="182" rx="22" ry="10" fill="#9AAE8A"/>
        <path d="M78,182 Q78,200 100,200 Q122,200 122,182" fill="#8A9E7A"/>
        <ellipse cx="200" cy="182" rx="22" ry="10" fill="#9AAE8A"/>
        <path d="M178,182 Q178,200 200,200 Q222,200 222,182" fill="#8A9E7A"/>
        <!-- Leaves -->
        <ellipse cx="65" cy="170" rx="20" ry="10" fill="#6A8A5A" transform="rotate(-30,65,170)"/>
        <ellipse cx="235" cy="168" rx="18" ry="9" fill="#7A9A6A" transform="rotate(25,235,168)"/>
        <!-- Pebbles -->
        <ellipse cx="145" cy="215" rx="8" ry="4" fill="#B8B0A0"/>
        <ellipse cx="158" cy="218" rx="6" ry="3" fill="#C8C0B0"/>
        <ellipse cx="135" cy="220" rx="5" ry="3" fill="#A8A098"/>
      </svg>
    </div>
  </div>

  <div class="about-content reveal-right">
    <div class="section-tag">Nossa História</div>
    <h2 class="section-title">Um refúgio entre<br>as <em>árvores antigas</em></h2>
    <p class="about-text">
      Nascido do desejo de reconectar hóspedes à essência da natureza, o Eden Hotel é um santuário de serenidade. Cada espaço foi concebido para que o limite entre o exterior e o interior se dissolva suavemente.
    </p>
    <p class="about-text">
      Nossa filosofia é simples: o verdadeiro luxo é a quietude. Materiais naturais, luz filtrada pelo dossel das árvores e o sussurro constante da brisa compõem a experiência Eden.
    </p>
    <div class="about-stats">
      <div>
        <div class="stat-num">12</div>
        <div class="stat-label">Suítes exclusivas</div>
      </div>
      <div>
        <div class="stat-num">5★</div>
        <div class="stat-label">Avaliação Forbes</div>
      </div>
      <div>
        <div class="stat-num">3ha</div>
        <div class="stat-label">Reserva natural</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════ ROOMS ═══════════════ -->
<section id="rooms">
  <div class="rooms-header">
    <div>
      <div class="section-tag reveal">Acomodações</div>
      <h2 class="section-title reveal" style="transition-delay:0.1s">Suítes que<br>respiram <em>natureza</em></h2>
    </div>
    <a href="#reserve" class="btn-ghost reveal">
      Ver todas as suítes
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>

  <div class="rooms-grid">
    <!-- Suite 1 -->
    <div class="room-card reveal" data-hover>
      <svg class="room-img" viewBox="0 0 500 667" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <rect width="500" height="667" fill="#D4CABC"/>
        <rect width="500" height="300" fill="#C0D0B8"/>
        <!-- Forest view through window -->
        <g opacity="0.7">
          <polygon points="0,300 50,100 100,300" fill="#4A5E44"/>
          <polygon points="100,300 145,130 190,300" fill="#3A4A35"/>
          <polygon points="310,300 360,110 410,300" fill="#4A5E44"/>
          <polygon points="380,300 430,140 480,300" fill="#3A4A35"/>
          <polygon points="200,300 255,80 310,300" fill="#2C3828"/>
        </g>
        <rect y="270" width="500" height="397" fill="#E8E0D4"/>
        <!-- Bed -->
        <rect x="80" y="320" width="340" height="200" rx="5" fill="#F4F0EA"/>
        <rect x="80" y="320" width="340" height="40" rx="3" fill="#C8BEB0"/>
        <!-- Pillows -->
        <rect x="105" y="340" width="95" height="60" rx="5" fill="#FDFCFB"/>
        <rect x="210" y="340" width="95" height="60" rx="5" fill="#F4F0EA"/>
        <rect x="305" y="340" width="65" height="60" rx="4" fill="#FDFCFB"/>
        <!-- Blanket -->
        <rect x="80" y="400" width="340" height="120" rx="3" fill="#B5C4A8" opacity="0.7"/>
        <!-- Side tables -->
        <rect x="30" y="370" width="50" height="60" rx="3" fill="#C8A878"/>
        <circle cx="55" cy="370" r="8" fill="#D4B888" opacity="0.8"/>
        <rect x="420" y="370" width="50" height="60" rx="3" fill="#C8A878"/>
        <circle cx="445" cy="370" r="8" fill="#D4B888" opacity="0.8"/>
        <!-- Plant -->
        <rect x="455" y="470" width="6" height="30" fill="#5A3E28"/>
        <ellipse cx="458" cy="458" rx="22" ry="18" fill="#6A8A5A"/>
        <ellipse cx="448" cy="450" rx="14" ry="12" fill="#7A9A6A"/>
        <!-- Floor -->
        <rect y="530" width="500" height="137" fill="#C4B8A4"/>
        <g stroke="#B4A894" stroke-width="1" opacity="0.4">
          <line x1="0" y1="560" x2="500" y2="560"/>
          <line x1="0" y1="590" x2="500" y2="590"/>
          <line x1="0" y1="620" x2="500" y2="620"/>
          <line x1="0" y1="650" x2="500" y2="650"/>
          <line x1="100" y1="530" x2="100" y2="667"/>
          <line x1="200" y1="530" x2="200" y2="667"/>
          <line x1="300" y1="530" x2="300" y2="667"/>
          <line x1="400" y1="530" x2="400" y2="667"/>
        </g>
      </svg>
      <div class="room-overlay"></div>
      <div class="room-info">
        <div class="room-type">Suite Principal</div>
        <div class="room-name">Forest Suite</div>
        <div class="room-price">A partir de R$ 2.800 / noite</div>
      </div>
    </div>

    <!-- Suite 2 -->
    <div class="room-card reveal" style="transition-delay:0.1s" data-hover>
      <svg class="room-img" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <rect width="400" height="500" fill="#C8BEB0"/>
        <!-- Bath scene -->
        <rect width="400" height="200" fill="#B8D0C0"/>
        <!-- Window -->
        <rect x="100" y="20" width="200" height="160" rx="2" fill="#D4E4DC"/>
        <line x1="200" y1="20" x2="200" y2="180" stroke="#C8CABC" stroke-width="2"/>
        <line x1="100" y1="100" x2="300" y2="100" stroke="#C8CABC" stroke-width="2"/>
        <!-- Trees through window -->
        <g opacity="0.5" clip-path="url(#win)">
          <polygon points="110,180 140,60 170,180" fill="#4A5E44"/>
          <polygon points="220,180 255,40 290,180" fill="#3A4A35"/>
        </g>
        <!-- Bath tub -->
        <ellipse cx="200" cy="310" rx="140" ry="55" fill="#E8E4DC"/>
        <ellipse cx="200" cy="295" rx="130" ry="45" fill="#D4EAE4"/>
        <!-- Water ripple -->
        <ellipse cx="200" cy="295" rx="80" ry="25" fill="#B8D8D0" opacity="0.6"><animate attributeName="rx" values="80;90;80" dur="3s" repeatCount="indefinite"/></ellipse>
        <!-- Bath flowers -->
        <circle cx="160" cy="290" r="8" fill="#F0D0C0" opacity="0.8"/>
        <circle cx="240" cy="288" r="6" fill="#F0D8D0" opacity="0.7"/>
        <circle cx="200" cy="285" r="7" fill="#F4E0D0" opacity="0.8"/>
        <!-- Faucet -->
        <rect x="190" y="245" width="4" height="30" fill="#C0B0A0" rx="2"/>
        <rect x="180" y="245" width="24" height="4" rx="2" fill="#C0B0A0"/>
        <!-- Candles on edge -->
        <rect x="68" y="252" width="10" height="25" rx="2" fill="#F4F0EA"/>
        <ellipse cx="73" cy="252" rx="5" ry="3" fill="#F4D890"><animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/></ellipse>
        <rect x="315" y="255" width="10" height="22" rx="2" fill="#F4F0EA"/>
        <ellipse cx="320" cy="255" rx="5" ry="3" fill="#F4D890"><animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/></ellipse>
        <!-- Stone floor -->
        <rect y="370" width="400" height="130" fill="#B8B0A0"/>
        <g stroke="#A8A090" stroke-width="1" opacity="0.5">
          <line x1="0" y1="400" x2="400" y2="400"/>
          <line x1="0" y1="430" x2="400" y2="430"/>
          <line x1="0" y1="460" x2="400" y2="460"/>
          <line x1="0" y1="490" x2="400" y2="490"/>
          <line x1="80" y1="370" x2="80" y2="500"/>
          <line x1="200" y1="370" x2="200" y2="500"/>
          <line x1="320" y1="370" x2="320" y2="500"/>
        </g>
        <!-- Towels -->
        <rect x="30" y="350" width="60" height="20" rx="3" fill="#F0ECE4"/>
        <rect x="310" y="350" width="60" height="20" rx="3" fill="#F0ECE4"/>
        <!-- Plant -->
        <rect x="358" y="200" width="5" height="80" fill="#5A3E28"/>
        <ellipse cx="360" cy="190" rx="30" ry="22" fill="#6A8A5A"/>
      </svg>
      <div class="room-overlay"></div>
      <div class="room-info">
        <div class="room-type">Wellness Suite</div>
        <div class="room-name">Moss & Stone</div>
        <div class="room-price">A partir de R$ 3.400 / noite</div>
      </div>
    </div>

    <!-- Suite 3 -->
    <div class="room-card reveal" style="transition-delay:0.2s" data-hover>
      <svg class="room-img" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <rect width="400" height="500" fill="#2C3828"/>
        <!-- Night forest -->
        <rect width="400" height="500" fill="#1E2820"/>
        <!-- Stars -->
        <g fill="#F4F0E8" opacity="0.6">
          <circle cx="50" cy="50" r="1"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="120" cy="30" r="1.5"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite"/></circle>
          <circle cx="200" cy="60" r="1"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite"/></circle>
          <circle cx="300" cy="40" r="1.2"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="3.5s" repeatCount="indefinite"/></circle>
          <circle cx="370" cy="80" r="1"><animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/></circle>
          <circle cx="80" cy="90" r="0.8"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="340" cy="20" r="1.3"><animate attributeName="opacity" values="0.1;0.7;0.1" dur="4.5s" repeatCount="indefinite"/></circle>
        </g>
        <!-- Moon -->
        <circle cx="320" cy="80" r="35" fill="#E8E0C8" opacity="0.7" filter="url(#softBlur)"/>
        <circle cx="320" cy="80" r="28" fill="#F0E8D0" opacity="0.9"/>
        <!-- Trees silhouette -->
        <g fill="#131A10">
          <polygon points="0,500 50,250 100,500"/>
          <polygon points="300,500 360,220 420,500"/>
          <polygon points="120,500 165,300 210,500"/>
          <polygon points="230,500 275,270 320,500" fill="#1A2218"/>
        </g>
        <!-- Deck -->
        <rect x="0" y="380" width="400" height="120" fill="#3A2A1A"/>
        <g stroke="#4A3A2A" stroke-width="2">
          <line x1="0" y1="395" x2="400" y2="395"/>
          <line x1="0" y1="415" x2="400" y2="415"/>
          <line x1="0" y1="435" x2="400" y2="435"/>
          <line x1="0" y1="455" x2="400" y2="455"/>
          <line x1="0" y1="475" x2="400" y2="475"/>
          <line x1="0" y1="495" x2="400" y2="495"/>
        </g>
        <!-- Chairs -->
        <g fill="#2A1E14">
          <rect x="50" y="350" width="80" height="35" rx="3"/>
          <rect x="55" y="330" width="70" height="25" rx="2"/>
          <rect x="50" y="383" width="10" height="20" rx="2"/>
          <rect x="120" y="383" width="10" height="20" rx="2"/>
        </g>
        <g fill="#2A1E14">
          <rect x="270" y="350" width="80" height="35" rx="3"/>
          <rect x="275" y="330" width="70" height="25" rx="2"/>
          <rect x="270" y="383" width="10" height="20" rx="2"/>
          <rect x="340" y="383" width="10" height="20" rx="2"/>
        </g>
        <!-- Fire pit glow -->
        <circle cx="200" cy="370" r="15" fill="#D4780A" opacity="0.4" filter="url(#softBlur)"/>
        <circle cx="200" cy="370" r="8" fill="#E8900A" opacity="0.7"><animate attributeName="r" values="7;9;7" dur="0.8s" repeatCount="indefinite"/></circle>
        <!-- Fireflies -->
        <circle cx="170" cy="300" r="1.5" fill="#D4E880"><animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="260" cy="280" r="1" fill="#D4E880"><animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite"/></circle>
        <circle cx="130" cy="320" r="1.5" fill="#D4E880"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/></circle>
      </svg>
      <div class="room-overlay"></div>
      <div class="room-info">
        <div class="room-type">Bangalô Privativo</div>
        <div class="room-name">Starlight Deck</div>
        <div class="room-price">A partir de R$ 4.200 / noite</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════ EXPERIENCES ═══════════════ -->
<section id="experiences">
  <div style="max-width:600px" class="reveal">
    <div class="section-tag">Experiências</div>
    <h2 class="section-title">Rituais que<br><em>restauram</em> a alma</h2>
  </div>

  <div class="exp-grid">
    <div class="exp-card reveal">
      <svg class="exp-icon" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="20" r="10" stroke="currentColor" stroke-width="1.2"/>
        <path d="M12,40 Q16,32 24,32 Q32,32 36,40" stroke="currentColor" stroke-width="1.2" fill="none"/>
        <circle cx="24" cy="20" r="3" fill="currentColor" opacity="0.4"/>
        <path d="M4,24 Q8,14 16,12" stroke="currentColor" stroke-width="1" opacity="0.5"/>
        <path d="M44,24 Q40,14 32,12" stroke="currentColor" stroke-width="1" opacity="0.5"/>
      </svg>
      <div class="exp-name">Spa & Ayurveda</div>
      <p class="exp-desc">Rituais de cura ancestral com ingredientes colhidos na própria reserva. Uma jornada completa de renovação.</p>
    </div>

    <div class="exp-card reveal" style="transition-delay:0.1s">
      <svg class="exp-icon" viewBox="0 0 48 48" fill="none">
        <path d="M8,38 Q10,20 24,10 Q38,20 40,38" stroke="currentColor" stroke-width="1.2" fill="none"/>
        <path d="M16,38 Q18,25 24,18 Q30,25 32,38" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.5"/>
        <path d="M24,10 L24,38" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <circle cx="24" cy="10" r="3" fill="currentColor" opacity="0.4"/>
      </svg>
      <div class="exp-name">Forest Bathing</div>
      <p class="exp-desc">Caminhos guiados pelo dossel da mata para uma imersão sensorial na prática japonesa do Shinrin-yoku.</p>
    </div>

    <div class="exp-card reveal" style="transition-delay:0.2s">
      <svg class="exp-icon" viewBox="0 0 48 48" fill="none">
        <path d="M6,30 Q12,14 24,12 Q36,14 42,30" stroke="currentColor" stroke-width="1.2" fill="none"/>
        <path d="M10,38 L38,38" stroke="currentColor" stroke-width="1.2"/>
        <path d="M15,38 L15,30 Q15,20 24,16 Q33,20 33,30 L33,38" stroke="currentColor" stroke-width="1" opacity="0.5" fill="none"/>
        <circle cx="24" cy="32" r="4" stroke="currentColor" stroke-width="1.2"/>
      </svg>
      <div class="exp-name">Alta Gastronomia</div>
      <p class="exp-desc">Menu degustação com produtos sazonais da horta orgânica, harmonizado com vinhos naturais de pequenos produtores.</p>
    </div>

    <div class="exp-card reveal" style="transition-delay:0.3s">
      <svg class="exp-icon" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="1.2"/>
        <path d="M24,10 L24,38 M10,24 L38,24" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
        <circle cx="24" cy="24" r="5" fill="currentColor" opacity="0.3"/>
        <path d="M24,10 Q32,14 32,24 Q32,34 24,38" fill="currentColor" opacity="0.15"/>
        <circle cx="24" cy="10" r="2" fill="currentColor"/>
        <circle cx="24" cy="38" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="10" cy="24" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="38" cy="24" r="2" fill="currentColor"/>
      </svg>
      <div class="exp-name">Stargazing</div>
      <p class="exp-desc">Noites de observação astronômica com telescópios de alta potência, longe de qualquer poluição luminosa.</p>
    </div>
  </div>
</section>

<!-- ═══════════════ GALLERY ═══════════════ -->
<section id="gallery">
  <div class="gallery-header">
    <div>
      <div class="section-tag reveal">Galeria</div>
      <h2 class="section-title reveal" style="transition-delay:0.1s">Fragmentos<br>do <em>paraíso</em></h2>
    </div>
    <a href="#" class="btn-ghost reveal">
      Ver galeria completa
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>

  <div class="gallery-grid">
    <!-- Imagem 1: Piscina -->
    <div class="g-item reveal">
      <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="280" fill="#B8C8B8"/>
        <rect width="600" height="160" fill="#C8D8C0"/>
        <g opacity="0.6"><polygon points="0,160 40,60 80,160" fill="#4A5E44"/><polygon points="520,160 560,50 600,160" fill="#3A4A35"/><polygon points="200,160 250,40 300,160" fill="#5A6E50"/><polygon points="330,160 375,70 420,160" fill="#4A5E44"/></g>
        <rect x="0" y="155" width="600" height="125" fill="#C0B8A8"/>
        <rect x="50" y="170" width="500" height="100" rx="4" fill="#6A9E98" opacity="0.8"/>
        <ellipse cx="300" cy="195" rx="200" ry="30" fill="#7AB5A8" opacity="0.5"/>
        <g stroke="rgba(255,255,255,0.3)" stroke-width="1" fill="none"><ellipse cx="300" cy="185" rx="100" ry="12"><animate attributeName="rx" values="100;120;100" dur="4s" repeatCount="indefinite"/></ellipse><ellipse cx="200" cy="200" rx="60" ry="8"><animate attributeName="rx" values="60;80;60" dur="3s" repeatCount="indefinite"/></ellipse></g>
        <g fill="#FDFCFB" opacity="0.9"><rect x="60" y="250" width="70" height="12" rx="3"/><rect x="65" y="240" width="20" height="14" rx="2"/><rect x="470" y="250" width="70" height="12" rx="3"/><rect x="525" y="240" width="20" height="14" rx="2"/></g>
        <g fill="#6A8A5A"><ellipse cx="40" cy="158" rx="12" ry="20"/><ellipse cx="560" cy="158" rx="12" ry="20"/></g>
      </svg>
    </div>

    <!-- Imagem 2: Jardim -->
    <div class="g-item reveal" style="transition-delay:0.1s">
      <svg viewBox="0 0 350 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="350" height="280" fill="#A8B89A"/>
        <g fill="#8A9E7E"><ellipse cx="80" cy="100" rx="60" ry="80"/><ellipse cx="200" cy="80" rx="50" ry="70"/><ellipse cx="300" cy="110" rx="55" ry="75"/></g>
        <g fill="#7A9270"><ellipse cx="80" cy="100" rx="40" ry="55"/><ellipse cx="200" cy="80" rx="35" ry="50"/><ellipse cx="300" cy="110" rx="38" ry="52"/></g>
        <g fill="#6A8260"><ellipse cx="75" cy="105" rx="25" ry="35"/><ellipse cx="200" cy="85" rx="22" ry="30"/><ellipse cx="295" cy="115" rx="24" ry="33"/></g>
        <rect x="0" y="200" width="350" height="80" fill="#8A7A60"/>
        <g stroke="#7A6A50" stroke-width="2" opacity="0.5"><line x1="0" y1="215" x2="350" y2="215"/><line x1="0" y1="235" x2="350" y2="235"/><line x1="0" y1="255" x2="350" y2="255"/><line x1="0" y1="275" x2="350" y2="275"/><line x1="70" y1="200" x2="70" y2="280"/><line x1="175" y1="200" x2="175" y2="280"/><line x1="280" y1="200" x2="280" y2="280"/></g>
        <g fill="#F0D890" opacity="0.7"><circle cx="60" cy="160" r="8"/><circle cx="95" cy="140" r="6"/><circle cx="185" cy="150" r="7"/><circle cx="310" cy="155" r="8"/></g>
        <g fill="#E8C8A0" opacity="0.5"><circle cx="70" cy="155" r="5"/><circle cx="200" cy="145" r="6"/><circle cx="300" cy="165" r="5"/></g>
      </svg>
    </div>

    <!-- Imagem 3: Vista aérea -->
    <div class="g-item reveal" style="transition-delay:0.2s">
      <svg viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="560" fill="#4A5E44"/>
        <g fill="#3A4A35"><circle cx="80" cy="80" r="50"/><circle cx="200" cy="60" r="45"/><circle cx="320" cy="90" r="55"/><circle cx="50" cy="200" r="45"/><circle cx="180" cy="180" r="50"/><circle cx="340" cy="190" r="48"/><circle cx="100" cy="320" r="52"/><circle cx="250" cy="300" r="46"/><circle cx="360" cy="350" r="44"/><circle cx="60" cy="450" r="50"/><circle cx="200" cy="430" r="48"/><circle cx="340" cy="460" r="52"/></g>
        <g fill="#6A8A5A" opacity="0.7"><circle cx="80" cy="80" r="30"/><circle cx="200" cy="60" r="28"/><circle cx="320" cy="90" r="33"/><circle cx="50" cy="200" r="27"/><circle cx="180" cy="180" r="32"/><circle cx="340" cy="190" r="29"/><circle cx="100" cy="320" r="31"/><circle cx="250" cy="300" r="28"/><circle cx="360" cy="350" r="27"/><circle cx="60" cy="450" r="30"/><circle cx="200" cy="430" r="29"/><circle cx="340" cy="460" r="31"/></g>
        <!-- Hotel roof aerial -->
        <rect x="140" y="240" width="120" height="80" rx="3" fill="#E8E0D0" opacity="0.9"/>
        <polygon points="130,240 200,210 270,240" fill="#C8C0B0" opacity="0.9"/>
        <!-- Pool aerial -->
        <rect x="155" y="330" width="90" height="55" rx="4" fill="#6AA8A0" opacity="0.85"/>
        <!-- Paths -->
        <g stroke="#C8A878" stroke-width="3" fill="none" opacity="0.6"><path d="M200,560 L200,330"/><path d="M200,330 Q180,290 155,270"/><path d="M200,330 Q220,290 245,270"/></g>
      </svg>
    </div>

    <!-- Imagem 4: Café da manhã -->
    <div class="g-item reveal" style="transition-delay:0.15s">
      <svg viewBox="0 0 350 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="350" height="280" fill="#E8E0D4"/>
        <!-- Table -->
        <ellipse cx="175" cy="180" rx="150" ry="80" fill="#D4C8B0"/>
        <ellipse cx="175" cy="175" rx="145" ry="75" fill="#C8BCA4"/>
        <!-- Tablecloth -->
        <ellipse cx="175" cy="172" rx="135" ry="68" fill="#F4F0EA"/>
        <!-- Coffee -->
        <ellipse cx="120" cy="170" rx="30" ry="18" fill="#8A7060"/>
        <ellipse cx="120" cy="163" rx="28" ry="15" fill="#6A5048" opacity="0.9"/>
        <path d="M92,160 Q84,160 86,172 Q88,180 96,178" stroke="#A08070" stroke-width="2" fill="none"/>
        <!-- Steam -->
        <path d="M110,155 Q107,143 110,132" stroke="#C8BEB0" stroke-width="1.5" fill="none" opacity="0.6"><animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite"/></path>
        <path d="M120,153 Q117,140 120,128" stroke="#C8BEB0" stroke-width="1.5" fill="none" opacity="0.5"><animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/></path>
        <!-- Croissant -->
        <path d="M200,155 Q215,140 235,150 Q250,160 245,175 Q230,185 215,178 Q200,170 200,155" fill="#D4A860"/>
        <path d="M205,157 Q220,143 238,153" stroke="#C09050" stroke-width="1.5" fill="none"/>
        <!-- Fruit -->
        <circle cx="170" cy="145" r="12" fill="#E84040" opacity="0.8"/>
        <circle cx="188" cy="142" r="10" fill="#E85030" opacity="0.7"/>
        <path d="M178,135 Q176,125 170,120" stroke="#5A8A40" stroke-width="1.5" fill="none"/>
        <!-- Flowers on table -->
        <circle cx="255" cy="145" r="6" fill="#F0D890"/>
        <circle cx="248" cy="152" r="5" fill="#F0C880"/>
        <circle cx="262" cy="152" r="5" fill="#F4D8A0"/>
        <rect x="253" y="158" width="3" height="18" fill="#6A9A4A"/>
        <!-- Morning light -->
        <rect width="350" height="60" fill="rgba(255,240,200,0.15)"/>
        <!-- Window frame top -->
        <rect width="350" height="30" fill="#C8A060" opacity="0.3"/>
        <g stroke="#B09050" stroke-width="2" opacity="0.4"><line x1="175" y1="0" x2="175" y2="30"/><line x1="0" y1="15" x2="350" y2="15"/></g>
      </svg>
    </div>

    <!-- Imagem 5: Trilha -->
    <div class="g-item reveal" style="transition-delay:0.2s">
      <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="280" fill="#8A9E7E"/>
        <rect width="600" height="280" fill="#7A8E6E" opacity="0.5"/>
        <!-- Path -->
        <path d="M280,280 Q300,200 310,140 Q320,80 350,20" stroke="#C8A878" stroke-width="18" fill="none" opacity="0.7"/>
        <path d="M280,280 Q300,200 310,140 Q320,80 350,20" stroke="#D4B888" stroke-width="12" fill="none" opacity="0.5"/>
        <!-- Trees both sides -->
        <g fill="#3A4A35">
          <polygon points="0,280 30,140 60,280"/>
          <polygon points="50,280 80,160 110,280"/>
          <polygon points="100,280 128,150 156,280"/>
          <polygon points="440,280 470,145 500,280"/>
          <polygon points="500,280 530,155 560,280"/>
          <polygon points="550,280 578,140 606,280"/>
        </g>
        <g fill="#4A5E44" opacity="0.7">
          <polygon points="20,280 45,165 70,280"/>
          <polygon points="75,280 100,175 125,280"/>
          <polygon points="460,280 488,168 516,280"/>
          <polygon points="520,280 546,162 572,280"/>
        </g>
        <!-- Light shafts -->
        <g opacity="0.15" fill="#F0E8D0">
          <polygon points="200,0 250,0 320,280 270,280"/>
          <polygon points="380,0 420,0 480,280 440,280"/>
        </g>
        <!-- Ferns ground -->
        <g fill="#5A7A4A" opacity="0.8">
          <ellipse cx="160" cy="260" rx="40" ry="15" transform="rotate(-20,160,260)"/>
          <ellipse cx="420" cy="265" rx="38" ry="13" transform="rotate(15,420,265)"/>
          <ellipse cx="200" cy="270" rx="30" ry="12" transform="rotate(-10,200,270)"/>
          <ellipse cx="390" cy="270" rx="32" ry="12" transform="rotate(10,390,270)"/>
        </g>
        <!-- Morning mist -->
        <rect width="600" height="80" y="0" fill="rgba(240,235,225,0.3)" filter="url(#blur2)"/>
      </svg>
    </div>
  </div>
</section>

<!-- ═══════════════ TESTIMONIAL ═══════════════ -->
<section id="testimonial">
  <span class="quote-mark reveal">"</span>
  <p class="quote-text reveal" id="quote-text" style="transition-delay:0.1s">
    O Eden não é apenas um hotel. É uma experiência que redefine o que significa verdadeiramente descansar. Cada amanhecer entre as árvores pareceu um presente.
  </p>
  <div class="quote-author reveal" id="quote-author" style="transition-delay:0.2s">— Isabela Ferreira · São Paulo, Brasil</div>
  <div class="testimonials-dots reveal" style="transition-delay:0.3s">
    <div class="dot active" onclick="changeQuote(0)"></div>
    <div class="dot" onclick="changeQuote(1)"></div>
    <div class="dot" onclick="changeQuote(2)"></div>
  </div>
</section>

<!-- ═══════════════ RESERVE ═══════════════ -->
<section id="reserve">
  <div class="reserve-inner">
    <div class="reveal-left">
      <div class="section-tag">Reservas</div>
      <h2 class="section-title">Comece sua<br><em>jornada</em> Eden</h2>
      <p style="font-size:0.85rem;color:var(--bark);font-weight:300;line-height:1.9;margin-top:1.5rem;max-width:320px;">
        Nossas anfitrionas estão disponíveis para criar uma experiência completamente personalizada para você.
      </p>
      <div style="margin-top:2.5rem;display:flex;align-items:center;gap:1rem;">
        <div style="width:44px;height:44px;border:1px solid var(--stone);display:flex;align-items:center;justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bark)" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
        </div>
        <div>
          <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--sage);margin-bottom:0.2rem;">Central de Reservas</div>
          <div style="font-size:0.9rem;color:var(--charcoal);font-weight:300;">+55 (11) 9 9999-8888</div>
        </div>
      </div>
    </div>

    <form class="reserve-form reveal-right" onsubmit="return false;">
      <div class="form-group">
        <label>Check-in</label>
        <input type="date">
      </div>
      <div class="form-group">
        <label>Check-out</label>
        <input type="date">
      </div>
      <div class="form-group">
        <label>Hóspedes</label>
        <select>
          <option>1 hóspede</option>
          <option>2 hóspedes</option>
          <option>3 hóspedes</option>
          <option>4 hóspedes</option>
        </select>
      </div>
      <div class="form-group">
        <label>Suíte</label>
        <select>
          <option>Forest Suite</option>
          <option>Moss & Stone</option>
          <option>Starlight Deck</option>
          <option>Qualquer disponível</option>
        </select>
      </div>
      <div class="form-group full">
        <label>Nome completo</label>
        <input type="text" placeholder="Seu nome">
      </div>
      <div class="form-group full">
        <label>E-mail</label>
        <input type="email" placeholder="seu@email.com">
      </div>
      <button class="btn-reserve">Verificar Disponibilidade</button>
    </form>
  </div>
</section>

<!-- ═══════════════ FOOTER ═══════════════ -->
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <a href="#" class="logo">Eden <span>Hotel</span></a>
      <p class="footer-tagline">Um santuário onde a natureza dita o ritmo e o luxo se revela no silêncio.</p>
      <div class="footer-social">
        <a href="#" class="social-link">ig</a>
        <a href="#" class="social-link">fb</a>
        <a href="#" class="social-link">tt</a>
        <a href="#" class="social-link">yt</a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Hotel</h4>
      <ul>
        <li><a href="#about">Nossa História</a></li>
        <li><a href="#rooms">Suítes</a></li>
        <li><a href="#experiences">Experiências</a></li>
        <li><a href="#gallery">Galeria</a></li>
        <li><a href="#">Sustentabilidade</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Serviços</h4>
      <ul>
        <li><a href="#">Spa & Bem-estar</a></li>
        <li><a href="#">Gastronomia</a></li>
        <li><a href="#">Eventos Privados</a></li>
        <li><a href="#">Transfers</a></li>
        <li><a href="#">Concierge</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contato</h4>
      <ul>
        <li><a href="#">Estrada do Eden, km 12</a></li>
        <li><a href="#">Serra da Mantiqueira, SP</a></li>
        <li><a href="#">reservas@edenhotel.com</a></li>
        <li><a href="#">+55 (11) 9 9999-8888</a></li>
        <li><a href="#">Política de Privacidade</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© 2025 Eden Hotel. Todos os direitos reservados.</p>
    <p style="display:flex;gap:2rem;">
      <a href="#" style="color:rgba(232,224,212,0.3);text-decoration:none;font-size:0.7rem;transition:color 0.3s;" onmouseover="this.style.color='rgba(232,224,212,0.7)'" onmouseout="this.style.color='rgba(232,224,212,0.3)'">Termos de Uso</a>
      <a href="#" style="color:rgba(232,224,212,0.3);text-decoration:none;font-size:0.7rem;transition:color 0.3s;" onmouseover="this.style.color='rgba(232,224,212,0.7)'" onmouseout="this.style.color='rgba(232,224,212,0.3)'">Cookies</a>
    </p>
  </div>
</footer>

<script>
// ── Page Loader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    loader.style.opacity = '0';
    loader.style.transform = 'translateY(-20px)';
    setTimeout(() => loader.remove(), 800);
    // Trigger hero reveals
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120 + 200);
    });
  }, 1800);
});

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, [data-hover], .room-card, .exp-card, .dot').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
});

// ── Header Scroll ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Parallax ──
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  document.querySelectorAll('.float-anim, .float-anim-2, .float-anim-3').forEach((el, i) => {
    const speed = [0.03, 0.05, 0.07][i % 3];
    el.style.transform = `translateY(${sy * speed}px)`;
  });
});

// ── Testimonials ──
const quotes = [
  { text: 'O Eden não é apenas um hotel. É uma experiência que redefine o que significa verdadeiramente descansar. Cada amanhecer entre as árvores pareceu um presente.', author: '— Isabela Ferreira · São Paulo, Brasil' },
  { text: 'Nunca imaginei que um hotel pudesse me fazer sentir tão presente. O silêncio do Eden é o maior luxo que já experimentei em anos de viagens.', author: '— Rodrigo Mendes · Rio de Janeiro, Brasil' },
  { text: 'A fusão entre natureza e sofisticação é perfeita. O spa, a gastronomia, os bangalôs — tudo respira autenticidade e cuidado em cada detalhe.', author: '— Ana Carolina Luz · Belo Horizonte, Brasil' }
];
let currentQuote = 0;

function changeQuote(i) {
  currentQuote = i;
  const qText = document.getElementById('quote-text');
  const qAuthor = document.getElementById('quote-author');
  qText.style.opacity = '0'; qText.style.transform = 'translateY(10px)';
  qAuthor.style.opacity = '0';
  setTimeout(() => {
    qText.textContent = quotes[i].text;
    qAuthor.textContent = quotes[i].author;
    qText.style.transition = 'opacity 0.5s, transform 0.5s';
    qText.style.opacity = '1'; qText.style.transform = 'translateY(0)';
    qAuthor.style.transition = 'opacity 0.5s 0.1s';
    qAuthor.style.opacity = '1';
  }, 300);
  document.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === i));
}

setInterval(() => changeQuote((currentQuote + 1) % 3), 5000);

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
</script>
</body>
</html>