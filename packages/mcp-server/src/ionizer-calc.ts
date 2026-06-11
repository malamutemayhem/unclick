export type IonizerType =
  | "benchtop_fan_blower"
  | "overhead_ionizer_bar"
  | "point_of_use_gun"
  | "room_ionizer_ceiling"
  | "inline_nozzle_blow";

const DATA: Record<IonizerType, {
  coverage: number; decaySpeed: number; balanceAccuracy: number;
  maintenance: number; ionizerCost: number; portable: boolean;
  forCleanroom: boolean; ionMethod: string; bestUse: string;
}> = {
  benchtop_fan_blower: { coverage: 6, decaySpeed: 7, balanceAccuracy: 8, maintenance: 6, ionizerCost: 4, portable: false, forCleanroom: false, ionMethod: "ac_corona_fan", bestUse: "bench_static_neutralize" },
  overhead_ionizer_bar: { coverage: 9, decaySpeed: 8, balanceAccuracy: 9, maintenance: 5, ionizerCost: 7, portable: false, forCleanroom: true, ionMethod: "dc_pulsed_bar", bestUse: "production_line_static" },
  point_of_use_gun: { coverage: 3, decaySpeed: 10, balanceAccuracy: 6, maintenance: 8, ionizerCost: 2, portable: true, forCleanroom: false, ionMethod: "piezo_trigger_ionize", bestUse: "spot_static_removal" },
  room_ionizer_ceiling: { coverage: 10, decaySpeed: 6, balanceAccuracy: 7, maintenance: 4, ionizerCost: 9, portable: false, forCleanroom: true, ionMethod: "emitter_array_ceiling", bestUse: "cleanroom_ambient_control" },
  inline_nozzle_blow: { coverage: 4, decaySpeed: 9, balanceAccuracy: 7, maintenance: 7, ionizerCost: 5, portable: false, forCleanroom: true, ionMethod: "compressed_air_ionize", bestUse: "inline_part_destat" },
};

const get = (t: IonizerType) => DATA[t];

export const coverage = (t: IonizerType) => get(t).coverage;
export const decaySpeed = (t: IonizerType) => get(t).decaySpeed;
export const balanceAccuracy = (t: IonizerType) => get(t).balanceAccuracy;
export const maintenance = (t: IonizerType) => get(t).maintenance;
export const ionizerCost = (t: IonizerType) => get(t).ionizerCost;
export const portable = (t: IonizerType) => get(t).portable;
export const forCleanroom = (t: IonizerType) => get(t).forCleanroom;
export const ionMethod = (t: IonizerType) => get(t).ionMethod;
export const bestUse = (t: IonizerType) => get(t).bestUse;
export const ionizers = (): IonizerType[] => Object.keys(DATA) as IonizerType[];
