export type GeosyntheticLinerType =
  | "hdpe_smooth_high_density"
  | "lldpe_flexible_textured"
  | "pvc_plasticized_flexible"
  | "epdm_rubber_membrane"
  | "geoComposite_clay_gcl";

interface GeosyntheticLinerData {
  chemResist: number;
  flexibility: number;
  puncture: number;
  uvResist: number;
  glCost: number;
  weldable: boolean;
  forLandfill: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<GeosyntheticLinerType, GeosyntheticLinerData> = {
  hdpe_smooth_high_density: {
    chemResist: 10, flexibility: 4, puncture: 7, uvResist: 8, glCost: 5,
    weldable: true, forLandfill: true,
    material: "high_density_polyethylene_smooth",
    bestUse: "landfill_primary_liner_leachate_pond",
  },
  lldpe_flexible_textured: {
    chemResist: 8, flexibility: 8, puncture: 8, uvResist: 7, glCost: 5,
    weldable: true, forLandfill: true,
    material: "linear_low_density_pe_textured",
    bestUse: "heap_leach_pad_slope_liner_flexible",
  },
  pvc_plasticized_flexible: {
    chemResist: 6, flexibility: 9, puncture: 6, uvResist: 4, glCost: 4,
    weldable: true, forLandfill: false,
    material: "plasticized_polyvinyl_chloride",
    bestUse: "decorative_pond_tunnel_waterproof",
  },
  epdm_rubber_membrane: {
    chemResist: 7, flexibility: 10, puncture: 7, uvResist: 9, glCost: 7,
    weldable: false, forLandfill: false,
    material: "ethylene_propylene_diene_rubber",
    bestUse: "exposed_reservoir_canal_uv_resistant",
  },
  geoComposite_clay_gcl: {
    chemResist: 5, flexibility: 6, puncture: 4, uvResist: 3, glCost: 6,
    weldable: false, forLandfill: true,
    material: "bentonite_clay_geotextile_sandwich",
    bestUse: "landfill_cap_secondary_barrier_low_k",
  },
};

function get(t: GeosyntheticLinerType): GeosyntheticLinerData {
  return DATA[t];
}

export const chemResist = (t: GeosyntheticLinerType) => get(t).chemResist;
export const flexibility = (t: GeosyntheticLinerType) => get(t).flexibility;
export const puncture = (t: GeosyntheticLinerType) => get(t).puncture;
export const uvResist = (t: GeosyntheticLinerType) => get(t).uvResist;
export const glCost = (t: GeosyntheticLinerType) => get(t).glCost;
export const weldable = (t: GeosyntheticLinerType) => get(t).weldable;
export const forLandfill = (t: GeosyntheticLinerType) => get(t).forLandfill;
export const material = (t: GeosyntheticLinerType) => get(t).material;
export const bestUse = (t: GeosyntheticLinerType) => get(t).bestUse;
export const geosyntheticLinerTypes = (): GeosyntheticLinerType[] =>
  Object.keys(DATA) as GeosyntheticLinerType[];
