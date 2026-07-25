import React from 'react';

interface VolunteerItem {
  role: string;
  organization: string;
  period?: string;
  description: string;
  tags?: string[];
}

export const Volunteering: React.FC = () => {
  const activities: VolunteerItem[] = [
    {
      role: "Logistics Lead",
      organization: "IEEEXtreme 18.0 Hackathon",
      period: "Oct 2024",
      description: "Orchestrated operations and resource allocation for the global programming hackathon, helping the university secure its highest-ever ranking.",
      tags: ["Operations", "Resource Management", "Event Planning", "Team Leadership"]
    },
    {
      role: "Logistics Committee Member",
      organization: "EMINENCE 4.0",
      period: "2024",
      description: "Streamlined logistical workflows and event deployment, directly contributing to winning the Best Affinity Group Project Award in the IEEE Sri Lanka Section.",
      tags: ["Workflow Optimization", "Logistics", "IEEE Sri Lanka"]
    },
    {
      role: "Co-Manager",
      organization: "Project \"Idora Yathra\"",
      period: "2023",
      description: "Co-managed a community outreach initiative that donated over 500 books, conducted youth leadership workshops, and coordinated local student meals.",
      tags: ["Community Outreach", "Project Coordination", "Public Relations"]
    },
    {
      role: "Volunteer Teacher & Organizer",
      organization: "Mehewara Seminar Series",
      period: "2023 - Present",
      description: "Conducted an O/L mathematics seminar series organized by the Faculty of Engineering, University of Ruhuna, for local school students.",
      tags: ["Mathematics Education", "Community Service", "Mentorship"]
    }
  ];

  return (
    <section id="volunteering">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">05</span>
          <h2 className="sec-title">/volunteering</h2>
          <div className="sec-rule"></div>
        </div>
        <div className="term-window contact-window reveal">
          <div className="term-bar">
            <span className="term-dot r"></span>
            <span className="term-dot y"></span>
            <span className="term-dot g"></span>
            <span className="term-title">volunteering.sh</span>
          </div>
          <div className="term-body" style={{ minHeight: 'auto', padding: '32px' }}>
            <div className="term-line" style={{ marginBottom: '24px' }}>
              <span className="cmd">$</span> ./list_volunteering.sh
            </div>

            <div className="exp-timeline reveal-stagger">
              {activities.map((act, idx) => (
                <div key={idx} className="exp-item">
                  <div className="exp-dot" />

                  <div className="exp-header">
                    <h3 className="exp-title">
                      {act.role} <span className="exp-company">@ {act.organization}</span>
                    </h3>
                    {act.period && <span className="exp-period">{act.period}</span>}
                  </div>

                  <p className="exp-desc">
                    {act.description}
                  </p>

                  {act.tags && (
                    <div className="proj-stack" style={{ margin: 0 }}>
                      {act.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="chip">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
