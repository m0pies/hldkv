"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./Button";

const heroEase = [0.16, 1, 0.3, 1];

const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: heroEase,
    },
  },
};

const textRevealVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.06,
    },
  },
};

const subtitleVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.46,
      staggerChildren: 0.06,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    rotateX: -28,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: heroEase,
    },
  },
};

const heroTitle = "Делаю сайты для бизнеса с фокусом на результат";

function splitWords(text) {
  return text.split(" ");
}

export default function HeroSection() {
  const words = splitWords(heroTitle);
  const subtitle =
    "От задачи до готового сайта с понятной логикой и контролем на каждом этапе";
  const subtitleWords = splitWords(subtitle);

  return (
    <section id="hero" className="section-frame">
      <div className="section-shell pt-4 sm:pt-6 lg:pt-8">
        <motion.div className="section-content" initial="hidden" animate="show">
          <motion.div
            className="flex justify-start"
            variants={heroItemVariants}
            initial="hidden"
            animate="show"
            transition={{ delay: 1.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/10 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 sm:text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/45" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Открыт к новым проектам
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="section-content flex w-full min-h-[70vh] flex-col justify-center pb-16 pt-4 sm:pb-24 sm:pt-8 lg:pb-32 lg:pt-12"
        >
          <motion.div
            className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3 lg:mb-8 lg:gap-4"
            initial="hidden"
            animate="show"
            variants={heroItemVariants}
            transition={{ delay: 1.1 }}
          >
            <Image
              src="/pfp.webp"
              alt="Егор Холодков"
              width={128}
              height={128}
              className="h-16 w-16 rounded-full object-cover sm:h-18 sm:w-18 lg:h-20 lg:w-20"
              priority
            />

            <div className="flex flex-col">
              <span className="text-lg font-medium text-text-primary sm:text-xl lg:text-2xl">
                Егор Холодков
              </span>
              <span className="text-sm text-text-secondary sm:text-base lg:text-lg">
                Веб-дизайнер
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-balance text-4xl font-semibold text-text-primary sm:text-5xl lg:text-6xl [perspective:1000px]"
            variants={textRevealVariants}
            aria-label={heroTitle}
            initial="hidden"
            animate="show"
          >
            {words.map((word, wordIndex) => (
              <motion.span
                key={`${word}-${wordIndex}`}
                variants={wordVariants}
                className="mr-[0.32em] inline-block will-change-transform last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="mt-2 max-w-2xl text-balance text-base leading-relaxed text-text-secondary sm:mt-3 sm:text-lg lg:mt-4 lg:text-xl"
            variants={subtitleVariants}
            initial="hidden"
            animate="show"
          >
            {subtitleWords.map((word, wordIndex) => (
              <motion.span
                key={`${word}-${wordIndex}`}
                variants={wordVariants}
                className="mr-[0.32em] inline-block will-change-transform last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-4 w-fit sm:mt-6 lg:mt-8"
            variants={heroItemVariants}
            initial="hidden"
            animate="show"
            transition={{ delay: 1.1 }}
          >
            <Button
              href="https://t.me/itshldkv"
              target="_blank"
              rel="noreferrer"
              className="w-fit"
            >
              Обсудить проект
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
