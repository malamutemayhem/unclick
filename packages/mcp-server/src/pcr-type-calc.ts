export type PcrType =
  | "conventional_endpoint"
  | "realtime_qpcr_probe"
  | "digital_droplet_ddpcr"
  | "reverse_transcriptase_rt"
  | "isothermal_lamp_loop";

const DATA: Record<PcrType, {
  sensitivity: number; quantification: number; speed: number;
  multiplexing: number; pcCost: number; absolute: boolean;
  forDiagnostic: boolean; detection: string; bestUse: string;
}> = {
  conventional_endpoint: {
    sensitivity: 5, quantification: 2, speed: 4,
    multiplexing: 3, pcCost: 1, absolute: false,
    forDiagnostic: false, detection: "gel_electrophoresis_ethidium",
    bestUse: "cloning_insert_verification",
  },
  realtime_qpcr_probe: {
    sensitivity: 8, quantification: 9, speed: 7,
    multiplexing: 8, pcCost: 3, absolute: false,
    forDiagnostic: true, detection: "taqman_probe_fluorescence",
    bestUse: "viral_load_gene_expression",
  },
  digital_droplet_ddpcr: {
    sensitivity: 10, quantification: 10, speed: 5,
    multiplexing: 6, pcCost: 5, absolute: true,
    forDiagnostic: true, detection: "partition_droplet_poisson",
    bestUse: "rare_mutation_liquid_biopsy",
  },
  reverse_transcriptase_rt: {
    sensitivity: 7, quantification: 7, speed: 6,
    multiplexing: 5, pcCost: 2, absolute: false,
    forDiagnostic: true, detection: "sybr_green_melt_curve",
    bestUse: "rna_virus_detection_covid_flu",
  },
  isothermal_lamp_loop: {
    sensitivity: 6, quantification: 4, speed: 10,
    multiplexing: 2, pcCost: 1, absolute: false,
    forDiagnostic: true, detection: "turbidity_or_calcein_visual",
    bestUse: "point_of_care_field_rapid_test",
  },
};

const get = (t: PcrType) => DATA[t];

export const sensitivity = (t: PcrType) => get(t).sensitivity;
export const quantification = (t: PcrType) => get(t).quantification;
export const speed = (t: PcrType) => get(t).speed;
export const multiplexing = (t: PcrType) => get(t).multiplexing;
export const pcCost = (t: PcrType) => get(t).pcCost;
export const absolute = (t: PcrType) => get(t).absolute;
export const forDiagnostic = (t: PcrType) => get(t).forDiagnostic;
export const detection = (t: PcrType) => get(t).detection;
export const bestUse = (t: PcrType) => get(t).bestUse;
export const pcrTypes = (): PcrType[] => Object.keys(DATA) as PcrType[];
