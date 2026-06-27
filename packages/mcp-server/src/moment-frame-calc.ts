export type MomentFrameType =
  | "special_moment_smf"
  | "intermediate_moment_imf"
  | "ordinary_moment_omf"
  | "special_truss_stmf"
  | "concrete_special_smrf";

interface MomentFrameData {
  ductility: number;
  drift: number;
  stiffness: number;
  detailing: number;
  mfCost: number;
  special: boolean;
  forSeismic: boolean;
  connection: string;
  bestUse: string;
}

const DATA: Record<MomentFrameType, MomentFrameData> = {
  special_moment_smf: {
    ductility: 10, drift: 6, stiffness: 7, detailing: 3, mfCost: 9,
    special: true, forSeismic: true,
    connection: "reduced_beam_section_dogbone",
    bestUse: "high_seismic_steel_frame",
  },
  intermediate_moment_imf: {
    ductility: 7, drift: 7, stiffness: 7, detailing: 6, mfCost: 6,
    special: false, forSeismic: true,
    connection: "bolted_flange_plate_stiffened",
    bestUse: "moderate_seismic_mid_rise",
  },
  ordinary_moment_omf: {
    ductility: 4, drift: 8, stiffness: 6, detailing: 9, mfCost: 4,
    special: false, forSeismic: false,
    connection: "simple_welded_flange_bolted_web",
    bestUse: "low_seismic_wind_governed",
  },
  special_truss_stmf: {
    ductility: 9, drift: 5, stiffness: 6, detailing: 4, mfCost: 8,
    special: true, forSeismic: true,
    connection: "special_segment_vierendeel_ductile",
    bestUse: "long_span_seismic_open_plan",
  },
  concrete_special_smrf: {
    ductility: 9, drift: 7, stiffness: 8, detailing: 4, mfCost: 7,
    special: true, forSeismic: true,
    connection: "confined_joint_hooked_bar",
    bestUse: "concrete_high_seismic_ductile",
  },
};

function get(t: MomentFrameType): MomentFrameData {
  return DATA[t];
}

export const ductility = (t: MomentFrameType) => get(t).ductility;
export const drift = (t: MomentFrameType) => get(t).drift;
export const stiffness = (t: MomentFrameType) => get(t).stiffness;
export const detailing = (t: MomentFrameType) => get(t).detailing;
export const mfCost = (t: MomentFrameType) => get(t).mfCost;
export const special = (t: MomentFrameType) => get(t).special;
export const forSeismic = (t: MomentFrameType) => get(t).forSeismic;
export const connection = (t: MomentFrameType) => get(t).connection;
export const bestUse = (t: MomentFrameType) => get(t).bestUse;
export const momentFrameTypes = (): MomentFrameType[] =>
  Object.keys(DATA) as MomentFrameType[];
