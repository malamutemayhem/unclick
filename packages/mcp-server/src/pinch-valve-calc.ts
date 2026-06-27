export type PinchValveType =
  | "air_operated_sleeve"
  | "mechanical_pinch_bar"
  | "open_body_clamp"
  | "enclosed_body_inline"
  | "control_pinch_modulate";

interface PinchValveData {
  slurryCapability: number;
  abrasionResist: number;
  throttling: number;
  maintenance: number;
  pvCost: number;
  fullBore: boolean;
  forAbrasive: boolean;
  sleeve: string;
  bestUse: string;
}

const DATA: Record<PinchValveType, PinchValveData> = {
  air_operated_sleeve: {
    slurryCapability: 10, abrasionResist: 9, throttling: 5, maintenance: 9, pvCost: 4,
    fullBore: true, forAbrasive: true,
    sleeve: "natural_rubber_neoprene_air_inflate",
    bestUse: "mining_slurry_tailings_on_off_isolate",
  },
  mechanical_pinch_bar: {
    slurryCapability: 9, abrasionResist: 8, throttling: 4, maintenance: 8, pvCost: 3,
    fullBore: true, forAbrasive: true,
    sleeve: "rubber_sleeve_bar_clamp_manual_hand",
    bestUse: "gravity_flow_hopper_discharge_simple",
  },
  open_body_clamp: {
    slurryCapability: 8, abrasionResist: 7, throttling: 3, maintenance: 10, pvCost: 2,
    fullBore: true, forAbrasive: false,
    sleeve: "hose_tube_clamp_visible_squeeze_open",
    bestUse: "lab_sample_tube_low_pressure_pinch",
  },
  enclosed_body_inline: {
    slurryCapability: 10, abrasionResist: 10, throttling: 6, maintenance: 8, pvCost: 5,
    fullBore: true, forAbrasive: true,
    sleeve: "reinforced_sleeve_enclosed_pipe_body",
    bestUse: "cement_powder_abrasive_bulk_material",
  },
  control_pinch_modulate: {
    slurryCapability: 9, abrasionResist: 9, throttling: 8, maintenance: 7, pvCost: 7,
    fullBore: true, forAbrasive: true,
    sleeve: "precision_sleeve_positioner_4_20ma",
    bestUse: "mineral_process_modulate_flow_control",
  },
};

function get(t: PinchValveType): PinchValveData {
  return DATA[t];
}

export const slurryCapability = (t: PinchValveType) => get(t).slurryCapability;
export const abrasionResist = (t: PinchValveType) => get(t).abrasionResist;
export const throttling = (t: PinchValveType) => get(t).throttling;
export const maintenance = (t: PinchValveType) => get(t).maintenance;
export const pvCost = (t: PinchValveType) => get(t).pvCost;
export const fullBore = (t: PinchValveType) => get(t).fullBore;
export const forAbrasive = (t: PinchValveType) => get(t).forAbrasive;
export const sleeve = (t: PinchValveType) => get(t).sleeve;
export const bestUse = (t: PinchValveType) => get(t).bestUse;
export const pinchValveTypes = (): PinchValveType[] =>
  Object.keys(DATA) as PinchValveType[];
