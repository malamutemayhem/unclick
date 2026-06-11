export type EmcTest =
  | "radiated_emissions_re"
  | "conducted_emissions_ce"
  | "radiated_immunity_ri"
  | "esd_immunity_iec"
  | "surge_immunity_combo";

const DATA: Record<EmcTest, {
  frequency: number; severity: number; repeatability: number;
  setupComplexity: number; emcCost: number; preCompliance: boolean;
  forCeMark: boolean; standard: string; bestUse: string;
}> = {
  radiated_emissions_re: {
    frequency: 10, severity: 6, repeatability: 7,
    setupComplexity: 9, emcCost: 8, preCompliance: true,
    forCeMark: true, standard: "cispr_32_class_b",
    bestUse: "consumer_product_fcc_ce_cert",
  },
  conducted_emissions_ce: {
    frequency: 6, severity: 5, repeatability: 9,
    setupComplexity: 5, emcCost: 4, preCompliance: true,
    forCeMark: true, standard: "cispr_32_150khz_30mhz",
    bestUse: "power_supply_line_noise_check",
  },
  radiated_immunity_ri: {
    frequency: 10, severity: 8, repeatability: 6,
    setupComplexity: 10, emcCost: 9, preCompliance: false,
    forCeMark: true, standard: "iec_61000_4_3_rf_field",
    bestUse: "automotive_ecu_rf_immunity",
  },
  esd_immunity_iec: {
    frequency: 3, severity: 9, repeatability: 8,
    setupComplexity: 3, emcCost: 2, preCompliance: true,
    forCeMark: true, standard: "iec_61000_4_2_contact_air",
    bestUse: "touchscreen_port_esd_rating",
  },
  surge_immunity_combo: {
    frequency: 2, severity: 10, repeatability: 7,
    setupComplexity: 6, emcCost: 5, preCompliance: false,
    forCeMark: true, standard: "iec_61000_4_5_combo_wave",
    bestUse: "ac_mains_port_lightning_surge",
  },
};

const get = (t: EmcTest) => DATA[t];

export const frequency = (t: EmcTest) => get(t).frequency;
export const severity = (t: EmcTest) => get(t).severity;
export const repeatability = (t: EmcTest) => get(t).repeatability;
export const setupComplexity = (t: EmcTest) => get(t).setupComplexity;
export const emcCost = (t: EmcTest) => get(t).emcCost;
export const preCompliance = (t: EmcTest) => get(t).preCompliance;
export const forCeMark = (t: EmcTest) => get(t).forCeMark;
export const standard = (t: EmcTest) => get(t).standard;
export const bestUse = (t: EmcTest) => get(t).bestUse;
export const emcTests = (): EmcTest[] => Object.keys(DATA) as EmcTest[];
