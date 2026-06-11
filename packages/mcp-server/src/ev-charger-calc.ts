export type EvChargerType =
  | "level_2_wall_mount"
  | "level_2_pedestal_dual"
  | "dc_fast_50kw_ccs"
  | "dc_fast_150kw_ccs"
  | "dc_ultra_350kw_liquid";

interface EvChargerData {
  power: number;
  speed: number;
  cost_: number;
  installEase: number;
  evCost: number;
  dcFast: boolean;
  forCommercial: boolean;
  connector: string;
  bestUse: string;
}

const DATA: Record<EvChargerType, EvChargerData> = {
  level_2_wall_mount: {
    power: 3, speed: 3, cost_: 2, installEase: 9, evCost: 2,
    dcFast: false, forCommercial: false,
    connector: "j1772_level_2_240v_48a",
    bestUse: "residential_garage_overnight",
  },
  level_2_pedestal_dual: {
    power: 4, speed: 3, cost_: 4, installEase: 7, evCost: 4,
    dcFast: false, forCommercial: true,
    connector: "j1772_dual_port_pedestal",
    bestUse: "workplace_parking_retail_lot",
  },
  dc_fast_50kw_ccs: {
    power: 6, speed: 7, cost_: 7, installEase: 4, evCost: 7,
    dcFast: true, forCommercial: true,
    connector: "ccs_combo_1_dc_50kw",
    bestUse: "fleet_depot_urban_station",
  },
  dc_fast_150kw_ccs: {
    power: 8, speed: 9, cost_: 9, installEase: 3, evCost: 9,
    dcFast: true, forCommercial: true,
    connector: "ccs_combo_1_dc_150kw_cooled",
    bestUse: "highway_corridor_fast_charge",
  },
  dc_ultra_350kw_liquid: {
    power: 10, speed: 10, cost_: 10, installEase: 2, evCost: 10,
    dcFast: true, forCommercial: true,
    connector: "ccs_350kw_liquid_cooled_cable",
    bestUse: "flagship_station_ultra_rapid",
  },
};

function get(t: EvChargerType): EvChargerData {
  return DATA[t];
}

export const power = (t: EvChargerType) => get(t).power;
export const speed = (t: EvChargerType) => get(t).speed;
export const cost_ = (t: EvChargerType) => get(t).cost_;
export const installEase = (t: EvChargerType) => get(t).installEase;
export const evCost = (t: EvChargerType) => get(t).evCost;
export const dcFast = (t: EvChargerType) => get(t).dcFast;
export const forCommercial = (t: EvChargerType) => get(t).forCommercial;
export const connector = (t: EvChargerType) => get(t).connector;
export const bestUse = (t: EvChargerType) => get(t).bestUse;
export const evChargerTypes = (): EvChargerType[] =>
  Object.keys(DATA) as EvChargerType[];
