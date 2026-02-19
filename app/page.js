"use client";

import dynamic from "next/dynamic";
import Work from "./components/Work";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/ContactSection";
import BottomNav from "./components/BottomNav";
import { useState, useEffect } from "react";

const Hero = dynamic(() => import("./components/Hero3d"), {
    ssr: false,
});

export default function Home() {
    const [showHero, setShowHero] = useState(false);
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
                setShowHero(true); // 👉 монтируем Hero

                setTimeout(() => {
                    setHideLoader(true); // 👉 скрываем loader
                }, 400);
            }
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, []);

    // ---------------- Nav через 2.5 сек после появления Hero ----------------

    useEffect(() => {
        if (!showHero) return;

        const t = setTimeout(() => {
            setShowBottomNav(true);
        }, 2500);

        return () => clearTimeout(t);
    }, [showHero]);

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
            {showHero && <Hero />}

            <Work />
            <Services />
            <About />
            <Contact />

            <BottomNav heroIntroStart={showBottomNav && !contactInView} />

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
