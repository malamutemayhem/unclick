export type EthernetCableType =
  | "cat5e_utp_patch"
  | "cat6_utp_solid"
  | "cat6a_stp_shielded"
  | "cat7_sftp_datacenter"
  | "cat8_shielded_25g";

const DATA: Record<EthernetCableType, {
  bandwidth: number; maxLength: number; shielding: number;
  flexibility: number; cableCost: number; shielded: boolean;
  forOutdoor: boolean; jacketType: string; bestUse: string;
}> = {
  cat5e_utp_patch: { bandwidth: 5, maxLength: 8, shielding: 2, flexibility: 9, cableCost: 2, shielded: false, forOutdoor: false, jacketType: "pvc_unshielded", bestUse: "home_network_patch" },
  cat6_utp_solid: { bandwidth: 7, maxLength: 8, shielding: 3, flexibility: 6, cableCost: 4, shielded: false, forOutdoor: false, jacketType: "lszh_plenum_rated", bestUse: "office_horizontal_run" },
  cat6a_stp_shielded: { bandwidth: 8, maxLength: 9, shielding: 7, flexibility: 5, cableCost: 6, shielded: true, forOutdoor: false, jacketType: "foil_shield_pvc", bestUse: "10gbe_backbone_run" },
  cat7_sftp_datacenter: { bandwidth: 9, maxLength: 9, shielding: 9, flexibility: 4, cableCost: 8, shielded: true, forOutdoor: false, jacketType: "dual_shield_lszh", bestUse: "datacenter_high_density" },
  cat8_shielded_25g: { bandwidth: 10, maxLength: 5, shielding: 10, flexibility: 3, cableCost: 10, shielded: true, forOutdoor: false, jacketType: "sftp_heavy_shield", bestUse: "short_run_25gbe_link" },
};

const get = (t: EthernetCableType) => DATA[t];

export const bandwidth = (t: EthernetCableType) => get(t).bandwidth;
export const maxLength = (t: EthernetCableType) => get(t).maxLength;
export const shielding = (t: EthernetCableType) => get(t).shielding;
export const flexibility = (t: EthernetCableType) => get(t).flexibility;
export const cableCost = (t: EthernetCableType) => get(t).cableCost;
export const shielded = (t: EthernetCableType) => get(t).shielded;
export const forOutdoor = (t: EthernetCableType) => get(t).forOutdoor;
export const jacketType = (t: EthernetCableType) => get(t).jacketType;
export const bestUse = (t: EthernetCableType) => get(t).bestUse;
export const ethernetCables = (): EthernetCableType[] => Object.keys(DATA) as EthernetCableType[];
