export type ConveyorType =
  | "belt_flat_rubber"
  | "roller_gravity_free"
  | "chain_slat_heavy"
  | "screw_auger_bulk"
  | "pneumatic_vacuum_tube";

const DATA: Record<ConveyorType, {
  throughput: number; incline: number; gentleness: number;
  maintenance: number; cvCost: number; enclosed: boolean;
  forBulk: boolean; drive: string; bestUse: string;
}> = {
  belt_flat_rubber: {
    throughput: 9, incline: 7, gentleness: 8,
    maintenance: 6, cvCost: 2, enclosed: false,
    forBulk: true, drive: "motorized_pulley_friction",
    bestUse: "warehouse_parcel_sort_line",
  },
  roller_gravity_free: {
    throughput: 7, incline: 3, gentleness: 6,
    maintenance: 9, cvCost: 1, enclosed: false,
    forBulk: false, drive: "gravity_or_manual_push",
    bestUse: "packing_station_carton_feed",
  },
  chain_slat_heavy: {
    throughput: 8, incline: 5, gentleness: 4,
    maintenance: 5, cvCost: 4, enclosed: false,
    forBulk: false, drive: "chain_sprocket_slat_plate",
    bestUse: "automotive_body_assembly_line",
  },
  screw_auger_bulk: {
    throughput: 6, incline: 10, gentleness: 3,
    maintenance: 5, cvCost: 2, enclosed: true,
    forBulk: true, drive: "helical_screw_flight_rotate",
    bestUse: "grain_silo_cement_powder_feed",
  },
  pneumatic_vacuum_tube: {
    throughput: 4, incline: 10, gentleness: 5,
    maintenance: 7, cvCost: 4, enclosed: true,
    forBulk: true, drive: "blower_vacuum_air_stream",
    bestUse: "plastic_pellet_dust_transfer",
  },
};

const get = (t: ConveyorType) => DATA[t];

export const throughput = (t: ConveyorType) => get(t).throughput;
export const incline = (t: ConveyorType) => get(t).incline;
export const gentleness = (t: ConveyorType) => get(t).gentleness;
export const maintenance = (t: ConveyorType) => get(t).maintenance;
export const cvCost = (t: ConveyorType) => get(t).cvCost;
export const enclosed = (t: ConveyorType) => get(t).enclosed;
export const forBulk = (t: ConveyorType) => get(t).forBulk;
export const drive = (t: ConveyorType) => get(t).drive;
export const bestUse = (t: ConveyorType) => get(t).bestUse;
export const conveyorTypes = (): ConveyorType[] => Object.keys(DATA) as ConveyorType[];
