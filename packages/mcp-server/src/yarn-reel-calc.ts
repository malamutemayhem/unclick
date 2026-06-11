export type YarnReelType =
  | "hand_reel_standard"
  | "swift_umbrella_expand"
  | "floor_stand_large"
  | "tensioned_reel_brake"
  | "motorized_reel_power";

const specs: Record<YarnReelType, {
  windSmooth: number; tensionControl: number; speedWind: number;
  capacity: number; cost: number; powered: boolean; collapsible: boolean;
  frameStyle: string; use: string;
}> = {
  hand_reel_standard: {
    windSmooth: 78, tensionControl: 75, speedWind: 60,
    capacity: 65, cost: 30, powered: false, collapsible: false,
    frameStyle: "wooden_cross_arm", use: "general_yarn_wind",
  },
  swift_umbrella_expand: {
    windSmooth: 82, tensionControl: 72, speedWind: 70,
    capacity: 75, cost: 45, powered: false, collapsible: true,
    frameStyle: "umbrella_spoke_fold", use: "skein_to_ball_wind",
  },
  floor_stand_large: {
    windSmooth: 85, tensionControl: 80, speedWind: 65,
    capacity: 95, cost: 80, powered: false, collapsible: false,
    frameStyle: "vertical_floor_stand", use: "large_batch_wind",
  },
  tensioned_reel_brake: {
    windSmooth: 88, tensionControl: 95, speedWind: 72,
    capacity: 80, cost: 100, powered: false, collapsible: false,
    frameStyle: "brake_tension_drum", use: "even_tension_wind",
  },
  motorized_reel_power: {
    windSmooth: 80, tensionControl: 82, speedWind: 95,
    capacity: 90, cost: 250, powered: true, collapsible: false,
    frameStyle: "motor_drive_spool", use: "production_speed_wind",
  },
};

export function windSmooth(t: YarnReelType): number { return specs[t].windSmooth; }
export function tensionControl(t: YarnReelType): number { return specs[t].tensionControl; }
export function speedWind(t: YarnReelType): number { return specs[t].speedWind; }
export function capacity(t: YarnReelType): number { return specs[t].capacity; }
export function reelCost(t: YarnReelType): number { return specs[t].cost; }
export function powered(t: YarnReelType): boolean { return specs[t].powered; }
export function collapsible(t: YarnReelType): boolean { return specs[t].collapsible; }
export function frameStyle(t: YarnReelType): string { return specs[t].frameStyle; }
export function bestUse(t: YarnReelType): string { return specs[t].use; }
export function yarnReels(): YarnReelType[] { return Object.keys(specs) as YarnReelType[]; }
