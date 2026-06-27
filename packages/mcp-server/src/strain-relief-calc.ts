export type StrainReliefType =
  | "cord_grip_threaded"
  | "boot_molded_flex"
  | "cable_clamp_saddle"
  | "spiral_wrap_sleeve"
  | "bushing_snap_grommet";

const DATA: Record<StrainReliefType, {
  pullResist: number; flexProtect: number; installEase: number;
  cableRange: number; reliefCost: number; reusable: boolean;
  forFlex: boolean; mountMethod: string; bestUse: string;
}> = {
  cord_grip_threaded: { pullResist: 9, flexProtect: 5, installEase: 6, cableRange: 7, reliefCost: 3, reusable: false, forFlex: false, mountMethod: "threaded_locknut_panel", bestUse: "power_cord_panel_entry" },
  boot_molded_flex: { pullResist: 7, flexProtect: 10, installEase: 8, cableRange: 5, reliefCost: 4, reusable: false, forFlex: true, mountMethod: "molded_over_cable_end", bestUse: "usb_connector_boot" },
  cable_clamp_saddle: { pullResist: 8, flexProtect: 4, installEase: 7, cableRange: 8, reliefCost: 1, reusable: true, forFlex: false, mountMethod: "screw_saddle_base", bestUse: "chassis_wire_anchor" },
  spiral_wrap_sleeve: { pullResist: 4, flexProtect: 8, installEase: 9, cableRange: 9, reliefCost: 2, reusable: true, forFlex: true, mountMethod: "wrap_around_bundle", bestUse: "wire_harness_protect" },
  bushing_snap_grommet: { pullResist: 5, flexProtect: 7, installEase: 10, cableRange: 6, reliefCost: 1, reusable: false, forFlex: false, mountMethod: "snap_fit_panel_hole", bestUse: "edge_protection_pass" },
};

const get = (t: StrainReliefType) => DATA[t];

export const pullResist = (t: StrainReliefType) => get(t).pullResist;
export const flexProtect = (t: StrainReliefType) => get(t).flexProtect;
export const installEase = (t: StrainReliefType) => get(t).installEase;
export const cableRange = (t: StrainReliefType) => get(t).cableRange;
export const reliefCost = (t: StrainReliefType) => get(t).reliefCost;
export const reusable = (t: StrainReliefType) => get(t).reusable;
export const forFlex = (t: StrainReliefType) => get(t).forFlex;
export const mountMethod = (t: StrainReliefType) => get(t).mountMethod;
export const bestUse = (t: StrainReliefType) => get(t).bestUse;
export const strainReliefs = (): StrainReliefType[] => Object.keys(DATA) as StrainReliefType[];
