import { create } from 'zustand';

interface Vector2 { x: number; y: number; }

interface GameState {
  score: number;
  lives: number;
  controlVector: Vector2;               // 仮想ジョイスティックの入力ベクトル
  setControlVector: (vec: Vector2) => void; // ジョイスティック操作時に呼ばれる
  addScore: (value: number) => void;    // スコア加算用
  loseLife: () => void;                 // ライフ減少用
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  lives: 3,
  controlVector: { x: 0, y: 0 },
  setControlVector: (vec) => set({ controlVector: vec }),
  addScore: (value) => set((state) => ({ score: state.score + value })),
  loseLife: () => set((state) => ({ lives: state.lives - 1 })),
}));
