"use client";

import dynamic from "next/dynamic";
import Services from "./components/Services"
import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { services } from "./data/services";

const Hero = dynamic(() => import("./components/Hero3d"), { ssr: false });          
const Work = dynamic(() => import("./components/Work"), { ssr: false });
const About = dynamic(() => import("./components/About"), { ssr: false });
const Contact = dynamic(() => import("./components/ContactSection"), { ssr: false });



export default function Home() {
    const [showHero, setShowHero] = useState(false);
    const [hideLoader, setHideLoader] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
  if (!hideLoader) {
    // 1. Сохраняем текущую позицию скролла
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // 2. Блокируем скролл на body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // 3. Блокируем touch-скролл глобально (самое важное для мобильных)
    const preventScroll = (e) => {
      e.preventDefault();
    };

    // touchmove — основной скролл пальцем
    document.addEventListener("touchmove", preventScroll, { passive: false });

    // wheel — колёсико мыши
    document.addEventListener("wheel", preventScroll, { passive: false });

    // keydown — стрелки, space, page up/down
    const preventKeys = (e) => {
      if ([32, 33, 34, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", preventKeys);

    return () => {
      // Восстанавливаем всё при скрытии прелоадера
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY); // возвращаем на место

      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("keydown", preventKeys);
    };
  }
}, [hideLoader]);

    useEffect(() => {
    if (!showHero) return;

    const loadWhenIdle = () => {
        services.forEach((s, i) => {
            setTimeout(() => {
            useGLTF.preload(s.glb);
            }, i * 200);
        });
    };


    if ('requestIdleCallback' in window) {
        const handle = requestIdleCallback(loadWhenIdle);
        return () => cancelIdleCallback(handle);
    } else {
        const timer = setTimeout(loadWhenIdle, 2000);
        return () => clearTimeout(timer);
    }
    }, [showHero]);


    useEffect(() => {
        let frame;
        let value = 0;

        const step = () => {
        value += Math.random() * 2;
        if (value > 100) value = 100;

        setProgress(Math.floor(value));

        if (value < 100) {
            frame = requestAnimationFrame(step);
        } else {
            setShowHero(true);
            setTimeout(() => setHideLoader(true), 400);
        }
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <main>

            {showHero && <Hero />}

            <Work />
            <Services />
            <About />
            <Contact />

            {!hideLoader && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D0D0C] transition-opacity duration-500">
                    <div className="text-white/50 text-sm">
                        {progress}%
                    </div>
                </div>
            )}
        </main>
    );
}
