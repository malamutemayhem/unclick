export type ThermalBridge = "steel_stud" | "concrete_slab" | "window_frame" | "balcony" | "fastener";

export function heatLossImpact(t: ThermalBridge): number {
  const m: Record<ThermalBridge, number> = {
    steel_stud: 7, concrete_slab: 9, window_frame: 6, balcony: 10, fastener: 4,
  };
  return m[t];
}

export function condensationRisk(t: ThermalBridge): number {
  const m: Record<ThermalBridge, number> = {
    steel_stud: 7, concrete_slab: 8, window_frame: 9, balcony: 10, fastener: 5,
  };
  return m[t];
}

export function mitigationDifficulty(t: ThermalBridge): number {
  const m: Record<ThermalBridge, number> = {
    steel_stud: 5, concrete_slab: 8, window_frame: 6, balcony: 10, fastener: 3,
  };
  return m[t];
}

export function prevalence(t: ThermalBridge): number {
  const m: Record<ThermalBridge, number> = {
    steel_stud: 9, concrete_slab: 7, window_frame: 10, balcony: 5, fastener: 8,
  };
  return m[t];
}

export function remediationCost(t: ThermalBridge): number {
  const m: Record<ThermalBridge, number> = {
    steel_stud: 5, concrete_slab: 8, window_frame: 6, balcony: 10, fastener: 3,
  };
  return m[t];
}

export function structuralElement(t: ThermalBridge): boolean {
  const m: Record<ThermalBridge, boolean> = {
    steel_stud: true, concrete_slab: true, window_frame: false, balcony: true, fastener: false,
  };
  return m[t];
}

export function detectableByThermography(t: ThermalBridge): boolean {
  const m: Record<ThermalBridge, boolean> = {
    steel_stud: true, concrete_slab: true, window_frame: true, balcony: true, fastener: false,
  };
  return m[t];
}

export function mitigationStrategy(t: ThermalBridge): string {
  const m: Record<ThermalBridge, string> = {
    steel_stud: "continuous_exterior_insulation", concrete_slab: "thermal_break_strip",
    window_frame: "insulated_frame_profile", balcony: "structural_thermal_break",
    fastener: "thermal_isolating_washer",
  };
  return m[t];
}

export function psiValue(t: ThermalBridge): string {
  const m: Record<ThermalBridge, string> = {
    steel_stud: "moderate_linear", concrete_slab: "high_linear",
    window_frame: "moderate_perimeter", balcony: "very_high_linear",
    fastener: "low_point_bridge",
  };
  return m[t];
}

export function thermalBridges(): ThermalBridge[] {
  return ["steel_stud", "concrete_slab", "window_frame", "balcony", "fastener"];
}
