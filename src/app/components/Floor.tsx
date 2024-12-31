import * as THREE from 'three'

export function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow visible={false}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#444444" transparent opacity={0} />
        </mesh>
    )
}

