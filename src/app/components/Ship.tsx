"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../stores/gameStore";

export default function Ship() {
  const ref = useRef<THREE.Mesh>(null);
  const { controlVector } = useGameStore((state) => state);
  const moveSpeed = 5; // 移動速度係数

  useFrame((_, delta) => {
    if (!ref.current) return;

    // 入力ベクトルを直接移動に利用 (Z方向は使用しない)
    const dx = controlVector.x * delta * moveSpeed;
    const dy = controlVector.y * delta * moveSpeed;

    // 現在位置に加算
    ref.current.position.x += dx;
    ref.current.position.y += dy;

    // 移動範囲の制限: X[-10,10], Y[-5,5]
    ref.current.position.x = THREE.MathUtils.clamp(
      ref.current.position.x,
      -10,
      10
    );
    ref.current.position.y = THREE.MathUtils.clamp(
      ref.current.position.y,
      -5,
      5
    );
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      {/* 機体の形状: ボックスジオメトリ */}
      <boxGeometry args={[1, 0.5, 2]} />
      {/* オレンジ色の標準マテリアル */}
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}