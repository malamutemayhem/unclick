export type GardenForkType = "digging_fork_heavy" | "border_fork_compact" | "compost_fork_curved" | "broadfork_deep_bed" | "pitch_fork_hay";

export function soilPenetration(t: GardenForkType): number {
  const m: Record<GardenForkType, number> = {
    digging_fork_heavy: 9, border_fork_compact: 6, compost_fork_curved: 5, broadfork_deep_bed: 10, pitch_fork_hay: 4,
  };
  return m[t];
}

export function turningAbility(t: GardenForkType): number {
  const m: Record<GardenForkType, number> = {
    digging_fork_heavy: 8, border_fork_compact: 7, compost_fork_curved: 10, broadfork_deep_bed: 6, pitch_fork_hay: 9,
  };
  return m[t];
}

export function leverage(t: GardenForkType): number {
  const m: Record<GardenForkType, number> = {
    digging_fork_heavy: 8, border_fork_compact: 5, compost_fork_curved: 6, broadfork_deep_bed: 10, pitch_fork_hay: 7,
  };
  return m[t];
}

export function maneuverability(t: GardenForkType): number {
  const m: Record<GardenForkType, number> = {
    digging_fork_heavy: 5, border_fork_compact: 9, compost_fork_curved: 7, broadfork_deep_bed: 3, pitch_fork_hay: 6,
  };
  return m[t];
}

export function forkCost(t: GardenForkType): number {
  const m: Record<GardenForkType, number> = {
    digging_fork_heavy: 6, border_fork_compact: 5, compost_fork_curved: 5, broadfork_deep_bed: 9, pitch_fork_hay: 4,
  };
  return m[t];
}

export function stainlessSteel(t: GardenForkType): boolean {
  const m: Record<GardenForkType, boolean> = {
    digging_fork_heavy: true, border_fork_compact: true, compost_fork_curved: false, broadfork_deep_bed: true, pitch_fork_hay: false,
  };
  return m[t];
}

export function dHandle(t: GardenForkType): boolean {
  const m: Record<GardenForkType, boolean> = {
    digging_fork_heavy: true, border_fork_compact: true, compost_fork_curved: false, broadfork_deep_bed: false, pitch_fork_hay: false,
  };
  return m[t];
}

export function tineShape(t: GardenForkType): string {
  const m: Record<GardenForkType, string> = {
    digging_fork_heavy: "flat_square_forged",
    border_fork_compact: "slim_square_tempered",
    compost_fork_curved: "curved_round_prong",
    broadfork_deep_bed: "long_straight_round",
    pitch_fork_hay: "thin_sharp_pointed",
  };
  return m[t];
}

export function bestTask(t: GardenForkType): string {
  const m: Record<GardenForkType, string> = {
    digging_fork_heavy: "breaking_compacted_soil",
    border_fork_compact: "tight_bed_container",
    compost_fork_curved: "turning_compost_pile",
    broadfork_deep_bed: "no_till_deep_aeration",
    pitch_fork_hay: "moving_hay_mulch_straw",
  };
  return m[t];
}

export function gardenForks(): GardenForkType[] {
  return ["digging_fork_heavy", "border_fork_compact", "compost_fork_curved", "broadfork_deep_bed", "pitch_fork_hay"];
}
