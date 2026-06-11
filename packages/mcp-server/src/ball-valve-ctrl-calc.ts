export type BallValveCtrlType =
  | "v_port_segment"
  | "full_bore_trunnion"
  | "characterized_ball"
  | "metal_seated_high_temp"
  | "cavity_filler_clog";

interface BallValveCtrlData {
  capacity: number;
  shutoff: number;
  rangeability: number;
  speed: number;
  bvCost: number;
  quarterTurn: boolean;
  forSlurry: boolean;
  ball: string;
  bestUse: string;
}

const DATA: Record<BallValveCtrlType, BallValveCtrlData> = {
  v_port_segment: {
    capacity: 8, shutoff: 8, rangeability: 9, speed: 9, bvCost: 6,
    quarterTurn: true, forSlurry: false,
    ball: "v_notch_segment_shear_characterize",
    bestUse: "pulp_paper_slurry_fibrous_media_control",
  },
  full_bore_trunnion: {
    capacity: 10, shutoff: 10, rangeability: 5, speed: 8, bvCost: 8,
    quarterTurn: true, forSlurry: false,
    ball: "full_bore_trunnion_mount_dbb_seal",
    bestUse: "pipeline_isolation_high_pressure_gas",
  },
  characterized_ball: {
    capacity: 8, shutoff: 9, rangeability: 8, speed: 8, bvCost: 7,
    quarterTurn: true, forSlurry: false,
    ball: "contoured_bore_equal_percent_linear",
    bestUse: "chemical_process_precise_throttle_ctrl",
  },
  metal_seated_high_temp: {
    capacity: 9, shutoff: 7, rangeability: 6, speed: 7, bvCost: 9,
    quarterTurn: true, forSlurry: false,
    ball: "stellite_chrome_metal_seat_high_temp",
    bestUse: "refinery_coker_high_temp_erosive_duty",
  },
  cavity_filler_clog: {
    capacity: 8, shutoff: 8, rangeability: 7, speed: 8, bvCost: 7,
    quarterTurn: true, forSlurry: true,
    ball: "cavity_filler_flush_port_no_dead_zone",
    bestUse: "food_pharma_flush_cavity_no_buildup",
  },
};

function get(t: BallValveCtrlType): BallValveCtrlData {
  return DATA[t];
}

export const capacity = (t: BallValveCtrlType) => get(t).capacity;
export const shutoff = (t: BallValveCtrlType) => get(t).shutoff;
export const rangeability = (t: BallValveCtrlType) => get(t).rangeability;
export const speed = (t: BallValveCtrlType) => get(t).speed;
export const bvCost = (t: BallValveCtrlType) => get(t).bvCost;
export const quarterTurn = (t: BallValveCtrlType) => get(t).quarterTurn;
export const forSlurry = (t: BallValveCtrlType) => get(t).forSlurry;
export const ball = (t: BallValveCtrlType) => get(t).ball;
export const bestUse = (t: BallValveCtrlType) => get(t).bestUse;
export const ballValveCtrlTypes = (): BallValveCtrlType[] =>
  Object.keys(DATA) as BallValveCtrlType[];
