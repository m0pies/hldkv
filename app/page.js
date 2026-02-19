"use client";

import Hero from "./components/Hero3d";
import Work from "./components/Work";
// import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/ContactSection";
import BottomNav from "./components/BottomNav";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Services = dynamic(
    () => import("./components/Services"),
    { ssr: false }
);

export default function Home() {
    const [heroIntroStart, setHeroIntroStart] = useState(false);
    const [showBottomNav, setShowBottomNav] = useState(false);
    const [contactInView, setContactInView] = useState(false);

    useEffect(() => {
        if (!heroIntroStart) return;

        const t = setTimeout(() => {
            setShowBottomNav(true);
        }, 2500);

        return () => clearTimeout(t);
    }, [heroIntroStart]);

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
            <Hero onIntroStart={() => setHeroIntroStart(true)} />
            <Work />
            <Services />
            <About />
            <Contact />
            <BottomNav heroIntroStart={showBottomNav && !contactInView} />
        </main>
    );
}
