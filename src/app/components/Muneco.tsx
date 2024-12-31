"use client";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { FireEffect } from "./FireEffect";

export function Muneco({ isNewYear }: { isNewYear: boolean }) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/assets/muneco.glb");
  const [burnStartTime, setBurnStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (isNewYear && !burnStartTime) {
      setBurnStartTime(Date.now());
    }
  }, [isNewYear, burnStartTime]);

  useFrame((state, delta) => {
    if (isNewYear && group.current && burnStartTime) {
      const elapsedTime = (Date.now() - burnStartTime) / 1000; // seconds
      const burnDuration = 60 * 60; // 1 hour in seconds
      if (elapsedTime < burnDuration) {
        const burnProgress = elapsedTime / burnDuration;
        group.current.rotation.y += delta;
        group.current.scale.setScalar(1 - burnProgress * 0.9); // Shrink to 10% of original size over 1 hour
      }
    }
  });

  return (
    <group ref={group} dispose={null} position={[0, 0.5, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LOD3spShape.geometry}
        material={materials.blinn3}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      {isNewYear && (
        <FireEffect
          position={[0, -0.5, 0]}
          scale={1.5}
          color={new THREE.Color(0xff9500)}
        />
      )}
    </group>
  );
}
