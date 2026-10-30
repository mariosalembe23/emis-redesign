import type { IconStyle } from "./render";

export interface Preset extends Omit<IconStyle, "blur"> {
  name: string;
}

export const PRESETS: Preset[] = [
  { name: "Cobalto", mode: "solid", c1: "#0A3CFF", c2: "#7B2FF7", tint: 0.3 },
  { name: "Azul violeta", mode: "grad", c1: "#0A3CFF", c2: "#8A1FE8", tint: 0.2 },
  { name: "Esmeralda", mode: "solid", c1: "#00A36C", c2: "#00C2D1", tint: 0.28 },
  { name: "Coral", mode: "solid", c1: "#FF4B3E", c2: "#FFB020", tint: 0.3 },
  { name: "Grafite", mode: "solid", c1: "#151A2C", c2: "#4A5578", tint: 0.2 },
];

export const DEFAULT_STYLE: IconStyle = {
  mode: "solid",
  c1: "#0A3CFF",
  c2: "#7B2FF7",
  blur: 3.2,
  tint: 0.3,
};

export const isPresetActive = (p: Preset, s: IconStyle) =>
  p.mode === s.mode &&
  p.c1.toUpperCase() === s.c1.toUpperCase() &&
  (p.mode === "solid" || p.c2.toUpperCase() === s.c2.toUpperCase());
