export type RockerSwitchType =
  | "illuminated_spst_power"
  | "mini_spst_panel"
  | "sealed_dpdt_marine"
  | "round_snap_in"
  | "dpst_20a_appliance";

const DATA: Record<RockerSwitchType, {
  currentRating: number; sealRating: number; cycleLife: number;
  sizeCompact: number; switchCost: number; illuminated: boolean;
  sealed: boolean; mountType: string; bestUse: string;
}> = {
  illuminated_spst_power: { currentRating: 6, sealRating: 3, cycleLife: 7, sizeCompact: 5, switchCost: 3, illuminated: true, sealed: false, mountType: "rectangular_snap_panel", bestUse: "equipment_power_switch" },
  mini_spst_panel: { currentRating: 4, sealRating: 3, cycleLife: 8, sizeCompact: 9, switchCost: 1, illuminated: false, sealed: false, mountType: "small_snap_cutout", bestUse: "compact_feature_toggle" },
  sealed_dpdt_marine: { currentRating: 8, sealRating: 10, cycleLife: 9, sizeCompact: 3, switchCost: 7, illuminated: true, sealed: true, mountType: "gasket_panel_bolt", bestUse: "boat_bilge_pump_switch" },
  round_snap_in: { currentRating: 5, sealRating: 4, cycleLife: 7, sizeCompact: 7, switchCost: 2, illuminated: false, sealed: false, mountType: "round_hole_snap", bestUse: "desk_lamp_switch" },
  dpst_20a_appliance: { currentRating: 10, sealRating: 5, cycleLife: 8, sizeCompact: 2, switchCost: 4, illuminated: false, sealed: false, mountType: "large_panel_screw", bestUse: "heater_main_switch" },
};

const get = (t: RockerSwitchType) => DATA[t];

export const currentRating = (t: RockerSwitchType) => get(t).currentRating;
export const sealRating = (t: RockerSwitchType) => get(t).sealRating;
export const cycleLife = (t: RockerSwitchType) => get(t).cycleLife;
export const sizeCompact = (t: RockerSwitchType) => get(t).sizeCompact;
export const switchCost = (t: RockerSwitchType) => get(t).switchCost;
export const illuminated = (t: RockerSwitchType) => get(t).illuminated;
export const sealed = (t: RockerSwitchType) => get(t).sealed;
export const mountType = (t: RockerSwitchType) => get(t).mountType;
export const bestUse = (t: RockerSwitchType) => get(t).bestUse;
export const rockerSwitches = (): RockerSwitchType[] => Object.keys(DATA) as RockerSwitchType[];
