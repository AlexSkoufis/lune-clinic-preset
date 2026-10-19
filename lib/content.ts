// Every visible string and number on the page lives here. Lune is a fictional clinic:
// replace the details, treatments, prices, team and reviews with your own.

/** Photos in assets-src/ (run `npm run images` after changing them). */
export type ImageKey = 'lounge' | 'recovery' | 'waiting' | 'exterior';

export const clinic = {
  name: 'Lune',
  line: 'Dental & aesthetic clinic',
  area: 'Kifisia, Athens',
  address: ['14 Kassaveti Street', '145 62 Kifisia, Athens'],
  phone: '+30 210 000 0000',
  emergency: '+30 210 000 0001',
  email: 'hello@lune.example',
  timeZone: 'Europe/Athens',
  currency: '€',
  // Shown in the footer. Replace with your real registration details.
  regulatory: 'Regulatory placeholder: add your clinic licence number, registered practitioners and complaints procedure here.',
};

export const nav = [
  { href: '#treatments', label: 'Treatments' },
  { href: '#smile', label: 'Results' },
  { href: '#costs', label: 'Costs' },
  { href: '#team', label: 'Team' },
  { href: '#clinic', label: 'Clinic' },
];

export const hero = {
  eyebrow: 'Dental & aesthetic clinic · Kifisia',
  // Wrap a word in *asterisks* to set it in the accent colour.
  title: 'The calm way to a *brighter* smile.',
  lead: 'Unhurried appointments, honest prices and a team that explains everything before they pick up a tool.',
  cta: 'Book a visit',
  secondary: 'Find your treatment',
  rating: { score: '4.9', count: '1,240 reviews' },
  promise: ['No lectures', 'Prices up front', 'Same-day emergencies'],
};

/** Brightens word by word as you scroll. Words in [brackets] are highlighted. */
export const statement =
  'We built Lune for people who put off the dentist. So there are [no lectures,] [no surprise bills] and [no rush.] Just good care, explained in plain words, in a room that feels nothing like a clinic.';

export const stats = [
  { value: 18, suffix: ' yrs', label: 'Caring for Kifisia since 2008' },
  { value: 45, suffix: ' min', label: 'Minimum for a first visit' },
  { value: 96, suffix: '%', label: 'Of patients would recommend us' },
  { value: 0, suffix: '%', label: 'Interest on plans up to 12 months' },
];

export type TreatmentKind = 'dental' | 'aesthetic';
export type TreatmentId =
  | 'checkup' | 'whitening' | 'aligners' | 'veneers' | 'implant' | 'emergency'
  | 'skin' | 'lines' | 'boosters' | 'peel';

export type Treatment = {
  id: TreatmentId;
  kind: TreatmentKind;
  name: string;
  blurb: string;
  detail: string;
  duration: string;
  visits: string;
  /** Starting price in whole euros. */
  from: number;
  /** Shown after the price, e.g. "per tooth". */
  unit?: string;
};

export const treatments: Treatment[] = [
  { id: 'checkup', kind: 'dental', name: 'Check-up & clean', from: 60, duration: '45 min', visits: '1 visit',
    blurb: 'A full examination, a gentle clean and a clear plan.',
    detail: 'We look at teeth, gums and jaw, take photographs so you can see what we see, and clean with warm water and airflow rather than scraping.' },
  { id: 'whitening', kind: 'dental', name: 'Teeth whitening', from: 290, duration: '60 min', visits: '1 visit + home trays',
    blurb: 'Several shades lighter, without the sensitivity.',
    detail: 'In-chair whitening followed by custom trays to top up at home. We check your enamel first and tell you honestly what shade is realistic.' },
  { id: 'aligners', kind: 'dental', name: 'Clear aligners', from: 2400, duration: '6–12 months', visits: 'Review every 8 weeks',
    blurb: 'Straighter teeth with removable, nearly invisible trays.',
    detail: 'A 3D scan instead of moulds, a preview of the result before you commit, and a fixed price that includes retainers.' },
  { id: 'veneers', kind: 'dental', name: 'Porcelain veneers', from: 480, unit: 'per tooth', duration: '2 weeks', visits: '3 visits',
    blurb: 'Reshape chipped, worn or uneven teeth.',
    detail: 'Designed digitally and tried in as a mock-up first, so you approve the shape and shade before anything permanent is made.' },
  { id: 'implant', kind: 'dental', name: 'Dental implants', from: 1450, unit: 'per tooth', duration: '3–5 months', visits: '4 visits',
    blurb: 'A fixed replacement that looks and feels like your own tooth.',
    detail: 'Planned from a 3D scan and placed under local anaesthetic, with sedation available. The price includes the crown.' },
  { id: 'emergency', kind: 'dental', name: 'Emergency visit', from: 80, duration: '30 min', visits: 'Same day',
    blurb: 'Pain, swelling or a broken tooth, seen today.',
    detail: 'Call before 14:00 and we will see you the same day. We get you out of pain first and plan the rest later.' },
  { id: 'skin', kind: 'aesthetic', name: 'Skin consultation', from: 40, duration: '30 min', visits: '1 visit',
    blurb: 'A doctor-led assessment and a plan with no pressure.',
    detail: 'Skin analysis, a conversation about what bothers you, and a written plan. The fee comes off any treatment you go on to book.' },
  { id: 'lines', kind: 'aesthetic', name: 'Anti-wrinkle treatment', from: 180, duration: '30 min', visits: '1 visit + review',
    blurb: 'Softens expression lines while keeping your expression.',
    detail: 'Prescribed and carried out by a doctor, with a free review at two weeks. We aim for rested, never frozen.' },
  { id: 'boosters', kind: 'aesthetic', name: 'Skin boosters', from: 220, duration: '45 min', visits: '2–3 visits',
    blurb: 'Deep hydration for dull or tired skin.',
    detail: 'Fine injections of hyaluronic acid that improve texture and glow over a few weeks. Numbing cream is always included.' },
  { id: 'peel', kind: 'aesthetic', name: 'Medical-grade peel', from: 120, duration: '40 min', visits: 'Course of 3',
    blurb: 'Evens tone and texture with little downtime.',
    detail: 'Chosen for your skin type after a consultation. Expect a few days of mild flaking and noticeably brighter skin after.' },
];

