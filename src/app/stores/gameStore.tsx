import { create } from "zustand";

interface GameState {
  score: number;
  lives: number;
  addScore: (value: number) => void;
  loseLife: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  lives: 3,
  addScore: (value) => set((state) => ({ score: state.score + value })),
  loseLife: () =>
    set((state) => {
      const newLives = state.lives - 1;
      return {
        lives: newLives,
      };
    }),
}));
