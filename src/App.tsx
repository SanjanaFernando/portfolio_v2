import React, { useEffect, useRef } from 'react';
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
import './index.css';

const App: React.FC = () => {
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

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
    </>
  );
};

export default App;
