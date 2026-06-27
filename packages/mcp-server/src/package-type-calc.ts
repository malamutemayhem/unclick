export type PackageType =
  | "qfn_leadless"
  | "bga_ball_grid"
  | "fcbga_flip_chip"
  | "wlcsp_wafer_level"
  | "chiplet_2_5d_interposer";

const DATA: Record<PackageType, {
  ioCount: number; thermal: number; electrical: number;
  formFactor: number; pkgCost: number; reworkable: boolean;
  forHpc: boolean; interconnect: string; bestUse: string;
}> = {
  qfn_leadless: {
    ioCount: 3, thermal: 6, electrical: 5,
    formFactor: 8, pkgCost: 2, reworkable: true,
    forHpc: false, interconnect: "leadframe_paddle_exposed",
    bestUse: "microcontroller_general",
  },
  bga_ball_grid: {
    ioCount: 7, thermal: 7, electrical: 7,
    formFactor: 6, pkgCost: 4, reworkable: true,
    forHpc: false, interconnect: "wire_bond_substrate_ball",
    bestUse: "fpga_networking_soc",
  },
  fcbga_flip_chip: {
    ioCount: 9, thermal: 8, electrical: 9,
    formFactor: 5, pkgCost: 7, reworkable: true,
    forHpc: true, interconnect: "c4_bump_underfill",
    bestUse: "server_cpu_gpu",
  },
  wlcsp_wafer_level: {
    ioCount: 4, thermal: 5, electrical: 8,
    formFactor: 10, pkgCost: 3, reworkable: false,
    forHpc: false, interconnect: "rdl_solder_ball_direct",
    bestUse: "mobile_pmic_sensor",
  },
  chiplet_2_5d_interposer: {
    ioCount: 10, thermal: 6, electrical: 10,
    formFactor: 3, pkgCost: 10, reworkable: false,
    forHpc: true, interconnect: "silicon_interposer_microbump",
    bestUse: "ai_accelerator_hbm_stack",
  },
};

const get = (t: PackageType) => DATA[t];

export const ioCount = (t: PackageType) => get(t).ioCount;
export const thermal = (t: PackageType) => get(t).thermal;
export const electrical = (t: PackageType) => get(t).electrical;
export const formFactor = (t: PackageType) => get(t).formFactor;
export const pkgCost = (t: PackageType) => get(t).pkgCost;
export const reworkable = (t: PackageType) => get(t).reworkable;
export const forHpc = (t: PackageType) => get(t).forHpc;
export const interconnect = (t: PackageType) => get(t).interconnect;
export const bestUse = (t: PackageType) => get(t).bestUse;
export const packageTypes = (): PackageType[] => Object.keys(DATA) as PackageType[];
