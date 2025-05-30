"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import Ship from "./components/Ship";
import UI from "./components/UI";
import VirtualJoystick from "./components/Joystick";

export default function HomePage() {
  return (
    <div className="w-screen h-screen relative">
      {/* 3Dシーンを描画するCanvas */}
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        {/* 環境光と方向光 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* 星の背景 */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        {/* Shipコンポーネントを遅延読み込み */}
        <Suspense fallback={null}>
          <Ship />
        </Suspense>
        {/* カメラ操作(ズーム／パン無効) */}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      {/* スコアやライフの表示 */}
      <UI />
      {/* 仮想ジョイスティック */}
      <VirtualJoystick />
    </div>
  );
}
