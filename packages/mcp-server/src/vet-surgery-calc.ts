export type VetSurgery = "orthopedic" | "soft_tissue" | "ophthalmic" | "dental_oral" | "neurosurgery";

export function technicalDifficulty(v: VetSurgery): number {
  const m: Record<VetSurgery, number> = {
    orthopedic: 8, soft_tissue: 5, ophthalmic: 9, dental_oral: 6, neurosurgery: 10,
  };
  return m[v];
}

export function recoveryTime(v: VetSurgery): number {
  const m: Record<VetSurgery, number> = {
    orthopedic: 9, soft_tissue: 5, ophthalmic: 4, dental_oral: 3, neurosurgery: 10,
  };
  return m[v];
}

export function surgicalDuration(v: VetSurgery): number {
  const m: Record<VetSurgery, number> = {
    orthopedic: 8, soft_tissue: 5, ophthalmic: 7, dental_oral: 6, neurosurgery: 10,
  };
  return m[v];
}

export function equipmentSpecialization(v: VetSurgery): number {
  const m: Record<VetSurgery, number> = {
    orthopedic: 9, soft_tissue: 4, ophthalmic: 10, dental_oral: 7, neurosurgery: 10,
  };
  return m[v];
}

export function procedureCost(v: VetSurgery): number {
  const m: Record<VetSurgery, number> = {
    orthopedic: 8, soft_tissue: 4, ophthalmic: 7, dental_oral: 5, neurosurgery: 10,
  };
  return m[v];
}

export function requiresSpecialist(v: VetSurgery): boolean {
  const m: Record<VetSurgery, boolean> = {
    orthopedic: true, soft_tissue: false, ophthalmic: true, dental_oral: false, neurosurgery: true,
  };
  return m[v];
}

export function outpatientPossible(v: VetSurgery): boolean {
  const m: Record<VetSurgery, boolean> = {
    orthopedic: false, soft_tissue: true, ophthalmic: true, dental_oral: true, neurosurgery: false,
  };
  return m[v];
}

export function primaryInstrument(v: VetSurgery): string {
  const m: Record<VetSurgery, string> = {
    orthopedic: "bone_plate_screw_driver", soft_tissue: "electrocautery_scalpel",
    ophthalmic: "operating_microscope_phaco", dental_oral: "ultrasonic_scaler_elevator",
    neurosurgery: "pneumatic_drill_microscope",
  };
  return m[v];
}

export function commonProcedure(v: VetSurgery): string {
  const m: Record<VetSurgery, string> = {
    orthopedic: "fracture_repair_tplo_fho", soft_tissue: "spay_neuter_mass_removal",
    ophthalmic: "cataract_enucleation_entropion", dental_oral: "extraction_scaling_tumor",
    neurosurgery: "disc_hemilaminectomy_shunt",
  };
  return m[v];
}

export function vetSurgeries(): VetSurgery[] {
  return ["orthopedic", "soft_tissue", "ophthalmic", "dental_oral", "neurosurgery"];
}
