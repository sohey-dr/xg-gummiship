"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../stores/gameStore";

export default function Ship() {
  const ref = useRef<THREE.Mesh>(null);
  const controlVector = useGameStore((state) => state.controlVector);

  const moveSpeed = 5; // 前後移動のスピード係数
  const rotateSpeed = 1.5; // 旋回のスピード係数

  useFrame((_, delta) => {
    if (ref.current) {
      // 左右入力(controlVector.x)でY軸回転
      ref.current.rotation.y -= controlVector.x * delta * rotateSpeed;

      // 前後入力(controlVector.y)で前方ベクトルに移動量を掛けて移動
      const forward = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(ref.current.quaternion)
        .multiplyScalar(controlVector.y * delta * moveSpeed);
      ref.current.position.add(forward);
    }
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
