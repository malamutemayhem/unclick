export type RakuStyle = "western" | "obvara" | "horsehair" | "naked_raku" | "saggar";

export function peakTempCelsius(style: RakuStyle): number {
  const t: Record<RakuStyle, number> = {
    western: 1000, obvara: 900, horsehair: 800, naked_raku: 950, saggar: 1050,
  };
  return t[style];
}

export function reductionTimeMinutes(style: RakuStyle): number {
  const m: Record<RakuStyle, number> = {
    western: 20, obvara: 0, horsehair: 0, naked_raku: 15, saggar: 30,
  };
  return m[style];
}

export function crackleEffect(style: RakuStyle): number {
  const c: Record<RakuStyle, number> = {
    western: 8, obvara: 5, horsehair: 2, naked_raku: 10, saggar: 3,
  };
  return c[style];
}

export function smokeMarking(style: RakuStyle): number {
  const s: Record<RakuStyle, number> = {
    western: 7, obvara: 4, horsehair: 9, naked_raku: 6, saggar: 8,
  };
  return s[style];
}

export function glazeRequired(style: RakuStyle): boolean {
  return style === "western" || style === "naked_raku";
}

export function thermalShockRisk(style: RakuStyle): number {
  const r: Record<RakuStyle, number> = {
    western: 8, obvara: 7, horsehair: 5, naked_raku: 9, saggar: 4,
  };
  return r[style];
}

export function colorPalette(style: RakuStyle): string {
  const c: Record<RakuStyle, string> = {
    western: "metallic_lusters", obvara: "earth_tones", horsehair: "black_lines",
    naked_raku: "smoke_patterns", saggar: "warm_spectrum",
  };
  return c[style];
}

export function functionalUse(style: RakuStyle): boolean {
  return false;
}

export function costPerFiring(style: RakuStyle): number {
  const c: Record<RakuStyle, number> = {
    western: 15, obvara: 10, horsehair: 8, naked_raku: 18, saggar: 20,
  };
  return c[style];
}

export function rakuStyles(): RakuStyle[] {
  return ["western", "obvara", "horsehair", "naked_raku", "saggar"];
}
