export type TireInflatorType = "corded_12v_car" | "cordless_battery" | "plug_in_ac_120v" | "foot_pump_manual" | "co2_cartridge_quick";

export function inflateSpeed(t: TireInflatorType): number {
  const m: Record<TireInflatorType, number> = {
    corded_12v_car: 7, cordless_battery: 6, plug_in_ac_120v: 9, foot_pump_manual: 2, co2_cartridge_quick: 10,
  };
  return m[t];
}

export function maxPsi(t: TireInflatorType): number {
  const m: Record<TireInflatorType, number> = {
    corded_12v_car: 7, cordless_battery: 6, plug_in_ac_120v: 10, foot_pump_manual: 8, co2_cartridge_quick: 5,
  };
  return m[t];
}

export function portability(t: TireInflatorType): number {
  const m: Record<TireInflatorType, number> = {
    corded_12v_car: 6, cordless_battery: 9, plug_in_ac_120v: 4, foot_pump_manual: 7, co2_cartridge_quick: 10,
  };
  return m[t];
}

export function noiseLevel(t: TireInflatorType): number {
  const m: Record<TireInflatorType, number> = {
    corded_12v_car: 6, cordless_battery: 5, plug_in_ac_120v: 7, foot_pump_manual: 1, co2_cartridge_quick: 2,
  };
  return m[t];
}

export function inflatorCost(t: TireInflatorType): number {
  const m: Record<TireInflatorType, number> = {
    corded_12v_car: 4, cordless_battery: 7, plug_in_ac_120v: 6, foot_pump_manual: 2, co2_cartridge_quick: 3,
  };
  return m[t];
}

export function digitalGauge(t: TireInflatorType): boolean {
  const m: Record<TireInflatorType, boolean> = {
    corded_12v_car: true, cordless_battery: true, plug_in_ac_120v: true, foot_pump_manual: false, co2_cartridge_quick: false,
  };
  return m[t];
}

export function autoShutoff(t: TireInflatorType): boolean {
  const m: Record<TireInflatorType, boolean> = {
    corded_12v_car: true, cordless_battery: true, plug_in_ac_120v: true, foot_pump_manual: false, co2_cartridge_quick: false,
  };
  return m[t];
}

export function powerSource(t: TireInflatorType): string {
  const m: Record<TireInflatorType, string> = {
    corded_12v_car: "cigarette_lighter_12v",
    cordless_battery: "lithium_ion_rechargeable",
    plug_in_ac_120v: "wall_outlet_ac_motor",
    foot_pump_manual: "leg_pedal_piston",
    co2_cartridge_quick: "threaded_co2_cartridge",
  };
  return m[t];
}

export function bestUse(t: TireInflatorType): string {
  const m: Record<TireInflatorType, string> = {
    corded_12v_car: "roadside_car_tire",
    cordless_battery: "bike_ball_multi_use",
    plug_in_ac_120v: "garage_workshop_heavy",
    foot_pump_manual: "camping_no_power",
    co2_cartridge_quick: "bicycle_race_flat_fix",
  };
  return m[t];
}

export function tireInflators(): TireInflatorType[] {
  return ["corded_12v_car", "cordless_battery", "plug_in_ac_120v", "foot_pump_manual", "co2_cartridge_quick"];
}
