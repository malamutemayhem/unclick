export type LeatherWeight = "lightweight" | "medium" | "heavy" | "extra_heavy" | "garment";

export function thicknessOz(weight: LeatherWeight): number {
  const t: Record<LeatherWeight, number> = {
    lightweight: 2, medium: 5, heavy: 8, extra_heavy: 12, garment: 1,
  };
  return t[weight];
}

export function thicknessMm(weight: LeatherWeight): number {
  const t: Record<LeatherWeight, number> = {
    lightweight: 0.8, medium: 2.0, heavy: 3.2, extra_heavy: 4.8, garment: 0.4,
  };
  return t[weight];
}

export function rigidity(weight: LeatherWeight): number {
  const r: Record<LeatherWeight, number> = {
    lightweight: 3, medium: 6, heavy: 8, extra_heavy: 10, garment: 1,
  };
  return r[weight];
}

export function toolability(weight: LeatherWeight): number {
  const t: Record<LeatherWeight, number> = {
    lightweight: 3, medium: 9, heavy: 10, extra_heavy: 7, garment: 1,
  };
  return t[weight];
}

export function sewability(weight: LeatherWeight): number {
  const s: Record<LeatherWeight, number> = {
    lightweight: 9, medium: 7, heavy: 4, extra_heavy: 2, garment: 10,
  };
  return s[weight];
}

export function machineSewable(weight: LeatherWeight): boolean {
  const m: Record<LeatherWeight, boolean> = {
    lightweight: true, medium: true, heavy: false, extra_heavy: false, garment: true,
  };
  return m[weight];
}

export function bestProject(weight: LeatherWeight): string {
  const b: Record<LeatherWeight, string> = {
    lightweight: "card_wallets", medium: "belts", heavy: "holsters",
    extra_heavy: "armor", garment: "jackets",
  };
  return b[weight];
}

export function pricePerSqFt(weight: LeatherWeight): number {
  const p: Record<LeatherWeight, number> = {
    lightweight: 6, medium: 8, heavy: 10, extra_heavy: 12, garment: 14,
  };
  return p[weight];
}

export function breakInDays(weight: LeatherWeight): number {
  const b: Record<LeatherWeight, number> = {
    lightweight: 1, medium: 7, heavy: 21, extra_heavy: 30, garment: 0,
  };
  return b[weight];
}

export function leatherWeights(): LeatherWeight[] {
  return ["lightweight", "medium", "heavy", "extra_heavy", "garment"];
}
