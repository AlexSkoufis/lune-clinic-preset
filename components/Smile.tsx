/**
 * An abstract smile drawn in SVG: eight teeth along an arc. Three numbers (each 0–1) shape it:
 *   align    — 0 crooked and gappy, 1 straight
 *   shade    — 0 dull and yellowed, 1 bright
 *   evenness — 0 worn and uneven lengths, 1 even
 * Used in the hero (animated) and in the before/after comparison (driven by a slider).
 */

// Per tooth, centre outwards mirrored: width, height, and how far it is "out" when crooked.
const TEETH = [
  { w: 36, h: 50, rot: 9, dx: 5, dy: 7, wear: 9 },
  { w: 42, h: 58, rot: -7, dx: -6, dy: -8, wear: 3 },
  { w: 50, h: 68, rot: 11, dx: 7, dy: 5, wear: 12 },
  { w: 60, h: 80, rot: -6, dx: -5, dy: -4, wear: 5 },
  { w: 60, h: 80, rot: 5, dx: 6, dy: 8, wear: 14 },
  { w: 50, h: 68, rot: -10, dx: -4, dy: -6, wear: 2 },
  { w: 42, h: 58, rot: 8, dx: 5, dy: 9, wear: 10 },
  { w: 36, h: 50, rot: -6, dx: -3, dy: -5, wear: 6 },
];
const GAP = 7;
const WIDTH = TEETH.reduce((sum, t) => sum + t.w, 0) + GAP * (TEETH.length - 1);

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const DULL = [226, 205, 152];
const BRIGHT = [255, 254, 250];

export function toothColor(shade: number) {
  return `rgb(${DULL.map((c, i) => Math.round(mix(c, BRIGHT[i], shade))).join(' ')})`;
}

type Props = { align: number; shade: number; evenness?: number; className?: string; title?: string };

export default function Smile({ align, shade, evenness = 1, className, title }: Props) {
  const crooked = 1 - align;
  const fill = toothColor(shade);
  let x = -WIDTH / 2;

  return (
    <svg className={className} viewBox="-232 -22 464 132" role="img" aria-label={title ?? 'Illustration of a smile'}>
      <defs>
        <linearGradient id="tooth-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {TEETH.map((t, i) => {
        const cx = x + t.w / 2;
        x += t.w + GAP;
        // Gum line follows a gentle arc: outer teeth sit a little higher
        const top = (cx * cx) / 2600;
        const height = t.h - t.wear * (1 - evenness);
        const transform = `translate(${cx + t.dx * crooked} ${top + t.dy * crooked}) rotate(${t.rot * crooked})`;
        return (
          <g key={i} transform={transform}>
            <rect x={-t.w / 2} y={3} width={t.w} height={height} rx={t.w * 0.3} fill="rgb(23 38 43 / .1)" />
            <rect x={-t.w / 2} y={0} width={t.w} height={height} rx={t.w * 0.3} fill={fill} />
            <rect x={-t.w / 2} y={0} width={t.w} height={height} rx={t.w * 0.3} fill="url(#tooth-sheen)" />
          </g>
        );
      })}
    </svg>
  );
}
