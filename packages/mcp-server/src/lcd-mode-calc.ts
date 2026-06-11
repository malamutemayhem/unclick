export type LcdMode =
  | "tn_twisted_nematic"
  | "va_vertical_align"
  | "ips_in_plane_switch"
  | "fringe_field_ffs"
  | "blue_phase_bp";

const DATA: Record<LcdMode, {
  contrast: number; viewAngle: number; responseTime: number;
  colorAccuracy: number; lcCost: number; wideGamut: boolean;
  forMonitor: boolean; alignment: string; bestUse: string;
}> = {
  tn_twisted_nematic: {
    contrast: 4, viewAngle: 3, responseTime: 9,
    colorAccuracy: 3, lcCost: 1, wideGamut: false,
    forMonitor: false, alignment: "90_degree_twist_rubbed",
    bestUse: "budget_gaming_fast_response",
  },
  va_vertical_align: {
    contrast: 10, viewAngle: 7, responseTime: 5,
    colorAccuracy: 7, lcCost: 4, wideGamut: false,
    forMonitor: true, alignment: "homeotropic_negative_lc",
    bestUse: "tv_panel_deep_black_contrast",
  },
  ips_in_plane_switch: {
    contrast: 6, viewAngle: 10, responseTime: 6,
    colorAccuracy: 9, lcCost: 5, wideGamut: true,
    forMonitor: true, alignment: "homogeneous_in_plane_field",
    bestUse: "pro_photo_color_critical",
  },
  fringe_field_ffs: {
    contrast: 7, viewAngle: 10, responseTime: 7,
    colorAccuracy: 10, lcCost: 6, wideGamut: true,
    forMonitor: true, alignment: "fringe_field_pixel_electrode",
    bestUse: "smartphone_oled_alternative",
  },
  blue_phase_bp: {
    contrast: 8, viewAngle: 9, responseTime: 10,
    colorAccuracy: 8, lcCost: 9, wideGamut: true,
    forMonitor: false, alignment: "self_assembled_cubic_lattice",
    bestUse: "next_gen_field_sequential_color",
  },
};

const get = (t: LcdMode) => DATA[t];

export const contrast = (t: LcdMode) => get(t).contrast;
export const viewAngle = (t: LcdMode) => get(t).viewAngle;
export const responseTime = (t: LcdMode) => get(t).responseTime;
export const colorAccuracy = (t: LcdMode) => get(t).colorAccuracy;
export const lcCost = (t: LcdMode) => get(t).lcCost;
export const wideGamut = (t: LcdMode) => get(t).wideGamut;
export const forMonitor = (t: LcdMode) => get(t).forMonitor;
export const alignment = (t: LcdMode) => get(t).alignment;
export const bestUse = (t: LcdMode) => get(t).bestUse;
export const lcdModes = (): LcdMode[] => Object.keys(DATA) as LcdMode[];
