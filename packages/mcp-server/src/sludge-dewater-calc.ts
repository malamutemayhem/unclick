export type SludgeDewaterType =
  | "belt_filter_press"
  | "screw_press"
  | "plate_frame_press"
  | "centrifuge_dewater"
  | "vacuum_drum_filter";

interface SludgeDewaterData {
  cakeDryness: number;
  throughput: number;
  polymerUsage: number;
  energyEfficiency: number;
  sdCost: number;
  continuous: boolean;
  forMunicipal: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<SludgeDewaterType, SludgeDewaterData> = {
  belt_filter_press: {
    cakeDryness: 7, throughput: 9, polymerUsage: 7, energyEfficiency: 8, sdCost: 6,
    continuous: true, forMunicipal: true,
    process: "gravity_drain_pressure_roller_belt_continuous_cake_output",
    bestUse: "municipal_wastewater_plant_high_volume_continuous_dewater",
  },
  screw_press: {
    cakeDryness: 6, throughput: 7, polymerUsage: 9, energyEfficiency: 10, sdCost: 5,
    continuous: true, forMunicipal: true,
    process: "slow_rotating_screw_screen_cylinder_low_speed_gentle_press",
    bestUse: "small_municipal_plant_food_waste_low_energy_unattended_run",
  },
  plate_frame_press: {
    cakeDryness: 10, throughput: 5, polymerUsage: 5, energyEfficiency: 5, sdCost: 8,
    continuous: false, forMunicipal: false,
    process: "hydraulic_plate_squeeze_filter_cloth_batch_high_pressure",
    bestUse: "industrial_sludge_mining_tailing_maximum_dryness_disposal",
  },
  centrifuge_dewater: {
    cakeDryness: 8, throughput: 8, polymerUsage: 6, energyEfficiency: 6, sdCost: 9,
    continuous: true, forMunicipal: true,
    process: "high_speed_decanter_scroll_conveyor_g_force_separation",
    bestUse: "large_municipal_plant_industrial_biosolids_compact_install",
  },
  vacuum_drum_filter: {
    cakeDryness: 5, throughput: 6, polymerUsage: 8, energyEfficiency: 7, sdCost: 4,
    continuous: true, forMunicipal: false,
    process: "rotating_drum_vacuum_suction_filter_cloth_scraper_blade",
    bestUse: "chemical_plant_mineral_process_continuous_filtration_slurry",
  },
};

function get(t: SludgeDewaterType): SludgeDewaterData {
  return DATA[t];
}

export const cakeDryness = (t: SludgeDewaterType) => get(t).cakeDryness;
export const throughput = (t: SludgeDewaterType) => get(t).throughput;
export const polymerUsage = (t: SludgeDewaterType) => get(t).polymerUsage;
export const energyEfficiency = (t: SludgeDewaterType) => get(t).energyEfficiency;
export const sdCost = (t: SludgeDewaterType) => get(t).sdCost;
export const continuous = (t: SludgeDewaterType) => get(t).continuous;
export const forMunicipal = (t: SludgeDewaterType) => get(t).forMunicipal;
export const process = (t: SludgeDewaterType) => get(t).process;
export const bestUse = (t: SludgeDewaterType) => get(t).bestUse;
export const sludgeDewaterTypes = (): SludgeDewaterType[] =>
  Object.keys(DATA) as SludgeDewaterType[];
