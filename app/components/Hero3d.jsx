"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import Model from "../Model";
import BgText from "../BgText";

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
            <Canvas
                dpr={[0.75, 1]}
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
