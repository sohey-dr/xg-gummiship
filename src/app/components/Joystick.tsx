"use client";
import { Joystick } from "react-joystick-component";
import { useGameStore } from "../stores/gameStore";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

export default function VirtualJoystick() {
  const setControlVector = useGameStore((state) => state.setControlVector);

  const handleMove = (evt: IJoystickUpdateEvent) => {
    // evt.x, evt.y は -50～50 の範囲なので -1～1 に正規化
    const x = evt.x ? Math.max(-1, Math.min(1, evt.x / 50)) : 0;
    const y = evt.y ? Math.max(-1, Math.min(1, evt.y / 50)) : 0;
    setControlVector({ x, y });
  };
  const handleStop = () => setControlVector({ x: 0, y: 0 });

  return (
    <div className="absolute bottom-8 left-8 z-10">
      <Joystick
        size={100} // ジョイスティック領域の直径
        baseColor="rgba(255,255,255,0.3)" // 土台の半透明色
        stickColor="rgba(255,255,255,0.6)" // スティック部分の色
        throttle={0.9} // 感度調整係数
        move={handleMove}
        stop={handleStop}
      />
    </div>
  );
}
