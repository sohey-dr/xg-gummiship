"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Ship  from "./components/Ship";
import UI from "./components/UI";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <Suspense fallback={null}>
          <Ship />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <UI />
    </div>
  );
}
