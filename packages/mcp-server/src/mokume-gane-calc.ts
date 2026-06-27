export type MokumeCombo = "copper_silver" | "copper_shakudo" | "gold_platinum" | "copper_brass" | "nickel_silver";

export function layerCount(combo: MokumeCombo): number {
  const l: Record<MokumeCombo, number> = {
    copper_silver: 20, copper_shakudo: 30, gold_platinum: 15, copper_brass: 25, nickel_silver: 18,
  };
  return l[combo];
}

export function bondingTempCelsius(combo: MokumeCombo): number {
  const t: Record<MokumeCombo, number> = {
    copper_silver: 780, copper_shakudo: 800, gold_platinum: 1000, copper_brass: 750, nickel_silver: 770,
  };
  return t[combo];
}

export function patternContrast(combo: MokumeCombo): number {
  const c: Record<MokumeCombo, number> = {
    copper_silver: 8, copper_shakudo: 9, gold_platinum: 7, copper_brass: 5, nickel_silver: 6,
  };
  return c[combo];
}

export function carveDepthMm(combo: MokumeCombo): number {
  const d: Record<MokumeCombo, number> = {
    copper_silver: 1.5, copper_shakudo: 2.0, gold_platinum: 1.0, copper_brass: 1.8, nickel_silver: 1.2,
  };
  return d[combo];
}

export function etchingResponse(combo: MokumeCombo): number {
  const e: Record<MokumeCombo, number> = {
    copper_silver: 8, copper_shakudo: 10, gold_platinum: 6, copper_brass: 7, nickel_silver: 5,
  };
  return e[combo];
}

export function delaminationRisk(combo: MokumeCombo): number {
  const r: Record<MokumeCombo, number> = {
    copper_silver: 4, copper_shakudo: 3, gold_platinum: 6, copper_brass: 2, nickel_silver: 5,
  };
  return r[combo];
}

export function traditionalJapanese(combo: MokumeCombo): boolean {
  return combo === "copper_shakudo" || combo === "copper_silver";
}

export function difficultyRating(combo: MokumeCombo): number {
  const d: Record<MokumeCombo, number> = {
    copper_silver: 7, copper_shakudo: 8, gold_platinum: 10, copper_brass: 5, nickel_silver: 6,
  };
  return d[combo];
}

export function costPerSheet(combo: MokumeCombo): number {
  const c: Record<MokumeCombo, number> = {
    copper_silver: 200, copper_shakudo: 350, gold_platinum: 3000, copper_brass: 80, nickel_silver: 100,
  };
  return c[combo];
}

export function mokumeCombos(): MokumeCombo[] {
  return ["copper_silver", "copper_shakudo", "gold_platinum", "copper_brass", "nickel_silver"];
}
