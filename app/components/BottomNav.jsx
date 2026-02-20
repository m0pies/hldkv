"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNav() {
    const pathname = usePathname();

    const [hide, setHide] = useState(false);

    const firstIntroRef = useRef(true);

    const go = (id) => (e) => {
        if (pathname === "/") {
            e.preventDefault();
            document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        if (pathname !== "/") return;

        const el = document.querySelector("#contact");
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                setHide(entry.isIntersecting);
            },
            {
                threshold: 0.01,
                rootMargin: "0px 0px -20% 0px",
            }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [pathname]);

    useEffect(() => {
        if (pathname !== "/") return;

        if (!hide) {
            const t = setTimeout(() => {
                firstIntroRef.current = false;
            }, 50);
            return () => clearTimeout(t);
        }
    }, [hide, pathname]);

    const introDelay = firstIntroRef.current ? 2.5 : 0;

    return (
        <AnimatePresence>
                <motion.nav
                initial={{ y: 80, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                    duration: 0.7,
                    delay: 0, // убираем introDelay
                    ease: [0.22, 1, 0.36, 1],
                    },
                }}
                exit={{
                    y: 80,
                    opacity: 0,
                    transition: {
                    duration: 0.22,
                    delay: 0,
                    ease: [0.22, 1, 0.36, 1],
                    },
                }}
                className="fixed bottom-8 left-0 right-0 z-[999]"
            >
                    <div className="mx-auto w-fit max-w-[1200px] px-6 pointer-events-auto">
                        <div className="flex gap-6 rounded-full border border-white/5 bg-black/40 px-5 py-3 backdrop-blur">
                            <Link href="/#hero" onClick={go("#hero")} className="text-white/80 hover:text-white">
                                Home
                            </Link>
                            <Link href="/#works" onClick={go("#works")} className="text-white/80 hover:text-white">
                                Works
                            </Link>
                            <Link href="/#services" onClick={go("#services")} className="text-white/80 hover:text-white">
                                Services
                            </Link>
                            <Link href="/#contact" onClick={go("#contact")} className="text-white/80 hover:text-white">
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.nav>
        </AnimatePresence>
    );
}
