"use client";
import { Joystick } from "react-joystick-component";
import { useGameStore } from "../stores/gameStore";

export default function VirtualJoystick() {
  const setControlVector = useGameStore((state) => state.setControlVector);
  const handleMove = (evt: any) => {
    const x = evt.x ? Math.max(-1, Math.min(1, evt.x / 1)) : 0;
    const y = evt.y ? Math.max(-1, Math.min(1, evt.y / 1)) : 0;
    setControlVector({ x, y });
  };
  const handleStop = () => setControlVector({ x: 0, y: 0 });

  return (
    <div className="absolute bottom-8 left-8 z-10">
      <Joystick
        size={100}
        baseColor="rgba(255,255,255,0.3)"
        stickColor="rgba(255,255,255,0.6)"
        throttle={0.9}
        move={handleMove}
        stop={handleStop}
      />
    </div>
  );
}
