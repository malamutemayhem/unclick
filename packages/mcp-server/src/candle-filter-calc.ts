export type CandleFilterType =
  | "metal_candle_sintered"
  | "ceramic_candle_hot_gas"
  | "polymer_candle_chemical"
  | "backwash_candle_auto"
  | "precoat_candle_clarity";

interface CandleFilterData {
  clarity: number;
  tempRange: number;
  chemResist: number;
  automation: number;
  cfCost: number;
  backwash: boolean;
  forHotGas: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<CandleFilterType, CandleFilterData> = {
  metal_candle_sintered: {
    clarity: 8, tempRange: 9, chemResist: 8, automation: 7, cfCost: 8,
    backwash: true, forHotGas: true,
    element: "sintered_stainless_porous_tube_weld",
    bestUse: "catalyst_recovery_high_temp_liquid",
  },
  ceramic_candle_hot_gas: {
    clarity: 9, tempRange: 10, chemResist: 10, automation: 6, cfCost: 9,
    backwash: true, forHotGas: true,
    element: "silicon_carbide_alumina_tube_rigid",
    bestUse: "flue_gas_clean_incinerator_biomass",
  },
  polymer_candle_chemical: {
    clarity: 7, tempRange: 4, chemResist: 9, automation: 7, cfCost: 5,
    backwash: false, forHotGas: false,
    element: "ptfe_polypropylene_molded_tube_cage",
    bestUse: "acid_alkali_corrosive_liquid_polish",
  },
  backwash_candle_auto: {
    clarity: 7, tempRange: 6, chemResist: 7, automation: 10, cfCost: 7,
    backwash: true, forHotGas: false,
    element: "auto_pulse_reverse_flow_clean_cycle",
    bestUse: "continuous_process_no_stop_auto_clean",
  },
  precoat_candle_clarity: {
    clarity: 10, tempRange: 5, chemResist: 6, automation: 5, cfCost: 6,
    backwash: false, forHotGas: false,
    element: "precoat_de_cellulose_candle_surface",
    bestUse: "beverage_edible_oil_fine_polish_clear",
  },
};

function get(t: CandleFilterType): CandleFilterData {
  return DATA[t];
}

export const clarity = (t: CandleFilterType) => get(t).clarity;
export const tempRange = (t: CandleFilterType) => get(t).tempRange;
export const chemResist = (t: CandleFilterType) => get(t).chemResist;
export const automation = (t: CandleFilterType) => get(t).automation;
export const cfCost = (t: CandleFilterType) => get(t).cfCost;
export const backwash = (t: CandleFilterType) => get(t).backwash;
export const forHotGas = (t: CandleFilterType) => get(t).forHotGas;
export const element = (t: CandleFilterType) => get(t).element;
export const bestUse = (t: CandleFilterType) => get(t).bestUse;
export const candleFilterTypes = (): CandleFilterType[] =>
  Object.keys(DATA) as CandleFilterType[];
