"use client";

import * as THREE from "three";
import React, { useLayoutEffect, useRef, useMemo, useState, useEffect } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { size, viewport, gl } = useThree();

  const [interactive, setInteractive] = useState(false);
  const { invalidate } = useThree();


  const modelScale = useMemo(() => {
    const pxToWorld = viewport.width / size.width;
    const MAX_PX = 1024;
    const usedPx = Math.min(size.width, MAX_PX);
    const worldWidth = usedPx * pxToWorld;
    return worldWidth * 0.2;
  }, [size.width, viewport.width]);

  const pivot = useRef();
  const offset = useRef();

  const introDone = useRef(false);
  const t = useRef(0);

  const isTouchLayout = size.width < 1024;

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

  const THRESHOLD = 10;

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

      const ROT_SPEED = 0.005;
      pivot.current.rotation.y += totalDx * ROT_SPEED;
      pivot.current.rotation.x += totalDy * ROT_SPEED;

      drag.current.velX = totalDx * ROT_SPEED;
      drag.current.velY = totalDy * ROT_SPEED;

      return;
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
  };

  const endDrag = (e) => {
    if (!isTouchLayout) return;
    e.stopPropagation();
    drag.current.active = false;
    drag.current.started = false;
  };

  const materialRef = useRef();

  const { nodes } = useGLTF("/hldkv.glb");

  const GLASS = {
    transmission: 1.0,
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
      setInteractive(true); // 🔥 включаем интерактив
    }
  };

  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);
}, []);

useEffect(() => {
  if (!interactive) return;

  let frame;

  const loop = () => {
    invalidate();
    frame = requestAnimationFrame(loop);
  };

  frame = requestAnimationFrame(loop);

  return () => cancelAnimationFrame(frame);
}, [interactive]);



  useFrame((state, delta) => {
    if (!interactive) return;
    if (!pivot.current) return;

    if (!introDone.current) {
      const DURATION = 2.5;
      const TURNS = 1;
      const FINAL_FACE = 0;

      t.current += delta;
      const p = Math.min(1, t.current / DURATION);

      const easeInOutSine = 0.5 - 0.5 * Math.cos(Math.PI * p);

      const spin = TURNS * 2 * Math.PI;
      pivot.current.rotation.y = FINAL_FACE + spin * easeInOutSine;

      const fade = Math.min(1, p / 0.35);
      const fadeSmooth = fade * fade * (3 - 2 * fade);
      pivot.current.visible = true;

      if (materialRef.current) {
        materialRef.current.opacity = fadeSmooth;
      }

      if (p >= 1) {
        pivot.current.rotation.y = FINAL_FACE;
        introDone.current = true;
        if (materialRef.current) materialRef.current.opacity = 1;
      }
      return;
    }

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

    const x = state.pointer.x;
    const y = state.pointer.y;
    const smooth = 1 - Math.pow(0.001, delta);

    pivot.current.rotation.y = THREE.MathUtils.lerp(
      pivot.current.rotation.y,
      x * 0.8,
      smooth
    );
    pivot.current.rotation.x = THREE.MathUtils.lerp(
      pivot.current.rotation.x,
      -y * 0.4,
      smooth
    );
  });

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
              transmission={GLASS.transmission}
              roughness={GLASS.roughness}
              thickness={GLASS.thickness}
              ior={GLASS.ior}
              chromaticAberration={GLASS.chromaticAberration}
              distortion={GLASS.distortion}
              distortionScale={GLASS.distortionScale}
              temporalDistortion={GLASS.temporalDistortion}
              attenuationDistance={GLASS.attenuationDistance}
              attenuationColor={GLASS.attenuationColor}
              samples={GLASS.samples}
              resolution={GLASS.resolution}
              opacity={1}
              toneMapped={false}
              depthWrite={GLASS.depthWrite}
              side={THREE.DoubleSide}
              backside={GLASS.backside}
              backsideThickness={GLASS.backsideThickness}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/hldkv.glb");