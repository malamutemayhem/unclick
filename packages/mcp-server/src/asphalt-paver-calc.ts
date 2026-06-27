export type AsphaltPaverType =
  | "tracked_paver_highway"
  | "wheeled_paver_urban"
  | "mini_paver_path_utility"
  | "screed_extend_wide"
  | "commercial_mtd_material";

interface AsphaltPaverData {
  width: number;
  speed: number;
  smoothness: number;
  capacity: number;
  apCost: number;
  tracked: boolean;
  forHighway: boolean;
  screed: string;
  bestUse: string;
}

const DATA: Record<AsphaltPaverType, AsphaltPaverData> = {
  tracked_paver_highway: {
    width: 9, speed: 8, smoothness: 9, capacity: 10, apCost: 9,
    tracked: true, forHighway: true,
    screed: "vibratory_tamper_heated_extend",
    bestUse: "highway_mainline_thick_lift",
  },
  wheeled_paver_urban: {
    width: 7, speed: 9, smoothness: 8, capacity: 7, apCost: 7,
    tracked: false, forHighway: false,
    screed: "vibratory_screed_rubber_tire",
    bestUse: "urban_street_parking_lot_travel",
  },
  mini_paver_path_utility: {
    width: 3, speed: 5, smoothness: 6, capacity: 3, apCost: 4,
    tracked: true, forHighway: false,
    screed: "narrow_screed_compact_frame",
    bestUse: "bike_path_trench_patch_narrow",
  },
  screed_extend_wide: {
    width: 10, speed: 7, smoothness: 9, capacity: 9, apCost: 10,
    tracked: true, forHighway: true,
    screed: "telescopic_extend_hydraulic_wide",
    bestUse: "runway_wide_road_single_pass",
  },
  commercial_mtd_material: {
    width: 6, speed: 6, smoothness: 7, capacity: 6, apCost: 5,
    tracked: true, forHighway: false,
    screed: "hopper_spread_auger_material",
    bestUse: "base_course_chip_seal_aggregate",
  },
};

function get(t: AsphaltPaverType): AsphaltPaverData {
  return DATA[t];
}

export const width = (t: AsphaltPaverType) => get(t).width;
export const speed = (t: AsphaltPaverType) => get(t).speed;
export const smoothness = (t: AsphaltPaverType) => get(t).smoothness;
export const capacity = (t: AsphaltPaverType) => get(t).capacity;
export const apCost = (t: AsphaltPaverType) => get(t).apCost;
export const tracked = (t: AsphaltPaverType) => get(t).tracked;
export const forHighway = (t: AsphaltPaverType) => get(t).forHighway;
export const screed = (t: AsphaltPaverType) => get(t).screed;
export const bestUse = (t: AsphaltPaverType) => get(t).bestUse;
export const asphaltPaverTypes = (): AsphaltPaverType[] =>
  Object.keys(DATA) as AsphaltPaverType[];
