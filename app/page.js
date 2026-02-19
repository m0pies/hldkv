"use client";

import dynamic from "next/dynamic";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/ContactSection";
import BottomNav from "./components/BottomNav";
import { useState, useEffect } from "react";

const Hero = dynamic(() => import("./components/Hero3d"), { ssr: false });
const Services = dynamic(() => import("./components/Services"), { ssr: false });

export default function Home() {
  const [showHeroCanvas, setShowHeroCanvas] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  const [showBottomNav, setShowBottomNav] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  // ---------------- Loader ----------------
  useEffect(() => {
    let value = 0;
    let frame;

    const step = () => {
      value += 1;
      setProgress(value);

      if (value < 100) {
        frame = requestAnimationFrame(step);
      } else {
        // Показываем Canvas Hero после loader
        setShowHeroCanvas(true);

        // Прячем loader плавно
        setTimeout(() => {
          setHideLoader(true);
        }, 400);

        // Запускаем таймер Nav
        const t = setTimeout(() => {
          setShowBottomNav(true);
        }, 2500);

        return () => clearTimeout(t);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  // ---------------- Contact observer ----------------
  useEffect(() => {
    const el = document.querySelector("#contact");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      {
        threshold: 0.01,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <main>
      {/* Hero контейнер всегда есть, чтобы не прыгала страница */}
      <section id="hero" className="relative h-screen w-full">
        {showHeroCanvas && <Hero />}
      </section>

      <Work />
      {showHeroCanvas && <Services />}
      <About />
      <Contact />
      <BottomNav heroIntroStart={showBottomNav && !contactInView} />

      {/* Preloader */}
      {!hideLoader && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D0D0C] transition-opacity duration-500">
          <div className="text-white/50 text-sm">{progress}%</div>
        </div>
      )}
    </main>
  );
}
