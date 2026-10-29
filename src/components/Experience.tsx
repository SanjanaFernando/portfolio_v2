import React from 'react';

interface ExpItem {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export const Experience: React.FC = () => {
  const experiences: ExpItem[] = [
    {
      role: "Software Engineering Intern",
      company: "BotCalm (PVT) Ltd.",
      period: "May 2025 – Feb 2026",
      description: "Built responsive web applications using Vite.js and Next.js, integrating animations with Framer Motion. Co-engineered a luxury marketplace, optimized backend APIs reducing page load by 15%, and collaborated on a real-time fraud detection project.",
      skills: ["React.js", "Next.js", "Vite.js", "Framer Motion", "TypeScript", "REST APIs", "Node.js"]
    },
    {
      role: "Bank Trainee",
      company: "Peoples Bank",
      period: "Dec 2021 – Feb 2022",
      description: "Processed 150+ daily high-volume financial transactions as main cashier with 100% accuracy in cash balancing. Resolved critical customer inquiries and maintained adherence to banking compliance regulations.",
      skills: ["Customer Service", "Financial Transactions", "Compliance Auditing"]
    }
  ];

  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">02</span>
          <h2 className="sec-title">/experience</h2>
          <div className="sec-rule"></div>
        </div>
        <div className="term-window contact-window reveal" data-cartoon>
          <div className="term-bar">
            <span className="term-dot r"></span>
            <span className="term-dot y"></span>
            <span className="term-dot g"></span>
            <span className="term-title">experience.sh</span>
          </div>
          <div className="term-body" style={{ minHeight: 'auto', padding: '32px' }}>
            <div className="term-line" style={{ marginBottom: '24px' }}>
              <span className="cmd">$</span> ./list_experience.sh
            </div>

            <div className="exp-timeline reveal-stagger">
              {experiences.map((exp, idx) => (
                <div key={idx} className="exp-item">
                  <div className="exp-dot" />

                  <div className="exp-header">
                    <h3 className="exp-title">
                      {exp.role} <span className="exp-company">@ {exp.company}</span>
                    </h3>
                    <span className="exp-period">{exp.period}</span>
                  </div>

                  <p className="exp-desc">
                    {exp.description}
                  </p>

                  <div className="proj-stack" style={{ margin: 0 }}>
                    {exp.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="chip">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
