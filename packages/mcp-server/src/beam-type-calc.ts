export type BeamTypeType =
  | "wide_flange_w_shape"
  | "glulam_engineered_wood"
  | "precast_concrete_rect"
  | "castellated_hex_opening"
  | "lvl_laminated_veneer";

interface BeamTypeData {
  span: number;
  moment: number;
  weight: number;
  fireRating: number;
  btCost: number;
  composite: boolean;
  forLongSpan: boolean;
  section: string;
  bestUse: string;
}

const DATA: Record<BeamTypeType, BeamTypeData> = {
  wide_flange_w_shape: {
    span: 8, moment: 9, weight: 5, fireRating: 5, btCost: 6,
    composite: true, forLongSpan: true,
    section: "i_shape_wide_parallel_flange",
    bestUse: "commercial_steel_frame_floor",
  },
  glulam_engineered_wood: {
    span: 7, moment: 7, weight: 7, fireRating: 7, btCost: 7,
    composite: false, forLongSpan: true,
    section: "rectangular_laminated_timber",
    bestUse: "exposed_timber_cathedral_arch",
  },
  precast_concrete_rect: {
    span: 6, moment: 8, weight: 3, fireRating: 10, btCost: 5,
    composite: false, forLongSpan: false,
    section: "rectangular_prestress_strand",
    bestUse: "parking_garage_precast_frame",
  },
  castellated_hex_opening: {
    span: 9, moment: 8, weight: 8, fireRating: 5, btCost: 7,
    composite: true, forLongSpan: true,
    section: "hex_opening_expanded_depth",
    bestUse: "long_span_service_integration",
  },
  lvl_laminated_veneer: {
    span: 5, moment: 6, weight: 7, fireRating: 4, btCost: 4,
    composite: false, forLongSpan: false,
    section: "rectangular_veneer_layup",
    bestUse: "residential_header_beam_pocket",
  },
};

function get(t: BeamTypeType): BeamTypeData {
  return DATA[t];
}

export const span = (t: BeamTypeType) => get(t).span;
export const moment = (t: BeamTypeType) => get(t).moment;
export const weight = (t: BeamTypeType) => get(t).weight;
export const fireRating = (t: BeamTypeType) => get(t).fireRating;
export const btCost = (t: BeamTypeType) => get(t).btCost;
export const composite = (t: BeamTypeType) => get(t).composite;
export const forLongSpan = (t: BeamTypeType) => get(t).forLongSpan;
export const section = (t: BeamTypeType) => get(t).section;
export const bestUse = (t: BeamTypeType) => get(t).bestUse;
export const beamTypeTypes = (): BeamTypeType[] =>
  Object.keys(DATA) as BeamTypeType[];
