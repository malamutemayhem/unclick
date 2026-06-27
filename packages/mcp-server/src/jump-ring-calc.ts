export type JumpRingType = "round_wire_standard" | "square_wire_flat" | "oval_wire_profile" | "twisted_wire_texture" | "split_ring_double";

export function closureStrength(t: JumpRingType): number {
  const m: Record<JumpRingType, number> = {
    round_wire_standard: 7, square_wire_flat: 8, oval_wire_profile: 7, twisted_wire_texture: 6, split_ring_double: 10,
  };
  return m[t];
}

export function aesthetics(t: JumpRingType): number {
  const m: Record<JumpRingType, number> = {
    round_wire_standard: 7, square_wire_flat: 9, oval_wire_profile: 8, twisted_wire_texture: 10, split_ring_double: 5,
  };
  return m[t];
}

export function easeOfUse(t: JumpRingType): number {
  const m: Record<JumpRingType, number> = {
    round_wire_standard: 10, square_wire_flat: 7, oval_wire_profile: 8, twisted_wire_texture: 6, split_ring_double: 4,
  };
  return m[t];
}

export function flushClose(t: JumpRingType): number {
  const m: Record<JumpRingType, number> = {
    round_wire_standard: 8, square_wire_flat: 10, oval_wire_profile: 7, twisted_wire_texture: 5, split_ring_double: 6,
  };
  return m[t];
}

export function ringCost(t: JumpRingType): number {
  const m: Record<JumpRingType, number> = {
    round_wire_standard: 1, square_wire_flat: 2, oval_wire_profile: 2, twisted_wire_texture: 2, split_ring_double: 1,
  };
  return m[t];
}

export function solderNeeded(t: JumpRingType): boolean {
  const m: Record<JumpRingType, boolean> = {
    round_wire_standard: false, square_wire_flat: false, oval_wire_profile: false, twisted_wire_texture: false, split_ring_double: false,
  };
  return m[t];
}

export function doubleWrap(t: JumpRingType): boolean {
  const m: Record<JumpRingType, boolean> = {
    round_wire_standard: false, square_wire_flat: false, oval_wire_profile: false, twisted_wire_texture: false, split_ring_double: true,
  };
  return m[t];
}

export function wireShape(t: JumpRingType): string {
  const m: Record<JumpRingType, string> = {
    round_wire_standard: "round_cross_section",
    square_wire_flat: "square_cross_section",
    oval_wire_profile: "oval_cross_section",
    twisted_wire_texture: "twisted_round_wire",
    split_ring_double: "spiral_double_coil",
  };
  return m[t];
}

export function bestProject(t: JumpRingType): string {
  const m: Record<JumpRingType, string> = {
    round_wire_standard: "chain_link_general",
    square_wire_flat: "flat_maille_pattern",
    oval_wire_profile: "charm_pendant_attach",
    twisted_wire_texture: "decorative_chain_accent",
    split_ring_double: "clasp_secure_connect",
  };
  return m[t];
}

export function jumpRings(): JumpRingType[] {
  return ["round_wire_standard", "square_wire_flat", "oval_wire_profile", "twisted_wire_texture", "split_ring_double"];
}
