import React, { useState, useEffect, useCallback } from 'react';

interface VolunteerItem {
  role: string;
  organization: string;
  period?: string;
  description: string;
  tags?: string[];
}

const SLIDES = [
  { src: '/activities/ieeeextreme.jpg',      caption: 'IEEEXtreme 18.0 Hackathon' },
  { src: '/activities/eminence.jpg',         caption: 'EMINENCE 4.0' },
  { src: '/activities/idorayathra.jpg',      caption: 'Project "Idora Yathra"' },
  { src: '/activities/Mehewara.jpg',         caption: 'Mehewara O/L Seminar Series' },
  { src: '/activities/National Seminar.jpg', caption: 'National Seminar' },
  { src: '/activities/leadershipcamp.jpg',   caption: 'Leadership Camp' },
];

const INTERVAL = 3500;

/** Compute normalised offset in range -(n/2)…+(n/2) */
function getOffset(index: number, current: number, total: number): number {
  const raw = index - current;
  const mod = ((raw % total) + total) % total;
  return mod > total / 2 ? mod - total : mod;
}

/** Per-slide transform/opacity based on vertical position offset */
function getSlideStyle(offset: number): React.CSSProperties {
  if (offset === 0) {
    // Active: scale(0.75) → large center image with ~75px gap at top/bottom
    return {
      transform: 'scale(0.75)',
      opacity: 1,
      zIndex: 3,
      filter: 'none',
      pointerEvents: 'auto',
    };
  }
  if (offset === -1) {
    // Prev: pulled upward — bottom edge fills the ~100px gap above the active image
    return {
      transform: 'translateY(-36%) scale(0.65)',
      opacity: 0.75,
      zIndex: 2,
      filter: 'blur(8px)',
      pointerEvents: 'none',
    };
  }
  if (offset === 1) {
    // Next: pushed downward — top edge fills the ~100px gap below the active image
    return {
      transform: 'translateY(36%) scale(0.65)',
      opacity: 0.75,
      zIndex: 2,
      filter: 'blur(8px)',
      pointerEvents: 'none',
    };
  }
  // Far slides: hidden off-screen
  const dir = offset < 0 ? -1 : 1;
  return {
    transform: `translateY(${dir * 110}%) scale(0.4)`,
    opacity: 0,
    zIndex: 1,
    filter: 'blur(12px)',
    pointerEvents: 'none',
  };
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

  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section id="volunteering">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">05</span>
          <h2 className="sec-title">/volunteering</h2>
          <div className="sec-rule"></div>
        </div>

        <div className="vol-layout">

          {/* LEFT — Activity timeline */}
          <div className="term-window contact-window reveal vol-timeline-panel">
            <div className="term-bar">
              <span className="term-dot r"></span>
              <span className="term-dot y"></span>
              <span className="term-dot g"></span>
              <span className="term-title">volunteering.sh</span>
            </div>
            <div className="term-body" style={{ minHeight: 'auto', padding: '28px' }}>
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
                    <p className="exp-desc">{act.description}</p>
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

          {/* RIGHT — Vertical carousel */}
          <div
            className="vol-carousel reveal"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Up arrow */}
            <button className="vol-arr vol-arr--up" onClick={prev} aria-label="Previous">
              ▲
            </button>

            {/* Slide track */}
            <div className="vol-track">
              {SLIDES.map((slide, i) => {
                const offset = getOffset(i, current, SLIDES.length);
                const style  = getSlideStyle(offset);
                return (
                  <div key={i} className={`vol-slide${offset === 0 ? ' vol-slide--active' : ''}`} style={style}>
                    <img
                      src={slide.src}
                      alt={slide.caption}
                      className="vol-slide-img"
                      loading="lazy"
                    />
                    {/* caption only on active */}
                    {offset === 0 && (
                      <div className="vol-slide-caption">
                        <span className="vol-caption-text">{slide.caption}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Down arrow */}
            <button className="vol-arr vol-arr--down" onClick={next} aria-label="Next">
              ▼
            </button>

            {/* Vertical dot indicators */}
            <div className="vol-dots-v">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`vol-dot${i === current ? ' vol-dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Progress bar at bottom */}
            <div
              className="vol-progress-bar"
              key={`${current}-${paused}`}
              style={{
                animationDuration: `${INTERVAL}ms`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
