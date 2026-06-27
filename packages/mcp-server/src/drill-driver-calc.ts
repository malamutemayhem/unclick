export type DrillDriverType = "cordless_lithium" | "corded_hammer" | "impact_driver" | "drill_press" | "right_angle";

export function torqueRating(t: DrillDriverType): number {
  const m: Record<DrillDriverType, number> = {
    cordless_lithium: 6, corded_hammer: 9, impact_driver: 10, drill_press: 8, right_angle: 5,
  };
  return m[t];
}

export function speedControl(t: DrillDriverType): number {
  const m: Record<DrillDriverType, number> = {
    cordless_lithium: 8, corded_hammer: 7, impact_driver: 6, drill_press: 10, right_angle: 7,
  };
  return m[t];
}

export function portability(t: DrillDriverType): number {
  const m: Record<DrillDriverType, number> = {
    cordless_lithium: 10, corded_hammer: 4, impact_driver: 9, drill_press: 1, right_angle: 8,
  };
  return m[t];
}

export function precision(t: DrillDriverType): number {
  const m: Record<DrillDriverType, number> = {
    cordless_lithium: 7, corded_hammer: 5, impact_driver: 4, drill_press: 10, right_angle: 6,
  };
  return m[t];
}

export function drillCost(t: DrillDriverType): number {
  const m: Record<DrillDriverType, number> = {
    cordless_lithium: 5, corded_hammer: 4, impact_driver: 6, drill_press: 8, right_angle: 7,
  };
  return m[t];
}

export function hammerAction(t: DrillDriverType): boolean {
  const m: Record<DrillDriverType, boolean> = {
    cordless_lithium: false, corded_hammer: true, impact_driver: false, drill_press: false, right_angle: false,
  };
  return m[t];
}

export function brushless(t: DrillDriverType): boolean {
  const m: Record<DrillDriverType, boolean> = {
    cordless_lithium: true, corded_hammer: false, impact_driver: true, drill_press: false, right_angle: true,
  };
  return m[t];
}

export function chuckType(t: DrillDriverType): string {
  const m: Record<DrillDriverType, string> = {
    cordless_lithium: "keyless_half_inch", corded_hammer: "keyed_half_inch_hammer",
    impact_driver: "hex_quarter_inch_quick", drill_press: "keyed_five_eighth_inch",
    right_angle: "keyless_three_eighth_compact",
  };
  return m[t];
}

export function bestTask(t: DrillDriverType): string {
  const m: Record<DrillDriverType, string> = {
    cordless_lithium: "general_home_diy_screw", corded_hammer: "masonry_concrete_anchor",
    impact_driver: "lag_bolt_deck_framing", drill_press: "metalwork_precise_bore",
    right_angle: "tight_space_joist_stud",
  };
  return m[t];
}

export function drillDrivers(): DrillDriverType[] {
  return ["cordless_lithium", "corded_hammer", "impact_driver", "drill_press", "right_angle"];
}
