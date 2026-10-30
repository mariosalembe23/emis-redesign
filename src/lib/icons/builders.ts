import type { CategoryId } from "./categories";
import { HEART, rot, roundPoly, starPts, W, xf } from "./geometry";
import type { RawIcon } from "./raw";

type Shapes = Omit<RawIcon, "n" | "t">;

export const MARKS = {
  mais: "M48 42v12M42 48h12",
  menos: "M42 48h12",
  check: "M42.5 48.5l3.8 3.8 7.2-7.6",
  x: "M43.5 43.5l9 9M52.5 43.5l-9 9",
  cima: "M48 54V42M43 47l5-5 5 5",
  baixo: "M48 42v12M43 49l5 5 5-5",
  alerta: "M48 42v6.5M48 53.5v.1",
  relogio: "M48 42.5V48l3.6 2.4",
  busca: "M46.3 41.8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 1 0 0-9zM49.6 49.6L53 53",
  editar: "M43 53l1.2-4.2 6.6-6.6 3 3-6.6 6.6z",
  proibido: "M48 42.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 1 1 0-11zM44.1 51.9l7.8-7.8",
  ponto: "",
  cadeado: "",
  estrela: "",
  coracao: "",
  ia: "",
} as const;
export type Mark = keyof typeof MARKS;

const SOLID_MARKS: Partial<Record<Mark, string>> = {
  ponto: `<circle cx="48" cy="48" r="4.5"/>`,
  cadeado: `<rect x="43.5" y="47" width="9" height="7" rx="1.6"/><path d="M45.6 47v-2a2.4 2.4 0 0 1 4.8 0v2" fill="none" stroke="#fff" stroke-width="1.8"/>`,
  estrela: `<path d="${roundPoly(starPts(48, 48.6, 7, 3, 5), 0.8)}"/>`,
  coracao: `<path transform="translate(42.3 42.3) scale(.48)" d="${HEART}"/>`,
  ia: `<path d="${roundPoly(starPts(48, 48, 7.5, 2.4, 4), 0.8)}"/>`,
};

export function withBadge(b: Shapes, mark: Mark, n: string, t: string, c?: CategoryId): RawIcon {
  const sign = SOLID_MARKS[mark] ?? `<path d="${MARKS[mark]}" ${W(mark === "editar" ? 2.4 : 3.2)}/>`;
  return {
    n, t, c,
    back: b.back,
    front: b.front,
    det: `${b.det ?? ""}<circle cx="48" cy="48" r="12.5" fill="{c}" stroke="#fff" stroke-width="2.5"/>${sign}`,
  };
}

export function withSlash(b: Shapes, n: string, t: string, c?: CategoryId): RawIcon {
  const line = "M9 9l46 46";
  return {
    n, t, c,
    back: b.back,
    front: b.front,
    det: `${b.det ?? ""}<path d="${line}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="${line}" fill="none" stroke="{c}" stroke-width="5" stroke-linecap="round"/>`,
  };
}

export function fit<T extends Shapes>(i: T, k: number): T {
  const t = `translate(32 32) scale(${k}) translate(-32 -32)`;
  const wrap = (m: string) =>
    m.replace(/<(\w+)([^>]*)>/g, (_, tag: string, attrs: string) =>
      attrs.includes('transform="')
        ? `<${tag}${attrs.replace(/transform="([^"]*)"/, `transform="${t} $1"`)}>`
        : `<${tag} transform="${t}"${attrs}>`);
  return { ...i, back: wrap(i.back), front: wrap(i.front), det: i.det && wrap(i.det) };
}

export function turn(i: Shapes, transform: string, n: string, t: string): RawIcon {
  return {
    n, t, c: i.c,
    back: xf(i.back, transform),
    front: xf(i.front, transform),
    det: i.det && xf(i.det, transform),
  };
}

const DIRS = [["direita", 0], ["baixo", 90], ["esquerda", 180], ["cima", 270]] as const;

export const family = (prefix: string, t: string, i: Shapes) =>
  DIRS.map(([d, deg]) => turn(i, rot(deg), `${prefix}-${d}`, `${t} ${d}`));

export const ev = `clip-rule="evenodd"`;
export const doc = `<rect x="10" y="6" width="36" height="52" rx="7"/>`;
export const smile = (mouth: string) =>
  `<circle cx="22" cy="30" r="2.8"/><circle cx="36" cy="30" r="2.8"/>${mouth}`;
export const letterCard = {
  back: `<rect x="24" y="4" width="36" height="36" rx="9"/>`,
  front: `<rect x="4" y="20" width="40" height="40" rx="10"/>`,
};
export const circleCard = {
  back: `<circle cx="47" cy="17" r="10"/>`,
  front: `<circle cx="30" cy="34" r="23"/>`,
};
