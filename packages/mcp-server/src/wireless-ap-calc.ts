export type WirelessApType =
  | "indoor_ceiling_wifi6e"
  | "outdoor_mesh_hardened"
  | "wall_plate_hotel_room"
  | "high_density_stadium"
  | "industrial_hazardous_loc";

interface WirelessApData {
  throughput: number;
  coverage: number;
  density: number;
  reliability: number;
  apCost: number;
  wifi6e: boolean;
  forOutdoor: boolean;
  antenna: string;
  bestUse: string;
}

const DATA: Record<WirelessApType, WirelessApData> = {
  indoor_ceiling_wifi6e: {
    throughput: 9, coverage: 8, density: 7, reliability: 9, apCost: 5,
    wifi6e: true, forOutdoor: false,
    antenna: "internal_4x4_mimo_omni_6ghz",
    bestUse: "office_classroom_general_wifi",
  },
  outdoor_mesh_hardened: {
    throughput: 7, coverage: 10, density: 5, reliability: 9, apCost: 7,
    wifi6e: false, forOutdoor: true,
    antenna: "directional_sector_ip67_mesh",
    bestUse: "campus_parking_lot_outdoor",
  },
  wall_plate_hotel_room: {
    throughput: 6, coverage: 4, density: 8, reliability: 8, apCost: 4,
    wifi6e: false, forOutdoor: false,
    antenna: "internal_2x2_wall_plate_low",
    bestUse: "hotel_dorm_room_per_room_ap",
  },
  high_density_stadium: {
    throughput: 10, coverage: 7, density: 10, reliability: 9, apCost: 10,
    wifi6e: true, forOutdoor: false,
    antenna: "internal_8x8_mu_mimo_bss",
    bestUse: "stadium_arena_convention_hall",
  },
  industrial_hazardous_loc: {
    throughput: 6, coverage: 7, density: 4, reliability: 10, apCost: 8,
    wifi6e: false, forOutdoor: true,
    antenna: "sealed_external_atex_antenna",
    bestUse: "refinery_mine_hazardous_area",
  },
};

function get(t: WirelessApType): WirelessApData {
  return DATA[t];
}

export const throughput = (t: WirelessApType) => get(t).throughput;
export const coverage = (t: WirelessApType) => get(t).coverage;
export const density = (t: WirelessApType) => get(t).density;
export const reliability = (t: WirelessApType) => get(t).reliability;
export const apCost = (t: WirelessApType) => get(t).apCost;
export const wifi6e = (t: WirelessApType) => get(t).wifi6e;
export const forOutdoor = (t: WirelessApType) => get(t).forOutdoor;
export const antenna = (t: WirelessApType) => get(t).antenna;
export const bestUse = (t: WirelessApType) => get(t).bestUse;
export const wirelessApTypes = (): WirelessApType[] =>
  Object.keys(DATA) as WirelessApType[];
