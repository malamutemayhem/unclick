export type TimberType =
  | "sawn_softwood_spf"
  | "glulam_beam_laminated"
  | "clt_cross_laminated"
  | "lvl_laminated_veneer"
  | "hardwood_oak_structural";

const DATA: Record<TimberType, {
  strength: number; span: number; fireResist: number;
  sustainability: number; tmCost: number; engineered: boolean;
  forMassTimber: boolean; species: string; bestUse: string;
}> = {
  sawn_softwood_spf: {
    strength: 4, span: 3, fireResist: 3,
    sustainability: 8, tmCost: 1, engineered: false,
    forMassTimber: false, species: "spruce_pine_fir_grade",
    bestUse: "residential_wall_framing_stud",
  },
  glulam_beam_laminated: {
    strength: 8, span: 9, fireResist: 7,
    sustainability: 9, tmCost: 3, engineered: true,
    forMassTimber: true, species: "douglas_fir_larch_lam",
    bestUse: "long_span_beam_arch_gym",
  },
  clt_cross_laminated: {
    strength: 7, span: 7, fireResist: 8,
    sustainability: 10, tmCost: 4, engineered: true,
    forMassTimber: true, species: "spruce_cross_layer_panel",
    bestUse: "mass_timber_high_rise_floor",
  },
  lvl_laminated_veneer: {
    strength: 9, span: 8, fireResist: 5,
    sustainability: 7, tmCost: 3, engineered: true,
    forMassTimber: false, species: "radiata_pine_veneer_stack",
    bestUse: "header_beam_portal_frame",
  },
  hardwood_oak_structural: {
    strength: 6, span: 4, fireResist: 6,
    sustainability: 5, tmCost: 5, engineered: false,
    forMassTimber: false, species: "white_oak_quarter_sawn",
    bestUse: "heritage_restoration_exposed_post",
  },
};

const get = (t: TimberType) => DATA[t];

export const strength = (t: TimberType) => get(t).strength;
export const span = (t: TimberType) => get(t).span;
export const fireResist = (t: TimberType) => get(t).fireResist;
export const sustainability = (t: TimberType) => get(t).sustainability;
export const tmCost = (t: TimberType) => get(t).tmCost;
export const engineered = (t: TimberType) => get(t).engineered;
export const forMassTimber = (t: TimberType) => get(t).forMassTimber;
export const species = (t: TimberType) => get(t).species;
export const bestUse = (t: TimberType) => get(t).bestUse;
export const timberTypes = (): TimberType[] => Object.keys(DATA) as TimberType[];
