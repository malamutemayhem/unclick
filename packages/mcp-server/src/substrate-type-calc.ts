export type SubstrateType =
  | "organic_buildup"
  | "ceramic_htcc"
  | "ceramic_ltcc"
  | "silicon_interposer"
  | "glass_core";

const DATA: Record<SubstrateType, {
  density: number; thermal: number; electrical: number;
  flatness: number; subCost: number; embeddedPassive: boolean;
  forRf: boolean; dielectric: string; bestUse: string;
}> = {
  organic_buildup: {
    density: 7, thermal: 5, electrical: 6,
    flatness: 6, subCost: 3, embeddedPassive: false,
    forRf: false, dielectric: "abf_resin_glass_fiber",
    bestUse: "standard_fcbga_substrate",
  },
  ceramic_htcc: {
    density: 5, thermal: 9, electrical: 8,
    flatness: 8, subCost: 7, embeddedPassive: true,
    forRf: true, dielectric: "alumina_co_fired_high",
    bestUse: "military_hermetic_package",
  },
  ceramic_ltcc: {
    density: 6, thermal: 8, electrical: 9,
    flatness: 7, subCost: 6, embeddedPassive: true,
    forRf: true, dielectric: "glass_ceramic_low_temp",
    bestUse: "rf_module_integrated",
  },
  silicon_interposer: {
    density: 10, thermal: 7, electrical: 10,
    flatness: 10, subCost: 10, embeddedPassive: false,
    forRf: false, dielectric: "tsv_silicon_oxide_rdl",
    bestUse: "hbm_logic_2_5d_stack",
  },
  glass_core: {
    density: 9, thermal: 6, electrical: 9,
    flatness: 9, subCost: 7, embeddedPassive: true,
    forRf: true, dielectric: "thin_glass_panel_rdl",
    bestUse: "next_gen_advanced_package",
  },
};

const get = (t: SubstrateType) => DATA[t];

export const density = (t: SubstrateType) => get(t).density;
export const thermal = (t: SubstrateType) => get(t).thermal;
export const electrical = (t: SubstrateType) => get(t).electrical;
export const flatness = (t: SubstrateType) => get(t).flatness;
export const subCost = (t: SubstrateType) => get(t).subCost;
export const embeddedPassive = (t: SubstrateType) => get(t).embeddedPassive;
export const forRf = (t: SubstrateType) => get(t).forRf;
export const dielectric = (t: SubstrateType) => get(t).dielectric;
export const bestUse = (t: SubstrateType) => get(t).bestUse;
export const substrateTypes = (): SubstrateType[] => Object.keys(DATA) as SubstrateType[];
