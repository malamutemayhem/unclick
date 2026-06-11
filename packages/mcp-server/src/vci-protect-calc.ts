export type VciProtectType =
  | "vci_paper_wrap"
  | "vci_poly_bag_film"
  | "vci_emitter_cup"
  | "vci_foam_cushion"
  | "vci_liquid_spray";

interface VciProtectData {
  coverage: number;
  duration: number;
  easeOfUse: number;
  multiMetal: number;
  vpCost: number;
  reusable: boolean;
  forExport: boolean;
  carrier: string;
  bestUse: string;
}

const DATA: Record<VciProtectType, VciProtectData> = {
  vci_paper_wrap: {
    coverage: 7, duration: 7, easeOfUse: 9, multiMetal: 7, vpCost: 3,
    reusable: false, forExport: true,
    carrier: "kraft_paper_vci_impregnated_sheet",
    bestUse: "machined_part_interleave_wrap",
  },
  vci_poly_bag_film: {
    coverage: 9, duration: 9, easeOfUse: 8, multiMetal: 8, vpCost: 4,
    reusable: false, forExport: true,
    carrier: "polyethylene_film_vci_embedded",
    bestUse: "finished_goods_export_ocean_ship",
  },
  vci_emitter_cup: {
    coverage: 8, duration: 10, easeOfUse: 10, multiMetal: 6, vpCost: 5,
    reusable: false, forExport: false,
    carrier: "slow_release_vci_capsule_sachet",
    bestUse: "electrical_cabinet_toolbox_enclosure",
  },
  vci_foam_cushion: {
    coverage: 7, duration: 8, easeOfUse: 7, multiMetal: 7, vpCost: 6,
    reusable: true, forExport: true,
    carrier: "polyurethane_foam_vci_infused",
    bestUse: "precision_part_cushion_transit_pack",
  },
  vci_liquid_spray: {
    coverage: 10, duration: 6, easeOfUse: 6, multiMetal: 9, vpCost: 5,
    reusable: false, forExport: false,
    carrier: "water_based_vci_spray_concentrate",
    bestUse: "large_machine_weldment_outdoor_store",
  },
};

function get(t: VciProtectType): VciProtectData {
  return DATA[t];
}

export const coverage = (t: VciProtectType) => get(t).coverage;
export const duration = (t: VciProtectType) => get(t).duration;
export const easeOfUse = (t: VciProtectType) => get(t).easeOfUse;
export const multiMetal = (t: VciProtectType) => get(t).multiMetal;
export const vpCost = (t: VciProtectType) => get(t).vpCost;
export const reusable = (t: VciProtectType) => get(t).reusable;
export const forExport = (t: VciProtectType) => get(t).forExport;
export const carrier = (t: VciProtectType) => get(t).carrier;
export const bestUse = (t: VciProtectType) => get(t).bestUse;
export const vciProtectTypes = (): VciProtectType[] =>
  Object.keys(DATA) as VciProtectType[];
