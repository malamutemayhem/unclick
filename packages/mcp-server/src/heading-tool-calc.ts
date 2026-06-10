// Heading tool calculator - blacksmithing bolt/rivet head forming tools

export type HeadingToolType =
  | "bolt_header_plate"
  | "nail_header_block"
  | "rivet_set_cup"
  | "monkey_tool_round"
  | "heading_die_hex";

const HEADING_DATA: Record<
  HeadingToolType,
  {
    headShape: number;
    holdGrip: number;
    sizeRange: number;
    repeatability: number;
    cost: number;
    multiHole: boolean;
    needsStriker: boolean;
    dieProfile: string;
    bestUse: string;
  }
> = {
  bolt_header_plate: {
    headShape: 8,
    holdGrip: 7,
    sizeRange: 8,
    repeatability: 9,
    cost: 5,
    multiHole: true,
    needsStriker: true,
    dieProfile: "hex_square_round",
    bestUse: "bolt_head_forge",
  },
  nail_header_block: {
    headShape: 7,
    holdGrip: 8,
    sizeRange: 6,
    repeatability: 8,
    cost: 3,
    multiHole: true,
    needsStriker: true,
    dieProfile: "tapered_hole_array",
    bestUse: "nail_head_form",
  },
  rivet_set_cup: {
    headShape: 9,
    holdGrip: 6,
    sizeRange: 5,
    repeatability: 9,
    cost: 4,
    multiHole: false,
    needsStriker: true,
    dieProfile: "concave_cup_form",
    bestUse: "rivet_dome_set",
  },
  monkey_tool_round: {
    headShape: 7,
    holdGrip: 5,
    sizeRange: 4,
    repeatability: 7,
    cost: 3,
    multiHole: false,
    needsStriker: true,
    dieProfile: "hollow_round_bore",
    bestUse: "tenon_round_true",
  },
  heading_die_hex: {
    headShape: 10,
    holdGrip: 7,
    sizeRange: 3,
    repeatability: 10,
    cost: 7,
    multiHole: false,
    needsStriker: true,
    dieProfile: "precision_hex_bore",
    bestUse: "hex_bolt_repeat",
  },
};

export function headShapeQuality(type: HeadingToolType): number {
  return HEADING_DATA[type].headShape;
}
export function holdGrip(type: HeadingToolType): number {
  return HEADING_DATA[type].holdGrip;
}
export function sizeRange(type: HeadingToolType): number {
  return HEADING_DATA[type].sizeRange;
}
export function repeatability(type: HeadingToolType): number {
  return HEADING_DATA[type].repeatability;
}
export function headingCost(type: HeadingToolType): number {
  return HEADING_DATA[type].cost;
}
export function multiHole(type: HeadingToolType): boolean {
  return HEADING_DATA[type].multiHole;
}
export function needsStriker(type: HeadingToolType): boolean {
  return HEADING_DATA[type].needsStriker;
}
export function dieProfile(type: HeadingToolType): string {
  return HEADING_DATA[type].dieProfile;
}
export function bestUse(type: HeadingToolType): string {
  return HEADING_DATA[type].bestUse;
}
export function headingTools(): HeadingToolType[] {
  return Object.keys(HEADING_DATA) as HeadingToolType[];
}
