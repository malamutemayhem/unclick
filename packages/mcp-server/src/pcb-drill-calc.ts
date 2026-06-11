export type PcbDrillType =
  | "mechanical_carbide"
  | "laser_uv_micro"
  | "laser_co2_blind"
  | "cnc_routing_slot"
  | "plasma_etch_via";

const DATA: Record<PcbDrillType, {
  minDiameter: number; speed: number; accuracy: number;
  aspectRatio: number; drillCost: number; contactless: boolean;
  forMicrovia: boolean; drillMethod: string; bestUse: string;
}> = {
  mechanical_carbide: { minDiameter: 6, speed: 8, accuracy: 7, aspectRatio: 7, drillCost: 4, contactless: false, forMicrovia: false, drillMethod: "high_speed_spindle", bestUse: "standard_through_hole_via" },
  laser_uv_micro: { minDiameter: 10, speed: 9, accuracy: 10, aspectRatio: 5, drillCost: 8, contactless: true, forMicrovia: true, drillMethod: "uv_excimer_ablation", bestUse: "hdi_microvia_drill" },
  laser_co2_blind: { minDiameter: 8, speed: 9, accuracy: 8, aspectRatio: 4, drillCost: 7, contactless: true, forMicrovia: true, drillMethod: "co2_laser_pulse", bestUse: "blind_via_dielectric" },
  cnc_routing_slot: { minDiameter: 3, speed: 6, accuracy: 6, aspectRatio: 8, drillCost: 5, contactless: false, forMicrovia: false, drillMethod: "end_mill_route", bestUse: "board_outline_slot_cut" },
  plasma_etch_via: { minDiameter: 9, speed: 7, accuracy: 9, aspectRatio: 6, drillCost: 9, contactless: true, forMicrovia: true, drillMethod: "reactive_ion_etch", bestUse: "flex_pcb_via_formation" },
};

const get = (t: PcbDrillType) => DATA[t];

export const minDiameter = (t: PcbDrillType) => get(t).minDiameter;
export const speed = (t: PcbDrillType) => get(t).speed;
export const accuracy = (t: PcbDrillType) => get(t).accuracy;
export const aspectRatio = (t: PcbDrillType) => get(t).aspectRatio;
export const drillCost = (t: PcbDrillType) => get(t).drillCost;
export const contactless = (t: PcbDrillType) => get(t).contactless;
export const forMicrovia = (t: PcbDrillType) => get(t).forMicrovia;
export const drillMethod = (t: PcbDrillType) => get(t).drillMethod;
export const bestUse = (t: PcbDrillType) => get(t).bestUse;
export const pcbDrills = (): PcbDrillType[] => Object.keys(DATA) as PcbDrillType[];
