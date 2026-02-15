"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "../Model";
import BgText from "../BgText";

function WheelPassthrough() {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleWheel = (event) => {
      // Самое важное — НЕ вызываем event.preventDefault()
      // + passive: true позволяет браузеру скроллить нативно и быстро
    };

    // Добавляем listener с passive: true → браузер НЕ блокирует скролл
    canvas.addEventListener('wheel', handleWheel, { passive: true });

    // Опционально: можно добавить флаг, чтобы не мешать, если вдруг нужен зум в будущем
    // canvas.addEventListener('wheel', (e) => {
    //   if (e.ctrlKey) return; // если Ctrl+wheel — позволяем зум страницы
    // }, { passive: true });

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [gl]);

  return null;
}

export default function Hero3d() {
    return (
        <section id="hero" className="relative h-screen w-full pointer-events-none">
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
                <WheelPassthrough />

                {/* <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} pointerEvents={false} /> */}
            </Canvas>
        </section>
    );
}
