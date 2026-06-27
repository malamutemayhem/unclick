export type PervaporationMemType =
  | "polymeric_hydrophilic"
  | "polymeric_hydrophobic"
  | "ceramic_zeolite_naa"
  | "mixed_matrix_composite"
  | "silica_microporous";

interface PervaporationMemData {
  selectivity: number;
  flux: number;
  thermalStability: number;
  chemResist: number;
  pvCost: number;
  hydrophilic: boolean;
  forDehydration: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<PervaporationMemType, PervaporationMemData> = {
  polymeric_hydrophilic: {
    selectivity: 7, flux: 8, thermalStability: 5, chemResist: 5, pvCost: 4,
    hydrophilic: true, forDehydration: true,
    material: "pva_crosslinked_or_polyimide_thin_film",
    bestUse: "ethanol_dehydration_isopropanol_drying",
  },
  polymeric_hydrophobic: {
    selectivity: 6, flux: 7, thermalStability: 5, chemResist: 6, pvCost: 5,
    hydrophilic: false, forDehydration: false,
    material: "pdms_silicone_rubber_organophilic_layer",
    bestUse: "voc_removal_from_water_aroma_recovery",
  },
  ceramic_zeolite_naa: {
    selectivity: 10, flux: 6, thermalStability: 10, chemResist: 9, pvCost: 9,
    hydrophilic: true, forDehydration: true,
    material: "naa_zeolite_on_alumina_support_crystal",
    bestUse: "solvent_dehydration_high_temp_acid_resist",
  },
  mixed_matrix_composite: {
    selectivity: 8, flux: 9, thermalStability: 7, chemResist: 7, pvCost: 7,
    hydrophilic: true, forDehydration: true,
    material: "polymer_matrix_with_inorganic_filler_mof",
    bestUse: "biofuel_dehydration_enhanced_selectivity",
  },
  silica_microporous: {
    selectivity: 9, flux: 7, thermalStability: 9, chemResist: 8, pvCost: 8,
    hydrophilic: true, forDehydration: true,
    material: "amorphous_silica_on_ceramic_support_sub_nm",
    bestUse: "high_temp_solvent_recovery_acid_dehydration",
  },
};

function get(t: PervaporationMemType): PervaporationMemData {
  return DATA[t];
}

export const selectivity = (t: PervaporationMemType) => get(t).selectivity;
export const flux = (t: PervaporationMemType) => get(t).flux;
export const thermalStability = (t: PervaporationMemType) => get(t).thermalStability;
export const chemResist = (t: PervaporationMemType) => get(t).chemResist;
export const pvCost = (t: PervaporationMemType) => get(t).pvCost;
export const hydrophilic = (t: PervaporationMemType) => get(t).hydrophilic;
export const forDehydration = (t: PervaporationMemType) => get(t).forDehydration;
export const material = (t: PervaporationMemType) => get(t).material;
export const bestUse = (t: PervaporationMemType) => get(t).bestUse;
export const pervaporationMemTypes = (): PervaporationMemType[] =>
  Object.keys(DATA) as PervaporationMemType[];
