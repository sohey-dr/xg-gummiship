"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../stores/gameStore";
import { Sparkles } from "@react-three/drei";

export default function Ship() {
  const ref = useRef<THREE.Mesh>(null);
  const controlVector = useGameStore((state) => state.controlVector);
  const updateShipPosition = useGameStore((state) => state.updateShipPosition);

  const MOVE_SPEED = 10;

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.clamp(
      ref.current.position.x + controlVector.x * delta * MOVE_SPEED,
      -12,
      12
    );
    ref.current.position.y = THREE.MathUtils.clamp(
      ref.current.position.y + controlVector.y * delta * MOVE_SPEED,
      -6,
      6
    );
    updateShipPosition(ref.current.position);
  });

  return (
    <group>
      {/* 本体 */}
      <mesh ref={ref}>
        <boxGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial
          color="orange"
          emissive="#ff5500"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* 推進エフェクト */}
      {/* <Sparkles
        size={2}
        scale={[1, 0.5, 1]}
        position={[0, 0, 1.2]}
        speed={0.4}
        count={30}
        color="#ffaa00"
      /> */}
    </group>
  );
}
