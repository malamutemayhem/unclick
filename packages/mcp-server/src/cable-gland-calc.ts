export type CableGlandType =
  | "nylon_metric_standard"
  | "brass_nickel_plated"
  | "stainless_marine_grade"
  | "emt_strain_relief"
  | "explosion_proof_exd";

const DATA: Record<CableGlandType, {
  sealRating: number; cableRange: number; pulloutResist: number;
  corrosionResist: number; glandCost: number; metalBody: boolean;
  forHazardous: boolean; threadType: string; bestUse: string;
}> = {
  nylon_metric_standard: { sealRating: 6, cableRange: 7, pulloutResist: 5, corrosionResist: 7, glandCost: 1, metalBody: false, forHazardous: false, threadType: "metric_pg_thread", bestUse: "indoor_panel_entry" },
  brass_nickel_plated: { sealRating: 8, cableRange: 8, pulloutResist: 8, corrosionResist: 7, glandCost: 4, metalBody: true, forHazardous: false, threadType: "metric_iso_thread", bestUse: "industrial_enclosure" },
  stainless_marine_grade: { sealRating: 9, cableRange: 7, pulloutResist: 9, corrosionResist: 10, glandCost: 8, metalBody: true, forHazardous: false, threadType: "npt_pipe_thread", bestUse: "offshore_marine_cable" },
  emt_strain_relief: { sealRating: 4, cableRange: 6, pulloutResist: 7, corrosionResist: 5, glandCost: 2, metalBody: true, forHazardous: false, threadType: "conduit_connector_emt", bestUse: "conduit_box_entry" },
  explosion_proof_exd: { sealRating: 10, cableRange: 6, pulloutResist: 10, corrosionResist: 9, glandCost: 10, metalBody: true, forHazardous: true, threadType: "flameproof_barrier_thread", bestUse: "atex_zone_cable_entry" },
};

const get = (t: CableGlandType) => DATA[t];

export const sealRating = (t: CableGlandType) => get(t).sealRating;
export const cableRange = (t: CableGlandType) => get(t).cableRange;
export const pulloutResist = (t: CableGlandType) => get(t).pulloutResist;
export const corrosionResist = (t: CableGlandType) => get(t).corrosionResist;
export const glandCost = (t: CableGlandType) => get(t).glandCost;
export const metalBody = (t: CableGlandType) => get(t).metalBody;
export const forHazardous = (t: CableGlandType) => get(t).forHazardous;
export const threadType = (t: CableGlandType) => get(t).threadType;
export const bestUse = (t: CableGlandType) => get(t).bestUse;
export const cableGlands = (): CableGlandType[] => Object.keys(DATA) as CableGlandType[];
