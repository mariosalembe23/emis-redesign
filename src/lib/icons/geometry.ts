export type Point = [number, number];

export const HEART =
  "M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.1 4.5 6.9 4.5c2.2 0 3.9 1.2 5.1 3 1.2-1.8 2.9-3 5.1-3 3.8 0 5.9 3.8 4.4 7.3C19.5 16.4 12 21 12 21z";
export const CALL =
  "M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z";
export const CLOUD = "M18 42a11 11 0 0 1-1.4-21.9A14 14 0 0 1 44 18a12 12 0 0 1 1 24z";

export const MIR = `transform="matrix(-1 0 0 1 64 0)"`;

const f = (n: number) => +n.toFixed(2);

export function roundPoly(pts: Point[], r: number): string {
  let d = "";
  pts.forEach((v, i) => {
    const p0 = pts[(i - 1 + pts.length) % pts.length];
    const p2 = pts[(i + 1) % pts.length];
    const l0 = Math.hypot(p0[0] - v[0], p0[1] - v[1]);
    const l2 = Math.hypot(p2[0] - v[0], p2[1] - v[1]);
    const a = [v[0] + ((p0[0] - v[0]) * r) / l0, v[1] + ((p0[1] - v[1]) * r) / l0];
    const b = [v[0] + ((p2[0] - v[0]) * r) / l2, v[1] + ((p2[1] - v[1]) * r) / l2];
    d += `${i ? "L" : "M"}${f(a[0])} ${f(a[1])}Q${f(v[0])} ${f(v[1])} ${f(b[0])} ${f(b[1])}`;
  });
  return d + "Z";
}

export function starPts(cx: number, cy: number, R: number, r: number, n: number): Point[] {
  const p: Point[] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    const rr = i % 2 ? r : R;
    p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return p;
}

export function ngon(cx: number, cy: number, R: number, n: number, rot = 0): Point[] {
  const p: Point[] = [];
  for (let i = 0; i < n; i++) {
    const a = rot + (i * 2 * Math.PI) / n;
    p.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]);
  }
  return p;
}

export const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 -${r} ${r}h-${w - 2 * r}a${r} ${r} 0 0 1 -${r} -${r}v-${h - 2 * r}a${r} ${r} 0 0 1 ${r} -${r}z`;

export function gearPts(cx: number, cy: number, R: number, r: number, n: number): Point[] {
  const p: Point[] = [];
  const s = (2 * Math.PI) / n;
  for (let i = 0; i < n; i++) {
    const a = i * s - Math.PI / 2;
    for (const [rad, k] of [[r, -0.42], [R, -0.24], [R, 0.24], [r, 0.42]]) {
      p.push([cx + Math.cos(a + k * s) * rad, cy + Math.sin(a + k * s) * rad]);
    }
  }
  return p;
}

export const ring = (cx: number, cy: number, R: number, r: number) =>
  `M${cx - R} ${cy}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 -${2 * R} 0zM${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 -${2 * r} 0z`;

export const xf = (markup: string, transform: string) =>
  markup.replace(/<(\w+)(?![^>]*\btransform=)/g, `<$1 transform="${transform}"`);

export const rot = (deg: number) => `rotate(${deg} 32 32)`;
export const MIRROR = "matrix(-1 0 0 1 64 0)";

export const S = (w: number, cap = "round") =>
  `fill="none" stroke="{c}" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="round"`;

export const W = (w: number) =>
  `fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
