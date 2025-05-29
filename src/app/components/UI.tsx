"use client";

import { useGameStore } from "@/app/stores/gameStore";

export default function UI() {
  const score = useGameStore((state) => state.score);
  const lives = useGameStore((state) => state.lives);

  return (
    <div className="absolute top-0 left-0 p-4 text-white">
      <div>Score: {score}</div>
      <div>Lives: {lives}</div>
    </div>
  );
}
