"use client";

import React, { Suspense, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { services } from "../data/services";

function clamp01(x) {
    return Math.min(1, Math.max(0, x));
}
function smoothstep(edge0, edge1, x) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

const GLASS = {
    transmission: 1.0,
    roughness: 0.02,
    thickness: 0.5,
    ior: 1.45,
    attenuationDistance: 0.35,
    attenuationColor: "#9bdcff",
    envMapIntensity: 1.5,
};

const GLOBAL_UPRIGHT = [1.57, 0, 0];

function getState(p, count) {
    const SWAP = (3 * Math.PI) / 2;
    const TWO_PI = Math.PI * 2;

    const totalAngle = count <= 1 ? SWAP : SWAP + (count - 2) * TWO_PI + SWAP;
    const theta = clamp01(p) * totalAngle;

    let activeIndex;
    if (theta < SWAP) activeIndex = 0;
    else activeIndex = 1 + Math.floor((theta - SWAP) / TWO_PI);
    activeIndex = Math.min(activeIndex, count - 1);

    const nextIndex = Math.min(activeIndex + 1, count - 1);

    const phase = theta % TWO_PI;

    let mix = 0;
    if (activeIndex < count - 1) {
        const boundary = activeIndex === 0 ? SWAP : SWAP + activeIndex * TWO_PI;
        const width = THREE.MathUtils.degToRad(10);
        const dist = Math.abs(theta - boundary);
        mix = smoothstep(width, 0, dist);
    }

    return { activeIndex, nextIndex, phase, mix };
}

function fitCameraToObject(camera, object, fit = 1.2) {
    if (!object) return;

    const box = new THREE.Box3().setFromObject(object);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    if (!sphere.radius || !Number.isFinite(sphere.radius)) return;

    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const aspect = camera.aspect;

    const distV = sphere.radius / Math.sin(vFov / 2);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const distH = sphere.radius / Math.sin(hFov / 2);

    const dist = Math.max(distV, distH) * fit;

    camera.position.set(0, 0, dist);
    camera.near = Math.max(0.01, dist / 100);
    camera.far = dist * 100;
    camera.updateProjectionMatrix();
}

function applyOpacity(root, value) {
    if (!root) return;

    const v = THREE.MathUtils.clamp(value, 0, 1);

    root.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];

        for (const m of mats) {
            if (v >= 0.999) {
                m.opacity = 1;
                m.transparent = false;
                m.depthWrite = true;
                m.depthTest = true;
                m.alphaHash = false;
            } else if (v <= 0.001) {
                m.opacity = 0;
                m.transparent = true;
                m.depthWrite = false;
                m.depthTest = true;
                m.alphaHash = false;
            } else {
                m.opacity = v;
                m.transparent = true;

                m.alphaHash = true;
                m.depthWrite = true;
                m.depthTest = true;
            }
            m.needsUpdate = true;
        }
    });
}

function GltfIcon({ url, rot = [0, 0, 0] }) {
    const { scene } = useGLTF(url);
    const model = useMemo(() => scene.clone(true), [scene]);

    const offset = useRef();

    const baseGlass = useMemo(() => {
        const m = new THREE.MeshPhysicalMaterial({
            transmission: GLASS.transmission,
            roughness: GLASS.roughness,
            thickness: GLASS.thickness,
            ior: GLASS.ior,
            attenuationDistance: GLASS.attenuationDistance,
            attenuationColor: new THREE.Color(GLASS.attenuationColor),
            envMapIntensity: GLASS.envMapIntensity,
            transparent: false,
            opacity: 1,
            side: THREE.FrontSide,
        });

        m.polygonOffset = true;
        m.polygonOffsetFactor = 1;
        m.polygonOffsetUnits = 1;

        m.depthWrite = true;
        m.depthTest = true;

        return m;
    }, []);

    useLayoutEffect(() => {
        if (!offset.current) return;

        offset.current.position.set(0, 0, 0);
        model.position.set(0, 0, 0);
        model.rotation.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        model.traverse((obj) => {
            if (obj.isMesh && obj.geometry) obj.geometry.computeBoundingBox();
        });

        model.updateWorldMatrix(true, true);

        const box = new THREE.Box3();
        let hasAny = false;
        const invModelWorld = new THREE.Matrix4().copy(model.matrixWorld).invert();

        model.traverse((obj) => {
            if (obj.isMesh && obj.geometry && obj.geometry.boundingBox) {
                const bb = obj.geometry.boundingBox;

                const pts = [
                    new THREE.Vector3(bb.min.x, bb.min.y, bb.min.z),
                    new THREE.Vector3(bb.min.x, bb.min.y, bb.max.z),
                    new THREE.Vector3(bb.min.x, bb.max.y, bb.min.z),
                    new THREE.Vector3(bb.min.x, bb.max.y, bb.max.z),
                    new THREE.Vector3(bb.max.x, bb.min.y, bb.min.z),
                    new THREE.Vector3(bb.max.x, bb.min.y, bb.max.z),
                    new THREE.Vector3(bb.max.x, bb.max.y, bb.min.z),
                    new THREE.Vector3(bb.max.x, bb.max.y, bb.max.z),
                ];

                for (const p of pts) {
                    p.applyMatrix4(obj.matrixWorld);
                    p.applyMatrix4(invModelWorld);

                    if (!hasAny) {
                        box.set(p, p);
                        hasAny = true;
                    } else {
                        box.expandByPoint(p);
                    }
                }
            }
        });

        if (!hasAny) return;

        const center = new THREE.Vector3();
        box.getCenter(center);
        offset.current.position.copy(center).multiplyScalar(-1);

        model.traverse((obj) => {
            if (obj.isMesh) {
                obj.material = baseGlass.clone();
                obj.material.side = THREE.FrontSide;
            }
        });
    }, [model, baseGlass]);

    return (
        <group rotation={GLOBAL_UPRIGHT}>
            <group rotation={rot}>
                <group ref={offset}>
                    <primitive object={model} />
                </group>
            </group>
        </group>
    );
}

