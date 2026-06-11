export type SwiftYarnType =
  | "umbrella_swift_standard"
  | "squirrel_cage_floor"
  | "amish_style_table"
  | "vertical_swift_compact"
  | "electric_swift_motor";

const specs: Record<SwiftYarnType, {
  windSmooth: number; adjustRange: number; stability: number;
  spaceCompact: number; cost: number; powered: boolean; floorStand: boolean;
  mountStyle: string; use: string;
}> = {
  umbrella_swift_standard: {
    windSmooth: 85, adjustRange: 88, stability: 82,
    spaceCompact: 78, cost: 25, powered: false, floorStand: false,
    mountStyle: "clamp_table_mount", use: "general_skein_wind",
  },
  squirrel_cage_floor: {
    windSmooth: 82, adjustRange: 80, stability: 92,
    spaceCompact: 65, cost: 45, powered: false, floorStand: true,
    mountStyle: "floor_stand_cage", use: "heavy_skein_floor",
  },
  amish_style_table: {
    windSmooth: 88, adjustRange: 82, stability: 85,
    spaceCompact: 75, cost: 35, powered: false, floorStand: false,
    mountStyle: "flat_table_sit", use: "traditional_table_wind",
  },
  vertical_swift_compact: {
    windSmooth: 80, adjustRange: 78, stability: 80,
    spaceCompact: 92, cost: 20, powered: false, floorStand: false,
    mountStyle: "vertical_pole_mount", use: "small_space_wind",
  },
  electric_swift_motor: {
    windSmooth: 92, adjustRange: 85, stability: 88,
    spaceCompact: 70, cost: 80, powered: true, floorStand: false,
    mountStyle: "motorized_table_mount", use: "fast_powered_wind",
  },
};

export function windSmooth(t: SwiftYarnType): number { return specs[t].windSmooth; }
export function adjustRange(t: SwiftYarnType): number { return specs[t].adjustRange; }
export function stability(t: SwiftYarnType): number { return specs[t].stability; }
export function spaceCompact(t: SwiftYarnType): number { return specs[t].spaceCompact; }
export function swiftCost(t: SwiftYarnType): number { return specs[t].cost; }
export function powered(t: SwiftYarnType): boolean { return specs[t].powered; }
export function floorStand(t: SwiftYarnType): boolean { return specs[t].floorStand; }
export function mountStyle(t: SwiftYarnType): string { return specs[t].mountStyle; }
export function bestUse(t: SwiftYarnType): string { return specs[t].use; }
export function swiftYarns(): SwiftYarnType[] { return Object.keys(specs) as SwiftYarnType[]; }
