export type ScabbleHammerType =
  | "single_point_standard"
  | "double_point_fast"
  | "broad_face_flat"
  | "carbide_point_hard"
  | "pneumatic_scabble_power";

const specs: Record<ScabbleHammerType, {
  wasteRemove: number; surfaceRough: number; speedWork: number;
  controlAim: number; cost: number; powered: boolean; doublePoint: boolean;
  headProfile: string; use: string;
}> = {
  single_point_standard: {
    wasteRemove: 75, surfaceRough: 70, speedWork: 65,
    controlAim: 85, cost: 40, powered: false, doublePoint: false,
    headProfile: "single_pyramid_point", use: "general_rough_dress",
  },
  double_point_fast: {
    wasteRemove: 88, surfaceRough: 82, speedWork: 80,
    controlAim: 72, cost: 50, powered: false, doublePoint: true,
    headProfile: "dual_pyramid_point", use: "fast_waste_rough",
  },
  broad_face_flat: {
    wasteRemove: 65, surfaceRough: 55, speedWork: 60,
    controlAim: 90, cost: 45, powered: false, doublePoint: false,
    headProfile: "wide_flat_face", use: "face_level_smooth",
  },
  carbide_point_hard: {
    wasteRemove: 82, surfaceRough: 75, speedWork: 70,
    controlAim: 78, cost: 110, powered: false, doublePoint: false,
    headProfile: "carbide_pyramid_point", use: "hard_stone_rough",
  },
  pneumatic_scabble_power: {
    wasteRemove: 95, surfaceRough: 88, speedWork: 95,
    controlAim: 60, cost: 420, powered: true, doublePoint: false,
    headProfile: "multi_point_head", use: "production_rough_dress",
  },
};

export function wasteRemove(t: ScabbleHammerType): number { return specs[t].wasteRemove; }
export function surfaceRough(t: ScabbleHammerType): number { return specs[t].surfaceRough; }
export function speedWork(t: ScabbleHammerType): number { return specs[t].speedWork; }
export function controlAim(t: ScabbleHammerType): number { return specs[t].controlAim; }
export function hammerCost(t: ScabbleHammerType): number { return specs[t].cost; }
export function powered(t: ScabbleHammerType): boolean { return specs[t].powered; }
export function doublePoint(t: ScabbleHammerType): boolean { return specs[t].doublePoint; }
export function headProfile(t: ScabbleHammerType): string { return specs[t].headProfile; }
export function bestUse(t: ScabbleHammerType): string { return specs[t].use; }
export function scabbleHammers(): ScabbleHammerType[] { return Object.keys(specs) as ScabbleHammerType[]; }
