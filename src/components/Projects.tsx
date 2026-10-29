import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  tabName: string;
  title: string;
  desc: string;
  stack: string[];
  image: string;
  isMobile?: boolean;
  sourceUrl?: string;
}

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const projects: Project[] = [
    {
      tabName: "bed_allocation_rl.py",
      title: "Hospital Bed Allocation & Management Platform",
      desc: "Developed a full-stack optimization platform combining a Next.js dashboard with a Python backend to deploy a custom Reinforcement Learning agent, successfully automating hospital bed allocation to maximize asset utilization and reduce patient wait times.",
      stack: ["Next.js", "React.js", "Tailwind CSS", "Python", "PyTorch", "DDQN", "NumPy", "Pandas", "SciPy"],
      image: "/projects/hospitalbedmanagement.png",
      sourceUrl: "#"
    },
    {
      tabName: "booktalk_chat.tsx",
      title: "BookTalk – AI Chat Application",
      desc: "Built a Next.js chat application featuring a clean web UI to interact with a Groq-hosted Llama model, leveraging advanced streaming capabilities.",
      stack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Vercel AI SDK", "Groq", "OpenAI SDK"],
      image: "/projects/booktalk.png",
      sourceUrl: "https://github.com/SanjanaFernando/booktalk"
    },
    {
      tabName: "bidpilot.py",
      title: "BidPilot – AI-Powered RFP & Tender Proposal Platform",
      desc: "Built a LangGraph multi-agent RAG workflow with Python and FastAPI to automate RFP parsing, semantic knowledge retrieval, and compliance-checked bid generation, paired with a Next.js dashboard for end-to-end proposal automation.",
      stack: ["Python", "FastAPI", "LangGraph", "LangChain", "Google Gemini", "Supabase", "PostgreSQL", "pgvector", "PDFPlumber", "Next.js", "TypeScript"],
      image: "/projects/gesture_image.png",
    },
    {
      tabName: "virtual_mouse.py",
      title: "AI-Powered Hand Gesture Virtual Mouse",
      desc: "Engineered an AI-driven computer vision application that processes real-time webcam streams to track hand landmarks and classify gestures for system control.",
      stack: ["Python", "PyTorch", "MediaPipe", "OpenCV", "Deep Learning"],
      image: "/projects/gesture_image.png",
      sourceUrl: "https://github.com/Kaveesha20/gesture-mouse"
    },
    {
      tabName: "secure_file_drop.js",
      title: "Secure File Drop",
      desc: "Co-engineered a secure full-stack web application featuring a robust authentication system and granular access controls to guarantee protected file transfers, implementing proactive defenses against unauthorized access.",
      stack: ["Cryptography", "Web Security Models", "HTML", "CSS", "Git"],
      image: "/projects/securefiledrop.png",
      sourceUrl: "https://github.com/Neshadi/secure-file-drop"
    },
    {
      tabName: "e_chess.js",
      title: "E-Chess",
      desc: "Developed a full-stack web platform designed to manage and participate in competitive, real-time chess tournaments.",
      stack: ["MongoDB", "Express.js", "Vite.js", "Node.js", "Chess.js"],
      image: "/projects/echess.png",
      sourceUrl: "https://github.com/SanjanaFernando/eChess"
    },
    {
      tabName: "fitness_tracker.dart",
      title: "Fitness Tracking Mobile Application",
      desc: "Created a mobile application for comprehensive fitness tracking, providing users with specialized meal plans, exercise tracking, and workout routines.",
      stack: ["Flutter", "Dart", "Firebase"],
      image: "/projects/fitnessapp.png",
      isMobile: true,
      sourceUrl: "https://github.com/SanjanaFernando/FitnessApp_2"
    },
    {
      tabName: "currency_exchange.tsx",
      title: "Currency Exchange Market",
      desc: "Designed and built a prototype full-stack platform for monitoring and simulating currency exchange transactions.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      image: "/projects/currencyexchange.png",
      sourceUrl: "https://github.com/SanjanaFernando/CurrencyExchangeMarket"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const chapters = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.project-chapter'));
    const chapterList = section.querySelector('.project-chapters');
    if (!chapterList) return;
    const triggers = chapters.map((chapter, index) => ScrollTrigger.create({
      trigger: chapter,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveProject(index),
      onEnterBack: () => setActiveProject(index),
    }));
    const progressTrigger = ScrollTrigger.create({
      trigger: chapterList,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        const progress = section.querySelector<HTMLElement>('.project-progress-fill');
        if (progress) progress.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      progressTrigger.kill();
    };
  }, []);

  const selectedProject = projects[activeProject];

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">04</span>
          <h2 className="sec-title">/projects</h2>
          <div className="sec-rule"></div>
        </div>
        <p className="projects-intro">A selection of intelligent systems, useful tools, and experiments built for the real world.</p>
        <div className="project-scrolly">
          <div className="project-sticky">
            <div className="project-story-meta">
              <span>SELECTED BUILDS</span>
              <span>{String(activeProject + 1).padStart(2, '0')} <i>/</i> {String(projects.length).padStart(2, '0')}</span>
            </div>
            <div className="project-progress"><span className="project-progress-fill" /></div>
            <AnimatePresence mode="wait">
              <motion.article
                className="proj-card project-feature"
                key={selectedProject.tabName}
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.985 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`proj-image-wrap${selectedProject.isMobile ? ' proj-image-wrap--mobile' : ''}`}>
                  <motion.img
                    key={selectedProject.image}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className={`proj-image${selectedProject.isMobile ? ' proj-image--mobile' : ''}`}
                    initial={{ scale: 1.06, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.55 }}
                  />
                  <div className="proj-image-overlay" />
                </div>
                <div className="proj-tab"><span className="dot" />{selectedProject.tabName}</div>
                <div className="proj-body">
                  <div className="proj-title">{selectedProject.title}</div>
                  <p className="proj-desc">{selectedProject.desc}</p>
                  <div className="proj-stack">
                    {selectedProject.stack.map((tech) => <span key={tech} className="chip">{tech}</span>)}
                  </div>
                  <div className="proj-links">
                    <a href={selectedProject.sourceUrl} target="_blank" rel="noopener noreferrer">View source ↗</a>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
            <div className="project-sticky-caption"><span className="project-live-dot" />SCROLL TO EXPLORE</div>
          </div>

          <div className="project-chapters" aria-label="Project chapters">
            {projects.map((project, index) => (
              <button
                id={`project-chapter-${index}`}
                className={`project-chapter${activeProject === index ? ' is-active' : ''}`}
                key={project.tabName}
                type="button"
                onClick={() => document.getElementById(`project-chapter-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              >
                <span className="project-chapter-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-chapter-copy">
                  <span className="project-chapter-file">{project.tabName}</span>
                  <span className="project-chapter-title">{project.title}</span>
                  <span className="project-chapter-summary">{project.desc}</span>
                </span>
                <span className="project-chapter-arrow">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
