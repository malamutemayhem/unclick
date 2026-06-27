// Backing hammer calculator - bookbinding spine rounding tools

export type BackingHammerType =
  | "french_round_face"
  | "german_flat_face"
  | "cobbler_cross_peen"
  | "nylon_soft_tap"
  | "weighted_brass_head";

const HAMMER_DATA: Record<
  BackingHammerType,
  {
    roundControl: number;
    spineShape: number;
    fabricSafe: number;
    weightBalance: number;
    cost: number;
    softFace: boolean;
    forLeather: boolean;
    headMaterial: string;
    bestUse: string;
  }
> = {
  french_round_face: {
    roundControl: 10,
    spineShape: 9,
    fabricSafe: 7,
    weightBalance: 9,
    cost: 7,
    softFace: false,
    forLeather: false,
    headMaterial: "polished_steel",
    bestUse: "fine_spine_round",
  },
  german_flat_face: {
    roundControl: 8,
    spineShape: 8,
    fabricSafe: 7,
    weightBalance: 8,
    cost: 6,
    softFace: false,
    forLeather: false,
    headMaterial: "forged_steel",
    bestUse: "flat_back_form",
  },
  cobbler_cross_peen: {
    roundControl: 7,
    spineShape: 7,
    fabricSafe: 6,
    weightBalance: 7,
    cost: 4,
    softFace: false,
    forLeather: true,
    headMaterial: "carbon_steel",
    bestUse: "general_backing_work",
  },
  nylon_soft_tap: {
    roundControl: 6,
    spineShape: 6,
    fabricSafe: 10,
    weightBalance: 7,
    cost: 3,
    softFace: true,
    forLeather: true,
    headMaterial: "nylon_insert",
    bestUse: "delicate_cover_tap",
  },
  weighted_brass_head: {
    roundControl: 9,
    spineShape: 8,
    fabricSafe: 8,
    weightBalance: 10,
    cost: 8,
    softFace: false,
    forLeather: false,
    headMaterial: "solid_brass",
    bestUse: "precision_joint_form",
  },
};

export function roundControl(type: BackingHammerType): number {
  return HAMMER_DATA[type].roundControl;
}
export function spineShape(type: BackingHammerType): number {
  return HAMMER_DATA[type].spineShape;
}
export function fabricSafe(type: BackingHammerType): number {
  return HAMMER_DATA[type].fabricSafe;
}
export function weightBalance(type: BackingHammerType): number {
  return HAMMER_DATA[type].weightBalance;
}
export function hammerCost(type: BackingHammerType): number {
  return HAMMER_DATA[type].cost;
}
export function softFace(type: BackingHammerType): boolean {
  return HAMMER_DATA[type].softFace;
}
export function forLeather(type: BackingHammerType): boolean {
  return HAMMER_DATA[type].forLeather;
}
export function headMaterial(type: BackingHammerType): string {
  return HAMMER_DATA[type].headMaterial;
}
export function bestUse(type: BackingHammerType): string {
  return HAMMER_DATA[type].bestUse;
}
export function backingHammers(): BackingHammerType[] {
  return Object.keys(HAMMER_DATA) as BackingHammerType[];
}
