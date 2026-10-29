import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem('portfolio-theme') === 'dark',
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', {
      detail: darkMode ? 'dark' : 'light',
    }));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 60) {
        navRef.current.classList.add('scrolled');
      } else {
        navRef.current.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { href: '#about',        label: 'about' },
    { href: '#experience',   label: 'experience' },
    { href: '#skills',       label: 'skills' },
    { href: '#projects',     label: 'projects' },
    { href: '#volunteering', label: 'volunteering' },
    { href: '#contact',      label: 'contact' },
  ];

  return (
    <nav ref={navRef}>
      <div className="nav-inner">
        <div className="logo">
          <span className="prompt">sanjana@dev</span><span className="path">:~$</span>
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {/* ./ prefix rendered as text so ::before/::after are free for glitch */}
                <span className="nav-prefix">./</span>
                <span className="glitch" data-text={item.label}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setDarkMode((isDark) => !isDark)}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
        </button>
      </div>
    </nav>
  );
};
