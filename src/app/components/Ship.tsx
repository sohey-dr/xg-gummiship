"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Ship() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = Math.sin(Date.now() * 0.001) * 2;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      {/* グミシップの形状をボックスジオメトリで定義 */}
      <boxGeometry args={[1, 0.5, 2]} />
      {/* マテリアルの色をオレンジに設定 */}
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
