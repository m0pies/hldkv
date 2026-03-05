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
    "I approach design with structure and intention, starting from the problem and context before moving into visual direction, ensuring clarity and consistency in every project.";

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const revealProgress = useTransform(scrollYProgress, [0, 0.45], [0, 1], {
    clamp: true,
  });

  const fadeProgress = useTransform(scrollYProgress, [0.7, 0.76], [1, 0], {
    clamp: true,
  });

  const words = text.split(" ");

  return (
    <section id="about" className="bg-[#0D0D0C] text-white">
      <div ref={targetRef} className="relative z-0 h-[220vh] md:h-[200vh]">
        <motion.div
          className="sticky top-0 mx-auto flex h-screen max-w-[1200px] items-center px-4 md:px-8"
          style={{ opacity: fadeProgress }}
        >
          <p className="flex flex-wrap text-3xl leading-[1.2] font-semibold text-[#7d7d7d] md:text-4xl lg:text-6xl text-balance">
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
        </motion.div>
      </div>
    </section>
  );
}