export type CarJackType = "scissor_compact" | "hydraulic_floor" | "bottle_vertical" | "hi_lift_farm" | "pneumatic_air_bag";

export function liftCapacity(t: CarJackType): number {
  const m: Record<CarJackType, number> = {
    scissor_compact: 4, hydraulic_floor: 8, bottle_vertical: 9, hi_lift_farm: 7, pneumatic_air_bag: 6,
  };
  return m[t];
}

export function liftHeight(t: CarJackType): number {
  const m: Record<CarJackType, number> = {
    scissor_compact: 4, hydraulic_floor: 7, bottle_vertical: 5, hi_lift_farm: 10, pneumatic_air_bag: 6,
  };
  return m[t];
}

export function liftSpeed(t: CarJackType): number {
  const m: Record<CarJackType, number> = {
    scissor_compact: 3, hydraulic_floor: 8, bottle_vertical: 6, hi_lift_farm: 5, pneumatic_air_bag: 10,
  };
  return m[t];
}

export function portabilityScore(t: CarJackType): number {
  const m: Record<CarJackType, number> = {
    scissor_compact: 10, hydraulic_floor: 3, bottle_vertical: 7, hi_lift_farm: 4, pneumatic_air_bag: 8,
  };
  return m[t];
}

export function jackCost(t: CarJackType): number {
  const m: Record<CarJackType, number> = {
    scissor_compact: 1, hydraulic_floor: 6, bottle_vertical: 3, hi_lift_farm: 7, pneumatic_air_bag: 8,
  };
  return m[t];
}

export function safetyLock(t: CarJackType): boolean {
  const m: Record<CarJackType, boolean> = {
    scissor_compact: false, hydraulic_floor: true, bottle_vertical: true, hi_lift_farm: true, pneumatic_air_bag: false,
  };
  return m[t];
}

export function needsPower(t: CarJackType): boolean {
  const m: Record<CarJackType, boolean> = {
    scissor_compact: false, hydraulic_floor: false, bottle_vertical: false, hi_lift_farm: false, pneumatic_air_bag: true,
  };
  return m[t];
}

export function liftMechanism(t: CarJackType): string {
  const m: Record<CarJackType, string> = {
    scissor_compact: "screw_thread_manual_crank", hydraulic_floor: "hydraulic_piston_pump_handle",
    bottle_vertical: "hydraulic_vertical_ram", hi_lift_farm: "ratchet_bar_pin_lift",
    pneumatic_air_bag: "compressed_air_exhaust",
  };
  return m[t];
}

export function bestVehicle(t: CarJackType): string {
  const m: Record<CarJackType, string> = {
    scissor_compact: "sedan_trunk_emergency", hydraulic_floor: "garage_home_mechanic",
    bottle_vertical: "truck_suv_heavy_load", hi_lift_farm: "offroad_jeep_farm_vehicle",
    pneumatic_air_bag: "quick_tire_change_roadside",
  };
  return m[t];
}

export function carJacks(): CarJackType[] {
  return ["scissor_compact", "hydraulic_floor", "bottle_vertical", "hi_lift_farm", "pneumatic_air_bag"];
}
