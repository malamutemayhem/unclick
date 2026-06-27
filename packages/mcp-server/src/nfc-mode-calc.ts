export type NfcModeType =
  | "reader_writer"
  | "peer_to_peer"
  | "card_emulation"
  | "tag_type_4"
  | "felica_transit";

const DATA: Record<NfcModeType, {
  dataRate: number; range: number; security: number;
  latency: number; modeCost: number; passive: boolean;
  forPayment: boolean; standard: string; bestUse: string;
}> = {
  reader_writer: { dataRate: 5, range: 4, security: 5, latency: 7, modeCost: 2, passive: false, forPayment: false, standard: "iso_14443_reader", bestUse: "tag_read_write_ndef" },
  peer_to_peer: { dataRate: 7, range: 3, security: 6, latency: 5, modeCost: 3, passive: false, forPayment: false, standard: "nfcip_1_p2p", bestUse: "device_pairing_handover" },
  card_emulation: { dataRate: 5, range: 4, security: 9, latency: 9, modeCost: 4, passive: true, forPayment: true, standard: "iso_14443_hce", bestUse: "mobile_payment_wallet" },
  tag_type_4: { dataRate: 4, range: 5, security: 4, latency: 8, modeCost: 1, passive: true, forPayment: false, standard: "iso_dep_type4", bestUse: "smart_poster_url_launch" },
  felica_transit: { dataRate: 8, range: 3, security: 8, latency: 10, modeCost: 5, passive: true, forPayment: true, standard: "jis_x_6319_felica", bestUse: "transit_fare_collection" },
};

const get = (t: NfcModeType) => DATA[t];

export const dataRate = (t: NfcModeType) => get(t).dataRate;
export const range = (t: NfcModeType) => get(t).range;
export const security = (t: NfcModeType) => get(t).security;
export const latency = (t: NfcModeType) => get(t).latency;
export const modeCost = (t: NfcModeType) => get(t).modeCost;
export const passive = (t: NfcModeType) => get(t).passive;
export const forPayment = (t: NfcModeType) => get(t).forPayment;
export const standard = (t: NfcModeType) => get(t).standard;
export const bestUse = (t: NfcModeType) => get(t).bestUse;
export const nfcModes = (): NfcModeType[] => Object.keys(DATA) as NfcModeType[];
