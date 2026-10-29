import type { Scene } from 'three';

export default class Orchestrator {
  constructor(canvas: HTMLCanvasElement);
  scene: Scene;
  stage: { setTheme(theme: 'light' | 'dark'): void };
  destroy(): void;
}
