export type MarineWinchType =
  | "mooring_drum"
  | "towing_traction"
  | "anchor_handling"
  | "deep_sea_research"
  | "cargo_deck";

interface MarineWinchData {
  pullForce: number;
  speed: number;
  lineCapacity: number;
  controlPrecision: number;
  mwCost: number;
  hydraulic: boolean;
  forOffshore: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<MarineWinchType, MarineWinchData> = {
  mooring_drum: {
    pullForce: 7, speed: 6, lineCapacity: 8, controlPrecision: 6, mwCost: 5,
    hydraulic: true, forOffshore: false,
    drive: "hydraulic_motor_drum_brake_automatic_tension_mooring_line",
    bestUse: "vessel_berth_mooring_port_terminal_ship_to_shore_line",
  },
  towing_traction: {
    pullForce: 10, speed: 5, lineCapacity: 9, controlPrecision: 7, mwCost: 8,
    hydraulic: true, forOffshore: true,
    drive: "waterfall_drum_split_drum_towing_pin_render_recover",
    bestUse: "tugboat_ocean_towing_salvage_barge_heavy_tow_operation",
  },
  anchor_handling: {
    pullForce: 10, speed: 7, lineCapacity: 10, controlPrecision: 8, mwCost: 9,
    hydraulic: true, forOffshore: true,
    drive: "double_drum_shark_jaw_chain_stopper_anchor_deploy_recover",
    bestUse: "ahts_vessel_rig_move_anchor_handling_offshore_platform",
  },
  deep_sea_research: {
    pullForce: 5, speed: 4, lineCapacity: 7, controlPrecision: 10, mwCost: 10,
    hydraulic: false, forOffshore: true,
    drive: "electric_servo_drive_heave_compensated_fiber_optic_cable",
    bestUse: "research_vessel_rov_coring_deep_ocean_scientific_winch",
  },
  cargo_deck: {
    pullForce: 6, speed: 8, lineCapacity: 6, controlPrecision: 7, mwCost: 4,
    hydraulic: true, forOffshore: false,
    drive: "hydraulic_deck_mounted_warping_cargo_securing_pull",
    bestUse: "general_cargo_vessel_deck_securing_lashing_warping_duty",
  },
};

function get(t: MarineWinchType): MarineWinchData {
  return DATA[t];
}

export const pullForce = (t: MarineWinchType) => get(t).pullForce;
export const speed = (t: MarineWinchType) => get(t).speed;
export const lineCapacity = (t: MarineWinchType) => get(t).lineCapacity;
export const controlPrecision = (t: MarineWinchType) => get(t).controlPrecision;
export const mwCost = (t: MarineWinchType) => get(t).mwCost;
export const hydraulic = (t: MarineWinchType) => get(t).hydraulic;
export const forOffshore = (t: MarineWinchType) => get(t).forOffshore;
export const drive = (t: MarineWinchType) => get(t).drive;
export const bestUse = (t: MarineWinchType) => get(t).bestUse;
export const marineWinchTypes = (): MarineWinchType[] =>
  Object.keys(DATA) as MarineWinchType[];
