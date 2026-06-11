export type OpticalMicroscopeType =
  | "brightfield_compound"
  | "stereo_dissecting"
  | "fluorescence_epi"
  | "confocal_scanning"
  | "digital_inspection";

interface OpticalMicroscopeData {
  magnification: number;
  resolution: number;
  depthOfField: number;
  contrastModes: number;
  omCost: number;
  motorized: boolean;
  forLiveCell: boolean;
  objective: string;
  bestUse: string;
}

const DATA: Record<OpticalMicroscopeType, OpticalMicroscopeData> = {
  brightfield_compound: {
    magnification: 8, resolution: 7, depthOfField: 4, contrastModes: 8, omCost: 5,
    motorized: false, forLiveCell: false,
    objective: "plan_achromat_4x_10x_40x_100x_oil_immersion_turret_nosepiece",
    bestUse: "histology_pathology_microbiology_routine_lab_slide_viewing",
  },
  stereo_dissecting: {
    magnification: 3, resolution: 4, depthOfField: 10, contrastModes: 3, omCost: 4,
    motorized: false, forLiveCell: false,
    objective: "common_main_objective_zoom_0_7x_4_5x_long_working_distance",
    bestUse: "dissection_soldering_quality_inspection_entomology_fossil",
  },
  fluorescence_epi: {
    magnification: 8, resolution: 8, depthOfField: 4, contrastModes: 9, omCost: 8,
    motorized: true, forLiveCell: true,
    objective: "plan_fluorite_uv_corrected_high_na_multiband_filter_cube",
    bestUse: "cell_biology_immunofluorescence_fish_gfp_live_dead_assay",
  },
  confocal_scanning: {
    magnification: 9, resolution: 10, depthOfField: 8, contrastModes: 7, omCost: 10,
    motorized: true, forLiveCell: true,
    objective: "plan_apochromat_high_na_oil_water_silicone_immersion_laser",
    bestUse: "3d_z_stack_optical_section_thick_tissue_neuroscience_colocal",
  },
  digital_inspection: {
    magnification: 6, resolution: 6, depthOfField: 9, contrastModes: 5, omCost: 6,
    motorized: true, forLiveCell: false,
    objective: "telecentric_zoom_lens_coaxial_led_ring_light_cmos_camera",
    bestUse: "pcb_inspection_semiconductor_die_measurement_quality_check",
  },
};

function get(t: OpticalMicroscopeType): OpticalMicroscopeData {
  return DATA[t];
}

export const magnification = (t: OpticalMicroscopeType) => get(t).magnification;
export const resolution = (t: OpticalMicroscopeType) => get(t).resolution;
export const depthOfField = (t: OpticalMicroscopeType) => get(t).depthOfField;
export const contrastModes = (t: OpticalMicroscopeType) => get(t).contrastModes;
export const omCost = (t: OpticalMicroscopeType) => get(t).omCost;
export const motorized = (t: OpticalMicroscopeType) => get(t).motorized;
export const forLiveCell = (t: OpticalMicroscopeType) => get(t).forLiveCell;
export const objective = (t: OpticalMicroscopeType) => get(t).objective;
export const bestUse = (t: OpticalMicroscopeType) => get(t).bestUse;
export const opticalMicroscopeTypes = (): OpticalMicroscopeType[] =>
  Object.keys(DATA) as OpticalMicroscopeType[];
