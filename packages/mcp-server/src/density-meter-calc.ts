export type DensityMeterType =
  | "coriolis_inline"
  | "vibrating_tube_lab"
  | "nuclear_gamma_ray"
  | "ultrasonic_transit"
  | "hydrometer_float";

interface DensityMeterData {
  accuracy: number;
  rangeSpan: number;
  responseTime: number;
  maintenance: number;
  dmCost: number;
  inline: boolean;
  forSlurry: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<DensityMeterType, DensityMeterData> = {
  coriolis_inline: {
    accuracy: 10, rangeSpan: 8, responseTime: 9, maintenance: 8, dmCost: 9,
    inline: true, forSlurry: false,
    principle: "vibrating_tube_coriolis_effect_mass_flow_density",
    bestUse: "custody_transfer_blending_concentration_real_time",
  },
  vibrating_tube_lab: {
    accuracy: 10, rangeSpan: 7, responseTime: 6, maintenance: 7, dmCost: 7,
    inline: false, forSlurry: false,
    principle: "u_tube_oscillation_frequency_sample_injection",
    bestUse: "laboratory_quality_control_beverage_petroleum_sample",
  },
  nuclear_gamma_ray: {
    accuracy: 7, rangeSpan: 10, responseTime: 7, maintenance: 5, dmCost: 10,
    inline: true, forSlurry: true,
    principle: "gamma_source_detector_attenuation_through_pipe_wall",
    bestUse: "mining_slurry_dredging_pipeline_non_contact_harsh",
  },
  ultrasonic_transit: {
    accuracy: 7, rangeSpan: 7, responseTime: 8, maintenance: 9, dmCost: 6,
    inline: true, forSlurry: false,
    principle: "ultrasonic_pulse_transit_time_speed_of_sound_infer",
    bestUse: "chemical_process_clean_liquid_clamp_on_retrofit",
  },
  hydrometer_float: {
    accuracy: 5, rangeSpan: 5, responseTime: 3, maintenance: 10, dmCost: 1,
    inline: false, forSlurry: false,
    principle: "buoyancy_glass_float_graduated_stem_visual_read",
    bestUse: "brewing_winemaking_battery_acid_simple_spot_check",
  },
};

function get(t: DensityMeterType): DensityMeterData {
  return DATA[t];
}

export const accuracy = (t: DensityMeterType) => get(t).accuracy;
export const rangeSpan = (t: DensityMeterType) => get(t).rangeSpan;
export const responseTime = (t: DensityMeterType) => get(t).responseTime;
export const maintenance = (t: DensityMeterType) => get(t).maintenance;
export const dmCost = (t: DensityMeterType) => get(t).dmCost;
export const inline = (t: DensityMeterType) => get(t).inline;
export const forSlurry = (t: DensityMeterType) => get(t).forSlurry;
export const principle = (t: DensityMeterType) => get(t).principle;
export const bestUse = (t: DensityMeterType) => get(t).bestUse;
export const densityMeterTypes = (): DensityMeterType[] =>
  Object.keys(DATA) as DensityMeterType[];
