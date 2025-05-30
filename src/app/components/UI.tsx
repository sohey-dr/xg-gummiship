"use client";

import { useGameStore } from "../stores/gameStore";

export default function UI() {
  const score = useGameStore((state) => state.score);
  const lives = useGameStore((state) => state.lives);

  return (
    <div className="absolute top-0 left-0 p-4 text-white z-10">
      {/* スコアとライフを画面左上に表示 */}
      <div>Score: {score}</div>
      <div>Lives: {lives}</div>
    </div>
  );
}
