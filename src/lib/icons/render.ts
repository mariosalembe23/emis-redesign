export type FillMode = "solid" | "grad";

export interface IconStyle {
  mode: FillMode;
  c1: string;
  c2: string;
  blur: number;
  tint: number;
}

interface Shapes {
  name: string;
  back: string;
  front: string;
  det?: string;
}

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
export const isHex = (h: string) => HEX.test(h);

const hex2rgb = (h: string) => {
  let s = h.replace("#", "");
  if (s.length === 3) s = s.split("").map((x) => x + x).join("");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
};
const rgb2hex = (a: number[]) =>
  "#" +
  a
    .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

export const luminance = (h: string) => {
  const [r, g, b] = hex2rgb(h);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

export const mix = (a: string, b: string, t: number) => {
  const A = hex2rgb(a);
  const B = hex2rgb(b);
  return rgb2hex(A.map((v, i) => v + (B[i] - v) * t));
};

export function renderIcon(icon: Shapes, s: IconStyle, id: string, size?: number): string {
  const grad = s.mode === "grad";
  const paint = grad ? `url(#${id}-g)` : s.c1;
  const base = grad ? mix(s.c1, s.c2, 0.5) : s.c1;
  const tint = mix("#FFFFFF", base, s.tint);
  const back = icon.back.replaceAll("{c}", paint);
  const det = icon.det?.replaceAll("{c}", paint);
  const defs =
    (grad
      ? `<linearGradient id="${id}-g" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${s.c1}"/><stop offset=".5" stop-color="${mix(base, "#FFFFFF", 0.4)}"/><stop offset="1" stop-color="${s.c2}"/></linearGradient>`
      : "") +
    `<filter id="${id}-b" filterUnits="userSpaceOnUse" x="-16" y="-16" width="96" height="96"><feGaussianBlur stdDeviation="${s.blur}"/></filter>` +
    `<clipPath id="${id}-c">${icon.front}</clipPath>`;
  const sz = size ? ` width="${size}" height="${size}"` : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${sz} fill="none">` +
    `<defs>${defs}</defs>` +
    `<g fill="${paint}">${back}</g>` +
    `<g clip-path="url(#${id}-c)"><rect width="64" height="64" fill="${tint}"/>` +
    `<g fill="${paint}" filter="url(#${id}-b)" opacity=".9">${back}</g>` +
    `<rect width="64" height="64" fill="#FFFFFF" fill-opacity=".12"/></g>` +
    `<g fill="none" stroke="#FFFFFF" stroke-opacity=".6" stroke-width=".7">${icon.front}</g>` +
    (det ? `<g fill="#FFFFFF">${det}</g>` : "") +
    `</svg>`
  );
}

export const exportIcon = (icon: Shapes, s: IconStyle, size?: number) =>
  renderIcon(icon, s, `glassius-${icon.name}`, size);
