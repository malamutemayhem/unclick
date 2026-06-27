// Lozenge graver calculator - engraving diamond-section graver tools

export type LozengeGraverType =
  | "standard_diamond_cut"
  | "elongated_narrow_fine"
  | "stub_short_control"
  | "carbide_tip_hard"
  | "flexible_spring_temper";

const LOZENGE_DATA: Record<
  LozengeGraverType,
  {
    cutPrecision: number;
    lineVariation: number;
    edgeRetention: number;
    handleFeel: number;
    cost: number;
    carbideTip: boolean;
    forBrightCut: boolean;
    heelAngle: string;
    bestUse: string;
  }
> = {
  standard_diamond_cut: {
    cutPrecision: 8,
    lineVariation: 7,
    edgeRetention: 7,
    handleFeel: 7,
    cost: 4,
    carbideTip: false,
    forBrightCut: true,
    heelAngle: "forty_five_degree",
    bestUse: "general_bright_cut",
  },
  elongated_narrow_fine: {
    cutPrecision: 9,
    lineVariation: 5,
    edgeRetention: 6,
    handleFeel: 7,
    cost: 5,
    carbideTip: false,
    forBrightCut: true,
    heelAngle: "thirty_degree_acute",
    bestUse: "fine_bright_line",
  },
  stub_short_control: {
    cutPrecision: 7,
    lineVariation: 8,
    edgeRetention: 8,
    handleFeel: 9,
    cost: 4,
    carbideTip: false,
    forBrightCut: false,
    heelAngle: "sixty_degree_wide",
    bestUse: "controlled_scroll_cut",
  },
  carbide_tip_hard: {
    cutPrecision: 8,
    lineVariation: 6,
    edgeRetention: 10,
    handleFeel: 6,
    cost: 8,
    carbideTip: true,
    forBrightCut: true,
    heelAngle: "forty_five_degree",
    bestUse: "hardened_steel_engrave",
  },
  flexible_spring_temper: {
    cutPrecision: 7,
    lineVariation: 9,
    edgeRetention: 5,
    handleFeel: 8,
    cost: 6,
    carbideTip: false,
    forBrightCut: false,
    heelAngle: "variable_flex_angle",
    bestUse: "flowing_script_work",
  },
};

export function cutPrecision(type: LozengeGraverType): number {
  return LOZENGE_DATA[type].cutPrecision;
}
export function lineVariation(type: LozengeGraverType): number {
  return LOZENGE_DATA[type].lineVariation;
}
export function edgeRetention(type: LozengeGraverType): number {
  return LOZENGE_DATA[type].edgeRetention;
}
export function handleFeel(type: LozengeGraverType): number {
  return LOZENGE_DATA[type].handleFeel;
}
export function graverCost(type: LozengeGraverType): number {
  return LOZENGE_DATA[type].cost;
}
export function carbideTip(type: LozengeGraverType): boolean {
  return LOZENGE_DATA[type].carbideTip;
}
export function forBrightCut(type: LozengeGraverType): boolean {
  return LOZENGE_DATA[type].forBrightCut;
}
export function heelAngle(type: LozengeGraverType): string {
  return LOZENGE_DATA[type].heelAngle;
}
export function bestUse(type: LozengeGraverType): string {
  return LOZENGE_DATA[type].bestUse;
}
export function lozengeGravers(): LozengeGraverType[] {
  return Object.keys(LOZENGE_DATA) as LozengeGraverType[];
}
