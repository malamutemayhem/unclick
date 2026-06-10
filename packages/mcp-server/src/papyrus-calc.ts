export type PapyrusGrade = "fine" | "standard" | "coarse" | "double_layer" | "palimpsest";

export function stripWidthMm(grade: PapyrusGrade): number {
  const widths: Record<PapyrusGrade, number> = {
    fine: 2, standard: 4, coarse: 8, double_layer: 4, palimpsest: 3,
  };
  return widths[grade];
}

export function soakingTimeHours(grade: PapyrusGrade): number {
  const hours: Record<PapyrusGrade, number> = {
    fine: 6, standard: 4, coarse: 2, double_layer: 4, palimpsest: 5,
  };
  return hours[grade];
}

export function pressingDays(grade: PapyrusGrade): number {
  const days: Record<PapyrusGrade, number> = {
    fine: 7, standard: 5, coarse: 3, double_layer: 6, palimpsest: 5,
  };
  return days[grade];
}

export function pressureKgPerM2(grade: PapyrusGrade): number {
  const pressure: Record<PapyrusGrade, number> = {
    fine: 500, standard: 400, coarse: 300, double_layer: 450, palimpsest: 350,
  };
  return pressure[grade];
}

export function sheetThicknessMm(grade: PapyrusGrade): number {
  const thick: Record<PapyrusGrade, number> = {
    fine: 0.3, standard: 0.5, coarse: 0.8, double_layer: 1.0, palimpsest: 0.4,
  };
  return thick[grade];
}

export function writingSurface(grade: PapyrusGrade): number {
  const quality: Record<PapyrusGrade, number> = {
    fine: 5, standard: 4, coarse: 2, double_layer: 4, palimpsest: 3,
  };
  return quality[grade];
}

export function durabilityRating(grade: PapyrusGrade): number {
  const dur: Record<PapyrusGrade, number> = {
    fine: 3, standard: 4, coarse: 5, double_layer: 5, palimpsest: 2,
  };
  return dur[grade];
}

export function reusable(grade: PapyrusGrade): boolean {
  return grade === "palimpsest";
}

export function costPerSheet(grade: PapyrusGrade): number {
  const costs: Record<PapyrusGrade, number> = {
    fine: 12, standard: 8, coarse: 5, double_layer: 10, palimpsest: 7,
  };
  return costs[grade];
}

export function papyrusGrades(): PapyrusGrade[] {
  return ["fine", "standard", "coarse", "double_layer", "palimpsest"];
}
