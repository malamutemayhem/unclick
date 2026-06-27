export type PhaseChangeCool =
  | "compressor_vapor"
  | "thermoelectric_peltier"
  | "absorption_chiller"
  | "magnetic_caloric"
  | "electrocaloric_film";

const DATA: Record<PhaseChangeCool, {
  cop: number; tempDelta: number; compactness: number;
  noise: number; pcCost: number; solidState: boolean;
  forSpot: boolean; cycle: string; bestUse: string;
}> = {
  compressor_vapor: {
    cop: 9, tempDelta: 9, compactness: 4,
    noise: 3, pcCost: 5, solidState: false,
    forSpot: false, cycle: "rankine_refrigerant_loop",
    bestUse: "server_room_precision_ac",
  },
  thermoelectric_peltier: {
    cop: 3, tempDelta: 6, compactness: 10,
    noise: 10, pcCost: 4, solidState: true,
    forSpot: true, cycle: "seebeck_peltier_junction",
    bestUse: "laser_diode_temp_stabilize",
  },
  absorption_chiller: {
    cop: 6, tempDelta: 7, compactness: 2,
    noise: 7, pcCost: 7, solidState: false,
    forSpot: false, cycle: "libr_water_generator_absorber",
    bestUse: "waste_heat_driven_cooling",
  },
  magnetic_caloric: {
    cop: 8, tempDelta: 5, compactness: 6,
    noise: 8, pcCost: 9, solidState: true,
    forSpot: false, cycle: "magnetocaloric_gadolinium_cycle",
    bestUse: "next_gen_fridge_no_gas",
  },
  electrocaloric_film: {
    cop: 7, tempDelta: 4, compactness: 9,
    noise: 10, pcCost: 8, solidState: true,
    forSpot: true, cycle: "ferroelectric_polymer_field",
    bestUse: "wearable_personal_cooling",
  },
};

const get = (t: PhaseChangeCool) => DATA[t];

export const cop = (t: PhaseChangeCool) => get(t).cop;
export const tempDelta = (t: PhaseChangeCool) => get(t).tempDelta;
export const compactness = (t: PhaseChangeCool) => get(t).compactness;
export const noise = (t: PhaseChangeCool) => get(t).noise;
export const pcCost = (t: PhaseChangeCool) => get(t).pcCost;
export const solidState = (t: PhaseChangeCool) => get(t).solidState;
export const forSpot = (t: PhaseChangeCool) => get(t).forSpot;
export const cycle = (t: PhaseChangeCool) => get(t).cycle;
export const bestUse = (t: PhaseChangeCool) => get(t).bestUse;
export const phaseChangeCools = (): PhaseChangeCool[] => Object.keys(DATA) as PhaseChangeCool[];
