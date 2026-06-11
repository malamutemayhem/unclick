export type FireSuppressionType =
  | "co2_total_flood"
  | "water_mist"
  | "foam_afff"
  | "dry_chemical"
  | "inert_gas_ig55";

interface FireSuppressionData {
  extinguishSpeed: number;
  coverage: number;
  environmentalImpact: number;
  reignitionProtect: number;
  fsCost: number;
  cleanAgent: boolean;
  forEnclosed: boolean;
  agent: string;
  bestUse: string;
}

const DATA: Record<FireSuppressionType, FireSuppressionData> = {
  co2_total_flood: {
    extinguishSpeed: 9, coverage: 9, environmentalImpact: 5, reignitionProtect: 6, fsCost: 7,
    cleanAgent: true, forEnclosed: true,
    agent: "carbon_dioxide_total_flooding_oxygen_displacement_inert",
    bestUse: "engine_room_machinery_space_unmanned_enclosed_compartment",
  },
  water_mist: {
    extinguishSpeed: 7, coverage: 8, environmentalImpact: 10, reignitionProtect: 8, fsCost: 8,
    cleanAgent: true, forEnclosed: true,
    agent: "high_pressure_water_mist_fine_droplet_cooling_displacement",
    bestUse: "accommodation_gallery_machinery_safe_for_occupied_space",
  },
  foam_afff: {
    extinguishSpeed: 8, coverage: 10, environmentalImpact: 4, reignitionProtect: 10, fsCost: 6,
    cleanAgent: false, forEnclosed: false,
    agent: "aqueous_film_forming_foam_fluorosurfactant_vapor_seal",
    bestUse: "flight_deck_helideck_fuel_tank_top_flammable_liquid_fire",
  },
  dry_chemical: {
    extinguishSpeed: 10, coverage: 6, environmentalImpact: 6, reignitionProtect: 4, fsCost: 4,
    cleanAgent: false, forEnclosed: false,
    agent: "monoammonium_phosphate_powder_chain_reaction_interrupt",
    bestUse: "portable_extinguisher_small_fire_initial_attack_galley",
  },
  inert_gas_ig55: {
    extinguishSpeed: 8, coverage: 9, environmentalImpact: 9, reignitionProtect: 7, fsCost: 9,
    cleanAgent: true, forEnclosed: true,
    agent: "argon_nitrogen_blend_ig55_oxygen_reduction_no_residue",
    bestUse: "server_room_control_room_archive_sensitive_equipment_area",
  },
};

function get(t: FireSuppressionType): FireSuppressionData {
  return DATA[t];
}

export const extinguishSpeed = (t: FireSuppressionType) => get(t).extinguishSpeed;
export const coverage = (t: FireSuppressionType) => get(t).coverage;
export const environmentalImpact = (t: FireSuppressionType) => get(t).environmentalImpact;
export const reignitionProtect = (t: FireSuppressionType) => get(t).reignitionProtect;
export const fsCost = (t: FireSuppressionType) => get(t).fsCost;
export const cleanAgent = (t: FireSuppressionType) => get(t).cleanAgent;
export const forEnclosed = (t: FireSuppressionType) => get(t).forEnclosed;
export const agent = (t: FireSuppressionType) => get(t).agent;
export const bestUse = (t: FireSuppressionType) => get(t).bestUse;
export const fireSuppressionTypes = (): FireSuppressionType[] =>
  Object.keys(DATA) as FireSuppressionType[];
