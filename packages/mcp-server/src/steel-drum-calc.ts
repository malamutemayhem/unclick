export type SteelDrumType = "tenor_pan" | "double_tenor" | "guitar_pan" | "cello_pan" | "bass_pan";

export function noteCount(drum: SteelDrumType): number {
  const n: Record<SteelDrumType, number> = {
    tenor_pan: 29, double_tenor: 26, guitar_pan: 20, cello_pan: 14, bass_pan: 6,
  };
  return n[drum];
}

export function diameterCm(drum: SteelDrumType): number {
  const d: Record<SteelDrumType, number> = {
    tenor_pan: 58, double_tenor: 58, guitar_pan: 58, cello_pan: 58, bass_pan: 58,
  };
  return d[drum];
}

export function skirtLengthCm(drum: SteelDrumType): number {
  const s: Record<SteelDrumType, number> = {
    tenor_pan: 15, double_tenor: 25, guitar_pan: 35, cello_pan: 50, bass_pan: 75,
  };
  return s[drum];
}

export function rangeOctaves(drum: SteelDrumType): number {
  const r: Record<SteelDrumType, number> = {
    tenor_pan: 2.5, double_tenor: 2.0, guitar_pan: 1.5, cello_pan: 1.2, bass_pan: 1.0,
  };
  return r[drum];
}

export function tuningDifficulty(drum: SteelDrumType): number {
  const t: Record<SteelDrumType, number> = {
    tenor_pan: 9, double_tenor: 8, guitar_pan: 7, cello_pan: 6, bass_pan: 5,
  };
  return t[drum];
}

export function volumeLevel(drum: SteelDrumType): number {
  const v: Record<SteelDrumType, number> = {
    tenor_pan: 6, double_tenor: 7, guitar_pan: 7, cello_pan: 8, bass_pan: 9,
  };
  return v[drum];
}

export function panCount(drum: SteelDrumType): number {
  const p: Record<SteelDrumType, number> = {
    tenor_pan: 1, double_tenor: 2, guitar_pan: 2, cello_pan: 3, bass_pan: 6,
  };
  return p[drum];
}

export function melodicRole(drum: SteelDrumType): string {
  const r: Record<SteelDrumType, string> = {
    tenor_pan: "melody", double_tenor: "harmony", guitar_pan: "strumming",
    cello_pan: "counter_melody", bass_pan: "bass_line",
  };
  return r[drum];
}

export function costEstimate(drum: SteelDrumType): number {
  const c: Record<SteelDrumType, number> = {
    tenor_pan: 1500, double_tenor: 2500, guitar_pan: 2000, cello_pan: 3000, bass_pan: 5000,
  };
  return c[drum];
}

export function steelDrumTypes(): SteelDrumType[] {
  return ["tenor_pan", "double_tenor", "guitar_pan", "cello_pan", "bass_pan"];
}
