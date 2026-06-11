export type PowderCoaterType =
  | "electrostatic_spray"
  | "fluidized_bed"
  | "tribostatic_gun"
  | "flame_spray"
  | "electrophoretic";

interface PowderCoaterData {
  coatUniformity: number;
  throughput: number;
  filmThickness: number;
  adhesion: number;
  pcCost: number;
  thick: boolean;
  forMetal: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<PowderCoaterType, PowderCoaterData> = {
  electrostatic_spray: {
    coatUniformity: 8, throughput: 9, filmThickness: 7, adhesion: 9, pcCost: 5,
    thick: false, forMetal: true,
    coaterConfig: "electrostatic_powder_coater_corona_charge_spray_cure_oven_bake",
    bestUse: "metal_furniture_electrostatic_powder_coater_corona_spray_cure",
  },
  fluidized_bed: {
    coatUniformity: 7, throughput: 6, filmThickness: 10, adhesion: 9, pcCost: 4,
    thick: true, forMetal: true,
    coaterConfig: "fluidized_bed_powder_coater_dip_preheat_thick_coat_encapsulate",
    bestUse: "wire_rack_fluidized_bed_powder_coater_dip_thick_encapsulate",
  },
  tribostatic_gun: {
    coatUniformity: 9, throughput: 7, filmThickness: 7, adhesion: 8, pcCost: 6,
    thick: false, forMetal: true,
    coaterConfig: "tribostatic_powder_coater_friction_charge_no_ion_faraday_reach",
    bestUse: "complex_shape_tribostatic_powder_coater_friction_faraday_reach",
  },
  flame_spray: {
    coatUniformity: 6, throughput: 5, filmThickness: 8, adhesion: 7, pcCost: 7,
    thick: true, forMetal: true,
    coaterConfig: "flame_spray_powder_coater_propane_melt_deposit_thermal_barrier",
    bestUse: "thermal_barrier_flame_spray_powder_coater_melt_deposit_repair",
  },
  electrophoretic: {
    coatUniformity: 10, throughput: 8, filmThickness: 6, adhesion: 10, pcCost: 8,
    thick: false, forMetal: true,
    coaterConfig: "electrophoretic_powder_coater_e_coat_dip_dc_field_primer_auto",
    bestUse: "auto_body_electrophoretic_powder_coater_e_coat_dip_primer",
  },
};

function get(t: PowderCoaterType): PowderCoaterData {
  return DATA[t];
}

export const coatUniformity = (t: PowderCoaterType) => get(t).coatUniformity;
export const throughput = (t: PowderCoaterType) => get(t).throughput;
export const filmThickness = (t: PowderCoaterType) => get(t).filmThickness;
export const adhesion = (t: PowderCoaterType) => get(t).adhesion;
export const pcCost = (t: PowderCoaterType) => get(t).pcCost;
export const thick = (t: PowderCoaterType) => get(t).thick;
export const forMetal = (t: PowderCoaterType) => get(t).forMetal;
export const coaterConfig = (t: PowderCoaterType) => get(t).coaterConfig;
export const bestUse = (t: PowderCoaterType) => get(t).bestUse;
export const powderCoaterTypes = (): PowderCoaterType[] =>
  Object.keys(DATA) as PowderCoaterType[];
