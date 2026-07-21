import React from 'react';

export const Skills: React.FC = () => {
  const skills = [
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "Next.js",
    "Vite.js",
    "TypeScript",
    "REST APIs",
    "Tailwind CSS",
    "Spline",
    "Flutter",
    "Dart",
    "Firebase",
    "Python",
    "Pandas & NumPy",
    "Scikit-learn",
    "PyTorch",
    "Reinforcement Learning",
    "Computer Vision",
    "OpenCV",
    "MediaPipe",
    "Git",
    "Web Security",
    "Cryptography"
  ];

  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">03</span>
          <h2 className="sec-title">/skills</h2>
          <div className="sec-rule"></div>
        </div>
        <div className="term-window pkg-window reveal">
          <div className="term-bar">
            <span className="term-dot r"></span>
            <span className="term-dot y"></span>
            <span className="term-dot g"></span>
            <span className="term-title">package.json</span>
          </div>
          <div className="term-body">
            <div className="pkg-line">{"{"}</div>
            <div className="pkg-line">
              &nbsp;&nbsp;<span className="pkg-key">"name"</span>:{" "}
              <span className="pkg-str">"sanjana-fernando"</span>,
            </div>
            <div className="pkg-line">
              &nbsp;&nbsp;<span className="pkg-key">"role"</span>:{" "}
              <span className="pkg-str">"Software Engineer"</span>,
            </div>
            <div className="pkg-line">
              &nbsp;&nbsp;<span className="pkg-key">"categories"</span>:{" "}
              <span className="pkg-line">{"["}</span>
              <span className="pkg-str">"web-dev"</span>,{" "}
              <span className="pkg-str">"mobile-dev"</span>,{" "}
              <span className="pkg-str">"machine-learning-ai"</span>,{" "}
              <span className="pkg-str">"security-tools"</span>
              <span className="pkg-line">{"]"}</span>,
            </div>
            <div className="pkg-line">
              &nbsp;&nbsp;<span className="pkg-key">"status"</span>:{" "}
              <span className="pkg-str">"undergraduate-computer-engineering"</span>
            </div>
            <div className="pkg-line">{"}"}</div>
          </div>
        </div>
        <div className="skills-tags reveal">
          {skills.map((skill, index) => (
            <span key={index} className="tag">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
