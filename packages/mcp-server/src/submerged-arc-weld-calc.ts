export type SubmergedArcWeldType =
  | "single_wire"
  | "tandem_wire"
  | "multi_wire"
  | "strip_cladding"
  | "narrow_gap";

interface SubmergedArcWeldData {
  deposition: number;
  speed: number;
  penetration: number;
  quality: number;
  sawCost: number;
  automated: boolean;
  forHeavyPlate: boolean;
  flux: string;
  bestUse: string;
}

const DATA: Record<SubmergedArcWeldType, SubmergedArcWeldData> = {
  single_wire: {
    deposition: 7, speed: 7, penetration: 8, quality: 8, sawCost: 5,
    automated: true, forHeavyPlate: true,
    flux: "fused_neutral_flux_basic_slag_general_purpose_structural",
    bestUse: "structural_beam_column_i_beam_fillet_butt_weld_standard",
  },
  tandem_wire: {
    deposition: 9, speed: 9, penetration: 9, quality: 9, sawCost: 7,
    automated: true, forHeavyPlate: true,
    flux: "agglomerated_basic_flux_high_basicity_crack_resistant",
    bestUse: "pipe_mill_longitudinal_spiral_seam_high_speed_production",
  },
  multi_wire: {
    deposition: 10, speed: 10, penetration: 9, quality: 9, sawCost: 9,
    automated: true, forHeavyPlate: true,
    flux: "multi_wire_active_flux_high_deposition_deep_penetration",
    bestUse: "shipyard_panel_line_deck_plate_butt_weld_mass_production",
  },
  strip_cladding: {
    deposition: 8, speed: 6, penetration: 4, quality: 10, sawCost: 8,
    automated: true, forHeavyPlate: false,
    flux: "strip_overlay_flux_low_dilution_corrosion_resistant_clad",
    bestUse: "pressure_vessel_reactor_clad_stainless_overlay_corrosion",
  },
  narrow_gap: {
    deposition: 6, speed: 5, penetration: 10, quality: 9, sawCost: 10,
    automated: true, forHeavyPlate: true,
    flux: "narrow_gap_basic_flux_deep_groove_thick_section_fill",
    bestUse: "nuclear_reactor_vessel_thick_wall_turbine_rotor_heavy_weld",
  },
};

function get(t: SubmergedArcWeldType): SubmergedArcWeldData {
  return DATA[t];
}

export const deposition = (t: SubmergedArcWeldType) => get(t).deposition;
export const speed = (t: SubmergedArcWeldType) => get(t).speed;
export const penetration = (t: SubmergedArcWeldType) => get(t).penetration;
export const quality = (t: SubmergedArcWeldType) => get(t).quality;
export const sawCost = (t: SubmergedArcWeldType) => get(t).sawCost;
export const automated = (t: SubmergedArcWeldType) => get(t).automated;
export const forHeavyPlate = (t: SubmergedArcWeldType) => get(t).forHeavyPlate;
export const flux = (t: SubmergedArcWeldType) => get(t).flux;
export const bestUse = (t: SubmergedArcWeldType) => get(t).bestUse;
export const submergedArcWeldTypes = (): SubmergedArcWeldType[] =>
  Object.keys(DATA) as SubmergedArcWeldType[];
