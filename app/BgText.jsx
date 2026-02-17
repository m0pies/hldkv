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
    const leftSubRef  = useRef();
    const rightSubRef = useRef();
    const layoutReady = useRef(false);

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

    const widths = useRef({
        leftW: 0,
        rightW: 0,
    });

    const { fontSize, subtitleFontSize, z, gap, targetOpacity, offscreenX, subYMain, subYThat } = useMemo(() => {
        const pxToWorld = viewport.width / size.width;
        const MAX_PX = 1024;
        const usedPx = Math.min(size.width, MAX_PX);
        const worldWidth = usedPx * pxToWorld;

        let mainCoef = 0.20;
        if (size.width >= 1200) {
            mainCoef = 0.25;
        } else if (size.width >= 768) {
            mainCoef = 0.205;
        }

        let subCoef = 0.045;
        if (size.width >= 1200) {
            subCoef = 0.03;
        } else if (size.width >= 768) {
            subCoef = 0.035;
        }

        const calculatedFontSize = worldWidth * mainCoef;

        let subYMainVal = -calculatedFontSize * 0.5;
        let subYThatVal = -calculatedFontSize * 0.5;

        if (size.width < 768) {
            subYMainVal = calculatedFontSize * 0.9;
            subYThatVal = -calculatedFontSize * 0.6;
        }

        return {
            fontSize: calculatedFontSize,
            subtitleFontSize: worldWidth * subCoef,
            z: -3,
            gap: worldWidth * 0.05,
            targetOpacity: 1,
            offscreenX: viewport.width / 2 + worldWidth * 0.6,
            subYMain: subYMainVal,
            subYThat: subYThatVal,
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

        widths.current.leftW = leftW;
        widths.current.rightW = rightW;

        layoutReady.current = true;

        if (leftSubRef.current) {
            leftSubRef.current.position.x = finalLeftX;
        }
        if (rightSubRef.current) {
            rightSubRef.current.position.x = finalRightX + rightW;
        }

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

    useFrame((_, delta) => {
        if (!layoutReady.current) {
            if (leftSubRef.current)  leftSubRef.current.material.opacity = 0;
            if (rightSubRef.current) rightSubRef.current.material.opacity = 0;
            return;
        }

        if (!hasPlayed.current) {
            if (leftSubRef.current)  leftSubRef.current.material.opacity = 0;
            if (rightSubRef.current) rightSubRef.current.material.opacity = 0;
            return;
        }

        const target = 0.78;
        const speed = 2;

        if (leftSubRef.current) {
            leftSubRef.current.material.opacity = THREE.MathUtils.lerp(
                leftSubRef.current.material.opacity,
                target,
                speed * delta
            );
        }
        if (rightSubRef.current) {
            rightSubRef.current.material.opacity = THREE.MathUtils.lerp(
                rightSubRef.current.material.opacity,
                target,
                speed * delta
            );
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

            <Text
                ref={leftSubRef}
                font="/font/geist-light.otf"
                fontSize={subtitleFontSize}
                color="#7d7d7d"
                anchorX="left"
                anchorY="top"
                transparent
                opacity={0}
                position-x={0}
                position-y={subYMain}
            >
                Solving your problems
            </Text>

            <Text
                ref={rightSubRef}
                font="/font/geist-light.otf"
                fontSize={subtitleFontSize}
                color="#7d7d7d"
                anchorX="right"
                anchorY="top"
                transparent
                opacity={0}
                position-x={0}
                position-y={subYThat}
            >
                through thoughtful design
            </Text>
        </group>
    );
}
