import { CATEGORY_OF, type CategoryId } from "./categories";
import { EXTRA_ICONS } from "./extra";
import { EXTRA2_ICONS } from "./extra2";
import { EXTRA3_ICONS } from "./extra3";
import { EXTRA4_ICONS } from "./extra4";
import { EXTRA5_ICONS } from "./extra5";
import { EXTRA6_ICONS } from "./extra6";
import { RAW_ICONS } from "./raw";

export * from "./categories";
export * from "./render";
export * from "./presets";

export interface GlassIcon {
  name: string;
  label: string;
  isNew: boolean;
  tags: string;
  category: CategoryId;
  back: string;
  front: string;
  det?: string;
}

const toLabel = (n: string) => {
  const s = n.replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const NEW = new Set(EXTRA6_ICONS.map((i) => i.n));

export const ICONS: GlassIcon[] = [...RAW_ICONS, ...EXTRA_ICONS, ...EXTRA2_ICONS, ...EXTRA3_ICONS, ...EXTRA4_ICONS, ...EXTRA5_ICONS, ...EXTRA6_ICONS].map((i) => ({
  name: i.n,
  label: toLabel(i.n),
  isNew: NEW.has(i.n),
  tags: i.t,
  category: i.c ?? CATEGORY_OF[i.n] ?? "interface",
  back: i.back,
  front: i.front,
  det: i.det,
}));

export const ICON_BY_NAME = new Map(ICONS.map((i) => [i.name, i]));

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function searchIcons(query: string, category: CategoryId | "todos") {
  const q = norm(query.trim());
  return ICONS.filter(
    (i) =>
      (category === "todos" || i.category === category) &&
      (!q || norm(`${i.name} ${i.tags}`).includes(q)),
  );
}
