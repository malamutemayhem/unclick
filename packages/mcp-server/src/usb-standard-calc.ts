export type UsbStandard =
  | "usb2_high_speed"
  | "usb3_gen1_super"
  | "usb3_gen2x2"
  | "usb4_tunnel"
  | "usb_pd_power";

const DATA: Record<UsbStandard, {
  throughput: number; powerDelivery: number; cableLength: number;
  compatibility: number; usbCost: number; typeCOnly: boolean;
  forVideo: boolean; encoding: string; bestUse: string;
}> = {
  usb2_high_speed: {
    throughput: 2, powerDelivery: 2, cableLength: 8,
    compatibility: 10, usbCost: 1, typeCOnly: false,
    forVideo: false, encoding: "nrzi_bit_stuffing",
    bestUse: "keyboard_mouse_peripheral",
  },
  usb3_gen1_super: {
    throughput: 5, powerDelivery: 4, cableLength: 6,
    compatibility: 8, usbCost: 3, typeCOnly: false,
    forVideo: false, encoding: "8b10b_scrambled",
    bestUse: "external_storage_drive",
  },
  usb3_gen2x2: {
    throughput: 8, powerDelivery: 5, cableLength: 5,
    compatibility: 6, usbCost: 5, typeCOnly: true,
    forVideo: false, encoding: "128b132b_dual_lane",
    bestUse: "nvme_enclosure_fast",
  },
  usb4_tunnel: {
    throughput: 10, powerDelivery: 8, cableLength: 4,
    compatibility: 5, usbCost: 8, typeCOnly: true,
    forVideo: true, encoding: "pcie_dp_tunnel_mux",
    bestUse: "thunderbolt_dock_egpu",
  },
  usb_pd_power: {
    throughput: 2, powerDelivery: 10, cableLength: 7,
    compatibility: 7, usbCost: 4, typeCOnly: true,
    forVideo: false, encoding: "bmc_cc_line_protocol",
    bestUse: "laptop_charger_universal",
  },
};

const get = (t: UsbStandard) => DATA[t];

export const throughput = (t: UsbStandard) => get(t).throughput;
export const powerDelivery = (t: UsbStandard) => get(t).powerDelivery;
export const cableLength = (t: UsbStandard) => get(t).cableLength;
export const compatibility = (t: UsbStandard) => get(t).compatibility;
export const usbCost = (t: UsbStandard) => get(t).usbCost;
export const typeCOnly = (t: UsbStandard) => get(t).typeCOnly;
export const forVideo = (t: UsbStandard) => get(t).forVideo;
export const encoding = (t: UsbStandard) => get(t).encoding;
export const bestUse = (t: UsbStandard) => get(t).bestUse;
export const usbStandards = (): UsbStandard[] => Object.keys(DATA) as UsbStandard[];
