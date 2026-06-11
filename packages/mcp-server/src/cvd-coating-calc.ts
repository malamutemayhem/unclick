export type CvdCoatingType =
  | "thermal_cvd_atmospheric"
  | "plasma_enhanced_pecvd"
  | "low_pressure_lpcvd"
  | "metal_organic_mocvd"
  | "atomic_layer_ald";

interface CvdCoatingData {
  conformality: number;
  purity: number;
  temperature: number;
  rate: number;
  cvCost: number;
  lowTemp: boolean;
  forSemiconductor: boolean;
  precursor: string;
  bestUse: string;
}

const DATA: Record<CvdCoatingType, CvdCoatingData> = {
  thermal_cvd_atmospheric: {
    conformality: 6, purity: 7, temperature: 4, rate: 9, cvCost: 4,
    lowTemp: false, forSemiconductor: false,
    precursor: "silane_methane_gas_phase",
    bestUse: "tool_coating_silicon_carbide",
  },
  plasma_enhanced_pecvd: {
    conformality: 7, purity: 8, temperature: 8, rate: 8, cvCost: 7,
    lowTemp: true, forSemiconductor: true,
    precursor: "silane_ammonia_plasma_activated",
    bestUse: "passivation_nitride_oxide_film",
  },
  low_pressure_lpcvd: {
    conformality: 9, purity: 9, temperature: 5, rate: 6, cvCost: 7,
    lowTemp: false, forSemiconductor: true,
    precursor: "dichlorosilane_teos_low_press",
    bestUse: "polysilicon_gate_nitride_spacer",
  },
  metal_organic_mocvd: {
    conformality: 8, purity: 10, temperature: 7, rate: 5, cvCost: 10,
    lowTemp: false, forSemiconductor: true,
    precursor: "trimethyl_gallium_arsine_vapor",
    bestUse: "led_laser_diode_iii_v_epitaxy",
  },
  atomic_layer_ald: {
    conformality: 10, purity: 10, temperature: 9, rate: 3, cvCost: 10,
    lowTemp: true, forSemiconductor: true,
    precursor: "self_limiting_pulse_precursor",
    bestUse: "high_k_gate_oxide_nano_barrier",
  },
};

function get(t: CvdCoatingType): CvdCoatingData {
  return DATA[t];
}

export const conformality = (t: CvdCoatingType) => get(t).conformality;
export const purity = (t: CvdCoatingType) => get(t).purity;
export const temperature = (t: CvdCoatingType) => get(t).temperature;
export const rate = (t: CvdCoatingType) => get(t).rate;
export const cvCost = (t: CvdCoatingType) => get(t).cvCost;
export const lowTemp = (t: CvdCoatingType) => get(t).lowTemp;
export const forSemiconductor = (t: CvdCoatingType) => get(t).forSemiconductor;
export const precursor = (t: CvdCoatingType) => get(t).precursor;
export const bestUse = (t: CvdCoatingType) => get(t).bestUse;
export const cvdCoatingTypes = (): CvdCoatingType[] =>
  Object.keys(DATA) as CvdCoatingType[];
