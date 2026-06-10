export type BikeSaddle = "racing_narrow" | "comfort_wide" | "cutout_relief" | "noseless_split" | "carbon_lightweight";

export function powerTransfer(b: BikeSaddle): number {
  const m: Record<BikeSaddle, number> = {
    racing_narrow: 10, comfort_wide: 4, cutout_relief: 7, noseless_split: 5, carbon_lightweight: 9,
  };
  return m[b];
}

export function comfortLevel(b: BikeSaddle): number {
  const m: Record<BikeSaddle, number> = {
    racing_narrow: 3, comfort_wide: 10, cutout_relief: 8, noseless_split: 7, carbon_lightweight: 4,
  };
  return m[b];
}

export function pressureRelief(b: BikeSaddle): number {
  const m: Record<BikeSaddle, number> = {
    racing_narrow: 2, comfort_wide: 6, cutout_relief: 10, noseless_split: 9, carbon_lightweight: 3,
  };
  return m[b];
}

export function saddleWeight(b: BikeSaddle): number {
  const m: Record<BikeSaddle, number> = {
    racing_narrow: 8, comfort_wide: 3, cutout_relief: 6, noseless_split: 5, carbon_lightweight: 10,
  };
  return m[b];
}

export function saddleCost(b: BikeSaddle): number {
  const m: Record<BikeSaddle, number> = {
    racing_narrow: 6, comfort_wide: 3, cutout_relief: 5, noseless_split: 7, carbon_lightweight: 10,
  };
  return m[b];
}

export function hasCutout(b: BikeSaddle): boolean {
  const m: Record<BikeSaddle, boolean> = {
    racing_narrow: false, comfort_wide: false, cutout_relief: true, noseless_split: true, carbon_lightweight: false,
  };
  return m[b];
}

export function gelPadding(b: BikeSaddle): boolean {
  const m: Record<BikeSaddle, boolean> = {
    racing_narrow: false, comfort_wide: true, cutout_relief: true, noseless_split: false, carbon_lightweight: false,
  };
  return m[b];
}

export function shellMaterial(b: BikeSaddle): string {
  const m: Record<BikeSaddle, string> = {
    racing_narrow: "nylon_fiber_reinforced_base", comfort_wide: "flexible_polymer_gel_top",
    cutout_relief: "nylon_composite_foam_channel", noseless_split: "dual_pad_independent_flex",
    carbon_lightweight: "unidirectional_carbon_fiber",
  };
  return m[b];
}

export function bestRider(b: BikeSaddle): string {
  const m: Record<BikeSaddle, string> = {
    racing_narrow: "road_racer_aggressive_position", comfort_wide: "cruiser_upright_casual",
    cutout_relief: "long_distance_touring", noseless_split: "prostate_comfort_recumbent",
    carbon_lightweight: "weight_weenie_hill_climb",
  };
  return m[b];
}

export function bikeSaddles(): BikeSaddle[] {
  return ["racing_narrow", "comfort_wide", "cutout_relief", "noseless_split", "carbon_lightweight"];
}
