"use client";
import { useGameStore } from "../stores/gameStore";
import * as THREE from "three";

export default function FireButton() {
  const fireBullet = useGameStore((state) => state.fireBullet);
  const shipPosition = useGameStore((state) => state.shipPosition);

  const handleFire = () => {
    const dir = new THREE.Vector3(0, 0, -1);
    console.log(shipPosition);
    fireBullet(shipPosition, dir);
  };

  return (
    <button
      className="absolute bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full z-10"
      onTouchStart={handleFire}
      onClick={handleFire}
    >
      Fire
    </button>
  );
}
