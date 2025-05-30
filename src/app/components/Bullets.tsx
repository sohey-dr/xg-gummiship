"use client";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../stores/gameStore";
import * as THREE from "three";

export default function Bullets() {
  const bullets = useGameStore((state) => state.bullets);
  const removeBullet = useGameStore((state) => state.removeBullet);
  const enemies = useGameStore((state) => state.enemies);
  const removeEnemy = useGameStore((state) => state.removeEnemy);
  const addScore = useGameStore((state) => state.addScore);

  useFrame((_, delta) => {
    bullets.forEach((b) => {
      b.position.addScaledVector(b.velocity, delta);
      // 画面外チェック
      if (
        Math.abs(b.position.x) > 20 ||
        Math.abs(b.position.y) > 10 ||
        Math.abs(b.position.z) > 10
      ) {
        removeBullet(b.id);
      } else {
        // 敵との衝突判定
        enemies.forEach((e) => {
          if (b.position.distanceTo(e.position) < 0.5) {
            removeBullet(b.id);
            removeEnemy(e.id);
            addScore(100);
          }
        });
      }
    });
  });

  return (
    <>
      {bullets.map((b) => (
        <mesh key={b.id} position={[b.position.x, b.position.y, b.position.z]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      ))}
    </>
  );
}
