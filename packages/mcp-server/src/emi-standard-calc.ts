export type EmiStandard =
  | "cispr_32_ite"
  | "fcc_part_15b"
  | "mil_std_461g"
  | "cispr_25_auto"
  | "do_160_avion";

const DATA: Record<EmiStandard, {
  freqRange: number; limitStrictness: number; testComplexity: number;
  shieldReq: number; complianceCost: number; radiated: boolean;
  forConsumer: boolean; testMethod: string; bestUse: string;
}> = {
  cispr_32_ite: {
    freqRange: 6, limitStrictness: 5, testComplexity: 5,
    shieldReq: 4, complianceCost: 4, radiated: true,
    forConsumer: true, testMethod: "anechoic_chamber_3m",
    bestUse: "consumer_electronics_ce",
  },
  fcc_part_15b: {
    freqRange: 7, limitStrictness: 6, testComplexity: 5,
    shieldReq: 5, complianceCost: 5, radiated: true,
    forConsumer: true, testMethod: "oats_or_chamber_3m",
    bestUse: "us_market_digital_device",
  },
  mil_std_461g: {
    freqRange: 10, limitStrictness: 10, testComplexity: 10,
    shieldReq: 10, complianceCost: 10, radiated: true,
    forConsumer: false, testMethod: "shielded_room_re102",
    bestUse: "military_platform_subsystem",
  },
  cispr_25_auto: {
    freqRange: 8, limitStrictness: 8, testComplexity: 7,
    shieldReq: 7, complianceCost: 7, radiated: true,
    forConsumer: false, testMethod: "alse_stripline_1m",
    bestUse: "automotive_ecu_module",
  },
  do_160_avion: {
    freqRange: 9, limitStrictness: 9, testComplexity: 9,
    shieldReq: 9, complianceCost: 9, radiated: true,
    forConsumer: false, testMethod: "category_l_m_open_area",
    bestUse: "avionics_flight_display",
  },
};

const get = (t: EmiStandard) => DATA[t];

export const freqRange = (t: EmiStandard) => get(t).freqRange;
export const limitStrictness = (t: EmiStandard) => get(t).limitStrictness;
export const testComplexity = (t: EmiStandard) => get(t).testComplexity;
export const shieldReq = (t: EmiStandard) => get(t).shieldReq;
export const complianceCost = (t: EmiStandard) => get(t).complianceCost;
export const radiated = (t: EmiStandard) => get(t).radiated;
export const forConsumer = (t: EmiStandard) => get(t).forConsumer;
export const testMethod = (t: EmiStandard) => get(t).testMethod;
export const bestUse = (t: EmiStandard) => get(t).bestUse;
export const emiStandards = (): EmiStandard[] => Object.keys(DATA) as EmiStandard[];
