export type NibHolderType = "straight_wood_classic" | "oblique_flange_copper" | "ergonomic_rubber_grip" | "universal_adjustable_ring" | "speedball_cork_student";

export function nibFit(t: NibHolderType): number {
  const m: Record<NibHolderType, number> = {
    straight_wood_classic: 7, oblique_flange_copper: 8, ergonomic_rubber_grip: 7, universal_adjustable_ring: 10, speedball_cork_student: 6,
  };
  return m[t];
}

export function handComfort(t: NibHolderType): number {
  const m: Record<NibHolderType, number> = {
    straight_wood_classic: 7, oblique_flange_copper: 8, ergonomic_rubber_grip: 10, universal_adjustable_ring: 7, speedball_cork_student: 6,
  };
  return m[t];
}

export function writeAngle(t: NibHolderType): number {
  const m: Record<NibHolderType, number> = {
    straight_wood_classic: 6, oblique_flange_copper: 10, ergonomic_rubber_grip: 7, universal_adjustable_ring: 8, speedball_cork_student: 5,
  };
  return m[t];
}

export function buildQuality(t: NibHolderType): number {
  const m: Record<NibHolderType, number> = {
    straight_wood_classic: 8, oblique_flange_copper: 10, ergonomic_rubber_grip: 7, universal_adjustable_ring: 9, speedball_cork_student: 5,
  };
  return m[t];
}

export function holderCost(t: NibHolderType): number {
  const m: Record<NibHolderType, number> = {
    straight_wood_classic: 1, oblique_flange_copper: 3, ergonomic_rubber_grip: 2, universal_adjustable_ring: 2, speedball_cork_student: 1,
  };
  return m[t];
}

export function isOblique(t: NibHolderType): boolean {
  const m: Record<NibHolderType, boolean> = {
    straight_wood_classic: false, oblique_flange_copper: true, ergonomic_rubber_grip: false, universal_adjustable_ring: false, speedball_cork_student: false,
  };
  return m[t];
}

export function adjustable(t: NibHolderType): boolean {
  const m: Record<NibHolderType, boolean> = {
    straight_wood_classic: false, oblique_flange_copper: false, ergonomic_rubber_grip: false, universal_adjustable_ring: true, speedball_cork_student: false,
  };
  return m[t];
}

export function gripMaterial(t: NibHolderType): string {
  const m: Record<NibHolderType, string> = {
    straight_wood_classic: "turned_hardwood_shaft",
    oblique_flange_copper: "resin_body_brass_flange",
    ergonomic_rubber_grip: "soft_rubber_contour",
    universal_adjustable_ring: "metal_ring_collet",
    speedball_cork_student: "cork_wrap_plastic",
  };
  return m[t];
}

export function bestStyle(t: NibHolderType): string {
  const m: Record<NibHolderType, string> = {
    straight_wood_classic: "broad_edge_lettering",
    oblique_flange_copper: "copperplate_script",
    ergonomic_rubber_grip: "long_practice_session",
    universal_adjustable_ring: "multi_nib_switching",
    speedball_cork_student: "beginner_first_pen",
  };
  return m[t];
}

export function nibHolders(): NibHolderType[] {
  return ["straight_wood_classic", "oblique_flange_copper", "ergonomic_rubber_grip", "universal_adjustable_ring", "speedball_cork_student"];
}
