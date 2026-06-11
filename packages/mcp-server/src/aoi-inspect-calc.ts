export type AoiInspectType =
  | "inline_2d_camera"
  | "offline_3d_laser"
  | "desktop_benchtop"
  | "dual_side_inline"
  | "ai_deep_learn";

const DATA: Record<AoiInspectType, {
  defectDetect: number; throughput: number; falseCallRate: number;
  setupEase: number; systemCost: number; threeD: boolean;
  inline: boolean; sensorType: string; bestUse: string;
}> = {
  inline_2d_camera: { defectDetect: 7, throughput: 9, falseCallRate: 6, setupEase: 6, systemCost: 6, threeD: false, inline: true, sensorType: "multi_angle_2d_cam", bestUse: "smt_line_post_reflow" },
  offline_3d_laser: { defectDetect: 9, throughput: 5, falseCallRate: 8, setupEase: 5, systemCost: 8, threeD: true, inline: false, sensorType: "structured_light_3d", bestUse: "solder_joint_height_check" },
  desktop_benchtop: { defectDetect: 6, throughput: 3, falseCallRate: 5, setupEase: 9, systemCost: 3, threeD: false, inline: false, sensorType: "single_cam_ring_light", bestUse: "prototype_visual_verify" },
  dual_side_inline: { defectDetect: 8, throughput: 8, falseCallRate: 7, setupEase: 4, systemCost: 9, threeD: true, inline: true, sensorType: "top_bottom_3d_cam", bestUse: "double_sided_smt_board" },
  ai_deep_learn: { defectDetect: 10, throughput: 8, falseCallRate: 10, setupEase: 7, systemCost: 10, threeD: true, inline: true, sensorType: "neural_network_vision", bestUse: "complex_board_zero_escape" },
};

const get = (t: AoiInspectType) => DATA[t];

export const defectDetect = (t: AoiInspectType) => get(t).defectDetect;
export const throughput = (t: AoiInspectType) => get(t).throughput;
export const falseCallRate = (t: AoiInspectType) => get(t).falseCallRate;
export const setupEase = (t: AoiInspectType) => get(t).setupEase;
export const systemCost = (t: AoiInspectType) => get(t).systemCost;
export const threeD = (t: AoiInspectType) => get(t).threeD;
export const inline = (t: AoiInspectType) => get(t).inline;
export const sensorType = (t: AoiInspectType) => get(t).sensorType;
export const bestUse = (t: AoiInspectType) => get(t).bestUse;
export const aoiInspects = (): AoiInspectType[] => Object.keys(DATA) as AoiInspectType[];
