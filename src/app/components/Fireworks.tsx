import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Fireworks() {
  const particles = useRef<THREE.Points>(null);
  const count = 1000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }
    return [positions, colors];
  }, [count]);

  useFrame((state, delta) => {
    if (particles.current) {
      particles.current.rotation.y += delta * 0.1;
      const positionArray = particles.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        positionArray[i * 3 + 1] -= delta * 2; // Make particles fall
        if (positionArray[i * 3 + 1] < -5) {
          positionArray[i * 3 + 1] = 10; // Reset to top when they fall below the scene
        }
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors />
    </points>
  );
}
