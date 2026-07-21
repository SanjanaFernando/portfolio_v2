import React from 'react';

export const SplineBackground: React.FC = () => {
  return (
    <>
      <div className="bg-spline">
        <spline-viewer
          url="https://prod.spline.design/QykuhvcwMcxsYxTw/scene.splinecode"
          loading="eager"
        />
      </div>
      <div className="bg-overlay" />
      <span className="bg-credit">// placeholder scene — swap with your own</span>
    </>
  );
};
