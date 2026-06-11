export type HvofCoatingType =
  | "gas_fuel_kerosene"
  | "gas_fuel_hydrogen"
  | "liquid_fuel_propylene"
  | "warm_spray_nitrogen"
  | "high_velocity_air_fuel";

interface HvofCoatingData {
  density: number;
  hardness: number;
  adhesion: number;
  porosity: number;
  hvCost: number;
  lowOxide: boolean;
  forCarbide: boolean;
  fuel: string;
  bestUse: string;
}

const DATA: Record<HvofCoatingType, HvofCoatingData> = {
  gas_fuel_kerosene: {
    density: 9, hardness: 9, adhesion: 9, porosity: 9, hvCost: 7,
    lowOxide: true, forCarbide: true,
    fuel: "kerosene_oxygen_combustion_high_velocity",
    bestUse: "landing_gear_hydraulic_rod_wc_co_carbide",
  },
  gas_fuel_hydrogen: {
    density: 8, hardness: 8, adhesion: 8, porosity: 8, hvCost: 6,
    lowOxide: true, forCarbide: true,
    fuel: "hydrogen_oxygen_clean_combustion_flame",
    bestUse: "pump_shaft_sleeve_chrome_carbide_wear",
  },
  liquid_fuel_propylene: {
    density: 8, hardness: 8, adhesion: 9, porosity: 8, hvCost: 5,
    lowOxide: false, forCarbide: true,
    fuel: "propylene_oxygen_combustion_versatile",
    bestUse: "general_wear_coat_stellite_tribaloy",
  },
  warm_spray_nitrogen: {
    density: 9, hardness: 7, adhesion: 8, porosity: 9, hvCost: 8,
    lowOxide: true, forCarbide: false,
    fuel: "kerosene_nitrogen_mixing_lower_temp",
    bestUse: "titanium_mcraly_oxidation_sensitive_coat",
  },
  high_velocity_air_fuel: {
    density: 7, hardness: 7, adhesion: 7, porosity: 7, hvCost: 4,
    lowOxide: false, forCarbide: false,
    fuel: "propane_compressed_air_lower_cost",
    bestUse: "corrosion_protect_zinc_aluminum_bridge",
  },
};

function get(t: HvofCoatingType): HvofCoatingData {
  return DATA[t];
}

export const density = (t: HvofCoatingType) => get(t).density;
export const hardness = (t: HvofCoatingType) => get(t).hardness;
export const adhesion = (t: HvofCoatingType) => get(t).adhesion;
export const porosity = (t: HvofCoatingType) => get(t).porosity;
export const hvCost = (t: HvofCoatingType) => get(t).hvCost;
export const lowOxide = (t: HvofCoatingType) => get(t).lowOxide;
export const forCarbide = (t: HvofCoatingType) => get(t).forCarbide;
export const fuel = (t: HvofCoatingType) => get(t).fuel;
export const bestUse = (t: HvofCoatingType) => get(t).bestUse;
export const hvofCoatingTypes = (): HvofCoatingType[] =>
  Object.keys(DATA) as HvofCoatingType[];
