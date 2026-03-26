"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

const floatingVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.96,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 14,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");

      if (!hero || !contact) {
        setIsVisible(false);
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();
      const heroPassed = heroRect.bottom <= 0;
      const contactReached = contactRect.top <= window.innerHeight * 0.9;

      setIsVisible(heroPassed && !contactReached);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4 sm:bottom-6 sm:px-8 lg:bottom-8 lg:px-12"
          variants={floatingVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div className="mx-auto flex w-full max-w-[1024px] justify-end">
            <Button
              href="https://t.me/itshldkv"
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto shadow-[0_10px_30px_rgba(17,17,17,0.12)]"
            >
              Обсудить проект
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
