export type ConcretePumpType =
  | "boom_pump_truck_mounted"
  | "line_pump_trailer_mounted"
  | "placing_boom_tower_crane"
  | "squeeze_pump_peristaltic"
  | "pneumatic_pipe_blow";

interface ConcretePumpData {
  output: number;
  reach: number;
  pressure: number;
  mobility: number;
  cpCost: number;
  selfPropelled: boolean;
  forHighRise: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ConcretePumpType, ConcretePumpData> = {
  boom_pump_truck_mounted: {
    output: 9, reach: 9, pressure: 8, mobility: 10, cpCost: 9,
    selfPropelled: true, forHighRise: false,
    mechanism: "piston_valve_articulated_boom",
    bestUse: "commercial_slab_pour_fast_place",
  },
  line_pump_trailer_mounted: {
    output: 7, reach: 6, pressure: 9, mobility: 7, cpCost: 5,
    selfPropelled: false, forHighRise: true,
    mechanism: "piston_valve_steel_pipeline",
    bestUse: "residential_pour_grout_shotcrete",
  },
  placing_boom_tower_crane: {
    output: 8, reach: 10, pressure: 8, mobility: 3, cpCost: 8,
    selfPropelled: false, forHighRise: true,
    mechanism: "fixed_boom_tower_top_distribute",
    bestUse: "high_rise_core_floor_placement",
  },
  squeeze_pump_peristaltic: {
    output: 4, reach: 4, pressure: 6, mobility: 8, cpCost: 3,
    selfPropelled: false, forHighRise: false,
    mechanism: "roller_squeeze_flexible_tube",
    bestUse: "small_volume_grout_mortar_repair",
  },
  pneumatic_pipe_blow: {
    output: 5, reach: 5, pressure: 7, mobility: 6, cpCost: 4,
    selfPropelled: false, forHighRise: false,
    mechanism: "compressed_air_batch_blow",
    bestUse: "tunnel_lining_underground_tight",
  },
};

function get(t: ConcretePumpType): ConcretePumpData {
  return DATA[t];
}

export const output = (t: ConcretePumpType) => get(t).output;
export const reach = (t: ConcretePumpType) => get(t).reach;
export const pressure = (t: ConcretePumpType) => get(t).pressure;
export const mobility = (t: ConcretePumpType) => get(t).mobility;
export const cpCost = (t: ConcretePumpType) => get(t).cpCost;
export const selfPropelled = (t: ConcretePumpType) => get(t).selfPropelled;
export const forHighRise = (t: ConcretePumpType) => get(t).forHighRise;
export const mechanism = (t: ConcretePumpType) => get(t).mechanism;
export const bestUse = (t: ConcretePumpType) => get(t).bestUse;
export const concretePumpTypes = (): ConcretePumpType[] =>
  Object.keys(DATA) as ConcretePumpType[];
