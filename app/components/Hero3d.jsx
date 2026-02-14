"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Suspense } from "@react-three/drei";
import { useLayoutEffect } from "react";
import Model from "../Model";
import BgText from "../BgText";

export default function Hero3d() {
  const { gl } = useThree();

  useLayoutEffect(() => {
    gl.domElement.style.touchAction = "pan-y pinch-zoom !important";

    const preventDefault = (e) => {
      if (e.touches.length === 1) {
      }
    };

    gl.domElement.addEventListener("touchstart", preventDefault, { passive: false });
    gl.domElement.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      gl.domElement.removeEventListener("touchstart", preventDefault);
      gl.domElement.removeEventListener("touchmove", preventDefault);
    };
  }, [gl]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ touchAction: "pan-y pinch-zoom" }}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        <color attach="background" args={["#0D0D0C"]} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        <BgText />

        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 10, 5]} intensity={3.5} />

        <Model />
      </Canvas>
    </section>
  );
}