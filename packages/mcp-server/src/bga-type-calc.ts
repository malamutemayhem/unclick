export type BgaType =
  | "pbga_plastic_laminate"
  | "fcbga_flip_chip"
  | "wlcsp_wafer_level"
  | "cbga_ceramic_column"
  | "pop_package_on_package";

const DATA: Record<BgaType, {
  density: number; thermal: number; reliability: number;
  reworkability: number; bgCost: number; finePitch: boolean;
  forMobile: boolean; substrate: string; bestUse: string;
}> = {
  pbga_plastic_laminate: {
    density: 5, thermal: 5, reliability: 7,
    reworkability: 8, bgCost: 3, finePitch: false,
    forMobile: false, substrate: "bt_resin_laminate",
    bestUse: "networking_asic_mid_range",
  },
  fcbga_flip_chip: {
    density: 9, thermal: 9, reliability: 8,
    reworkability: 6, bgCost: 7, finePitch: true,
    forMobile: false, substrate: "abf_buildup_cored",
    bestUse: "server_cpu_high_io_count",
  },
  wlcsp_wafer_level: {
    density: 10, thermal: 6, reliability: 5,
    reworkability: 4, bgCost: 2, finePitch: true,
    forMobile: true, substrate: "redistributed_wafer_rdl",
    bestUse: "smartphone_pmic_tiny_form",
  },
  cbga_ceramic_column: {
    density: 6, thermal: 10, reliability: 10,
    reworkability: 5, bgCost: 9, finePitch: false,
    forMobile: false, substrate: "htcc_alumina_ceramic",
    bestUse: "mil_aero_harsh_environment",
  },
  pop_package_on_package: {
    density: 8, thermal: 4, reliability: 6,
    reworkability: 3, bgCost: 5, finePitch: true,
    forMobile: true, substrate: "stacked_top_bottom_bga",
    bestUse: "mobile_soc_plus_dram_stack",
  },
};

const get = (t: BgaType) => DATA[t];

export const density = (t: BgaType) => get(t).density;
export const thermal = (t: BgaType) => get(t).thermal;
export const reliability = (t: BgaType) => get(t).reliability;
export const reworkability = (t: BgaType) => get(t).reworkability;
export const bgCost = (t: BgaType) => get(t).bgCost;
export const finePitch = (t: BgaType) => get(t).finePitch;
export const forMobile = (t: BgaType) => get(t).forMobile;
export const substrate = (t: BgaType) => get(t).substrate;
export const bestUse = (t: BgaType) => get(t).bestUse;
export const bgaTypes = (): BgaType[] => Object.keys(DATA) as BgaType[];
