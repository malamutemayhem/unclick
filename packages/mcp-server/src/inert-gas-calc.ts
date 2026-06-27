export type InertGasType =
  | "flue_gas_scrubber"
  | "nitrogen_generator_membrane"
  | "nitrogen_generator_psa"
  | "co2_injection_food"
  | "argon_purge_welding";

interface InertGasData {
  purity: number;
  capacity: number;
  reliability: number;
  operating: number;
  igCost: number;
  onSite: boolean;
  forTanker: boolean;
  source: string;
  bestUse: string;
}

const DATA: Record<InertGasType, InertGasData> = {
  flue_gas_scrubber: {
    purity: 5, capacity: 10, reliability: 8, operating: 8, igCost: 6,
    onSite: true, forTanker: true,
    source: "boiler_exhaust_scrubbed_cooled",
    bestUse: "crude_oil_tanker_cargo_inerting",
  },
  nitrogen_generator_membrane: {
    purity: 8, capacity: 7, reliability: 9, operating: 7, igCost: 7,
    onSite: true, forTanker: true,
    source: "hollow_fiber_membrane_air_sep",
    bestUse: "chemical_tanker_product_blanket",
  },
  nitrogen_generator_psa: {
    purity: 10, capacity: 6, reliability: 8, operating: 6, igCost: 8,
    onSite: true, forTanker: false,
    source: "pressure_swing_carbon_molecular",
    bestUse: "electronics_pharma_high_purity",
  },
  co2_injection_food: {
    purity: 10, capacity: 5, reliability: 9, operating: 5, igCost: 5,
    onSite: false, forTanker: false,
    source: "liquid_co2_bulk_tank_vaporizer",
    bestUse: "food_packaging_map_atmosphere",
  },
  argon_purge_welding: {
    purity: 10, capacity: 4, reliability: 9, operating: 4, igCost: 9,
    onSite: false, forTanker: false,
    source: "compressed_cylinder_liquid_dewar",
    bestUse: "tig_welding_titanium_purge",
  },
};

function get(t: InertGasType): InertGasData {
  return DATA[t];
}

export const purity = (t: InertGasType) => get(t).purity;
export const capacity = (t: InertGasType) => get(t).capacity;
export const reliability = (t: InertGasType) => get(t).reliability;
export const operating = (t: InertGasType) => get(t).operating;
export const igCost = (t: InertGasType) => get(t).igCost;
export const onSite = (t: InertGasType) => get(t).onSite;
export const forTanker = (t: InertGasType) => get(t).forTanker;
export const source = (t: InertGasType) => get(t).source;
export const bestUse = (t: InertGasType) => get(t).bestUse;
export const inertGasTypes = (): InertGasType[] =>
  Object.keys(DATA) as InertGasType[];
