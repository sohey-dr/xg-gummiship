"use client";
import { useGameStore } from "../stores/gameStore";

export default function UI() {
  const score = useGameStore((state) => state.score);
  const lives = useGameStore((state) => state.lives);
  const isGameOver = useGameStore((state) => state.isGameOver);

  return (
    <div className="absolute top-0 left-0 p-4 text-white z-10">
      <div>Score: {score}</div>
      <div>Lives: {lives}</div>
      {isGameOver && <div className="mt-2 text-red-400 text-xl">Game Over</div>}
    </div>
  );
}
