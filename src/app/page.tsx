"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import Ship from "./components/Ship";
import Bullets from "./components/Bullets";
import Enemies from "./components/Enemies";
import UI from "./components/UI";
import VirtualJoystick from "./components/Joystick";
import FireButton from "./components/FireButton";
import { useGameStore } from "./stores/gameStore";
import * as THREE from "three";

export default function HomePage() {
  const spawnEnemy = useGameStore((state) => state.spawnEnemy);

  useEffect(() => {
    const timer = setInterval(() => {
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 10 - 5;
      spawnEnemy(new THREE.Vector3(x, y, -20), new THREE.Vector3(0, 0, 5));
    }, 2000);
    return () => clearInterval(timer);
  }, [spawnEnemy]);

  return (
    <div className="w-screen h-screen relative">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        <Suspense fallback={null}>
          <Ship />
          <Bullets />
          <Enemies />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <UI />
      <VirtualJoystick />
      <FireButton />
    </div>
  );
}
