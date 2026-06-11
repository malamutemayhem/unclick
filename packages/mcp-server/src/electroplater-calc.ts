export type ElectroplaterType =
  | "rack_plate"
  | "barrel_plate"
  | "brush_plate"
  | "pulse_plate"
  | "electroless_plate";

interface ElectroplaterData {
  coatUniformity: number;
  throughput: number;
  thickness: number;
  adhesion: number;
  epCost: number;
  selective: boolean;
  forPrecision: boolean;
  platerConfig: string;
  bestUse: string;
}

const DATA: Record<ElectroplaterType, ElectroplaterData> = {
  rack_plate: {
    coatUniformity: 8, throughput: 7, thickness: 8, adhesion: 8, epCost: 6,
    selective: false, forPrecision: false,
    platerConfig: "rack_electroplater_jig_fixture_dc_bath_chrome_nickel_copper",
    bestUse: "automotive_trim_rack_electroplater_chrome_nickel_decorative",
  },
  barrel_plate: {
    coatUniformity: 6, throughput: 9, thickness: 6, adhesion: 7, epCost: 4,
    selective: false, forPrecision: false,
    platerConfig: "barrel_electroplater_tumble_rotate_bulk_small_part_zinc_tin",
    bestUse: "fastener_bulk_barrel_electroplater_tumble_zinc_tin_high_volume",
  },
  brush_plate: {
    coatUniformity: 7, throughput: 3, thickness: 7, adhesion: 7, epCost: 5,
    selective: true, forPrecision: false,
    platerConfig: "brush_electroplater_portable_swab_local_repair_field_touch_up",
    bestUse: "field_repair_brush_electroplater_portable_swab_local_touch_up",
  },
  pulse_plate: {
    coatUniformity: 10, throughput: 6, thickness: 10, adhesion: 10, epCost: 9,
    selective: false, forPrecision: true,
    platerConfig: "pulse_electroplater_periodic_reverse_fine_grain_low_stress",
    bestUse: "pcb_via_pulse_electroplater_periodic_reverse_fine_grain_fill",
  },
  electroless_plate: {
    coatUniformity: 9, throughput: 5, thickness: 7, adhesion: 9, epCost: 7,
    selective: false, forPrecision: true,
    platerConfig: "electroless_plater_chemical_reduce_no_current_uniform_complex",
    bestUse: "complex_shape_electroless_plater_chemical_reduce_uniform_coat",
  },
};

function get(t: ElectroplaterType): ElectroplaterData {
  return DATA[t];
}

export const coatUniformity = (t: ElectroplaterType) => get(t).coatUniformity;
export const throughput = (t: ElectroplaterType) => get(t).throughput;
export const thickness = (t: ElectroplaterType) => get(t).thickness;
export const adhesion = (t: ElectroplaterType) => get(t).adhesion;
export const epCost = (t: ElectroplaterType) => get(t).epCost;
export const selective = (t: ElectroplaterType) => get(t).selective;
export const forPrecision = (t: ElectroplaterType) => get(t).forPrecision;
export const platerConfig = (t: ElectroplaterType) => get(t).platerConfig;
export const bestUse = (t: ElectroplaterType) => get(t).bestUse;
export const electroplaterTypes = (): ElectroplaterType[] =>
  Object.keys(DATA) as ElectroplaterType[];
