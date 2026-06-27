export type TensiometerType =
  | "du_nouy_ring"
  | "wilhelmy_plate"
  | "pendant_drop"
  | "spinning_drop"
  | "bubble_pressure";

interface TensiometerData {
  accuracy: number;
  throughput: number;
  dynamicRange: number;
  sampleVolume: number;
  tnCost: number;
  forInterfacial: boolean;
  forContactAngle: boolean;
  tensioConfig: string;
  bestUse: string;
}

const DATA: Record<TensiometerType, TensiometerData> = {
  du_nouy_ring: {
    accuracy: 7, throughput: 8, dynamicRange: 6, sampleVolume: 5, tnCost: 4,
    forInterfacial: true, forContactAngle: false,
    tensioConfig: "du_nouy_ring_tensiometer_platinum_ring_pull_surface_tension",
    bestUse: "qc_surface_du_nouy_ring_tensiometer_simple_rapid_surfactant",
  },
  wilhelmy_plate: {
    accuracy: 9, throughput: 7, dynamicRange: 7, sampleVolume: 6, tnCost: 5,
    forInterfacial: true, forContactAngle: true,
    tensioConfig: "wilhelmy_plate_tensiometer_static_force_contact_angle_wetting",
    bestUse: "wetting_study_wilhelmy_plate_tensiometer_contact_angle_dynamic",
  },
  pendant_drop: {
    accuracy: 10, throughput: 5, dynamicRange: 9, sampleVolume: 9, tnCost: 7,
    forInterfacial: true, forContactAngle: true,
    tensioConfig: "pendant_drop_tensiometer_optical_drop_shape_analysis_micro_vol",
    bestUse: "micro_sample_pendant_drop_tensiometer_optical_shape_interfacial",
  },
  spinning_drop: {
    accuracy: 8, throughput: 4, dynamicRange: 10, sampleVolume: 8, tnCost: 8,
    forInterfacial: true, forContactAngle: false,
    tensioConfig: "spinning_drop_tensiometer_ultralow_interfacial_tension_emulsion",
    bestUse: "ultralow_ift_spinning_drop_tensiometer_emulsion_microemulsion",
  },
  bubble_pressure: {
    accuracy: 7, throughput: 9, dynamicRange: 6, sampleVolume: 7, tnCost: 6,
    forInterfacial: false, forContactAngle: false,
    tensioConfig: "bubble_pressure_tensiometer_dynamic_surface_tension_surfactant",
    bestUse: "dynamic_surface_bubble_pressure_tensiometer_surfactant_kinetics",
  },
};

function get(t: TensiometerType): TensiometerData {
  return DATA[t];
}

export const accuracy = (t: TensiometerType) => get(t).accuracy;
export const throughput = (t: TensiometerType) => get(t).throughput;
export const dynamicRange = (t: TensiometerType) => get(t).dynamicRange;
export const sampleVolume = (t: TensiometerType) => get(t).sampleVolume;
export const tnCost = (t: TensiometerType) => get(t).tnCost;
export const forInterfacial = (t: TensiometerType) => get(t).forInterfacial;
export const forContactAngle = (t: TensiometerType) => get(t).forContactAngle;
export const tensioConfig = (t: TensiometerType) => get(t).tensioConfig;
export const bestUse = (t: TensiometerType) => get(t).bestUse;
export const tensiometerTypes = (): TensiometerType[] =>
  Object.keys(DATA) as TensiometerType[];
