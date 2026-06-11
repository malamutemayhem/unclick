// resistor-array-calc - resistor array/network types

export type ResistorArray =
  | "sip_bussed_network"
  | "dip_isolated_network"
  | "smd_chip_array"
  | "thick_film_custom"
  | "precision_thin_film";

const DATA: Record<ResistorArray, {
  matchTolerance: number; tempStability: number; powerRating: number; sizeCompact: number;
  cost: number; isolated: boolean; forPrecision: boolean; construction: string; bestUse: string;
}> = {
  sip_bussed_network:    { matchTolerance: 6, tempStability: 6, powerRating: 5, sizeCompact: 7, cost: 2, isolated: false, forPrecision: false, construction: "thick_film_sip_bus", bestUse: "pullup_pulldown_bus" },
  dip_isolated_network:  { matchTolerance: 7, tempStability: 7, powerRating: 6, sizeCompact: 5, cost: 3, isolated: true, forPrecision: false, construction: "thick_film_dip_iso", bestUse: "isolated_resistor_pack" },
  smd_chip_array:        { matchTolerance: 8, tempStability: 7, powerRating: 4, sizeCompact: 10, cost: 4, isolated: true, forPrecision: false, construction: "chip_array_0402", bestUse: "compact_smd_network" },
  thick_film_custom:     { matchTolerance: 7, tempStability: 6, powerRating: 8, sizeCompact: 4, cost: 5, isolated: true, forPrecision: false, construction: "custom_thick_film", bestUse: "power_resistor_bank" },
  precision_thin_film:   { matchTolerance: 10, tempStability: 10, powerRating: 5, sizeCompact: 6, cost: 8, isolated: true, forPrecision: true, construction: "thin_film_laser_trim", bestUse: "precision_divider_net" },
};

const get = (r: ResistorArray) => DATA[r];
export const matchTolerance = (r: ResistorArray) => get(r).matchTolerance;
export const tempStability = (r: ResistorArray) => get(r).tempStability;
export const powerRating = (r: ResistorArray) => get(r).powerRating;
export const sizeCompact = (r: ResistorArray) => get(r).sizeCompact;
export const arrayCost = (r: ResistorArray) => get(r).cost;
export const isolated = (r: ResistorArray) => get(r).isolated;
export const forPrecision = (r: ResistorArray) => get(r).forPrecision;
export const construction = (r: ResistorArray) => get(r).construction;
export const bestUse = (r: ResistorArray) => get(r).bestUse;
export const resistorArrays = (): ResistorArray[] => Object.keys(DATA) as ResistorArray[];
