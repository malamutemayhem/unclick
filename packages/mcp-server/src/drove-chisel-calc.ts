// Drove chisel calculator - stone masonry surface finishing chisels

export type DroveChiselType =
  | "tooth_claw_texture"
  | "boaster_flat_smooth"
  | "claw_tool_line"
  | "frosting_fine_point"
  | "scutch_comb_pattern";

const DROVE_DATA: Record<
  DroveChiselType,
  {
    textureDepth: number;
    finishSmooth: number;
    patternConsist: number;
    coverSpeed: number;
    cost: number;
    toothed: boolean;
    forFinish: boolean;
    toothCount: string;
    bestUse: string;
  }
> = {
  tooth_claw_texture: {
    textureDepth: 8,
    finishSmooth: 5,
    patternConsist: 8,
    coverSpeed: 8,
    cost: 5,
    toothed: true,
    forFinish: false,
    toothCount: "four_tooth_claw",
    bestUse: "rough_texture_face",
  },
  boaster_flat_smooth: {
    textureDepth: 3,
    finishSmooth: 10,
    patternConsist: 9,
    coverSpeed: 7,
    cost: 5,
    toothed: false,
    forFinish: true,
    toothCount: "zero_flat_edge",
    bestUse: "smooth_face_finish",
  },
  claw_tool_line: {
    textureDepth: 6,
    finishSmooth: 7,
    patternConsist: 9,
    coverSpeed: 7,
    cost: 6,
    toothed: true,
    forFinish: false,
    toothCount: "six_tooth_fine",
    bestUse: "parallel_line_dress",
  },
  frosting_fine_point: {
    textureDepth: 4,
    finishSmooth: 8,
    patternConsist: 7,
    coverSpeed: 5,
    cost: 6,
    toothed: false,
    forFinish: true,
    toothCount: "single_point_frost",
    bestUse: "decorative_frost_face",
  },
  scutch_comb_pattern: {
    textureDepth: 7,
    finishSmooth: 6,
    patternConsist: 10,
    coverSpeed: 9,
    cost: 5,
    toothed: true,
    forFinish: false,
    toothCount: "eight_tooth_comb",
    bestUse: "even_comb_texture",
  },
};

export function textureDepth(type: DroveChiselType): number {
  return DROVE_DATA[type].textureDepth;
}
export function finishSmooth(type: DroveChiselType): number {
  return DROVE_DATA[type].finishSmooth;
}
export function patternConsist(type: DroveChiselType): number {
  return DROVE_DATA[type].patternConsist;
}
export function coverSpeed(type: DroveChiselType): number {
  return DROVE_DATA[type].coverSpeed;
}
export function droveCost(type: DroveChiselType): number {
  return DROVE_DATA[type].cost;
}
export function toothed(type: DroveChiselType): boolean {
  return DROVE_DATA[type].toothed;
}
export function forFinish(type: DroveChiselType): boolean {
  return DROVE_DATA[type].forFinish;
}
export function toothCount(type: DroveChiselType): string {
  return DROVE_DATA[type].toothCount;
}
export function bestUse(type: DroveChiselType): string {
  return DROVE_DATA[type].bestUse;
}
export function droveChisels(): DroveChiselType[] {
  return Object.keys(DROVE_DATA) as DroveChiselType[];
}
