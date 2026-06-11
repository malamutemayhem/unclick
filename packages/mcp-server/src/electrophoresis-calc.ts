export type Electrophoresis =
  | "sds_page_protein"
  | "agarose_gel_dna"
  | "capillary_zone_ce"
  | "two_d_gel_isoelectric"
  | "pulsed_field_pfge";

const DATA: Record<Electrophoresis, {
  resolution: number; speed: number; throughput: number;
  sampleSize: number; epCost: number; automated: boolean;
  forSequencing: boolean; matrix: string; bestUse: string;
}> = {
  sds_page_protein: {
    resolution: 7, speed: 5, throughput: 6,
    sampleSize: 6, epCost: 1, automated: false,
    forSequencing: false, matrix: "polyacrylamide_cross_linked",
    bestUse: "protein_molecular_weight_check",
  },
  agarose_gel_dna: {
    resolution: 5, speed: 6, throughput: 7,
    sampleSize: 7, epCost: 1, automated: false,
    forSequencing: false, matrix: "agarose_polysaccharide_gel",
    bestUse: "pcr_product_restriction_digest",
  },
  capillary_zone_ce: {
    resolution: 9, speed: 9, throughput: 9,
    sampleSize: 10, epCost: 4, automated: true,
    forSequencing: true, matrix: "fused_silica_capillary_buffer",
    bestUse: "sanger_sequencing_fragment_sort",
  },
  two_d_gel_isoelectric: {
    resolution: 10, speed: 2, throughput: 3,
    sampleSize: 4, epCost: 3, automated: false,
    forSequencing: false, matrix: "ipg_strip_then_sds_page",
    bestUse: "proteome_map_biomarker_discover",
  },
  pulsed_field_pfge: {
    resolution: 8, speed: 1, throughput: 4,
    sampleSize: 5, epCost: 3, automated: false,
    forSequencing: false, matrix: "agarose_alternating_field",
    bestUse: "large_dna_chromosome_karyotype",
  },
};

const get = (t: Electrophoresis) => DATA[t];

export const resolution = (t: Electrophoresis) => get(t).resolution;
export const speed = (t: Electrophoresis) => get(t).speed;
export const throughput = (t: Electrophoresis) => get(t).throughput;
export const sampleSize = (t: Electrophoresis) => get(t).sampleSize;
export const epCost = (t: Electrophoresis) => get(t).epCost;
export const automated = (t: Electrophoresis) => get(t).automated;
export const forSequencing = (t: Electrophoresis) => get(t).forSequencing;
export const matrix = (t: Electrophoresis) => get(t).matrix;
export const bestUse = (t: Electrophoresis) => get(t).bestUse;
export const electrophoreses = (): Electrophoresis[] => Object.keys(DATA) as Electrophoresis[];
