export type ChampleveType =
  | "acid_etch_copper"
  | "graver_carve_hand"
  | "rotary_burr_power"
  | "photoetch_film_precise"
  | "stamp_press_repeat";

const specs: Record<ChampleveType, {
  depthEven: number; detailFine: number; speedCut: number;
  repeatAccuracy: number; cost: number; powered: boolean; chemical: boolean;
  cutMethod: string; use: string;
}> = {
  acid_etch_copper: {
    depthEven: 88, detailFine: 85, speedCut: 82,
    repeatAccuracy: 90, cost: 7, powered: false, chemical: true,
    cutMethod: "ferric_chloride_etch", use: "general_copper_recess",
  },
  graver_carve_hand: {
    depthEven: 82, detailFine: 92, speedCut: 65,
    repeatAccuracy: 75, cost: 8, powered: false, chemical: false,
    cutMethod: "hand_graver_push", use: "fine_hand_carved_cell",
  },
  rotary_burr_power: {
    depthEven: 85, detailFine: 80, speedCut: 90,
    repeatAccuracy: 80, cost: 10, powered: true, chemical: false,
    cutMethod: "rotary_carbide_burr", use: "fast_deep_recess",
  },
  photoetch_film_precise: {
    depthEven: 92, detailFine: 95, speedCut: 78,
    repeatAccuracy: 95, cost: 12, powered: false, chemical: true,
    cutMethod: "photoresist_acid_bath", use: "precise_repeat_pattern",
  },
  stamp_press_repeat: {
    depthEven: 90, detailFine: 78, speedCut: 95,
    repeatAccuracy: 92, cost: 15, powered: true, chemical: false,
    cutMethod: "hydraulic_die_stamp", use: "production_batch_cell",
  },
};

export function depthEven(t: ChampleveType): number { return specs[t].depthEven; }
export function detailFine(t: ChampleveType): number { return specs[t].detailFine; }
export function speedCut(t: ChampleveType): number { return specs[t].speedCut; }
export function repeatAccuracy(t: ChampleveType): number { return specs[t].repeatAccuracy; }
export function champCost(t: ChampleveType): number { return specs[t].cost; }
export function powered(t: ChampleveType): boolean { return specs[t].powered; }
export function chemical(t: ChampleveType): boolean { return specs[t].chemical; }
export function cutMethod(t: ChampleveType): string { return specs[t].cutMethod; }
export function bestUse(t: ChampleveType): string { return specs[t].use; }
export function champleves(): ChampleveType[] { return Object.keys(specs) as ChampleveType[]; }
