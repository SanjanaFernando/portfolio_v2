import React from 'react';

interface Project {
  tabName: string;
  title: string;
  desc: string;
  stack: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

export const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      tabName: "bed_allocation_rl.py",
      title: "Hospital Bed Allocation & Management Platform",
      desc: "Developed a full-stack optimization platform combining a Next.js dashboard with a Python backend to deploy a custom Reinforcement Learning agent, successfully automating hospital bed allocation to maximize asset utilization and reduce patient wait times.",
      stack: ["Next.js", "React.js", "Tailwind CSS", "Python", "PyTorch", "DDQN", "NumPy", "Pandas", "SciPy"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "booktalk_chat.tsx",
      title: "BookTalk – AI Chat Application",
      desc: "Built a Next.js chat application featuring a clean web UI to interact with a Groq-hosted Llama model, leveraging advanced streaming capabilities.",
      stack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Vercel AI SDK", "Groq", "OpenAI SDK"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "virtual_mouse.py",
      title: "AI-Powered Hand Gesture Virtual Mouse",
      desc: "Engineered an AI-driven computer vision application that processes real-time webcam streams to track hand landmarks and classify gestures for system control.",
      stack: ["Python", "PyTorch", "MediaPipe", "OpenCV", "Deep Learning"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "secure_file_drop.js",
      title: "Secure File Drop",
      desc: "Co-engineered a secure full-stack web application featuring a robust authentication system and granular access controls to guarantee protected file transfers, implementing proactive defenses against unauthorized access.",
      stack: ["Cryptography", "Web Security Models", "HTML", "CSS", "Git"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "e_chess.js",
      title: "E-Chess",
      desc: "Developed a full-stack web platform designed to manage and participate in competitive, real-time chess tournaments.",
      stack: ["MongoDB", "Express.js", "Vite.js", "Node.js", "Chess.js"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "fitness_tracker.dart",
      title: "Fitness Tracking Mobile Application",
      desc: "Created a mobile application for comprehensive fitness tracking, providing users with specialized meal plans, exercise tracking, and workout routines.",
      stack: ["Flutter", "Dart", "Firebase"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "currency_exchange.tsx",
      title: "Currency Exchange Market",
      desc: "Designed and built a prototype full-stack platform for monitoring and simulating currency exchange transactions.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      demoUrl: "#",
      sourceUrl: "#"
    }
  ];

  return (
    <section id="projects">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">04</span>
          <h2 className="sec-title">/projects</h2>
          <div className="sec-rule"></div>
        </div>
        <div className="proj-grid">
          {projects.map((project, index) => (
            <div key={index} className="proj-card reveal">
              <div className="proj-tab">
                <span className="dot"></span>
                {project.tabName}
              </div>
              <div className="proj-body">
                <div className="proj-title">{project.title}</div>
                <p className="proj-desc">{project.desc}</p>
                <div className="proj-stack">
                  {project.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="chip">{tech}</span>
                  ))}
                </div>
                <div className="proj-links">
                  <a href={project.demoUrl}>Live demo</a>
                  <a href={project.sourceUrl}>Source</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
