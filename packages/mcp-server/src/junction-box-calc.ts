export type JunctionBoxType = "metal_octagon_ceiling" | "plastic_single_gang" | "weatherproof_round_outdoor" | "pull_box_large_conduit" | "pancake_shallow_thin";

export function capacity(t: JunctionBoxType): number {
  const m: Record<JunctionBoxType, number> = {
    metal_octagon_ceiling: 7, plastic_single_gang: 5, weatherproof_round_outdoor: 6, pull_box_large_conduit: 10, pancake_shallow_thin: 3,
  };
  return m[t];
}

export function installEase(t: JunctionBoxType): number {
  const m: Record<JunctionBoxType, number> = {
    metal_octagon_ceiling: 6, plastic_single_gang: 10, weatherproof_round_outdoor: 5, pull_box_large_conduit: 3, pancake_shallow_thin: 8,
  };
  return m[t];
}

export function durability(t: JunctionBoxType): number {
  const m: Record<JunctionBoxType, number> = {
    metal_octagon_ceiling: 9, plastic_single_gang: 5, weatherproof_round_outdoor: 10, pull_box_large_conduit: 9, pancake_shallow_thin: 6,
  };
  return m[t];
}

export function groundingEase(t: JunctionBoxType): number {
  const m: Record<JunctionBoxType, number> = {
    metal_octagon_ceiling: 10, plastic_single_gang: 3, weatherproof_round_outdoor: 8, pull_box_large_conduit: 9, pancake_shallow_thin: 7,
  };
  return m[t];
}

export function boxCost(t: JunctionBoxType): number {
  const m: Record<JunctionBoxType, number> = {
    metal_octagon_ceiling: 5, plastic_single_gang: 2, weatherproof_round_outdoor: 7, pull_box_large_conduit: 9, pancake_shallow_thin: 4,
  };
  return m[t];
}

export function outdoorRated(t: JunctionBoxType): boolean {
  const m: Record<JunctionBoxType, boolean> = {
    metal_octagon_ceiling: false, plastic_single_gang: false, weatherproof_round_outdoor: true, pull_box_large_conduit: true, pancake_shallow_thin: false,
  };
  return m[t];
}

export function needsClamp(t: JunctionBoxType): boolean {
  const m: Record<JunctionBoxType, boolean> = {
    metal_octagon_ceiling: true, plastic_single_gang: false, weatherproof_round_outdoor: true, pull_box_large_conduit: true, pancake_shallow_thin: true,
  };
  return m[t];
}

export function boxMaterial(t: JunctionBoxType): string {
  const m: Record<JunctionBoxType, string> = {
    metal_octagon_ceiling: "galvanized_steel_stamped",
    plastic_single_gang: "pvc_thermoplastic",
    weatherproof_round_outdoor: "die_cast_aluminum",
    pull_box_large_conduit: "steel_screw_cover",
    pancake_shallow_thin: "stamped_steel_flat",
  };
  return m[t];
}

export function bestMount(t: JunctionBoxType): string {
  const m: Record<JunctionBoxType, string> = {
    metal_octagon_ceiling: "ceiling_fan_light",
    plastic_single_gang: "interior_switch_outlet",
    weatherproof_round_outdoor: "exterior_wall_conduit",
    pull_box_large_conduit: "long_conduit_run_pull",
    pancake_shallow_thin: "thin_ceiling_fixture",
  };
  return m[t];
}

export function junctionBoxes(): JunctionBoxType[] {
  return ["metal_octagon_ceiling", "plastic_single_gang", "weatherproof_round_outdoor", "pull_box_large_conduit", "pancake_shallow_thin"];
}
