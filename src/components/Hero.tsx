import React, { useEffect, useState, useRef } from 'react';

export const Hero: React.FC = () => {
  const [nameText, setNameText] = useState('');
  const [roleText, setRoleText] = useState('');
  const [showRoleCursor, setShowRoleCursor] = useState(false);
  const [showNameCursor, setShowNameCursor] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const nameTarget = "Sanjana Fernando";
  const roleTarget = "> CS student · full-stack in progress";
  const photos = ['/me1.png', '/me2.png'];

  // Trigger entrance animation after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setNameText(nameTarget);
      setRoleText(roleTarget);
      setShowNameCursor(true);
      setShowRoleCursor(true);
      return;
    }

    let nameIdx = 0;
    let roleIdx = 0;

    const typeName = () => {
      if (nameIdx <= nameTarget.length) {
        setNameText(nameTarget.slice(0, nameIdx));
        nameIdx++;
        setTimeout(typeName, 55);
      } else {
        setShowNameCursor(true);
        setTimeout(startRoleTyping, 200);
      }
    };

    const startRoleTyping = () => {
      setShowNameCursor(false);
      setShowRoleCursor(true);
      const typeRole = () => {
        if (roleIdx <= roleTarget.length) {
          setRoleText(roleTarget.slice(0, roleIdx));
          roleIdx++;
          setTimeout(typeRole, 30);
        }
      };
      typeRole();
    };

    // Delay typewriter to sync with entrance animation
    const delay = setTimeout(typeName, 700);
    return () => clearTimeout(delay);
  }, []);

  // Photo glitch switcher
  useEffect(() => {
    const schedule = () => {
      const wait = 3000 + Math.random() * 2000;
      return setTimeout(() => {
        setGlitching(true);
        setTimeout(() => {
          setPhotoIndex(prev => (prev + 1) % photos.length);
          setTimeout(() => {
            setGlitching(false);
          }, 180);
        }, 120);
        schedule();
      }, wait);
    };
    const timer = schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={`hero${visible ? ' hero-visible' : ''}`} ref={heroRef}>
      <div className="wrap">
        <div className="hero-grid hero-grid-two-col">
          {/* LEFT: Name card */}
          <div className={`hero-left${visible ? ' hero-left-in' : ''}`}>
            <div className="term-window hero-term">
              <div className="term-bar">
                <span className="term-dot r"></span>
                <span className="term-dot y"></span>
                <span className="term-dot g"></span>
                <span className="term-title">intro.sh</span>
              </div>
              <div className="term-body">
                <div className="term-line"><span className="cmd">$</span> whoami</div>
                <div className="hero-name" id="typedName">
                  {nameText}
                  {showNameCursor && <span className="cursor" />}
                </div>
                <div className="term-out" id="typedRole">
                  {roleText}
                  {showRoleCursor && <span className="cursor" />}
                </div>
              </div>
            </div>
            <p className={`hero-sub${visible ? ' hero-sub-in' : ''}`} style={{ marginTop: '22px' }}>
              Computer Science student who likes building things end to end —
              from clean backend logic to interfaces that feel alive. Currently
              sharpening skills in full-stack development and exploring where 3D
              and web design meet.
            </p>
            <div className={`hero-cta${visible ? ' hero-cta-in' : ''}`}>
              <a href="#projects" className="btn btn-primary">
                <span className="glitch" data-text="View projects →">View projects →</span>
              </a>
              <a href="#contact" className="btn btn-ghost">
                <span className="glitch" data-text="Get in touch">Get in touch</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Photo */}
          <div className={`hero-right${visible ? ' hero-right-in' : ''}`}>
            <div className={`hero-photo-frame${glitching ? ' glitching' : ''}`}>
              <div className="hero-photo-glow" />

              {/* Subject wrapper — glitch layers are sibling <img>s with same transparent PNG */}
              <div className="photo-subject">
                <img
                  src={photos[photoIndex]}
                  alt="Sanjana Fernando"
                  className="hero-photo-img"
                />
                {/* Red channel ghost — shifted left, clipped to scanlines */}
                <img
                  src={photos[photoIndex]}
                  aria-hidden="true"
                  className="photo-ghost photo-ghost-r"
                />
                {/* Cyan channel ghost — shifted right, different scanline band */}
                <img
                  src={photos[photoIndex]}
                  aria-hidden="true"
                  className="photo-ghost photo-ghost-c"
                />
              </div>

              {/* Corner accents */}
              <span className="corner-tl" />
              <span className="corner-br" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
