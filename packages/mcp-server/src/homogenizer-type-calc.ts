export type HomogenizerType =
  | "high_pressure_valve"
  | "ultrasonic_sonotrode"
  | "rotor_stator_inline"
  | "microfluidizer_chamber"
  | "colloid_mill_gap";

const DATA: Record<HomogenizerType, {
  particleSize: number; throughput: number; shear: number;
  energy: number; hmCost: number; continuous: boolean;
  forEmulsion: boolean; mechanism: string; bestUse: string;
}> = {
  high_pressure_valve: {
    particleSize: 9, throughput: 9, shear: 9,
    energy: 5, hmCost: 4, continuous: true,
    forEmulsion: true, mechanism: "valve_seat_impact_cavitation",
    bestUse: "dairy_milk_cream_fat_globule",
  },
  ultrasonic_sonotrode: {
    particleSize: 8, throughput: 4, shear: 7,
    energy: 7, hmCost: 3, continuous: false,
    forEmulsion: true, mechanism: "acoustic_cavitation_probe",
    bestUse: "lab_nanoemulsion_cell_lysis",
  },
  rotor_stator_inline: {
    particleSize: 6, throughput: 8, shear: 8,
    energy: 6, hmCost: 2, continuous: true,
    forEmulsion: true, mechanism: "high_speed_rotor_screen_gap",
    bestUse: "sauce_dressing_cosmetic_batch",
  },
  microfluidizer_chamber: {
    particleSize: 10, throughput: 5, shear: 10,
    energy: 4, hmCost: 5, continuous: true,
    forEmulsion: true, mechanism: "fixed_geometry_interaction_chamber",
    bestUse: "pharma_liposome_nanoparticle",
  },
  colloid_mill_gap: {
    particleSize: 5, throughput: 7, shear: 7,
    energy: 6, hmCost: 2, continuous: true,
    forEmulsion: false, mechanism: "conical_rotor_stator_gap",
    bestUse: "peanut_butter_mustard_paste_grind",
  },
};

const get = (t: HomogenizerType) => DATA[t];

export const particleSize = (t: HomogenizerType) => get(t).particleSize;
export const throughput = (t: HomogenizerType) => get(t).throughput;
export const shear = (t: HomogenizerType) => get(t).shear;
export const energy = (t: HomogenizerType) => get(t).energy;
export const hmCost = (t: HomogenizerType) => get(t).hmCost;
export const continuous = (t: HomogenizerType) => get(t).continuous;
export const forEmulsion = (t: HomogenizerType) => get(t).forEmulsion;
export const mechanism = (t: HomogenizerType) => get(t).mechanism;
export const bestUse = (t: HomogenizerType) => get(t).bestUse;
export const homogenizerTypes = (): HomogenizerType[] => Object.keys(DATA) as HomogenizerType[];
