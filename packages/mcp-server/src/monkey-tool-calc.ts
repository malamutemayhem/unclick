export type MonkeyToolType =
  | "round_hole_standard"
  | "square_hole_carriage"
  | "hex_hole_bolt"
  | "adjustable_hole_set"
  | "spring_loaded_grip";

const specs: Record<MonkeyToolType, {
  centerTrue: number; finishClean: number; speedWork: number;
  sizeRange: number; cost: number; adjustable: boolean; springLoaded: boolean;
  holeShape: string; use: string;
}> = {
  round_hole_standard: {
    centerTrue: 85, finishClean: 82, speedWork: 80,
    sizeRange: 78, cost: 15, adjustable: false, springLoaded: false,
    holeShape: "round_bore_hole", use: "general_bolt_center",
  },
  square_hole_carriage: {
    centerTrue: 82, finishClean: 80, speedWork: 78,
    sizeRange: 75, cost: 18, adjustable: false, springLoaded: false,
    holeShape: "square_bore_hole", use: "carriage_bolt_set",
  },
  hex_hole_bolt: {
    centerTrue: 88, finishClean: 85, speedWork: 82,
    sizeRange: 72, cost: 20, adjustable: false, springLoaded: false,
    holeShape: "hex_bore_hole", use: "hex_head_set_flush",
  },
  adjustable_hole_set: {
    centerTrue: 80, finishClean: 78, speedWork: 85,
    sizeRange: 95, cost: 35, adjustable: true, springLoaded: false,
    holeShape: "expandable_bore", use: "multi_size_set",
  },
  spring_loaded_grip: {
    centerTrue: 85, finishClean: 82, speedWork: 90,
    sizeRange: 82, cost: 28, adjustable: false, springLoaded: true,
    holeShape: "spring_grip_bore", use: "one_hand_hold_set",
  },
};

export function centerTrue(t: MonkeyToolType): number { return specs[t].centerTrue; }
export function finishClean(t: MonkeyToolType): number { return specs[t].finishClean; }
export function speedWork(t: MonkeyToolType): number { return specs[t].speedWork; }
export function sizeRange(t: MonkeyToolType): number { return specs[t].sizeRange; }
export function toolCost(t: MonkeyToolType): number { return specs[t].cost; }
export function adjustable(t: MonkeyToolType): boolean { return specs[t].adjustable; }
export function springLoaded(t: MonkeyToolType): boolean { return specs[t].springLoaded; }
export function holeShape(t: MonkeyToolType): string { return specs[t].holeShape; }
export function bestUse(t: MonkeyToolType): string { return specs[t].use; }
export function monkeyTools(): MonkeyToolType[] { return Object.keys(specs) as MonkeyToolType[]; }
