"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import Model from "../Model";
import BgText from "../BgText";
import { motion } from "framer-motion";

const fadeOutVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function Hero3d() {
    const containerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const hasTouch =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(hasTouch);
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative h-screen w-full"
        >
            <motion.div className="flex justify-center absolute inset-0 z-100 items-center"
            variants={fadeOutVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.8,
          delay: 3,
          ease: "easeInOut",
        }}>
                <div className="px-5 sm:px-6 lg:px-4 w-full md:max-w-[1024px] lg:max-w-[1200px] flex items-center justify-between pt-20 sm:pt-24 md:pt-32 lg:pt-42 h-20">
                    <span className="text-[#7d7d7d] font-light text-xs sm:text-base md:text-lg lg:text-xl">From idea to strcuture</span>
                    <span className="text-[#7d7d7d] font-light text-xs sm:text-base md:text-lg lg:text-xl">From structure to product</span>
                </div>
            </motion.div>
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 5], fov: 50 }}
                {...(!isTouchDevice && {
                    eventSource: containerRef,
                    eventPrefix: "client",
                })}
                style={{ touchAction: "pan-y pinch-zoom" }}
            >
                <color attach="background" args={["#0D0D0C"]} />
                <Environment preset="studio" background={false} />

                <ambientLight intensity={0.25} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={3.5}
                />

                <Suspense fallback={null}>
                    <Model />
                    <BgText />
                </Suspense>
            </Canvas>
        </section>
    );
}
