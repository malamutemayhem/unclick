// thermistor-calc - thermistor types for temperature sensing

export type Thermistor =
  | "ntc_10k_standard"
  | "ptc_resettable_fuse"
  | "ntc_100k_high_temp"
  | "glass_bead_precision"
  | "smd_chip_ntc";

const DATA: Record<Thermistor, {
  accuracy: number; responseSpeed: number; tempRange: number; sizeCompact: number;
  cost: number; ntcType: boolean; selfHeating: boolean; packageType: string; bestUse: string;
}> = {
  ntc_10k_standard:       { accuracy: 7, responseSpeed: 7, tempRange: 6, sizeCompact: 6, cost: 1, ntcType: true, selfHeating: false, packageType: "epoxy_coated_bead", bestUse: "general_temp_measure" },
  ptc_resettable_fuse:    { accuracy: 4, responseSpeed: 5, tempRange: 5, sizeCompact: 7, cost: 2, ntcType: false, selfHeating: true, packageType: "polymer_disc_radial", bestUse: "overcurrent_protect" },
  ntc_100k_high_temp:     { accuracy: 8, responseSpeed: 6, tempRange: 10, sizeCompact: 5, cost: 4, ntcType: true, selfHeating: false, packageType: "glass_encap_probe", bestUse: "high_temp_furnace" },
  glass_bead_precision:   { accuracy: 10, responseSpeed: 9, tempRange: 8, sizeCompact: 4, cost: 6, ntcType: true, selfHeating: false, packageType: "hermetic_glass_bead", bestUse: "precision_lab_temp" },
  smd_chip_ntc:           { accuracy: 7, responseSpeed: 10, tempRange: 6, sizeCompact: 10, cost: 3, ntcType: true, selfHeating: false, packageType: "ceramic_chip_0402", bestUse: "pcb_board_temp" },
};

const get = (t: Thermistor) => DATA[t];
export const accuracy = (t: Thermistor) => get(t).accuracy;
export const responseSpeed = (t: Thermistor) => get(t).responseSpeed;
export const tempRange = (t: Thermistor) => get(t).tempRange;
export const sizeCompact = (t: Thermistor) => get(t).sizeCompact;
export const thermCost = (t: Thermistor) => get(t).cost;
export const ntcType = (t: Thermistor) => get(t).ntcType;
export const selfHeating = (t: Thermistor) => get(t).selfHeating;
export const packageType = (t: Thermistor) => get(t).packageType;
export const bestUse = (t: Thermistor) => get(t).bestUse;
export const thermistors = (): Thermistor[] => Object.keys(DATA) as Thermistor[];
