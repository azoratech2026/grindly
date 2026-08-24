"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const EDGE_COLOR = "#0a0b12";

function Box({ progress }: { progress: MotionValue<number> }) {
  const [front, back] = useTexture([
    "/images/grindly-pouch-front.jpg",
    "/images/grindly-pouch-back.jpg",
  ]);

  useEffect(() => {
    front.colorSpace = THREE.SRGBColorSpace;
    back.colorSpace = THREE.SRGBColorSpace;
    front.needsUpdate = true;
    back.needsUpdate = true;
  }, [front, back]);

  const meshRef = useRef<THREE.Mesh>(null);
  const scrollTarget = useRef(0);
  const dragOffset = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    return progress.on("change", (v) => {
      scrollTarget.current = v * Math.PI * 2;
    });
  }, [progress]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const target = scrollTarget.current + dragOffset.current;
    mesh.rotation.y += (target - mesh.rotation.y) * Math.min(1, delta * 4);
    mesh.rotation.x = 0.08;
  });

  function onPointerDown(e: ThreeEvent<PointerEvent>) {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: ThreeEvent<PointerEvent>) {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    dragOffset.current += dx * 0.012;
  }
  function onPointerUp() {
    dragging.current = false;
  }

  const width = 1.4;
  const height = width * (1028 / 684);
  const depth = width * 0.22;

  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: EDGE_COLOR, roughness: 0.5, metalness: 0.15 }),
      new THREE.MeshStandardMaterial({ color: EDGE_COLOR, roughness: 0.5, metalness: 0.15 }),
      new THREE.MeshStandardMaterial({ color: EDGE_COLOR, roughness: 0.5, metalness: 0.15 }),
      new THREE.MeshStandardMaterial({ color: EDGE_COLOR, roughness: 0.5, metalness: 0.15 }),
      new THREE.MeshStandardMaterial({ map: front, roughness: 0.4 }),
      new THREE.MeshStandardMaterial({ map: back, roughness: 0.4 }),
    ],
    [front, back]
  );

  return (
    <mesh
      ref={meshRef}
      material={materials}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
    >
      <boxGeometry args={[width, height, depth]} />
    </mesh>
  );
}

export function ProductBox3D({
  progress,
  className = "",
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  return (
    <div className={`${className} cursor-grab touch-none active:cursor-grabbing`}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 30 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} color="#6fc3ff" />
        <directionalLight position={[-3, -1, 2]} intensity={1.2} color="#b565ff" />
        <directionalLight position={[0, 2, -4]} intensity={0.5} color="#ffffff" />
        <Box progress={progress} />
      </Canvas>
    </div>
  );
}

useTexture.preload("/images/grindly-pouch-front.jpg");
useTexture.preload("/images/grindly-pouch-back.jpg");
