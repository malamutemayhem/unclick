export type MemsMirror =
  | "tilt_electrostatic"
  | "piston_parallel"
  | "tip_tilt_piston"
  | "dmd_binary_tilt"
  | "resonant_scanning";

const DATA: Record<MemsMirror, {
  deflection: number; speed: number; fillFactor: number;
  resolution: number; mmCost: number; analog: boolean;
  forDisplay: boolean; drive: string; bestUse: string;
}> = {
  tilt_electrostatic: {
    deflection: 7, speed: 8, fillFactor: 8,
    resolution: 7, mmCost: 5, analog: true,
    forDisplay: false, drive: "parallel_plate_torsion",
    bestUse: "optical_crossconnect_wsm",
  },
  piston_parallel: {
    deflection: 5, speed: 9, fillFactor: 9,
    resolution: 8, mmCost: 6, analog: true,
    forDisplay: false, drive: "vertical_comb_actuator",
    bestUse: "adaptive_optics_wavefront",
  },
  tip_tilt_piston: {
    deflection: 8, speed: 7, fillFactor: 7,
    resolution: 9, mmCost: 8, analog: true,
    forDisplay: false, drive: "three_electrode_gimbal",
    bestUse: "beam_steering_lidar",
  },
  dmd_binary_tilt: {
    deflection: 4, speed: 10, fillFactor: 10,
    resolution: 10, mmCost: 7, analog: false,
    forDisplay: true, drive: "bistable_yoke_spring",
    bestUse: "dlp_projector_cinema",
  },
  resonant_scanning: {
    deflection: 10, speed: 10, fillFactor: 3,
    resolution: 5, mmCost: 4, analog: true,
    forDisplay: true, drive: "electromagnetic_resonance",
    bestUse: "laser_pico_projector",
  },
};

const get = (t: MemsMirror) => DATA[t];

export const deflection = (t: MemsMirror) => get(t).deflection;
export const speed = (t: MemsMirror) => get(t).speed;
export const fillFactor = (t: MemsMirror) => get(t).fillFactor;
export const resolution = (t: MemsMirror) => get(t).resolution;
export const mmCost = (t: MemsMirror) => get(t).mmCost;
export const analog = (t: MemsMirror) => get(t).analog;
export const forDisplay = (t: MemsMirror) => get(t).forDisplay;
export const drive = (t: MemsMirror) => get(t).drive;
export const bestUse = (t: MemsMirror) => get(t).bestUse;
export const memsMirrors = (): MemsMirror[] => Object.keys(DATA) as MemsMirror[];
