export type NibGrind = "round" | "italic" | "stub" | "oblique" | "architect" | "zoom";
export type FillingSystem = "piston" | "converter" | "cartridge" | "eyedropper" | "vacuum" | "lever";

export function nibWidthMm(size: "ef" | "f" | "m" | "b" | "bb"): number {
  const widths: Record<string, number> = { ef: 0.3, f: 0.5, m: 0.7, b: 1.0, bb: 1.4 };
  return widths[size];
}

export function lineWidthMm(nibMm: number, inkWetness: "dry" | "normal" | "wet"): number {
  const factor: Record<string, number> = { dry: 0.8, normal: 1.0, wet: 1.2 };
  return parseFloat((nibMm * factor[inkWetness]).toFixed(2));
}

export function inkCapacity(system: FillingSystem): number {
  const ml: Record<FillingSystem, number> = {
    piston: 1.4, converter: 0.7, cartridge: 0.9, eyedropper: 3.0, vacuum: 2.0, lever: 1.2,
  };
  return ml[system];
}

export function pagesPerFill(capacityMl: number, mlPerPage: number = 0.02): number {
  return Math.floor(capacityMl / mlPerPage);
}

export function writingDistanceM(capacityMl: number, lineWidthMm: number): number {
  return parseFloat((capacityMl * 1000 / lineWidthMm).toFixed(0));
}

export function dryingTimeSec(inkType: "dye" | "pigmented" | "iron_gall"): number {
  const secs: Record<string, number> = { dye: 10, pigmented: 30, iron_gall: 15 };
  return secs[inkType];
}

export function sheenVisibility(paperGsm: number, inkSheening: boolean): string {
  if (!inkSheening) return "none";
  if (paperGsm >= 80) return "strong";
  if (paperGsm >= 60) return "moderate";
  return "faint";
}

export function feedChannels(nibWidthMm: number): number {
  if (nibWidthMm < 0.5) return 1;
  if (nibWidthMm < 1.0) return 2;
  return 3;
}

export function cleaningInterval(inkType: "dye" | "pigmented" | "iron_gall"): number {
  const weeks: Record<string, number> = { dye: 8, pigmented: 4, iron_gall: 2 };
  return weeks[inkType];
}

export function nibTuning(sweetSpot: "narrow" | "medium" | "wide"): string {
  const advice: Record<string, string> = {
    narrow: "check tine alignment and gap",
    medium: "standard tuning, check flow",
    wide: "likely needs smoothing on micromesh",
  };
  return advice[sweetSpot];
}

export function inkCostPerPage(bottleMl: number, bottlePrice: number, mlPerPage: number = 0.02): number {
  return parseFloat((bottlePrice / (bottleMl / mlPerPage)).toFixed(4));
}

export function paperBleedRisk(gsm: number, sizing: "well" | "moderate" | "none"): string {
  if (sizing === "well" && gsm >= 80) return "low";
  if (sizing === "none" || gsm < 60) return "high";
  return "medium";
}

export function nibGrinds(): NibGrind[] {
  return ["round", "italic", "stub", "oblique", "architect", "zoom"];
}

export function fillingSystems(): FillingSystem[] {
  return ["piston", "converter", "cartridge", "eyedropper", "vacuum", "lever"];
}
