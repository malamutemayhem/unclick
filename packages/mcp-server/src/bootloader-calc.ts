export type Bootloader =
  | "rom_mask_fixed"
  | "uart_serial_isp"
  | "usb_dfu_standard"
  | "ota_dual_bank"
  | "secure_boot_chain";

const DATA: Record<Bootloader, {
  updateSpeed: number; security: number; recovery: number;
  footprint: number; blCost: number; fieldUpdate: boolean;
  forIot: boolean; transport: string; bestUse: string;
}> = {
  rom_mask_fixed: {
    updateSpeed: 1, security: 8, recovery: 2,
    footprint: 10, blCost: 1, fieldUpdate: false,
    forIot: false, transport: "factory_programmed_otp",
    bestUse: "secure_element_immutable_root",
  },
  uart_serial_isp: {
    updateSpeed: 4, security: 3, recovery: 7,
    footprint: 9, blCost: 2, fieldUpdate: true,
    forIot: false, transport: "uart_115200_xmodem",
    bestUse: "development_board_reflash",
  },
  usb_dfu_standard: {
    updateSpeed: 8, security: 5, recovery: 8,
    footprint: 7, blCost: 3, fieldUpdate: true,
    forIot: false, transport: "usb_hid_dfu_class",
    bestUse: "consumer_device_firmware_update",
  },
  ota_dual_bank: {
    updateSpeed: 6, security: 7, recovery: 10,
    footprint: 4, blCost: 5, fieldUpdate: true,
    forIot: true, transport: "https_coap_delta_patch",
    bestUse: "iot_fleet_remote_update",
  },
  secure_boot_chain: {
    updateSpeed: 5, security: 10, recovery: 9,
    footprint: 3, blCost: 7, fieldUpdate: true,
    forIot: true, transport: "signed_image_chain_verify",
    bestUse: "automotive_ecu_secure_flash",
  },
};

const get = (t: Bootloader) => DATA[t];

export const updateSpeed = (t: Bootloader) => get(t).updateSpeed;
export const security = (t: Bootloader) => get(t).security;
export const recovery = (t: Bootloader) => get(t).recovery;
export const footprint = (t: Bootloader) => get(t).footprint;
export const blCost = (t: Bootloader) => get(t).blCost;
export const fieldUpdate = (t: Bootloader) => get(t).fieldUpdate;
export const forIot = (t: Bootloader) => get(t).forIot;
export const transport = (t: Bootloader) => get(t).transport;
export const bestUse = (t: Bootloader) => get(t).bestUse;
export const bootloaders = (): Bootloader[] => Object.keys(DATA) as Bootloader[];
