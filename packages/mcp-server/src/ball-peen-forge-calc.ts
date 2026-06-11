// Ball peen forge calculator - blacksmithing ball peen hammer tools

export type BallPeenForgeType =
  | "mechanic_standard_medium"
  | "riveting_light_tap"
  | "peening_heavy_forge"
  | "chasing_small_detail"
  | "planishing_polish_face";

const PEEN_DATA: Record<
  BallPeenForgeType,
  {
    rivetSet: number;
    textureControl: number;
    balanceFeel: number;
    peenRadius: number;
    cost: number;
    lightWeight: boolean;
    forRivet: boolean;
    headWeight: string;
    bestUse: string;
  }
> = {
  mechanic_standard_medium: {
    rivetSet: 8,
    textureControl: 7,
    balanceFeel: 8,
    peenRadius: 7,
    cost: 3,
    lightWeight: false,
    forRivet: true,
    headWeight: "medium_450g",
    bestUse: "general_rivet_peen",
  },
  riveting_light_tap: {
    rivetSet: 9,
    textureControl: 8,
    balanceFeel: 9,
    peenRadius: 6,
    cost: 3,
    lightWeight: true,
    forRivet: true,
    headWeight: "light_200g",
    bestUse: "small_rivet_set",
  },
  peening_heavy_forge: {
    rivetSet: 7,
    textureControl: 6,
    balanceFeel: 7,
    peenRadius: 9,
    cost: 5,
    lightWeight: false,
    forRivet: false,
    headWeight: "heavy_900g",
    bestUse: "forge_texture_spread",
  },
  chasing_small_detail: {
    rivetSet: 6,
    textureControl: 10,
    balanceFeel: 9,
    peenRadius: 5,
    cost: 4,
    lightWeight: true,
    forRivet: false,
    headWeight: "tiny_100g",
    bestUse: "detail_chase_emboss",
  },
  planishing_polish_face: {
    rivetSet: 7,
    textureControl: 9,
    balanceFeel: 8,
    peenRadius: 7,
    cost: 5,
    lightWeight: false,
    forRivet: false,
    headWeight: "medium_350g",
    bestUse: "surface_planish_smooth",
  },
};

export function rivetSet(type: BallPeenForgeType): number {
  return PEEN_DATA[type].rivetSet;
}
export function textureControl(type: BallPeenForgeType): number {
  return PEEN_DATA[type].textureControl;
}
export function balanceFeel(type: BallPeenForgeType): number {
  return PEEN_DATA[type].balanceFeel;
}
export function peenRadius(type: BallPeenForgeType): number {
  return PEEN_DATA[type].peenRadius;
}
export function peenCost(type: BallPeenForgeType): number {
  return PEEN_DATA[type].cost;
}
export function lightWeight(type: BallPeenForgeType): boolean {
  return PEEN_DATA[type].lightWeight;
}
export function forRivet(type: BallPeenForgeType): boolean {
  return PEEN_DATA[type].forRivet;
}
export function headWeight(type: BallPeenForgeType): string {
  return PEEN_DATA[type].headWeight;
}
export function bestUse(type: BallPeenForgeType): string {
  return PEEN_DATA[type].bestUse;
}
export function ballPeenForges(): BallPeenForgeType[] {
  return Object.keys(PEEN_DATA) as BallPeenForgeType[];
}
