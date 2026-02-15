"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "../Model";
import BgText from "../BgText";

export default function Hero3d() {
    return (
        <section id="hero" className="relative h-screen w-full">
            <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{
                    touchAction: 'pan-y pinch-zoom',
                    overscrollBehaviorY: 'auto',
                    overscrollBehavior: 'contain',
                }}>
                <color attach="background" args={["#0D0D0C"]} />

                <Suspense fallback={null}>
                    <Environment preset="studio" />
                </Suspense>

                <BgText />

                <ambientLight intensity={0.25} />
                <directionalLight position={[5, 10, 5]} intensity={3.5} />

                <Model />

                {/* <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} /> */}
            </Canvas>
        </section>
    );
}
