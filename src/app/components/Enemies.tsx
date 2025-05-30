"use client";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../stores/gameStore";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import { useEffect, useRef } from "react";

// 個別の敵メッシュコンポーネント
function EnemyMesh({
  id,
  startPos,
  velocity,
}: {
  id: string;
  startPos: THREE.Vector3;
  velocity: THREE.Vector3;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const removeEnemy = useGameStore((state) => state.removeEnemy);
  const loseLife = useGameStore((state) => state.loseLife);
  const shipPos = useGameStore((state) => state.shipPosition);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(startPos);
    }
  }, [startPos]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // 位置更新
    meshRef.current.position.addScaledVector(velocity, delta);
    const pos = meshRef.current.position;
    // 衝突判定
    if (pos.distanceTo(shipPos) < 1) {
      removeEnemy(id);
      loseLife();
      return;
    }
    // 画面外削除
    if (pos.z > 0) {
      removeEnemy(id);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial
          color="red"
          emissive="#aa0000"
          emissiveIntensity={0.6}
        />
      </mesh>
      <Sparkles
        size={0.3}
        scale={[0.5, 0.5, 0.5]}
        speed={0.2}
        count={20}
        color="#ff4444"
      />
    </group>
  );
}

export default function Enemies() {
  const enemies = useGameStore((state) => state.enemies);
  return (
    <>
      {enemies.map((e) => (
        <EnemyMesh
          key={e.id}
          id={e.id}
          startPos={e.position.clone()}
          velocity={e.velocity.clone()}
        />
      ))}
    </>
  );
}
