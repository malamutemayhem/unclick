export type WireStripperType =
  | "manual_adjust_screw"
  | "auto_strip_spring"
  | "precision_micro_strip"
  | "thermal_strip_hot"
  | "rotary_cable_strip";

const DATA: Record<WireStripperType, {
  stripClean: number; gaugeRange: number; speedWork: number;
  durability: number; stripperCost: number; automatic: boolean;
  forFine: boolean; stripMethod: string; bestUse: string;
}> = {
  manual_adjust_screw: { stripClean: 7, gaugeRange: 8, speedWork: 5, durability: 9, stripperCost: 3, automatic: false, forFine: false, stripMethod: "v_notch_blade_clamp", bestUse: "general_hookup_wire" },
  auto_strip_spring: { stripClean: 8, gaugeRange: 7, speedWork: 9, durability: 7, stripperCost: 5, automatic: true, forFine: false, stripMethod: "self_adjust_jaw", bestUse: "production_wire_prep" },
  precision_micro_strip: { stripClean: 9, gaugeRange: 4, speedWork: 6, durability: 6, stripperCost: 7, automatic: false, forFine: true, stripMethod: "micro_blade_guide", bestUse: "small_gauge_electronics" },
  thermal_strip_hot: { stripClean: 10, gaugeRange: 5, speedWork: 4, durability: 8, stripperCost: 9, automatic: false, forFine: true, stripMethod: "heated_element_melt", bestUse: "enamel_magnet_wire" },
  rotary_cable_strip: { stripClean: 7, gaugeRange: 10, speedWork: 7, durability: 8, stripperCost: 6, automatic: false, forFine: false, stripMethod: "rotary_blade_orbit", bestUse: "coax_cable_prep" },
};

const get = (t: WireStripperType) => DATA[t];

export const stripClean = (t: WireStripperType) => get(t).stripClean;
export const gaugeRange = (t: WireStripperType) => get(t).gaugeRange;
export const speedWork = (t: WireStripperType) => get(t).speedWork;
export const durability = (t: WireStripperType) => get(t).durability;
export const stripperCost = (t: WireStripperType) => get(t).stripperCost;
export const automatic = (t: WireStripperType) => get(t).automatic;
export const forFine = (t: WireStripperType) => get(t).forFine;
export const stripMethod = (t: WireStripperType) => get(t).stripMethod;
export const bestUse = (t: WireStripperType) => get(t).bestUse;
export const wireStrippers = (): WireStripperType[] => Object.keys(DATA) as WireStripperType[];
