export type AmpouleSealerType =
  | "tip_seal_gas"
  | "pull_seal"
  | "crimp_seal"
  | "flame_seal_rotary"
  | "laser_seal";

interface AmpouleSealerData {
  sealIntegrity: number;
  throughput: number;
  heatExposure: number;
  glassRange: number;
  asCost: number;
  contactFree: boolean;
  forOxygen: boolean;
  sealerConfig: string;
  bestUse: string;
}

const DATA: Record<AmpouleSealerType, AmpouleSealerData> = {
  tip_seal_gas: {
    sealIntegrity: 9, throughput: 8, heatExposure: 5, glassRange: 8, asCost: 7,
    contactFree: true, forOxygen: true,
    sealerConfig: "tip_seal_gas_ampoule_sealer_flame_melt_tip_inert_gas_flush",
    bestUse: "pharma_injectable_tip_seal_ampoule_nitrogen_flush_sterile",
  },
  pull_seal: {
    sealIntegrity: 10, throughput: 7, heatExposure: 6, glassRange: 7, asCost: 6,
    contactFree: true, forOxygen: true,
    sealerConfig: "pull_seal_ampoule_sealer_heat_soften_pull_stretch_close_tip",
    bestUse: "pharma_lab_pull_seal_ampoule_hermetic_tight_closure_vaccine",
  },
  crimp_seal: {
    sealIntegrity: 7, throughput: 9, heatExposure: 2, glassRange: 6, asCost: 5,
    contactFree: false, forOxygen: false,
    sealerConfig: "crimp_seal_ampoule_sealer_metal_cap_crimp_press_secure_close",
    bestUse: "diagnostic_crimp_seal_ampoule_metal_cap_rapid_closure_lab",
  },
  flame_seal_rotary: {
    sealIntegrity: 9, throughput: 10, heatExposure: 6, glassRange: 9, asCost: 9,
    contactFree: true, forOxygen: true,
    sealerConfig: "flame_seal_rotary_ampoule_rotate_flame_melt_uniform_seal_gmp",
    bestUse: "high_speed_pharma_rotary_flame_seal_ampoule_mass_production",
  },
  laser_seal: {
    sealIntegrity: 10, throughput: 6, heatExposure: 3, glassRange: 7, asCost: 10,
    contactFree: true, forOxygen: true,
    sealerConfig: "laser_seal_ampoule_sealer_focused_beam_precision_melt_close",
    bestUse: "biotech_laser_seal_ampoule_minimal_heat_sensitive_biologic",
  },
};

function get(t: AmpouleSealerType): AmpouleSealerData {
  return DATA[t];
}

export const sealIntegrity = (t: AmpouleSealerType) => get(t).sealIntegrity;
export const throughput = (t: AmpouleSealerType) => get(t).throughput;
export const heatExposure = (t: AmpouleSealerType) => get(t).heatExposure;
export const glassRange = (t: AmpouleSealerType) => get(t).glassRange;
export const asCost = (t: AmpouleSealerType) => get(t).asCost;
export const contactFree = (t: AmpouleSealerType) => get(t).contactFree;
export const forOxygen = (t: AmpouleSealerType) => get(t).forOxygen;
export const sealerConfig = (t: AmpouleSealerType) => get(t).sealerConfig;
export const bestUse = (t: AmpouleSealerType) => get(t).bestUse;
export const ampouleSealerTypes = (): AmpouleSealerType[] =>
  Object.keys(DATA) as AmpouleSealerType[];
