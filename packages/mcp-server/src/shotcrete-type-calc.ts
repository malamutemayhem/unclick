export type ShotcreteType =
  | "dry_mix_nozzle_water"
  | "wet_mix_pump_spray"
  | "fiber_reinforced_synthetic"
  | "silica_fume_high_strength"
  | "robotic_spray_automated";

interface ShotcreteData {
  strength: number;
  rebound: number;
  speed: number;
  dustControl: number;
  shCost: number;
  wetProcess: boolean;
  forTunnel: boolean;
  application: string;
  bestUse: string;
}

const DATA: Record<ShotcreteType, ShotcreteData> = {
  dry_mix_nozzle_water: {
    strength: 7, rebound: 4, speed: 6, dustControl: 3, shCost: 4,
    wetProcess: false, forTunnel: true,
    application: "nozzle_add_water_compressed_air",
    bestUse: "repair_overhead_thin_section",
  },
  wet_mix_pump_spray: {
    strength: 8, rebound: 8, speed: 9, dustControl: 8, shCost: 6,
    wetProcess: true, forTunnel: true,
    application: "pump_premixed_accelerator_nozzle",
    bestUse: "tunnel_lining_structural_section",
  },
  fiber_reinforced_synthetic: {
    strength: 9, rebound: 7, speed: 8, dustControl: 7, shCost: 7,
    wetProcess: true, forTunnel: true,
    application: "fiber_dosed_pump_spray_tough",
    bestUse: "slope_stab_crack_control_ductile",
  },
  silica_fume_high_strength: {
    strength: 10, rebound: 7, speed: 7, dustControl: 6, shCost: 8,
    wetProcess: true, forTunnel: true,
    application: "silica_fume_superplast_dense_mix",
    bestUse: "high_perf_marine_chemical_resist",
  },
  robotic_spray_automated: {
    strength: 9, rebound: 9, speed: 10, dustControl: 9, shCost: 10,
    wetProcess: true, forTunnel: true,
    application: "robot_arm_laser_guide_auto_spray",
    bestUse: "tbm_tunnel_rapid_cycle_automated",
  },
};

function get(t: ShotcreteType): ShotcreteData {
  return DATA[t];
}

export const strength = (t: ShotcreteType) => get(t).strength;
export const rebound = (t: ShotcreteType) => get(t).rebound;
export const speed = (t: ShotcreteType) => get(t).speed;
export const dustControl = (t: ShotcreteType) => get(t).dustControl;
export const shCost = (t: ShotcreteType) => get(t).shCost;
export const wetProcess = (t: ShotcreteType) => get(t).wetProcess;
export const forTunnel = (t: ShotcreteType) => get(t).forTunnel;
export const application = (t: ShotcreteType) => get(t).application;
export const bestUse = (t: ShotcreteType) => get(t).bestUse;
export const shotcreteTypes = (): ShotcreteType[] =>
  Object.keys(DATA) as ShotcreteType[];
