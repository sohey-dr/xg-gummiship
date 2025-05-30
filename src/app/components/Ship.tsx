'use client';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../stores/gameStore';
import { Sparkles } from '@react-three/drei';

export default function Ship() {
  // グループ全体を動かすため、Groupへの参照を作成
  const groupRef = useRef<THREE.Group>(null);
  const controlVector = useGameStore(state => state.controlVector);
  const updateShipPosition = useGameStore(state => state.updateShipPosition);
  const MOVE_SPEED = 8;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Groupのpositionを更新
    const newX = THREE.MathUtils.clamp(
      groupRef.current.position.x + controlVector.x * delta * MOVE_SPEED,
      -12,
      12
    );
    const newY = THREE.MathUtils.clamp(
      groupRef.current.position.y + controlVector.y * delta * MOVE_SPEED,
      -6,
      6
    );
    groupRef.current.position.set(newX, newY, groupRef.current.position.z);
    // ストアに位置反映
    updateShipPosition(groupRef.current.position);
  });

  return (
    <group ref={groupRef}>
      {/* 本体メッシュ */}
      <mesh>
        <boxGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color="orange" emissive="#ff5500" emissiveIntensity={0.5} />
      </mesh>
      {/* 推進エフェクト: SparklesはGroupに結びつき、移動に追随 */}
      <Sparkles
        size={1}
        scale={[1.2, 1.2, 1.2]}
        position={[0, 0, 0.5]}
        speed={0.02}
        count={30}
        color="#ffaa00"
        attach="geometry"
      />
    </group>
  );
}
