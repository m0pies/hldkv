"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useProgress, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import Model from "../Model";
import BgText from "../BgText";

export default function Hero3d() {
    const containerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    
    const { active } = useProgress();
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [hideLoader, setHideLoader] = useState(false);

    const [loaderFinished, setLoaderFinished] = useState(false);

    useEffect(() => {
        if (progress >= 100) {
            setIsFinished(true);

            setTimeout(() => {
            setHideLoader(true);
            setLoaderFinished(true);
            }, 400);
        }
    }, [progress]);


    useEffect(() => {
        let frame;

        const update = () => {
            setProgress((prev) => {
            if (prev >= 100) return 100;

            return prev + 1;
            });

            frame = requestAnimationFrame(update);
        };

        frame = requestAnimationFrame(update);

        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setIsFinished(true);

            setTimeout(() => {
            setHideLoader(true);
            }, 400);
        }
    }, [progress]);

    useEffect(() => {
        const hasTouch =
         "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
        setIsTouchDevice(hasTouch);
    }, []);

    return (
        <section 
            ref={containerRef} 
            id="hero"
            className="relative h-screen w-full"
        >
            
            {!hideLoader && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D0D0C] transition-opacity"
                    style={{
                    opacity: isFinished ? 0 : 1,
                    pointerEvents: isFinished ? "none" : "auto",
                    }}
                >
                    <div className="text-white/50 text-sm">
                    {progress}%
                    </div>
                </div>
            )}




            <Canvas
                dpr={[1,1.5]}
                camera={{ position: [0, 0, 5], fov: 50 }}
                {...(!isTouchDevice && {
                    eventSource: containerRef,
                    eventPrefix: "client",
                })}
                style={{
                    touchAction: "pan-y pinch-zoom",
                }}
            >
                <color attach="background" args={["#0D0D0C"]} />


                <Environment preset="studio" />

                
                {loaderFinished && <BgText />}

                <ambientLight intensity={0.25} />
                <directionalLight position={[5, 10, 5]} intensity={3.5} />

                {loaderFinished && <Model />}

            </Canvas>
        </section>
    );
}
