export type PcbSilkscreenType =
  | "manual_screen_print"
  | "liquid_photo_image"
  | "inkjet_direct_print"
  | "laser_mark_engrave"
  | "thermal_transfer_ribbon";

const DATA: Record<PcbSilkscreenType, {
  resolution: number; adhesion: number; contrast: number;
  speed: number; printCost: number; digital: boolean;
  forFinePitch: boolean; inkType: string; bestUse: string;
}> = {
  manual_screen_print: { resolution: 4, adhesion: 7, contrast: 6, speed: 6, printCost: 2, digital: false, forFinePitch: false, inkType: "epoxy_white_ink", bestUse: "standard_volume_board" },
  liquid_photo_image: { resolution: 8, adhesion: 9, contrast: 8, speed: 5, printCost: 5, digital: false, forFinePitch: true, inkType: "photo_curable_ink", bestUse: "fine_pitch_dense_board" },
  inkjet_direct_print: { resolution: 10, adhesion: 7, contrast: 9, speed: 8, printCost: 6, digital: true, forFinePitch: true, inkType: "uv_cure_inkjet", bestUse: "prototype_variable_data" },
  laser_mark_engrave: { resolution: 9, adhesion: 10, contrast: 7, speed: 7, printCost: 8, digital: true, forFinePitch: true, inkType: "none_ablation", bestUse: "permanent_traceability_mark" },
  thermal_transfer_ribbon: { resolution: 5, adhesion: 5, contrast: 5, speed: 9, printCost: 1, digital: false, forFinePitch: false, inkType: "wax_resin_ribbon", bestUse: "label_barcode_marking" },
};

const get = (t: PcbSilkscreenType) => DATA[t];

export const resolution = (t: PcbSilkscreenType) => get(t).resolution;
export const adhesion = (t: PcbSilkscreenType) => get(t).adhesion;
export const contrast = (t: PcbSilkscreenType) => get(t).contrast;
export const speed = (t: PcbSilkscreenType) => get(t).speed;
export const printCost = (t: PcbSilkscreenType) => get(t).printCost;
export const digital = (t: PcbSilkscreenType) => get(t).digital;
export const forFinePitch = (t: PcbSilkscreenType) => get(t).forFinePitch;
export const inkType = (t: PcbSilkscreenType) => get(t).inkType;
export const bestUse = (t: PcbSilkscreenType) => get(t).bestUse;
export const pcbSilkscreens = (): PcbSilkscreenType[] => Object.keys(DATA) as PcbSilkscreenType[];
