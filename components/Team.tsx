import { team } from '@/lib/content';

/**
 * The team as monogram cards rather than stock portraits, so the demo never shows a stranger's
 * face as a clinician. To use real photos, swap `.person__mono` for an <Img>.
 */
export default function Team() {
  return (
    <section className="section" id="team">
      <div className="wrap">
        <header className="head">
          <p className="eyebrow" data-reveal>Team</p>
          <h2 className="display" data-reveal>The people you will actually see.</h2>
        </header>

        <ul className="team">
          {team.map((p, i) => (
            <li className={`person person--${(i % 3) + 1}`} key={p.name} data-reveal>
              <div className="person__mono" aria-hidden="true">{p.initials}</div>
              <p className="person__role">{p.role}</p>
              <h3 className="person__name">{p.name}</h3>
              <p className="person__line">{p.line}</p>
              <dl className="person__facts">
                <div><dt>Focus</dt><dd>{p.focus}</dd></div>
                <div><dt>Speaks</dt><dd>{p.languages}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
