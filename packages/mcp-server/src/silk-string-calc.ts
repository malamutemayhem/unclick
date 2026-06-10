export type SilkStringType = "raw_silk" | "twisted_silk" | "wound_silk" | "lacquered" | "metal_wound";

export function tensileStrengthMpa(type: SilkStringType): number {
  const t: Record<SilkStringType, number> = {
    raw_silk: 400, twisted_silk: 450, wound_silk: 500, lacquered: 420, metal_wound: 600,
  };
  return t[type];
}

export function toneClarity(type: SilkStringType): number {
  const c: Record<SilkStringType, number> = {
    raw_silk: 6, twisted_silk: 8, wound_silk: 7, lacquered: 9, metal_wound: 5,
  };
  return c[type];
}

export function sustainSeconds(type: SilkStringType): number {
  const s: Record<SilkStringType, number> = {
    raw_silk: 3, twisted_silk: 5, wound_silk: 6, lacquered: 7, metal_wound: 8,
  };
  return s[type];
}

export function volumeLevel(type: SilkStringType): number {
  const v: Record<SilkStringType, number> = {
    raw_silk: 3, twisted_silk: 5, wound_silk: 6, lacquered: 4, metal_wound: 8,
  };
  return v[type];
}

export function humiditySensitive(type: SilkStringType): boolean {
  return type !== "lacquered" && type !== "metal_wound";
}

export function lifespanMonths(type: SilkStringType): number {
  const l: Record<SilkStringType, number> = {
    raw_silk: 2, twisted_silk: 4, wound_silk: 6, lacquered: 8, metal_wound: 12,
  };
  return l[type];
}

export function bestForInstrument(type: SilkStringType): string {
  const b: Record<SilkStringType, string> = {
    raw_silk: "guqin", twisted_silk: "pipa", wound_silk: "erhu",
    lacquered: "koto", metal_wound: "guzheng",
  };
  return b[type];
}

export function strandCount(type: SilkStringType): number {
  const s: Record<SilkStringType, number> = {
    raw_silk: 20, twisted_silk: 40, wound_silk: 60, lacquered: 30, metal_wound: 50,
  };
  return s[type];
}

export function costPerMeter(type: SilkStringType): number {
  const c: Record<SilkStringType, number> = {
    raw_silk: 8, twisted_silk: 15, wound_silk: 20, lacquered: 25, metal_wound: 30,
  };
  return c[type];
}

export function silkStringTypes(): SilkStringType[] {
  return ["raw_silk", "twisted_silk", "wound_silk", "lacquered", "metal_wound"];
}
