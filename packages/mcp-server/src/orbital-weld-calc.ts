export type OrbitalWeldType =
  | "enclosed_head"
  | "open_head"
  | "wire_feed"
  | "micro_orbital"
  | "multi_pass_heavy";

interface OrbitalWeldData {
  weldQuality: number;
  speed: number;
  repeatability: number;
  sizeRange: number;
  owCost: number;
  autogenous: boolean;
  forSanitary: boolean;
  head: string;
  bestUse: string;
}

const DATA: Record<OrbitalWeldType, OrbitalWeldData> = {
  enclosed_head: {
    weldQuality: 10, speed: 8, repeatability: 10, sizeRange: 5, owCost: 7,
    autogenous: true, forSanitary: true,
    head: "enclosed_chamber_inert_gas_purge_autogenous_tig_fusion",
    bestUse: "pharmaceutical_biotech_semiconductor_ultra_pure_tube_weld",
  },
  open_head: {
    weldQuality: 8, speed: 7, repeatability: 9, sizeRange: 9, owCost: 6,
    autogenous: true, forSanitary: false,
    head: "open_frame_clamp_rotor_tig_torch_rotate_large_diameter",
    bestUse: "power_plant_boiler_tube_heat_exchanger_pressure_pipe_weld",
  },
  wire_feed: {
    weldQuality: 9, speed: 6, repeatability: 9, sizeRange: 8, owCost: 8,
    autogenous: false, forSanitary: false,
    head: "wire_feed_filler_metal_addition_thick_wall_multi_pass_cap",
    bestUse: "thick_wall_pipe_nuclear_oil_gas_pipeline_structural_weld",
  },
  micro_orbital: {
    weldQuality: 10, speed: 9, repeatability: 10, sizeRange: 3, owCost: 9,
    autogenous: true, forSanitary: true,
    head: "miniature_enclosed_head_fine_tube_1_6mm_precision_fusion",
    bestUse: "medical_device_instrument_tube_sensor_housing_micro_weld",
  },
  multi_pass_heavy: {
    weldQuality: 9, speed: 4, repeatability: 8, sizeRange: 10, owCost: 10,
    autogenous: false, forSanitary: false,
    head: "heavy_duty_open_head_multi_pass_oscillation_fill_cap_root",
    bestUse: "large_bore_pipe_offshore_subsea_pipeline_heavy_wall_weld",
  },
};

function get(t: OrbitalWeldType): OrbitalWeldData {
  return DATA[t];
}

export const weldQuality = (t: OrbitalWeldType) => get(t).weldQuality;
export const speed = (t: OrbitalWeldType) => get(t).speed;
export const repeatability = (t: OrbitalWeldType) => get(t).repeatability;
export const sizeRange = (t: OrbitalWeldType) => get(t).sizeRange;
export const owCost = (t: OrbitalWeldType) => get(t).owCost;
export const autogenous = (t: OrbitalWeldType) => get(t).autogenous;
export const forSanitary = (t: OrbitalWeldType) => get(t).forSanitary;
export const head = (t: OrbitalWeldType) => get(t).head;
export const bestUse = (t: OrbitalWeldType) => get(t).bestUse;
export const orbitalWeldTypes = (): OrbitalWeldType[] =>
  Object.keys(DATA) as OrbitalWeldType[];
