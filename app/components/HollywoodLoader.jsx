'use client';
import { useEffect, useState } from 'react';

export default function HollywoodLoader({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(() => onFinish(), 1600);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`cinema ${exit ? 'exit' : ''}`}>

      {/* LETTERBOX */}
      <div className="top-bar"></div>
      <div className="bottom-bar"></div>

      {/* FUNDO */}
      <div className="bg"></div>

      {/* LUZ CINEMATOGRÁFICA */}
      <div className="light-sweep"></div>

      {/* VINHETA */}
      <div className="vignette"></div>

      {/* LOGO */}
      <div className="center">
        <h1 className="logo">EDEN</h1>
        <p className="sub">RESORT & SPA</p>
      </div>

      {/* PROGRESS */}
      <div className="progress">
        <div className="fill"></div>
      </div>

      {/* PARTICLES */}
      {Array.from({ length: 60 }).map((_, i) => (
        <span key={i} className="particle"></span>
      ))}

      <style>{`
        .cinema {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: black;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1.5s ease;
        }

        .cinema.exit {
          animation: exitCinema 1.6s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes exitCinema {
          0% { opacity: 1; transform: scale(1); filter: blur(0); }
          100% { opacity: 0; transform: scale(1.25); filter: blur(14px); }
        }

        /* BARRAS CINEMA */
        .top-bar, .bottom-bar {
          position: absolute;
          left: 0;
          width: 100%;
          height: 80px;
          background: black;
          z-index: 10;
        }

        .top-bar { top: 0; }
        .bottom-bar { bottom: 0; }

        /* FUNDO */
        .bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, #0a0f0c, #000);
          animation: bgMove 10s ease-in-out infinite alternate;
        }

        @keyframes bgMove {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }

        /* LUZ */
        .light-sweep {
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.08),
            transparent
          );
          animation: sweep 6s infinite linear;
        }

        @keyframes sweep {
          0% { transform: translateX(-100%) rotate(10deg); }
          100% { transform: translateX(100%) rotate(10deg); }
        }

        /* VINHETA */
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 60%, rgba(0,0,0,0.95));
        }

        /* LOGO */
        .center {
          z-index: 2;
          text-align: center;
        }

        .logo {
          font-size: 90px;
          letter-spacing: 0.6em;
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1px #C6A85B;
          position: relative;
          overflow: hidden;
        }

        .logo::before {
          content: "EDEN";
          position: absolute;
          width: 0%;
          color: #C6A85B;
          overflow: hidden;
          white-space: nowrap;
          animation: reveal 3s forwards;
        }

        @keyframes reveal {
          to { width: 100%; }
        }

        .logo::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.5),
            transparent
          );
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .sub {
          margin-top: 16px;
          font-size: 13px;
          letter-spacing: 0.5em;
          color: rgba(255,255,255,0.5);
        }

        /* PROGRESS */
        .progress {
          margin-top: 60px;
          width: 280px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          overflow: hidden;
        }

        .fill {
          width: 0%;
          height: 100%;
          background: linear-gradient(to right, #9A7A35, #C6A85B, #E8D5A3);
          animation: load 5s ease forwards;
        }

        @keyframes load {
          to { width: 100%; }
        }

        /* PARTICLES */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #C6A85B;
          border-radius: 50%;
          opacity: 0.2;
          animation: float 16s linear infinite;
        }

        @keyframes float {
          from { transform: translateY(100vh); }
          to { transform: translateY(-10vh) translateX(60px); }
        }
      `}</style>
    </div>
  );
}