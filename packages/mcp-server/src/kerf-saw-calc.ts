// Kerf saw calculator - lapidary precision kerf/thin-cut saws

export type KerfSawType =
  | "thin_kerf_diamond"
  | "notch_kerf_segment"
  | "micro_kerf_wafer"
  | "adjustable_kerf_set"
  | "continuous_rim_zero";

const KERF_DATA: Record<
  KerfSawType,
  {
    cutWidth: number;
    materialSave: number;
    cutSmooth: number;
    bladeLife: number;
    cost: number;
    adjustableWidth: boolean;
    forWafer: boolean;
    rimStyle: string;
    bestUse: string;
  }
> = {
  thin_kerf_diamond: {
    cutWidth: 8,
    materialSave: 8,
    cutSmooth: 7,
    bladeLife: 6,
    cost: 5,
    adjustableWidth: false,
    forWafer: false,
    rimStyle: "sintered_diamond_edge",
    bestUse: "standard_thin_slab",
  },
  notch_kerf_segment: {
    cutWidth: 5,
    materialSave: 5,
    cutSmooth: 6,
    bladeLife: 9,
    cost: 4,
    adjustableWidth: false,
    forWafer: false,
    rimStyle: "segmented_notch_rim",
    bestUse: "hard_stone_rough",
  },
  micro_kerf_wafer: {
    cutWidth: 10,
    materialSave: 10,
    cutSmooth: 9,
    bladeLife: 4,
    cost: 8,
    adjustableWidth: false,
    forWafer: true,
    rimStyle: "ultra_thin_bond",
    bestUse: "precious_wafer_slice",
  },
  adjustable_kerf_set: {
    cutWidth: 6,
    materialSave: 6,
    cutSmooth: 7,
    bladeLife: 7,
    cost: 7,
    adjustableWidth: true,
    forWafer: false,
    rimStyle: "stacked_shim_set",
    bestUse: "variable_width_slot",
  },
  continuous_rim_zero: {
    cutWidth: 7,
    materialSave: 7,
    cutSmooth: 9,
    bladeLife: 5,
    cost: 6,
    adjustableWidth: false,
    forWafer: false,
    rimStyle: "continuous_diamond_rim",
    bestUse: "smooth_finish_cut",
  },
};

export function cutWidth(type: KerfSawType): number {
  return KERF_DATA[type].cutWidth;
}
export function materialSave(type: KerfSawType): number {
  return KERF_DATA[type].materialSave;
}
export function cutSmooth(type: KerfSawType): number {
  return KERF_DATA[type].cutSmooth;
}
export function bladeLife(type: KerfSawType): number {
  return KERF_DATA[type].bladeLife;
}
export function kerfCost(type: KerfSawType): number {
  return KERF_DATA[type].cost;
}
export function adjustableWidth(type: KerfSawType): boolean {
  return KERF_DATA[type].adjustableWidth;
}
export function forWafer(type: KerfSawType): boolean {
  return KERF_DATA[type].forWafer;
}
export function rimStyle(type: KerfSawType): string {
  return KERF_DATA[type].rimStyle;
}
export function bestUse(type: KerfSawType): string {
  return KERF_DATA[type].bestUse;
}
export function kerfSaws(): KerfSawType[] {
  return Object.keys(KERF_DATA) as KerfSawType[];
}
