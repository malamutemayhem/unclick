export type BeamSplitterType =
  | "plate_dielectric_coated"
  | "cube_cemented_prism"
  | "pellicle_thin_membrane"
  | "fiber_fused_biconical"
  | "polarizing_pbs_cube";

const DATA: Record<BeamSplitterType, {
  transmittance: number; damage: number; wavefront: number;
  bandwidth: number; bsCost: number; polarizing: boolean;
  forLaser: boolean; substrate: string; bestUse: string;
}> = {
  plate_dielectric_coated: {
    transmittance: 8, damage: 7, wavefront: 7,
    bandwidth: 8, bsCost: 2, polarizing: false,
    forLaser: true, substrate: "bk7_glass_flat_plate",
    bestUse: "interferometer_reference_arm",
  },
  cube_cemented_prism: {
    transmittance: 7, damage: 6, wavefront: 9,
    bandwidth: 7, bsCost: 3, polarizing: false,
    forLaser: true, substrate: "cemented_bk7_prism_pair",
    bestUse: "microscope_fluorescence_path",
  },
  pellicle_thin_membrane: {
    transmittance: 9, damage: 3, wavefront: 6,
    bandwidth: 10, bsCost: 4, polarizing: false,
    forLaser: false, substrate: "nitrocellulose_membrane_2um",
    bestUse: "photolithography_reticle_inspect",
  },
  fiber_fused_biconical: {
    transmittance: 8, damage: 5, wavefront: 5,
    bandwidth: 6, bsCost: 3, polarizing: false,
    forLaser: false, substrate: "fused_silica_fiber_taper",
    bestUse: "telecom_optical_power_monitor",
  },
  polarizing_pbs_cube: {
    transmittance: 9, damage: 7, wavefront: 8,
    bandwidth: 5, bsCost: 3, polarizing: true,
    forLaser: true, substrate: "calcite_or_bk7_pbs_coat",
    bestUse: "quantum_optics_entangled_photon",
  },
};

const get = (t: BeamSplitterType) => DATA[t];

export const transmittance = (t: BeamSplitterType) => get(t).transmittance;
export const damage = (t: BeamSplitterType) => get(t).damage;
export const wavefront = (t: BeamSplitterType) => get(t).wavefront;
export const bandwidth = (t: BeamSplitterType) => get(t).bandwidth;
export const bsCost = (t: BeamSplitterType) => get(t).bsCost;
export const polarizing = (t: BeamSplitterType) => get(t).polarizing;
export const forLaser = (t: BeamSplitterType) => get(t).forLaser;
export const substrate = (t: BeamSplitterType) => get(t).substrate;
export const bestUse = (t: BeamSplitterType) => get(t).bestUse;
export const beamSplitterTypes = (): BeamSplitterType[] => Object.keys(DATA) as BeamSplitterType[];
