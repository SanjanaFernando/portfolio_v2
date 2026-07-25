import React from "react";
import Spline from "@splinetool/react-spline";

export const SplineBackground: React.FC = () => {
  return (
    <>
      <div className="bg-spline">
        <div className="bg-spline-stage">
          <Spline scene="https://prod.spline.design/QykuhvcwMcxsYxTw/scene.splinecode" />
        </div>
      </div>
      <div className="bg-overlay" />
    </>
  );
};
