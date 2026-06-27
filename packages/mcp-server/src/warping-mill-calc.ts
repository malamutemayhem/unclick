export type WarpingMillType =
  | "vertical_mill_standard"
  | "horizontal_mill_floor"
  | "warping_board_wall"
  | "paddled_mill_sectional"
  | "electric_mill_power";

const specs: Record<WarpingMillType, {
  warpEven: number; speedWind: number; lengthRange: number;
  spaceCompact: number; cost: number; powered: boolean; wallMount: boolean;
  frameStyle: string; use: string;
}> = {
  vertical_mill_standard: {
    warpEven: 88, speedWind: 82, lengthRange: 90,
    spaceCompact: 70, cost: 80, powered: false, wallMount: false,
    frameStyle: "vertical_floor_cage", use: "general_long_warp",
  },
  horizontal_mill_floor: {
    warpEven: 85, speedWind: 80, lengthRange: 92,
    spaceCompact: 65, cost: 90, powered: false, wallMount: false,
    frameStyle: "horizontal_reel_frame", use: "very_long_warp_wind",
  },
  warping_board_wall: {
    warpEven: 80, speedWind: 78, lengthRange: 70,
    spaceCompact: 95, cost: 30, powered: false, wallMount: true,
    frameStyle: "peg_board_wall", use: "short_warp_compact",
  },
  paddled_mill_sectional: {
    warpEven: 92, speedWind: 85, lengthRange: 85,
    spaceCompact: 68, cost: 100, powered: false, wallMount: false,
    frameStyle: "paddle_section_cage", use: "sectional_beam_warp",
  },
  electric_mill_power: {
    warpEven: 85, speedWind: 95, lengthRange: 88,
    spaceCompact: 72, cost: 150, powered: true, wallMount: false,
    frameStyle: "motorized_reel_cage", use: "production_speed_warp",
  },
};

export function warpEven(t: WarpingMillType): number { return specs[t].warpEven; }
export function speedWind(t: WarpingMillType): number { return specs[t].speedWind; }
export function lengthRange(t: WarpingMillType): number { return specs[t].lengthRange; }
export function spaceCompact(t: WarpingMillType): number { return specs[t].spaceCompact; }
export function millCost(t: WarpingMillType): number { return specs[t].cost; }
export function powered(t: WarpingMillType): boolean { return specs[t].powered; }
export function wallMount(t: WarpingMillType): boolean { return specs[t].wallMount; }
export function frameStyle(t: WarpingMillType): string { return specs[t].frameStyle; }
export function bestUse(t: WarpingMillType): string { return specs[t].use; }
export function warpingMills(): WarpingMillType[] { return Object.keys(specs) as WarpingMillType[]; }
