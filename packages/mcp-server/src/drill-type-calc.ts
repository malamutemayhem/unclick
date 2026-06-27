export type DrillType =
  | "mechanical_carbide"
  | "uv_laser_co2"
  | "uv_laser_excimer"
  | "plasma_etch_via"
  | "photo_defined_via";

const DATA: Record<DrillType, {
  minDiameter: number; speed: number; accuracy: number;
  aspectRatio: number; drillCost: number; contactless: boolean;
  forHdi: boolean; mechanism: string; bestUse: string;
}> = {
  mechanical_carbide: {
    minDiameter: 4, speed: 8, accuracy: 7,
    aspectRatio: 6, drillCost: 2, contactless: false,
    forHdi: false, mechanism: "rotating_bit_plunge",
    bestUse: "through_hole_standard_pcb",
  },
  uv_laser_co2: {
    minDiameter: 7, speed: 9, accuracy: 8,
    aspectRatio: 5, drillCost: 5, contactless: true,
    forHdi: true, mechanism: "infrared_ablation_pulse",
    bestUse: "blind_via_resin_removal",
  },
  uv_laser_excimer: {
    minDiameter: 9, speed: 7, accuracy: 10,
    aspectRatio: 8, drillCost: 8, contactless: true,
    forHdi: true, mechanism: "uv_photochemical_ablate",
    bestUse: "microvia_fine_pitch_sub",
  },
  plasma_etch_via: {
    minDiameter: 8, speed: 6, accuracy: 9,
    aspectRatio: 10, drillCost: 7, contactless: true,
    forHdi: true, mechanism: "reactive_ion_etch_cf4",
    bestUse: "flex_polyimide_via_form",
  },
  photo_defined_via: {
    minDiameter: 10, speed: 10, accuracy: 9,
    aspectRatio: 4, drillCost: 6, contactless: true,
    forHdi: true, mechanism: "photosensitive_dielectric",
    bestUse: "buildup_layer_batch_via",
  },
};

const get = (t: DrillType) => DATA[t];

export const minDiameter = (t: DrillType) => get(t).minDiameter;
export const speed = (t: DrillType) => get(t).speed;
export const accuracy = (t: DrillType) => get(t).accuracy;
export const aspectRatio = (t: DrillType) => get(t).aspectRatio;
export const drillCost = (t: DrillType) => get(t).drillCost;
export const contactless = (t: DrillType) => get(t).contactless;
export const forHdi = (t: DrillType) => get(t).forHdi;
export const mechanism = (t: DrillType) => get(t).mechanism;
export const bestUse = (t: DrillType) => get(t).bestUse;
export const drillTypes = (): DrillType[] => Object.keys(DATA) as DrillType[];
