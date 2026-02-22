"use client";

import dynamic from "next/dynamic";
import Services from "./components/Services"
import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { services } from "./data/services";
import Contact from "./components/ContactSection";
import Work from "./components/Work";

const Hero = dynamic(() => import("./components/Hero3d"), { ssr: false });          
const About = dynamic(() => import("./components/About"), { ssr: false });



export default function Home() {
    const [showHero, setShowHero] = useState(false);
    const [hideLoader, setHideLoader] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
  if (!hideLoader) {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const preventScroll = (e) => {
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventScroll, { passive: false });

    document.addEventListener("wheel", preventScroll, { passive: false });

    const preventKeys = (e) => {
      if ([32, 33, 34, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", preventKeys);

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);

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
        let value = 0;

        const interval = setInterval(() => {
            value += 2;

            if (value >= 100) {
            value = 100;
            clearInterval(interval);
            setShowHero(true);
            setTimeout(() => setHideLoader(true), 400);
            }

            setProgress(value);
        }, 25);

        return () => clearInterval(interval);
    }, []);

    return (
        <main>

            {showHero && <Hero />}

            <Work />
            <Services />
            <About />
            <Contact />

            {!hideLoader && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D0D0C]">
                    <div className="text-white/50 text-sm">
                        {progress}%
                    </div>
                </div>
            )}
        </main>
    );
}
