'use client';

import { useEffect, useRef, useState } from 'react';
import { smile } from '@/lib/content';
import { gsap, MQ } from '@/lib/motion';
import { requestBooking } from '@/lib/bus';
import Smile from './Smile';

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Before and after, drawn in code. Pick a treatment and drag the slider: the smile straightens,
 * brightens or evens out, and the shade readout walks along the dental shade guide.
 * The slider is a native range input, so it works with touch and the arrow keys.
 */
export default function Compare() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(100);
  const touched = useRef(false);
  const c = smile.cases[active];
  const t = progress / 100;

  const [align, shade, evenness] = c.from.map((from, i) => mix(from, c.to[i], t));
  const shadeName = smile.shades[Math.round(shade * (smile.shades.length - 1))];

  // Sweep from "before" to "after" once when the section arrives, to show that it moves
  useEffect(() => {
    if (!root.current || !window.matchMedia(MQ.motion).matches) return;
    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 100, duration: 2, ease: 'power2.inOut', paused: true,
      onUpdate: () => { if (!touched.current) setProgress(Math.round(state.p)); },
    });
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setProgress(0);
      tween.play();
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(root.current);
    return () => { io.disconnect(); tween.kill(); };
  }, []);

  const choose = (i: number) => { touched.current = true; setActive(i); setProgress(100); };

  return (
    <section className="section section--mint" id="smile" ref={root}>
      <div className="wrap">
        <header className="head head--center">
          <p className="eyebrow" data-reveal>Results</p>
          <h2 className="display" data-reveal>{smile.title}</h2>
        </header>

        <div className="compare" data-reveal>
          <div className="tabs tabs--center" role="tablist" aria-label="Treatment">
            {smile.cases.map((item, i) => (
              <button key={item.id} type="button" role="tab" aria-selected={i === active} className={i === active ? 'tab is-active' : 'tab'} onClick={() => choose(i)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="compare__stage">
            <Smile className="compare__smile" align={align} shade={shade} evenness={evenness} title={`${c.label}: ${progress}% of the way from before to after`} />
            <p className="compare__shade"><small>Shade</small>{shadeName}</p>
          </div>

          <label className="compare__slider">
            <span>Before</span>
            <input
              type="range" min={0} max={100} value={progress}
              aria-label={`${c.label}: before to after`}
              style={{ '--p': `${progress}%` } as React.CSSProperties}
              onChange={(e) => { touched.current = true; setProgress(Number(e.target.value)); }}
            />
            <span>After</span>
          </label>

          <ul className="pills pills--center">
            {c.facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <button type="button" className="btn btn--ink" onClick={() => requestBooking(c.id)}>Ask about {c.label.toLowerCase()} <span aria-hidden="true">→</span></button>
          <p className="note">{smile.note}</p>
        </div>
      </div>
    </section>
  );
}
