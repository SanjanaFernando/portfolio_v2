import React, { useEffect, useState } from 'react';

export const Hero: React.FC = () => {
  const [nameText, setNameText] = useState('');
  const [roleText, setRoleText] = useState('');
  const [showRoleCursor, setShowRoleCursor] = useState(false);
  const [showNameCursor, setShowNameCursor] = useState(true);

  const nameTarget = "Sanjana Fernando";
  const roleTarget = "> CS student · full-stack in progress";

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

    typeName();
  }, []);

  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="term-window">
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
            <p className="hero-sub" style={{ marginTop: '22px' }}>
              Computer Science student who likes building things end to end —
              from clean backend logic to interfaces that feel alive. Currently
              sharpening skills in full-stack development and exploring where 3D
              and web design meet.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">View projects →</a>
              <a href="#contact" className="btn btn-ghost">Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
