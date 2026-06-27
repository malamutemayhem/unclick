export type TrashCanType = "open_top_basic" | "step_pedal_lid" | "sensor_touchless" | "swing_top_push" | "dual_compartment_recycle";

export function odorControl(t: TrashCanType): number {
  const m: Record<TrashCanType, number> = {
    open_top_basic: 2, step_pedal_lid: 8, sensor_touchless: 9, swing_top_push: 6, dual_compartment_recycle: 7,
  };
  return m[t];
}

export function handsFree(t: TrashCanType): number {
  const m: Record<TrashCanType, number> = {
    open_top_basic: 10, step_pedal_lid: 9, sensor_touchless: 10, swing_top_push: 4, dual_compartment_recycle: 5,
  };
  return m[t];
}

export function capacity(t: TrashCanType): number {
  const m: Record<TrashCanType, number> = {
    open_top_basic: 7, step_pedal_lid: 7, sensor_touchless: 6, swing_top_push: 8, dual_compartment_recycle: 10,
  };
  return m[t];
}

export function durability(t: TrashCanType): number {
  const m: Record<TrashCanType, number> = {
    open_top_basic: 8, step_pedal_lid: 7, sensor_touchless: 5, swing_top_push: 9, dual_compartment_recycle: 7,
  };
  return m[t];
}

export function canCost(t: TrashCanType): number {
  const m: Record<TrashCanType, number> = {
    open_top_basic: 1, step_pedal_lid: 4, sensor_touchless: 6, swing_top_push: 2, dual_compartment_recycle: 5,
  };
  return m[t];
}

export function hasLid(t: TrashCanType): boolean {
  const m: Record<TrashCanType, boolean> = {
    open_top_basic: false, step_pedal_lid: true, sensor_touchless: true, swing_top_push: true, dual_compartment_recycle: true,
  };
  return m[t];
}

export function needsBattery(t: TrashCanType): boolean {
  const m: Record<TrashCanType, boolean> = {
    open_top_basic: false, step_pedal_lid: false, sensor_touchless: true, swing_top_push: false, dual_compartment_recycle: false,
  };
  return m[t];
}

export function shellMaterial(t: TrashCanType): string {
  const m: Record<TrashCanType, string> = {
    open_top_basic: "plastic_molded_basic",
    step_pedal_lid: "stainless_steel_fingerprint_resist",
    sensor_touchless: "stainless_steel_sensor_housing",
    swing_top_push: "plastic_durable_swing",
    dual_compartment_recycle: "steel_dual_bin_divider",
  };
  return m[t];
}

export function bestRoom(t: TrashCanType): string {
  const m: Record<TrashCanType, string> = {
    open_top_basic: "garage_workshop_utility",
    step_pedal_lid: "kitchen_bathroom_daily",
    sensor_touchless: "kitchen_hygienic_touchfree",
    swing_top_push: "office_bedroom_casual",
    dual_compartment_recycle: "kitchen_eco_sort_station",
  };
  return m[t];
}

export function trashCans(): TrashCanType[] {
  return ["open_top_basic", "step_pedal_lid", "sensor_touchless", "swing_top_push", "dual_compartment_recycle"];
}
