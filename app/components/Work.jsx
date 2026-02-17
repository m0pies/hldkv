"use client";
import { motion } from "framer-motion";

export default function Work() {
    const works = [
        {
            title: "Project One",
            description: "Short description of the project one",
        },
        {
            title: "Project Two",
            description: "Short description of the project two",
        },
        {
            title: "Project Three",
            description: "Short description of the project three",
        },
        {
            title: "Project Four",
            description: "Short description of the project four",
        },
    ];

    return (
        <section id="works" className="bg-[#0D0D0C] text-white">
            <div className="flex flex-col gap-8 mx-auto w-full max-w-[1200px] px-8 pt-8 pb-24">
                <div className="flex flex-col justify-between">
                    <motion.h2
                        initial={{ opacity: 0, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 5.0, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg text-[#7d7d7d]">
                        Selected works
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {works.map((w, i) => (
                        <article
                        key={i}
                        className="group rounded-[20px] border border-white/10 bg-white/[0.03] px-4 pt-4 pb-8 transition hover:border-white/20">
                            <div className="aspect-[16/9] w-full rounded-[4px] bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/10" />

                            <h3 className="mt-4 text-lg font-medium">{w.title}</h3>
                            <p className="mt-2 text-sm text-white/60">{w.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}