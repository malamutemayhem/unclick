export type TurbineBladeType =
  | "single_crystal_nickel"
  | "directionally_solidified"
  | "equiaxed_conventional_cast"
  | "ceramic_matrix_composite"
  | "titanium_aluminide_light";

const DATA: Record<TurbineBladeType, {
  tempLimit: number; creepLife: number; weight: number;
  oxidation: number; tbCost: number; cooled: boolean;
  forFirstStage: boolean; material: string; bestUse: string;
}> = {
  single_crystal_nickel: {
    tempLimit: 10, creepLife: 10, weight: 5,
    oxidation: 9, tbCost: 5, cooled: true,
    forFirstStage: true, material: "cmsx4_single_crystal_superalloy",
    bestUse: "hp_turbine_first_stage_hot_gas",
  },
  directionally_solidified: {
    tempLimit: 8, creepLife: 8, weight: 5,
    oxidation: 8, tbCost: 4, cooled: true,
    forFirstStage: true, material: "nickel_ds_columnar_grain",
    bestUse: "hp_turbine_cost_effective_alt",
  },
  equiaxed_conventional_cast: {
    tempLimit: 6, creepLife: 5, weight: 5,
    oxidation: 6, tbCost: 2, cooled: false,
    forFirstStage: false, material: "inconel_713_equiaxed_grain",
    bestUse: "lp_turbine_industrial_gas_turb",
  },
  ceramic_matrix_composite: {
    tempLimit: 10, creepLife: 7, weight: 10,
    oxidation: 10, tbCost: 5, cooled: false,
    forFirstStage: false, material: "sic_sic_fiber_reinforced_cmc",
    bestUse: "next_gen_shroud_vane_weight_save",
  },
  titanium_aluminide_light: {
    tempLimit: 5, creepLife: 6, weight: 9,
    oxidation: 5, tbCost: 4, cooled: false,
    forFirstStage: false, material: "gamma_tial_intermetallic",
    bestUse: "lp_turbine_last_stage_lightweight",
  },
};

const get = (t: TurbineBladeType) => DATA[t];

export const tempLimit = (t: TurbineBladeType) => get(t).tempLimit;
export const creepLife = (t: TurbineBladeType) => get(t).creepLife;
export const weight = (t: TurbineBladeType) => get(t).weight;
export const oxidation = (t: TurbineBladeType) => get(t).oxidation;
export const tbCost = (t: TurbineBladeType) => get(t).tbCost;
export const cooled = (t: TurbineBladeType) => get(t).cooled;
export const forFirstStage = (t: TurbineBladeType) => get(t).forFirstStage;
export const material = (t: TurbineBladeType) => get(t).material;
export const bestUse = (t: TurbineBladeType) => get(t).bestUse;
export const turbineBladeTypes = (): TurbineBladeType[] => Object.keys(DATA) as TurbineBladeType[];
