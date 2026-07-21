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
      role: "Full Stack Software Engineer Intern",
      company: "BotCalm",
      period: "Present",
      description: "Developing and optimizing full-stack applications with robust architecture and interactive client interfaces.",
      skills: ["MongoDB", "Express.js", "React", "Node.js", "Postman", "Vite", "Next.js"]
    },
    {
      role: "Branch Assistant (Contract)",
      company: "Peoples Bank",
      period: "Dec 2021 - Apr 2022",
      description: "Worked at the Bambalapitiya Co-op house branch, handling administration and customer-facing service workflows post-Advanced Levels.",
      skills: ["Customer Service", "Financial Operations", "Administration"]
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
        <div className="term-window contact-window reveal">
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

            <div className="exp-timeline">
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
