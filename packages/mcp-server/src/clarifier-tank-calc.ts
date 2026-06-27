export type ClarifierTankType =
  | "circular_center_feed"
  | "rectangular_chain_flight"
  | "lamella_plate_settler"
  | "solids_contact_upflow"
  | "dissolved_air_flotation";

interface ClarifierTankData {
  removalEff: number;
  hydraulicLoad: number;
  sludgeHandling: number;
  footprint: number;
  clCost: number;
  compact: boolean;
  forPrimary: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ClarifierTankType, ClarifierTankData> = {
  circular_center_feed: {
    removalEff: 8, hydraulicLoad: 7, sludgeHandling: 9, footprint: 5, clCost: 6,
    compact: false, forPrimary: true,
    mechanism: "center_feed_well_peripheral_weir_scraper_arm",
    bestUse: "municipal_wastewater_primary_secondary_settle",
  },
  rectangular_chain_flight: {
    removalEff: 7, hydraulicLoad: 8, sludgeHandling: 8, footprint: 6, clCost: 5,
    compact: false, forPrimary: true,
    mechanism: "chain_flight_scraper_longitudinal_sludge_move",
    bestUse: "large_plant_parallel_channel_primary_settling",
  },
  lamella_plate_settler: {
    removalEff: 9, hydraulicLoad: 10, sludgeHandling: 6, footprint: 10, clCost: 7,
    compact: true, forPrimary: false,
    mechanism: "inclined_plate_pack_counter_current_settling",
    bestUse: "space_limited_tertiary_treatment_high_rate",
  },
  solids_contact_upflow: {
    removalEff: 9, hydraulicLoad: 8, sludgeHandling: 7, footprint: 7, clCost: 8,
    compact: false, forPrimary: false,
    mechanism: "sludge_blanket_upflow_flocculation_contact",
    bestUse: "lime_softening_coagulation_water_treatment",
  },
  dissolved_air_flotation: {
    removalEff: 9, hydraulicLoad: 9, sludgeHandling: 8, footprint: 8, clCost: 8,
    compact: true, forPrimary: false,
    mechanism: "pressurized_recycle_micro_bubble_float_skim",
    bestUse: "oily_water_algae_low_density_solids_removal",
  },
};

function get(t: ClarifierTankType): ClarifierTankData {
  return DATA[t];
}

export const removalEff = (t: ClarifierTankType) => get(t).removalEff;
export const hydraulicLoad = (t: ClarifierTankType) => get(t).hydraulicLoad;
export const sludgeHandling = (t: ClarifierTankType) => get(t).sludgeHandling;
export const footprint = (t: ClarifierTankType) => get(t).footprint;
export const clCost = (t: ClarifierTankType) => get(t).clCost;
export const compact = (t: ClarifierTankType) => get(t).compact;
export const forPrimary = (t: ClarifierTankType) => get(t).forPrimary;
export const mechanism = (t: ClarifierTankType) => get(t).mechanism;
export const bestUse = (t: ClarifierTankType) => get(t).bestUse;
export const clarifierTankTypes = (): ClarifierTankType[] =>
  Object.keys(DATA) as ClarifierTankType[];
