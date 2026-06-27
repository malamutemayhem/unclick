export type DyeingMethod = "immersion" | "tie_dye" | "batik" | "shibori" | "screen_print";

export function colorPenetration(dye: DyeingMethod): number {
  const m: Record<DyeingMethod, number> = {
    immersion: 10, tie_dye: 6, batik: 7, shibori: 5, screen_print: 3,
  };
  return m[dye];
}

export function patternControl(dye: DyeingMethod): number {
  const m: Record<DyeingMethod, number> = {
    immersion: 1, tie_dye: 4, batik: 8, shibori: 6, screen_print: 10,
  };
  return m[dye];
}

export function colorfastness(dye: DyeingMethod): number {
  const m: Record<DyeingMethod, number> = {
    immersion: 9, tie_dye: 6, batik: 8, shibori: 7, screen_print: 8,
  };
  return m[dye];
}

export function skillRequired(dye: DyeingMethod): number {
  const m: Record<DyeingMethod, number> = {
    immersion: 3, tie_dye: 2, batik: 8, shibori: 7, screen_print: 6,
  };
  return m[dye];
}

export function batchSize(dye: DyeingMethod): number {
  const m: Record<DyeingMethod, number> = {
    immersion: 10, tie_dye: 5, batik: 3, shibori: 4, screen_print: 8,
  };
  return m[dye];
}

export function usesWax(dye: DyeingMethod): boolean {
  const m: Record<DyeingMethod, boolean> = {
    immersion: false, tie_dye: false, batik: true, shibori: false, screen_print: false,
  };
  return m[dye];
}

export function resistTechnique(dye: DyeingMethod): boolean {
  const m: Record<DyeingMethod, boolean> = {
    immersion: false, tie_dye: true, batik: true, shibori: true, screen_print: false,
  };
  return m[dye];
}

export function culturalOrigin(dye: DyeingMethod): string {
  const m: Record<DyeingMethod, string> = {
    immersion: "universal", tie_dye: "west_africa", batik: "indonesia",
    shibori: "japan", screen_print: "china",
  };
  return m[dye];
}

export function waterUsageLiters(dye: DyeingMethod): number {
  const m: Record<DyeingMethod, number> = {
    immersion: 50, tie_dye: 30, batik: 20, shibori: 25, screen_print: 5,
  };
  return m[dye];
}

export function dyeingMethods(): DyeingMethod[] {
  return ["immersion", "tie_dye", "batik", "shibori", "screen_print"];
}
