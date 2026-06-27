export type WireCoaterType =
  | "enamel_coater"
  | "extrusion_coater"
  | "dip_coater"
  | "powder_coater_wire"
  | "uv_cure_coater";

interface WireCoaterData {
  coatUniformity: number;
  throughput: number;
  insulationGrade: number;
  adhesionStrength: number;
  wcCost: number;
  highTemp: boolean;
  forMagnet: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<WireCoaterType, WireCoaterData> = {
  enamel_coater: {
    coatUniformity: 9, throughput: 9, insulationGrade: 10, adhesionStrength: 9, wcCost: 7,
    highTemp: true, forMagnet: true,
    coaterConfig: "enamel_wire_coater_multi_pass_varnish_oven_cure_insulate_layer",
    bestUse: "motor_winding_enamel_wire_coater_magnet_wire_transformer_coil",
  },
  extrusion_coater: {
    coatUniformity: 8, throughput: 10, insulationGrade: 8, adhesionStrength: 8, wcCost: 8,
    highTemp: false, forMagnet: false,
    coaterConfig: "extrusion_wire_coater_crosshead_die_polymer_jacket_continuous",
    bestUse: "power_cable_extrusion_coater_pvc_xlpe_insulation_jacket_line",
  },
  dip_coater: {
    coatUniformity: 6, throughput: 6, insulationGrade: 6, adhesionStrength: 7, wcCost: 4,
    highTemp: false, forMagnet: false,
    coaterConfig: "dip_wire_coater_tank_immerse_drain_cure_simple_batch_coating",
    bestUse: "general_wire_dip_coater_simple_protective_coating_batch_run",
  },
  powder_coater_wire: {
    coatUniformity: 8, throughput: 7, insulationGrade: 8, adhesionStrength: 9, wcCost: 7,
    highTemp: true, forMagnet: false,
    coaterConfig: "powder_coater_wire_fluidized_bed_electrostatic_fuse_coat_thick",
    bestUse: "heavy_wire_powder_coater_thick_insulation_busbar_grounding",
  },
  uv_cure_coater: {
    coatUniformity: 9, throughput: 10, insulationGrade: 7, adhesionStrength: 8, wcCost: 9,
    highTemp: false, forMagnet: false,
    coaterConfig: "uv_cure_wire_coater_liquid_apply_uv_lamp_instant_cure_fast",
    bestUse: "fiber_optic_uv_cure_wire_coater_fast_cure_thin_coat_optical",
  },
};

function get(t: WireCoaterType): WireCoaterData {
  return DATA[t];
}

export const coatUniformity = (t: WireCoaterType) => get(t).coatUniformity;
export const throughput = (t: WireCoaterType) => get(t).throughput;
export const insulationGrade = (t: WireCoaterType) => get(t).insulationGrade;
export const adhesionStrength = (t: WireCoaterType) => get(t).adhesionStrength;
export const wcCost = (t: WireCoaterType) => get(t).wcCost;
export const highTemp = (t: WireCoaterType) => get(t).highTemp;
export const forMagnet = (t: WireCoaterType) => get(t).forMagnet;
export const coaterConfig = (t: WireCoaterType) => get(t).coaterConfig;
export const bestUse = (t: WireCoaterType) => get(t).bestUse;
export const wireCoaterTypes = (): WireCoaterType[] =>
  Object.keys(DATA) as WireCoaterType[];
