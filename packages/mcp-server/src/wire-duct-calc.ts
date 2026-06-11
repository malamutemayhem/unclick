export type WireDuctType =
  | "slotted_pvc_panel"
  | "solid_wall_enclosed"
  | "narrow_finger_dense"
  | "wide_slot_power"
  | "round_corner_raceway";

const DATA: Record<WireDuctType, {
  cableCapacity: number; accessibility: number; ventilation: number;
  installEase: number; ductCost: number; slotted: boolean;
  forPanel: boolean; mountMethod: string; bestUse: string;
}> = {
  slotted_pvc_panel: { cableCapacity: 7, accessibility: 9, ventilation: 8, installEase: 8, ductCost: 4, slotted: true, forPanel: true, mountMethod: "screw_mount_din", bestUse: "control_panel_wiring" },
  solid_wall_enclosed: { cableCapacity: 8, accessibility: 4, ventilation: 2, installEase: 7, ductCost: 3, slotted: false, forPanel: true, mountMethod: "adhesive_screw", bestUse: "clean_enclosed_route" },
  narrow_finger_dense: { cableCapacity: 5, accessibility: 10, ventilation: 9, installEase: 7, ductCost: 5, slotted: true, forPanel: true, mountMethod: "snap_lock_rail", bestUse: "plc_dense_signal_wire" },
  wide_slot_power: { cableCapacity: 10, accessibility: 8, ventilation: 7, installEase: 6, ductCost: 6, slotted: true, forPanel: true, mountMethod: "bolt_mount_frame", bestUse: "power_distribution_panel" },
  round_corner_raceway: { cableCapacity: 4, accessibility: 6, ventilation: 3, installEase: 10, ductCost: 3, slotted: false, forPanel: false, mountMethod: "adhesive_surface", bestUse: "office_desk_cable_hide" },
};

const get = (t: WireDuctType) => DATA[t];

export const cableCapacity = (t: WireDuctType) => get(t).cableCapacity;
export const accessibility = (t: WireDuctType) => get(t).accessibility;
export const ventilation = (t: WireDuctType) => get(t).ventilation;
export const installEase = (t: WireDuctType) => get(t).installEase;
export const ductCost = (t: WireDuctType) => get(t).ductCost;
export const slotted = (t: WireDuctType) => get(t).slotted;
export const forPanel = (t: WireDuctType) => get(t).forPanel;
export const mountMethod = (t: WireDuctType) => get(t).mountMethod;
export const bestUse = (t: WireDuctType) => get(t).bestUse;
export const wireDucts = (): WireDuctType[] => Object.keys(DATA) as WireDuctType[];
