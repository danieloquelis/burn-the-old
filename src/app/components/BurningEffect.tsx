import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function BurningEffect() {
  const particles = useRef<THREE.Points>(null);
  const count = 1000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = Math.random() * 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      colors[i * 3] = Math.random() * 0.5 + 0.5; // Red
      colors[i * 3 + 1] = Math.random() * 0.3; // Green
      colors[i * 3 + 2] = Math.random() * 0.2; // Blue
    }
    return [positions, colors];
  }, [count]);

  useFrame((state, delta) => {
    if (particles.current) {
      const positionArray = particles.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        positionArray[i * 3 + 1] += delta * (Math.random() + 0.5); // Move up
        if (positionArray[i * 3 + 1] > 1) {
          positionArray[i * 3 + 1] = 0; // Reset to bottom
        }
        // Add some horizontal movement
        positionArray[i * 3] += delta * (Math.random() - 0.5) * 0.2;
        positionArray[i * 3 + 2] += delta * (Math.random() - 0.5) * 0.2;
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
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} />
    </points>
  );
}
