export type EndpaperStyle = "paste_down" | "tipped_in" | "sewn_on" | "cloth_joint" | "decorative_fold";

export function adhesiveRequired(style: EndpaperStyle): boolean {
  return style === "paste_down" || style === "tipped_in";
}

export function attachmentStrength(style: EndpaperStyle): number {
  const s: Record<EndpaperStyle, number> = {
    paste_down: 8, tipped_in: 4, sewn_on: 9, cloth_joint: 10, decorative_fold: 6,
  };
  return s[style];
}

export function flexibilityRating(style: EndpaperStyle): number {
  const f: Record<EndpaperStyle, number> = {
    paste_down: 4, tipped_in: 7, sewn_on: 8, cloth_joint: 9, decorative_fold: 6,
  };
  return f[style];
}

export function repairability(style: EndpaperStyle): number {
  const r: Record<EndpaperStyle, number> = {
    paste_down: 6, tipped_in: 9, sewn_on: 5, cloth_joint: 4, decorative_fold: 7,
  };
  return r[style];
}

export function materialLayers(style: EndpaperStyle): number {
  const l: Record<EndpaperStyle, number> = {
    paste_down: 2, tipped_in: 1, sewn_on: 2, cloth_joint: 3, decorative_fold: 2,
  };
  return l[style];
}

export function decorativeOpportunity(style: EndpaperStyle): number {
  const d: Record<EndpaperStyle, number> = {
    paste_down: 8, tipped_in: 6, sewn_on: 5, cloth_joint: 4, decorative_fold: 9,
  };
  return d[style];
}

export function timePerBookMinutes(style: EndpaperStyle): number {
  const t: Record<EndpaperStyle, number> = {
    paste_down: 10, tipped_in: 5, sewn_on: 15, cloth_joint: 20, decorative_fold: 12,
  };
  return t[style];
}

export function skillLevel(style: EndpaperStyle): number {
  const s: Record<EndpaperStyle, number> = {
    paste_down: 3, tipped_in: 2, sewn_on: 6, cloth_joint: 7, decorative_fold: 5,
  };
  return s[style];
}

export function costPerBook(style: EndpaperStyle): number {
  const c: Record<EndpaperStyle, number> = {
    paste_down: 2, tipped_in: 1, sewn_on: 3, cloth_joint: 5, decorative_fold: 4,
  };
  return c[style];
}

export function endpaperStyles(): EndpaperStyle[] {
  return ["paste_down", "tipped_in", "sewn_on", "cloth_joint", "decorative_fold"];
}
