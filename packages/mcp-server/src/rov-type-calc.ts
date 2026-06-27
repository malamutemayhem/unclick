export type RovType =
  | "observation_class_mini"
  | "work_class_heavy"
  | "intervention_class_hybrid"
  | "micro_rov_inspection"
  | "autonomous_auv_survey";

const DATA: Record<RovType, {
  depth: number; payload: number; maneuver: number;
  endurance: number; rvCost: number; tethered: boolean;
  forInspection: boolean; propulsion: string; bestUse: string;
}> = {
  observation_class_mini: {
    depth: 6, payload: 3, maneuver: 8,
    endurance: 6, rvCost: 2, tethered: true,
    forInspection: true, propulsion: "electric_thruster_vector",
    bestUse: "pipeline_inspection_dam_survey",
  },
  work_class_heavy: {
    depth: 10, payload: 10, maneuver: 6,
    endurance: 8, rvCost: 5, tethered: true,
    forInspection: false, propulsion: "hydraulic_thruster_heavy",
    bestUse: "subsea_construction_drill_support",
  },
  intervention_class_hybrid: {
    depth: 9, payload: 8, maneuver: 7,
    endurance: 7, rvCost: 5, tethered: true,
    forInspection: false, propulsion: "electric_hydraulic_hybrid",
    bestUse: "subsea_valve_operation_repair",
  },
  micro_rov_inspection: {
    depth: 3, payload: 1, maneuver: 10,
    endurance: 4, rvCost: 1, tethered: true,
    forInspection: true, propulsion: "miniature_electric_jet",
    bestUse: "tank_ballast_confined_space",
  },
  autonomous_auv_survey: {
    depth: 10, payload: 5, maneuver: 5,
    endurance: 10, rvCost: 4, tethered: false,
    forInspection: true, propulsion: "battery_torpedo_form",
    bestUse: "seabed_mapping_multibeam_survey",
  },
};

const get = (t: RovType) => DATA[t];

export const depth = (t: RovType) => get(t).depth;
export const payload = (t: RovType) => get(t).payload;
export const maneuver = (t: RovType) => get(t).maneuver;
export const endurance = (t: RovType) => get(t).endurance;
export const rvCost = (t: RovType) => get(t).rvCost;
export const tethered = (t: RovType) => get(t).tethered;
export const forInspection = (t: RovType) => get(t).forInspection;
export const propulsion = (t: RovType) => get(t).propulsion;
export const bestUse = (t: RovType) => get(t).bestUse;
export const rovTypes = (): RovType[] => Object.keys(DATA) as RovType[];
