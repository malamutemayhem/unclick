export type ShieldingType =
  | "lead_sheet_gamma"
  | "concrete_ordinary_gamma"
  | "borated_poly_neutron"
  | "water_pool_spent_fuel"
  | "tungsten_alloy_compact";

const DATA: Record<ShieldingType, {
  attenuation: number; neutronStop: number; structural: number;
  compactness: number; shCost: number; activationFree: boolean;
  forMedical: boolean; material: string; bestUse: string;
}> = {
  lead_sheet_gamma: {
    attenuation: 9, neutronStop: 2, structural: 3,
    compactness: 8, shCost: 3, activationFree: false,
    forMedical: true, material: "pure_lead_sheet_brick",
    bestUse: "xray_room_ct_scanner_enclosure",
  },
  concrete_ordinary_gamma: {
    attenuation: 7, neutronStop: 5, structural: 10,
    compactness: 2, shCost: 1, activationFree: false,
    forMedical: false, material: "portland_cement_aggregate",
    bestUse: "reactor_biological_shield_wall",
  },
  borated_poly_neutron: {
    attenuation: 3, neutronStop: 10, structural: 2,
    compactness: 7, shCost: 3, activationFree: true,
    forMedical: false, material: "hdpe_boron_carbide_loaded",
    bestUse: "neutron_beam_port_moderator",
  },
  water_pool_spent_fuel: {
    attenuation: 6, neutronStop: 8, structural: 1,
    compactness: 1, shCost: 2, activationFree: true,
    forMedical: false, material: "demineralized_borated_water",
    bestUse: "spent_fuel_pool_storage_cooling",
  },
  tungsten_alloy_compact: {
    attenuation: 10, neutronStop: 3, structural: 6,
    compactness: 10, shCost: 5, activationFree: false,
    forMedical: true, material: "tungsten_nickel_iron_alloy",
    bestUse: "radiation_therapy_mlc_collimator",
  },
};

const get = (t: ShieldingType) => DATA[t];

export const attenuation = (t: ShieldingType) => get(t).attenuation;
export const neutronStop = (t: ShieldingType) => get(t).neutronStop;
export const structural = (t: ShieldingType) => get(t).structural;
export const compactness = (t: ShieldingType) => get(t).compactness;
export const shCost = (t: ShieldingType) => get(t).shCost;
export const activationFree = (t: ShieldingType) => get(t).activationFree;
export const forMedical = (t: ShieldingType) => get(t).forMedical;
export const material = (t: ShieldingType) => get(t).material;
export const bestUse = (t: ShieldingType) => get(t).bestUse;
export const shieldingTypes = (): ShieldingType[] => Object.keys(DATA) as ShieldingType[];
