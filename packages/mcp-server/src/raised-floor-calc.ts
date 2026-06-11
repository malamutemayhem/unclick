export type RaisedFloorType =
  | "steel_cement_filled"
  | "aluminum_die_cast"
  | "calcium_sulphate_wood"
  | "perforated_airflow_tile"
  | "conductive_esd_vinyl";

interface RaisedFloorData {
  loadCapacity: number;
  airflow: number;
  fireRating: number;
  acoustic: number;
  rfCost: number;
  esdSafe: boolean;
  forDataCenter: boolean;
  panel: string;
  bestUse: string;
}

const DATA: Record<RaisedFloorType, RaisedFloorData> = {
  steel_cement_filled: {
    loadCapacity: 10, airflow: 6, fireRating: 9, acoustic: 8, rfCost: 6,
    esdSafe: false, forDataCenter: true,
    panel: "steel_shell_cement_core_600mm",
    bestUse: "heavy_equipment_server_room",
  },
  aluminum_die_cast: {
    loadCapacity: 7, airflow: 8, fireRating: 8, acoustic: 5, rfCost: 8,
    esdSafe: true, forDataCenter: true,
    panel: "aluminum_die_cast_bare_perforated",
    bestUse: "data_center_underfloor_plenum",
  },
  calcium_sulphate_wood: {
    loadCapacity: 6, airflow: 5, fireRating: 7, acoustic: 9, rfCost: 5,
    esdSafe: false, forDataCenter: false,
    panel: "calcium_sulphate_core_hpl_finish",
    bestUse: "office_telecom_room_general",
  },
  perforated_airflow_tile: {
    loadCapacity: 8, airflow: 10, fireRating: 8, acoustic: 4, rfCost: 7,
    esdSafe: true, forDataCenter: true,
    panel: "steel_perforated_25_percent_open",
    bestUse: "hot_aisle_cold_aisle_supply",
  },
  conductive_esd_vinyl: {
    loadCapacity: 5, airflow: 5, fireRating: 6, acoustic: 7, rfCost: 4,
    esdSafe: true, forDataCenter: false,
    panel: "wood_core_conductive_vinyl_top",
    bestUse: "electronics_lab_cleanroom_esd",
  },
};

function get(t: RaisedFloorType): RaisedFloorData {
  return DATA[t];
}

export const loadCapacity = (t: RaisedFloorType) => get(t).loadCapacity;
export const airflow = (t: RaisedFloorType) => get(t).airflow;
export const fireRating = (t: RaisedFloorType) => get(t).fireRating;
export const acoustic = (t: RaisedFloorType) => get(t).acoustic;
export const rfCost = (t: RaisedFloorType) => get(t).rfCost;
export const esdSafe = (t: RaisedFloorType) => get(t).esdSafe;
export const forDataCenter = (t: RaisedFloorType) => get(t).forDataCenter;
export const panel = (t: RaisedFloorType) => get(t).panel;
export const bestUse = (t: RaisedFloorType) => get(t).bestUse;
export const raisedFloorTypes = (): RaisedFloorType[] =>
  Object.keys(DATA) as RaisedFloorType[];
