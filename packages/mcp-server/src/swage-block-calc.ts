export type SwageProfile = "half_round" | "v_groove" | "square" | "bowl" | "spoon";

export function depthMm(profile: SwageProfile): number {
  const depths: Record<SwageProfile, number> = {
    half_round: 15, v_groove: 12, square: 10, bowl: 25, spoon: 20,
  };
  return depths[profile];
}

export function widthMm(profile: SwageProfile): number {
  const widths: Record<SwageProfile, number> = {
    half_round: 30, v_groove: 20, square: 25, bowl: 60, spoon: 40,
  };
  return widths[profile];
}

export function blockWeightKg(sideLengthCm: number): number {
  return parseFloat((Math.pow(sideLengthCm / 100, 3) * 7800).toFixed(1));
}

export function profilesPerBlock(): number {
  return 20;
}

export function matchingTopToolRequired(profile: SwageProfile): boolean {
  return profile === "half_round" || profile === "v_groove" || profile === "square";
}

export function heatingRequired(stockThicknessMm: number): boolean {
  return stockThicknessMm > 6;
}

export function formingBlows(profile: SwageProfile): number {
  const blows: Record<SwageProfile, number> = {
    half_round: 8, v_groove: 6, square: 5, bowl: 15, spoon: 12,
  };
  return blows[profile];
}

export function surfaceFinishQuality(profile: SwageProfile): number {
  const ratings: Record<SwageProfile, number> = {
    half_round: 4, v_groove: 3, square: 3, bowl: 5, spoon: 5,
  };
  return ratings[profile];
}

export function costEstimate(sideLengthCm: number): number {
  return Math.round(sideLengthCm * 15);
}

export function swageProfiles(): SwageProfile[] {
  return ["half_round", "v_groove", "square", "bowl", "spoon"];
}
