"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useProgress, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import Model from "../Model";
import BgText from "../BgText";

export default function Hero3d() {
    const containerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const { progress, active } = useProgress();


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
            
            {active && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0D0D0C]">
                    <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
                    <p className="text-xs tracking-widest text-white/60">
                        {Math.floor(progress)}%
                    </p>
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

                <BgText />

                <ambientLight intensity={0.25} />
                <directionalLight position={[5, 10, 5]} intensity={3.5} />

                <Model />

                {/* <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} pointerEvents={false} /> */}
            </Canvas>
        </section>
    );
}
