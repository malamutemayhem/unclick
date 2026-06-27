export type ReramType =
  | "oxide_hfo2"
  | "conductive_bridge"
  | "phase_change_gst"
  | "ferroelectric_hzo"
  | "carbon_nanotube";

const DATA: Record<ReramType, {
  endurance: number; speed: number; retention: number;
  multiLevel: number; reramCost: number; analogCapable: boolean;
  forAiAccel: boolean; mechanism: string; bestUse: string;
}> = {
  oxide_hfo2: {
    endurance: 7, speed: 7, retention: 8,
    multiLevel: 7, reramCost: 5, analogCapable: true,
    forAiAccel: true, mechanism: "filament_form_rupture",
    bestUse: "in_memory_compute",
  },
  conductive_bridge: {
    endurance: 6, speed: 8, retention: 7,
    multiLevel: 8, reramCost: 5, analogCapable: true,
    forAiAccel: true, mechanism: "metal_ion_bridge",
    bestUse: "analog_synaptic_weight",
  },
  phase_change_gst: {
    endurance: 8, speed: 6, retention: 9,
    multiLevel: 9, reramCost: 7, analogCapable: true,
    forAiAccel: false, mechanism: "crystal_amorphous_switch",
    bestUse: "storage_class_memory",
  },
  ferroelectric_hzo: {
    endurance: 9, speed: 9, retention: 8,
    multiLevel: 5, reramCost: 6, analogCapable: false,
    forAiAccel: false, mechanism: "polarization_switch",
    bestUse: "embedded_nvm_mcu",
  },
  carbon_nanotube: {
    endurance: 8, speed: 7, retention: 8,
    multiLevel: 6, reramCost: 8, analogCapable: false,
    forAiAccel: false, mechanism: "cnt_electromechanical",
    bestUse: "rad_hard_space_memory",
  },
};

const get = (t: ReramType) => DATA[t];

export const endurance = (t: ReramType) => get(t).endurance;
export const speed = (t: ReramType) => get(t).speed;
export const retention = (t: ReramType) => get(t).retention;
export const multiLevel = (t: ReramType) => get(t).multiLevel;
export const reramCost = (t: ReramType) => get(t).reramCost;
export const analogCapable = (t: ReramType) => get(t).analogCapable;
export const forAiAccel = (t: ReramType) => get(t).forAiAccel;
export const mechanism = (t: ReramType) => get(t).mechanism;
export const bestUse = (t: ReramType) => get(t).bestUse;
export const reramTypes = (): ReramType[] => Object.keys(DATA) as ReramType[];
