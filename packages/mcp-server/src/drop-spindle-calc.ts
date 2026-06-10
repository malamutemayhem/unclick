export type SpindleType = "top_whorl" | "bottom_whorl" | "turkish" | "supported" | "tahkli";

export function whorlWeightG(type: SpindleType): number {
  const weights: Record<SpindleType, number> = {
    top_whorl: 35, bottom_whorl: 40, turkish: 30, supported: 15, tahkli: 10,
  };
  return weights[type];
}

export function shaftLengthCm(type: SpindleType): number {
  const lengths: Record<SpindleType, number> = {
    top_whorl: 28, bottom_whorl: 30, turkish: 25, supported: 20, tahkli: 18,
  };
  return lengths[type];
}

export function spinSpeedRpm(type: SpindleType): number {
  const rpm: Record<SpindleType, number> = {
    top_whorl: 800, bottom_whorl: 700, turkish: 600, supported: 2000, tahkli: 2500,
  };
  return rpm[type];
}

export function yarnWeightRange(type: SpindleType): string {
  const ranges: Record<SpindleType, string> = {
    top_whorl: "dk_to_worsted", bottom_whorl: "worsted_to_bulky",
    turkish: "fingering_to_dk", supported: "lace_to_fingering",
    tahkli: "cobweb_to_lace",
  };
  return ranges[type];
}

export function beginnerFriendly(type: SpindleType): boolean {
  return type === "top_whorl" || type === "bottom_whorl";
}

export function draftsPerMinute(type: SpindleType): number {
  const drafts: Record<SpindleType, number> = {
    top_whorl: 12, bottom_whorl: 10, turkish: 8, supported: 20, tahkli: 25,
  };
  return drafts[type];
}

export function plySuitable(type: SpindleType): boolean {
  return type !== "tahkli";
}

export function portabilityRating(type: SpindleType): number {
  const ratings: Record<SpindleType, number> = {
    top_whorl: 5, bottom_whorl: 4, turkish: 5, supported: 3, tahkli: 4,
  };
  return ratings[type];
}

export function costEstimate(type: SpindleType): number {
  const costs: Record<SpindleType, number> = {
    top_whorl: 25, bottom_whorl: 20, turkish: 35, supported: 40, tahkli: 30,
  };
  return costs[type];
}

export function spindleTypes(): SpindleType[] {
  return ["top_whorl", "bottom_whorl", "turkish", "supported", "tahkli"];
}
