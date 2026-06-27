// Spring fuller calculator - blacksmithing spring-handled fuller tools

export type SpringFullerType =
  | "top_bottom_pair"
  | "single_spring_half"
  | "guillotine_drop_cut"
  | "radius_set_curved"
  | "combo_fuller_flatter";

const FULLER_DATA: Record<
  SpringFullerType,
  {
    grooveDepth: number;
    speedForge: number;
    controlHit: number;
    sizeRange: number;
    cost: number;
    selfCentering: boolean;
    needsStriker: boolean;
    jawProfile: string;
    bestUse: string;
  }
> = {
  top_bottom_pair: {
    grooveDepth: 8,
    speedForge: 7,
    controlHit: 9,
    sizeRange: 6,
    cost: 6,
    selfCentering: true,
    needsStriker: false,
    jawProfile: "matched_round_groove",
    bestUse: "drawing_out_stock",
  },
  single_spring_half: {
    grooveDepth: 6,
    speedForge: 8,
    controlHit: 7,
    sizeRange: 5,
    cost: 4,
    selfCentering: false,
    needsStriker: false,
    jawProfile: "single_round_die",
    bestUse: "quick_groove_mark",
  },
  guillotine_drop_cut: {
    grooveDepth: 9,
    speedForge: 6,
    controlHit: 8,
    sizeRange: 4,
    cost: 7,
    selfCentering: true,
    needsStriker: true,
    jawProfile: "flat_blade_edge",
    bestUse: "hot_cut_shoulder",
  },
  radius_set_curved: {
    grooveDepth: 7,
    speedForge: 5,
    controlHit: 8,
    sizeRange: 7,
    cost: 8,
    selfCentering: true,
    needsStriker: false,
    jawProfile: "varied_radius_set",
    bestUse: "curved_transition_form",
  },
  combo_fuller_flatter: {
    grooveDepth: 7,
    speedForge: 9,
    controlHit: 7,
    sizeRange: 8,
    cost: 9,
    selfCentering: true,
    needsStriker: false,
    jawProfile: "swap_jaw_insert",
    bestUse: "multi_forge_station",
  },
};

export function grooveDepth(type: SpringFullerType): number {
  return FULLER_DATA[type].grooveDepth;
}
export function speedForge(type: SpringFullerType): number {
  return FULLER_DATA[type].speedForge;
}
export function controlHit(type: SpringFullerType): number {
  return FULLER_DATA[type].controlHit;
}
export function sizeRange(type: SpringFullerType): number {
  return FULLER_DATA[type].sizeRange;
}
export function fullerCost(type: SpringFullerType): number {
  return FULLER_DATA[type].cost;
}
export function selfCentering(type: SpringFullerType): boolean {
  return FULLER_DATA[type].selfCentering;
}
export function needsStriker(type: SpringFullerType): boolean {
  return FULLER_DATA[type].needsStriker;
}
export function jawProfile(type: SpringFullerType): string {
  return FULLER_DATA[type].jawProfile;
}
export function bestUse(type: SpringFullerType): string {
  return FULLER_DATA[type].bestUse;
}
export function springFullers(): SpringFullerType[] {
  return Object.keys(FULLER_DATA) as SpringFullerType[];
}
