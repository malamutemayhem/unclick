export type FishingLineType = "mono_nylon" | "fluorocarbon" | "braided_pe" | "wire_leader" | "fly_line_weight";

export function stretchAmount(t: FishingLineType): number {
  const m: Record<FishingLineType, number> = {
    mono_nylon: 9, fluorocarbon: 5, braided_pe: 1, wire_leader: 1, fly_line_weight: 6,
  };
  return m[t];
}

export function lineVisibility(t: FishingLineType): number {
  const m: Record<FishingLineType, number> = {
    mono_nylon: 5, fluorocarbon: 10, braided_pe: 3, wire_leader: 2, fly_line_weight: 4,
  };
  return m[t];
}

export function abrasionResist(t: FishingLineType): number {
  const m: Record<FishingLineType, number> = {
    mono_nylon: 5, fluorocarbon: 8, braided_pe: 6, wire_leader: 10, fly_line_weight: 4,
  };
  return m[t];
}

export function knotStrength(t: FishingLineType): number {
  const m: Record<FishingLineType, number> = {
    mono_nylon: 8, fluorocarbon: 6, braided_pe: 7, wire_leader: 3, fly_line_weight: 7,
  };
  return m[t];
}

export function lineCost(t: FishingLineType): number {
  const m: Record<FishingLineType, number> = {
    mono_nylon: 1, fluorocarbon: 6, braided_pe: 7, wire_leader: 5, fly_line_weight: 8,
  };
  return m[t];
}

export function sinksNaturally(t: FishingLineType): boolean {
  const m: Record<FishingLineType, boolean> = {
    mono_nylon: false, fluorocarbon: true, braided_pe: false, wire_leader: true, fly_line_weight: false,
  };
  return m[t];
}

export function uvResistant(t: FishingLineType): boolean {
  const m: Record<FishingLineType, boolean> = {
    mono_nylon: false, fluorocarbon: true, braided_pe: true, wire_leader: true, fly_line_weight: false,
  };
  return m[t];
}

export function construction(t: FishingLineType): string {
  const m: Record<FishingLineType, string> = {
    mono_nylon: "single_strand_extruded", fluorocarbon: "polyvinylidene_fluoride",
    braided_pe: "multi_strand_woven_fiber", wire_leader: "stainless_steel_strand",
    fly_line_weight: "pvc_coated_tapered_core",
  };
  return m[t];
}

export function bestTechnique(t: FishingLineType): string {
  const m: Record<FishingLineType, string> = {
    mono_nylon: "general_purpose_beginner", fluorocarbon: "clear_water_finesse",
    braided_pe: "heavy_cover_jigging_trolling", wire_leader: "toothy_fish_pike_musky",
    fly_line_weight: "fly_casting_presentation",
  };
  return m[t];
}

export function fishingLines(): FishingLineType[] {
  return ["mono_nylon", "fluorocarbon", "braided_pe", "wire_leader", "fly_line_weight"];
}
