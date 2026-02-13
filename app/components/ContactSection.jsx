"use client";

import React from "react";
import { motion } from "framer-motion";

const socials = [
    { name: "Instagram", href: "https://instagram.com/", bg: "from-zinc-900 to-zinc-900", icon: InstagramIcon },
    { name: "LinkedIn", href: "https://linkedin.com/in/", bg: "from-zinc-900 to-zinc-900", icon: LinkedInIcon },
    { name: "X / Twitter", href: "https://x.com/", bg: "from-zinc-900 to-zinc-900", icon: XIcon },
    { name: "Email", href: "mailto:hello@yourmail.com", bg: "from-zinc-900 to-zinc-900", icon: MailIcon },
];

const SOFT_EASE = [0.16, 1, 0.3, 1];

const gridVariants = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.12,
            staggerChildren: 0.16,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2.0,
            ease: SOFT_EASE,
        },
    },
};

export default function ContactSection() {
    return (
        <section id="contact" className="relative bg-[#0D0D0C] text-white">
            <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-20">
                <div className="flex flex-col gap-10">
                    <header className="flex flex-col gap-4">
                        <p className="text-sm text-white/50">CONTACT</p>
                        <h2 className="text-4xl md:text-6xl font-semibold">
                            Let’s build something <span className="text-white/60">clean & bold.</span>
                        </h2>
                        <p className="max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">
                            Reach out for collaborations, projects, or just to say hi.
                        </p>
                    </header>

                    <motion.div
                        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.6,
                            margin: "0px 0px -10% 0px",
                        }}
                    >
                        {socials.map((s, i) => {
                            const Icon = s.icon;

                            return (
                                <motion.a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.name}
                                    className="group block"
                                    custom={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 18 },
                                        show: (index) => ({
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 1.35,
                                                ease: [0.16, 1, 0.3, 1],
                                                delay: 0.12 + index * 0.14,
                                            },
                                        }),
                                    }}
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    <div
                                        className={[
                                            "relative aspect-square w-full rounded-[24px]",
                                            "bg-gradient-to-br",
                                            s.bg,
                                            "shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
                                            "overflow-hidden",
                                            "ring-2 ring-white/10 group-hover:ring-white/25",
                                            "transition-[box-shadow,ring-color] duration-[1000ms] ease-out",
                                        ].join(" ")}
                                    >
                                        <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/15" />

                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <div
                                                className={[
                                                    "h-28 w-28 md:h-32 md:w-32 rounded-full",
                                                    "bg-white/[0.010] blur-2xl",
                                                    "shadow-[0_0_0_rgba(0,0,0,0)]",
                                                    "transition-all duration-[1000ms] ease-out",
                                                    "group-hover:bg-white/[0.028]",
                                                ].join(" ")}
                                            />
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Icon className="h-14 w-14 md:h-16 md:w-16 text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]" />
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                            <span className="text-sm font-medium text-white/90">{s.name}</span>
                                            <span className="text-white/70 transition-transform duration-[1000ms] ease-out group-hover:translate-x-0.5">
              ↗
            </span>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function InstagramIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
    );
}

function LinkedInIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
        </svg>
    );
}

function XIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
    );
}

function MailIcon({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className={className} viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
        </svg>
    );
}
