export type BootloaderType =
  | "rom_mask_boot"
  | "serial_uart_boot"
  | "usb_dfu_boot"
  | "secure_chain_boot"
  | "ota_dual_bank";

const DATA: Record<BootloaderType, {
  bootSpeed: number; security: number; updateSupport: number;
  footprint: number; bootCost: number; encrypted: boolean;
  forField: boolean; method: string; bestUse: string;
}> = {
  rom_mask_boot: {
    bootSpeed: 10, security: 4, updateSupport: 1,
    footprint: 10, bootCost: 1, encrypted: false,
    forField: false, method: "fixed_rom_vector",
    bestUse: "simple_mcu_startup",
  },
  serial_uart_boot: {
    bootSpeed: 5, security: 3, updateSupport: 5,
    footprint: 8, bootCost: 2, encrypted: false,
    forField: false, method: "uart_xmodem_flash",
    bestUse: "factory_programming",
  },
  usb_dfu_boot: {
    bootSpeed: 6, security: 5, updateSupport: 7,
    footprint: 6, bootCost: 3, encrypted: false,
    forField: true, method: "usb_device_firmware",
    bestUse: "developer_prototype",
  },
  secure_chain_boot: {
    bootSpeed: 7, security: 10, updateSupport: 6,
    footprint: 4, bootCost: 7, encrypted: true,
    forField: false, method: "rsa_chain_of_trust",
    bestUse: "payment_terminal_hsm",
  },
  ota_dual_bank: {
    bootSpeed: 7, security: 8, updateSupport: 10,
    footprint: 3, bootCost: 5, encrypted: true,
    forField: true, method: "ab_partition_swap",
    bestUse: "iot_fleet_update",
  },
};

const get = (t: BootloaderType) => DATA[t];

export const bootSpeed = (t: BootloaderType) => get(t).bootSpeed;
export const security = (t: BootloaderType) => get(t).security;
export const updateSupport = (t: BootloaderType) => get(t).updateSupport;
export const footprint = (t: BootloaderType) => get(t).footprint;
export const bootCost = (t: BootloaderType) => get(t).bootCost;
export const encrypted = (t: BootloaderType) => get(t).encrypted;
export const forField = (t: BootloaderType) => get(t).forField;
export const method = (t: BootloaderType) => get(t).method;
export const bestUse = (t: BootloaderType) => get(t).bestUse;
export const bootloaderTypes = (): BootloaderType[] => Object.keys(DATA) as BootloaderType[];
