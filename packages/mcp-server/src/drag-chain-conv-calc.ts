export type DragChainConvType =
  | "en_masse_bulk"
  | "tubular_disc_chain"
  | "drag_flight_scraper"
  | "submerged_chain_ash"
  | "paddle_chain_reclaim";

interface DragChainConvData {
  throughput: number;
  sealing: number;
  versatility: number;
  durability: number;
  dcCost: number;
  enclosed: boolean;
  forHot: boolean;
  chain: string;
  bestUse: string;
}

const DATA: Record<DragChainConvType, DragChainConvData> = {
  en_masse_bulk: {
    throughput: 9, sealing: 9, versatility: 8, durability: 8, dcCost: 7,
    enclosed: true, forHot: false,
    chain: "forged_link_flight_full_cross_section",
    bestUse: "grain_cement_chemical_enclosed_move",
  },
  tubular_disc_chain: {
    throughput: 6, sealing: 10, versatility: 9, durability: 7, dcCost: 8,
    enclosed: true, forHot: false,
    chain: "disc_puck_cable_tube_enclosed",
    bestUse: "food_pharma_fragile_gentle_convey",
  },
  drag_flight_scraper: {
    throughput: 8, sealing: 7, versatility: 7, durability: 9, dcCost: 5,
    enclosed: true, forHot: false,
    chain: "flat_flight_scraper_trough_bottom",
    bestUse: "coal_sawdust_trough_floor_reclaim",
  },
  submerged_chain_ash: {
    throughput: 7, sealing: 8, versatility: 5, durability: 10, dcCost: 8,
    enclosed: true, forHot: true,
    chain: "heat_resist_chain_water_trough_cool",
    bestUse: "boiler_bottom_ash_hot_clinker_remove",
  },
  paddle_chain_reclaim: {
    throughput: 8, sealing: 6, versatility: 6, durability: 8, dcCost: 6,
    enclosed: false, forHot: false,
    chain: "paddle_flight_chain_silo_floor",
    bestUse: "silo_bin_floor_reclaim_sweep_arm",
  },
};

function get(t: DragChainConvType): DragChainConvData {
  return DATA[t];
}

export const throughput = (t: DragChainConvType) => get(t).throughput;
export const sealing = (t: DragChainConvType) => get(t).sealing;
export const versatility = (t: DragChainConvType) => get(t).versatility;
export const durability = (t: DragChainConvType) => get(t).durability;
export const dcCost = (t: DragChainConvType) => get(t).dcCost;
export const enclosed = (t: DragChainConvType) => get(t).enclosed;
export const forHot = (t: DragChainConvType) => get(t).forHot;
export const chain = (t: DragChainConvType) => get(t).chain;
export const bestUse = (t: DragChainConvType) => get(t).bestUse;
export const dragChainConvTypes = (): DragChainConvType[] =>
  Object.keys(DATA) as DragChainConvType[];
