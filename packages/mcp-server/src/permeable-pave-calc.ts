export type PermeablePaveType =
  | "permeable_concrete"
  | "porous_asphalt"
  | "permeable_interlocking"
  | "grass_grid_paver"
  | "gravel_grid_cell";

interface PermeablePaveData {
  infiltration: number;
  loadBearing: number;
  aesthetic: number;
  maintenance: number;
  ppCost: number;
  vehicleRated: boolean;
  forParking: boolean;
  surface: string;
  bestUse: string;
}

const DATA: Record<PermeablePaveType, PermeablePaveData> = {
  permeable_concrete: {
    infiltration: 8, loadBearing: 8, aesthetic: 6, maintenance: 5, ppCost: 7,
    vehicleRated: true, forParking: true,
    surface: "open_graded_concrete_no_fines",
    bestUse: "commercial_parking_lot_drive",
  },
  porous_asphalt: {
    infiltration: 9, loadBearing: 7, aesthetic: 5, maintenance: 5, ppCost: 6,
    vehicleRated: true, forParking: true,
    surface: "open_graded_asphalt_stone_bed",
    bestUse: "large_parking_area_road",
  },
  permeable_interlocking: {
    infiltration: 7, loadBearing: 9, aesthetic: 9, maintenance: 7, ppCost: 8,
    vehicleRated: true, forParking: true,
    surface: "concrete_paver_joint_fill_agg",
    bestUse: "plaza_sidewalk_decorative_park",
  },
  grass_grid_paver: {
    infiltration: 10, loadBearing: 5, aesthetic: 8, maintenance: 4, ppCost: 4,
    vehicleRated: false, forParking: false,
    surface: "hdpe_grid_grass_fill_turf",
    bestUse: "overflow_parking_fire_lane",
  },
  gravel_grid_cell: {
    infiltration: 10, loadBearing: 6, aesthetic: 4, maintenance: 6, ppCost: 3,
    vehicleRated: true, forParking: true,
    surface: "geocell_gravel_fill_stable",
    bestUse: "rural_driveway_utility_access",
  },
};

function get(t: PermeablePaveType): PermeablePaveData {
  return DATA[t];
}

export const infiltration = (t: PermeablePaveType) => get(t).infiltration;
export const loadBearing = (t: PermeablePaveType) => get(t).loadBearing;
export const aesthetic = (t: PermeablePaveType) => get(t).aesthetic;
export const maintenance = (t: PermeablePaveType) => get(t).maintenance;
export const ppCost = (t: PermeablePaveType) => get(t).ppCost;
export const vehicleRated = (t: PermeablePaveType) => get(t).vehicleRated;
export const forParking = (t: PermeablePaveType) => get(t).forParking;
export const surface = (t: PermeablePaveType) => get(t).surface;
export const bestUse = (t: PermeablePaveType) => get(t).bestUse;
export const permeablePaveTypes = (): PermeablePaveType[] =>
  Object.keys(DATA) as PermeablePaveType[];
