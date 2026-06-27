export type NandFlash =
  | "slc_single_level"
  | "mlc_multi_level"
  | "tlc_triple_level"
  | "qlc_quad_level"
  | "plc_penta_level";

const DATA: Record<NandFlash, {
  endurance: number; readSpeed: number; writeSpeed: number;
  density: number; flashCost: number; enterpriseGrade: boolean;
  forDatacenter: boolean; cellType: string; bestUse: string;
}> = {
  slc_single_level: {
    endurance: 10, readSpeed: 9, writeSpeed: 10,
    density: 2, flashCost: 10, enterpriseGrade: true,
    forDatacenter: true, cellType: "1bit_per_cell",
    bestUse: "industrial_embedded_boot",
  },
  mlc_multi_level: {
    endurance: 7, readSpeed: 8, writeSpeed: 7,
    density: 5, flashCost: 7, enterpriseGrade: true,
    forDatacenter: true, cellType: "2bit_per_cell",
    bestUse: "enterprise_mixed_workload",
  },
  tlc_triple_level: {
    endurance: 5, readSpeed: 7, writeSpeed: 5,
    density: 7, flashCost: 4, enterpriseGrade: false,
    forDatacenter: true, cellType: "3bit_per_cell",
    bestUse: "consumer_nvme_ssd",
  },
  qlc_quad_level: {
    endurance: 3, readSpeed: 6, writeSpeed: 3,
    density: 9, flashCost: 2, enterpriseGrade: false,
    forDatacenter: false, cellType: "4bit_per_cell",
    bestUse: "read_heavy_cold_storage",
  },
  plc_penta_level: {
    endurance: 2, readSpeed: 5, writeSpeed: 2,
    density: 10, flashCost: 1, enterpriseGrade: false,
    forDatacenter: false, cellType: "5bit_per_cell",
    bestUse: "archive_bulk_capacity",
  },
};

const get = (t: NandFlash) => DATA[t];

export const endurance = (t: NandFlash) => get(t).endurance;
export const readSpeed = (t: NandFlash) => get(t).readSpeed;
export const writeSpeed = (t: NandFlash) => get(t).writeSpeed;
export const density = (t: NandFlash) => get(t).density;
export const flashCost = (t: NandFlash) => get(t).flashCost;
export const enterpriseGrade = (t: NandFlash) => get(t).enterpriseGrade;
export const forDatacenter = (t: NandFlash) => get(t).forDatacenter;
export const cellType = (t: NandFlash) => get(t).cellType;
export const bestUse = (t: NandFlash) => get(t).bestUse;
export const nandFlashes = (): NandFlash[] => Object.keys(DATA) as NandFlash[];
