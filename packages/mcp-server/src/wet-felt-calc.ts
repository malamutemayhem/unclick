export type WetFeltType =
  | "hot_water_standard"
  | "olive_soap_gentle"
  | "bubble_wrap_roll"
  | "bamboo_mat_textured"
  | "dryer_tumble_fast";

const specs: Record<WetFeltType, {
  shrinkControl: number; feltDense: number; speedFelt: number;
  textureEven: number; cost: number; manual: boolean; heated: boolean;
  feltMethod: string; use: string;
}> = {
  hot_water_standard: {
    shrinkControl: 82, feltDense: 85, speedFelt: 80,
    textureEven: 82, cost: 5, manual: true, heated: true,
    feltMethod: "hot_soap_agitate", use: "general_wet_felt",
  },
  olive_soap_gentle: {
    shrinkControl: 88, feltDense: 78, speedFelt: 72,
    textureEven: 85, cost: 8, manual: true, heated: false,
    feltMethod: "gentle_soap_roll", use: "delicate_fiber_felt",
  },
  bubble_wrap_roll: {
    shrinkControl: 80, feltDense: 82, speedFelt: 88,
    textureEven: 80, cost: 3, manual: true, heated: false,
    feltMethod: "textured_roll_wrap", use: "fast_flat_felt",
  },
  bamboo_mat_textured: {
    shrinkControl: 85, feltDense: 88, speedFelt: 85,
    textureEven: 78, cost: 12, manual: true, heated: false,
    feltMethod: "bamboo_roll_press", use: "dense_textured_felt",
  },
  dryer_tumble_fast: {
    shrinkControl: 70, feltDense: 90, speedFelt: 95,
    textureEven: 72, cost: 2, manual: false, heated: true,
    feltMethod: "machine_tumble_heat", use: "quick_shrink_felt",
  },
};

export function shrinkControl(t: WetFeltType): number { return specs[t].shrinkControl; }
export function feltDense(t: WetFeltType): number { return specs[t].feltDense; }
export function speedFelt(t: WetFeltType): number { return specs[t].speedFelt; }
export function textureEven(t: WetFeltType): number { return specs[t].textureEven; }
export function feltCost(t: WetFeltType): number { return specs[t].cost; }
export function manual(t: WetFeltType): boolean { return specs[t].manual; }
export function heated(t: WetFeltType): boolean { return specs[t].heated; }
export function feltMethod(t: WetFeltType): string { return specs[t].feltMethod; }
export function bestUse(t: WetFeltType): string { return specs[t].use; }
export function wetFelts(): WetFeltType[] { return Object.keys(specs) as WetFeltType[]; }
