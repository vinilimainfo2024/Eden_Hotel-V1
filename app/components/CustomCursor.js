'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Esconde o cursor padrão do sistema globalmente
    document.body.style.cursor = 'none';

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const animRing = () => {
      // Interpolação suave (0.12 é a velocidade do "atraso" do anel)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', onMove);
    animRing();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .cursor-dot {
          position: fixed;
          width: 10px;
          height: 10px;
          background: #C6A85B; /* var(--gold) */
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(198,168,91,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
        }
        /* Força o cursor none em links e botões para não aparecer o ponteiro do sistema */
        a, button { cursor: none !important; }
      `}</style>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}