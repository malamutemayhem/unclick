export type CableTesterType =
  | "basic_continuity_map"
  | "qualification_tester"
  | "certification_fluke"
  | "tone_probe_tracer"
  | "fiber_otdr_tester";

const DATA: Record<CableTesterType, {
  accuracy: number; featureSet: number; portability: number;
  easeOfUse: number; testerCost: number; certifies: boolean;
  forFiber: boolean; testMethod: string; bestUse: string;
}> = {
  basic_continuity_map: { accuracy: 4, featureSet: 3, portability: 10, easeOfUse: 10, testerCost: 2, certifies: false, forFiber: false, testMethod: "wiremap_continuity", bestUse: "quick_patch_cable_check" },
  qualification_tester: { accuracy: 7, featureSet: 7, portability: 8, easeOfUse: 7, testerCost: 5, certifies: false, forFiber: false, testMethod: "freq_bandwidth_test", bestUse: "network_troubleshoot" },
  certification_fluke: { accuracy: 10, featureSet: 10, portability: 5, easeOfUse: 5, testerCost: 10, certifies: true, forFiber: false, testMethod: "full_channel_certify", bestUse: "new_install_warranty" },
  tone_probe_tracer: { accuracy: 3, featureSet: 2, portability: 10, easeOfUse: 9, testerCost: 1, certifies: false, forFiber: false, testMethod: "analog_tone_trace", bestUse: "cable_identification" },
  fiber_otdr_tester: { accuracy: 9, featureSet: 8, portability: 6, easeOfUse: 4, testerCost: 9, certifies: true, forFiber: true, testMethod: "optical_time_domain", bestUse: "fiber_fault_location" },
};

const get = (t: CableTesterType) => DATA[t];

export const accuracy = (t: CableTesterType) => get(t).accuracy;
export const featureSet = (t: CableTesterType) => get(t).featureSet;
export const portability = (t: CableTesterType) => get(t).portability;
export const easeOfUse = (t: CableTesterType) => get(t).easeOfUse;
export const testerCost = (t: CableTesterType) => get(t).testerCost;
export const certifies = (t: CableTesterType) => get(t).certifies;
export const forFiber = (t: CableTesterType) => get(t).forFiber;
export const testMethod = (t: CableTesterType) => get(t).testMethod;
export const bestUse = (t: CableTesterType) => get(t).bestUse;
export const cableTesters = (): CableTesterType[] => Object.keys(DATA) as CableTesterType[];
