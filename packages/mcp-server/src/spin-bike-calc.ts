export type SpinBikeType = "friction_felt_pad" | "magnetic_silent" | "direct_drive_pro" | "air_resistance_fan" | "recumbent_back_support";

export function rideSmooth(t: SpinBikeType): number {
  const m: Record<SpinBikeType, number> = {
    friction_felt_pad: 5, magnetic_silent: 8, direct_drive_pro: 10, air_resistance_fan: 6, recumbent_back_support: 7,
  };
  return m[t];
}

export function noiseLevel(t: SpinBikeType): number {
  const m: Record<SpinBikeType, number> = {
    friction_felt_pad: 4, magnetic_silent: 10, direct_drive_pro: 9, air_resistance_fan: 2, recumbent_back_support: 8,
  };
  return m[t];
}

export function resistanceRange(t: SpinBikeType): number {
  const m: Record<SpinBikeType, number> = {
    friction_felt_pad: 6, magnetic_silent: 8, direct_drive_pro: 10, air_resistance_fan: 7, recumbent_back_support: 5,
  };
  return m[t];
}

export function durability(t: SpinBikeType): number {
  const m: Record<SpinBikeType, number> = {
    friction_felt_pad: 5, magnetic_silent: 8, direct_drive_pro: 10, air_resistance_fan: 7, recumbent_back_support: 6,
  };
  return m[t];
}

export function bikeCost(t: SpinBikeType): number {
  const m: Record<SpinBikeType, number> = {
    friction_felt_pad: 2, magnetic_silent: 5, direct_drive_pro: 9, air_resistance_fan: 4, recumbent_back_support: 6,
  };
  return m[t];
}

export function hasScreen(t: SpinBikeType): boolean {
  const m: Record<SpinBikeType, boolean> = {
    friction_felt_pad: false, magnetic_silent: true, direct_drive_pro: true, air_resistance_fan: false, recumbent_back_support: true,
  };
  return m[t];
}

export function appConnected(t: SpinBikeType): boolean {
  const m: Record<SpinBikeType, boolean> = {
    friction_felt_pad: false, magnetic_silent: true, direct_drive_pro: true, air_resistance_fan: false, recumbent_back_support: false,
  };
  return m[t];
}

export function brakeSystem(t: SpinBikeType): string {
  const m: Record<SpinBikeType, string> = {
    friction_felt_pad: "wool_felt_contact_pad",
    magnetic_silent: "eddy_current_magnet",
    direct_drive_pro: "electromagnetic_motor_brake",
    air_resistance_fan: "fan_blade_air_drag",
    recumbent_back_support: "magnetic_belt_drive",
  };
  return m[t];
}

export function bestRider(t: SpinBikeType): string {
  const m: Record<SpinBikeType, string> = {
    friction_felt_pad: "budget_starter_cardio",
    magnetic_silent: "apartment_quiet_workout",
    direct_drive_pro: "serious_cyclist_training",
    air_resistance_fan: "crossfit_full_body",
    recumbent_back_support: "rehab_low_impact_senior",
  };
  return m[t];
}

export function spinBikes(): SpinBikeType[] {
  return ["friction_felt_pad", "magnetic_silent", "direct_drive_pro", "air_resistance_fan", "recumbent_back_support"];
}
