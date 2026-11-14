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

const GREETINGS = [
  { text: 'Hello', lang: 'en', className: 'english' },
  { text: 'ආයුබෝවන්', lang: 'si', className: 'sinhala' },
  { text: 'Bonjour', lang: 'fr', className: 'french' },
  { text: 'வணக்கம்', lang: 'ta', className: 'tamil' },
];
const GREETING_STEP_MS = 380;
const GREETING_HOLD_MS = 420;

const App: React.FC = () => {
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderLeaving, setIsLoaderLeaving] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingsDone, setGreetingsDone] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  // ── Greeting sequence: English → Sinhala → French → Tamil, once per load ──
  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => {
      if (greetingIndex < GREETINGS.length - 1) {
        setGreetingIndex((index) => index + 1);
      } else {
        setGreetingsDone(true);
      }
    }, greetingIndex < GREETINGS.length - 1 ? GREETING_STEP_MS : GREETING_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [greetingIndex, isLoading]);

  // ── Wait for the page and above-the-fold images ───────────────────────
  useEffect(() => {
    let cancelled = false;

    const waitForPageAndImages = async () => {
      if (document.readyState !== 'complete') {
        await new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
      }
      if (cancelled) return;

      // Keep the initial loader focused on images already needed for the first view.
      // Forcing lazy images to eager here delays the whole page on below-the-fold media.
      const images = Array.from(document.images).filter((image) => image.loading !== 'lazy');
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));

      if (!cancelled) setPageReady(true);
    };

    void waitForPageAndImages();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Leave only after every greeting has shown AND the page is ready ───
  useEffect(() => {
    if (!greetingsDone || !pageReady) return;
    setIsLoaderLeaving(true);
    const fadeTimer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(fadeTimer);
  }, [greetingsDone, pageReady]);

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
          <div className="loader-words" aria-label="Hello in English, Sinhala, French, and Tamil">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={GREETINGS[greetingIndex].lang}
                className={`loader-word loader-word--${GREETINGS[greetingIndex].className}`}
                lang={GREETINGS[greetingIndex].lang}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
              >
                {GREETINGS[greetingIndex].text}<span className="loader-word-dot" aria-hidden="true" />
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
