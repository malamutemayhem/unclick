export type TapestryFrameType =
  | "lap_frame_portable"
  | "floor_frame_large"
  | "adjustable_frame_tilt"
  | "scroll_frame_long"
  | "stretcher_bar_simple";

const specs: Record<TapestryFrameType, {
  tensionEven: number; sizeRange: number; portability: number;
  adjustAngle: number; cost: number; tilting: boolean; scrollable: boolean;
  frameStyle: string; use: string;
}> = {
  lap_frame_portable: {
    tensionEven: 78, sizeRange: 72, portability: 95,
    adjustAngle: 70, cost: 15, tilting: false, scrollable: false,
    frameStyle: "small_lap_rest", use: "portable_lap_stitch",
  },
  floor_frame_large: {
    tensionEven: 92, sizeRange: 95, portability: 55,
    adjustAngle: 85, cost: 80, tilting: true, scrollable: false,
    frameStyle: "floor_stand_frame", use: "large_wall_tapestry",
  },
  adjustable_frame_tilt: {
    tensionEven: 85, sizeRange: 82, portability: 75,
    adjustAngle: 95, cost: 45, tilting: true, scrollable: false,
    frameStyle: "tilt_table_frame", use: "ergonomic_angle_stitch",
  },
  scroll_frame_long: {
    tensionEven: 88, sizeRange: 88, portability: 70,
    adjustAngle: 78, cost: 35, tilting: false, scrollable: true,
    frameStyle: "scroll_rod_frame", use: "long_piece_scroll",
  },
  stretcher_bar_simple: {
    tensionEven: 82, sizeRange: 78, portability: 88,
    adjustAngle: 65, cost: 10, tilting: false, scrollable: false,
    frameStyle: "wooden_bar_stretch", use: "simple_canvas_stretch",
  },
};

export function tensionEven(t: TapestryFrameType): number { return specs[t].tensionEven; }
export function sizeRange(t: TapestryFrameType): number { return specs[t].sizeRange; }
export function portability(t: TapestryFrameType): number { return specs[t].portability; }
export function adjustAngle(t: TapestryFrameType): number { return specs[t].adjustAngle; }
export function frameCost(t: TapestryFrameType): number { return specs[t].cost; }
export function tilting(t: TapestryFrameType): boolean { return specs[t].tilting; }
export function scrollable(t: TapestryFrameType): boolean { return specs[t].scrollable; }
export function frameStyle(t: TapestryFrameType): string { return specs[t].frameStyle; }
export function bestUse(t: TapestryFrameType): string { return specs[t].use; }
export function tapestryFrames(): TapestryFrameType[] { return Object.keys(specs) as TapestryFrameType[]; }
