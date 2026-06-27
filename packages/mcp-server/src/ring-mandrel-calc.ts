export type RingMandrelType = "steel_tapered_round" | "wooden_oval_comfort" | "stepped_size_fixed" | "triblet_wire_wrapping" | "grooved_channel_set";

export function sizingAccuracy(t: RingMandrelType): number {
  const m: Record<RingMandrelType, number> = {
    steel_tapered_round: 10, wooden_oval_comfort: 6, stepped_size_fixed: 9, triblet_wire_wrapping: 7, grooved_channel_set: 8,
  };
  return m[t];
}

export function hammerSafe(t: RingMandrelType): number {
  const m: Record<RingMandrelType, number> = {
    steel_tapered_round: 10, wooden_oval_comfort: 5, stepped_size_fixed: 9, triblet_wire_wrapping: 7, grooved_channel_set: 8,
  };
  return m[t];
}

export function surfaceFinish(t: RingMandrelType): number {
  const m: Record<RingMandrelType, number> = {
    steel_tapered_round: 9, wooden_oval_comfort: 7, stepped_size_fixed: 8, triblet_wire_wrapping: 6, grooved_channel_set: 8,
  };
  return m[t];
}

export function shapeRange(t: RingMandrelType): number {
  const m: Record<RingMandrelType, number> = {
    steel_tapered_round: 7, wooden_oval_comfort: 8, stepped_size_fixed: 4, triblet_wire_wrapping: 9, grooved_channel_set: 6,
  };
  return m[t];
}

export function mandrelCost(t: RingMandrelType): number {
  const m: Record<RingMandrelType, number> = {
    steel_tapered_round: 2, wooden_oval_comfort: 1, stepped_size_fixed: 2, triblet_wire_wrapping: 1, grooved_channel_set: 3,
  };
  return m[t];
}

export function markedSizes(t: RingMandrelType): boolean {
  const m: Record<RingMandrelType, boolean> = {
    steel_tapered_round: true, wooden_oval_comfort: false, stepped_size_fixed: true, triblet_wire_wrapping: false, grooved_channel_set: true,
  };
  return m[t];
}

export function forWireWrap(t: RingMandrelType): boolean {
  const m: Record<RingMandrelType, boolean> = {
    steel_tapered_round: false, wooden_oval_comfort: false, stepped_size_fixed: false, triblet_wire_wrapping: true, grooved_channel_set: false,
  };
  return m[t];
}

export function mandrelShape(t: RingMandrelType): string {
  const m: Record<RingMandrelType, string> = {
    steel_tapered_round: "tapered_cylinder_smooth",
    wooden_oval_comfort: "oval_hardwood_form",
    stepped_size_fixed: "stepped_diameter_ring",
    triblet_wire_wrapping: "thin_rod_taper",
    grooved_channel_set: "grooved_steel_channel",
  };
  return m[t];
}

export function bestUse(t: RingMandrelType): string {
  const m: Record<RingMandrelType, string> = {
    steel_tapered_round: "band_sizing_hammer",
    wooden_oval_comfort: "comfort_fit_shape",
    stepped_size_fixed: "production_size_check",
    triblet_wire_wrapping: "wire_ring_form",
    grooved_channel_set: "channel_stone_set",
  };
  return m[t];
}

export function ringMandrels(): RingMandrelType[] {
  return ["steel_tapered_round", "wooden_oval_comfort", "stepped_size_fixed", "triblet_wire_wrapping", "grooved_channel_set"];
}
