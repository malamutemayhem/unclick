export type ImplantMaterial = "titanium" | "cobalt_chrome" | "ceramic" | "polyethylene" | "nitinol";

export function biocompatibility(m_param: ImplantMaterial): number {
  const m: Record<ImplantMaterial, number> = {
    titanium: 10, cobalt_chrome: 7, ceramic: 9, polyethylene: 6, nitinol: 8,
  };
  return m[m_param];
}

export function mechanicalStrength(m_param: ImplantMaterial): number {
  const m: Record<ImplantMaterial, number> = {
    titanium: 8, cobalt_chrome: 10, ceramic: 7, polyethylene: 4, nitinol: 6,
  };
  return m[m_param];
}

export function wearResistance(m_param: ImplantMaterial): number {
  const m: Record<ImplantMaterial, number> = {
    titanium: 6, cobalt_chrome: 9, ceramic: 10, polyethylene: 3, nitinol: 5,
  };
  return m[m_param];
}

export function corrosionResistance(m_param: ImplantMaterial): number {
  const m: Record<ImplantMaterial, number> = {
    titanium: 10, cobalt_chrome: 7, ceramic: 10, polyethylene: 9, nitinol: 8,
  };
  return m[m_param];
}

export function materialCost(m_param: ImplantMaterial): number {
  const m: Record<ImplantMaterial, number> = {
    titanium: 7, cobalt_chrome: 6, ceramic: 8, polyethylene: 3, nitinol: 9,
  };
  return m[m_param];
}

export function mriCompatible(m_param: ImplantMaterial): boolean {
  const m: Record<ImplantMaterial, boolean> = {
    titanium: true, cobalt_chrome: false, ceramic: true, polyethylene: true, nitinol: true,
  };
  return m[m_param];
}

export function shapeMemory(m_param: ImplantMaterial): boolean {
  const m: Record<ImplantMaterial, boolean> = {
    titanium: false, cobalt_chrome: false, ceramic: false, polyethylene: false, nitinol: true,
  };
  return m[m_param];
}

export function primaryUse(m_param: ImplantMaterial): string {
  const m: Record<ImplantMaterial, string> = {
    titanium: "hip_knee_dental_implant", cobalt_chrome: "joint_replacement_bearing",
    ceramic: "dental_crown_hip_liner", polyethylene: "joint_bearing_surface",
    nitinol: "stent_orthodontic_wire",
  };
  return m[m_param];
}

export function osseointegration(m_param: ImplantMaterial): string {
  const m: Record<ImplantMaterial, string> = {
    titanium: "excellent_bone_bonding", cobalt_chrome: "moderate_fibrous",
    ceramic: "good_bioinert", polyethylene: "minimal_encapsulated",
    nitinol: "moderate_surface_dependent",
  };
  return m[m_param];
}

export function implantMaterials(): ImplantMaterial[] {
  return ["titanium", "cobalt_chrome", "ceramic", "polyethylene", "nitinol"];
}
