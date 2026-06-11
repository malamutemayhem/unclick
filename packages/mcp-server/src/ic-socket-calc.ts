export type IcSocketType =
  | "zif_zero_insert"
  | "pga_pin_grid"
  | "lga_land_grid"
  | "burn_in_test"
  | "dip_through_hole";

const DATA: Record<IcSocketType, {
  contactReliability: number; insertCycles: number; signalPerf: number;
  thermalPath: number; socketCost: number; leverLock: boolean;
  forProduction: boolean; contactType: string; bestUse: string;
}> = {
  zif_zero_insert: { contactReliability: 9, insertCycles: 10, signalPerf: 7, thermalPath: 6, socketCost: 7, leverLock: true, forProduction: false, contactType: "spring_clamp_lever", bestUse: "development_prototype_swap" },
  pga_pin_grid: { contactReliability: 8, insertCycles: 7, signalPerf: 6, thermalPath: 7, socketCost: 5, leverLock: false, forProduction: false, contactType: "pin_hole_friction", bestUse: "socketed_cpu_upgrade" },
  lga_land_grid: { contactReliability: 9, insertCycles: 8, signalPerf: 9, thermalPath: 9, socketCost: 8, leverLock: true, forProduction: true, contactType: "spring_pad_contact", bestUse: "server_cpu_high_pin" },
  burn_in_test: { contactReliability: 7, insertCycles: 6, signalPerf: 5, thermalPath: 5, socketCost: 10, leverLock: false, forProduction: true, contactType: "kelvin_probe_contact", bestUse: "reliability_burn_in_test" },
  dip_through_hole: { contactReliability: 6, insertCycles: 5, signalPerf: 4, thermalPath: 4, socketCost: 1, leverLock: false, forProduction: false, contactType: "dual_inline_friction", bestUse: "hobby_breadboard_proto" },
};

const get = (t: IcSocketType) => DATA[t];

export const contactReliability = (t: IcSocketType) => get(t).contactReliability;
export const insertCycles = (t: IcSocketType) => get(t).insertCycles;
export const signalPerf = (t: IcSocketType) => get(t).signalPerf;
export const thermalPath = (t: IcSocketType) => get(t).thermalPath;
export const socketCost = (t: IcSocketType) => get(t).socketCost;
export const leverLock = (t: IcSocketType) => get(t).leverLock;
export const forProduction = (t: IcSocketType) => get(t).forProduction;
export const contactType = (t: IcSocketType) => get(t).contactType;
export const bestUse = (t: IcSocketType) => get(t).bestUse;
export const icSockets = (): IcSocketType[] => Object.keys(DATA) as IcSocketType[];
