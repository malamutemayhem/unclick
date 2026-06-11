export type FireSuppressionAgentType =
  | "water_mist_high_pressure"
  | "co2_total_flood_gas"
  | "clean_agent_fm200_hfc"
  | "dry_chemical_abc_powder"
  | "foam_afff_film_forming";

interface FireSuppressionAgentData {
  effectiveness: number;
  speed: number;
  residue: number;
  safety: number;
  saCost: number;
  gaseous: boolean;
  forElectrical: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<FireSuppressionAgentType, FireSuppressionAgentData> = {
  water_mist_high_pressure: {
    effectiveness: 7, speed: 7, residue: 8, safety: 9, saCost: 6,
    gaseous: false, forElectrical: false,
    mechanism: "fine_droplet_cool_displace_oxygen",
    bestUse: "marine_tunnel_heritage_building_safe",
  },
  co2_total_flood_gas: {
    effectiveness: 9, speed: 9, residue: 10, safety: 3, saCost: 5,
    gaseous: true, forElectrical: true,
    mechanism: "oxygen_displacement_smother_inert",
    bestUse: "unmanned_engine_room_flammable_store",
  },
  clean_agent_fm200_hfc: {
    effectiveness: 8, speed: 10, residue: 10, safety: 7, saCost: 9,
    gaseous: true, forElectrical: true,
    mechanism: "chemical_inhibit_heat_absorb_gas",
    bestUse: "data_center_telecom_occupied_critical",
  },
  dry_chemical_abc_powder: {
    effectiveness: 8, speed: 8, residue: 2, safety: 7, saCost: 2,
    gaseous: false, forElectrical: true,
    mechanism: "chain_break_smother_powder_coat",
    bestUse: "portable_vehicle_general_multi_class",
  },
  foam_afff_film_forming: {
    effectiveness: 9, speed: 7, residue: 3, safety: 6, saCost: 5,
    gaseous: false, forElectrical: false,
    mechanism: "aqueous_film_seal_vapor_smother",
    bestUse: "fuel_spill_aircraft_hangar_tank_farm",
  },
};

function get(t: FireSuppressionAgentType): FireSuppressionAgentData {
  return DATA[t];
}

export const effectiveness = (t: FireSuppressionAgentType) => get(t).effectiveness;
export const speed = (t: FireSuppressionAgentType) => get(t).speed;
export const residue = (t: FireSuppressionAgentType) => get(t).residue;
export const safety = (t: FireSuppressionAgentType) => get(t).safety;
export const saCost = (t: FireSuppressionAgentType) => get(t).saCost;
export const gaseous = (t: FireSuppressionAgentType) => get(t).gaseous;
export const forElectrical = (t: FireSuppressionAgentType) => get(t).forElectrical;
export const mechanism = (t: FireSuppressionAgentType) => get(t).mechanism;
export const bestUse = (t: FireSuppressionAgentType) => get(t).bestUse;
export const fireSuppressionAgentTypes = (): FireSuppressionAgentType[] =>
  Object.keys(DATA) as FireSuppressionAgentType[];
