export type DiscFilterType =
  | "vacuum_disc_ceramic"
  | "vacuum_disc_cloth"
  | "pressure_disc_enclosed"
  | "capillary_disc_micro"
  | "indexing_disc_continuous";

interface DiscFilterData {
  throughput: number;
  cakeWash: number;
  moistureRemoval: number;
  footprint: number;
  dfCost: number;
  pressurized: boolean;
  forSlurry: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<DiscFilterType, DiscFilterData> = {
  vacuum_disc_ceramic: {
    throughput: 9, cakeWash: 6, moistureRemoval: 8, footprint: 9, dfCost: 7,
    pressurized: false, forSlurry: true,
    medium: "ceramic_sector_microporous_alumina_disc",
    bestUse: "mining_mineral_concentrate_dewatering_high_cap",
  },
  vacuum_disc_cloth: {
    throughput: 8, cakeWash: 7, moistureRemoval: 7, footprint: 8, dfCost: 4,
    pressurized: false, forSlurry: true,
    medium: "polypropylene_cloth_sector_replaceable_filter",
    bestUse: "mineral_processing_tailings_general_slurry",
  },
  pressure_disc_enclosed: {
    throughput: 7, cakeWash: 8, moistureRemoval: 9, footprint: 7, dfCost: 8,
    pressurized: true, forSlurry: true,
    medium: "enclosed_pressure_vessel_disc_stack_pneumatic",
    bestUse: "chemical_process_toxic_volatile_slurry_enclosed",
  },
  capillary_disc_micro: {
    throughput: 5, cakeWash: 9, moistureRemoval: 9, footprint: 6, dfCost: 9,
    pressurized: false, forSlurry: false,
    medium: "capillary_action_micro_disc_ceramic_membrane",
    bestUse: "fine_particle_recovery_precious_metal_tailings",
  },
  indexing_disc_continuous: {
    throughput: 10, cakeWash: 5, moistureRemoval: 7, footprint: 8, dfCost: 6,
    pressurized: false, forSlurry: true,
    medium: "indexing_cloth_disc_continuous_rotation_scraper",
    bestUse: "high_volume_wastewater_sludge_continuous_dewater",
  },
};

function get(t: DiscFilterType): DiscFilterData {
  return DATA[t];
}

export const throughput = (t: DiscFilterType) => get(t).throughput;
export const cakeWash = (t: DiscFilterType) => get(t).cakeWash;
export const moistureRemoval = (t: DiscFilterType) => get(t).moistureRemoval;
export const footprint = (t: DiscFilterType) => get(t).footprint;
export const dfCost = (t: DiscFilterType) => get(t).dfCost;
export const pressurized = (t: DiscFilterType) => get(t).pressurized;
export const forSlurry = (t: DiscFilterType) => get(t).forSlurry;
export const medium = (t: DiscFilterType) => get(t).medium;
export const bestUse = (t: DiscFilterType) => get(t).bestUse;
export const discFilterTypes = (): DiscFilterType[] =>
  Object.keys(DATA) as DiscFilterType[];
