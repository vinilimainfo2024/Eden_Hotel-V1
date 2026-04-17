'use client';
import React, { useRef } from 'react';

export default function HomePage() {
  const quartosRef = useRef(null);

  const scrollToQuartos = () => {
    quartosRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const quartos = [
    {
      nome: "Suíte Imperial",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      desc: "Luxo absoluto com vista panorâmica e design refinado."
    },
    {
      nome: "Villa Privativa",
      img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      desc: "Piscina exclusiva e conexão total com a natureza."
    },
    {
      nome: "Suíte Premium",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      desc: "Conforto elevado com detalhes sofisticados."
    }
  ];

  return (
    <div className="bg-[#020403] text-white font-sans">

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          <h1 className="text-sm tracking-[0.4em] uppercase text-white">
            EDEN
          </h1>

          <nav className="hidden md:flex gap-10 text-xs uppercase tracking-widest">
            <button onClick={scrollToQuartos}>Acomodações</button>
            <button>Experiências</button>
            <button>Contato</button>
          </nav>

          <button className="border border-[#C6A85B] text-[#C6A85B] px-5 py-2 rounded-full text-xs hover:bg-[#C6A85B] hover:text-black transition">
            Reservar
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="relative z-10 text-center max-w-4xl px-6 mt-32">
          <h1 className="text-6xl md:text-7xl font-light mb-6">
            Experiência <span className="text-[#C6A85B] italic">Exclusiva</span>
          </h1>

          <p className="text-gray-300 mb-10 text-lg">
            Um refúgio de luxo onde natureza e sofisticação se encontram.
          </p>

          <button
            onClick={scrollToQuartos}
            className="border border-white px-10 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
          >
            Explorar
          </button>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-28 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-light mb-6">
          Um novo conceito de <span className="text-[#C6A85B]">luxo</span>
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Projetado para oferecer experiências inesquecíveis, combinando arquitetura moderna,
          natureza exuberante e serviços de alto padrão.
        </p>
      </section>

      {/* SUÍTES */}
      <section ref={quartosRef} className="py-28 bg-[#040706]">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl mb-16 text-center font-light">
            Nossas <span className="text-[#C6A85B] italic">Suítes</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {quartos.map((q, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden">

                <img src={q.img} className="h-[400px] w-full object-cover group-hover:scale-110 transition duration-700"/>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 p-6">
                  <h3 className="text-2xl mb-2">{q.nome}</h3>
                  <p className="text-sm text-gray-300">{q.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIAS */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-light mb-16">
            Experiências <span className="text-[#C6A85B]">Exclusivas</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-left">

            <div className="border border-white/10 p-8 rounded-2xl">
              <h3 className="mb-4 text-xl">Spa & Relaxamento</h3>
              <p className="text-gray-400 text-sm">
                Tratamentos premium para revitalizar corpo e mente.
              </p>
            </div>

            <div className="border border-white/10 p-8 rounded-2xl">
              <h3 className="mb-4 text-xl">Gastronomia</h3>
              <p className="text-gray-400 text-sm">
                Alta culinária com chefs renomados.
              </p>
            </div>

            <div className="border border-white/10 p-8 rounded-2xl">
              <h3 className="mb-4 text-xl">Passeios Privados</h3>
              <p className="text-gray-400 text-sm">
                Experiências únicas e personalizadas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="grid md:grid-cols-3">
        <img src="https://images.unsplash.com/photo-1501117716987-c8e1ecb2105e" className="h-72 w-full object-cover"/>
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" className="h-72 w-full object-cover"/>
        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" className="h-72 w-full object-cover"/>
      </section>

      {/* CTA */}
      <section className="py-28 text-center">
        <h2 className="text-4xl mb-6 font-light">
          Reserve sua experiência
        </h2>

        <button className="bg-[#C6A85B] text-black px-12 py-4 rounded-full uppercase text-sm tracking-widest hover:scale-105 transition">
          Reservar Agora
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Eden Resort — Todos os direitos reservados
      </footer>

    </div>
  );
}