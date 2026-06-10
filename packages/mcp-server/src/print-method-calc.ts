export type PrintMethod = "offset" | "digital" | "screen" | "letterpress" | "flexography";

export function qualityScore(p: PrintMethod): number {
  const m: Record<PrintMethod, number> = {
    offset: 9, digital: 7, screen: 6, letterpress: 10, flexography: 5,
  };
  return m[p];
}

export function setupCost(p: PrintMethod): number {
  const m: Record<PrintMethod, number> = {
    offset: 8, digital: 2, screen: 5, letterpress: 9, flexography: 7,
  };
  return m[p];
}

export function perUnitCostLargeRun(p: PrintMethod): number {
  const m: Record<PrintMethod, number> = {
    offset: 2, digital: 6, screen: 4, letterpress: 8, flexography: 1,
  };
  return m[p];
}

export function colorAccuracy(p: PrintMethod): number {
  const m: Record<PrintMethod, number> = {
    offset: 9, digital: 8, screen: 6, letterpress: 7, flexography: 5,
  };
  return m[p];
}

export function speedPagesPerHour(p: PrintMethod): number {
  const m: Record<PrintMethod, number> = {
    offset: 9, digital: 7, screen: 3, letterpress: 2, flexography: 10,
  };
  return m[p];
}

export function variableDataCapable(p: PrintMethod): boolean {
  const m: Record<PrintMethod, boolean> = {
    offset: false, digital: true, screen: false, letterpress: false, flexography: false,
  };
  return m[p];
}

export function tactiletexture(p: PrintMethod): boolean {
  const m: Record<PrintMethod, boolean> = {
    offset: false, digital: false, screen: true, letterpress: true, flexography: false,
  };
  return m[p];
}

export function bestApplication(p: PrintMethod): string {
  const m: Record<PrintMethod, string> = {
    offset: "books_magazines", digital: "short_run_personalized",
    screen: "apparel_signage", letterpress: "stationery_art_prints",
    flexography: "packaging_labels",
  };
  return m[p];
}

export function inkSystem(p: PrintMethod): string {
  const m: Record<PrintMethod, string> = {
    offset: "oil_based_cmyk", digital: "toner_inkjet",
    screen: "thick_specialty", letterpress: "oil_based_relief",
    flexography: "water_solvent_uv",
  };
  return m[p];
}

export function printMethods(): PrintMethod[] {
  return ["offset", "digital", "screen", "letterpress", "flexography"];
}
