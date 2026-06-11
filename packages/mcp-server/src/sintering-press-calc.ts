export type SinteringPressType =
  | "conventional_sinter"
  | "hot_press_sinter"
  | "spark_plasma"
  | "microwave_sinter"
  | "field_assist_sinter";

interface SinteringPressData {
  densification: number;
  throughput: number;
  sinterTemp: number;
  cycleTime: number;
  spCost: number;
  pressureAssist: boolean;
  forNanoPowder: boolean;
  sinterConfig: string;
  bestUse: string;
}

const DATA: Record<SinteringPressType, SinteringPressData> = {
  conventional_sinter: {
    densification: 6, throughput: 9, sinterTemp: 5, cycleTime: 4, spCost: 3,
    pressureAssist: false, forNanoPowder: false,
    sinterConfig: "conventional_sintering_press_atmospheric_furnace_powder_compact",
    bestUse: "pm_part_conventional_sintering_press_high_volume_iron_copper",
  },
  hot_press_sinter: {
    densification: 9, throughput: 5, sinterTemp: 7, cycleTime: 6, spCost: 7,
    pressureAssist: true, forNanoPowder: false,
    sinterConfig: "hot_press_sintering_uniaxial_pressure_graphite_die_dense_body",
    bestUse: "dense_ceramic_hot_press_sintering_uniaxial_pressure_near_full",
  },
  spark_plasma: {
    densification: 10, throughput: 4, sinterTemp: 9, cycleTime: 9, spCost: 10,
    pressureAssist: true, forNanoPowder: true,
    sinterConfig: "spark_plasma_sintering_pulsed_dc_current_rapid_densify_nano",
    bestUse: "nano_ceramic_spark_plasma_sintering_rapid_densify_retain_grain",
  },
  microwave_sinter: {
    densification: 8, throughput: 7, sinterTemp: 8, cycleTime: 8, spCost: 6,
    pressureAssist: false, forNanoPowder: true,
    sinterConfig: "microwave_sintering_volumetric_heating_rapid_uniform_energy",
    bestUse: "advanced_ceramic_microwave_sintering_rapid_volumetric_uniform",
  },
  field_assist_sinter: {
    densification: 9, throughput: 5, sinterTemp: 8, cycleTime: 8, spCost: 9,
    pressureAssist: true, forNanoPowder: true,
    sinterConfig: "field_assist_sintering_electric_current_flash_sinter_low_temp",
    bestUse: "flash_sinter_field_assist_sintering_electric_current_ultra_fast",
  },
};

function get(t: SinteringPressType): SinteringPressData {
  return DATA[t];
}

export const densification = (t: SinteringPressType) => get(t).densification;
export const throughput = (t: SinteringPressType) => get(t).throughput;
export const sinterTemp = (t: SinteringPressType) => get(t).sinterTemp;
export const cycleTime = (t: SinteringPressType) => get(t).cycleTime;
export const spCost = (t: SinteringPressType) => get(t).spCost;
export const pressureAssist = (t: SinteringPressType) => get(t).pressureAssist;
export const forNanoPowder = (t: SinteringPressType) => get(t).forNanoPowder;
export const sinterConfig = (t: SinteringPressType) => get(t).sinterConfig;
export const bestUse = (t: SinteringPressType) => get(t).bestUse;
export const sinteringPressTypes = (): SinteringPressType[] =>
  Object.keys(DATA) as SinteringPressType[];
