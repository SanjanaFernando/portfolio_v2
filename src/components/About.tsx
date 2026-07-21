import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">01</span>
          <h2 className="sec-title">/about</h2>
          <div className="sec-rule"></div>
        </div>
        <div className="about-grid">
          <div className="term-window about-window reveal-left">
            <div className="term-bar">
              <span className="term-dot r"></span>
              <span className="term-dot y"></span>
              <span className="term-dot g"></span>
              <span className="term-title">about.md</span>
            </div>
            <div className="term-body">
              I'm <strong>Sanjana Fernando</strong>, a Computer Engineering undergraduate
              with a strong foundation in data structures, algorithms, full-stack development,
              and machine learning. I enjoy building responsive applications and collaborating in agile teams to
              deliver scalable, secure, and user-focused solutions. <br /><br />
              I split my time between backend logic — APIs, databases, algorithms — and the front-end details that make
              software feel considered. Lately I've been drawn to the space where design tools like
              <strong> Spline</strong> meet real engineering.
            </div>
          </div>

          <div className="reveal-right">
            <div className="stat-grid reveal-stagger" style={{ marginBottom: '24px' }}>
              <div className="stat">
                <div className="stat-num">7+</div>
                <div className="stat-label">// key projects</div>
              </div>
              <div className="stat">
                <div className="stat-num">8+</div>
                <div className="stat-label">// languages & tools</div>
              </div>
              <div className="stat">
                <div className="stat-num">4+</div>
                <div className="stat-label">// certifications</div>
              </div>
              <div className="stat">
                <div className="stat-num">3+</div>
                <div className="stat-label">// leadership roles</div>
              </div>
            </div>

            <div className="term-window">
              <div className="term-bar">
                <span className="term-dot r"></span>
                <span className="term-dot y"></span>
                <span className="term-dot g"></span>
                <span className="term-title">education.json</span>
              </div>
              <div className="term-body" style={{ minHeight: 'auto', padding: '20px 24px', fontSize: '13px', lineHeight: '1.7' }}>
                <div className="pkg-line">{"["}</div>
                <div className="pkg-line">
                  &nbsp;&nbsp;{"{"}
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"institute"</span>: <span className="pkg-str">"University of Ruhuna"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"department"</span>: <span className="pkg-str">"Dept. of Electrical and Information Engineering"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"specialization"</span>: <span className="pkg-str">"B.Sc. in Computer Engineering Specialization"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"cgpa"</span>: <span className="pkg-str">"3.33 / 4.00"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"expectedGraduation"</span>: <span className="pkg-str">"Sep 2026"</span>
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;{"},"}
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;{"{"}
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"institute"</span>: <span className="pkg-str">"GCE Advanced Level (2020)"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"results"</span>: <span className="pkg-str">"Combined Maths (A), Physics (A), Chemistry (B)"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"zScore"</span>: <span className="pkg-str">"1.9"</span>
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;{"}"}
                </div>
                <div className="pkg-line">{"]"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
