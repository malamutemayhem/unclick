export type PixelDrive =
  | "tft_amorphous_si"
  | "ltps_low_temp_poly"
  | "ltpo_hybrid"
  | "oxide_igzo"
  | "microdriver_cmos";

const DATA: Record<PixelDrive, {
  mobility: number; uniformity: number; leakage: number;
  refreshRate: number; pxCost: number; variableRefresh: boolean;
  forLargeArea: boolean; semiconductor: string; bestUse: string;
}> = {
  tft_amorphous_si: {
    mobility: 3, uniformity: 8, leakage: 5,
    refreshRate: 4, pxCost: 2, variableRefresh: false,
    forLargeArea: true, semiconductor: "hydrogenated_amorphous_si",
    bestUse: "large_lcd_panel",
  },
  ltps_low_temp_poly: {
    mobility: 8, uniformity: 6, leakage: 6,
    refreshRate: 9, pxCost: 6, variableRefresh: false,
    forLargeArea: false, semiconductor: "excimer_laser_crystallized",
    bestUse: "high_ppi_mobile_oled",
  },
  ltpo_hybrid: {
    mobility: 9, uniformity: 7, leakage: 9,
    refreshRate: 10, pxCost: 8, variableRefresh: true,
    forLargeArea: false, semiconductor: "ltps_oxide_dual_gate",
    bestUse: "flagship_always_on_display",
  },
  oxide_igzo: {
    mobility: 6, uniformity: 9, leakage: 10,
    refreshRate: 7, pxCost: 4, variableRefresh: true,
    forLargeArea: true, semiconductor: "indium_gallium_zinc_oxide",
    bestUse: "8k_large_format_lcd",
  },
  microdriver_cmos: {
    mobility: 10, uniformity: 10, leakage: 8,
    refreshRate: 10, pxCost: 10, variableRefresh: true,
    forLargeArea: false, semiconductor: "silicon_cmos_backplane",
    bestUse: "microled_ar_near_eye",
  },
};

const get = (t: PixelDrive) => DATA[t];

export const mobility = (t: PixelDrive) => get(t).mobility;
export const uniformity = (t: PixelDrive) => get(t).uniformity;
export const leakage = (t: PixelDrive) => get(t).leakage;
export const refreshRate = (t: PixelDrive) => get(t).refreshRate;
export const pxCost = (t: PixelDrive) => get(t).pxCost;
export const variableRefresh = (t: PixelDrive) => get(t).variableRefresh;
export const forLargeArea = (t: PixelDrive) => get(t).forLargeArea;
export const semiconductor = (t: PixelDrive) => get(t).semiconductor;
export const bestUse = (t: PixelDrive) => get(t).bestUse;
export const pixelDrives = (): PixelDrive[] => Object.keys(DATA) as PixelDrive[];
