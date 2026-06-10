export type WeldType = "fagot" | "scarf" | "jump" | "split" | "chain";

export function weldTemperatureCelsius(material: "mild_steel" | "high_carbon" | "wrought_iron"): number {
  const temps: Record<string, number> = { mild_steel: 1300, high_carbon: 1150, wrought_iron: 1400 };
  return temps[material];
}

export function overlapLengthMm(stockThicknessMm: number, type: WeldType): number {
  const mult: Record<WeldType, number> = {
    fagot: 2.0, scarf: 1.5, jump: 0, split: 1.0, chain: 3.0,
  };
  return parseFloat((stockThicknessMm * mult[type]).toFixed(1));
}

export function heatsRequired(type: WeldType): number {
  const heats: Record<WeldType, number> = {
    fagot: 2, scarf: 1, jump: 3, split: 2, chain: 2,
  };
  return heats[type];
}

export function fluxWeightG(weldAreaCm2: number): number {
  return parseFloat((weldAreaCm2 * 0.5).toFixed(1));
}

export function hammerBlowsPerWeld(type: WeldType): number {
  const blows: Record<WeldType, number> = {
    fagot: 20, scarf: 12, jump: 30, split: 15, chain: 25,
  };
  return blows[type];
}

export function strengthRetentionPercent(type: WeldType): number {
  const retention: Record<WeldType, number> = {
    fagot: 70, scarf: 85, jump: 60, split: 75, chain: 65,
  };
  return retention[type];
}

export function timeAtWeldTempSeconds(): number {
  return 3;
}

export function soakTimeMinutes(stockThicknessMm: number): number {
  return Math.round(stockThicknessMm * 0.5 + 2);
}

export function scaleFormationPercent(heatsCount: number): number {
  return parseFloat((heatsCount * 2.5).toFixed(1));
}

export function weldTypes(): WeldType[] {
  return ["fagot", "scarf", "jump", "split", "chain"];
}
