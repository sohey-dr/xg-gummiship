"use client";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../stores/gameStore";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

export default function Enemies() {
  const enemies = useGameStore((state) => state.enemies);
  const removeEnemy = useGameStore((state) => state.removeEnemy);
  const loseLife = useGameStore((state) => state.loseLife);

  useFrame((_, delta) => {
    enemies.forEach((e) => {
      e.position.addScaledVector(e.velocity, delta);
      const shipPos = useGameStore.getState().shipPosition;
      if (e.position.distanceTo(shipPos) < 1) {
        removeEnemy(e.id);
        loseLife();
      }
      if (e.position.z > 5) {
        removeEnemy(e.id);
      }
    });
  });

  return (
    <>
      {enemies.map((e) => (
        <group key={e.id} position={[e.position.x, e.position.y, e.position.z]}>
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
      ))}
    </>
  );
}
