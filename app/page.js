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

    useEffect(() => {
        let value = 0;
        let frame;

        const step = () => {
            value += 1;
            setProgress(value);

            if (value < 100) {
                frame = requestAnimationFrame(step);
            } else {
                setShowHero(true);

                setTimeout(() => {
                    setHideLoader(true);
                }, 400);
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
            <BottomNav />

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
