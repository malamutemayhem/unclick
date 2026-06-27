// Cross peen forge calculator - blacksmithing cross peen hammer tools

export type CrossPeenForgeType =
  | "swedish_pattern_light"
  | "german_pattern_heavy"
  | "japanese_pattern_slim"
  | "french_pattern_wide"
  | "blacksmith_pattern_general";

const PEEN_DATA: Record<
  CrossPeenForgeType,
  {
    spreadControl: number;
    drawForce: number;
    balanceFeel: number;
    faceArea: number;
    cost: number;
    lightWeight: boolean;
    forDrawing: boolean;
    headWeight: string;
    bestUse: string;
  }
> = {
  swedish_pattern_light: {
    spreadControl: 9,
    drawForce: 7,
    balanceFeel: 9,
    faceArea: 7,
    cost: 5,
    lightWeight: true,
    forDrawing: true,
    headWeight: "light_750g",
    bestUse: "precise_draw_spread",
  },
  german_pattern_heavy: {
    spreadControl: 8,
    drawForce: 10,
    balanceFeel: 7,
    faceArea: 9,
    cost: 5,
    lightWeight: false,
    forDrawing: true,
    headWeight: "heavy_1500g",
    bestUse: "heavy_draw_move",
  },
  japanese_pattern_slim: {
    spreadControl: 10,
    drawForce: 6,
    balanceFeel: 9,
    faceArea: 5,
    cost: 7,
    lightWeight: true,
    forDrawing: false,
    headWeight: "slim_500g",
    bestUse: "fine_detail_spread",
  },
  french_pattern_wide: {
    spreadControl: 8,
    drawForce: 8,
    balanceFeel: 8,
    faceArea: 10,
    cost: 5,
    lightWeight: false,
    forDrawing: true,
    headWeight: "wide_1200g",
    bestUse: "wide_spread_flatten",
  },
  blacksmith_pattern_general: {
    spreadControl: 8,
    drawForce: 8,
    balanceFeel: 8,
    faceArea: 8,
    cost: 4,
    lightWeight: false,
    forDrawing: true,
    headWeight: "medium_1000g",
    bestUse: "general_forge_draw",
  },
};

export function spreadControl(type: CrossPeenForgeType): number {
  return PEEN_DATA[type].spreadControl;
}
export function drawForce(type: CrossPeenForgeType): number {
  return PEEN_DATA[type].drawForce;
}
export function balanceFeel(type: CrossPeenForgeType): number {
  return PEEN_DATA[type].balanceFeel;
}
export function faceArea(type: CrossPeenForgeType): number {
  return PEEN_DATA[type].faceArea;
}
export function peenCost(type: CrossPeenForgeType): number {
  return PEEN_DATA[type].cost;
}
export function lightWeight(type: CrossPeenForgeType): boolean {
  return PEEN_DATA[type].lightWeight;
}
export function forDrawing(type: CrossPeenForgeType): boolean {
  return PEEN_DATA[type].forDrawing;
}
export function headWeight(type: CrossPeenForgeType): string {
  return PEEN_DATA[type].headWeight;
}
export function bestUse(type: CrossPeenForgeType): string {
  return PEEN_DATA[type].bestUse;
}
export function crossPeenForges(): CrossPeenForgeType[] {
  return Object.keys(PEEN_DATA) as CrossPeenForgeType[];
}
