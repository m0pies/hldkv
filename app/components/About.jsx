"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Word({ children, progress, range }) {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-25 text-white">{children}</span>
      <motion.span style={{ opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
    );
}

export default function About() {
    const targetRef = useRef(null);

    const text =
        "We build premium digital experiences with a strong focus on clarity, typography, and product thinking. We design interfaces, craft brands, and ship modern websites that feel intentional and timeless.";

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const revealProgress = useTransform(scrollYProgress, [0, 0.55], [0, 1], {
        clamp: true,
    });

    const words = text.split(" ");

    return (
        <section id="about" className="bg-[#0D0D0C] text-white">
            <div ref={targetRef} className="relative z-0 h-[240vh] md:h-[220vh]">
                <div className="sticky top-0 mx-auto flex h-screen max-w-[1024px] items-center px-6">
                    <p className="flex flex-wrap text-3xl font-semibold text-white/20 md:text-4xl lg:text-5xl">
                        {words.map((word, i) => {
                            const start = i / words.length;
                            const end = start + 1 / words.length;
                            return (
                                <Word key={i} progress={revealProgress} range={[start, end]}>
                                    {word}
                                </Word>
                            );
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
}
