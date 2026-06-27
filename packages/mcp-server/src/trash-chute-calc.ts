export type TrashChuteType =
  | "gravity_stainless_round"
  | "fire_rated_uf_listed"
  | "tri_sorter_recycling"
  | "compactor_integrated"
  | "pneumatic_vacuum_tube";

interface TrashChuteData {
  capacity: number;
  safety: number;
  hygiene: number;
  noise: number;
  tcCost: number;
  fireRated: boolean;
  forHighRise: boolean;
  discharge: string;
  bestUse: string;
}

const DATA: Record<TrashChuteType, TrashChuteData> = {
  gravity_stainless_round: {
    capacity: 6, safety: 6, hygiene: 7, noise: 5, tcCost: 4,
    fireRated: false, forHighRise: false,
    discharge: "bottom_hopper_dumpster_gravity",
    bestUse: "mid_rise_apartment_basic",
  },
  fire_rated_uf_listed: {
    capacity: 7, safety: 10, hygiene: 8, noise: 6, tcCost: 7,
    fireRated: true, forHighRise: true,
    discharge: "fire_damper_spring_close_rated",
    bestUse: "high_rise_code_compliant",
  },
  tri_sorter_recycling: {
    capacity: 5, safety: 7, hygiene: 8, noise: 6, tcCost: 8,
    fireRated: true, forHighRise: true,
    discharge: "diverter_valve_three_stream",
    bestUse: "green_building_leed_recycle",
  },
  compactor_integrated: {
    capacity: 10, safety: 8, hygiene: 9, noise: 4, tcCost: 9,
    fireRated: true, forHighRise: true,
    discharge: "bottom_compactor_ram_auto",
    bestUse: "large_tower_hotel_volume",
  },
  pneumatic_vacuum_tube: {
    capacity: 8, safety: 9, hygiene: 10, noise: 3, tcCost: 10,
    fireRated: false, forHighRise: false,
    discharge: "vacuum_pipe_central_collect",
    bestUse: "hospital_district_automated",
  },
};

function get(t: TrashChuteType): TrashChuteData {
  return DATA[t];
}

export const capacity = (t: TrashChuteType) => get(t).capacity;
export const safety = (t: TrashChuteType) => get(t).safety;
export const hygiene = (t: TrashChuteType) => get(t).hygiene;
export const noise = (t: TrashChuteType) => get(t).noise;
export const tcCost = (t: TrashChuteType) => get(t).tcCost;
export const fireRated = (t: TrashChuteType) => get(t).fireRated;
export const forHighRise = (t: TrashChuteType) => get(t).forHighRise;
export const discharge = (t: TrashChuteType) => get(t).discharge;
export const bestUse = (t: TrashChuteType) => get(t).bestUse;
export const trashChuteTypes = (): TrashChuteType[] =>
  Object.keys(DATA) as TrashChuteType[];
