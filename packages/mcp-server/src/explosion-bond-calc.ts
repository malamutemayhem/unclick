export type ExplosionBondType =
  | "parallel_plate_eb"
  | "cylindrical_eb"
  | "tube_to_tubesheet"
  | "transition_joint"
  | "patch_repair_eb";

interface ExplosionBondData {
  bondStrength: number;
  throughput: number;
  areaCapacity: number;
  materialCombinations: number;
  ebCost: number;
  dissimilarMetal: boolean;
  forPressureVessel: boolean;
  bondConfig: string;
  bestUse: string;
}

const DATA: Record<ExplosionBondType, ExplosionBondData> = {
  parallel_plate_eb: {
    bondStrength: 10, throughput: 7, areaCapacity: 10, materialCombinations: 10, ebCost: 8,
    dissimilarMetal: true, forPressureVessel: true,
    bondConfig: "parallel_plate_explosion_bond_flat_clad_large_area_dissimilar_join",
    bestUse: "clad_plate_parallel_explosion_bond_titanium_steel_large_area_vessel",
  },
  cylindrical_eb: {
    bondStrength: 9, throughput: 6, areaCapacity: 7, materialCombinations: 8, ebCost: 9,
    dissimilarMetal: true, forPressureVessel: true,
    bondConfig: "cylindrical_explosion_bond_tube_liner_corrosion_resist_internal",
    bestUse: "pipe_liner_cylindrical_explosion_bond_corrosion_resist_internal",
  },
  tube_to_tubesheet: {
    bondStrength: 9, throughput: 8, areaCapacity: 5, materialCombinations: 7, ebCost: 7,
    dissimilarMetal: true, forPressureVessel: true,
    bondConfig: "tube_to_tubesheet_explosion_bond_expand_seal_heat_exchanger_joint",
    bestUse: "heat_exchanger_tube_to_tubesheet_explosion_bond_seal_expand_tight",
  },
  transition_joint: {
    bondStrength: 10, throughput: 9, areaCapacity: 4, materialCombinations: 9, ebCost: 6,
    dissimilarMetal: true, forPressureVessel: false,
    bondConfig: "transition_joint_explosion_bond_bimetal_strip_weld_bridge_metal",
    bestUse: "shipyard_transition_joint_explosion_bond_aluminum_steel_bridge",
  },
  patch_repair_eb: {
    bondStrength: 8, throughput: 5, areaCapacity: 3, materialCombinations: 6, ebCost: 5,
    dissimilarMetal: false, forPressureVessel: true,
    bondConfig: "patch_repair_explosion_bond_in_situ_clad_repair_corroded_vessel",
    bestUse: "vessel_repair_patch_explosion_bond_in_situ_clad_restore_corroded",
  },
};

function get(t: ExplosionBondType): ExplosionBondData {
  return DATA[t];
}

export const bondStrength = (t: ExplosionBondType) => get(t).bondStrength;
export const throughput = (t: ExplosionBondType) => get(t).throughput;
export const areaCapacity = (t: ExplosionBondType) => get(t).areaCapacity;
export const materialCombinations = (t: ExplosionBondType) => get(t).materialCombinations;
export const ebCost = (t: ExplosionBondType) => get(t).ebCost;
export const dissimilarMetal = (t: ExplosionBondType) => get(t).dissimilarMetal;
export const forPressureVessel = (t: ExplosionBondType) => get(t).forPressureVessel;
export const bondConfig = (t: ExplosionBondType) => get(t).bondConfig;
export const bestUse = (t: ExplosionBondType) => get(t).bestUse;
export const explosionBondTypes = (): ExplosionBondType[] =>
  Object.keys(DATA) as ExplosionBondType[];
