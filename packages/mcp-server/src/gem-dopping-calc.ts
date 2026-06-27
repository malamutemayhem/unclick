// Gem dopping calculator - lapidary stone mounting/holding tools

export type GemDoppingType =
  | "wax_dop_stick"
  | "epoxy_dop_bond"
  | "transfer_jig_align"
  | "vacuum_chuck_hold"
  | "cyanoacrylate_instant";

const DOP_DATA: Record<
  GemDoppingType,
  {
    holdStrength: number;
    alignAccuracy: number;
    removeEase: number;
    reuseCount: number;
    cost: number;
    heatNeeded: boolean;
    adjustable: boolean;
    bondAgent: string;
    bestUse: string;
  }
> = {
  wax_dop_stick: {
    holdStrength: 6,
    alignAccuracy: 6,
    removeEase: 9,
    reuseCount: 8,
    cost: 2,
    heatNeeded: true,
    adjustable: true,
    bondAgent: "lapidary_dop_wax",
    bestUse: "standard_cab_hold",
  },
  epoxy_dop_bond: {
    holdStrength: 9,
    alignAccuracy: 7,
    removeEase: 4,
    reuseCount: 3,
    cost: 4,
    heatNeeded: false,
    adjustable: false,
    bondAgent: "two_part_epoxy",
    bestUse: "heavy_grind_hold",
  },
  transfer_jig_align: {
    holdStrength: 7,
    alignAccuracy: 10,
    removeEase: 7,
    reuseCount: 10,
    cost: 7,
    heatNeeded: true,
    adjustable: true,
    bondAgent: "wax_plus_jig",
    bestUse: "precise_facet_transfer",
  },
  vacuum_chuck_hold: {
    holdStrength: 8,
    alignAccuracy: 8,
    removeEase: 10,
    reuseCount: 10,
    cost: 9,
    heatNeeded: false,
    adjustable: true,
    bondAgent: "vacuum_suction_seal",
    bestUse: "flat_polish_hold",
  },
  cyanoacrylate_instant: {
    holdStrength: 8,
    alignAccuracy: 5,
    removeEase: 5,
    reuseCount: 4,
    cost: 3,
    heatNeeded: false,
    adjustable: false,
    bondAgent: "super_glue_gel",
    bestUse: "quick_temp_bond",
  },
};

export function holdStrength(type: GemDoppingType): number {
  return DOP_DATA[type].holdStrength;
}
export function alignAccuracy(type: GemDoppingType): number {
  return DOP_DATA[type].alignAccuracy;
}
export function removeEase(type: GemDoppingType): number {
  return DOP_DATA[type].removeEase;
}
export function reuseCount(type: GemDoppingType): number {
  return DOP_DATA[type].reuseCount;
}
export function dopCost(type: GemDoppingType): number {
  return DOP_DATA[type].cost;
}
export function heatNeeded(type: GemDoppingType): boolean {
  return DOP_DATA[type].heatNeeded;
}
export function adjustable(type: GemDoppingType): boolean {
  return DOP_DATA[type].adjustable;
}
export function bondAgent(type: GemDoppingType): string {
  return DOP_DATA[type].bondAgent;
}
export function bestUse(type: GemDoppingType): string {
  return DOP_DATA[type].bestUse;
}
export function gemDoppings(): GemDoppingType[] {
  return Object.keys(DOP_DATA) as GemDoppingType[];
}
