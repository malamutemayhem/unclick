export type TactileSwitchType =
  | "standard_6mm_thru"
  | "smd_3x3_low_profile"
  | "right_angle_side_push"
  | "illuminated_led_cap"
  | "sealed_ip67_outdoor";

const DATA: Record<TactileSwitchType, {
  tactileFeel: number; cycleLife: number; actuationForce: number;
  sizeCompact: number; switchCost: number; surfaceMount: boolean;
  sealed: boolean; capStyle: string; bestUse: string;
}> = {
  standard_6mm_thru: { tactileFeel: 7, cycleLife: 7, actuationForce: 6, sizeCompact: 5, switchCost: 1, surfaceMount: false, sealed: false, capStyle: "round_tact_cap", bestUse: "breadboard_input_button" },
  smd_3x3_low_profile: { tactileFeel: 6, cycleLife: 8, actuationForce: 5, sizeCompact: 10, switchCost: 1, surfaceMount: true, sealed: false, capStyle: "flat_flush_top", bestUse: "phone_side_button" },
  right_angle_side_push: { tactileFeel: 6, cycleLife: 7, actuationForce: 5, sizeCompact: 7, switchCost: 2, surfaceMount: false, sealed: false, capStyle: "horizontal_push_stem", bestUse: "edge_mount_reset" },
  illuminated_led_cap: { tactileFeel: 8, cycleLife: 6, actuationForce: 7, sizeCompact: 3, switchCost: 5, surfaceMount: false, sealed: false, capStyle: "transparent_led_lens", bestUse: "control_panel_indicator" },
  sealed_ip67_outdoor: { tactileFeel: 7, cycleLife: 9, actuationForce: 7, sizeCompact: 4, switchCost: 6, surfaceMount: false, sealed: true, capStyle: "silicone_boot_cover", bestUse: "outdoor_device_button" },
};

const get = (t: TactileSwitchType) => DATA[t];

export const tactileFeel = (t: TactileSwitchType) => get(t).tactileFeel;
export const cycleLife = (t: TactileSwitchType) => get(t).cycleLife;
export const actuationForce = (t: TactileSwitchType) => get(t).actuationForce;
export const sizeCompact = (t: TactileSwitchType) => get(t).sizeCompact;
export const switchCost = (t: TactileSwitchType) => get(t).switchCost;
export const surfaceMount = (t: TactileSwitchType) => get(t).surfaceMount;
export const sealed = (t: TactileSwitchType) => get(t).sealed;
export const capStyle = (t: TactileSwitchType) => get(t).capStyle;
export const bestUse = (t: TactileSwitchType) => get(t).bestUse;
export const tactileSwitches = (): TactileSwitchType[] => Object.keys(DATA) as TactileSwitchType[];
