'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white font-poppins"
      style={{ backgroundImage: "url('/fundo_register.png')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* container principal */}
      <div className="relative z-10 w-full max-w-6xl bg-[#0b0f14]/80 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* ESQUERDA (texto) */}
          <div className="space-y-6">

            <h1 className="text-4xl md:text-5xl font-light leading-tight">
              <span className="text-emerald-500 font-bold">
                Hotel & Resort
              </span>
              <br />
              Experiência Premium
            </h1>

            <p className="text-gray-300 text-sm max-w-md">
              Viva momentos únicos com conforto, sofisticação e atendimento exclusivo no Eden Hotel.
            </p>

            {/* icones (simulação estilo da imagem) */}
            <div className="flex gap-3 text-xs text-gray-400">
              <span>🍽 Restaurante</span>
              <span>🛏 Luxo</span>
              <span>🌴 Relax</span>
            </div>

            {/* botão */}
            <button
              onClick={() => router.push('/login')}
              className="mt-4 bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition"
            >
              Reservar Agora
            </button>
          </div>

          {/* DIREITA (imagem destacada) */}
          <div className="relative flex justify-center">

            <div className="p-2 border border-emerald-500/40 rounded-2xl">
              <img
                src="/fundoquarto.jpeg" // coloca sua imagem aqui
                alt="Hotel"
                className="w-40 h-48 object-cover rounded-xl"
              />
            </div>

            {/* detalhe decorativo */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/10 rounded-2xl -z-10"></div>

          </div>
        </div>

        {/* rodapé pequeno */}
        <div className="mt-10 flex justify-between text-xs text-gray-500">
          <span>Eden Hotel</span>
          <span>© 2026</span>
        </div>
      </div>
    </main>
  );
}