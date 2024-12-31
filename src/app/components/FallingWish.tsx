import { useRef, useState } from "react";
import { useFrame, Vector3 } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function FallingWish({
  wish,
  position,
}: {
  wish: string;
  position?: Vector3;
}) {
  const group = useRef<THREE.Group>(null);
  const [hasLanded, setHasLanded] = useState(false);
  const [finalRotation] = useState(() => ({
    x: Math.random() * Math.PI,
    y: Math.random() * Math.PI,
    z: Math.random() * Math.PI,
  }));
  const [startPosition] = useState<Vector3>(() => [
    Math.random() * 4 - 2,
    5,
    Math.random() * 4 - 2,
  ]);

  useFrame((state, delta) => {
    if (group.current && !hasLanded) {
      // Fall effect
      group.current.position.y -= delta * 2;
      // Rotate while falling
      group.current.rotation.x += delta * 2;
      group.current.rotation.z += delta * (Math.random() - 0.5);

      if (group.current.position.y <= 0.05) {
        group.current.position.y = 0.05;
        group.current.rotation.set(
          finalRotation.x,
          finalRotation.y,
          finalRotation.z,
        );
        setHasLanded(true);
      }
    }
  });

  return (
    <group ref={group} position={position || startPosition} scale={0.3}>
      {/* Wrinkled paper effect using multiple planes with slight rotations */}
      <group rotation={[0, 0, Math.PI / 6]}>
        <mesh>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#ffd700" side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group rotation={[0.1, 0, -Math.PI / 8]} position={[0.1, 0.1, 0.01]}>
        <mesh>
          <planeGeometry args={[0.9, 0.9]} />
          <meshStandardMaterial color="#ffeb3b" side={THREE.DoubleSide} />
        </mesh>
      </group>
      <Text
        position={[0, 0, 0.02]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.8}
      >
        ****
      </Text>
    </group>
  );
}
