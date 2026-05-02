"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

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

function splitWords(text) {
  return text.split(" ");
}

export default function CaseHero({ caseItem }) {
  const titleWords = splitWords(caseItem.title);
  const descriptionWords = splitWords(caseItem.description);

  return (
    <>
      <motion.header
        id="case-hero"
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex w-full justify-start"
          variants={heroItemVariants}
          transition={{ delay: 0.14 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-bg-secondary px-3 py-1.5 text-sm font-medium text-text-primary transition-colors duration-300 hover:border-black/20 hover:bg-[#faf9f6] sm:text-base"
          >
            <ChevronLeft className="h-4 w-4" />
            Назад
          </Link>
        </motion.div>

        <motion.h1
          className="mt-8 text-balance text-4xl font-semibold text-text-primary sm:mt-10 sm:text-5xl lg:mt-12 lg:text-6xl [perspective:1000px]"
          variants={textRevealVariants}
          aria-label={caseItem.title}
        >
          {titleWords.map((word, wordIndex) => (
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
          className="mt-4 max-w-3xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl"
          variants={subtitleVariants}
          initial="hidden"
          animate="show"
        >
          {descriptionWords.map((word, wordIndex) => (
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
          className="mt-6 flex flex-wrap justify-center gap-2.5"
          variants={heroItemVariants}
          transition={{ delay: 1.04 }}
        >
          {caseItem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 bg-bg-secondary px-3 py-1.5 text-sm text-text-secondary sm:text-base"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.header>

      <motion.div
        className="mt-10 overflow-hidden rounded-[28px] border border-black/10 bg-bg-secondary p-3 sm:mx-auto sm:mt-12 sm:max-w-5xl sm:p-4 lg:mt-14 lg:p-5"
        variants={heroItemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 1.1 }}
      >
        <Image
          src={caseItem.coverImage}
          alt={caseItem.coverAlt}
          width={1200}
          height={900}
          priority
          className="h-auto w-full rounded-[20px] border border-black/10"
        />
      </motion.div>
    </>
  );
}
