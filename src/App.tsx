import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeJSBackground } from './components/ThreeJSBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Volunteering } from './components/Volunteering';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartoonHoverPopup } from './components/CartoonHoverPopup';
import './index.css';

const App: React.FC = () => {
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderLeaving, setIsLoaderLeaving] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    let cancelled = false;
    let minimumTimeTimer = 0;
    let fadeTimer = 0;

    const waitForPageAndImages = async () => {
      if (document.readyState !== 'complete') {
        await new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
      }

      if (cancelled) return;

      // Include below-the-fold images in the initial loading screen too.
      const images = Array.from(document.images);
      images.forEach((image) => { image.loading = 'eager'; });
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));

      if (cancelled) return;
      const remainingTime = Math.max(0, 850 - (Date.now() - startedAt));
      minimumTimeTimer = window.setTimeout(() => {
        setIsLoaderLeaving(true);
        fadeTimer = window.setTimeout(() => setIsLoading(false), 450);
      }, remainingTime);
    };

    void waitForPageAndImages();

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimeTimer);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    // ── Scroll progress bar ──────────────────────────────────────────────
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollBarRef.current) {
        scrollBarRef.current.style.transform = `scaleX(${scrolled / total})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Cursor glow ──────────────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Intersection observer for all reveal variants ────────────────────
    const selectors = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-stagger'];
    const revealEls = document.querySelectorAll<HTMLElement>(selectors.join(', '));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));

    // ── Skills tag staggered wave ─────────────────────────────────────────
    const tagsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll<HTMLElement>('.tag');
            tags.forEach((tag, i) => {
              setTimeout(() => tag.classList.add('in'), i * 55);
            });
            tagsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.querySelector('.skills-tags');
    if (skillsSection) tagsObserver.observe(skillsSection);

    // ── Hero terminal loaded glow ─────────────────────────────────────────
    const heroTermWindow = document.querySelector('.hero .term-window');
    if (heroTermWindow) {
      setTimeout(() => heroTermWindow.classList.add('loaded'), 1500);
    }

    // ── Project cards stagger ─────────────────────────────────────────────
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.proj-card');
            cards.forEach((card, i) => {
              card.style.transitionDelay = `${i * 80}ms`;
              card.classList.add('in');
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const projGrid = document.querySelector('.proj-grid');
    if (projGrid) cardObserver.observe(projGrid);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      tagsObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`page-loader${isLoaderLeaving ? ' page-loader--leaving' : ''}`} role="status" aria-live="polite" aria-label="Loading portfolio">
          <div className="loader-card">
            <div className="loader-orbit" aria-hidden="true"><span /><span /><span /></div>
            <p className="loader-kicker">A LITTLE PATIENCE, PLEASE</p>
            <h1>Good things take a <span>pixel.</span></h1>
            <p className="loader-caption">Warming up the portfolio<span className="loader-dots" aria-hidden="true">...</span></p>
            <div className="loader-track" aria-hidden="true"><span /></div>
            <p className="loader-footnote">Almost ready to meet you ✦</p>
          </div>
        </div>
      )}
      {/* Scroll progress bar */}
      <div className="scroll-bar" ref={scrollBarRef} />
      {/* Cursor ambient glow */}
      <div className="cursor-glow" ref={cursorGlowRef} />

      <ThreeJSBackground />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Volunteering />
      <Contact />
      <Footer />
      <CartoonHoverPopup />
    </>
  );
};

export default App;
