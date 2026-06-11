export type CofferdamType =
  | "single_wall_sheet_pile"
  | "double_wall_cellular"
  | "earth_fill_diversion"
  | "braced_frame_strut"
  | "inflatable_rubber_bladder";

interface CofferdamData {
  depth: number;
  waterTight: number;
  strength: number;
  speed: number;
  cfCost: number;
  reusable: boolean;
  forBridge: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<CofferdamType, CofferdamData> = {
  single_wall_sheet_pile: {
    depth: 6, waterTight: 7, strength: 6, speed: 8, cfCost: 5,
    reusable: true, forBridge: true,
    construction: "interlocking_steel_sheets_driven",
    bestUse: "shallow_pier_foundation_river",
  },
  double_wall_cellular: {
    depth: 9, waterTight: 9, strength: 10, speed: 5, cfCost: 8,
    reusable: false, forBridge: true,
    construction: "two_sheet_walls_fill_between",
    bestUse: "deep_water_dam_foundation_heavy",
  },
  earth_fill_diversion: {
    depth: 4, waterTight: 4, strength: 7, speed: 7, cfCost: 3,
    reusable: false, forBridge: false,
    construction: "compacted_earth_clay_core",
    bestUse: "river_diversion_temporary_dam_site",
  },
  braced_frame_strut: {
    depth: 7, waterTight: 6, strength: 8, speed: 6, cfCost: 6,
    reusable: true, forBridge: true,
    construction: "steel_frame_waler_strut_brace",
    bestUse: "urban_excavation_basement_utility",
  },
  inflatable_rubber_bladder: {
    depth: 3, waterTight: 8, strength: 3, speed: 10, cfCost: 4,
    reusable: true, forBridge: false,
    construction: "rubber_fabric_bladder_air_water",
    bestUse: "rapid_deploy_pipe_repair_shallow",
  },
};

function get(t: CofferdamType): CofferdamData {
  return DATA[t];
}

export const depth = (t: CofferdamType) => get(t).depth;
export const waterTight = (t: CofferdamType) => get(t).waterTight;
export const strength = (t: CofferdamType) => get(t).strength;
export const speed = (t: CofferdamType) => get(t).speed;
export const cfCost = (t: CofferdamType) => get(t).cfCost;
export const reusable = (t: CofferdamType) => get(t).reusable;
export const forBridge = (t: CofferdamType) => get(t).forBridge;
export const construction = (t: CofferdamType) => get(t).construction;
export const bestUse = (t: CofferdamType) => get(t).bestUse;
export const cofferdamTypes = (): CofferdamType[] =>
  Object.keys(DATA) as CofferdamType[];
