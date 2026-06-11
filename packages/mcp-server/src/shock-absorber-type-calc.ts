export type ShockAbsorberType =
  | "twin_tube_hydraulic"
  | "monotube_gas_charged"
  | "adjustable_coilover_threaded"
  | "air_spring_electronic"
  | "magnetorheological_mr_fluid";

const DATA: Record<ShockAbsorberType, {
  damping: number; response: number; adjustability: number;
  comfort: number; saCost: number; electronic: boolean;
  forPerformance: boolean; medium: string; bestUse: string;
}> = {
  twin_tube_hydraulic: {
    damping: 5, response: 5, adjustability: 2,
    comfort: 7, saCost: 1, electronic: false,
    forPerformance: false, medium: "hydraulic_oil_twin_chamber",
    bestUse: "economy_car_replacement_oem",
  },
  monotube_gas_charged: {
    damping: 7, response: 8, adjustability: 3,
    comfort: 6, saCost: 2, electronic: false,
    forPerformance: true, medium: "gas_pressurized_single_tube",
    bestUse: "sport_sedan_upgraded_street",
  },
  adjustable_coilover_threaded: {
    damping: 9, response: 9, adjustability: 9,
    comfort: 5, saCost: 4, electronic: false,
    forPerformance: true, medium: "gas_monotube_threaded_body",
    bestUse: "track_car_drift_time_attack",
  },
  air_spring_electronic: {
    damping: 6, response: 7, adjustability: 8,
    comfort: 10, saCost: 4, electronic: true,
    forPerformance: false, medium: "air_bellows_ecu_compressor",
    bestUse: "luxury_suv_self_leveling_ride",
  },
  magnetorheological_mr_fluid: {
    damping: 10, response: 10, adjustability: 10,
    comfort: 8, saCost: 5, electronic: true,
    forPerformance: true, medium: "iron_particle_fluid_magnetic_coil",
    bestUse: "supercar_adaptive_real_time_damp",
  },
};

const get = (t: ShockAbsorberType) => DATA[t];

export const damping = (t: ShockAbsorberType) => get(t).damping;
export const response = (t: ShockAbsorberType) => get(t).response;
export const adjustability = (t: ShockAbsorberType) => get(t).adjustability;
export const comfort = (t: ShockAbsorberType) => get(t).comfort;
export const saCost = (t: ShockAbsorberType) => get(t).saCost;
export const electronic = (t: ShockAbsorberType) => get(t).electronic;
export const forPerformance = (t: ShockAbsorberType) => get(t).forPerformance;
export const medium = (t: ShockAbsorberType) => get(t).medium;
export const bestUse = (t: ShockAbsorberType) => get(t).bestUse;
export const shockAbsorberTypes = (): ShockAbsorberType[] => Object.keys(DATA) as ShockAbsorberType[];
