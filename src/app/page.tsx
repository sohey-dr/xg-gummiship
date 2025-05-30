"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
} from "@react-three/postprocessing";
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
      const x = Math.random() * 24 - 12;
      const y = Math.random() * 12 - 6;
      spawnEnemy(new THREE.Vector3(x, y, -25), new THREE.Vector3(0, 0, 6));
    }, 1800);
    return () => clearInterval(timer);
  }, [spawnEnemy]);

  return (
    <div className="w-screen h-screen relative">
      <Canvas
        camera={{ position: [0, 3, 7], fov: 70 }}
        shadows
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={["#000011", 5, 30]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* 星空と環境 */}
        <Stars radius={150} depth={50} count={8000} factor={5} fade />
        <Environment preset="sunset" />

        <Suspense fallback={null}>
          <Ship />
          <Bullets />
          <Enemies />
        </Suspense>

        <EffectComposer>
          <DepthOfField
            focusDistance={0.3}
            focalLength={2}
            bokehScale={0.6}
            height={480}
          />
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
        </EffectComposer>

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>

      <UI />
      <VirtualJoystick />
      <FireButton />
    </div>
  );
}
