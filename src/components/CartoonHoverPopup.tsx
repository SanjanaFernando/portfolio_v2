import { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';

const CARTOONS = [
  '/cartoons/hi.webp',
  '/cartoons/fingerright.webp',
  '/cartoons/fingersdown.webp',
  '/cartoons/thinking.webp',
  '/cartoons/thumbsup.webp',
  '/cartoons/clebrate.webp',
];
const SIZES = [190, 210, 180, 220, 198, 216];
const ANGLES = [-7, 5, -4, 8, -6, 3];

interface PopupState {
  container: HTMLElement;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  angle: number;
  leaving: boolean;
}

export const CartoonHoverPopup = () => {
  const [popup, setPopup] = useState<PopupState | null>(null);

  useEffect(() => {
    let activeTarget: HTMLElement | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    const getTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>('[data-cartoon]') : null;

    const cancelHide = () => {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = null;
    };

    const clearActive = () => {
      cancelHide();
      activeTarget?.classList.remove('cartoon-hover-active');
      activeTarget?.closest('.hero-left')?.classList.remove('cartoon-hover-active');
      activeTarget = null;
    };

    const showFor = (target: HTMLElement) => {
      cancelHide();
      if (activeTarget !== target) {
        clearActive();
        activeTarget = target;
        activeTarget.classList.add('cartoon-hover-active');
        activeTarget.closest('.hero-left')?.classList.add('cartoon-hover-active');
      }

      const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-cartoon]'));
      const index = Math.max(0, targets.indexOf(target));
      const width = SIZES[index % SIZES.length];
      const height = width * 1.34;
      const rect = target.getBoundingClientRect();
      const container = target.closest<HTMLElement>('.wrap') ?? document.body;
      const containerRect = container.getBoundingClientRect();
      const volunteeringOffset = target.classList.contains('vol-timeline-panel') ? 100 : 0;
      const left = Math.max(6, Math.min(
        rect.left - containerRect.left + rect.width / 2 - width / 2 + volunteeringOffset,
        container.clientWidth - width - 6,
      ));
      const top = rect.top - containerRect.top - height + 40;

      setPopup({
        container,
        src: CARTOONS[index % CARTOONS.length],
        left,
        top,
        width,
        height,
        angle: ANGLES[index % ANGLES.length],
        leaving: false,
      });
    };

    const scheduleHide = () => {
      cancelHide();
      setPopup((current) => current ? { ...current, leaving: true } : current);
      hideTimer = setTimeout(() => {
        hideTimer = null;
        clearActive();
        setPopup(null);
      }, 180);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const target = getTarget(event.target);
      if (target) {
        if (target !== activeTarget) showFor(target);
        else {
          cancelHide();
          setPopup((current) => current?.leaving ? { ...current, leaving: false } : current);
        }
      } else {
        scheduleHide();
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!activeTarget) return;
      const nextTarget = getTarget(event.relatedTarget);
      if (nextTarget === activeTarget || (nextTarget && activeTarget.contains(nextTarget))) return;
      if (event.relatedTarget instanceof Node && activeTarget.contains(event.relatedTarget)) return;
      scheduleHide();
    };

    const handleFocus = (event: FocusEvent) => {
      const target = getTarget(event.target);
      if (target) showFor(target);
    };

    const handleBlur = (event: FocusEvent) => {
      if (activeTarget && event.target instanceof Node && activeTarget.contains(event.target)) scheduleHide();
    };

    const reposition = () => {
      if (activeTarget) showFor(activeTarget);
    };

    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
    window.addEventListener('resize', reposition);

    return () => {
      clearActive();
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
      window.removeEventListener('resize', reposition);
    };
  }, []);

  if (!popup) return null;

  return createPortal(
    <div
      className={`cartoon-hover-popup${popup.leaving ? ' cartoon-hover-popup--leaving' : ''}`}
      style={{
        left: popup.left,
        top: popup.top,
        width: popup.width,
        height: popup.height,
        '--cartoon-angle': `${popup.angle}deg`,
      } as CSSProperties & { '--cartoon-angle': string }}
      aria-hidden="true"
    >
      <img key={popup.src} src={popup.src} alt="" />
    </div>,
    popup.container,
  );
};
