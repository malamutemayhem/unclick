export type DewateringPressType =
  | "chamber_filter_press"
  | "belt_filter_press"
  | "screw_press_continuous"
  | "disc_filter_vacuum"
  | "hyperbaric_filter_press";

interface DewateringPressData {
  cakeDryness: number;
  throughput: number;
  automation: number;
  energyUse: number;
  dpCost: number;
  continuous: boolean;
  forFine: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<DewateringPressType, DewateringPressData> = {
  chamber_filter_press: {
    cakeDryness: 9, throughput: 6, automation: 7, energyUse: 5, dpCost: 6,
    continuous: false, forFine: true,
    mechanism: "plate_chamber_high_pressure_squeeze",
    bestUse: "mineral_concentrate_high_dry_cake",
  },
  belt_filter_press: {
    cakeDryness: 6, throughput: 9, automation: 8, energyUse: 6, dpCost: 5,
    continuous: true, forFine: false,
    mechanism: "twin_belt_gravity_pressure_shear",
    bestUse: "sludge_tailings_continuous_dewater",
  },
  screw_press_continuous: {
    cakeDryness: 5, throughput: 7, automation: 9, energyUse: 8, dpCost: 4,
    continuous: true, forFine: false,
    mechanism: "tapered_screw_increasing_pressure_zone",
    bestUse: "wastewater_biosolid_low_energy_compact",
  },
  disc_filter_vacuum: {
    cakeDryness: 7, throughput: 10, automation: 8, energyUse: 4, dpCost: 7,
    continuous: true, forFine: true,
    mechanism: "rotating_disc_vacuum_sector_discharge",
    bestUse: "high_tonnage_iron_ore_concentrate_filt",
  },
  hyperbaric_filter_press: {
    cakeDryness: 10, throughput: 5, automation: 6, energyUse: 3, dpCost: 10,
    continuous: false, forFine: true,
    mechanism: "pressurized_vessel_air_blow_membrane",
    bestUse: "ultra_dry_cake_coal_fine_moisture_limit",
  },
};

function get(t: DewateringPressType): DewateringPressData {
  return DATA[t];
}

export const cakeDryness = (t: DewateringPressType) => get(t).cakeDryness;
export const throughput = (t: DewateringPressType) => get(t).throughput;
export const automation = (t: DewateringPressType) => get(t).automation;
export const energyUse = (t: DewateringPressType) => get(t).energyUse;
export const dpCost = (t: DewateringPressType) => get(t).dpCost;
export const continuous = (t: DewateringPressType) => get(t).continuous;
export const forFine = (t: DewateringPressType) => get(t).forFine;
export const mechanism = (t: DewateringPressType) => get(t).mechanism;
export const bestUse = (t: DewateringPressType) => get(t).bestUse;
export const dewateringPressTypes = (): DewateringPressType[] =>
  Object.keys(DATA) as DewateringPressType[];
