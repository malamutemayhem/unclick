export type FlashType =
  | "nor_spi_serial"
  | "nor_parallel_cfi"
  | "nand_slc_raw"
  | "nand_mlc_managed"
  | "emmc_embedded";

const DATA: Record<FlashType, {
  readSpeed: number; writeSpeed: number; endurance: number;
  density: number; flashCost: number; xipCapable: boolean;
  forBoot: boolean; interface_: string; bestUse: string;
}> = {
  nor_spi_serial: {
    readSpeed: 7, writeSpeed: 4, endurance: 9,
    density: 3, flashCost: 6, xipCapable: true,
    forBoot: true, interface_: "quad_spi_qspi",
    bestUse: "firmware_code_storage",
  },
  nor_parallel_cfi: {
    readSpeed: 9, writeSpeed: 5, endurance: 9,
    density: 3, flashCost: 8, xipCapable: true,
    forBoot: true, interface_: "16bit_parallel_bus",
    bestUse: "legacy_telecom_board",
  },
  nand_slc_raw: {
    readSpeed: 8, writeSpeed: 8, endurance: 8,
    density: 7, flashCost: 4, xipCapable: false,
    forBoot: false, interface_: "8bit_onfi_raw",
    bestUse: "industrial_data_logger",
  },
  nand_mlc_managed: {
    readSpeed: 7, writeSpeed: 7, endurance: 5,
    density: 9, flashCost: 2, xipCapable: false,
    forBoot: false, interface_: "sd_mmc_ftl_managed",
    bestUse: "consumer_media_storage",
  },
  emmc_embedded: {
    readSpeed: 8, writeSpeed: 8, endurance: 6,
    density: 10, flashCost: 3, xipCapable: false,
    forBoot: true, interface_: "mmc_bus_bga_package",
    bestUse: "linux_rootfs_embedded",
  },
};

const get = (t: FlashType) => DATA[t];

export const readSpeed = (t: FlashType) => get(t).readSpeed;
export const writeSpeed = (t: FlashType) => get(t).writeSpeed;
export const endurance = (t: FlashType) => get(t).endurance;
export const density = (t: FlashType) => get(t).density;
export const flashCost = (t: FlashType) => get(t).flashCost;
export const xipCapable = (t: FlashType) => get(t).xipCapable;
export const forBoot = (t: FlashType) => get(t).forBoot;
export const interface_ = (t: FlashType) => get(t).interface_;
export const bestUse = (t: FlashType) => get(t).bestUse;
export const flashTypes = (): FlashType[] => Object.keys(DATA) as FlashType[];
