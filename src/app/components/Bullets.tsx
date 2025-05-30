"use client";
import { useGameStore } from "../stores/gameStore";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Trail } from "@react-three/drei";

// 個別の弾メッシュコンポーネント
function BulletMesh({
  id,
  startPos,
  velocity,
}: {
  id: string;
  startPos: THREE.Vector3;
  velocity: THREE.Vector3;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const removeBullet = useGameStore((state) => state.removeBullet);
  const enemies = useGameStore((state) => state.enemies);
  const removeEnemy = useGameStore((state) => state.removeEnemy);
  const addScore = useGameStore((state) => state.addScore);
  const initialPosition = useRef(startPos.clone());

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(initialPosition.current);
    }
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.addScaledVector(velocity, delta);
    const pos = meshRef.current.position;
    if (Math.abs(pos.x) > 25 || Math.abs(pos.y) > 12 || Math.abs(pos.z) > 42) {
      removeBullet(id);
      return;
    }
    enemies.forEach((e) => {
      if (pos.distanceTo(e.position) < 5) {
        removeBullet(id);
        removeEnemy(e.id);
        addScore(100);
      }
    });
  });

  return (
    <Trail
      width={0.05}
      length={5}
      color="yellow"
      attenuation={(t) => 1 - t}
      stride={0.1}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial
          emissive="yellow"
          emissiveIntensity={1}
          color="black"
        />
      </mesh>
    </Trail>
  );
}

export default function Bullets() {
  const bullets = useGameStore((state) => state.bullets);
  return (
    <>
      {bullets.map((b) => (
        <BulletMesh
          key={b.id}
          id={b.id}
          startPos={b.position.clone()}
          velocity={b.velocity.clone()}
        />
      ))}
    </>
  );
}
