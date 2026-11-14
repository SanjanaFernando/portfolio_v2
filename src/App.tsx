import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [isLoading, setIsLoading] = useState(() => sessionStorage.getItem('portfolio-intro-seen') !== 'true');
  const [isLoaderLeaving, setIsLoaderLeaving] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = [
    { text: 'Hello', lang: 'en', className: 'english' },
    { text: 'வணக்கம்', lang: 'ta', className: 'tamil' },
    { text: 'Bonjour', lang: 'fr', className: 'french' },
    { text: 'ආයුබෝවන්', lang: 'si', className: 'sinhala' },
  ];

  useEffect(() => {
    if (!isLoading) return;
    const greetingTimer = window.setInterval(() => {
      setGreetingIndex((index) => (index + 1) % greetings.length);
    }, 360);
    return () => window.clearInterval(greetingTimer);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;
    sessionStorage.setItem('portfolio-intro-seen', 'true');
    const startedAt = Date.now();
    let cancelled = false;
    let minimumTimeTimer = 0;
    let fadeTimer = 0;

    const waitForPageAndImages = async () => {
      if (document.readyState !== 'complete') {
        await new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
      }

      if (cancelled) return;

      // Keep the initial loader focused on images already needed for the first view.
      // Forcing lazy images to eager here delays the whole page on below-the-fold media.
      const images = Array.from(document.images).filter((image) => image.loading !== 'lazy');
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));

      if (cancelled) return;
      const remainingTime = Math.max(0, 1500 - (Date.now() - startedAt));
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
  }, [isLoading]);

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
      cardObserver.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`page-loader${isLoaderLeaving ? ' page-loader--leaving' : ''}`} role="status" aria-live="off" aria-label="Loading portfolio">
          <div className="loader-words" aria-label="Hello in English, Tamil, French, and Sinhala">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={greetings[greetingIndex].lang}
                className={`loader-word loader-word--${greetings[greetingIndex].className}`}
                lang={greetings[greetingIndex].lang}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
              >
                {greetings[greetingIndex].text}<span className="loader-word-dot" aria-hidden="true" />
              </motion.h1>
            </AnimatePresence>
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
