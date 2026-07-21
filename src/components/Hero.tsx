import React, { useEffect, useRef, useState } from 'react';

const NAME = 'Sanjana Fernando';
const ROLE = '> Computer Engineering student · Software Engineer';
const PHOTOS = ['/me1.png', '/me2.png'];

export const Hero: React.FC = () => {
  // ── Entrance animation ────────────────────────────────────────────────
  const [visible, setVisible] = useState(false);

  // ── Photo glitch state (needs re-render, so useState is fine) ────────
  const [photoIndex, setPhotoIndex] = useState(0);
  const [glitching, setGlitching]   = useState(false);

  // ── DOM refs for typewriter (avoids React state batching entirely) ────
  const nameEl   = useRef<HTMLDivElement>(null);
  const roleEl   = useRef<HTMLDivElement>(null);
  const curNameEl = useRef<HTMLSpanElement>(null);
  const curRoleEl = useRef<HTMLSpanElement>(null);

  // ── Entrance: add class after one frame so CSS transition fires ───────
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // ── Typewriter via direct DOM writes — zero React state involved ──────
  useEffect(() => {
    const nameDiv  = nameEl.current;
    const roleDiv  = roleEl.current;
    const curName  = curNameEl.current;
    const curRole  = curRoleEl.current;
    if (!nameDiv || !roleDiv || !curName || !curRole) return;


    // Reset DOM in case HMR reloaded without full page refresh
    nameDiv.textContent = '';
    roleDiv.textContent = '';
    curName.style.display = 'none';
    curRole.style.display = 'none';

    let tid: ReturnType<typeof setTimeout>;
    let dead = false;

    const go = (fn: () => void, ms: number) => {
      tid = setTimeout(() => { if (!dead) fn(); }, ms);
    };

    let ni = 0;
    let ri = 0;

    const typeName = () => {
      if (ni <= NAME.length) {
        nameDiv.textContent = NAME.slice(0, ni);
        ni++;
        go(typeName, 65);
      } else {
        // Name done — show name cursor briefly, then start role
        curName.style.display = 'inline-block';
        go(() => {
          curName.style.display = 'none';
          curRole.style.display = 'inline-block';
          go(typeRole, 60);
        }, 350);
      }
    };

    const typeRole = () => {
      if (ri <= ROLE.length) {
        roleDiv.textContent = ROLE.slice(0, ri);
        ri++;
        go(typeRole, 33);
      }
      // role cursor stays blinking after done
    };

    // Begin typing 600ms after mount (card slide-in takes ~300ms + 800ms)
    go(typeName, 600);

    return () => {
      dead = true;
      clearTimeout(tid);
    };
  }, []);

  // ── Photo glitch cycle ────────────────────────────────────────────────
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    let alive = true;

    const cycle = () => {
      tid = setTimeout(() => {
        if (!alive) return;
        setGlitching(true);
        tid = setTimeout(() => {
          if (!alive) return;
          setPhotoIndex(p => (p + 1) % PHOTOS.length);
          tid = setTimeout(() => {
            if (!alive) return;
            setGlitching(false);
            cycle();
          }, 180);
        }, 120);
      }, 3000 + Math.random() * 2000);
    };

    cycle();
    return () => { alive = false; clearTimeout(tid); };
  }, []);

  return (
    <header className={`hero${visible ? ' hero-visible' : ''}`}>
      <div className="wrap">
        <div className="hero-grid hero-grid-two-col">

          {/* ── LEFT: terminal card ───────────────────────────────────── */}
          <div className={`hero-left${visible ? ' hero-left-in' : ''}`}>
            <div className="term-window hero-term">
              <div className="term-bar">
                <span className="term-dot r" />
                <span className="term-dot y" />
                <span className="term-dot g" />
                <span className="term-title">intro.sh</span>
              </div>
              <div className="term-body">
                <div className="term-line"><span className="cmd">$</span> whoami</div>

                {/* name line — written directly via ref */}
                <div className="hero-name" id="typedName">
                  <span ref={nameEl} />
                  <span className="cursor" ref={curNameEl} style={{ display: 'none' }} />
                </div>

                {/* role line — written directly via ref */}
                <div className="term-out" id="typedRole">
                  <span ref={roleEl} />
                  <span className="cursor" ref={curRoleEl} style={{ display: 'none' }} />
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

          {/* ── RIGHT: photo ──────────────────────────────────────────── */}
          <div className={`hero-right${visible ? ' hero-right-in' : ''}`}>
            <div className={`hero-photo-frame${glitching ? ' glitching' : ''}`}>
              <div className="hero-photo-glow" />
              <div className="photo-subject">
                <img src={PHOTOS[photoIndex]} alt="Sanjana Fernando" className="hero-photo-img" />
                <img src={PHOTOS[photoIndex]} aria-hidden="true" className="photo-ghost photo-ghost-r" />
                <img src={PHOTOS[photoIndex]} aria-hidden="true" className="photo-ghost photo-ghost-c" />
              </div>
              <span className="corner-tl" />
              <span className="corner-br" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
