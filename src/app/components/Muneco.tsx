"use client";
import * as THREE from "three";
import { FireEffect } from "./FireEffect";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

export function Muneco({ isNewYear }: { isNewYear: boolean }) {
  const gltf = useLoader(GLTFLoader, "/assets/muneco.glb");
  const { scene } = gltf;

  return (
    <group dispose={null} position={[0, 0.5, 0]}>
      <primitive object={scene} />
      {isNewYear && (
        <FireEffect
          position={[0, -1, 0]}
          scale={4}
          color={new THREE.Color(0xff9500)}
        />
      )}
    </group>
  );
}
