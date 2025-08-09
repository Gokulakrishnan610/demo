import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // milliseconds between letters/words
  duration?: number; // seconds per tween
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number; // 0..1 viewport percent before trigger
  rootMargin?: string; // e.g., '-100px'
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reset any previous split
    if (splitRef.current) {
      splitRef.current.revert();
      splitRef.current = null;
    }

    // Create split
    const splitter = new SplitType(el, {
      types: splitType,
      tagName: 'span',
    });
    splitRef.current = splitter;

    // Collect targets
    let targets: Element[] = [];
    if (splitType.includes('chars')) targets = targets.concat(splitter.chars || []);
    if (splitType.includes('words')) targets = targets.concat(splitter.words || []);
    if (splitType === 'lines') targets = splitter.lines || [];
    if (targets.length === 0) return;

    targets.forEach((t) => {
      (t as HTMLElement).style.display = 'inline-block';
      (t as HTMLElement).style.willChange = 'transform, opacity';
    });

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
        once: true,
        onToggle: (self) => {
          triggerRef.current = self;
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        gsap.set(targets, { ...to, clearProps: 'willChange', immediateRender: true });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      tl.kill();
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      gsap.killTweensOf(targets);
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        textAlign: textAlign as any,
        overflow: 'hidden',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      }}
    >
      {text}
    </span>
  );
};

export default SplitText;


