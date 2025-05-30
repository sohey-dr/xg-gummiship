"use client";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../stores/gameStore";
import * as THREE from "three";
import { Trail } from "@react-three/drei";

export default function Bullets() {
  const bullets = useGameStore((state) => state.bullets);
  const removeBullet = useGameStore((state) => state.removeBullet);
  const enemies = useGameStore((state) => state.enemies);
  const removeEnemy = useGameStore((state) => state.removeEnemy);
  const addScore = useGameStore((state) => state.addScore);

  useFrame((_, delta) => {
    bullets.forEach((b) => {
      b.position.addScaledVector(b.velocity, delta);
      if (
        Math.abs(b.position.x) > 25 ||
        Math.abs(b.position.y) > 12 ||
        Math.abs(b.position.z) > 12
      ) {
        removeBullet(b.id);
      } else {
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
        <Trail
          key={b.id}
          width={0.05}
          length={5}
          color="yellow"
          attenuation={(t) => 1 - t}
          stride={0.1}
        >
          <mesh position={[b.position.x, b.position.y, b.position.z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              emissive="yellow"
              emissiveIntensity={1}
              color="black"
            />
          </mesh>
        </Trail>
      ))}
    </>
  );
}
