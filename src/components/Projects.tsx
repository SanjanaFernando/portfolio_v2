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
      tabName: "e-chess.tsx",
      title: "E-Chess (Ongoing)",
      desc: "A platform designed to manage and facilitate chess tournaments, enabling users to organize and participate in competitive matches online.",
      stack: ["MongoDB", "Express.js", "Vite.js", "Node.js"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "currency_exchange.tsx",
      title: "Currency Exchange Market",
      desc: "A prototype currency exchange platform supporting real-time transactions, rates, and wallet management simulated in a clean user dashboard.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "fitness_app.dart",
      title: "Fitness App",
      desc: "An Android application designed to keep track of user fitness metrics, providing customized workout logs, diet plans, and progress tracking.",
      stack: ["Flutter", "Dart", "Firebase"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "form_builder.tsx",
      title: "Dynamic Form Builder (Ongoing)",
      desc: "A drag-and-drop form designer platform allowing creators to configure custom input schemas, deploy forms instantly, and track submissions. Managed as a DevOps pipeline project.",
      stack: ["PostgreSQL", "Next.js", "Node.js"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "pos_system.cs",
      title: "Point of Sales System",
      desc: "A lightweight desktop POS utility tracking inventory quantities, generating transactions, and structuring relational store sales logs.",
      stack: ["Windows Forms (C#)", "SQLite"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "expenses_tracker.html",
      title: "Expenses Tracker",
      desc: "A static front-end dashboard visualizing personal income patterns, savings rates, and expense ledgers.",
      stack: ["HTML", "CSS", "JavaScript"],
      demoUrl: "#",
      sourceUrl: "#"
    },
    {
      tabName: "rain_predict.py",
      title: "Rain Prediction Model",
      desc: "A predictive analytics script analyzing meteorological datasets to estimate rain probabilities using supervised Random Forest and Logistic Regression classifiers.",
      stack: ["Python", "Pandas", "Seaborn", "NumPy", "Scikit-Learn"],
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
