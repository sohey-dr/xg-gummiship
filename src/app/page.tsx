"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import Ship from "./components/Ship";
import UI from "./components/UI";
import VirtualJoystick from "./components/Joystick";

/*
  HomePage コンポーネント
  - Canvas による3Dシーン描画
  - UI と仮想ジョイスティックをオーバーレイ表示
*/
export default function HomePage() {
  return (
    <div className="w-screen h-screen relative">
      {/* 3Dシーン */}
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} /> {/* 環境光 */}
        <directionalLight position={[5, 5, 5]} intensity={1} /> {/* 方向光 */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade />{" "}
        {/* 星の背景 */}
        <Suspense fallback={null}>
          {" "}
          {/* 遅延読み込み */}
          <Ship />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />{" "}
        {/* カメラ操作 */}
      </Canvas>
      <UI /> {/* スコア・ライフ表示 */}
      <VirtualJoystick /> {/* 仮想ジョイスティック */}
    </div>
  );
}
