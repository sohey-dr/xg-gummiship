"use client";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../stores/gameStore";
import * as THREE from "three";

export default function Enemies() {
  const enemies = useGameStore((state) => state.enemies);
  const removeEnemy = useGameStore((state) => state.removeEnemy);
  const loseLife = useGameStore((state) => state.loseLife);

  useFrame((_, delta) => {
    enemies.forEach((e) => {
      e.position.addScaledVector(e.velocity, delta);
      // プレイヤー機体との当たり判定
      const shipPos = useGameStore.getState().shipPosition;
      if (e.position.distanceTo(shipPos) < 1) {
        removeEnemy(e.id);
        loseLife();
      }
      // 奥から来た敵の自動削除
      if (e.position.z > 5) {
        removeEnemy(e.id);
      }
    });
  });

  return (
    <>
      {enemies.map((e) => (
        <mesh key={e.id} position={[e.position.x, e.position.y, e.position.z]}>
          ``
          <coneGeometry args={[0.5, 1, 8]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </>
  );
}
