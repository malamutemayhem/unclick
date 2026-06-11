export type EnergyStorage =
  | "lithium_ion_battery"
  | "pumped_hydro_reservoir"
  | "compressed_air_cavern"
  | "flywheel_kinetic_rotor"
  | "vanadium_redox_flow";

const DATA: Record<EnergyStorage, {
  energyDensity: number; powerDensity: number; roundTrip: number;
  life: number; esCost: number; scalable: boolean;
  forGrid: boolean; medium: string; bestUse: string;
}> = {
  lithium_ion_battery: {
    energyDensity: 10, powerDensity: 9, roundTrip: 9,
    life: 5, esCost: 3, scalable: true,
    forGrid: true, medium: "lithium_intercalation_cell",
    bestUse: "ev_battery_pack_mobile_power",
  },
  pumped_hydro_reservoir: {
    energyDensity: 3, powerDensity: 6, roundTrip: 8,
    life: 10, esCost: 2, scalable: false,
    forGrid: true, medium: "elevated_water_reservoir",
    bestUse: "bulk_grid_storage_overnight",
  },
  compressed_air_cavern: {
    energyDensity: 4, powerDensity: 5, roundTrip: 6,
    life: 9, esCost: 2, scalable: false,
    forGrid: true, medium: "underground_salt_cavern_air",
    bestUse: "long_duration_seasonal_shift",
  },
  flywheel_kinetic_rotor: {
    energyDensity: 2, powerDensity: 10, roundTrip: 9,
    life: 8, esCost: 4, scalable: true,
    forGrid: false, medium: "spinning_composite_rotor",
    bestUse: "frequency_regulation_fast_response",
  },
  vanadium_redox_flow: {
    energyDensity: 5, powerDensity: 4, roundTrip: 7,
    life: 10, esCost: 4, scalable: true,
    forGrid: true, medium: "vanadium_electrolyte_tank",
    bestUse: "solar_farm_4hr_duration_shift",
  },
};

const get = (t: EnergyStorage) => DATA[t];

export const energyDensity = (t: EnergyStorage) => get(t).energyDensity;
export const powerDensity = (t: EnergyStorage) => get(t).powerDensity;
export const roundTrip = (t: EnergyStorage) => get(t).roundTrip;
export const life = (t: EnergyStorage) => get(t).life;
export const esCost = (t: EnergyStorage) => get(t).esCost;
export const scalable = (t: EnergyStorage) => get(t).scalable;
export const forGrid = (t: EnergyStorage) => get(t).forGrid;
export const medium = (t: EnergyStorage) => get(t).medium;
export const bestUse = (t: EnergyStorage) => get(t).bestUse;
export const energyStorages = (): EnergyStorage[] => Object.keys(DATA) as EnergyStorage[];
