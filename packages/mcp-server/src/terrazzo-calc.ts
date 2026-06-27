export type AggregateType = "marble" | "granite" | "glass" | "mother_of_pearl" | "brass" | "quartz";
export type FinishType = "polished" | "honed" | "rustic" | "ground";

export function slabArea(lengthCm: number, widthCm: number): number {
  return parseFloat((lengthCm * widthCm / 10000).toFixed(2));
}

export function slabWeight(areaM2: number, thicknessCm: number, densityKgPerM3: number = 2400): number {
  return parseFloat((areaM2 * (thicknessCm / 100) * densityKgPerM3).toFixed(1));
}

export function aggregateRatio(style: "venetian" | "palladiana" | "standard"): number {
  const ratios: Record<string, number> = { venetian: 0.75, palladiana: 0.6, standard: 0.7 };
  return ratios[style];
}

export function cementAmount(areaM2: number, thicknessCm: number, aggregateRatioVal: number): number {
  const totalVolume = areaM2 * thicknessCm / 100;
  return parseFloat((totalVolume * (1 - aggregateRatioVal) * 1500).toFixed(1));
}

export function aggregateAmount(areaM2: number, thicknessCm: number, aggregateRatioVal: number): number {
  const totalVolume = areaM2 * thicknessCm / 100;
  return parseFloat((totalVolume * aggregateRatioVal * 2600).toFixed(1));
}

export function chipSize(aggregate: AggregateType): string {
  const sizes: Record<AggregateType, string> = {
    marble: "3-25mm", granite: "5-30mm", glass: "3-15mm",
    mother_of_pearl: "5-20mm", brass: "2-10mm", quartz: "3-20mm",
  };
  return sizes[aggregate];
}

export function grindingPasses(finish: FinishType): number {
  const passes: Record<FinishType, number> = {
    polished: 6, honed: 4, rustic: 2, ground: 3,
  };
  return passes[finish];
}

export function grindingGrit(pass: number, totalPasses: number): number {
  const grits = [30, 60, 120, 220, 400, 800];
  const index = Math.min(pass - 1, grits.length - 1);
  return grits[index];
}

export function curingDays(thicknessCm: number): number {
  return Math.max(7, Math.round(thicknessCm * 3.5));
}

export function dividerStripLength(areaM2: number, panelSizeM: number): number {
  const panels = Math.ceil(Math.sqrt(areaM2) / panelSizeM);
  return parseFloat((panels * Math.sqrt(areaM2) * 2).toFixed(1));
}

export function sealerAmount(areaM2: number, coats: number = 2): number {
  return parseFloat((areaM2 * 0.15 * coats).toFixed(1));
}

export function costPerSqM(aggregate: AggregateType): number {
  const costs: Record<AggregateType, number> = {
    marble: 120, granite: 100, glass: 150, mother_of_pearl: 250, brass: 200, quartz: 90,
  };
  return costs[aggregate];
}

export function aggregateTypes(): AggregateType[] {
  return ["marble", "granite", "glass", "mother_of_pearl", "brass", "quartz"];
}
