export type CuckooStyle = "traditional" | "chalet" | "modern" | "quartz" | "musical";

export function pendulumLength(beatSeconds: number): number {
  return parseFloat((beatSeconds * beatSeconds * 248.5).toFixed(1));
}

export function chainDropCm(runHours: number): number {
  return parseFloat((runHours * 2.5).toFixed(1));
}

export function cuckoosPerDay(): number {
  let total = 0;
  for (let h = 1; h <= 12; h++) {
    total += h * 2;
  }
  return total;
}

export function bellowsPressurePa(weightG: number, areaCm2: number): number {
  if (areaCm2 <= 0) return 0;
  return parseFloat(((weightG * 9.81) / (areaCm2 * 0.0001) / 1000).toFixed(1));
}

export function gearTrainRatio(minuteTeeth: number, hourTeeth: number): number {
  if (minuteTeeth <= 0) return 0;
  return parseFloat((hourTeeth / minuteTeeth).toFixed(2));
}

export function weightMassKg(runDays: number): number {
  return parseFloat((0.5 + runDays * 0.3).toFixed(1));
}

export function carvingComplexity(figures: number, movingParts: number): number {
  return figures * 10 + movingParts * 15;
}

export function musicDuration(notesCount: number, bpm: number): number {
  if (bpm <= 0) return 0;
  return parseFloat(((notesCount / bpm) * 60).toFixed(1));
}

export function maintenanceYears(style: CuckooStyle): number {
  const years: Record<CuckooStyle, number> = {
    traditional: 5, chalet: 5, modern: 7, quartz: 10, musical: 3,
  };
  return years[style];
}

export function nightShutoff(hourStart: number, hourEnd: number): number {
  if (hourEnd > hourStart) return hourEnd - hourStart;
  return 24 - hourStart + hourEnd;
}

export function cuckooStyles(): CuckooStyle[] {
  return ["traditional", "chalet", "modern", "quartz", "musical"];
}
