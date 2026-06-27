export type BedOfNailsType =
  | "standard_100mil"
  | "high_density_50mil"
  | "double_side_dual"
  | "wireless_rf_probe"
  | "mixed_signal_combo";

const DATA: Record<BedOfNailsType, {
  pinDensity: number; contactForce: number; cycleLife: number;
  alignment: number; fixtureCost: number; vacuumSeal: boolean;
  forHighDensity: boolean; probeStyle: string; bestUse: string;
}> = {
  standard_100mil: { pinDensity: 5, contactForce: 7, cycleLife: 8, alignment: 7, fixtureCost: 3, vacuumSeal: true, forHighDensity: false, probeStyle: "crown_tip_100mil", bestUse: "through_hole_mixed_board" },
  high_density_50mil: { pinDensity: 9, contactForce: 6, cycleLife: 6, alignment: 9, fixtureCost: 7, vacuumSeal: true, forHighDensity: true, probeStyle: "serrated_tip_50mil", bestUse: "dense_smt_fine_pitch" },
  double_side_dual: { pinDensity: 7, contactForce: 8, cycleLife: 7, alignment: 8, fixtureCost: 9, vacuumSeal: true, forHighDensity: false, probeStyle: "dual_plate_sandwich", bestUse: "double_side_populated" },
  wireless_rf_probe: { pinDensity: 4, contactForce: 3, cycleLife: 9, alignment: 5, fixtureCost: 8, vacuumSeal: false, forHighDensity: false, probeStyle: "capacitive_rf_coupler", bestUse: "rf_board_non_contact" },
  mixed_signal_combo: { pinDensity: 8, contactForce: 7, cycleLife: 7, alignment: 8, fixtureCost: 8, vacuumSeal: true, forHighDensity: true, probeStyle: "kelvin_coax_hybrid", bestUse: "analog_digital_mixed_test" },
};

const get = (t: BedOfNailsType) => DATA[t];

export const pinDensity = (t: BedOfNailsType) => get(t).pinDensity;
export const contactForce = (t: BedOfNailsType) => get(t).contactForce;
export const cycleLife = (t: BedOfNailsType) => get(t).cycleLife;
export const alignment = (t: BedOfNailsType) => get(t).alignment;
export const fixtureCost = (t: BedOfNailsType) => get(t).fixtureCost;
export const vacuumSeal = (t: BedOfNailsType) => get(t).vacuumSeal;
export const forHighDensity = (t: BedOfNailsType) => get(t).forHighDensity;
export const probeStyle = (t: BedOfNailsType) => get(t).probeStyle;
export const bestUse = (t: BedOfNailsType) => get(t).bestUse;
export const bedOfNails = (): BedOfNailsType[] => Object.keys(DATA) as BedOfNailsType[];
