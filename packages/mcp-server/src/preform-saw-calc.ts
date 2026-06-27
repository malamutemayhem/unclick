// Preform saw calculator - lapidary stone cutting/slabbing saws

export type PreformSawType =
  | "slab_saw_large"
  | "trim_saw_small"
  | "wire_saw_contour"
  | "tile_saw_wet"
  | "band_saw_diamond";

const SAW_DATA: Record<
  PreformSawType,
  {
    cutSpeed: number;
    cutAccuracy: number;
    maxThickness: number;
    wasteLow: number;
    cost: number;
    contourCut: boolean;
    coolantFed: boolean;
    bladeType: string;
    bestUse: string;
  }
> = {
  slab_saw_large: {
    cutSpeed: 6,
    cutAccuracy: 7,
    maxThickness: 10,
    wasteLow: 4,
    cost: 8,
    contourCut: false,
    coolantFed: true,
    bladeType: "diamond_sintered_disc",
    bestUse: "rough_slab_cut",
  },
  trim_saw_small: {
    cutSpeed: 8,
    cutAccuracy: 8,
    maxThickness: 4,
    wasteLow: 7,
    cost: 4,
    contourCut: false,
    coolantFed: true,
    bladeType: "thin_diamond_blade",
    bestUse: "preform_trim_shape",
  },
  wire_saw_contour: {
    cutSpeed: 3,
    cutAccuracy: 9,
    maxThickness: 6,
    wasteLow: 9,
    cost: 7,
    contourCut: true,
    coolantFed: true,
    bladeType: "diamond_wire_loop",
    bestUse: "curved_contour_cut",
  },
  tile_saw_wet: {
    cutSpeed: 9,
    cutAccuracy: 5,
    maxThickness: 5,
    wasteLow: 5,
    cost: 3,
    contourCut: false,
    coolantFed: true,
    bladeType: "continuous_rim_disc",
    bestUse: "quick_rough_section",
  },
  band_saw_diamond: {
    cutSpeed: 7,
    cutAccuracy: 7,
    maxThickness: 7,
    wasteLow: 8,
    cost: 9,
    contourCut: true,
    coolantFed: true,
    bladeType: "diamond_band_loop",
    bestUse: "freeform_shape_cut",
  },
};

export function cutSpeed(type: PreformSawType): number {
  return SAW_DATA[type].cutSpeed;
}
export function cutAccuracy(type: PreformSawType): number {
  return SAW_DATA[type].cutAccuracy;
}
export function maxThickness(type: PreformSawType): number {
  return SAW_DATA[type].maxThickness;
}
export function wasteLow(type: PreformSawType): number {
  return SAW_DATA[type].wasteLow;
}
export function sawCost(type: PreformSawType): number {
  return SAW_DATA[type].cost;
}
export function contourCut(type: PreformSawType): boolean {
  return SAW_DATA[type].contourCut;
}
export function coolantFed(type: PreformSawType): boolean {
  return SAW_DATA[type].coolantFed;
}
export function bladeType(type: PreformSawType): string {
  return SAW_DATA[type].bladeType;
}
export function bestUse(type: PreformSawType): string {
  return SAW_DATA[type].bestUse;
}
export function preformSaws(): PreformSawType[] {
  return Object.keys(SAW_DATA) as PreformSawType[];
}
