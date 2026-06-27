export type SoapMoldType = "silicone_loaf_flex" | "wood_box_liner" | "individual_cavity_shape" | "acrylic_slab_tall" | "pvc_pipe_round";

export function moldRelease(t: SoapMoldType): number {
  const m: Record<SoapMoldType, number> = {
    silicone_loaf_flex: 10, wood_box_liner: 7, individual_cavity_shape: 9, acrylic_slab_tall: 6, pvc_pipe_round: 8,
  };
  return m[t];
}

export function batchSize(t: SoapMoldType): number {
  const m: Record<SoapMoldType, number> = {
    silicone_loaf_flex: 7, wood_box_liner: 9, individual_cavity_shape: 4, acrylic_slab_tall: 10, pvc_pipe_round: 5,
  };
  return m[t];
}

export function barConsistency(t: SoapMoldType): number {
  const m: Record<SoapMoldType, number> = {
    silicone_loaf_flex: 7, wood_box_liner: 8, individual_cavity_shape: 10, acrylic_slab_tall: 9, pvc_pipe_round: 8,
  };
  return m[t];
}

export function insulation(t: SoapMoldType): number {
  const m: Record<SoapMoldType, number> = {
    silicone_loaf_flex: 5, wood_box_liner: 10, individual_cavity_shape: 4, acrylic_slab_tall: 6, pvc_pipe_round: 7,
  };
  return m[t];
}

export function moldCost(t: SoapMoldType): number {
  const m: Record<SoapMoldType, number> = {
    silicone_loaf_flex: 2, wood_box_liner: 2, individual_cavity_shape: 1, acrylic_slab_tall: 3, pvc_pipe_round: 1,
  };
  return m[t];
}

export function noCutting(t: SoapMoldType): boolean {
  const m: Record<SoapMoldType, boolean> = {
    silicone_loaf_flex: false, wood_box_liner: false, individual_cavity_shape: true, acrylic_slab_tall: false, pvc_pipe_round: false,
  };
  return m[t];
}

export function lyeSafe(t: SoapMoldType): boolean {
  const m: Record<SoapMoldType, boolean> = {
    silicone_loaf_flex: true, wood_box_liner: true, individual_cavity_shape: true, acrylic_slab_tall: true, pvc_pipe_round: true,
  };
  return m[t];
}

export function moldShape(t: SoapMoldType): string {
  const m: Record<SoapMoldType, string> = {
    silicone_loaf_flex: "rectangular_loaf_flex",
    wood_box_liner: "lined_wood_frame",
    individual_cavity_shape: "single_bar_cavity",
    acrylic_slab_tall: "tall_slab_divider",
    pvc_pipe_round: "cylinder_tube_round",
  };
  return m[t];
}

export function bestSoap(t: SoapMoldType): string {
  const m: Record<SoapMoldType, string> = {
    silicone_loaf_flex: "swirl_design_loaf",
    wood_box_liner: "cold_process_batch",
    individual_cavity_shape: "guest_soap_shaped",
    acrylic_slab_tall: "tall_column_pour",
    pvc_pipe_round: "round_bar_embed",
  };
  return m[t];
}

export function soapMolds(): SoapMoldType[] {
  return ["silicone_loaf_flex", "wood_box_liner", "individual_cavity_shape", "acrylic_slab_tall", "pvc_pipe_round"];
}
