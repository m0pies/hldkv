"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function BgText() {
    const { size, viewport } = useThree();

    const groupRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();

    const leftReady = useRef(false);
    const rightReady = useRef(false);

    const hasPlayed = useRef(false);
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

        return {
            fontSize: worldWidth * 0.19,
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

        const finalLeftX = -totalW / 2;
        const finalRightX = finalLeftX + leftW + gap;

        layout.current.finalLeftX = finalLeftX;
        layout.current.finalRightX = finalRightX;

        layout.current.startLeftX = finalLeftX - offscreenX;
        layout.current.startRightX = finalRightX + offscreenX;

        if (groupRef.current) groupRef.current.position.set(0, 0, z);

        if (hasPlayed.current) {
            L.position.set(finalLeftX, 0, 0);
            R.position.set(finalRightX, 0, 0);
            L.material.opacity = targetOpacity;
            R.material.opacity = targetOpacity;

            animating.current = false;
            return;
        }

        L.position.set(layout.current.startLeftX, 0, 0);
        R.position.set(layout.current.startRightX, 0, 0);
        L.material.opacity = 0;
        R.material.opacity = 0;

        t.current = 0;
        animating.current = true;
    }, [gap, offscreenX, targetOpacity, z]);

    const onLeftSync = useCallback(() => {
        leftReady.current = true;
        if (leftReady.current && rightReady.current) recomputeLayout();
    }, [recomputeLayout]);

    const onRightSync = useCallback(() => {
        rightReady.current = true;
        if (leftReady.current && rightReady.current) recomputeLayout();
    }, [recomputeLayout]);

    useFrame((_, delta) => {
        if (!animating.current || hasPlayed.current) return;

        const L = leftRef.current;
        const R = rightRef.current;
        if (!L || !R) return;

        const DURATION = 2.5;
        t.current = Math.min(1, t.current + delta / DURATION);

        const eased = 0.5 - 0.5 * Math.cos(Math.PI * t.current);

        const lx = THREE.MathUtils.lerp(layout.current.startLeftX, layout.current.finalLeftX, eased);
        const rx = THREE.MathUtils.lerp(layout.current.startRightX, layout.current.finalRightX, eased);
        const op = targetOpacity * eased;

        L.position.x = lx;
        R.position.x = rx;
        L.material.opacity = op;
        R.material.opacity = op;

        if (t.current >= 1) {
            hasPlayed.current = true;
            animating.current = false;

            L.position.x = layout.current.finalLeftX;
            R.position.x = layout.current.finalRightX;
            L.material.opacity = targetOpacity;
            R.material.opacity = targetOpacity;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, z]}>
            <Text
                ref={leftRef}
                onSync={onLeftSync}
                font="./ppneuemontreal-bold.otf"
                fontSize={fontSize}
                color="#F3F3F2"
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
                font="./ppneuemontreal-bold.otf"
                fontSize={fontSize}
                color="#F3F3F2"
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
