import { useEffect, useRef } from 'react';
import Orchestrator from '../ThreeJS/Orchestrator.js';

export const ThreeJSBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const experience = new Orchestrator(canvasRef.current);
    const updateTheme = () => {
      experience.stage.setTheme(
        document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
      );
    };

    updateTheme();
    window.addEventListener('portfolio-theme-change', updateTheme);

    return () => {
      window.removeEventListener('portfolio-theme-change', updateTheme);
      experience.destroy();
    };
  }, []);

  return (
    <div className="interactive-grid-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};
