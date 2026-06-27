// Burin engraving calculator - engraving burin/graver point tools

export type BurinEngraveType =
  | "square_point_line"
  | "lozenge_diamond_fine"
  | "round_belly_shade"
  | "flat_face_letter"
  | "knife_point_hair";

const BURIN_DATA: Record<
  BurinEngraveType,
  {
    lineControl: number;
    shadeAbility: number;
    durability: number;
    versatility: number;
    cost: number;
    forShading: boolean;
    needsMushroom: boolean;
    crossSection: string;
    bestUse: string;
  }
> = {
  square_point_line: {
    lineControl: 8,
    shadeAbility: 5,
    durability: 8,
    versatility: 9,
    cost: 4,
    forShading: false,
    needsMushroom: true,
    crossSection: "square_45_degree",
    bestUse: "general_line_work",
  },
  lozenge_diamond_fine: {
    lineControl: 9,
    shadeAbility: 6,
    durability: 6,
    versatility: 7,
    cost: 5,
    forShading: false,
    needsMushroom: true,
    crossSection: "diamond_lozenge_thin",
    bestUse: "fine_detail_cut",
  },
  round_belly_shade: {
    lineControl: 6,
    shadeAbility: 10,
    durability: 7,
    versatility: 6,
    cost: 6,
    forShading: true,
    needsMushroom: true,
    crossSection: "round_curved_belly",
    bestUse: "tonal_shade_fill",
  },
  flat_face_letter: {
    lineControl: 7,
    shadeAbility: 4,
    durability: 9,
    versatility: 8,
    cost: 4,
    forShading: false,
    needsMushroom: false,
    crossSection: "flat_wide_face",
    bestUse: "letter_script_cut",
  },
  knife_point_hair: {
    lineControl: 10,
    shadeAbility: 3,
    durability: 5,
    versatility: 5,
    cost: 5,
    forShading: false,
    needsMushroom: true,
    crossSection: "knife_thin_edge",
    bestUse: "hairline_trace_cut",
  },
};

export function lineControl(type: BurinEngraveType): number {
  return BURIN_DATA[type].lineControl;
}
export function shadeAbility(type: BurinEngraveType): number {
  return BURIN_DATA[type].shadeAbility;
}
export function durability(type: BurinEngraveType): number {
  return BURIN_DATA[type].durability;
}
export function versatility(type: BurinEngraveType): number {
  return BURIN_DATA[type].versatility;
}
export function burinCost(type: BurinEngraveType): number {
  return BURIN_DATA[type].cost;
}
export function forShading(type: BurinEngraveType): boolean {
  return BURIN_DATA[type].forShading;
}
export function needsMushroom(type: BurinEngraveType): boolean {
  return BURIN_DATA[type].needsMushroom;
}
export function crossSection(type: BurinEngraveType): string {
  return BURIN_DATA[type].crossSection;
}
export function bestUse(type: BurinEngraveType): string {
  return BURIN_DATA[type].bestUse;
}
export function burinEngravers(): BurinEngraveType[] {
  return Object.keys(BURIN_DATA) as BurinEngraveType[];
}
