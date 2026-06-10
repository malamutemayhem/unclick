export type ZigguratType = "sumerian" | "babylonian" | "assyrian" | "elamite" | "neo_babylonian";

export function heightMeters(zig: ZigguratType): number {
  const m: Record<ZigguratType, number> = {
    sumerian: 20, babylonian: 50, assyrian: 30, elamite: 25, neo_babylonian: 90,
  };
  return m[zig];
}

export function terraceCount(zig: ZigguratType): number {
  const m: Record<ZigguratType, number> = {
    sumerian: 3, babylonian: 7, assyrian: 4, elamite: 4, neo_babylonian: 7,
  };
  return m[zig];
}

export function baseLengthMeters(zig: ZigguratType): number {
  const m: Record<ZigguratType, number> = {
    sumerian: 60, babylonian: 90, assyrian: 70, elamite: 100, neo_babylonian: 90,
  };
  return m[zig];
}

export function brickCount(zig: ZigguratType): number {
  const m: Record<ZigguratType, number> = {
    sumerian: 4, babylonian: 8, assyrian: 6, elamite: 7, neo_babylonian: 10,
  };
  return m[zig];
}

export function astronomicalAlignment(zig: ZigguratType): number {
  const m: Record<ZigguratType, number> = {
    sumerian: 6, babylonian: 9, assyrian: 5, elamite: 4, neo_babylonian: 10,
  };
  return m[zig];
}

export function mudbrickConstruction(zig: ZigguratType): boolean {
  const m: Record<ZigguratType, boolean> = {
    sumerian: true, babylonian: true, assyrian: true, elamite: false, neo_babylonian: true,
  };
  return m[zig];
}

export function glazedBrickFacade(zig: ZigguratType): boolean {
  const m: Record<ZigguratType, boolean> = {
    sumerian: false, babylonian: true, assyrian: false, elamite: true, neo_babylonian: true,
  };
  return m[zig];
}

export function dedicatedDeity(zig: ZigguratType): string {
  const m: Record<ZigguratType, string> = {
    sumerian: "nanna", babylonian: "marduk", assyrian: "ashur",
    elamite: "inshushinak", neo_babylonian: "marduk",
  };
  return m[zig];
}

export function preservationState(zig: ZigguratType): number {
  const m: Record<ZigguratType, number> = {
    sumerian: 4, babylonian: 3, assyrian: 5, elamite: 7, neo_babylonian: 2,
  };
  return m[zig];
}

export function zigguratTypes(): ZigguratType[] {
  return ["sumerian", "babylonian", "assyrian", "elamite", "neo_babylonian"];
}
