export type ScreenFrameType =
  | "aluminum_frame_light"
  | "wood_frame_budget"
  | "retensionable_frame_pro"
  | "roller_frame_quick"
  | "newman_frame_precision";

const specs: Record<ScreenFrameType, {
  tensionHold: number; durability: number; setupSpeed: number;
  sizeRange: number; cost: number; retensionable: boolean; wooden: boolean;
  cornerStyle: string; use: string;
}> = {
  aluminum_frame_light: {
    tensionHold: 88, durability: 90, setupSpeed: 80,
    sizeRange: 85, cost: 8, retensionable: false, wooden: false,
    cornerStyle: "welded_aluminum_corner", use: "general_screen_print",
  },
  wood_frame_budget: {
    tensionHold: 75, durability: 72, setupSpeed: 85,
    sizeRange: 78, cost: 4, retensionable: false, wooden: true,
    cornerStyle: "stapled_wood_joint", use: "beginner_practice_frame",
  },
  retensionable_frame_pro: {
    tensionHold: 95, durability: 92, setupSpeed: 70,
    sizeRange: 88, cost: 12, retensionable: true, wooden: false,
    cornerStyle: "mechanical_tension_bolt", use: "professional_fine_detail",
  },
  roller_frame_quick: {
    tensionHold: 82, durability: 80, setupSpeed: 92,
    sizeRange: 80, cost: 9, retensionable: true, wooden: false,
    cornerStyle: "roller_bar_snap", use: "quick_change_production",
  },
  newman_frame_precision: {
    tensionHold: 92, durability: 88, setupSpeed: 75,
    sizeRange: 90, cost: 14, retensionable: true, wooden: false,
    cornerStyle: "precision_clamp_rail", use: "halftone_process_print",
  },
};

export function tensionHold(t: ScreenFrameType): number { return specs[t].tensionHold; }
export function durability(t: ScreenFrameType): number { return specs[t].durability; }
export function setupSpeed(t: ScreenFrameType): number { return specs[t].setupSpeed; }
export function sizeRange(t: ScreenFrameType): number { return specs[t].sizeRange; }
export function frameCost(t: ScreenFrameType): number { return specs[t].cost; }
export function retensionable(t: ScreenFrameType): boolean { return specs[t].retensionable; }
export function wooden(t: ScreenFrameType): boolean { return specs[t].wooden; }
export function cornerStyle(t: ScreenFrameType): string { return specs[t].cornerStyle; }
export function bestUse(t: ScreenFrameType): string { return specs[t].use; }
export function screenFrames(): ScreenFrameType[] { return Object.keys(specs) as ScreenFrameType[]; }
