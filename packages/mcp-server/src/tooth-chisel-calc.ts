// Tooth chisel calculator - stone masonry toothed chisel tools

export type ToothChiselType =
  | "four_tooth_medium"
  | "six_tooth_fine"
  | "two_tooth_coarse"
  | "bush_tooth_texture"
  | "claw_tooth_marble";

const CHISEL_DATA: Record<
  ToothChiselType,
  {
    surfaceEven: number;
    textureControl: number;
    wasteSpeed: number;
    finishQuality: number;
    cost: number;
    forMarble: boolean;
    forTexture: boolean;
    toothCount: string;
    bestUse: string;
  }
> = {
  four_tooth_medium: {
    surfaceEven: 8,
    textureControl: 8,
    wasteSpeed: 7,
    finishQuality: 7,
    cost: 4,
    forMarble: false,
    forTexture: false,
    toothCount: "four_medium_space",
    bestUse: "general_surface_work",
  },
  six_tooth_fine: {
    surfaceEven: 9,
    textureControl: 9,
    wasteSpeed: 5,
    finishQuality: 9,
    cost: 5,
    forMarble: true,
    forTexture: false,
    toothCount: "six_fine_space",
    bestUse: "fine_surface_prep",
  },
  two_tooth_coarse: {
    surfaceEven: 6,
    textureControl: 6,
    wasteSpeed: 9,
    finishQuality: 5,
    cost: 3,
    forMarble: false,
    forTexture: false,
    toothCount: "two_coarse_space",
    bestUse: "heavy_waste_remove",
  },
  bush_tooth_texture: {
    surfaceEven: 7,
    textureControl: 10,
    wasteSpeed: 6,
    finishQuality: 7,
    cost: 6,
    forMarble: false,
    forTexture: true,
    toothCount: "grid_bush_pattern",
    bestUse: "decorative_texture",
  },
  claw_tooth_marble: {
    surfaceEven: 9,
    textureControl: 8,
    wasteSpeed: 6,
    finishQuality: 9,
    cost: 6,
    forMarble: true,
    forTexture: false,
    toothCount: "claw_angled_tooth",
    bestUse: "marble_sculpture_shape",
  },
};

export function surfaceEven(type: ToothChiselType): number {
  return CHISEL_DATA[type].surfaceEven;
}
export function textureControl(type: ToothChiselType): number {
  return CHISEL_DATA[type].textureControl;
}
export function wasteSpeed(type: ToothChiselType): number {
  return CHISEL_DATA[type].wasteSpeed;
}
export function finishQuality(type: ToothChiselType): number {
  return CHISEL_DATA[type].finishQuality;
}
export function chiselCost(type: ToothChiselType): number {
  return CHISEL_DATA[type].cost;
}
export function forMarble(type: ToothChiselType): boolean {
  return CHISEL_DATA[type].forMarble;
}
export function forTexture(type: ToothChiselType): boolean {
  return CHISEL_DATA[type].forTexture;
}
export function toothCount(type: ToothChiselType): string {
  return CHISEL_DATA[type].toothCount;
}
export function bestUse(type: ToothChiselType): string {
  return CHISEL_DATA[type].bestUse;
}
export function toothChisels(): ToothChiselType[] {
  return Object.keys(CHISEL_DATA) as ToothChiselType[];
}