/** Treatment finder: three questions, each answer adds points to treatments; the top score is recommended. */
export const finder: { q: string; options: { label: string; points: Partial<Record<TreatmentId, number>> }[] }[] = [
  { q: 'What brings you in?', options: [
    { label: 'Just a check-up', points: { checkup: 3 } },
    { label: 'Something hurts', points: { emergency: 4 } },
    { label: 'I want a better smile', points: { whitening: 2, aligners: 2, veneers: 2 } },
    { label: 'A missing tooth', points: { implant: 4 } },
    { label: 'My skin', points: { skin: 3, boosters: 1, peel: 1, lines: 1 } },
  ] },
  { q: 'What would you change first?', options: [
    { label: 'The colour', points: { whitening: 3, peel: 2 } },
    { label: 'The alignment', points: { aligners: 3 } },
    { label: 'The shape', points: { veneers: 3 } },
    { label: 'Fine lines', points: { lines: 3 } },
    { label: 'Nothing, just keep it healthy', points: { checkup: 2, skin: 1 } },
  ] },
  { q: 'How soon do you want results?', options: [
    { label: 'Today', points: { emergency: 2, whitening: 2, lines: 1, checkup: 1 } },
    { label: 'In a few weeks', points: { veneers: 2, boosters: 2, peel: 2 } },
    { label: 'I can be patient', points: { aligners: 2, implant: 2 } },
  ] },
];

/** The before-and-after illustration. `from` and `to` are [alignment, shade, evenness], each 0–1. */
export const smile = {
  title: 'See what a few visits can do.',
  note: 'An illustration of typical changes, not a clinical prediction. Your dentist will show you a preview made from your own scan.',
  cases: [
    { id: 'whitening' as TreatmentId, label: 'Whitening', from: [0.9, 0.1, 0.8], to: [0.9, 1, 0.8],
      facts: ['1 visit', 'Up to 8 shades', 'From €290'] },
    { id: 'aligners' as TreatmentId, label: 'Aligners', from: [0, 0.55, 0.5], to: [1, 0.55, 0.6],
      facts: ['6–12 months', 'Removable trays', 'From €2,400'] },
    { id: 'veneers' as TreatmentId, label: 'Veneers', from: [0.45, 0.25, 0], to: [1, 0.95, 1],
      facts: ['3 visits', 'Shape and shade', 'From €480 per tooth'] },
  ],
  // Dental shade guide, darkest to lightest: the readout walks along it with the slider.
  shades: ['A4', 'A3.5', 'A3', 'A2', 'A1', 'B1', 'BL3', 'BL1'],
};

/** Payment plans for the cost estimator. `apr` is a yearly percentage; 0 means interest-free. */
export const plans = [
  { months: 1, label: 'Pay in full', apr: 0 },
  { months: 6, label: '6 months', apr: 0 },
  { months: 12, label: '12 months', apr: 0 },
  { months: 24, label: '24 months', apr: 7.9 },
];
export const costsNote =
  'Guide prices for a typical case. Your written plan, with the exact price, is free and comes before any treatment. Finance is subject to status.';

