// Palm needle sail calculator - sailmaking palm and needle tools

export type PalmNeedleSailType =
  | "roping_palm_heavy"
  | "seaming_palm_light"
  | "sailmaker_needle_tri"
  | "gloving_needle_round"
  | "bolt_rope_needle_curve";

const PALM_DATA: Record<
  PalmNeedleSailType,
  {
    pushForce: number;
    stitchControl: number;
    handComfort: number;
    fabricRange: number;
    cost: number;
    isPalm: boolean;
    forHeavy: boolean;
    needleProfile: string;
    bestUse: string;
  }
> = {
  roping_palm_heavy: {
    pushForce: 10,
    stitchControl: 7,
    handComfort: 7,
    fabricRange: 8,
    cost: 5,
    isPalm: true,
    forHeavy: true,
    needleProfile: "heavy_iron_thimble",
    bestUse: "bolt_rope_sew",
  },
  seaming_palm_light: {
    pushForce: 7,
    stitchControl: 9,
    handComfort: 9,
    fabricRange: 7,
    cost: 4,
    isPalm: true,
    forHeavy: false,
    needleProfile: "light_brass_thimble",
    bestUse: "seam_flat_stitch",
  },
  sailmaker_needle_tri: {
    pushForce: 8,
    stitchControl: 8,
    handComfort: 6,
    fabricRange: 9,
    cost: 3,
    isPalm: false,
    forHeavy: true,
    needleProfile: "triangular_point",
    bestUse: "heavy_canvas_pierce",
  },
  gloving_needle_round: {
    pushForce: 5,
    stitchControl: 10,
    handComfort: 8,
    fabricRange: 5,
    cost: 2,
    isPalm: false,
    forHeavy: false,
    needleProfile: "round_point_slim",
    bestUse: "light_repair_stitch",
  },
  bolt_rope_needle_curve: {
    pushForce: 9,
    stitchControl: 8,
    handComfort: 6,
    fabricRange: 7,
    cost: 4,
    isPalm: false,
    forHeavy: true,
    needleProfile: "curved_heavy_point",
    bestUse: "rope_luff_attach",
  },
};

export function pushForce(type: PalmNeedleSailType): number {
  return PALM_DATA[type].pushForce;
}
export function stitchControl(type: PalmNeedleSailType): number {
  return PALM_DATA[type].stitchControl;
}
export function handComfort(type: PalmNeedleSailType): number {
  return PALM_DATA[type].handComfort;
}
export function fabricRange(type: PalmNeedleSailType): number {
  return PALM_DATA[type].fabricRange;
}
export function palmCost(type: PalmNeedleSailType): number {
  return PALM_DATA[type].cost;
}
export function isPalm(type: PalmNeedleSailType): boolean {
  return PALM_DATA[type].isPalm;
}
export function forHeavy(type: PalmNeedleSailType): boolean {
  return PALM_DATA[type].forHeavy;
}
export function needleProfile(type: PalmNeedleSailType): string {
  return PALM_DATA[type].needleProfile;
}
export function bestUse(type: PalmNeedleSailType): string {
  return PALM_DATA[type].bestUse;
}
export function palmNeedleSails(): PalmNeedleSailType[] {
  return Object.keys(PALM_DATA) as PalmNeedleSailType[];
}
