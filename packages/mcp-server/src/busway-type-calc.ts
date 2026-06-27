export type BuswayTypeType =
  | "feeder_busway_sandwich"
  | "plug_in_busway_tap_off"
  | "trolley_busway_sliding"
  | "lighting_busway_track"
  | "isolated_phase_bus_high";

interface BuswayTypeData {
  capacity: number;
  flexibility: number;
  safety: number;
  efficiency: number;
  bwCost: number;
  plugIn: boolean;
  forDistribution: boolean;
  conductor: string;
  bestUse: string;
}

const DATA: Record<BuswayTypeType, BuswayTypeData> = {
  feeder_busway_sandwich: {
    capacity: 10, flexibility: 3, safety: 8, efficiency: 9, bwCost: 8,
    plugIn: false, forDistribution: true,
    conductor: "copper_aluminum_sandwich_bar",
    bestUse: "main_feeder_switchboard_to_panel",
  },
  plug_in_busway_tap_off: {
    capacity: 8, flexibility: 9, safety: 7, efficiency: 8, bwCost: 7,
    plugIn: true, forDistribution: true,
    conductor: "copper_bar_plug_in_opening",
    bestUse: "manufacturing_floor_flexible_power",
  },
  trolley_busway_sliding: {
    capacity: 5, flexibility: 10, safety: 5, efficiency: 6, bwCost: 5,
    plugIn: true, forDistribution: false,
    conductor: "bare_copper_rail_trolley_contact",
    bestUse: "crane_hoist_sliding_power_feed",
  },
  lighting_busway_track: {
    capacity: 3, flexibility: 8, safety: 7, efficiency: 7, bwCost: 3,
    plugIn: true, forDistribution: false,
    conductor: "copper_strip_track_channel",
    bestUse: "retail_gallery_adjustable_light",
  },
  isolated_phase_bus_high: {
    capacity: 10, flexibility: 1, safety: 10, efficiency: 10, bwCost: 10,
    plugIn: false, forDistribution: true,
    conductor: "aluminum_tube_isolated_phase",
    bestUse: "generator_output_high_current_path",
  },
};

function get(t: BuswayTypeType): BuswayTypeData {
  return DATA[t];
}

export const capacity = (t: BuswayTypeType) => get(t).capacity;
export const flexibility = (t: BuswayTypeType) => get(t).flexibility;
export const safety = (t: BuswayTypeType) => get(t).safety;
export const efficiency = (t: BuswayTypeType) => get(t).efficiency;
export const bwCost = (t: BuswayTypeType) => get(t).bwCost;
export const plugIn = (t: BuswayTypeType) => get(t).plugIn;
export const forDistribution = (t: BuswayTypeType) => get(t).forDistribution;
export const conductor = (t: BuswayTypeType) => get(t).conductor;
export const bestUse = (t: BuswayTypeType) => get(t).bestUse;
export const buswayTypeTypes = (): BuswayTypeType[] =>
  Object.keys(DATA) as BuswayTypeType[];
