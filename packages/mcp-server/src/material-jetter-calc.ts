export type MaterialJetterType =
  | "polyjet_multi"
  | "nanoparticle_jet"
  | "wax_jet"
  | "drop_on_demand"
  | "continuous_inkjet";

interface MaterialJetterData {
  resolution: number;
  throughput: number;
  materialRange: number;
  surfaceFinish: number;
  mjCost: number;
  multiMaterial: boolean;
  forPrototype: boolean;
  jetterConfig: string;
  bestUse: string;
}

const DATA: Record<MaterialJetterType, MaterialJetterData> = {
  polyjet_multi: {
    resolution: 9, throughput: 6, materialRange: 9, surfaceFinish: 9, mjCost: 8,
    multiMaterial: true, forPrototype: true,
    jetterConfig: "polyjet_multi_material_jetter_uv_cure_multi_head_color_shore",
    bestUse: "overmold_proto_polyjet_multi_material_jetter_rigid_rubber_color",
  },
  nanoparticle_jet: {
    resolution: 9, throughput: 4, materialRange: 6, surfaceFinish: 8, mjCost: 9,
    multiMaterial: false, forPrototype: false,
    jetterConfig: "nanoparticle_material_jetter_metal_ink_sinter_dense_part_fine",
    bestUse: "electronic_trace_nanoparticle_material_jetter_silver_ink_sinter",
  },
  wax_jet: {
    resolution: 8, throughput: 7, materialRange: 3, surfaceFinish: 8, mjCost: 6,
    multiMaterial: false, forPrototype: false,
    jetterConfig: "wax_jet_material_jetter_build_support_wax_melt_out_cast_pattern",
    bestUse: "investment_pattern_wax_jet_material_jetter_burnout_cast_jewelry",
  },
  drop_on_demand: {
    resolution: 7, throughput: 7, materialRange: 7, surfaceFinish: 7, mjCost: 6,
    multiMaterial: true, forPrototype: true,
    jetterConfig: "drop_on_demand_material_jetter_piezo_actuate_droplet_place_cure",
    bestUse: "concept_model_drop_on_demand_material_jetter_fast_visual_check",
  },
  continuous_inkjet: {
    resolution: 6, throughput: 9, materialRange: 5, surfaceFinish: 6, mjCost: 5,
    multiMaterial: false, forPrototype: false,
    jetterConfig: "continuous_inkjet_material_jetter_stream_deflect_mark_code_fast",
    bestUse: "marking_code_continuous_inkjet_material_jetter_fast_line_print",
  },
};

function get(t: MaterialJetterType): MaterialJetterData {
  return DATA[t];
}

export const resolution = (t: MaterialJetterType) => get(t).resolution;
export const throughput = (t: MaterialJetterType) => get(t).throughput;
export const materialRange = (t: MaterialJetterType) => get(t).materialRange;
export const surfaceFinish = (t: MaterialJetterType) => get(t).surfaceFinish;
export const mjCost = (t: MaterialJetterType) => get(t).mjCost;
export const multiMaterial = (t: MaterialJetterType) => get(t).multiMaterial;
export const forPrototype = (t: MaterialJetterType) => get(t).forPrototype;
export const jetterConfig = (t: MaterialJetterType) => get(t).jetterConfig;
export const bestUse = (t: MaterialJetterType) => get(t).bestUse;
export const materialJetterTypes = (): MaterialJetterType[] =>
  Object.keys(DATA) as MaterialJetterType[];
