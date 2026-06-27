export type PrintmakingType = "woodcut" | "etching" | "lithography" | "screen_print" | "linocut";

export function editionSize(p: PrintmakingType): number {
  const m: Record<PrintmakingType, number> = {
    woodcut: 200, etching: 100, lithography: 500, screen_print: 1000, linocut: 150,
  };
  return m[p];
}

export function detailFineness(p: PrintmakingType): number {
  const m: Record<PrintmakingType, number> = {
    woodcut: 5, etching: 10, lithography: 8, screen_print: 6, linocut: 4,
  };
  return m[p];
}

export function colorLayering(p: PrintmakingType): number {
  const m: Record<PrintmakingType, number> = {
    woodcut: 4, etching: 3, lithography: 8, screen_print: 10, linocut: 5,
  };
  return m[p];
}

export function setupComplexity(p: PrintmakingType): number {
  const m: Record<PrintmakingType, number> = {
    woodcut: 4, etching: 9, lithography: 8, screen_print: 6, linocut: 3,
  };
  return m[p];
}

export function reproducibility(p: PrintmakingType): number {
  const m: Record<PrintmakingType, number> = {
    woodcut: 6, etching: 4, lithography: 8, screen_print: 10, linocut: 5,
  };
  return m[p];
}

export function reliefProcess(p: PrintmakingType): boolean {
  const m: Record<PrintmakingType, boolean> = {
    woodcut: true, etching: false, lithography: false, screen_print: false, linocut: true,
  };
  return m[p];
}

export function usesAcid(p: PrintmakingType): boolean {
  const m: Record<PrintmakingType, boolean> = {
    woodcut: false, etching: true, lithography: false, screen_print: false, linocut: false,
  };
  return m[p];
}

export function surfaceMaterial(p: PrintmakingType): string {
  const m: Record<PrintmakingType, string> = {
    woodcut: "wood_block", etching: "metal_plate",
    lithography: "limestone", screen_print: "mesh_screen",
    linocut: "linoleum",
  };
  return m[p];
}

export function famousPractitioner(p: PrintmakingType): string {
  const m: Record<PrintmakingType, string> = {
    woodcut: "durer", etching: "rembrandt",
    lithography: "toulouse_lautrec", screen_print: "warhol",
    linocut: "picasso",
  };
  return m[p];
}

export function printmakingTypes(): PrintmakingType[] {
  return ["woodcut", "etching", "lithography", "screen_print", "linocut"];
}
