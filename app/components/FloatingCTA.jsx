"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

const floatingVariants = {
  hidden: {
    opacity: 0,
    y: 96,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 96,
    transition: {
      duration: 0.26,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function FloatingCTA({
  heroId = "hero",
  contactId = "contact",
  maxWidthClassName = "max-w-[1024px]",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.getElementById(heroId);
      const contact = contactId ? document.getElementById(contactId) : null;

      if (!hero) {
        setIsVisible(false);
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const heroPassed = heroRect.bottom <= 0;
      const contactReached = contact
        ? contact.getBoundingClientRect().top <= window.innerHeight * 0.9
        : false;

      setIsVisible(heroPassed && !contactReached);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [contactId, heroId]);

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
          <div
            className={`mx-auto flex w-full ${maxWidthClassName} justify-end lg:justify-center`}
          >
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
