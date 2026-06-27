export type NoteType = "top" | "middle" | "base";
export type Concentration = "parfum" | "edp" | "edt" | "edc" | "body_mist";

export interface PerfumeNote {
  name: string;
  type: NoteType;
  percentOfBlend: number;
}

export interface PerfumeFormula {
  notes: PerfumeNote[];
  concentration: Concentration;
  totalMl: number;
}

export function concentrationRange(type: Concentration): { min: number; max: number } {
  const ranges: Record<Concentration, { min: number; max: number }> = {
    parfum: { min: 20, max: 30 },
    edp: { min: 15, max: 20 },
    edt: { min: 5, max: 15 },
    edc: { min: 2, max: 4 },
    body_mist: { min: 1, max: 3 },
  };
  return ranges[type];
}

export function fragranceOilMl(totalMl: number, concentrationPercent: number): number {
  return parseFloat((totalMl * concentrationPercent / 100).toFixed(2));
}

export function carrierMl(totalMl: number, concentrationPercent: number): number {
  return parseFloat((totalMl * (100 - concentrationPercent) / 100).toFixed(2));
}

export function noteBalance(notes: PerfumeNote[]): { top: number; middle: number; base: number } {
  let top = 0, middle = 0, base = 0;
  for (const n of notes) {
    if (n.type === "top") top += n.percentOfBlend;
    else if (n.type === "middle") middle += n.percentOfBlend;
    else base += n.percentOfBlend;
  }
  return {
    top: parseFloat(top.toFixed(1)),
    middle: parseFloat(middle.toFixed(1)),
    base: parseFloat(base.toFixed(1)),
  };
}

export function idealBalance(): { top: number; middle: number; base: number } {
  return { top: 30, middle: 50, base: 20 };
}

export function noteMlBreakdown(notes: PerfumeNote[], fragranceOilTotal: number): { name: string; ml: number }[] {
  return notes.map(n => ({
    name: n.name,
    ml: parseFloat((fragranceOilTotal * n.percentOfBlend / 100).toFixed(2)),
  }));
}

export function longevityHours(concentration: Concentration): { min: number; max: number } {
  const hours: Record<Concentration, { min: number; max: number }> = {
    parfum: { min: 6, max: 12 },
    edp: { min: 4, max: 8 },
    edt: { min: 2, max: 4 },
    edc: { min: 1, max: 2 },
    body_mist: { min: 0.5, max: 1 },
  };
  return hours[concentration];
}

export function sillageRating(concentrationPercent: number): string {
  if (concentrationPercent >= 20) return "strong";
  if (concentrationPercent >= 10) return "moderate";
  if (concentrationPercent >= 4) return "light";
  return "intimate";
}

export function macerateWeeks(concentration: Concentration): number {
  const weeks: Record<Concentration, number> = {
    parfum: 6,
    edp: 4,
    edt: 3,
    edc: 2,
    body_mist: 1,
  };
  return weeks[concentration];
}

export function dropsToMl(drops: number): number {
  return parseFloat((drops * 0.05).toFixed(2));
}

export function mlToDrops(ml: number): number {
  return Math.round(ml / 0.05);
}

export function dilutionPercent(solute: number, solvent: number): number {
  const total = solute + solvent;
  if (total === 0) return 0;
  return parseFloat((solute / total * 100).toFixed(1));
}

export function batchScale(originalMl: number, targetMl: number, ingredientMl: number): number {
  if (originalMl === 0) return 0;
  return parseFloat((ingredientMl * targetMl / originalMl).toFixed(2));
}

export function costPerMl(ingredients: { ml: number; pricePerMl: number }[]): number {
  let totalCost = 0;
  let totalMl = 0;
  for (const i of ingredients) {
    totalCost += i.ml * i.pricePerMl;
    totalMl += i.ml;
  }
  if (totalMl === 0) return 0;
  return parseFloat((totalCost / totalMl).toFixed(2));
}

export function sprayCount(bottleMl: number, sprayMl: number = 0.1): number {
  return Math.floor(bottleMl / sprayMl);
}

export function concentrations(): Concentration[] {
  return ["parfum", "edp", "edt", "edc", "body_mist"];
}
