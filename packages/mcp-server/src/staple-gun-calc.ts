export type StapleGunType =
  | "manual_squeeze_standard"
  | "electric_trigger_power"
  | "pneumatic_air_heavy"
  | "hammer_tacker_fast"
  | "outward_clinch_flat";

const specs: Record<StapleGunType, {
  drivePower: number; speedFire: number; controlAim: number;
  fatigueEase: number; cost: number; powered: boolean; pneumatic: boolean;
  driveMethod: string; use: string;
}> = {
  manual_squeeze_standard: {
    drivePower: 75, speedFire: 78, controlAim: 88,
    fatigueEase: 70, cost: 25, powered: false, pneumatic: false,
    driveMethod: "spring_lever_drive", use: "general_fabric_attach",
  },
  electric_trigger_power: {
    drivePower: 88, speedFire: 90, controlAim: 82,
    fatigueEase: 90, cost: 60, powered: true, pneumatic: false,
    driveMethod: "motor_piston_drive", use: "heavy_fabric_attach",
  },
  pneumatic_air_heavy: {
    drivePower: 95, speedFire: 95, controlAim: 80,
    fatigueEase: 92, cost: 120, powered: true, pneumatic: true,
    driveMethod: "air_cylinder_drive", use: "production_volume_work",
  },
  hammer_tacker_fast: {
    drivePower: 80, speedFire: 92, controlAim: 65,
    fatigueEase: 75, cost: 15, powered: false, pneumatic: false,
    driveMethod: "swing_impact_drive", use: "insulation_large_area",
  },
  outward_clinch_flat: {
    drivePower: 82, speedFire: 80, controlAim: 85,
    fatigueEase: 72, cost: 35, powered: false, pneumatic: false,
    driveMethod: "outward_bend_clinch", use: "screen_window_attach",
  },
};

export function drivePower(t: StapleGunType): number { return specs[t].drivePower; }
export function speedFire(t: StapleGunType): number { return specs[t].speedFire; }
export function controlAim(t: StapleGunType): number { return specs[t].controlAim; }
export function fatigueEase(t: StapleGunType): number { return specs[t].fatigueEase; }
export function gunCost(t: StapleGunType): number { return specs[t].cost; }
export function powered(t: StapleGunType): boolean { return specs[t].powered; }
export function pneumatic(t: StapleGunType): boolean { return specs[t].pneumatic; }
export function driveMethod(t: StapleGunType): string { return specs[t].driveMethod; }
export function bestUse(t: StapleGunType): string { return specs[t].use; }
export function stapleGuns(): StapleGunType[] { return Object.keys(specs) as StapleGunType[]; }
