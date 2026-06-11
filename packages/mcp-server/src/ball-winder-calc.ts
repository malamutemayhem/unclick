export type BallWinderType =
  | "hand_crank_standard"
  | "electric_motor_fast"
  | "nostepinne_hand"
  | "jumbo_winder_large"
  | "center_pull_cone";

const specs: Record<BallWinderType, {
  windSpeed: number; tensionEven: number; yarnGentle: number;
  sizeCapacity: number; cost: number; powered: boolean; centerPull: boolean;
  windMethod: string; use: string;
}> = {
  hand_crank_standard: {
    windSpeed: 82, tensionEven: 85, yarnGentle: 85,
    sizeCapacity: 80, cost: 20, powered: false, centerPull: true,
    windMethod: "crank_gear_wind", use: "general_ball_wind",
  },
  electric_motor_fast: {
    windSpeed: 95, tensionEven: 82, yarnGentle: 78,
    sizeCapacity: 85, cost: 60, powered: true, centerPull: true,
    windMethod: "motor_drive_wind", use: "fast_bulk_wind",
  },
  nostepinne_hand: {
    windSpeed: 65, tensionEven: 80, yarnGentle: 92,
    sizeCapacity: 70, cost: 8, powered: false, centerPull: true,
    windMethod: "hand_wrap_stick", use: "gentle_portable_wind",
  },
  jumbo_winder_large: {
    windSpeed: 85, tensionEven: 80, yarnGentle: 82,
    sizeCapacity: 95, cost: 40, powered: false, centerPull: true,
    windMethod: "large_gear_wind", use: "bulky_large_skein",
  },
  center_pull_cone: {
    windSpeed: 78, tensionEven: 88, yarnGentle: 85,
    sizeCapacity: 82, cost: 15, powered: false, centerPull: true,
    windMethod: "cone_wrap_wind", use: "neat_cone_shape",
  },
};

export function windSpeed(t: BallWinderType): number { return specs[t].windSpeed; }
export function tensionEven(t: BallWinderType): number { return specs[t].tensionEven; }
export function yarnGentle(t: BallWinderType): number { return specs[t].yarnGentle; }
export function sizeCapacity(t: BallWinderType): number { return specs[t].sizeCapacity; }
export function winderCost(t: BallWinderType): number { return specs[t].cost; }
export function powered(t: BallWinderType): boolean { return specs[t].powered; }
export function centerPull(t: BallWinderType): boolean { return specs[t].centerPull; }
export function windMethod(t: BallWinderType): string { return specs[t].windMethod; }
export function bestUse(t: BallWinderType): string { return specs[t].use; }
export function ballWinders(): BallWinderType[] { return Object.keys(specs) as BallWinderType[]; }
