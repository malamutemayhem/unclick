export type TransponderType =
  | "mode_a_c_legacy"
  | "mode_s_selective"
  | "ads_b_out_1090"
  | "uat_978_mhz"
  | "military_iff_mode_5";

const DATA: Record<TransponderType, {
  accuracy: number; dataRate: number; range: number;
  interop: number; tpCost: number; gpsRequired: boolean;
  forCommercial: boolean; encoding: string; bestUse: string;
}> = {
  mode_a_c_legacy: {
    accuracy: 3, dataRate: 2, range: 7,
    interop: 8, tpCost: 1, gpsRequired: false,
    forCommercial: false, encoding: "pulse_position_squawk_code",
    bestUse: "legacy_vfr_atc_identification",
  },
  mode_s_selective: {
    accuracy: 6, dataRate: 5, range: 8,
    interop: 9, tpCost: 2, gpsRequired: false,
    forCommercial: true, encoding: "selective_interrogation_24bit",
    bestUse: "commercial_atc_tcas_surveillance",
  },
  ads_b_out_1090: {
    accuracy: 9, dataRate: 8, range: 9,
    interop: 10, tpCost: 3, gpsRequired: true,
    forCommercial: true, encoding: "extended_squitter_1090es",
    bestUse: "faa_mandate_all_controlled_air",
  },
  uat_978_mhz: {
    accuracy: 9, dataRate: 7, range: 6,
    interop: 6, tpCost: 2, gpsRequired: true,
    forCommercial: false, encoding: "universal_access_978_uplink",
    bestUse: "ga_below_fl180_fisb_weather",
  },
  military_iff_mode_5: {
    accuracy: 8, dataRate: 9, range: 10,
    interop: 4, tpCost: 5, gpsRequired: true,
    forCommercial: false, encoding: "crypto_spread_spectrum_waveform",
    bestUse: "military_combat_id_friend_foe",
  },
};

const get = (t: TransponderType) => DATA[t];

export const accuracy = (t: TransponderType) => get(t).accuracy;
export const dataRate = (t: TransponderType) => get(t).dataRate;
export const range = (t: TransponderType) => get(t).range;
export const interop = (t: TransponderType) => get(t).interop;
export const tpCost = (t: TransponderType) => get(t).tpCost;
export const gpsRequired = (t: TransponderType) => get(t).gpsRequired;
export const forCommercial = (t: TransponderType) => get(t).forCommercial;
export const encoding = (t: TransponderType) => get(t).encoding;
export const bestUse = (t: TransponderType) => get(t).bestUse;
export const transponderTypes = (): TransponderType[] => Object.keys(DATA) as TransponderType[];
