export type EjectorPumpType =
  | "sewage_grinder_cutter"
  | "effluent_low_solid"
  | "solids_handling_vortex"
  | "macerator_compact_inline"
  | "duplex_alternating_pair";

interface EjectorPumpData {
  capacity: number;
  head: number;
  solidSize: number;
  reliability: number;
  epCost: number;
  grinder: boolean;
  forSewage: boolean;
  impeller: string;
  bestUse: string;
}

const DATA: Record<EjectorPumpType, EjectorPumpData> = {
  sewage_grinder_cutter: {
    capacity: 8, head: 9, solidSize: 10, reliability: 7, epCost: 9,
    grinder: true, forSewage: true,
    impeller: "cutter_blade_grinder_disc",
    bestUse: "basement_bathroom_sewage_lift",
  },
  effluent_low_solid: {
    capacity: 7, head: 6, solidSize: 3, reliability: 8, epCost: 4,
    grinder: false, forSewage: false,
    impeller: "semi_open_vane_effluent",
    bestUse: "septic_tank_effluent_discharge",
  },
  solids_handling_vortex: {
    capacity: 9, head: 7, solidSize: 8, reliability: 8, epCost: 7,
    grinder: false, forSewage: true,
    impeller: "recessed_vortex_non_clog",
    bestUse: "commercial_sewage_high_flow",
  },
  macerator_compact_inline: {
    capacity: 4, head: 8, solidSize: 9, reliability: 6, epCost: 6,
    grinder: true, forSewage: true,
    impeller: "macerator_blade_compact_unit",
    bestUse: "retrofit_half_bath_tight_space",
  },
  duplex_alternating_pair: {
    capacity: 10, head: 8, solidSize: 7, reliability: 10, epCost: 10,
    grinder: false, forSewage: true,
    impeller: "dual_pump_alternating_lead_lag",
    bestUse: "commercial_duplex_redundant_system",
  },
};

function get(t: EjectorPumpType): EjectorPumpData {
  return DATA[t];
}

export const capacity = (t: EjectorPumpType) => get(t).capacity;
export const head = (t: EjectorPumpType) => get(t).head;
export const solidSize = (t: EjectorPumpType) => get(t).solidSize;
export const reliability = (t: EjectorPumpType) => get(t).reliability;
export const epCost = (t: EjectorPumpType) => get(t).epCost;
export const grinder = (t: EjectorPumpType) => get(t).grinder;
export const forSewage = (t: EjectorPumpType) => get(t).forSewage;
export const impeller = (t: EjectorPumpType) => get(t).impeller;
export const bestUse = (t: EjectorPumpType) => get(t).bestUse;
export const ejectorPumpTypes = (): EjectorPumpType[] =>
  Object.keys(DATA) as EjectorPumpType[];
