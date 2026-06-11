export type CorrosionInhibitorType =
  | "filming_amine_oil"
  | "neutralizing_amine_gas"
  | "oxygen_scavenger"
  | "scale_inhibitor_poly"
  | "vapor_phase_vci";

interface CorrosionInhibitorData {
  effectiveness: number;
  dosageRange: number;
  compatibility: number;
  envFriendly: number;
  ciCost: number;
  continuous: boolean;
  forClosedLoop: boolean;
  chemistry: string;
  bestUse: string;
}

const DATA: Record<CorrosionInhibitorType, CorrosionInhibitorData> = {
  filming_amine_oil: {
    effectiveness: 8, dosageRange: 7, compatibility: 6, envFriendly: 5, ciCost: 6,
    continuous: true, forClosedLoop: false,
    chemistry: "long_chain_fatty_amine_hydrophobic_film_barrier",
    bestUse: "refinery_overhead_condensate_acid_gas_system",
  },
  neutralizing_amine_gas: {
    effectiveness: 7, dosageRange: 8, compatibility: 8, envFriendly: 6, ciCost: 5,
    continuous: true, forClosedLoop: false,
    chemistry: "volatile_amine_neutralize_acid_condensate_ph",
    bestUse: "steam_condensate_return_boiler_feedwater_ph",
  },
  oxygen_scavenger: {
    effectiveness: 9, dosageRange: 7, compatibility: 9, envFriendly: 7, ciCost: 4,
    continuous: true, forClosedLoop: true,
    chemistry: "sulfite_hydrazine_carbohydrazide_oxygen_react",
    bestUse: "boiler_water_closed_cooling_deaeration_assist",
  },
  scale_inhibitor_poly: {
    effectiveness: 8, dosageRange: 9, compatibility: 8, envFriendly: 7, ciCost: 5,
    continuous: true, forClosedLoop: false,
    chemistry: "phosphonate_polymer_threshold_crystal_modify",
    bestUse: "cooling_tower_reverse_osmosis_scale_prevent",
  },
  vapor_phase_vci: {
    effectiveness: 7, dosageRange: 6, compatibility: 7, envFriendly: 8, ciCost: 6,
    continuous: false, forClosedLoop: true,
    chemistry: "volatile_corrosion_inhibitor_vapor_migrate",
    bestUse: "equipment_storage_shipping_mothball_layup",
  },
};

function get(t: CorrosionInhibitorType): CorrosionInhibitorData {
  return DATA[t];
}

export const effectiveness = (t: CorrosionInhibitorType) => get(t).effectiveness;
export const dosageRange = (t: CorrosionInhibitorType) => get(t).dosageRange;
export const compatibility = (t: CorrosionInhibitorType) => get(t).compatibility;
export const envFriendly = (t: CorrosionInhibitorType) => get(t).envFriendly;
export const ciCost = (t: CorrosionInhibitorType) => get(t).ciCost;
export const continuous = (t: CorrosionInhibitorType) => get(t).continuous;
export const forClosedLoop = (t: CorrosionInhibitorType) => get(t).forClosedLoop;
export const chemistry = (t: CorrosionInhibitorType) => get(t).chemistry;
export const bestUse = (t: CorrosionInhibitorType) => get(t).bestUse;
export const corrosionInhibitorTypes = (): CorrosionInhibitorType[] =>
  Object.keys(DATA) as CorrosionInhibitorType[];
