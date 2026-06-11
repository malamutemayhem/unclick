export type AirKnifeType =
  | "flat_jet_standard"
  | "circular_annular"
  | "ionizing_static"
  | "heated_hot_air"
  | "super_air_amplifier";

interface AirKnifeData {
  blowForce: number;
  uniformity: number;
  airConsumption: number;
  noiseLevel: number;
  akCost: number;
  adjustable: boolean;
  forDrying: boolean;
  airPattern: string;
  bestUse: string;
}

const DATA: Record<AirKnifeType, AirKnifeData> = {
  flat_jet_standard: {
    blowForce: 8, uniformity: 9, airConsumption: 7, noiseLevel: 6, akCost: 5,
    adjustable: true, forDrying: true,
    airPattern: "thin_flat_curtain_laminar_sheet_full_width_coverage_blow_off",
    bestUse: "bottle_can_drying_web_cleaning_conveyor_blow_off_coating",
  },
  circular_annular: {
    blowForce: 7, uniformity: 10, airConsumption: 7, noiseLevel: 6, akCost: 6,
    adjustable: false, forDrying: true,
    airPattern: "360_degree_annular_ring_uniform_blow_around_wire_tube_rod",
    bestUse: "wire_extrusion_tube_cable_coating_drying_360_degree_coverage",
  },
  ionizing_static: {
    blowForce: 5, uniformity: 8, airConsumption: 8, noiseLevel: 7, akCost: 8,
    adjustable: true, forDrying: false,
    airPattern: "ionized_air_stream_neutralize_static_charge_attract_particle",
    bestUse: "electronics_assembly_film_packaging_static_elimination_clean",
  },
  heated_hot_air: {
    blowForce: 8, uniformity: 8, airConsumption: 6, noiseLevel: 5, akCost: 7,
    adjustable: true, forDrying: true,
    airPattern: "heated_air_curtain_elevated_temperature_accelerate_evaporate",
    bestUse: "adhesive_cure_moisture_removal_paint_flash_off_heat_shrink",
  },
  super_air_amplifier: {
    blowForce: 9, uniformity: 7, airConsumption: 10, noiseLevel: 8, akCost: 4,
    adjustable: false, forDrying: true,
    airPattern: "coanda_effect_entrain_ambient_air_amplify_25x_volume_output",
    bestUse: "smoke_fume_exhaust_cooling_ventilation_part_ejection_blow",
  },
};

function get(t: AirKnifeType): AirKnifeData {
  return DATA[t];
}

export const blowForce = (t: AirKnifeType) => get(t).blowForce;
export const uniformity = (t: AirKnifeType) => get(t).uniformity;
export const airConsumption = (t: AirKnifeType) => get(t).airConsumption;
export const noiseLevel = (t: AirKnifeType) => get(t).noiseLevel;
export const akCost = (t: AirKnifeType) => get(t).akCost;
export const adjustable = (t: AirKnifeType) => get(t).adjustable;
export const forDrying = (t: AirKnifeType) => get(t).forDrying;
export const airPattern = (t: AirKnifeType) => get(t).airPattern;
export const bestUse = (t: AirKnifeType) => get(t).bestUse;
export const airKnifeTypes = (): AirKnifeType[] =>
  Object.keys(DATA) as AirKnifeType[];
