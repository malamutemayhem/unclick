export type LithoType =
  | "i_line_365nm"
  | "krf_248nm"
  | "arf_immersion_193"
  | "euv_13_5nm"
  | "nanoimprint_nil";

const DATA: Record<LithoType, {
  resolution: number; throughput: number; overlay: number;
  defectDensity: number; lithoCost: number; multiPatter: boolean;
  forAdvanced: boolean; wavelength: string; bestUse: string;
}> = {
  i_line_365nm: {
    resolution: 2, throughput: 9, overlay: 5,
    defectDensity: 8, lithoCost: 1, multiPatter: false,
    forAdvanced: false, wavelength: "mercury_i_365nm",
    bestUse: "mems_sensor_pattern",
  },
  krf_248nm: {
    resolution: 4, throughput: 8, overlay: 6,
    defectDensity: 7, lithoCost: 3, multiPatter: false,
    forAdvanced: false, wavelength: "excimer_krf_248nm",
    bestUse: "power_ic_analog",
  },
  arf_immersion_193: {
    resolution: 7, throughput: 7, overlay: 8,
    defectDensity: 6, lithoCost: 6, multiPatter: true,
    forAdvanced: true, wavelength: "arf_water_immersion",
    bestUse: "logic_7nm_multipat",
  },
  euv_13_5nm: {
    resolution: 10, throughput: 5, overlay: 10,
    defectDensity: 4, lithoCost: 10, multiPatter: false,
    forAdvanced: true, wavelength: "sn_plasma_13_5nm",
    bestUse: "3nm_gaa_critical_layer",
  },
  nanoimprint_nil: {
    resolution: 8, throughput: 6, overlay: 4,
    defectDensity: 3, lithoCost: 5, multiPatter: false,
    forAdvanced: false, wavelength: "mechanical_template",
    bestUse: "3d_nand_high_ar",
  },
};

const get = (t: LithoType) => DATA[t];

export const resolution = (t: LithoType) => get(t).resolution;
export const throughput = (t: LithoType) => get(t).throughput;
export const overlay = (t: LithoType) => get(t).overlay;
export const defectDensity = (t: LithoType) => get(t).defectDensity;
export const lithoCost = (t: LithoType) => get(t).lithoCost;
export const multiPatter = (t: LithoType) => get(t).multiPatter;
export const forAdvanced = (t: LithoType) => get(t).forAdvanced;
export const wavelength = (t: LithoType) => get(t).wavelength;
export const bestUse = (t: LithoType) => get(t).bestUse;
export const lithoTypes = (): LithoType[] => Object.keys(DATA) as LithoType[];
