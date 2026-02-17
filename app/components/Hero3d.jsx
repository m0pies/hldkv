"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import Model from "../Model";
import BgText from "../BgText";

export default function Hero3d() {
    const containerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

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

                <Suspense fallback={null}>
                    <Environment preset="studio" />
                </Suspense>

                <BgText />

                <ambientLight intensity={0.25} />
                <directionalLight position={[5, 10, 5]} intensity={3.5} />

                <Model />

                {/* <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} pointerEvents={false} /> */}
            </Canvas>
        </section>
    );
}
