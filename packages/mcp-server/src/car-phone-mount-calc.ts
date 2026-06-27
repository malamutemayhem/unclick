export type CarPhoneMountType = "vent_clip_magnetic" | "suction_cup_dash" | "cd_slot_grip" | "wireless_charge_cradle" | "rearview_mirror_arm";

export function holdStrength(t: CarPhoneMountType): number {
  const m: Record<CarPhoneMountType, number> = {
    vent_clip_magnetic: 6, suction_cup_dash: 8, cd_slot_grip: 9, wireless_charge_cradle: 8, rearview_mirror_arm: 7,
  };
  return m[t];
}

export function installEase(t: CarPhoneMountType): number {
  const m: Record<CarPhoneMountType, number> = {
    vent_clip_magnetic: 10, suction_cup_dash: 7, cd_slot_grip: 8, wireless_charge_cradle: 6, rearview_mirror_arm: 5,
  };
  return m[t];
}

export function viewAngle(t: CarPhoneMountType): number {
  const m: Record<CarPhoneMountType, number> = {
    vent_clip_magnetic: 6, suction_cup_dash: 9, cd_slot_grip: 5, wireless_charge_cradle: 8, rearview_mirror_arm: 7,
  };
  return m[t];
}

export function compatibility(t: CarPhoneMountType): number {
  const m: Record<CarPhoneMountType, number> = {
    vent_clip_magnetic: 9, suction_cup_dash: 8, cd_slot_grip: 6, wireless_charge_cradle: 7, rearview_mirror_arm: 8,
  };
  return m[t];
}

export function mountCost(t: CarPhoneMountType): number {
  const m: Record<CarPhoneMountType, number> = {
    vent_clip_magnetic: 3, suction_cup_dash: 4, cd_slot_grip: 3, wireless_charge_cradle: 8, rearview_mirror_arm: 5,
  };
  return m[t];
}

export function chargesPhone(t: CarPhoneMountType): boolean {
  const m: Record<CarPhoneMountType, boolean> = {
    vent_clip_magnetic: false, suction_cup_dash: false, cd_slot_grip: false, wireless_charge_cradle: true, rearview_mirror_arm: false,
  };
  return m[t];
}

export function oneHandUse(t: CarPhoneMountType): boolean {
  const m: Record<CarPhoneMountType, boolean> = {
    vent_clip_magnetic: true, suction_cup_dash: false, cd_slot_grip: false, wireless_charge_cradle: true, rearview_mirror_arm: false,
  };
  return m[t];
}

export function attachMethod(t: CarPhoneMountType): string {
  const m: Record<CarPhoneMountType, string> = {
    vent_clip_magnetic: "neodymium_magnet_clip",
    suction_cup_dash: "gel_suction_lever_lock",
    cd_slot_grip: "expanding_blade_insert",
    wireless_charge_cradle: "auto_grip_qi_coil",
    rearview_mirror_arm: "clamp_gooseneck_arm",
  };
  return m[t];
}

export function bestDriver(t: CarPhoneMountType): string {
  const m: Record<CarPhoneMountType, string> = {
    vent_clip_magnetic: "quick_commute_minimal",
    suction_cup_dash: "rideshare_delivery_nav",
    cd_slot_grip: "older_car_no_vent",
    wireless_charge_cradle: "tech_forward_daily",
    rearview_mirror_arm: "truck_van_high_mount",
  };
  return m[t];
}

export function carPhoneMounts(): CarPhoneMountType[] {
  return ["vent_clip_magnetic", "suction_cup_dash", "cd_slot_grip", "wireless_charge_cradle", "rearview_mirror_arm"];
}
