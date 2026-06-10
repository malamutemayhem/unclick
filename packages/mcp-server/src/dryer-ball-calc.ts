export type DryerBallType = "wool_felted" | "plastic_spike" | "rubber_nodule" | "tennis_ball_hack" | "scented_ceramic";

export function dryTimeReduction(t: DryerBallType): number {
  const m: Record<DryerBallType, number> = {
    wool_felted: 9, plastic_spike: 7, rubber_nodule: 6, tennis_ball_hack: 5, scented_ceramic: 4,
  };
  return m[t];
}

export function staticReduction(t: DryerBallType): number {
  const m: Record<DryerBallType, number> = {
    wool_felted: 9, plastic_spike: 5, rubber_nodule: 6, tennis_ball_hack: 4, scented_ceramic: 3,
  };
  return m[t];
}

export function fabricSoftness(t: DryerBallType): number {
  const m: Record<DryerBallType, number> = {
    wool_felted: 10, plastic_spike: 6, rubber_nodule: 7, tennis_ball_hack: 5, scented_ceramic: 4,
  };
  return m[t];
}

export function noiseLevel(t: DryerBallType): number {
  const m: Record<DryerBallType, number> = {
    wool_felted: 9, plastic_spike: 4, rubber_nodule: 5, tennis_ball_hack: 3, scented_ceramic: 7,
  };
  return m[t];
}

export function ballCost(t: DryerBallType): number {
  const m: Record<DryerBallType, number> = {
    wool_felted: 3, plastic_spike: 2, rubber_nodule: 2, tennis_ball_hack: 1, scented_ceramic: 5,
  };
  return m[t];
}

export function ecoFriendly(t: DryerBallType): boolean {
  const m: Record<DryerBallType, boolean> = {
    wool_felted: true, plastic_spike: false, rubber_nodule: false, tennis_ball_hack: false, scented_ceramic: true,
  };
  return m[t];
}

export function addFragrance(t: DryerBallType): boolean {
  const m: Record<DryerBallType, boolean> = {
    wool_felted: true, plastic_spike: false, rubber_nodule: false, tennis_ball_hack: false, scented_ceramic: true,
  };
  return m[t];
}

export function ballMaterial(t: DryerBallType): string {
  const m: Record<DryerBallType, string> = {
    wool_felted: "new_zealand_wool_felt",
    plastic_spike: "pvc_spike_sphere",
    rubber_nodule: "natural_rubber_nub",
    tennis_ball_hack: "pressurized_felt_core",
    scented_ceramic: "ceramic_bead_sachet",
  };
  return m[t];
}

export function bestUse(t: DryerBallType): string {
  const m: Record<DryerBallType, string> = {
    wool_felted: "everyday_eco_laundry",
    plastic_spike: "fluffing_down_jackets",
    rubber_nodule: "heavy_towel_loads",
    tennis_ball_hack: "budget_quick_fix",
    scented_ceramic: "linen_closet_fresh",
  };
  return m[t];
}

export function dryerBalls(): DryerBallType[] {
  return ["wool_felted", "plastic_spike", "rubber_nodule", "tennis_ball_hack", "scented_ceramic"];
}
