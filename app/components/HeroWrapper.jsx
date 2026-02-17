"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const LazyHero = dynamic(() => import('./Hero3d'), {
  ssr: false,  // работает в 16.x
  loading: () => null,  // НЕ показываем ничего от dynamic — мы сами контролируем preloader
});

export default function HeroWrapper() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Имитируем/ждём полной готовности Hero (можно улучшить позже)
    // Пока просто задержка + проверка, что компонент mounted
    const timer = setTimeout(() => setLoaded(true), 500); // подстрой под свой сайт (0.5–1.5 с)
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ЕДИНСТВЕННЫЙ preloader — держится, пока loaded === false */}
      {!loaded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D0D0C] text-white">
          <div className="text-center">
            <div className="text-8xl md:text-10xl font-bold animate-pulse tracking-tighter">
              HLDKV
            </div>
            <div className="mt-8 text-2xl md:text-3xl opacity-70">
              Загрузка дизайна...
            </div>
          </div>
        </div>
      )}

      {/* Сам Hero появляется только когда loaded */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
          height: '100vh',
          width: '100%',
        }}
      >
        <LazyHero />
      </div>
    </>
  );
}