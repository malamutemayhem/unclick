export type AnchorWinchType =
  | "electric_horizontal_windlass"
  | "electric_vertical_capstan"
  | "hydraulic_horizontal_windlass"
  | "manual_hand_crank"
  | "combined_anchor_mooring";

interface AnchorWinchData {
  pullForce: number;
  speed: number;
  reliability: number;
  weight: number;
  awCost: number;
  freefall: boolean;
  forDeepWater: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<AnchorWinchType, AnchorWinchData> = {
  electric_horizontal_windlass: {
    pullForce: 8, speed: 8, reliability: 8, weight: 6, awCost: 6,
    freefall: true, forDeepWater: false,
    drive: "electric_motor_worm_gear",
    bestUse: "recreational_cruiser_mid_range",
  },
  electric_vertical_capstan: {
    pullForce: 7, speed: 7, reliability: 8, weight: 8, awCost: 7,
    freefall: false, forDeepWater: false,
    drive: "below_deck_electric_capstan",
    bestUse: "sailboat_deck_space_limited",
  },
  hydraulic_horizontal_windlass: {
    pullForce: 10, speed: 9, reliability: 9, weight: 5, awCost: 9,
    freefall: true, forDeepWater: true,
    drive: "hydraulic_motor_high_torque",
    bestUse: "commercial_vessel_heavy_anchor",
  },
  manual_hand_crank: {
    pullForce: 4, speed: 3, reliability: 10, weight: 9, awCost: 2,
    freefall: false, forDeepWater: false,
    drive: "ratchet_handle_manual_geared",
    bestUse: "small_boat_dinghy_backup",
  },
  combined_anchor_mooring: {
    pullForce: 9, speed: 8, reliability: 9, weight: 4, awCost: 10,
    freefall: true, forDeepWater: true,
    drive: "dual_drum_anchor_mooring_combined",
    bestUse: "offshore_vessel_dual_function",
  },
};

function get(t: AnchorWinchType): AnchorWinchData {
  return DATA[t];
}

export const pullForce = (t: AnchorWinchType) => get(t).pullForce;
export const speed = (t: AnchorWinchType) => get(t).speed;
export const reliability = (t: AnchorWinchType) => get(t).reliability;
export const weight = (t: AnchorWinchType) => get(t).weight;
export const awCost = (t: AnchorWinchType) => get(t).awCost;
export const freefall = (t: AnchorWinchType) => get(t).freefall;
export const forDeepWater = (t: AnchorWinchType) => get(t).forDeepWater;
export const drive = (t: AnchorWinchType) => get(t).drive;
export const bestUse = (t: AnchorWinchType) => get(t).bestUse;
export const anchorWinchTypes = (): AnchorWinchType[] =>
  Object.keys(DATA) as AnchorWinchType[];
