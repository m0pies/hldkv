"use client";

import * as THREE from "three";
import React, { useLayoutEffect, useRef, useMemo, useState, useEffect } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { size, viewport, invalidate, pointer } = useThree();
  const [interactive, setInteractive] = useState(false);

  const pivot = useRef();
  const offset = useRef();
  const drag = useRef({
    active: false,
    started: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    velX: 0,
    velY: 0,
  });

  const isTouchLayout = size.width < 1024;
  const THRESHOLD = 10;
  const materialRef = useRef();
  const { nodes } = useGLTF("/hldkv.glb");

  const modelScale = useMemo(() => {
    const pxToWorld = viewport.width / size.width;
    const MAX_PX = 1024;
    const usedPx = Math.min(size.width, MAX_PX);
    const worldWidth = usedPx * pxToWorld;
    return worldWidth * 0.2;
  }, [size.width, viewport.width]);

  useLayoutEffect(() => {
    if (!offset.current || !nodes?.Curve?.geometry) return;
    const geom = nodes.Curve.geometry;
    geom.computeVertexNormals();
    geom.computeBoundingBox();
    const center = new THREE.Vector3();
    geom.boundingBox.getCenter(center);
    offset.current.position.copy(center).multiplyScalar(-1);
  }, [nodes]);

  useEffect(() => {
    let frame;
    let start = null;
    const DURATION = 2000;

    const animate = (time) => {
      if (!start) start = time;
      const p = Math.min(1, (time - start) / DURATION);

      if (pivot.current) {
        pivot.current.rotation.y = p * Math.PI * 2;
        invalidate();
      }

      if (p < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setInteractive(true);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [invalidate]);

  const onPointerDown = (e) => {
    if (!isTouchLayout) return;
    e.stopPropagation();
    drag.current.active = false;
    drag.current.started = false;
    drag.current.startX = e.clientX;
    drag.current.startY = e.clientY;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
    drag.current.velX = 0;
    drag.current.velY = 0;
  };

  const onPointerMove = (e) => {
    if (!isTouchLayout || !pivot.current) return;
    e.stopPropagation();
    const totalDx = e.clientX - drag.current.startX;
    const totalDy = e.clientY - drag.current.startY;
    const dist = Math.hypot(totalDx, totalDy);

    if (!drag.current.started) {
      if (dist < THRESHOLD) return;
      drag.current.started = true;
      if (Math.abs(totalDy) > Math.abs(totalDx) * 1.3) {
        drag.current.started = false;
        return;
      }
      e.target.setPointerCapture(e.pointerId);
      drag.current.active = true;
    }

    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.lastX;
    const dy = e.clientY - drag.current.lastY;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;

    const ROT_SPEED = 0.005;
    pivot.current.rotation.y += dx * ROT_SPEED;
    pivot.current.rotation.x += dy * ROT_SPEED;

    drag.current.velX = dx * ROT_SPEED;
    drag.current.velY = dy * ROT_SPEED;

    invalidate();
  };

  const endDrag = (e) => {
    if (!isTouchLayout) return;
    e.stopPropagation();
    drag.current.active = false;
    drag.current.started = false;
  };

  useFrame((state, delta) => {
    if (!interactive || !pivot.current) return;

    if (isTouchLayout) {
      if (!drag.current.active) {
        drag.current.velX *= 0.92;
        drag.current.velY *= 0.92;
        pivot.current.rotation.y += drag.current.velX;
        pivot.current.rotation.x += drag.current.velY;
      }
      pivot.current.rotation.x = THREE.MathUtils.clamp(
        pivot.current.rotation.x,
        -0.8,
        0.8
      );
      return;
    }

    const smooth = 1 - Math.pow(0.001, delta);

// ----- FIX для rotation.y -----
const target = state.pointer.x * 0.8;
let currentY = pivot.current.rotation.y;

// корректируем угол, чтобы lerp шёл по кратчайшему пути
while (currentY - target > Math.PI) currentY -= Math.PI * 2;
while (currentY - target < -Math.PI) currentY += Math.PI * 2;

pivot.current.rotation.y = THREE.MathUtils.lerp(currentY, target, smooth);

// rotation.x можно оставить обычным
pivot.current.rotation.x = THREE.MathUtils.lerp(
  pivot.current.rotation.x,
  -state.pointer.y * 0.4,
  smooth
);

invalidate();


    invalidate();
  });

  const GLASS = {
    transmission: 1,
    roughness: 0.02,
    thickness: 0.4,
    ior: 1.45,
    chromaticAberration: 0.06,
    distortion: 0.12,
    distortionScale: 0.25,
    temporalDistortion: 0.05,
    attenuationDistance: 100,
    attenuationColor: "#ffffff",
    samples: 6,
    resolution: 1024,
    backside: true,
    backsideThickness: 1.5,
    depthWrite: false,
  };

  return (
    <group ref={pivot}>
      <group rotation={[1.57, 0, 0]} scale={modelScale}>
        <group ref={offset}>
          <mesh
            geometry={nodes?.Curve?.geometry}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            <MeshTransmissionMaterial
              ref={materialRef}
              transparent
              {...GLASS}
              opacity={1}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/hldkv.glb");
