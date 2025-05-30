"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../stores/gameStore";

export default function Ship() {
  const ref = useRef<THREE.Mesh>(null);
  const controlVector = useGameStore((state) => state.controlVector);
  const updateShipPosition = useGameStore((state) => state.updateShipPosition);

  const MOVE_SPEED = 300; // スピード少し増加

  useFrame((_, delta) => {
    if (!ref.current) return;
    // 機体移動
    ref.current.position.x = THREE.MathUtils.clamp(
      ref.current.position.x + controlVector.x * delta * MOVE_SPEED,
      -10,
      10
    );
    ref.current.position.y = THREE.MathUtils.clamp(
      ref.current.position.y + controlVector.y * delta * MOVE_SPEED,
      -5,
      5
    );
    // ストアに位置を反映
    updateShipPosition(ref.current.position);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
