'use client';

import { clinic, footer, nav } from '@/lib/content';
import { requestBooking } from '@/lib/bus';
import { Logo } from './Nav';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__cta" data-reveal>
          <h2 className="display display--xl">{footer.cta}</h2>
          <button type="button" className="btn btn--accent" onClick={() => requestBooking()}>Book a visit <span aria-hidden="true">→</span></button>
        </div>

        <div className="footer__grid">
          <div>
            <Logo />
            <p>{clinic.line}<br />{clinic.area}</p>
          </div>
          <nav aria-label="Footer">
            {nav.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a href="#faq">Questions</a>
          </nav>
          <address>
            {clinic.address.map((line) => <span key={line}>{line}</span>)}
            <a href={`tel:${clinic.phone.replaceAll(' ', '')}`}>{clinic.phone}</a>
            <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          </address>
        </div>

        <div className="footer__base">
          <p>{clinic.regulatory}</p>
          <p>© {new Date().getFullYear()} {clinic.name}. {footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