export const team = [
  { initials: 'EM', name: 'Dr Eleni Markou', role: 'Lead dentist', focus: 'Restorative and implant dentistry',
    line: 'Explains everything twice and never minds a third time.', languages: 'Greek, English', kinds: ['dental'] },
  { initials: 'JR', name: 'Dr Jonas Reiter', role: 'Orthodontist', focus: 'Clear aligners and bite correction',
    line: 'Shows you the end result on screen before you start.', languages: 'German, English, Greek', kinds: ['dental'] },
  { initials: 'SD', name: 'Dr Sofia Daniel', role: 'Aesthetic doctor', focus: 'Skin health and injectables',
    line: 'Will happily talk you out of a treatment you do not need.', languages: 'Greek, English, French', kinds: ['aesthetic'] },
  { initials: 'NV', name: 'Nikos Vale', role: 'Dental hygienist', focus: 'Gum care and anxious patients',
    line: 'The reason people stop dreading their clean.', languages: 'Greek, English', kinds: ['dental'] },
] as const;

export const clinicSection = {
  title: 'A clinic that does not feel like one.',
  text: 'Daylight, soft chairs and no smell of antiseptic in the waiting room. You get a private room, a drink, and as long as you need.',
  photos: [
    // Order matters: the first photo is the tall one on the left, the last is the wide one bottom right.
    { image: 'exterior' as ImageKey, alt: 'The pale exterior of the clinic building', caption: 'Kassaveti Street' },
    { image: 'recovery' as ImageKey, alt: 'A recovery room with soft seating and a garden view', caption: 'Recovery room' },
    { image: 'waiting' as ImageKey, alt: 'A calm sitting area with a large sofa', caption: 'Waiting area' },
    { image: 'lounge' as ImageKey, alt: 'A bright white lounge with round windows', caption: 'The lounge' },
  ],
  features: ['Step-free access', 'Sedation available', 'Free parking for patients', 'Children welcome'],
};

/** Opening hours in the clinic's local time. 0 = Sunday. `null` means closed. */
export const hours: ([string, string] | null)[] = [
  null,
  ['08:00', '20:00'],
  ['08:00', '20:00'],
  ['08:00', '20:00'],
  ['08:00', '20:00'],
  ['08:00', '18:00'],
  ['09:00', '14:00'],
];
export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Small things patients can ask for when booking. */
export const comforts = ['Noise-cancelling headphones', 'A weighted blanket', 'Numbing gel first', 'Extra time to talk', 'A stop signal'];

export const booking = {
  title: 'Book a visit in under a minute.',
  text: 'Pick a reason and a time. We will confirm by text, and you can change or cancel up to 24 hours before.',
  // Appointment start times offered each day (those outside opening hours are skipped).
  slots: ['08:30', '09:15', '10:00', '11:30', '12:15', '13:00', '15:00', '16:30', '17:15', '18:30'],
  demoNote: 'This is a demo: nothing is sent or stored.',
};

export const reviews = [
  { quote: 'I had not been to a dentist in nine years. Nobody made me feel bad about it. I have been back four times since.', name: 'Maria K.', detail: 'Check-up & clean' },
  { quote: 'They showed me the result on a screen before I paid for anything, and it looks exactly like that now.', name: 'Thomas B.', detail: 'Clear aligners' },
  { quote: 'Broke a tooth on a Saturday morning and was seen by eleven. Fixed, explained and no drama.', name: 'Anna P.', detail: 'Emergency visit' },
  { quote: 'Dr Daniel suggested less than I asked for. That is why I trust her.', name: 'Irene S.', detail: 'Skin consultation' },
];

export const faqs = [
  { q: 'I am nervous. What can you do?', a: 'Most of our patients are, at first. Tell us when you book and we will allow extra time, agree a stop signal and go at your pace. Sedation is available for longer treatments.' },
  { q: 'How much will it cost?', a: 'Every treatment has a starting price on this page. After your first visit you get a written plan with the exact price, and nothing starts until you have agreed it.' },
  { q: 'Can I spread the cost?', a: 'Yes. Plans of 6 or 12 months are interest-free, and longer plans are available. The estimator above shows the monthly amount.' },
  { q: 'Do you see children?', a: 'From their first tooth. Early visits are short and playful so the dentist becomes a normal place to be.' },
  { q: 'What if I have an emergency?', a: 'Call the emergency line. If you ring before 14:00 we will see you the same day.' },
  { q: 'Do I need a referral for aesthetic treatments?', a: 'No. Every aesthetic treatment starts with a consultation with a doctor, who will tell you honestly what will and will not help.' },
];

export const footer = {
  cta: 'Ready when you are.',
  note: 'Lune is a fictional clinic. This website is a CoreConcepts design template.',
};
