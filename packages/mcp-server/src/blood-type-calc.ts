export type BloodType = "a_positive" | "b_positive" | "ab_positive" | "o_positive" | "o_negative";

export function populationPercent(b: BloodType): number {
  const m: Record<BloodType, number> = {
    a_positive: 35.7, b_positive: 8.5, ab_positive: 3.4, o_positive: 37.4, o_negative: 6.6,
  };
  return m[b];
}

export function canDonateTo(b: BloodType): number {
  const m: Record<BloodType, number> = {
    a_positive: 4, b_positive: 4, ab_positive: 2, o_positive: 4, o_negative: 8,
  };
  return m[b];
}

export function canReceiveFrom(b: BloodType): number {
  const m: Record<BloodType, number> = {
    a_positive: 6, b_positive: 6, ab_positive: 8, o_positive: 4, o_negative: 1,
  };
  return m[b];
}

export function demandLevel(b: BloodType): number {
  const m: Record<BloodType, number> = {
    a_positive: 7, b_positive: 5, ab_positive: 3, o_positive: 9, o_negative: 10,
  };
  return m[b];
}

export function plateletDemand(b: BloodType): number {
  const m: Record<BloodType, number> = {
    a_positive: 8, b_positive: 5, ab_positive: 10, o_positive: 7, o_negative: 6,
  };
  return m[b];
}

export function universalDonor(b: BloodType): boolean {
  const m: Record<BloodType, boolean> = {
    a_positive: false, b_positive: false, ab_positive: false, o_positive: false, o_negative: true,
  };
  return m[b];
}

export function universalRecipient(b: BloodType): boolean {
  const m: Record<BloodType, boolean> = {
    a_positive: false, b_positive: false, ab_positive: true, o_positive: false, o_negative: false,
  };
  return m[b];
}

export function rhFactor(b: BloodType): string {
  const m: Record<BloodType, string> = {
    a_positive: "positive", b_positive: "positive", ab_positive: "positive",
    o_positive: "positive", o_negative: "negative",
  };
  return m[b];
}

export function antigenPresent(b: BloodType): string {
  const m: Record<BloodType, string> = {
    a_positive: "A", b_positive: "B", ab_positive: "AB",
    o_positive: "none", o_negative: "none",
  };
  return m[b];
}

export function bloodTypes(): BloodType[] {
  return ["a_positive", "b_positive", "ab_positive", "o_positive", "o_negative"];
}
