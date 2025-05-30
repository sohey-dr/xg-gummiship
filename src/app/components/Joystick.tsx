"use client";
import { Joystick } from "react-joystick-component";
import { useGameStore } from "../stores/gameStore";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

export default function VirtualJoystick() {
  const setControlVector = useGameStore((state) => state.setControlVector);

  // ジョイスティック移動中のコールバック
  const handleMove = (evt: IJoystickUpdateEvent) => {
    setControlVector({
      x: evt.x ? evt.x / 1 : 0,
      y: evt.y ? evt.y / 1 : 0,
    });
  };

  // ジョイスティックを離したときのコールバック
  const handleStop = () => {
    setControlVector({ x: 0, y: 0 });
  };

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
