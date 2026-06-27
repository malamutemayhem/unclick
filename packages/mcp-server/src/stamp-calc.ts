export type StampCondition = "mint" | "unused_hinged" | "used_light" | "used_heavy" | "damaged";
export type PrintMethod = "engraved" | "lithograph" | "photogravure" | "offset" | "digital";

export function catalogValue(baseCents: number, condition: StampCondition): number {
  const multipliers: Record<StampCondition, number> = {
    mint: 1.0, unused_hinged: 0.6, used_light: 0.25, used_heavy: 0.1, damaged: 0.02,
  };
  return parseFloat((baseCents * multipliers[condition]).toFixed(0));
}

export function centering(leftMm: number, rightMm: number, topMm: number, bottomMm: number): string {
  const hDiff = Math.abs(leftMm - rightMm);
  const vDiff = Math.abs(topMm - bottomMm);
  const avg = (hDiff + vDiff) / 2;
  if (avg < 0.3) return "superb";
  if (avg < 0.5) return "extremely_fine";
  if (avg < 1.0) return "very_fine";
  if (avg < 2.0) return "fine";
  return "good";
}

export function perforationGauge(holesPerCm: number): number {
  return parseFloat((holesPerCm * 2).toFixed(1));
}

export function watermarkDetection(method: "fluid" | "tray" | "digital"): string {
  const desc: Record<string, string> = {
    fluid: "benzine or lighter fluid on dark tray",
    tray: "backlit watermark tray",
    digital: "high-resolution scan with contrast filter",
  };
  return desc[method];
}

export function albumPages(stampCount: number, perPage: number = 6): number {
  return Math.ceil(stampCount / perPage);
}

export function mountSize(stampWidthMm: number, stampHeightMm: number): { width: number; height: number } {
  return {
    width: stampWidthMm + 3,
    height: stampHeightMm + 3,
  };
}

export function hingeArea(stampHeightMm: number): number {
  return parseFloat((stampHeightMm * 0.3 * 5).toFixed(1));
}

export function plateBlock(rowCount: number, colCount: number): number {
  return rowCount * colCount;
}

export function firstDayCoverValue(baseCents: number, cachet: boolean): number {
  const multiplier = cachet ? 3 : 1.5;
  return parseFloat((baseCents * multiplier).toFixed(0));
}

export function sheetValue(baseCents: number, rows: number, cols: number, condition: StampCondition): number {
  const count = rows * cols;
  const each = catalogValue(baseCents, condition);
  const sheetPremium = condition === "mint" ? 1.15 : 1.0;
  return parseFloat((each * count * sheetPremium).toFixed(0));
}

export function grading(centering: string, gum: "original" | "hinged" | "none", faults: number): number {
  const centerScore: Record<string, number> = {
    superb: 98, extremely_fine: 95, very_fine: 85, fine: 75, good: 65,
  };
  const gumScore: Record<string, number> = { original: 0, hinged: -5, none: -15 };
  return Math.max(0, (centerScore[centering] ?? 50) + gumScore[gum] - faults * 10);
}

export function insuranceValue(catalogCents: number, multiplier: number = 0.7): number {
  return parseFloat((catalogCents * multiplier).toFixed(0));
}

export function printMethods(): PrintMethod[] {
  return ["engraved", "lithograph", "photogravure", "offset", "digital"];
}

export function stampConditions(): StampCondition[] {
  return ["mint", "unused_hinged", "used_light", "used_heavy", "damaged"];
}
