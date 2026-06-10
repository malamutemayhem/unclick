export type BambooSlipEra = "shang" | "zhou" | "warring_states" | "qin" | "han";

export function slipWidthCm(era: BambooSlipEra): number {
  const w: Record<BambooSlipEra, number> = {
    shang: 1.5, zhou: 1.2, warring_states: 1.0, qin: 1.0, han: 0.8,
  };
  return w[era];
}

export function slipLengthCm(era: BambooSlipEra): number {
  const l: Record<BambooSlipEra, number> = {
    shang: 20, zhou: 23, warring_states: 23, qin: 23, han: 23,
  };
  return l[era];
}

export function charactersPerSlip(era: BambooSlipEra): number {
  const c: Record<BambooSlipEra, number> = {
    shang: 15, zhou: 25, warring_states: 30, qin: 35, han: 40,
  };
  return c[era];
}

export function bindingCordMaterial(era: BambooSlipEra): string {
  const m: Record<BambooSlipEra, string> = {
    shang: "leather", zhou: "silk", warring_states: "hemp",
    qin: "silk", han: "silk",
  };
  return m[era];
}

export function slipsPerBundle(era: BambooSlipEra): number {
  const s: Record<BambooSlipEra, number> = {
    shang: 10, zhou: 20, warring_states: 25, qin: 30, han: 50,
  };
  return s[era];
}

export function prepTreatment(era: BambooSlipEra): boolean {
  return era !== "shang";
}

export function inkType(era: BambooSlipEra): string {
  const i: Record<BambooSlipEra, string> = {
    shang: "carbon_black", zhou: "pine_soot", warring_states: "lacquer_ink",
    qin: "pine_soot", han: "pine_soot",
  };
  return i[era];
}

export function archivalDurabilityYears(era: BambooSlipEra): number {
  const d: Record<BambooSlipEra, number> = {
    shang: 500, zhou: 800, warring_states: 1000, qin: 1200, han: 1500,
  };
  return d[era];
}

export function costPerBundle(era: BambooSlipEra): number {
  const c: Record<BambooSlipEra, number> = {
    shang: 5, zhou: 8, warring_states: 6, qin: 7, han: 10,
  };
  return c[era];
}

export function bambooSlipEras(): BambooSlipEra[] {
  return ["shang", "zhou", "warring_states", "qin", "han"];
}
