export type Lithography =
  | "duv_193nm_immersion"
  | "euv_13_5nm"
  | "ebeam_direct_write"
  | "nanoimprint_nil"
  | "dsa_directed_self";

const DATA: Record<Lithography, {
  resolution: number; throughput: number; overlay: number;
  defectivity: number; liCost: number; maskless: boolean;
  forHvm: boolean; source: string; bestUse: string;
}> = {
  duv_193nm_immersion: {
    resolution: 7, throughput: 10, overlay: 9,
    defectivity: 9, liCost: 6, maskless: false,
    forHvm: true, source: "arf_excimer_water_immerse",
    bestUse: "mature_node_28nm_logic",
  },
  euv_13_5nm: {
    resolution: 10, throughput: 7, overlay: 10,
    defectivity: 7, liCost: 10, maskless: false,
    forHvm: true, source: "tin_droplet_plasma_euv",
    bestUse: "leading_edge_sub_5nm_gate",
  },
  ebeam_direct_write: {
    resolution: 9, throughput: 1, overlay: 8,
    defectivity: 10, liCost: 7, maskless: true,
    forHvm: false, source: "shaped_electron_beam_column",
    bestUse: "photomask_reticle_write",
  },
  nanoimprint_nil: {
    resolution: 8, throughput: 6, overlay: 5,
    defectivity: 4, liCost: 3, maskless: false,
    forHvm: false, source: "template_uv_cure_resin",
    bestUse: "nand_flash_high_layer_count",
  },
  dsa_directed_self: {
    resolution: 10, throughput: 8, overlay: 4,
    defectivity: 3, liCost: 4, maskless: false,
    forHvm: false, source: "block_copolymer_anneal",
    bestUse: "contact_hole_pitch_multiply",
  },
};

const get = (t: Lithography) => DATA[t];

export const resolution = (t: Lithography) => get(t).resolution;
export const throughput = (t: Lithography) => get(t).throughput;
export const overlay = (t: Lithography) => get(t).overlay;
export const defectivity = (t: Lithography) => get(t).defectivity;
export const liCost = (t: Lithography) => get(t).liCost;
export const maskless = (t: Lithography) => get(t).maskless;
export const forHvm = (t: Lithography) => get(t).forHvm;
export const source = (t: Lithography) => get(t).source;
export const bestUse = (t: Lithography) => get(t).bestUse;
export const lithographies = (): Lithography[] => Object.keys(DATA) as Lithography[];
