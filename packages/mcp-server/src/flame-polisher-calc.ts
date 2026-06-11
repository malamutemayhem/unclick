export type FlamePolisherType =
  | "oxy_hydrogen"
  | "oxy_propane"
  | "laser_reflow"
  | "plasma_torch"
  | "acid_polish";

interface FlamePolisherData {
  surfaceFinish: number;
  throughput: number;
  heatControl: number;
  edgeQuality: number;
  fpCost: number;
  contactFree: boolean;
  forOptical: boolean;
  polisherConfig: string;
  bestUse: string;
}

const DATA: Record<FlamePolisherType, FlamePolisherData> = {
  oxy_hydrogen: {
    surfaceFinish: 8, throughput: 7, heatControl: 6, edgeQuality: 8, fpCost: 4,
    contactFree: true, forOptical: true,
    polisherConfig: "oxy_hydrogen_flame_polisher_torch_melt_flow_acrylic_glass_edge",
    bestUse: "acrylic_display_oxy_hydrogen_flame_polisher_torch_clear_edge",
  },
  oxy_propane: {
    surfaceFinish: 7, throughput: 8, heatControl: 5, edgeQuality: 7, fpCost: 3,
    contactFree: true, forOptical: false,
    polisherConfig: "oxy_propane_flame_polisher_broad_flame_glass_edge_fire_finish",
    bestUse: "glass_tube_oxy_propane_flame_polisher_broad_fire_edge_finish",
  },
  laser_reflow: {
    surfaceFinish: 10, throughput: 4, heatControl: 10, edgeQuality: 10, fpCost: 10,
    contactFree: true, forOptical: true,
    polisherConfig: "laser_reflow_polisher_co2_beam_melt_flow_precision_contour",
    bestUse: "micro_optic_laser_reflow_polisher_co2_beam_precision_surface",
  },
  plasma_torch: {
    surfaceFinish: 8, throughput: 6, heatControl: 7, edgeQuality: 8, fpCost: 7,
    contactFree: true, forOptical: false,
    polisherConfig: "plasma_torch_polisher_ionized_gas_stream_quartz_ceramic_smooth",
    bestUse: "quartz_tube_plasma_torch_polisher_ionized_gas_smooth_surface",
  },
  acid_polish: {
    surfaceFinish: 9, throughput: 5, heatControl: 8, edgeQuality: 9, fpCost: 6,
    contactFree: true, forOptical: true,
    polisherConfig: "acid_polish_flame_polisher_hf_vapor_etch_silica_glass_optical",
    bestUse: "optical_fiber_acid_polish_hf_vapor_etch_silica_preform_surface",
  },
};

function get(t: FlamePolisherType): FlamePolisherData {
  return DATA[t];
}

export const surfaceFinish = (t: FlamePolisherType) => get(t).surfaceFinish;
export const throughput = (t: FlamePolisherType) => get(t).throughput;
export const heatControl = (t: FlamePolisherType) => get(t).heatControl;
export const edgeQuality = (t: FlamePolisherType) => get(t).edgeQuality;
export const fpCost = (t: FlamePolisherType) => get(t).fpCost;
export const contactFree = (t: FlamePolisherType) => get(t).contactFree;
export const forOptical = (t: FlamePolisherType) => get(t).forOptical;
export const polisherConfig = (t: FlamePolisherType) => get(t).polisherConfig;
export const bestUse = (t: FlamePolisherType) => get(t).bestUse;
export const flamePolisherTypes = (): FlamePolisherType[] =>
  Object.keys(DATA) as FlamePolisherType[];
