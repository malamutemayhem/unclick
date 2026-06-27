export type CentrifugeLabType =
  | "benchtop_micro"
  | "clinical_swing_bucket"
  | "floor_high_speed"
  | "ultracentrifuge"
  | "continuous_flow";

interface CentrifugeLabData {
  maxSpeed: number;
  capacity: number;
  temperatureControl: number;
  versatility: number;
  clCost: number;
  refrigerated: boolean;
  forResearch: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<CentrifugeLabType, CentrifugeLabData> = {
  benchtop_micro: {
    maxSpeed: 7, capacity: 3, temperatureControl: 5, versatility: 6, clCost: 3,
    refrigerated: false, forResearch: true,
    rotor: "fixed_angle_micro_tube_rotor_24_place_1_5ml_quick_spin",
    bestUse: "molecular_biology_pcr_prep_dna_rna_extraction_quick_spin",
  },
  clinical_swing_bucket: {
    maxSpeed: 5, capacity: 7, temperatureControl: 6, versatility: 8, clCost: 5,
    refrigerated: false, forResearch: false,
    rotor: "swing_out_bucket_blood_tube_plate_rotor_horizontal_pellet",
    bestUse: "clinical_lab_blood_separation_urine_body_fluid_analysis",
  },
  floor_high_speed: {
    maxSpeed: 8, capacity: 8, temperatureControl: 8, versatility: 9, clCost: 7,
    refrigerated: true, forResearch: true,
    rotor: "fixed_angle_swinging_bucket_interchangeable_large_volume",
    bestUse: "cell_harvest_protein_precipitation_large_volume_research",
  },
  ultracentrifuge: {
    maxSpeed: 10, capacity: 4, temperatureControl: 10, versatility: 7, clCost: 10,
    refrigerated: true, forResearch: true,
    rotor: "titanium_fixed_angle_swinging_bucket_vacuum_chamber_drive",
    bestUse: "subcellular_fractionation_virus_purification_nanoparticle",
  },
  continuous_flow: {
    maxSpeed: 7, capacity: 10, temperatureControl: 7, versatility: 5, clCost: 8,
    refrigerated: true, forResearch: false,
    rotor: "continuous_flow_rotor_seal_bearing_harvest_large_culture",
    bestUse: "bioprocess_cell_harvest_large_volume_continuous_separation",
  },
};

function get(t: CentrifugeLabType): CentrifugeLabData {
  return DATA[t];
}

export const maxSpeed = (t: CentrifugeLabType) => get(t).maxSpeed;
export const capacity = (t: CentrifugeLabType) => get(t).capacity;
export const temperatureControl = (t: CentrifugeLabType) => get(t).temperatureControl;
export const versatility = (t: CentrifugeLabType) => get(t).versatility;
export const clCost = (t: CentrifugeLabType) => get(t).clCost;
export const refrigerated = (t: CentrifugeLabType) => get(t).refrigerated;
export const forResearch = (t: CentrifugeLabType) => get(t).forResearch;
export const rotor = (t: CentrifugeLabType) => get(t).rotor;
export const bestUse = (t: CentrifugeLabType) => get(t).bestUse;
export const centrifugeLabTypes = (): CentrifugeLabType[] =>
  Object.keys(DATA) as CentrifugeLabType[];
