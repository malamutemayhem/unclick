export type ShotcretePumpType =
  | "dry_mix_gun"
  | "wet_mix_pump"
  | "rotor_stator"
  | "piston_pump"
  | "robot_sprayer";

interface ShotcretePumpData {
  sprayRate: number;
  reboundControl: number;
  buildThickness: number;
  surfaceFinish: number;
  spCost: number;
  wetProcess: boolean;
  forTunnel: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<ShotcretePumpType, ShotcretePumpData> = {
  dry_mix_gun: {
    sprayRate: 6, reboundControl: 5, buildThickness: 9, surfaceFinish: 5, spCost: 4,
    wetProcess: false, forTunnel: true,
    pumpConfig: "dry_mix_gun_add_water_at_nozzle_manual_spray_thick_build_layer",
    bestUse: "repair_patch_overhead_dry_mix_shotcrete_thick_build_manual_gun",
  },
  wet_mix_pump: {
    sprayRate: 9, reboundControl: 8, buildThickness: 8, surfaceFinish: 8, spCost: 7,
    wetProcess: true, forTunnel: true,
    pumpConfig: "wet_mix_pump_premixed_concrete_air_nozzle_spray_tunnel_lining",
    bestUse: "tunnel_lining_slope_stabilization_wet_mix_shotcrete_pump_spray",
  },
  rotor_stator: {
    sprayRate: 7, reboundControl: 7, buildThickness: 7, surfaceFinish: 7, spCost: 5,
    wetProcess: true, forTunnel: false,
    pumpConfig: "rotor_stator_progressive_cavity_pump_mortar_plaster_spray_coat",
    bestUse: "mortar_plaster_render_spray_coat_rotor_stator_progressive_pump",
  },
  piston_pump: {
    sprayRate: 10, reboundControl: 8, buildThickness: 9, surfaceFinish: 7, spCost: 8,
    wetProcess: true, forTunnel: true,
    pumpConfig: "piston_pump_high_pressure_wet_mix_long_distance_pump_spray_line",
    bestUse: "large_tunnel_dam_pool_piston_pump_high_pressure_long_distance",
  },
  robot_sprayer: {
    sprayRate: 9, reboundControl: 10, buildThickness: 8, surfaceFinish: 10, spCost: 10,
    wetProcess: true, forTunnel: true,
    pumpConfig: "robot_arm_sprayer_automated_nozzle_precise_layer_tunnel_bore",
    bestUse: "tbm_tunnel_automated_robot_arm_shotcrete_precise_spray_pattern",
  },
};

function get(t: ShotcretePumpType): ShotcretePumpData {
  return DATA[t];
}

export const sprayRate = (t: ShotcretePumpType) => get(t).sprayRate;
export const reboundControl = (t: ShotcretePumpType) => get(t).reboundControl;
export const buildThickness = (t: ShotcretePumpType) => get(t).buildThickness;
export const surfaceFinish = (t: ShotcretePumpType) => get(t).surfaceFinish;
export const spCost = (t: ShotcretePumpType) => get(t).spCost;
export const wetProcess = (t: ShotcretePumpType) => get(t).wetProcess;
export const forTunnel = (t: ShotcretePumpType) => get(t).forTunnel;
export const pumpConfig = (t: ShotcretePumpType) => get(t).pumpConfig;
export const bestUse = (t: ShotcretePumpType) => get(t).bestUse;
export const shotcretePumpTypes = (): ShotcretePumpType[] =>
  Object.keys(DATA) as ShotcretePumpType[];
