// Spring swage calculator - blacksmithing spring swage tools

export type SpringSwageType =
  | "round_bar_standard"
  | "square_bar_corner"
  | "hexagon_bar_hex"
  | "v_swage_point"
  | "flat_spring_combo";

const SWAGE_DATA: Record<
  SpringSwageType,
  {
    shapeAccuracy: number;
    speedForm: number;
    sizeRange: number;
    durability: number;
    cost: number;
    springLoaded: boolean;
    forRound: boolean;
    swageProfile: string;
    bestUse: string;
  }
> = {
  round_bar_standard: {
    shapeAccuracy: 9,
    speedForm: 9,
    sizeRange: 7,
    durability: 8,
    cost: 5,
    springLoaded: true,
    forRound: true,
    swageProfile: "half_round_matched",
    bestUse: "round_bar_finish",
  },
  square_bar_corner: {
    shapeAccuracy: 9,
    speedForm: 8,
    sizeRange: 6,
    durability: 8,
    cost: 5,
    springLoaded: true,
    forRound: false,
    swageProfile: "square_matched_pair",
    bestUse: "square_bar_true",
  },
  hexagon_bar_hex: {
    shapeAccuracy: 10,
    speedForm: 8,
    sizeRange: 5,
    durability: 8,
    cost: 6,
    springLoaded: true,
    forRound: false,
    swageProfile: "hex_matched_pair",
    bestUse: "hex_bolt_head_form",
  },
  v_swage_point: {
    shapeAccuracy: 8,
    speedForm: 9,
    sizeRange: 8,
    durability: 7,
    cost: 4,
    springLoaded: true,
    forRound: false,
    swageProfile: "v_groove_point",
    bestUse: "taper_point_start",
  },
  flat_spring_combo: {
    shapeAccuracy: 7,
    speedForm: 10,
    sizeRange: 9,
    durability: 8,
    cost: 5,
    springLoaded: true,
    forRound: false,
    swageProfile: "flat_combo_die",
    bestUse: "general_flatten_size",
  },
};

export function shapeAccuracy(type: SpringSwageType): number {
  return SWAGE_DATA[type].shapeAccuracy;
}
export function speedForm(type: SpringSwageType): number {
  return SWAGE_DATA[type].speedForm;
}
export function sizeRange(type: SpringSwageType): number {
  return SWAGE_DATA[type].sizeRange;
}
export function durability(type: SpringSwageType): number {
  return SWAGE_DATA[type].durability;
}
export function swageCost(type: SpringSwageType): number {
  return SWAGE_DATA[type].cost;
}
export function springLoaded(type: SpringSwageType): boolean {
  return SWAGE_DATA[type].springLoaded;
}
export function forRound(type: SpringSwageType): boolean {
  return SWAGE_DATA[type].forRound;
}
export function swageProfile(type: SpringSwageType): string {
  return SWAGE_DATA[type].swageProfile;
}
export function bestUse(type: SpringSwageType): string {
  return SWAGE_DATA[type].bestUse;
}
export function springSwages(): SpringSwageType[] {
  return Object.keys(SWAGE_DATA) as SpringSwageType[];
}
