export type NailClipperType = "lever_standard" | "guillotine_plier" | "scissor_curved" | "wide_jaw_toenail" | "electric_rotary";

export function cuttingPrecision(t: NailClipperType): number {
  const m: Record<NailClipperType, number> = {
    lever_standard: 6, guillotine_plier: 8, scissor_curved: 9, wide_jaw_toenail: 5, electric_rotary: 7,
  };
  return m[t];
}

export function easeOfUse(t: NailClipperType): number {
  const m: Record<NailClipperType, number> = {
    lever_standard: 10, guillotine_plier: 7, scissor_curved: 6, wide_jaw_toenail: 8, electric_rotary: 9,
  };
  return m[t];
}

export function thickNailAbility(t: NailClipperType): number {
  const m: Record<NailClipperType, number> = {
    lever_standard: 4, guillotine_plier: 9, scissor_curved: 5, wide_jaw_toenail: 10, electric_rotary: 3,
  };
  return m[t];
}

export function portability(t: NailClipperType): number {
  const m: Record<NailClipperType, number> = {
    lever_standard: 10, guillotine_plier: 6, scissor_curved: 7, wide_jaw_toenail: 5, electric_rotary: 4,
  };
  return m[t];
}

export function clipperCost(t: NailClipperType): number {
  const m: Record<NailClipperType, number> = {
    lever_standard: 1, guillotine_plier: 5, scissor_curved: 4, wide_jaw_toenail: 3, electric_rotary: 7,
  };
  return m[t];
}

export function catchesClippings(t: NailClipperType): boolean {
  const m: Record<NailClipperType, boolean> = {
    lever_standard: true, guillotine_plier: false, scissor_curved: false, wide_jaw_toenail: false, electric_rotary: true,
  };
  return m[t];
}

export function needsBattery(t: NailClipperType): boolean {
  const m: Record<NailClipperType, boolean> = {
    lever_standard: false, guillotine_plier: false, scissor_curved: false, wide_jaw_toenail: false, electric_rotary: true,
  };
  return m[t];
}

export function bladeShape(t: NailClipperType): string {
  const m: Record<NailClipperType, string> = {
    lever_standard: "curved_lever_jaw",
    guillotine_plier: "compound_lever_plier",
    scissor_curved: "curved_blade_scissor",
    wide_jaw_toenail: "wide_straight_jaw",
    electric_rotary: "spinning_file_disc",
  };
  return m[t];
}

export function bestNail(t: NailClipperType): string {
  const m: Record<NailClipperType, string> = {
    lever_standard: "everyday_fingernail",
    guillotine_plier: "ingrown_problem_nail",
    scissor_curved: "baby_thin_nail",
    wide_jaw_toenail: "thick_toenail_elderly",
    electric_rotary: "gentle_file_shape",
  };
  return m[t];
}

export function nailClippers(): NailClipperType[] {
  return ["lever_standard", "guillotine_plier", "scissor_curved", "wide_jaw_toenail", "electric_rotary"];
}
