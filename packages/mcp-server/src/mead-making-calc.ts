export type MeadStyle = "traditional" | "melomel" | "metheglin" | "cyser" | "braggot";

export function honeyPerLiter(style: MeadStyle): number {
  const h: Record<MeadStyle, number> = {
    traditional: 350, melomel: 300, metheglin: 350, cyser: 250, braggot: 200,
  };
  return h[style];
}

export function fermentationWeeks(style: MeadStyle): number {
  const f: Record<MeadStyle, number> = {
    traditional: 8, melomel: 6, metheglin: 8, cyser: 4, braggot: 3,
  };
  return f[style];
}

export function agingMonths(style: MeadStyle): number {
  const a: Record<MeadStyle, number> = {
    traditional: 12, melomel: 6, metheglin: 9, cyser: 4, braggot: 2,
  };
  return a[style];
}

export function abvPercent(style: MeadStyle): number {
  const a: Record<MeadStyle, number> = {
    traditional: 14, melomel: 12, metheglin: 14, cyser: 10, braggot: 8,
  };
  return a[style];
}

export function additiveRequired(style: MeadStyle): boolean {
  const r: Record<MeadStyle, boolean> = {
    traditional: false, melomel: true, metheglin: true, cyser: true, braggot: true,
  };
  return r[style];
}

export function clarityRating(style: MeadStyle): number {
  const c: Record<MeadStyle, number> = {
    traditional: 9, melomel: 5, metheglin: 7, cyser: 6, braggot: 4,
  };
  return c[style];
}

export function sweetnessLevel(style: MeadStyle): number {
  const s: Record<MeadStyle, number> = {
    traditional: 7, melomel: 6, metheglin: 5, cyser: 8, braggot: 3,
  };
  return s[style];
}

export function keyIngredient(style: MeadStyle): string {
  const k: Record<MeadStyle, string> = {
    traditional: "honey_only", melomel: "fruit", metheglin: "spices",
    cyser: "apple_juice", braggot: "malt",
  };
  return k[style];
}

export function costPerLiter(style: MeadStyle): number {
  const c: Record<MeadStyle, number> = {
    traditional: 15, melomel: 12, metheglin: 16, cyser: 10, braggot: 8,
  };
  return c[style];
}

export function meadStyles(): MeadStyle[] {
  return ["traditional", "melomel", "metheglin", "cyser", "braggot"];
}
