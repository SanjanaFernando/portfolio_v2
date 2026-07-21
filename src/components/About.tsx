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
          <div className="term-window about-window reveal">
            <div className="term-bar">
              <span className="term-dot r"></span>
              <span className="term-dot y"></span>
              <span className="term-dot g"></span>
              <span className="term-title">about.md</span>
            </div>
            <div className="term-body">
              I'm <strong>Sanjana Fernando</strong>, a Computer Engineering student
              who enjoys the moment code stops being instructions and starts
              being an experience. I split my time between backend logic — APIs,
              databases, algorithms — and the front-end details that make
              software feel considered rather than just functional. <br /><br />
              Lately I've been drawn to the space where design tools like
              <strong>Spline</strong> meet real engineering: building interfaces
              that feel dimensional instead of flat, without losing sight of
              performance and usability.
            </div>
          </div>

          <div className="reveal">
            <div className="stat-grid" style={{ marginBottom: '24px' }}>
              <div className="stat">
                <div className="stat-num">10+</div>
                <div className="stat-label">// projects shipped</div>
              </div>
              <div className="stat">
                <div className="stat-num">6</div>
                <div className="stat-label">// languages used</div>
              </div>
              <div className="stat">
                <div className="stat-num">3</div>
                <div className="stat-label">// hackathons</div>
              </div>
              <div className="stat">
                <div className="stat-num">∞</div>
                <div className="stat-label">// curiosity</div>
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
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"specialization"</span>: <span className="pkg-str">"Computer Engineering"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"cgpa"</span>: <span className="pkg-str">"2.77"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"period"</span>: <span className="pkg-str">"2022 - Present"</span>
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;{"},"}
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;{"{"}
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"institute"</span>: <span className="pkg-str">"Bandaranayake College Gampaha"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"a-levels"</span>: <span className="pkg-str">"Combined Maths (A), Physics (A), Chemistry (B)"</span>,
                </div>
                <div className="pkg-line">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="pkg-key">"o-levels"</span>: <span className="pkg-str">"8As, 1B"</span>
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
