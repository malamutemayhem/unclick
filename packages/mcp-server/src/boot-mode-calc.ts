export type BootMode =
  | "internal_flash_xip"
  | "serial_boot_uart"
  | "usb_dfu_boot"
  | "spi_flash_external"
  | "secure_boot_chain";

const DATA: Record<BootMode, {
  speed: number; security: number; flexibility: number;
  reliability: number; bootCost: number; fieldUpdate: boolean;
  forProduction: boolean; mechanism: string; bestUse: string;
}> = {
  internal_flash_xip: {
    speed: 10, security: 6, flexibility: 3,
    reliability: 9, bootCost: 1, fieldUpdate: false,
    forProduction: true, mechanism: "execute_in_place_rom",
    bestUse: "fast_deterministic_boot",
  },
  serial_boot_uart: {
    speed: 3, security: 2, flexibility: 7,
    reliability: 7, bootCost: 1, fieldUpdate: true,
    forProduction: false, mechanism: "rom_bootloader_uart",
    bestUse: "factory_initial_program",
  },
  usb_dfu_boot: {
    speed: 5, security: 4, flexibility: 8,
    reliability: 7, bootCost: 2, fieldUpdate: true,
    forProduction: false, mechanism: "usb_device_firmware_upgrade",
    bestUse: "end_user_firmware_update",
  },
  spi_flash_external: {
    speed: 7, security: 5, flexibility: 9,
    reliability: 7, bootCost: 3, fieldUpdate: true,
    forProduction: true, mechanism: "copy_to_ram_then_jump",
    bestUse: "large_application_image",
  },
  secure_boot_chain: {
    speed: 6, security: 10, flexibility: 4,
    reliability: 8, bootCost: 5, fieldUpdate: true,
    forProduction: true, mechanism: "rsa_verify_hash_chain",
    bestUse: "payment_terminal_verified",
  },
};

const get = (t: BootMode) => DATA[t];

export const speed = (t: BootMode) => get(t).speed;
export const security = (t: BootMode) => get(t).security;
export const flexibility = (t: BootMode) => get(t).flexibility;
export const reliability = (t: BootMode) => get(t).reliability;
export const bootCost = (t: BootMode) => get(t).bootCost;
export const fieldUpdate = (t: BootMode) => get(t).fieldUpdate;
export const forProduction = (t: BootMode) => get(t).forProduction;
export const mechanism = (t: BootMode) => get(t).mechanism;
export const bestUse = (t: BootMode) => get(t).bestUse;
export const bootModes = (): BootMode[] => Object.keys(DATA) as BootMode[];
