import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-tag">06</span>
          <h2 className="sec-title">/contact</h2>
          <div className="sec-rule"></div>
        </div>
        <div className="term-window contact-window reveal">
          <div className="term-bar">
            <span className="term-dot r"></span>
            <span className="term-dot y"></span>
            <span className="term-dot g"></span>
            <span className="term-title">contact.sh</span>
          </div>
          <div className="contact-body">
            <div className="contact-line">
              <span className="cmd">$</span> ./reach_out --to sanjana
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '14.5px' }}>
              Open to internships, collaborations, and interesting problems to
              solve.
            </p>
            <div className="contact-links reveal-stagger">
              <a href="mailto:w.s.fernando.se@gmail.com">w.s.fernando.se@gmail.com</a>
              <a href="tel:+94713274105">+94 713274105</a>
              <a
                href="https://linkedin.com/in/sanjana-imesh-fernando"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/sanjana-imesh-fernando
              </a>
              <a
                href="https://github.com/SanjanaFernando"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/SanjanaFernando
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
