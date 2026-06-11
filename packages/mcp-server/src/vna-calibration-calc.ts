export type VnaCalibration =
  | "solt_mechanical"
  | "trl_thru_reflect"
  | "ecal_electronic"
  | "lrl_line_reflect"
  | "unknown_thru_uosm";

const DATA: Record<VnaCalibration, {
  accuracy: number; speed: number; repeatability: number;
  freqRange: number; calCost: number; automated: boolean;
  forOnWafer: boolean; standards: string; bestUse: string;
}> = {
  solt_mechanical: {
    accuracy: 7, speed: 5, repeatability: 7,
    freqRange: 8, calCost: 3, automated: false,
    forOnWafer: false, standards: "short_open_load_thru",
    bestUse: "coaxial_cable_assembly",
  },
  trl_thru_reflect: {
    accuracy: 9, speed: 6, repeatability: 9,
    freqRange: 7, calCost: 5, automated: false,
    forOnWafer: true, standards: "thru_reflect_line_set",
    bestUse: "waveguide_fixture_deembed",
  },
  ecal_electronic: {
    accuracy: 8, speed: 10, repeatability: 10,
    freqRange: 9, calCost: 8, automated: true,
    forOnWafer: false, standards: "solid_state_impedance_array",
    bestUse: "production_test_throughput",
  },
  lrl_line_reflect: {
    accuracy: 9, speed: 5, repeatability: 8,
    freqRange: 6, calCost: 4, automated: false,
    forOnWafer: true, standards: "line_reflect_line_pair",
    bestUse: "pcb_fixture_extraction",
  },
  unknown_thru_uosm: {
    accuracy: 8, speed: 7, repeatability: 8,
    freqRange: 8, calCost: 6, automated: true,
    forOnWafer: false, standards: "unknown_thru_one_port",
    bestUse: "multiport_balanced_dut",
  },
};

const get = (t: VnaCalibration) => DATA[t];

export const accuracy = (t: VnaCalibration) => get(t).accuracy;
export const speed = (t: VnaCalibration) => get(t).speed;
export const repeatability = (t: VnaCalibration) => get(t).repeatability;
export const freqRange = (t: VnaCalibration) => get(t).freqRange;
export const calCost = (t: VnaCalibration) => get(t).calCost;
export const automated = (t: VnaCalibration) => get(t).automated;
export const forOnWafer = (t: VnaCalibration) => get(t).forOnWafer;
export const standards = (t: VnaCalibration) => get(t).standards;
export const bestUse = (t: VnaCalibration) => get(t).bestUse;
export const vnaCalibrations = (): VnaCalibration[] => Object.keys(DATA) as VnaCalibration[];
