import React, { useEffect, useRef } from 'react';

export const Skills: React.FC = () => {
  const skills = [
    { name: "MongoDB", icon: "mongodb" },
    { name: "Express.js", icon: "express" },
    { name: "React.js", icon: "react" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "Next.js", icon: "nextdotjs" },
    { name: "Vite.js", icon: "vite" },
    { name: "TypeScript", icon: "typescript" },
    { name: "REST APIs", icon: "openapiinitiative" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Spline", icon: "/skills/spline.png" },
    { name: "Flutter", icon: "flutter" },
    { name: "Dart", icon: "dart" },
    { name: "Firebase", icon: "firebase" },
    { name: "Python", icon: "python" },
    { name: "Pandas & NumPy", icon: ["pandas", "numpy"] },
    { name: "Scikit-learn", icon: "scikitlearn" },
    { name: "PyTorch", icon: "pytorch" },
    { name: "Reinforcement Learning", icon: "pytorch" },
    { name: "Computer Vision", icon: "opencv" },
    { name: "OpenCV", icon: "opencv" },
    { name: "MediaPipe", icon: "mediapipe" },
    { name: "Git", icon: "git" },
    { name: "Web Security", icon: "owasp" },
    { name: "Cryptography", icon: "letsencrypt" },
  ];
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = carouselRef.current;
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let previousTime = 0;
    const advance = (time: number) => {
      if (previousTime) {
        const firstSet = track.querySelector<HTMLElement>('.skills-carousel-set');
        const loopWidth = firstSet?.scrollWidth ?? 0;
        track.scrollLeft += (time - previousTime) * 0.055;
        if (loopWidth > 0 && track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(advance);
    };

    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">03</span>
          <h2 className="sec-title">/skills</h2>
          <div className="sec-rule"></div>
        </div>
        <div className="term-window pkg-window reveal" data-cartoon>
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
        <div className="skills-carousel reveal">
          <div className="skills-carousel-track" ref={carouselRef} aria-label="Skills and technologies">
            {[0, 1].map((copy) => (
              <div className="skills-carousel-set" key={copy} aria-hidden={copy === 1}>
                {skills.map((skill) => (
                  <div key={skill.name} className="skill-card">
                    <span className="skill-icon-wrap">
                      {(Array.isArray(skill.icon) ? skill.icon : [skill.icon]).map((icon) => (
                        <img key={icon} src={icon.startsWith('/') ? icon : `https://cdn.simpleicons.org/${icon}`} alt="" loading="lazy" />
                      ))}
                    </span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="skills-tags reveal" aria-label="Skill badges">
          {skills.map((skill) => <span key={skill.name} className="tag">{skill.name}</span>)}
        </div>
      </div>
    </section>
  );
};
