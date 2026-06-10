export type LetterOpenerType = "classic_blade_metal" | "electric_battery" | "plastic_safety" | "bone_ivory_replica" | "envelope_slitter_wheel";

export function cutSpeed(t: LetterOpenerType): number {
  const m: Record<LetterOpenerType, number> = {
    classic_blade_metal: 7, electric_battery: 10, plastic_safety: 4, bone_ivory_replica: 5, envelope_slitter_wheel: 8,
  };
  return m[t];
}

export function cleanCut(t: LetterOpenerType): number {
  const m: Record<LetterOpenerType, number> = {
    classic_blade_metal: 9, electric_battery: 8, plastic_safety: 5, bone_ivory_replica: 7, envelope_slitter_wheel: 10,
  };
  return m[t];
}

export function safety(t: LetterOpenerType): number {
  const m: Record<LetterOpenerType, number> = {
    classic_blade_metal: 4, electric_battery: 7, plastic_safety: 10, bone_ivory_replica: 6, envelope_slitter_wheel: 9,
  };
  return m[t];
}

export function aestheticValue(t: LetterOpenerType): number {
  const m: Record<LetterOpenerType, number> = {
    classic_blade_metal: 8, electric_battery: 3, plastic_safety: 1, bone_ivory_replica: 10, envelope_slitter_wheel: 4,
  };
  return m[t];
}

export function openerCost(t: LetterOpenerType): number {
  const m: Record<LetterOpenerType, number> = {
    classic_blade_metal: 4, electric_battery: 6, plastic_safety: 1, bone_ivory_replica: 8, envelope_slitter_wheel: 3,
  };
  return m[t];
}

export function needsBattery(t: LetterOpenerType): boolean {
  const m: Record<LetterOpenerType, boolean> = {
    classic_blade_metal: false, electric_battery: true, plastic_safety: false, bone_ivory_replica: false, envelope_slitter_wheel: false,
  };
  return m[t];
}

export function deskDisplay(t: LetterOpenerType): boolean {
  const m: Record<LetterOpenerType, boolean> = {
    classic_blade_metal: true, electric_battery: false, plastic_safety: false, bone_ivory_replica: true, envelope_slitter_wheel: false,
  };
  return m[t];
}

export function bladeStyle(t: LetterOpenerType): string {
  const m: Record<LetterOpenerType, string> = {
    classic_blade_metal: "flat_tapered_dull_edge",
    electric_battery: "rotary_motor_shred",
    plastic_safety: "blunt_wedge_pry",
    bone_ivory_replica: "carved_smooth_point",
    envelope_slitter_wheel: "concealed_wheel_slit",
  };
  return m[t];
}

export function bestUse(t: LetterOpenerType): string {
  const m: Record<LetterOpenerType, string> = {
    classic_blade_metal: "executive_desk_daily",
    electric_battery: "high_volume_mailroom",
    plastic_safety: "child_safe_classroom",
    bone_ivory_replica: "decorative_gift_collect",
    envelope_slitter_wheel: "office_quick_batch",
  };
  return m[t];
}

export function letterOpeners(): LetterOpenerType[] {
  return ["classic_blade_metal", "electric_battery", "plastic_safety", "bone_ivory_replica", "envelope_slitter_wheel"];
}
