import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-inner">
        <div className="logo">
          <span className="prompt">sanjana@dev</span><span className="path">:~$</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">about</a></li>
          <li><a href="#experience">experience</a></li>
          <li><a href="#skills">skills</a></li>
          <li><a href="#projects">projects</a></li>
          <li><a href="#contact">contact</a></li>
        </ul>
      </div>
    </nav>
  );
};
