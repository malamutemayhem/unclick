export type TowerFanType = "oscillating_blade" | "bladeless_air_multiply" | "evaporative_cool" | "combo_heater_fan" | "usb_desk_mini";

export function airflow(t: TowerFanType): number {
  const m: Record<TowerFanType, number> = {
    oscillating_blade: 7, bladeless_air_multiply: 8, evaporative_cool: 6, combo_heater_fan: 5, usb_desk_mini: 3,
  };
  return m[t];
}

export function noiseLevel(t: TowerFanType): number {
  const m: Record<TowerFanType, number> = {
    oscillating_blade: 5, bladeless_air_multiply: 9, evaporative_cool: 4, combo_heater_fan: 6, usb_desk_mini: 10,
  };
  return m[t];
}

export function coolingEffect(t: TowerFanType): number {
  const m: Record<TowerFanType, number> = {
    oscillating_blade: 6, bladeless_air_multiply: 7, evaporative_cool: 10, combo_heater_fan: 5, usb_desk_mini: 3,
  };
  return m[t];
}

export function safetyChild(t: TowerFanType): number {
  const m: Record<TowerFanType, number> = {
    oscillating_blade: 5, bladeless_air_multiply: 10, evaporative_cool: 7, combo_heater_fan: 6, usb_desk_mini: 9,
  };
  return m[t];
}

export function fanCost(t: TowerFanType): number {
  const m: Record<TowerFanType, number> = {
    oscillating_blade: 3, bladeless_air_multiply: 9, evaporative_cool: 5, combo_heater_fan: 6, usb_desk_mini: 2,
  };
  return m[t];
}

export function hasRemote(t: TowerFanType): boolean {
  const m: Record<TowerFanType, boolean> = {
    oscillating_blade: true, bladeless_air_multiply: true, evaporative_cool: true, combo_heater_fan: true, usb_desk_mini: false,
  };
  return m[t];
}

export function oscillates(t: TowerFanType): boolean {
  const m: Record<TowerFanType, boolean> = {
    oscillating_blade: true, bladeless_air_multiply: true, evaporative_cool: false, combo_heater_fan: true, usb_desk_mini: false,
  };
  return m[t];
}

export function motorType(t: TowerFanType): string {
  const m: Record<TowerFanType, string> = {
    oscillating_blade: "ac_motor_cross_flow",
    bladeless_air_multiply: "brushless_dc_impeller",
    evaporative_cool: "centrifugal_water_pad",
    combo_heater_fan: "ptc_ceramic_dual_mode",
    usb_desk_mini: "brushless_dc_mini",
  };
  return m[t];
}

export function bestRoom(t: TowerFanType): string {
  const m: Record<TowerFanType, string> = {
    oscillating_blade: "living_room_general",
    bladeless_air_multiply: "nursery_child_safe",
    evaporative_cool: "dry_climate_patio",
    combo_heater_fan: "year_round_bedroom",
    usb_desk_mini: "office_desk_personal",
  };
  return m[t];
}

export function towerFans(): TowerFanType[] {
  return ["oscillating_blade", "bladeless_air_multiply", "evaporative_cool", "combo_heater_fan", "usb_desk_mini"];
}
