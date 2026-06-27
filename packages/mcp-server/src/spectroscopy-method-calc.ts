export type SpectroscopyMethod = "uv_vis" | "infrared" | "nmr" | "mass_spec" | "raman";

export function molecularDetail(s: SpectroscopyMethod): number {
  const m: Record<SpectroscopyMethod, number> = {
    uv_vis: 4, infrared: 7, nmr: 10, mass_spec: 9, raman: 8,
  };
  return m[s];
}

export function samplePrep(s: SpectroscopyMethod): number {
  const m: Record<SpectroscopyMethod, number> = {
    uv_vis: 3, infrared: 4, nmr: 7, mass_spec: 8, raman: 2,
  };
  return m[s];
}

export function instrumentCost(s: SpectroscopyMethod): number {
  const m: Record<SpectroscopyMethod, number> = {
    uv_vis: 3, infrared: 5, nmr: 10, mass_spec: 9, raman: 7,
  };
  return m[s];
}

export function analysisTime(s: SpectroscopyMethod): number {
  const m: Record<SpectroscopyMethod, number> = {
    uv_vis: 2, infrared: 3, nmr: 8, mass_spec: 6, raman: 4,
  };
  return m[s];
}

export function quantitativeAbility(s: SpectroscopyMethod): number {
  const m: Record<SpectroscopyMethod, number> = {
    uv_vis: 9, infrared: 5, nmr: 8, mass_spec: 10, raman: 6,
  };
  return m[s];
}

export function nonDestructive(s: SpectroscopyMethod): boolean {
  const m: Record<SpectroscopyMethod, boolean> = {
    uv_vis: true, infrared: true, nmr: true, mass_spec: false, raman: true,
  };
  return m[s];
}

export function requiresSolvent(s: SpectroscopyMethod): boolean {
  const m: Record<SpectroscopyMethod, boolean> = {
    uv_vis: true, infrared: false, nmr: true, mass_spec: true, raman: false,
  };
  return m[s];
}

export function principleOfOperation(s: SpectroscopyMethod): string {
  const m: Record<SpectroscopyMethod, string> = {
    uv_vis: "electronic_transition_absorption", infrared: "vibrational_mode_absorption",
    nmr: "nuclear_spin_magnetic_resonance", mass_spec: "ion_mass_charge_ratio",
    raman: "inelastic_photon_scattering",
  };
  return m[s];
}

export function bestApplication(s: SpectroscopyMethod): string {
  const m: Record<SpectroscopyMethod, string> = {
    uv_vis: "concentration_colorimetry", infrared: "functional_group_identification",
    nmr: "molecular_structure_elucidation", mass_spec: "molecular_weight_fragmentation",
    raman: "in_situ_material_characterization",
  };
  return m[s];
}

export function spectroscopyMethods(): SpectroscopyMethod[] {
  return ["uv_vis", "infrared", "nmr", "mass_spec", "raman"];
}
