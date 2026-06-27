// Chattering tool calculator - pottery surface chatter decoration tools

export type ChatteringToolType =
  | "flexible_spring_steel"
  | "bamboo_strip_natural"
  | "hacksaw_blade_repurp"
  | "credit_card_plastic"
  | "serrated_comb_multi";

const CHATTER_DATA: Record<
  ChatteringToolType,
  {
    patternDepth: number;
    patternVariety: number;
    controlEase: number;
    springFlex: number;
    cost: number;
    multiLine: boolean;
    forWetClay: boolean;
    material: string;
    bestUse: string;
  }
> = {
  flexible_spring_steel: {
    patternDepth: 8,
    patternVariety: 7,
    controlEase: 7,
    springFlex: 9,
    cost: 4,
    multiLine: false,
    forWetClay: false,
    material: "tempered_spring_steel",
    bestUse: "classic_chatter_mark",
  },
  bamboo_strip_natural: {
    patternDepth: 6,
    patternVariety: 5,
    controlEase: 8,
    springFlex: 7,
    cost: 1,
    multiLine: false,
    forWetClay: true,
    material: "split_bamboo_strip",
    bestUse: "gentle_texture_soft",
  },
  hacksaw_blade_repurp: {
    patternDepth: 9,
    patternVariety: 6,
    controlEase: 5,
    springFlex: 8,
    cost: 2,
    multiLine: true,
    forWetClay: false,
    material: "recycled_saw_blade",
    bestUse: "deep_bold_chatter",
  },
  credit_card_plastic: {
    patternDepth: 4,
    patternVariety: 4,
    controlEase: 9,
    springFlex: 6,
    cost: 1,
    multiLine: false,
    forWetClay: true,
    material: "rigid_plastic_card",
    bestUse: "beginner_light_chatter",
  },
  serrated_comb_multi: {
    patternDepth: 7,
    patternVariety: 9,
    controlEase: 6,
    springFlex: 5,
    cost: 5,
    multiLine: true,
    forWetClay: true,
    material: "steel_comb_teeth",
    bestUse: "multi_line_pattern",
  },
};

export function patternDepth(type: ChatteringToolType): number {
  return CHATTER_DATA[type].patternDepth;
}
export function patternVariety(type: ChatteringToolType): number {
  return CHATTER_DATA[type].patternVariety;
}
export function controlEase(type: ChatteringToolType): number {
  return CHATTER_DATA[type].controlEase;
}
export function springFlex(type: ChatteringToolType): number {
  return CHATTER_DATA[type].springFlex;
}
export function chatterCost(type: ChatteringToolType): number {
  return CHATTER_DATA[type].cost;
}
export function multiLine(type: ChatteringToolType): boolean {
  return CHATTER_DATA[type].multiLine;
}
export function forWetClay(type: ChatteringToolType): boolean {
  return CHATTER_DATA[type].forWetClay;
}
export function material(type: ChatteringToolType): string {
  return CHATTER_DATA[type].material;
}
export function bestUse(type: ChatteringToolType): string {
  return CHATTER_DATA[type].bestUse;
}
export function chatteringTools(): ChatteringToolType[] {
  return Object.keys(CHATTER_DATA) as ChatteringToolType[];
}
