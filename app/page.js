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
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [hideLoader]);


    useEffect(() => {
        if (!showHero) return;

        const timer = setTimeout(() => {
            services.forEach((s) => {
            useGLTF.preload(s.glb);
            });
        }, 3000);

        return () => clearTimeout(timer);
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
