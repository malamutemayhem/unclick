export type SolidPointType = "brass_screw_in" | "copper_heavy_duty" | "nickel_chrome_alloy" | "carbide_tip_hard" | "interchangeable_set";

export function heatRetain(t: SolidPointType): number {
  const m: Record<SolidPointType, number> = {
    brass_screw_in: 8, copper_heavy_duty: 10, nickel_chrome_alloy: 7, carbide_tip_hard: 6, interchangeable_set: 7,
  };
  return m[t];
}

export function burnConsist(t: SolidPointType): number {
  const m: Record<SolidPointType, number> = {
    brass_screw_in: 7, copper_heavy_duty: 9, nickel_chrome_alloy: 8, carbide_tip_hard: 10, interchangeable_set: 7,
  };
  return m[t];
}

export function tipVariety(t: SolidPointType): number {
  const m: Record<SolidPointType, number> = {
    brass_screw_in: 8, copper_heavy_duty: 5, nickel_chrome_alloy: 6, carbide_tip_hard: 4, interchangeable_set: 10,
  };
  return m[t];
}

export function durability(t: SolidPointType): number {
  const m: Record<SolidPointType, number> = {
    brass_screw_in: 7, copper_heavy_duty: 8, nickel_chrome_alloy: 9, carbide_tip_hard: 10, interchangeable_set: 7,
  };
  return m[t];
}

export function pointCost(t: SolidPointType): number {
  const m: Record<SolidPointType, number> = {
    brass_screw_in: 2, copper_heavy_duty: 3, nickel_chrome_alloy: 3, carbide_tip_hard: 4, interchangeable_set: 4,
  };
  return m[t];
}

export function screwMount(t: SolidPointType): boolean {
  const m: Record<SolidPointType, boolean> = {
    brass_screw_in: true, copper_heavy_duty: true, nickel_chrome_alloy: true, carbide_tip_hard: true, interchangeable_set: false,
  };
  return m[t];
}

export function multiTip(t: SolidPointType): boolean {
  const m: Record<SolidPointType, boolean> = {
    brass_screw_in: false, copper_heavy_duty: false, nickel_chrome_alloy: false, carbide_tip_hard: false, interchangeable_set: true,
  };
  return m[t];
}

export function tipAlloy(t: SolidPointType): string {
  const m: Record<SolidPointType, string> = {
    brass_screw_in: "solid_brass_machined",
    copper_heavy_duty: "solid_copper_forged",
    nickel_chrome_alloy: "nickel_chrome_cast",
    carbide_tip_hard: "tungsten_carbide_tip",
    interchangeable_set: "mixed_alloy_quick",
  };
  return m[t];
}

export function bestUse(t: SolidPointType): string {
  const m: Record<SolidPointType, string> = {
    brass_screw_in: "beginner_general_burn",
    copper_heavy_duty: "deep_burn_dark_tone",
    nickel_chrome_alloy: "long_session_work",
    carbide_tip_hard: "hardwood_detail_burn",
    interchangeable_set: "varied_technique_mix",
  };
  return m[t];
}

export function solidPoints(): SolidPointType[] {
  return ["brass_screw_in", "copper_heavy_duty", "nickel_chrome_alloy", "carbide_tip_hard", "interchangeable_set"];
}
