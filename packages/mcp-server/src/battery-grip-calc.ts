export type BatteryGripType = "oem_vertical_official" | "third_party_budget" | "battery_pack_booster" | "usb_c_power_bank_grip" | "dummy_battery_ac_power";

export function batteryLife(t: BatteryGripType): number {
  const m: Record<BatteryGripType, number> = {
    oem_vertical_official: 9, third_party_budget: 8, battery_pack_booster: 7, usb_c_power_bank_grip: 10, dummy_battery_ac_power: 10,
  };
  return m[t];
}

export function ergonomicGrip(t: BatteryGripType): number {
  const m: Record<BatteryGripType, number> = {
    oem_vertical_official: 10, third_party_budget: 7, battery_pack_booster: 5, usb_c_power_bank_grip: 6, dummy_battery_ac_power: 4,
  };
  return m[t];
}

export function buildQuality(t: BatteryGripType): number {
  const m: Record<BatteryGripType, number> = {
    oem_vertical_official: 10, third_party_budget: 6, battery_pack_booster: 7, usb_c_power_bank_grip: 7, dummy_battery_ac_power: 8,
  };
  return m[t];
}

export function portability(t: BatteryGripType): number {
  const m: Record<BatteryGripType, number> = {
    oem_vertical_official: 5, third_party_budget: 5, battery_pack_booster: 7, usb_c_power_bank_grip: 6, dummy_battery_ac_power: 2,
  };
  return m[t];
}

export function gripCost(t: BatteryGripType): number {
  const m: Record<BatteryGripType, number> = {
    oem_vertical_official: 3, third_party_budget: 1, battery_pack_booster: 2, usb_c_power_bank_grip: 2, dummy_battery_ac_power: 1,
  };
  return m[t];
}

export function verticalShutter(t: BatteryGripType): boolean {
  const m: Record<BatteryGripType, boolean> = {
    oem_vertical_official: true, third_party_budget: true, battery_pack_booster: false, usb_c_power_bank_grip: false, dummy_battery_ac_power: false,
  };
  return m[t];
}

export function unlimitedPower(t: BatteryGripType): boolean {
  const m: Record<BatteryGripType, boolean> = {
    oem_vertical_official: false, third_party_budget: false, battery_pack_booster: false, usb_c_power_bank_grip: false, dummy_battery_ac_power: true,
  };
  return m[t];
}

export function powerSource(t: BatteryGripType): string {
  const m: Record<BatteryGripType, string> = {
    oem_vertical_official: "dual_oem_battery_slot",
    third_party_budget: "dual_generic_battery",
    battery_pack_booster: "internal_li_ion_cell",
    usb_c_power_bank_grip: "usb_c_pd_power_bank",
    dummy_battery_ac_power: "ac_coupler_wall_plug",
  };
  return m[t];
}

export function bestShoot(t: BatteryGripType): string {
  const m: Record<BatteryGripType, string> = {
    oem_vertical_official: "wedding_event_portrait",
    third_party_budget: "hobby_budget_extend",
    battery_pack_booster: "travel_backup_power",
    usb_c_power_bank_grip: "vlog_content_creator",
    dummy_battery_ac_power: "studio_timelapse_long",
  };
  return m[t];
}

export function batteryGrips(): BatteryGripType[] {
  return ["oem_vertical_official", "third_party_budget", "battery_pack_booster", "usb_c_power_bank_grip", "dummy_battery_ac_power"];
}
