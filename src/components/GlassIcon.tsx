import { useId } from "react";
import {
  ICON_BY_NAME,
  renderIcon,
  type IconStyle,
} from "../lib/icons";

export const GLASS: Record<"navy" | "cyan" | "duo" | "light", IconStyle> = {
  navy: { mode: "solid", c1: "#001862", c2: "#00CCD3", blur: 3.2, tint: 0.22 },
  cyan: { mode: "solid", c1: "#00B8C0", c2: "#001862", blur: 3.2, tint: 0.3 },
  duo: { mode: "grad", c1: "#00CCD3", c2: "#1B3FA8", blur: 3.4, tint: 0.24 },
  light: { mode: "solid", c1: "#FFFFFF", c2: "#D9F7F8", blur: 3, tint: 0.5 },
};

export const GlassIcon = ({
  name,
  size = 24,
  tone = "navy",
  className = "",
}: {
  name: string;
  size?: number;
  tone?: keyof typeof GLASS;
  className?: string;
}) => {
  const id = `g${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const icon = ICON_BY_NAME.get(name);
  if (!icon) return null;
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: renderIcon(icon, GLASS[tone], id) }}
    />
  );
};
