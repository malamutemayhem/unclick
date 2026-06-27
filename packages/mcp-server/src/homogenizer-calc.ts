export type HomogenizerType =
  | "high_pressure_valve"
  | "ultrasonic"
  | "rotor_stator"
  | "microfluidizer"
  | "colloid_mill";

interface HomogenizerData {
  speed: number;
  particleReduction: number;
  pressure: number;
  scalability: number;
  hCost: number;
  continuous: boolean;
  forEmulsion: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<HomogenizerType, HomogenizerData> = {
  high_pressure_valve: {
    speed: 9, particleReduction: 9, pressure: 10, scalability: 10, hCost: 8,
    continuous: true, forEmulsion: true,
    mechanism: "piston_pump_valve_gap_shear_cavitation_impact_turbulence",
    bestUse: "dairy_milk_cream_beverage_emulsion_pharmaceutical_bulk",
  },
  ultrasonic: {
    speed: 5, particleReduction: 10, pressure: 3, scalability: 4, hCost: 7,
    continuous: false, forEmulsion: true,
    mechanism: "ultrasonic_probe_horn_cavitation_acoustic_streaming_nano",
    bestUse: "nano_emulsion_lab_scale_cell_lysis_extraction_dispersion",
  },
  rotor_stator: {
    speed: 8, particleReduction: 7, pressure: 5, scalability: 8, hCost: 5,
    continuous: true, forEmulsion: true,
    mechanism: "high_speed_rotor_inside_stator_ring_shear_gap_centrifugal",
    bestUse: "sauce_dressing_cosmetic_cream_premix_dispersion_batch",
  },
  microfluidizer: {
    speed: 6, particleReduction: 10, pressure: 10, scalability: 5, hCost: 10,
    continuous: true, forEmulsion: true,
    mechanism: "interaction_chamber_micro_channels_fixed_geometry_high_shear",
    bestUse: "liposome_vaccine_adjuvant_nano_particle_pharma_biotech",
  },
  colloid_mill: {
    speed: 7, particleReduction: 6, pressure: 4, scalability: 7, hCost: 4,
    continuous: true, forEmulsion: false,
    mechanism: "conical_rotor_stator_adjustable_gap_wet_grinding_dispersion",
    bestUse: "paste_ointment_peanut_butter_mustard_viscous_suspension",
  },
};

function get(t: HomogenizerType): HomogenizerData {
  return DATA[t];
}

export const speed = (t: HomogenizerType) => get(t).speed;
export const particleReduction = (t: HomogenizerType) => get(t).particleReduction;
export const pressure = (t: HomogenizerType) => get(t).pressure;
export const scalability = (t: HomogenizerType) => get(t).scalability;
export const hCost = (t: HomogenizerType) => get(t).hCost;
export const continuous = (t: HomogenizerType) => get(t).continuous;
export const forEmulsion = (t: HomogenizerType) => get(t).forEmulsion;
export const mechanism = (t: HomogenizerType) => get(t).mechanism;
export const bestUse = (t: HomogenizerType) => get(t).bestUse;
export const homogenizerTypes = (): HomogenizerType[] =>
  Object.keys(DATA) as HomogenizerType[];
