export type SpiInspectType =
  | "inline_3d_laser"
  | "offline_2d_camera"
  | "high_speed_phase"
  | "dual_head_inline"
  | "portable_sample";

const DATA: Record<SpiInspectType, {
  volumeAccuracy: number; throughput: number; heightResolution: number;
  coverage: number; systemCost: number; threeD: boolean;
  inline: boolean; measureMethod: string; bestUse: string;
}> = {
  inline_3d_laser: { volumeAccuracy: 9, throughput: 9, heightResolution: 9, coverage: 8, systemCost: 8, threeD: true, inline: true, measureMethod: "laser_triangulation_3d", bestUse: "smt_line_paste_verify" },
  offline_2d_camera: { volumeAccuracy: 5, throughput: 4, heightResolution: 3, coverage: 6, systemCost: 3, threeD: false, inline: false, measureMethod: "contrast_2d_imaging", bestUse: "print_setup_quick_check" },
  high_speed_phase: { volumeAccuracy: 10, throughput: 10, heightResolution: 10, coverage: 9, systemCost: 10, threeD: true, inline: true, measureMethod: "phase_shift_moire", bestUse: "high_volume_fine_pitch" },
  dual_head_inline: { volumeAccuracy: 9, throughput: 8, heightResolution: 9, coverage: 10, systemCost: 9, threeD: true, inline: true, measureMethod: "dual_projector_3d", bestUse: "large_board_full_scan" },
  portable_sample: { volumeAccuracy: 6, throughput: 2, heightResolution: 5, coverage: 3, systemCost: 2, threeD: false, inline: false, measureMethod: "usb_microscope_measure", bestUse: "npi_first_article_check" },
};

const get = (t: SpiInspectType) => DATA[t];

export const volumeAccuracy = (t: SpiInspectType) => get(t).volumeAccuracy;
export const throughput = (t: SpiInspectType) => get(t).throughput;
export const heightResolution = (t: SpiInspectType) => get(t).heightResolution;
export const coverage = (t: SpiInspectType) => get(t).coverage;
export const systemCost = (t: SpiInspectType) => get(t).systemCost;
export const threeD = (t: SpiInspectType) => get(t).threeD;
export const inline = (t: SpiInspectType) => get(t).inline;
export const measureMethod = (t: SpiInspectType) => get(t).measureMethod;
export const bestUse = (t: SpiInspectType) => get(t).bestUse;
export const spiInspects = (): SpiInspectType[] => Object.keys(DATA) as SpiInspectType[];
