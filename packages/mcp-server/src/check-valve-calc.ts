export type CheckValveType =
  | "swing_check_flapper_disc"
  | "lift_check_piston_spring"
  | "dual_plate_wafer_butterfly"
  | "ball_check_spherical_seat"
  | "tilting_disc_pivot_center";

interface CheckValveData {
  cracking: number;
  slamResist: number;
  pressure: number;
  flow: number;
  cvCost: number;
  springAssist: boolean;
  forPump: boolean;
  disc: string;
  bestUse: string;
}

const DATA: Record<CheckValveType, CheckValveData> = {
  swing_check_flapper_disc: {
    cracking: 7, slamResist: 4, pressure: 7, flow: 9, cvCost: 4,
    springAssist: false, forPump: true,
    disc: "hinged_flapper_disc_swing_arm",
    bestUse: "pump_discharge_horizontal_line",
  },
  lift_check_piston_spring: {
    cracking: 8, slamResist: 8, pressure: 9, flow: 6, cvCost: 6,
    springAssist: true, forPump: true,
    disc: "piston_guided_spring_loaded",
    bestUse: "high_pressure_boiler_feed_line",
  },
  dual_plate_wafer_butterfly: {
    cracking: 9, slamResist: 9, pressure: 7, flow: 8, cvCost: 5,
    springAssist: true, forPump: true,
    disc: "dual_plate_torsion_spring_wafer",
    bestUse: "compact_space_between_flanges",
  },
  ball_check_spherical_seat: {
    cracking: 5, slamResist: 3, pressure: 5, flow: 5, cvCost: 2,
    springAssist: false, forPump: false,
    disc: "rubber_ball_spherical_seat",
    bestUse: "sewage_slurry_solids_handling",
  },
  tilting_disc_pivot_center: {
    cracking: 8, slamResist: 7, pressure: 8, flow: 9, cvCost: 8,
    springAssist: false, forPump: true,
    disc: "center_pivot_tilting_disc",
    bestUse: "large_bore_water_main_low_loss",
  },
};

function get(t: CheckValveType): CheckValveData {
  return DATA[t];
}

export const cracking = (t: CheckValveType) => get(t).cracking;
export const slamResist = (t: CheckValveType) => get(t).slamResist;
export const pressure = (t: CheckValveType) => get(t).pressure;
export const flow = (t: CheckValveType) => get(t).flow;
export const cvCost = (t: CheckValveType) => get(t).cvCost;
export const springAssist = (t: CheckValveType) => get(t).springAssist;
export const forPump = (t: CheckValveType) => get(t).forPump;
export const disc = (t: CheckValveType) => get(t).disc;
export const bestUse = (t: CheckValveType) => get(t).bestUse;
export const checkValveTypes = (): CheckValveType[] =>
  Object.keys(DATA) as CheckValveType[];
