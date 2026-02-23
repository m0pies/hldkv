"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function BgText() {
  const { size, viewport } = useThree();

  const groupRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();

  const layoutReady = useRef(false);
  const leftReady = useRef(false);
  const rightReady = useRef(false);

  const animating = useRef(true);
  const t = useRef(0);

  const layout = useRef({
    finalLeftX: 0,
    finalRightX: 0,
    startLeftX: 0,
    startRightX: 0,
  });

  const { fontSize, z, gap, targetOpacity, offscreenX } = useMemo(() => {
    const pxToWorld = viewport.width / size.width;
    const MAX_PX = 1024;
    const usedPx = Math.min(size.width, MAX_PX);
    const worldWidth = usedPx * pxToWorld;

    const mainCoef = size.width >= 1200 ? 0.25 : size.width >= 768 ? 0.205 : 0.2;

    const calculatedFontSize = worldWidth * mainCoef;

    return {
      fontSize: calculatedFontSize,
      z: -3,
      gap: worldWidth * 0.05,
      targetOpacity: 1,
      offscreenX: viewport.width / 2 + worldWidth * 0.6,
    };
  }, [size.width, viewport.width]);

  const recomputeLayout = useCallback(() => {
    const L = leftRef.current;
    const R = rightRef.current;
    if (!L?.geometry || !R?.geometry) return;

    L.geometry.computeBoundingBox?.();
    R.geometry.computeBoundingBox?.();

    const lb = L.geometry.boundingBox;
    const rb = R.geometry.boundingBox;
    if (!lb || !rb) return;

    const leftW = lb.max.x - lb.min.x;
    const rightW = rb.max.x - rb.min.x;
    const totalW = leftW + gap + rightW;

    layout.current.finalLeftX = -totalW / 2;
    layout.current.finalRightX = layout.current.finalLeftX + leftW + gap;

    layout.current.startLeftX = layout.current.finalLeftX - offscreenX;
    layout.current.startRightX = layout.current.finalRightX + offscreenX;

    if (groupRef.current) groupRef.current.position.set(0, 0, z);

    L.position.x = layout.current.startLeftX;
    R.position.x = layout.current.startRightX;
    L.material.opacity = 0;
    R.material.opacity = 0;

    layoutReady.current = true;
    animating.current = true;
    t.current = 0;
  }, [gap, offscreenX, z]);

  const onLeftSync = useCallback(() => {
    leftReady.current = true;
    if (leftReady.current && rightReady.current) recomputeLayout();
  }, [recomputeLayout]);

  const onRightSync = useCallback(() => {
    rightReady.current = true;
    if (leftReady.current && rightReady.current) recomputeLayout();
  }, [recomputeLayout]);

  useFrame((_, delta) => {
    const L = leftRef.current;
    const R = rightRef.current;
    if (!L || !R || !layoutReady.current) return;

    if (animating.current) {
      const DURATION = 2.5;
      t.current = Math.min(1, t.current + delta / DURATION);
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * t.current);

      L.position.x = layout.current.startLeftX + (layout.current.finalLeftX - layout.current.startLeftX) * eased;
      R.position.x = layout.current.startRightX + (layout.current.finalRightX - layout.current.startRightX) * eased;

      const op = targetOpacity * eased;
      L.material.opacity = op;
      R.material.opacity = op;

      if (t.current >= 1) {
        animating.current = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      <Text
        ref={leftRef}
        onSync={onLeftSync}
        font="/font/geist-bold.otf"
        fontSize={fontSize}
        color="#fff"
        anchorX="left"
        anchorY="middle"
        transparent
        opacity={0}
      >
        HLDKV
      </Text>

      <Text
        ref={rightRef}
        onSync={onRightSync}
        font="/font/geist-bold.otf"
        fontSize={fontSize}
        color="#fff"
        anchorX="left"
        anchorY="middle"
        transparent
        opacity={0}
      >
        DESIGN
      </Text>
    </group>
  );
}