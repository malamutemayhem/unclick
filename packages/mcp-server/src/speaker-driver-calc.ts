export type SpeakerDriverType =
  | "woofer_cone_dynamic"
  | "tweeter_dome_silk"
  | "midrange_cone_paper"
  | "planar_magnetic_ribbon"
  | "coaxial_dual_concentric";

const DATA: Record<SpeakerDriverType, {
  lowFreq: number; highFreq: number; power: number;
  dispersion: number; sdCost: number; fullRange: boolean;
  forStudio: boolean; diaphragm: string; bestUse: string;
}> = {
  woofer_cone_dynamic: {
    lowFreq: 10, highFreq: 3, power: 9,
    dispersion: 6, sdCost: 2, fullRange: false,
    forStudio: false, diaphragm: "paper_poly_cone_surround",
    bestUse: "bass_reproduction_sub_crossover",
  },
  tweeter_dome_silk: {
    lowFreq: 2, highFreq: 10, power: 4,
    dispersion: 9, sdCost: 2, fullRange: false,
    forStudio: true, diaphragm: "soft_dome_silk_textile",
    bestUse: "high_freq_detail_smooth_treble",
  },
  midrange_cone_paper: {
    lowFreq: 5, highFreq: 7, power: 6,
    dispersion: 7, sdCost: 2, fullRange: false,
    forStudio: true, diaphragm: "treated_paper_cone_dust_cap",
    bestUse: "vocal_clarity_midband_presence",
  },
  planar_magnetic_ribbon: {
    lowFreq: 4, highFreq: 10, power: 5,
    dispersion: 5, sdCost: 5, fullRange: false,
    forStudio: true, diaphragm: "thin_film_etched_conductor",
    bestUse: "audiophile_headphone_detail_speed",
  },
  coaxial_dual_concentric: {
    lowFreq: 7, highFreq: 8, power: 7,
    dispersion: 9, sdCost: 4, fullRange: true,
    forStudio: true, diaphragm: "cone_woofer_dome_tweeter_center",
    bestUse: "point_source_monitor_pa_install",
  },
};

const get = (t: SpeakerDriverType) => DATA[t];

export const lowFreq = (t: SpeakerDriverType) => get(t).lowFreq;
export const highFreq = (t: SpeakerDriverType) => get(t).highFreq;
export const power = (t: SpeakerDriverType) => get(t).power;
export const dispersion = (t: SpeakerDriverType) => get(t).dispersion;
export const sdCost = (t: SpeakerDriverType) => get(t).sdCost;
export const fullRange = (t: SpeakerDriverType) => get(t).fullRange;
export const forStudio = (t: SpeakerDriverType) => get(t).forStudio;
export const diaphragm = (t: SpeakerDriverType) => get(t).diaphragm;
export const bestUse = (t: SpeakerDriverType) => get(t).bestUse;
export const speakerDriverTypes = (): SpeakerDriverType[] => Object.keys(DATA) as SpeakerDriverType[];
