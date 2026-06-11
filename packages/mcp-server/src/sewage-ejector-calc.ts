export type SewageEjectorType =
  | "submersible_grinder"
  | "submersible_solids_handle"
  | "pneumatic_ejector_air"
  | "duplex_alternating"
  | "macerator_compact";

interface SewageEjectorData {
  solidsHandling: number;
  flowRate: number;
  reliability: number;
  maintenance: number;
  seCost: number;
  grinder: boolean;
  forBasement: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SewageEjectorType, SewageEjectorData> = {
  submersible_grinder: {
    solidsHandling: 10, flowRate: 6, reliability: 7, maintenance: 5, seCost: 7,
    grinder: true, forBasement: true,
    mechanism: "rotating_cutter_ring_stationary_plate_macerate_solids",
    bestUse: "basement_bathroom_small_bore_pipe_retrofit_lift",
  },
  submersible_solids_handle: {
    solidsHandling: 8, flowRate: 9, reliability: 9, maintenance: 8, seCost: 6,
    grinder: false, forBasement: true,
    mechanism: "vortex_or_channel_impeller_large_sphere_passage",
    bestUse: "commercial_building_basement_sewage_lift_station",
  },
  pneumatic_ejector_air: {
    solidsHandling: 7, flowRate: 5, reliability: 8, maintenance: 9, seCost: 7,
    grinder: false, forBasement: false,
    mechanism: "compressed_air_displacement_sealed_receiver_tank",
    bestUse: "hazardous_location_no_electric_in_wet_well_sewer",
  },
  duplex_alternating: {
    solidsHandling: 8, flowRate: 10, reliability: 10, maintenance: 7, seCost: 9,
    grinder: false, forBasement: false,
    mechanism: "two_pump_alternating_lead_lag_float_switch_panel",
    bestUse: "municipal_lift_station_commercial_redundant_critical",
  },
  macerator_compact: {
    solidsHandling: 9, flowRate: 4, reliability: 6, maintenance: 5, seCost: 4,
    grinder: true, forBasement: true,
    mechanism: "compact_macerator_behind_wall_small_pipe_pressure",
    bestUse: "residential_half_bath_addition_no_gravity_sewer",
  },
};

function get(t: SewageEjectorType): SewageEjectorData {
  return DATA[t];
}

export const solidsHandling = (t: SewageEjectorType) => get(t).solidsHandling;
export const flowRate = (t: SewageEjectorType) => get(t).flowRate;
export const reliability = (t: SewageEjectorType) => get(t).reliability;
export const maintenance = (t: SewageEjectorType) => get(t).maintenance;
export const seCost = (t: SewageEjectorType) => get(t).seCost;
export const grinder = (t: SewageEjectorType) => get(t).grinder;
export const forBasement = (t: SewageEjectorType) => get(t).forBasement;
export const mechanism = (t: SewageEjectorType) => get(t).mechanism;
export const bestUse = (t: SewageEjectorType) => get(t).bestUse;
export const sewageEjectorTypes = (): SewageEjectorType[] =>
  Object.keys(DATA) as SewageEjectorType[];
