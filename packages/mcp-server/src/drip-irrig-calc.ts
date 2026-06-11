export type DripIrrigType =
  | "inline_emitter_tubing"
  | "point_source_drip_stake"
  | "subsurface_buried_drip"
  | "micro_sprinkler_fan"
  | "pressure_compensating_pc";

interface DripIrrigData {
  uniformity: number;
  efficiency: number;
  clogResist: number;
  coverage: number;
  diCost: number;
  subsurface: boolean;
  forSlope: boolean;
  emitter: string;
  bestUse: string;
}

const DATA: Record<DripIrrigType, DripIrrigData> = {
  inline_emitter_tubing: {
    uniformity: 8, efficiency: 9, clogResist: 7, coverage: 7, diCost: 4,
    subsurface: false, forSlope: false,
    emitter: "inline_turbulent_flow_12in_space",
    bestUse: "row_crop_vegetable_bed",
  },
  point_source_drip_stake: {
    uniformity: 9, efficiency: 9, clogResist: 6, coverage: 5, diCost: 5,
    subsurface: false, forSlope: true,
    emitter: "button_dripper_stake_adjustable",
    bestUse: "container_planter_landscape",
  },
  subsurface_buried_drip: {
    uniformity: 10, efficiency: 10, clogResist: 5, coverage: 8, diCost: 8,
    subsurface: true, forSlope: true,
    emitter: "buried_pc_emitter_root_barrier",
    bestUse: "turf_sports_field_permanent",
  },
  micro_sprinkler_fan: {
    uniformity: 6, efficiency: 7, clogResist: 8, coverage: 9, diCost: 5,
    subsurface: false, forSlope: false,
    emitter: "rotating_micro_sprinkler_head",
    bestUse: "orchard_grove_under_canopy",
  },
  pressure_compensating_pc: {
    uniformity: 10, efficiency: 9, clogResist: 7, coverage: 7, diCost: 6,
    subsurface: false, forSlope: true,
    emitter: "pressure_compensating_diaphragm",
    bestUse: "hillside_terrace_elevation_change",
  },
};

function get(t: DripIrrigType): DripIrrigData {
  return DATA[t];
}

export const uniformity = (t: DripIrrigType) => get(t).uniformity;
export const efficiency = (t: DripIrrigType) => get(t).efficiency;
export const clogResist = (t: DripIrrigType) => get(t).clogResist;
export const coverage = (t: DripIrrigType) => get(t).coverage;
export const diCost = (t: DripIrrigType) => get(t).diCost;
export const subsurface = (t: DripIrrigType) => get(t).subsurface;
export const forSlope = (t: DripIrrigType) => get(t).forSlope;
export const emitter = (t: DripIrrigType) => get(t).emitter;
export const bestUse = (t: DripIrrigType) => get(t).bestUse;
export const dripIrrigTypes = (): DripIrrigType[] =>
  Object.keys(DATA) as DripIrrigType[];
