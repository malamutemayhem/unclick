export type BarrelTumblerType =
  | "rotary_barrel"
  | "tilting_barrel"
  | "oblique_barrel"
  | "compartment_barrel"
  | "submerged_barrel";

interface BarrelTumblerData {
  finishConsistency: number;
  throughput: number;
  loadCapacity: number;
  cuttingAction: number;
  btCost: number;
  wetProcess: boolean;
  forBulkSmall: boolean;
  tumblerConfig: string;
  bestUse: string;
}

const DATA: Record<BarrelTumblerType, BarrelTumblerData> = {
  rotary_barrel: {
    finishConsistency: 7, throughput: 7, loadCapacity: 8, cuttingAction: 6, btCost: 3,
    wetProcess: true, forBulkSmall: true,
    tumblerConfig: "rotary_barrel_tumbler_horizontal_rotate_media_slide_deburr_polish",
    bestUse: "fastener_rotary_barrel_tumbler_bulk_deburr_radius_edge_simple",
  },
  tilting_barrel: {
    finishConsistency: 7, throughput: 8, loadCapacity: 8, cuttingAction: 6, btCost: 4,
    wetProcess: true, forBulkSmall: true,
    tumblerConfig: "tilting_barrel_tumbler_tilt_discharge_easy_unload_no_shoveling",
    bestUse: "stamped_part_tilting_barrel_tumbler_easy_unload_tilt_discharge",
  },
  oblique_barrel: {
    finishConsistency: 8, throughput: 7, loadCapacity: 7, cuttingAction: 7, btCost: 5,
    wetProcess: true, forBulkSmall: true,
    tumblerConfig: "oblique_barrel_tumbler_angled_axis_cascade_action_gentle_finish",
    bestUse: "die_cast_oblique_barrel_tumbler_cascade_action_uniform_edge_break",
  },
  compartment_barrel: {
    finishConsistency: 9, throughput: 6, loadCapacity: 5, cuttingAction: 8, btCost: 7,
    wetProcess: true, forBulkSmall: false,
    tumblerConfig: "compartment_barrel_tumbler_divided_chamber_separate_part_batch",
    bestUse: "precision_gear_compartment_barrel_tumbler_separate_batch_no_nesting",
  },
  submerged_barrel: {
    finishConsistency: 9, throughput: 6, loadCapacity: 6, cuttingAction: 5, btCost: 6,
    wetProcess: true, forBulkSmall: true,
    tumblerConfig: "submerged_barrel_tumbler_compound_bath_chemical_assist_bright_finish",
    bestUse: "brass_fitting_submerged_barrel_tumbler_chemical_bright_finish_clean",
  },
};

function get(t: BarrelTumblerType): BarrelTumblerData {
  return DATA[t];
}

export const finishConsistency = (t: BarrelTumblerType) => get(t).finishConsistency;
export const throughput = (t: BarrelTumblerType) => get(t).throughput;
export const loadCapacity = (t: BarrelTumblerType) => get(t).loadCapacity;
export const cuttingAction = (t: BarrelTumblerType) => get(t).cuttingAction;
export const btCost = (t: BarrelTumblerType) => get(t).btCost;
export const wetProcess = (t: BarrelTumblerType) => get(t).wetProcess;
export const forBulkSmall = (t: BarrelTumblerType) => get(t).forBulkSmall;
export const tumblerConfig = (t: BarrelTumblerType) => get(t).tumblerConfig;
export const bestUse = (t: BarrelTumblerType) => get(t).bestUse;
export const barrelTumblerTypes = (): BarrelTumblerType[] =>
  Object.keys(DATA) as BarrelTumblerType[];
