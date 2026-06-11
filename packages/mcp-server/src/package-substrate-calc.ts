export type PackageSubstrate =
  | "organic_buildup"
  | "ceramic_htcc"
  | "silicon_interposer"
  | "glass_core"
  | "embedded_bridge";

const DATA: Record<PackageSubstrate, {
  lineSpace: number; layerCount: number; thermal: number;
  electrical: number; subCost: number; finePitch: boolean;
  forHpc: boolean; material: string; bestUse: string;
}> = {
  organic_buildup: {
    lineSpace: 6, layerCount: 8, thermal: 5,
    electrical: 6, subCost: 4, finePitch: false,
    forHpc: false, material: "abf_laminate_core",
    bestUse: "mobile_fcbga",
  },
  ceramic_htcc: {
    lineSpace: 3, layerCount: 6, thermal: 9,
    electrical: 8, subCost: 7, finePitch: false,
    forHpc: false, material: "alumina_cofired",
    bestUse: "military_hermetic",
  },
  silicon_interposer: {
    lineSpace: 10, layerCount: 4, thermal: 7,
    electrical: 9, subCost: 9, finePitch: true,
    forHpc: true, material: "tsv_si_rdl",
    bestUse: "hbm_gpu_2_5d",
  },
  glass_core: {
    lineSpace: 8, layerCount: 7, thermal: 6,
    electrical: 8, subCost: 6, finePitch: true,
    forHpc: true, material: "thin_glass_panel",
    bestUse: "next_gen_chiplet_bridge",
  },
  embedded_bridge: {
    lineSpace: 9, layerCount: 5, thermal: 6,
    electrical: 9, subCost: 8, finePitch: true,
    forHpc: true, material: "si_bridge_in_organic",
    bestUse: "emib_multi_die",
  },
};

const get = (t: PackageSubstrate) => DATA[t];

export const lineSpace = (t: PackageSubstrate) => get(t).lineSpace;
export const layerCount = (t: PackageSubstrate) => get(t).layerCount;
export const thermal = (t: PackageSubstrate) => get(t).thermal;
export const electrical = (t: PackageSubstrate) => get(t).electrical;
export const subCost = (t: PackageSubstrate) => get(t).subCost;
export const finePitch = (t: PackageSubstrate) => get(t).finePitch;
export const forHpc = (t: PackageSubstrate) => get(t).forHpc;
export const material = (t: PackageSubstrate) => get(t).material;
export const bestUse = (t: PackageSubstrate) => get(t).bestUse;
export const packageSubstrates = (): PackageSubstrate[] => Object.keys(DATA) as PackageSubstrate[];
