'use client';

import { useState } from 'react';
import { clinic, finder, treatments, type TreatmentId } from '@/lib/content';
import { money, requestBooking } from '@/lib/bus';

/** Three questions; each answer scores treatments, and the highest score is the recommendation. */
export default function Finder() {
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step === finder.length;

  let result = treatments[0];
  if (done) {
    const scores: Partial<Record<TreatmentId, number>> = {};
    answers.forEach((a, i) => {
      for (const [id, points] of Object.entries(finder[i].options[a].points)) {
        scores[id as TreatmentId] = (scores[id as TreatmentId] ?? 0) + points;
      }
    });
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    result = treatments.find((t) => t.id === best)!;
  }

  return (
    <section className="section" id="finder">
      <div className="wrap">
        <div className="finder" data-reveal>
          <div className="finder__intro">
            <p className="eyebrow">Treatment finder</p>
            <h2 className="display">Not sure what you need?</h2>
            <p>Three quick questions and we will point you to the right first appointment.</p>
            <ol className="finder__steps" aria-hidden="true">
              {finder.map((_, i) => <li key={i} className={i < step ? 'is-done' : i === step ? 'is-current' : undefined} />)}
            </ol>
          </div>

          <div className="finder__card" aria-live="polite">
            {!done ? (
              <>
                <p className="finder__count">Question {step + 1} of {finder.length}</p>
                <h3 className="finder__q">{finder[step].q}</h3>
                <div className="finder__options">
                  {finder[step].options.map((o, i) => (
                    <button key={o.label} type="button" className="option" onClick={() => setAnswers([...answers, i])}>{o.label}</button>
                  ))}
                </div>
                {step > 0 && <button type="button" className="link" onClick={() => setAnswers(answers.slice(0, -1))}>← Back</button>}
              </>
            ) : (
              <>
                <p className="finder__count">We would start with</p>
                <h3 className="finder__q">{result.name}</h3>
                <p>{result.detail}</p>
                <ul className="pills">
                  <li>{result.duration}</li>
                  <li>{result.visits}</li>
                  <li>from {money(result.from, clinic.currency)}{result.unit ? ` ${result.unit}` : ''}</li>
                </ul>
                <div className="finder__actions">
                  <button type="button" className="btn btn--accent" onClick={() => requestBooking(result.id)}>Book this <span aria-hidden="true">→</span></button>
                  <button type="button" className="link" onClick={() => setAnswers([])}>Start again</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
