"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const [delayPassed, setDelayPassed] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setDelayPassed(true);
      return;
    }

    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    let io = null;
    let retry = null;

    const observe = () => {
      const el = document.querySelector("#contact");
      if (!el) {
        retry = setTimeout(observe, 500);
        return;
      }

      io = new IntersectionObserver(
        ([entry]) => {
          setContactVisible(entry.isIntersecting);
        },
        {
          threshold: 0.01,
          rootMargin: "0px 0px -5% 0px",
        }
      );

      io.observe(el);
    };

    observe();

    return () => {
      if (io) io.disconnect();
      if (retry) clearTimeout(retry);
    };
  }, [pathname]);

  const isVisible =
    pathname !== "/" || (delayPassed && !contactVisible);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.7,
              delay: 0,
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
              <Link href="/" className="text-white/80 hover:text-white">
                Home
              </Link>
              <Link href="/#works" className="text-white/80 hover:text-white">
                Works
              </Link>
              <Link href="/#services" className="text-white/80 hover:text-white">
                Services
              </Link>
              <Link href="/#contact" className="text-white/80 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}