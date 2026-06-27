export type DemandResponseType =
  | "direct_load_control"
  | "curtailable_interruptible"
  | "real_time_pricing"
  | "critical_peak_pricing"
  | "aggregated_virtual_plant";

interface DemandResponseData {
  savings: number;
  flexibility: number;
  automation: number;
  reliability: number;
  drCost: number;
  automated: boolean;
  forResidential: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<DemandResponseType, DemandResponseData> = {
  direct_load_control: {
    savings: 6, flexibility: 3, automation: 9, reliability: 8, drCost: 2,
    automated: true, forResidential: true,
    mechanism: "utility_switch_ac_water_heat",
    bestUse: "residential_peak_shaving_ac",
  },
  curtailable_interruptible: {
    savings: 8, flexibility: 5, automation: 7, reliability: 7, drCost: 4,
    automated: false, forResidential: false,
    mechanism: "contract_curtailment_notice",
    bestUse: "industrial_load_shedding",
  },
  real_time_pricing: {
    savings: 7, flexibility: 10, automation: 6, reliability: 6, drCost: 5,
    automated: false, forResidential: false,
    mechanism: "wholesale_price_signal_lmp",
    bestUse: "large_commercial_price_arb",
  },
  critical_peak_pricing: {
    savings: 9, flexibility: 7, automation: 8, reliability: 8, drCost: 3,
    automated: true, forResidential: true,
    mechanism: "peak_event_day_ahead_signal",
    bestUse: "utility_program_peak_event",
  },
  aggregated_virtual_plant: {
    savings: 10, flexibility: 9, automation: 10, reliability: 9, drCost: 8,
    automated: true, forResidential: false,
    mechanism: "vpp_aggregator_cloud_derms",
    bestUse: "grid_services_frequency_reg",
  },
};

function get(t: DemandResponseType): DemandResponseData {
  return DATA[t];
}

export const savings = (t: DemandResponseType) => get(t).savings;
export const flexibility = (t: DemandResponseType) => get(t).flexibility;
export const automation = (t: DemandResponseType) => get(t).automation;
export const reliability = (t: DemandResponseType) => get(t).reliability;
export const drCost = (t: DemandResponseType) => get(t).drCost;
export const automated = (t: DemandResponseType) => get(t).automated;
export const forResidential = (t: DemandResponseType) => get(t).forResidential;
export const mechanism = (t: DemandResponseType) => get(t).mechanism;
export const bestUse = (t: DemandResponseType) => get(t).bestUse;
export const demandResponseTypes = (): DemandResponseType[] =>
  Object.keys(DATA) as DemandResponseType[];
