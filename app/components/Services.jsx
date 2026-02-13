"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ServiceIconScene from "./ServiceIconScene";
import * as THREE from "three";
import { services } from "../data/services";

function clamp01(x) {
    return Math.min(1, Math.max(0, x));
}

function smoothstep(edge0, edge1, x) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

function getState(p, count) {
    const SWAP = (3 * Math.PI) / 2;
    const TWO_PI = Math.PI * 2;

    const totalAngle =
        count <= 1 ? SWAP : SWAP + (count - 2) * TWO_PI + SWAP; // last does 270°

    const theta = clamp01(p) * totalAngle;

    let activeIndex;
    if (theta < SWAP) activeIndex = 0;
    else activeIndex = 1 + Math.floor((theta - SWAP) / TWO_PI);
    activeIndex = Math.min(activeIndex, count - 1);

    const nextIndex = Math.min(activeIndex + 1, count - 1);

    const phase = theta % TWO_PI;

    let mix = 0;
    if (activeIndex < count - 1) {
        const boundary = activeIndex === 0 ? SWAP : SWAP + activeIndex * TWO_PI;
        const width = THREE.MathUtils.degToRad(10);
        const dist = Math.abs(theta - boundary);
        mix = smoothstep(width, 0, dist);
    }

    return { activeIndex, nextIndex, phase, mix };
}


export default function ServicesSection() {
    const ref = useRef(null);
    const [progress, setProgress] = useState(0);

    const { maxTitle, maxDesc } = useMemo(() => {
        const titles = services.map((s) => s.title ?? "");
        const descs = services.map((s) => s.desc ?? "");

        const maxTitle = titles.reduce((a, b) => (b.length > a.length ? b : a), "");
        const maxDesc = descs.reduce((a, b) => (b.length > a.length ? b : a), "");

        return { maxTitle, maxDesc };
    }, []);

    useEffect(() => {
        let raf = 0;

        const update = () => {
            const el = ref.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;

            const total = rect.height - vh;
            const scrolled = -rect.top;
            const p = total > 0 ? clamp01(scrolled / total) : 0;

            setProgress((prev) => {
                if (Math.abs(prev - p) < 0.002) return prev;
                return p;
            });

            raf = requestAnimationFrame(update);
        };

        raf = requestAnimationFrame(update);
        return () => cancelAnimationFrame(raf);
    }, []);

    const textState = useMemo(() => {
        const count = services?.length ?? 0;
        if (count === 0) return { activeIndex: 0, nextIndex: 0, mix: 0 };

        const p = Number.isFinite(progress) ? progress : 0;
        const { activeIndex, nextIndex, mix } = getState(p, count);

        return { activeIndex, nextIndex, mix };
    }, [progress]);

    const a = services?.[textState.activeIndex];
    const b = services?.[textState.nextIndex];

    if (!a || !b) {
        return (
            <section id="services" className="bg-[#0D0D0C] text-white h-screen">
                <div className="mx-auto max-w-[1400px] px-6 py-20">
                    <div className="text-white/60">Loading services…</div>
                </div>
            </section>
        );
    }

    const aOpacity = 1 - textState.mix;
    const bOpacity = textState.mix;

    return (
        <section
            id="services"
            ref={ref}
            className="bg-[#0D0D0C] text-white"
            style={{ height: `${services.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen">
                <div className="relative mx-auto h-full w-full max-w-[1400px] px-6 pt-10 pb-24">
                    <div className="flex justify-center">
                        <h2 className="text-sm tracking-[0.2em] text-white/50">SERVICES</h2>
                    </div>

                    <div className="mt-10 grid h-[calc(100%-2.5rem)] grid-cols-1 items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <div className="hidden lg:block">
                            <div className="relative max-w-[28ch]">
                                <div style={{ opacity: aOpacity }} className="absolute inset-0">
                                    <div className="text-4xl font-semibold">
                                        {a.title}
                                    </div>
                                </div>
                                <div style={{ opacity: bOpacity }} className="absolute inset-0">
                                    <div className="text-4xl font-semibold">
                                        {b.title}
                                    </div>
                                </div>

                                <div className="invisible text-4xl font-semibold">
                                    {maxTitle}
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block lg:hidden">
                            <div className="max-w-xl">
                                <div className="relative max-w-[28ch]">
                                    <div style={{ opacity: aOpacity }} className="absolute inset-0">
                                        <div className="text-4xl font-semibold">
                                            {a.title}
                                        </div>
                                    </div>
                                    <div style={{ opacity: bOpacity }} className="absolute inset-0">
                                        <div className="text-4xl font-semibold">
                                            {b.title}
                                        </div>
                                    </div>
                                    <div className="invisible text-4xl font-semibold">
                                        {maxTitle}
                                    </div>
                                </div>

                                <div className="relative mt-2">
                                    <p style={{ opacity: aOpacity }} className="absolute inset-0 text-white/70 text-balance leading-relaxed">
                                        {a.desc}
                                    </p>
                                    <p style={{ opacity: bOpacity }} className="absolute inset-0 text-white/70 text-balance leading-relaxed">
                                        {b.desc}
                                    </p>
                                    <p className="invisible text-white/70 text-balance leading-relaxed">{maxDesc}</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 md:order-none md:col-start-2 lg:col-start-2">
                            <ServiceIconScene progress={progress} />
                        </div>

                        <div className="hidden lg:block">
                            <div className="relative max-w-xl">
                                <p
                                    style={{ opacity: aOpacity }}
                                    className="absolute inset-0 text-white/70 text-lg text-balance leading-relaxed"
                                >
                                    {a.desc}
                                </p>
                                <p
                                    style={{ opacity: bOpacity }}
                                    className="absolute inset-0 text-white/70 text-lg text-balance leading-relaxed"
                                >
                                    {b.desc}
                                </p>

                                <p className="invisible text-white/70 text-lg text-balance leading-relaxed">
                                    {maxDesc}
                                </p>
                            </div>
                        </div>

                        <div className="order-2 md:hidden">
                            <div className="relative max-w-[28ch]">
                                <div style={{ opacity: aOpacity }} className="absolute inset-0">
                                    <div className="text-4xl font-semibold ">{a.title}</div>
                                </div>
                                <div style={{ opacity: bOpacity }} className="absolute inset-0">
                                    <div className="text-4xl font-semibold ">{b.title}</div>
                                </div>
                                <div className="invisible text-4xl font-semibold">
                                    {maxTitle}
                                </div>
                            </div>

                            <div className="relative mt-2">
                                <p style={{ opacity: aOpacity }} className="absolute inset-0 text-white/70 text-balance leading-relaxed">
                                    {a.desc}
                                </p>
                                <p style={{ opacity: bOpacity }} className="absolute inset-0 text-white/70 text-balance leading-relaxed">
                                    {b.desc}
                                </p>
                                <p className="invisible text-white/70 text-balance leading-relaxed">{maxDesc}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 bottom-24 -translate-x-1/2 text-center">
                        <div className="text-xs tracking-[0.25em] text-white/40">
                            SCROLL TO EXPLORE
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
