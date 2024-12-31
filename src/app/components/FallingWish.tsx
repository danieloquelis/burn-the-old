import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function FallingWish({ wish }: { wish: string }) {
  const group = useRef<THREE.Group>();
  const [hasLanded, setHasLanded] = useState(false);

  useFrame((state, delta) => {
    if (group.current && !hasLanded) {
      group.current.position.y -= delta * 2;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      if (group.current.position.y <= 0.5) {
        group.current.position.y = 0.5;
        setHasLanded(true);
      }
    }
  });

  return (
    <group
      ref={group}
      position={[Math.random() * 2 - 1, 5, Math.random() * 2 - 1]}
    >
      <mesh>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.05}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {wish}
      </Text>
    </group>
  );
}
