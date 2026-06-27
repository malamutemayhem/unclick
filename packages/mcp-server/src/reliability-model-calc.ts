export type ReliabilityModel =
  | "mil_hdbk_217f"
  | "telcordia_sr332"
  | "siemens_sn29500"
  | "fides_physics_based"
  | "iec_62380_rdf";

const DATA: Record<ReliabilityModel, {
  accuracy: number; coverage: number; easeOfUse: number;
  industryAccept: number; rmCost: number; physBased: boolean;
  forMilitary: boolean; approach: string; bestUse: string;
}> = {
  mil_hdbk_217f: {
    accuracy: 5, coverage: 9, easeOfUse: 8,
    industryAccept: 10, rmCost: 2, physBased: false,
    forMilitary: true, approach: "part_count_stress_table",
    bestUse: "defense_contract_bid",
  },
  telcordia_sr332: {
    accuracy: 6, coverage: 8, easeOfUse: 7,
    industryAccept: 9, rmCost: 4, physBased: false,
    forMilitary: false, approach: "field_data_bayesian",
    bestUse: "telecom_network_predict",
  },
  siemens_sn29500: {
    accuracy: 7, coverage: 7, easeOfUse: 7,
    industryAccept: 7, rmCost: 3, physBased: false,
    forMilitary: false, approach: "component_class_lambda",
    bestUse: "automotive_industrial_eu",
  },
  fides_physics_based: {
    accuracy: 9, coverage: 8, easeOfUse: 4,
    industryAccept: 6, rmCost: 6, physBased: true,
    forMilitary: true, approach: "mission_profile_physics",
    bestUse: "avionics_mission_critical",
  },
  iec_62380_rdf: {
    accuracy: 7, coverage: 7, easeOfUse: 6,
    industryAccept: 8, rmCost: 3, physBased: false,
    forMilitary: false, approach: "french_telecom_rdf_table",
    bestUse: "european_telecom_standard",
  },
};

const get = (t: ReliabilityModel) => DATA[t];

export const accuracy = (t: ReliabilityModel) => get(t).accuracy;
export const coverage = (t: ReliabilityModel) => get(t).coverage;
export const easeOfUse = (t: ReliabilityModel) => get(t).easeOfUse;
export const industryAccept = (t: ReliabilityModel) => get(t).industryAccept;
export const rmCost = (t: ReliabilityModel) => get(t).rmCost;
export const physBased = (t: ReliabilityModel) => get(t).physBased;
export const forMilitary = (t: ReliabilityModel) => get(t).forMilitary;
export const approach = (t: ReliabilityModel) => get(t).approach;
export const bestUse = (t: ReliabilityModel) => get(t).bestUse;
export const reliabilityModels = (): ReliabilityModel[] => Object.keys(DATA) as ReliabilityModel[];
