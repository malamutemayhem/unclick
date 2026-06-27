export type SludgeDewateringType =
  | "belt_filter_press"
  | "centrifuge_decanter"
  | "screw_press"
  | "plate_frame_press"
  | "vacuum_drum_filter";

interface SludgeDewateringData {
  cakeDryness: number;
  throughput: number;
  energyUse: number;
  polymerUse: number;
  sdwCost: number;
  continuous: boolean;
  forHighVolume: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SludgeDewateringType, SludgeDewateringData> = {
  belt_filter_press: {
    cakeDryness: 6, throughput: 8, energyUse: 4, polymerUse: 6, sdwCost: 5,
    continuous: true, forHighVolume: true,
    mechanism: "gravity_drain_roller_squeeze_belt_continuous_cake",
    bestUse: "municipal_sewage_sludge_medium_to_large_plant",
  },
  centrifuge_decanter: {
    cakeDryness: 8, throughput: 9, energyUse: 8, polymerUse: 7, sdwCost: 8,
    continuous: true, forHighVolume: true,
    mechanism: "horizontal_scroll_bowl_high_g_force_separation",
    bestUse: "large_wwtp_industrial_sludge_high_throughput_auto",
  },
  screw_press: {
    cakeDryness: 5, throughput: 5, energyUse: 2, polymerUse: 5, sdwCost: 4,
    continuous: true, forHighVolume: false,
    mechanism: "rotating_screw_in_cylinder_slow_squeeze_low_energy",
    bestUse: "small_wwtp_food_processing_low_energy_unattended",
  },
  plate_frame_press: {
    cakeDryness: 10, throughput: 4, energyUse: 5, polymerUse: 3, sdwCost: 7,
    continuous: false, forHighVolume: false,
    mechanism: "recessed_plate_membrane_squeeze_batch_high_pressure",
    bestUse: "industrial_chemical_sludge_mining_tailings_dry_cake",
  },
  vacuum_drum_filter: {
    cakeDryness: 4, throughput: 6, energyUse: 6, polymerUse: 4, sdwCost: 6,
    continuous: true, forHighVolume: false,
    mechanism: "rotating_drum_vacuum_suction_precoat_filter_cloth",
    bestUse: "mineral_processing_starch_paper_mill_fiber_recovery",
  },
};

function get(t: SludgeDewateringType): SludgeDewateringData {
  return DATA[t];
}

export const cakeDryness = (t: SludgeDewateringType) => get(t).cakeDryness;
export const throughput = (t: SludgeDewateringType) => get(t).throughput;
export const energyUse = (t: SludgeDewateringType) => get(t).energyUse;
export const polymerUse = (t: SludgeDewateringType) => get(t).polymerUse;
export const sdwCost = (t: SludgeDewateringType) => get(t).sdwCost;
export const continuous = (t: SludgeDewateringType) => get(t).continuous;
export const forHighVolume = (t: SludgeDewateringType) => get(t).forHighVolume;
export const mechanism = (t: SludgeDewateringType) => get(t).mechanism;
export const bestUse = (t: SludgeDewateringType) => get(t).bestUse;
export const sludgeDewateringTypes = (): SludgeDewateringType[] =>
  Object.keys(DATA) as SludgeDewateringType[];
