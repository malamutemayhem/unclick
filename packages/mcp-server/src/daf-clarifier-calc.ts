export type DafClarifierType =
  | "full_flow_pressurize"
  | "partial_flow_recycle"
  | "induced_air_rotor"
  | "plate_pack_lamella"
  | "circular_scraper_daf";

interface DafClarifierData {
  removal: number;
  throughput: number;
  footprint: number;
  chemical: number;
  daCost: number;
  pressurized: boolean;
  forOily: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<DafClarifierType, DafClarifierData> = {
  full_flow_pressurize: {
    removal: 8, throughput: 7, footprint: 5, chemical: 7, daCost: 7,
    pressurized: true, forOily: true,
    mechanism: "full_stream_saturate_dissolve_air_release",
    bestUse: "drink_water_clarify_algae_turbidity",
  },
  partial_flow_recycle: {
    removal: 8, throughput: 8, footprint: 6, chemical: 7, daCost: 6,
    pressurized: true, forOily: true,
    mechanism: "recycle_portion_saturate_inject_mix",
    bestUse: "industrial_pretreat_paper_mill_effluent",
  },
  induced_air_rotor: {
    removal: 6, throughput: 9, footprint: 7, chemical: 5, daCost: 4,
    pressurized: false, forOily: true,
    mechanism: "rotor_induce_air_bubble_no_compressor",
    bestUse: "oilfield_produced_water_skim_separate",
  },
  plate_pack_lamella: {
    removal: 9, throughput: 8, footprint: 10, chemical: 8, daCost: 8,
    pressurized: true, forOily: false,
    mechanism: "inclined_plate_pack_reduce_rise_distance",
    bestUse: "high_rate_compact_retrofit_space_limit",
  },
  circular_scraper_daf: {
    removal: 8, throughput: 10, footprint: 4, chemical: 7, daCost: 6,
    pressurized: true, forOily: false,
    mechanism: "circular_tank_scraper_sludge_blanket",
    bestUse: "municipal_wastewater_primary_float_treat",
  },
};

function get(t: DafClarifierType): DafClarifierData {
  return DATA[t];
}

export const removal = (t: DafClarifierType) => get(t).removal;
export const throughput = (t: DafClarifierType) => get(t).throughput;
export const footprint = (t: DafClarifierType) => get(t).footprint;
export const chemical = (t: DafClarifierType) => get(t).chemical;
export const daCost = (t: DafClarifierType) => get(t).daCost;
export const pressurized = (t: DafClarifierType) => get(t).pressurized;
export const forOily = (t: DafClarifierType) => get(t).forOily;
export const mechanism = (t: DafClarifierType) => get(t).mechanism;
export const bestUse = (t: DafClarifierType) => get(t).bestUse;
export const dafClarifierTypes = (): DafClarifierType[] =>
  Object.keys(DATA) as DafClarifierType[];
