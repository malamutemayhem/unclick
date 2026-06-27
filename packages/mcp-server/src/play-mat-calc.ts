export type PlayMatType = "foam_interlocking_tile" | "cotton_quilted_round" | "activity_gym_arch" | "waterproof_picnic_fold" | "rubber_sensory_textured";

export function cushioning(t: PlayMatType): number {
  const m: Record<PlayMatType, number> = {
    foam_interlocking_tile: 9, cotton_quilted_round: 6, activity_gym_arch: 7, waterproof_picnic_fold: 4, rubber_sensory_textured: 8,
  };
  return m[t];
}

export function playArea(t: PlayMatType): number {
  const m: Record<PlayMatType, number> = {
    foam_interlocking_tile: 10, cotton_quilted_round: 6, activity_gym_arch: 5, waterproof_picnic_fold: 8, rubber_sensory_textured: 7,
  };
  return m[t];
}

export function stimulation(t: PlayMatType): number {
  const m: Record<PlayMatType, number> = {
    foam_interlocking_tile: 3, cotton_quilted_round: 5, activity_gym_arch: 10, waterproof_picnic_fold: 2, rubber_sensory_textured: 8,
  };
  return m[t];
}

export function cleanEase(t: PlayMatType): number {
  const m: Record<PlayMatType, number> = {
    foam_interlocking_tile: 9, cotton_quilted_round: 4, activity_gym_arch: 6, waterproof_picnic_fold: 10, rubber_sensory_textured: 8,
  };
  return m[t];
}

export function matCost(t: PlayMatType): number {
  const m: Record<PlayMatType, number> = {
    foam_interlocking_tile: 4, cotton_quilted_round: 5, activity_gym_arch: 7, waterproof_picnic_fold: 3, rubber_sensory_textured: 6,
  };
  return m[t];
}

export function portable(t: PlayMatType): boolean {
  const m: Record<PlayMatType, boolean> = {
    foam_interlocking_tile: false, cotton_quilted_round: true, activity_gym_arch: false, waterproof_picnic_fold: true, rubber_sensory_textured: false,
  };
  return m[t];
}

export function nonToxic(t: PlayMatType): boolean {
  const m: Record<PlayMatType, boolean> = {
    foam_interlocking_tile: true, cotton_quilted_round: true, activity_gym_arch: true, waterproof_picnic_fold: true, rubber_sensory_textured: true,
  };
  return m[t];
}

export function matMaterial(t: PlayMatType): string {
  const m: Record<PlayMatType, string> = {
    foam_interlocking_tile: "eva_foam_puzzle_tile",
    cotton_quilted_round: "organic_cotton_batting",
    activity_gym_arch: "polyester_wood_arch_frame",
    waterproof_picnic_fold: "peva_coated_polyester",
    rubber_sensory_textured: "natural_rubber_raised_dot",
  };
  return m[t];
}

export function bestStage(t: PlayMatType): string {
  const m: Record<PlayMatType, string> = {
    foam_interlocking_tile: "crawling_toddler_playroom",
    cotton_quilted_round: "newborn_tummy_time",
    activity_gym_arch: "infant_sensory_development",
    waterproof_picnic_fold: "outdoor_park_travel",
    rubber_sensory_textured: "standing_balance_practice",
  };
  return m[t];
}

export function playMats(): PlayMatType[] {
  return ["foam_interlocking_tile", "cotton_quilted_round", "activity_gym_arch", "waterproof_picnic_fold", "rubber_sensory_textured"];
}
