"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import Model from "../Model";
import BgText from "../BgText";

export default function Hero3d({ onIntroStart }) {
  const containerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [progress, setProgress] = useState(0);
  const [hideLoader, setHideLoader] = useState(false);
  const [loaderFinished, setLoaderFinished] = useState(false);

  // detect touch
  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // 🚀 fake loader: всегда от 0 → 100 по 1%
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
      setTimeout(() => {
        setHideLoader(true);
        setLoaderFinished(true);
        onIntroStart?.();
      }, 200);
    }
  }, [progress, onIntroStart]);

  return (
    <section ref={containerRef} id="hero" className="relative h-screen w-full">
      {!hideLoader && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0D0D0C] transition-opacity"
          style={{
            opacity: hideLoader ? 0 : 1,
            pointerEvents: hideLoader ? "none" : "auto",
          }}
        >
          <div className="text-white/50 text-sm">{progress}%</div>
        </div>
      )}

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        {...(!isTouchDevice && { eventSource: containerRef, eventPrefix: "client" })}
        style={{ touchAction: "pan-y pinch-zoom" }}
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
