export type Derailleur = "mechanical_rim" | "mechanical_clutch" | "electronic_di2" | "electronic_axs" | "single_speed";

export function shiftPrecision(d: Derailleur): number {
  const m: Record<Derailleur, number> = {
    mechanical_rim: 6, mechanical_clutch: 7, electronic_di2: 10, electronic_axs: 10, single_speed: 0,
  };
  return m[d];
}

export function shiftEffort(d: Derailleur): number {
  const m: Record<Derailleur, number> = {
    mechanical_rim: 5, mechanical_clutch: 5, electronic_di2: 9, electronic_axs: 10, single_speed: 0,
  };
  return m[d];
}

export function chainRetention(d: Derailleur): number {
  const m: Record<Derailleur, number> = {
    mechanical_rim: 4, mechanical_clutch: 9, electronic_di2: 8, electronic_axs: 9, single_speed: 10,
  };
  return m[d];
}

export function maintenanceLevel(d: Derailleur): number {
  const m: Record<Derailleur, number> = {
    mechanical_rim: 6, mechanical_clutch: 5, electronic_di2: 3, electronic_axs: 2, single_speed: 1,
  };
  return m[d];
}

export function componentCost(d: Derailleur): number {
  const m: Record<Derailleur, number> = {
    mechanical_rim: 3, mechanical_clutch: 5, electronic_di2: 9, electronic_axs: 10, single_speed: 1,
  };
  return m[d];
}

export function wireless(d: Derailleur): boolean {
  const m: Record<Derailleur, boolean> = {
    mechanical_rim: false, mechanical_clutch: false, electronic_di2: false, electronic_axs: true, single_speed: false,
  };
  return m[d];
}

export function requiresBattery(d: Derailleur): boolean {
  const m: Record<Derailleur, boolean> = {
    mechanical_rim: false, mechanical_clutch: false, electronic_di2: true, electronic_axs: true, single_speed: false,
  };
  return m[d];
}

export function actuation(d: Derailleur): string {
  const m: Record<Derailleur, string> = {
    mechanical_rim: "cable_pull_spring_return", mechanical_clutch: "cable_pull_clutch_damper",
    electronic_di2: "wired_servo_motor_shift", electronic_axs: "wireless_servo_bluetooth",
    single_speed: "no_derailleur_fixed_cog",
  };
  return m[d];
}

export function bestBike(d: Derailleur): string {
  const m: Record<Derailleur, string> = {
    mechanical_rim: "entry_road_commuter", mechanical_clutch: "mountain_gravel_adventure",
    electronic_di2: "road_race_pro_precision", electronic_axs: "high_end_wireless_clean",
    single_speed: "track_urban_fixie",
  };
  return m[d];
}

export function derailleurs(): Derailleur[] {
  return ["mechanical_rim", "mechanical_clutch", "electronic_di2", "electronic_axs", "single_speed"];
}
