export type ChargerProtocol =
  | "ccs_combo_dc"
  | "chademo_v2"
  | "tesla_nacs"
  | "megawatt_mcs"
  | "wireless_qi2_mag";

const DATA: Record<ChargerProtocol, {
  maxPower: number; efficiency: number; availability: number;
  bidirectional: number; chgCost: number; plugless: boolean;
  forFleet: boolean; standard: string; bestUse: string;
}> = {
  ccs_combo_dc: {
    maxPower: 8, efficiency: 8, availability: 9,
    bidirectional: 7, chgCost: 6, plugless: false,
    forFleet: true, standard: "iec_61851_iso_15118",
    bestUse: "public_highway_fast_charge",
  },
  chademo_v2: {
    maxPower: 6, efficiency: 7, availability: 5,
    bidirectional: 10, chgCost: 5, plugless: false,
    forFleet: false, standard: "ieee_2030_1_1_v2g",
    bestUse: "v2g_home_energy_export",
  },
  tesla_nacs: {
    maxPower: 9, efficiency: 9, availability: 8,
    bidirectional: 5, chgCost: 7, plugless: false,
    forFleet: false, standard: "sae_j3400_nacs",
    bestUse: "supercharger_road_trip",
  },
  megawatt_mcs: {
    maxPower: 10, efficiency: 8, availability: 2,
    bidirectional: 6, chgCost: 10, plugless: false,
    forFleet: true, standard: "charin_mcs_3_75mw",
    bestUse: "electric_semi_truck_depot",
  },
  wireless_qi2_mag: {
    maxPower: 3, efficiency: 5, availability: 3,
    bidirectional: 3, chgCost: 8, plugless: true,
    forFleet: false, standard: "sae_j2954_wpt_inductive",
    bestUse: "autonomous_taxi_pad_charge",
  },
};

const get = (t: ChargerProtocol) => DATA[t];

export const maxPower = (t: ChargerProtocol) => get(t).maxPower;
export const efficiency = (t: ChargerProtocol) => get(t).efficiency;
export const availability = (t: ChargerProtocol) => get(t).availability;
export const bidirectional = (t: ChargerProtocol) => get(t).bidirectional;
export const chgCost = (t: ChargerProtocol) => get(t).chgCost;
export const plugless = (t: ChargerProtocol) => get(t).plugless;
export const forFleet = (t: ChargerProtocol) => get(t).forFleet;
export const standard = (t: ChargerProtocol) => get(t).standard;
export const bestUse = (t: ChargerProtocol) => get(t).bestUse;
export const chargerProtocols = (): ChargerProtocol[] => Object.keys(DATA) as ChargerProtocol[];
