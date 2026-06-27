export type PatinaType = "verdigris" | "rust" | "tarnish" | "wabi_sabi" | "forced";

export function developmentYears(patina: PatinaType): number {
  const m: Record<PatinaType, number> = {
    verdigris: 20, rust: 2, tarnish: 5, wabi_sabi: 30, forced: 0,
  };
  return m[patina];
}

export function protectiveQuality(patina: PatinaType): number {
  const m: Record<PatinaType, number> = {
    verdigris: 9, rust: 1, tarnish: 3, wabi_sabi: 5, forced: 7,
  };
  return m[patina];
}

export function aestheticValue(patina: PatinaType): number {
  const m: Record<PatinaType, number> = {
    verdigris: 9, rust: 4, tarnish: 5, wabi_sabi: 10, forced: 6,
  };
  return m[patina];
}

export function colorRichness(patina: PatinaType): number {
  const m: Record<PatinaType, number> = {
    verdigris: 8, rust: 6, tarnish: 4, wabi_sabi: 7, forced: 5,
  };
  return m[patina];
}

export function reversibility(patina: PatinaType): number {
  const m: Record<PatinaType, number> = {
    verdigris: 3, rust: 7, tarnish: 9, wabi_sabi: 2, forced: 8,
  };
  return m[patina];
}

export function desirable(patina: PatinaType): boolean {
  const m: Record<PatinaType, boolean> = {
    verdigris: true, rust: false, tarnish: false, wabi_sabi: true, forced: true,
  };
  return m[patina];
}

export function naturalProcess(patina: PatinaType): boolean {
  const m: Record<PatinaType, boolean> = {
    verdigris: true, rust: true, tarnish: true, wabi_sabi: true, forced: false,
  };
  return m[patina];
}

export function baseMetal(patina: PatinaType): string {
  const m: Record<PatinaType, string> = {
    verdigris: "copper", rust: "iron", tarnish: "silver",
    wabi_sabi: "bronze", forced: "various",
  };
  return m[patina];
}

export function preservationDifficulty(patina: PatinaType): number {
  const m: Record<PatinaType, number> = {
    verdigris: 4, rust: 8, tarnish: 6, wabi_sabi: 3, forced: 5,
  };
  return m[patina];
}

export function patinaTypes(): PatinaType[] {
  return ["verdigris", "rust", "tarnish", "wabi_sabi", "forced"];
}
