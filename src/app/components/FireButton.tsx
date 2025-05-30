"use client";
import { useGameStore } from "../stores/gameStore";
import * as THREE from "three";
import { useRef } from "react";

export default function FireButton() {
  const fireBullet = useGameStore((state) => state.fireBullet);
  const shipPosition = useGameStore((state) => state.shipPosition);
  const lastFireTime = useRef(0);
  const COOLDOWN = 100; // クールダウン時間（ミリ秒）

  const handleFire = () => {
    const now = Date.now();
    if (now - lastFireTime.current < COOLDOWN) return;

    const dir = new THREE.Vector3(0, 0, -1);
    fireBullet(shipPosition, dir);
    lastFireTime.current = now;
  };

  return (
    <button
      className="absolute bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full z-10 shadow-lg"
      onTouchStart={handleFire}
      onClick={handleFire}
    >
      Fire
    </button>
  );
}
