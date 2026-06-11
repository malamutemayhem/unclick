export type CrystalPullerType =
  | "czochralski_pull"
  | "bridgman_grow"
  | "float_zone"
  | "edge_defined"
  | "verneuil_flame";

interface CrystalPullerData {
  crystalPurity: number;
  throughput: number;
  diameterControl: number;
  defectDensity: number;
  cpCost: number;
  meltFree: boolean;
  forSemiconductor: boolean;
  pullerConfig: string;
  bestUse: string;
}

const DATA: Record<CrystalPullerType, CrystalPullerData> = {
  czochralski_pull: {
    crystalPurity: 9, throughput: 8, diameterControl: 9, defectDensity: 8, cpCost: 8,
    meltFree: false, forSemiconductor: true,
    pullerConfig: "czochralski_crystal_puller_seed_rotate_melt_silicon_ingot_pull",
    bestUse: "silicon_wafer_czochralski_crystal_puller_semiconductor_ingot",
  },
  bridgman_grow: {
    crystalPurity: 8, throughput: 6, diameterControl: 7, defectDensity: 7, cpCost: 6,
    meltFree: false, forSemiconductor: false,
    pullerConfig: "bridgman_crystal_grower_directional_solidify_gradient_furnace",
    bestUse: "compound_semiconductor_bridgman_crystal_grower_gaas_cdte_ingot",
  },
  float_zone: {
    crystalPurity: 10, throughput: 4, diameterControl: 7, defectDensity: 10, cpCost: 10,
    meltFree: true, forSemiconductor: true,
    pullerConfig: "float_zone_crystal_puller_rf_coil_crucible_free_ultra_pure",
    bestUse: "power_device_float_zone_crystal_puller_ultra_pure_high_resist",
  },
  edge_defined: {
    crystalPurity: 7, throughput: 9, diameterControl: 6, defectDensity: 6, cpCost: 5,
    meltFree: false, forSemiconductor: false,
    pullerConfig: "edge_defined_crystal_puller_efg_die_shape_ribbon_tube_sapphire",
    bestUse: "sapphire_tube_edge_defined_crystal_puller_efg_ribbon_led_cover",
  },
  verneuil_flame: {
    crystalPurity: 6, throughput: 7, diameterControl: 5, defectDensity: 5, cpCost: 3,
    meltFree: false, forSemiconductor: false,
    pullerConfig: "verneuil_flame_crystal_puller_powder_drop_oxy_hydrogen_boule",
    bestUse: "gemstone_boule_verneuil_flame_crystal_puller_ruby_sapphire_syn",
  },
};

function get(t: CrystalPullerType): CrystalPullerData {
  return DATA[t];
}

export const crystalPurity = (t: CrystalPullerType) => get(t).crystalPurity;
export const throughput = (t: CrystalPullerType) => get(t).throughput;
export const diameterControl = (t: CrystalPullerType) => get(t).diameterControl;
export const defectDensity = (t: CrystalPullerType) => get(t).defectDensity;
export const cpCost = (t: CrystalPullerType) => get(t).cpCost;
export const meltFree = (t: CrystalPullerType) => get(t).meltFree;
export const forSemiconductor = (t: CrystalPullerType) => get(t).forSemiconductor;
export const pullerConfig = (t: CrystalPullerType) => get(t).pullerConfig;
export const bestUse = (t: CrystalPullerType) => get(t).bestUse;
export const crystalPullerTypes = (): CrystalPullerType[] =>
  Object.keys(DATA) as CrystalPullerType[];
