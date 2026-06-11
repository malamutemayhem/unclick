export type XrayInspectType =
  | "2d_xray_cabinet"
  | "3d_ct_inline"
  | "micro_ct_lab"
  | "oblique_angle_view"
  | "real_time_fluoro";

const DATA: Record<XrayInspectType, {
  resolution: number; throughput: number; penetration: number;
  analysis: number; systemCost: number; threeD: boolean;
  inline: boolean; sourceType: string; bestUse: string;
}> = {
  "2d_xray_cabinet": { resolution: 6, throughput: 7, penetration: 7, analysis: 5, systemCost: 5, threeD: false, inline: false, sourceType: "sealed_tube_2d", bestUse: "bga_void_quick_check" },
  "3d_ct_inline": { resolution: 9, throughput: 7, penetration: 8, analysis: 10, systemCost: 10, threeD: true, inline: true, sourceType: "cone_beam_ct", bestUse: "inline_3d_defect_scan" },
  micro_ct_lab: { resolution: 10, throughput: 2, penetration: 6, analysis: 10, systemCost: 9, threeD: true, inline: false, sourceType: "nano_focus_tube", bestUse: "failure_analysis_detail" },
  oblique_angle_view: { resolution: 7, throughput: 6, penetration: 7, analysis: 7, systemCost: 6, threeD: false, inline: false, sourceType: "tilted_tube_angle", bestUse: "solder_joint_layer_view" },
  real_time_fluoro: { resolution: 5, throughput: 8, penetration: 8, analysis: 4, systemCost: 4, threeD: false, inline: false, sourceType: "continuous_fluoroscope", bestUse: "rework_live_monitor" },
};

const get = (t: XrayInspectType) => DATA[t];

export const resolution = (t: XrayInspectType) => get(t).resolution;
export const throughput = (t: XrayInspectType) => get(t).throughput;
export const penetration = (t: XrayInspectType) => get(t).penetration;
export const analysis = (t: XrayInspectType) => get(t).analysis;
export const systemCost = (t: XrayInspectType) => get(t).systemCost;
export const threeD = (t: XrayInspectType) => get(t).threeD;
export const inline = (t: XrayInspectType) => get(t).inline;
export const sourceType = (t: XrayInspectType) => get(t).sourceType;
export const bestUse = (t: XrayInspectType) => get(t).bestUse;
export const xrayInspects = (): XrayInspectType[] => Object.keys(DATA) as XrayInspectType[];
