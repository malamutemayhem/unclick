// Fuller forge calculator - blacksmithing fuller tools

export type FullerForgeType =
  | "top_fuller_hand"
  | "bottom_fuller_hardy"
  | "spring_fuller_combo"
  | "half_round_fuller"
  | "guillotine_fuller_set";

const FULLER_DATA: Record<
  FullerForgeType,
  {
    grooveDepth: number;
    spreadControl: number;
    speedWork: number;
    radiusRange: number;
    cost: number;
    topTool: boolean;
    springAction: boolean;
    fullerProfile: string;
    bestUse: string;
  }
> = {
  top_fuller_hand: {
    grooveDepth: 8,
    spreadControl: 8,
    speedWork: 7,
    radiusRange: 7,
    cost: 3,
    topTool: true,
    springAction: false,
    fullerProfile: "half_round_top",
    bestUse: "groove_shoulder_cut",
  },
  bottom_fuller_hardy: {
    grooveDepth: 8,
    spreadControl: 7,
    speedWork: 8,
    radiusRange: 6,
    cost: 3,
    topTool: false,
    springAction: false,
    fullerProfile: "half_round_hardy",
    bestUse: "bottom_groove_set",
  },
  spring_fuller_combo: {
    grooveDepth: 9,
    spreadControl: 9,
    speedWork: 10,
    radiusRange: 7,
    cost: 6,
    topTool: false,
    springAction: true,
    fullerProfile: "matched_pair_spring",
    bestUse: "fast_shoulder_work",
  },
  half_round_fuller: {
    grooveDepth: 7,
    spreadControl: 8,
    speedWork: 7,
    radiusRange: 9,
    cost: 4,
    topTool: true,
    springAction: false,
    fullerProfile: "varied_radius_set",
    bestUse: "decorative_groove",
  },
  guillotine_fuller_set: {
    grooveDepth: 10,
    spreadControl: 10,
    speedWork: 9,
    radiusRange: 8,
    cost: 8,
    topTool: false,
    springAction: false,
    fullerProfile: "guillotine_guide",
    bestUse: "production_repeat",
  },
};

export function grooveDepth(type: FullerForgeType): number {
  return FULLER_DATA[type].grooveDepth;
}
export function spreadControl(type: FullerForgeType): number {
  return FULLER_DATA[type].spreadControl;
}
export function speedWork(type: FullerForgeType): number {
  return FULLER_DATA[type].speedWork;
}
export function radiusRange(type: FullerForgeType): number {
  return FULLER_DATA[type].radiusRange;
}
export function fullerCost(type: FullerForgeType): number {
  return FULLER_DATA[type].cost;
}
export function topTool(type: FullerForgeType): boolean {
  return FULLER_DATA[type].topTool;
}
export function springAction(type: FullerForgeType): boolean {
  return FULLER_DATA[type].springAction;
}
export function fullerProfile(type: FullerForgeType): string {
  return FULLER_DATA[type].fullerProfile;
}
export function bestUse(type: FullerForgeType): string {
  return FULLER_DATA[type].bestUse;
}
export function fullerForges(): FullerForgeType[] {
  return Object.keys(FULLER_DATA) as FullerForgeType[];
}
