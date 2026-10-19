'use client';

import { useEffect, useState } from 'react';
import { clinic, nav } from '@/lib/content';
import { requestBooking } from '@/lib/bus';

export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="currentColor" />
        <circle cx="21" cy="12" r="11" fill="var(--paper)" />
      </svg>
      {clinic.name}
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__bar">
        <a href="#top" aria-label={`${clinic.name} home`}><Logo /></a>

        <nav className="nav__links" id="nav-links" aria-label="Main" onClick={() => setOpen(false)}>
          {nav.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a className="nav__phone" href={`tel:${clinic.phone.replaceAll(' ', '')}`}>{clinic.phone}</a>
        </nav>

        <div className="nav__actions">
          <button type="button" className="btn btn--accent btn--sm" onClick={() => requestBooking()}>Book a visit</button>
          <button
            type="button"
            className="nav__toggle"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen(!open)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