function Scene({ progress }) {
    const { camera, size } = useThree();

    const [winW, setWinW] = React.useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );

    useEffect(() => {
        const onResize = () => setWinW(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);


    const pivot = useRef();
    const activeWrap = useRef();
    const nextWrap = useRef();

    const activeMeasureRef = useRef();

    const progressRef = useRef(0);
    useEffect(() => {
        progressRef.current = Number.isFinite(progress) ? progress : 0;
    }, [progress]);

    const items = services;
    const count = items.length;
    if (count === 0) return null;

    const p0 = Number.isFinite(progress) ? progress : 0;
    const initial = getState(p0, count);

    const active = items[initial.activeIndex];
    const next = items[initial.nextIndex];

    const lastKey = useRef({ idx: -1, w: 0, h: 0 });

    useFrame(() => {
        if (!pivot.current) return;

        const p = progressRef.current;
        const state = getState(p, count);

        pivot.current.rotation.y = state.phase;

        applyOpacity(activeWrap.current, 1 - state.mix);
        applyOpacity(nextWrap.current, state.mix);

        const w = size.width;
        const h = size.height;

        if (
            state.activeIndex !== lastKey.current.idx ||
            w !== lastKey.current.w ||
            h !== lastKey.current.h
        ) {
            lastKey.current = { idx: state.activeIndex, w, h };

            const target = activeMeasureRef.current || activeWrap.current;

            let fit = 1.1;
            if (winW < 768) fit = 0.95;
            if (winW < 400) fit = 1.25;
            else if (winW < 1024) fit = 1.0;

            fitCameraToObject(camera, target, fit);


        }
    });

    if (!active?.glb || !next?.glb) return null;

    return (
        <>
            <Environment preset="studio" />
            <ambientLight intensity={0.25} />
            <directionalLight position={[5, 10, 5]} intensity={3.5} />

            <group ref={pivot}>
                <Suspense fallback={null}>
                    <group ref={activeWrap}>
                    <group ref={activeMeasureRef}>
                        {active && (
                        <GltfIcon key={"a-" + active.glb} url={active.glb} rot={active.rot ?? [0, 0, 0]} />
                        )}
                    </group>
                    </group>

                    <group ref={nextWrap}>
                    {next && (
                        <GltfIcon key={"b-" + next.glb} url={next.glb} rot={next.rot ?? [0, 0, 0]} />
                    )}
                    </group>
                </Suspense>
            </group>

        </>
    );
}

export default function ServiceIconScene({ progress }) {
    return (
        <div className="w-full h-[clamp(280px,45vw,560px)]">
            <Canvas camera={{ position: [0, 0, 4.0], fov: 50, near: 0.1, far: 100 }}>
                <color attach="background" args={["#0D0D0C"]} />
                <Scene progress={progress} />
            </Canvas>
        </div>
    );
}

services.forEach((s) => useGLTF.preload(s.glb));
