export type PaperCoaterType =
  | "blade_coater"
  | "rod_coater"
  | "air_knife"
  | "curtain_coater"
  | "size_press";

interface PaperCoaterData {
  coatUniformity: number;
  throughput: number;
  coatWeight: number;
  surfaceFinish: number;
  pcCost: number;
  contactless: boolean;
  forGlossy: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<PaperCoaterType, PaperCoaterData> = {
  blade_coater: {
    coatUniformity: 9, throughput: 10, coatWeight: 9, surfaceFinish: 9, pcCost: 7,
    contactless: false, forGlossy: true,
    coaterConfig: "blade_coater_paper_flexible_blade_meter_excess_smooth_uniform",
    bestUse: "coated_paper_mill_blade_coater_high_speed_smooth_printing_grade",
  },
  rod_coater: {
    coatUniformity: 8, throughput: 8, coatWeight: 7, surfaceFinish: 7, pcCost: 5,
    contactless: false, forGlossy: false,
    coaterConfig: "rod_coater_paper_wire_wound_rod_meter_light_coat_simple",
    bestUse: "lightweight_coated_paper_rod_coater_simple_light_weight_coat",
  },
  air_knife: {
    coatUniformity: 7, throughput: 8, coatWeight: 6, surfaceFinish: 8, pcCost: 6,
    contactless: true, forGlossy: false,
    coaterConfig: "air_knife_coater_paper_pressurized_air_jet_meter_excess_coat",
    bestUse: "specialty_paper_air_knife_coater_light_coat_thermal_carbonless",
  },
  curtain_coater: {
    coatUniformity: 10, throughput: 9, coatWeight: 10, surfaceFinish: 10, pcCost: 9,
    contactless: true, forGlossy: true,
    coaterConfig: "curtain_coater_paper_free_falling_liquid_curtain_multi_layer",
    bestUse: "premium_paper_curtain_coater_multi_layer_simultaneous_high_gloss",
  },
  size_press: {
    coatUniformity: 6, throughput: 10, coatWeight: 5, surfaceFinish: 6, pcCost: 4,
    contactless: false, forGlossy: false,
    coaterConfig: "size_press_paper_nip_roll_starch_apply_surface_strength_seal",
    bestUse: "uncoated_paper_size_press_surface_starch_seal_improve_printability",
  },
};

function get(t: PaperCoaterType): PaperCoaterData {
  return DATA[t];
}

export const coatUniformity = (t: PaperCoaterType) => get(t).coatUniformity;
export const throughput = (t: PaperCoaterType) => get(t).throughput;
export const coatWeight = (t: PaperCoaterType) => get(t).coatWeight;
export const surfaceFinish = (t: PaperCoaterType) => get(t).surfaceFinish;
export const pcCost = (t: PaperCoaterType) => get(t).pcCost;
export const contactless = (t: PaperCoaterType) => get(t).contactless;
export const forGlossy = (t: PaperCoaterType) => get(t).forGlossy;
export const coaterConfig = (t: PaperCoaterType) => get(t).coaterConfig;
export const bestUse = (t: PaperCoaterType) => get(t).bestUse;
export const paperCoaterTypes = (): PaperCoaterType[] =>
  Object.keys(DATA) as PaperCoaterType[];
