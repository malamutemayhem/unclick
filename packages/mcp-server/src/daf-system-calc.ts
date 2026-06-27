export type DafSystemType =
  | "full_flow_pressurized"
  | "partial_flow_split"
  | "recycle_flow_standard"
  | "induced_air_mechanical"
  | "cavitation_air_nozzle";

interface DafSystemData {
  removal: number;
  throughput: number;
  energy: number;
  footprint: number;
  dsCost: number;
  chemical: boolean;
  forOilRemoval: boolean;
  bubble: string;
  bestUse: string;
}

const DATA: Record<DafSystemType, DafSystemData> = {
  full_flow_pressurized: {
    removal: 9, throughput: 7, energy: 5, footprint: 5, dsCost: 7,
    chemical: true, forOilRemoval: true,
    bubble: "saturator_vessel_full_stream",
    bestUse: "refinery_oily_water_treatment",
  },
  partial_flow_split: {
    removal: 8, throughput: 8, energy: 7, footprint: 6, dsCost: 6,
    chemical: true, forOilRemoval: true,
    bubble: "split_stream_partial_saturate",
    bestUse: "food_process_fat_oil_grease",
  },
  recycle_flow_standard: {
    removal: 9, throughput: 9, energy: 8, footprint: 7, dsCost: 6,
    chemical: true, forOilRemoval: false,
    bubble: "recycle_pressurized_whitewater",
    bestUse: "municipal_primary_clarification",
  },
  induced_air_mechanical: {
    removal: 7, throughput: 10, energy: 6, footprint: 8, dsCost: 4,
    chemical: false, forOilRemoval: true,
    bubble: "rotor_stator_dispersed_air",
    bestUse: "offshore_produced_water_compact",
  },
  cavitation_air_nozzle: {
    removal: 8, throughput: 8, energy: 9, footprint: 9, dsCost: 8,
    chemical: false, forOilRemoval: false,
    bubble: "hydrodynamic_cavitation_nozzle",
    bestUse: "algae_harvest_microparticle_float",
  },
};

function get(t: DafSystemType): DafSystemData {
  return DATA[t];
}

export const removal = (t: DafSystemType) => get(t).removal;
export const throughput = (t: DafSystemType) => get(t).throughput;
export const energy = (t: DafSystemType) => get(t).energy;
export const footprint = (t: DafSystemType) => get(t).footprint;
export const dsCost = (t: DafSystemType) => get(t).dsCost;
export const chemical = (t: DafSystemType) => get(t).chemical;
export const forOilRemoval = (t: DafSystemType) => get(t).forOilRemoval;
export const bubble = (t: DafSystemType) => get(t).bubble;
export const bestUse = (t: DafSystemType) => get(t).bestUse;
export const dafSystemTypes = (): DafSystemType[] =>
  Object.keys(DATA) as DafSystemType[];
