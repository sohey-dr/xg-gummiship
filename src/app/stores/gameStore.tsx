import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as THREE from "three";

export interface GameState {
  score: number;
  lives: number;
  isGameOver: boolean;
  controlVector: { x: number; y: number };
  shipPosition: THREE.Vector3;
  bullets: { id: string; position: THREE.Vector3; velocity: THREE.Vector3 }[];
  enemies: { id: string; position: THREE.Vector3; velocity: THREE.Vector3 }[];

  setControlVector: (vec: { x: number; y: number }) => void;
  updateShipPosition: (pos: THREE.Vector3) => void;
  addScore: (value: number) => void;
  loseLife: () => void;
  resetGame: () => void;
  fireBullet: (startPos: THREE.Vector3, direction: THREE.Vector3) => void;
  removeBullet: (id: string) => void;
  spawnEnemy: (pos: THREE.Vector3, vel: THREE.Vector3) => void;
  removeEnemy: (id: string) => void;
}

export const useGameStore = create<GameState>()(
  immer((set) => ({
    score: 0,
    lives: 3,
    isGameOver: false,
    controlVector: { x: 0, y: 0 } as const,
    shipPosition: new THREE.Vector3(),
    bullets: [] as any[],
    enemies: [] as any[],

    setControlVector: (vec) =>
      set((state) => {
        state.controlVector = vec;
      }),
    updateShipPosition: (pos) =>
      set((state) => {
        state.shipPosition = pos.clone();
      }),
    addScore: (value) =>
      set((state) => {
        state.score += value;
      }),
    loseLife: () =>
      set((state) => {
        state.lives -= 1;
        if (state.lives <= 0) state.isGameOver = true;
      }),
    resetGame: () =>
      set((state) => {
        state.score = 0;
        state.lives = 3;
        state.isGameOver = false;
        state.bullets = [];
        state.enemies = [];
        state.controlVector = { x: 0, y: 0 };
        state.shipPosition = new THREE.Vector3();
      }),
    fireBullet: (startPos, direction) =>
      set((state) => {
        const id = crypto.randomUUID();
        state.bullets.push({
          id,
          position: startPos.clone(),
          velocity: direction.clone().multiplyScalar(20),
        });
      }),
    removeBullet: (id) =>
      set((state) => {
        state.bullets = state.bullets.filter((b) => b.id !== id);
      }),
    spawnEnemy: (pos, vel) =>
      set((state) => {
        const id = crypto.randomUUID();
        state.enemies.push({
          id,
          position: pos.clone(),
          velocity: vel.clone(),
        });
      }),
    removeEnemy: (id) =>
      set((state) => {
        state.enemies = state.enemies.filter((e) => e.id !== id);
      }),
  }))
);
