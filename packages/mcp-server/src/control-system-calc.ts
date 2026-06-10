export type ControlSystem = "pid" | "fuzzy_logic" | "model_predictive" | "bang_bang" | "adaptive";

export function tuningComplexity(c: ControlSystem): number {
  const m: Record<ControlSystem, number> = {
    pid: 5, fuzzy_logic: 7, model_predictive: 10, bang_bang: 1, adaptive: 9,
  };
  return m[c];
}

export function steadyStateAccuracy(c: ControlSystem): number {
  const m: Record<ControlSystem, number> = {
    pid: 8, fuzzy_logic: 6, model_predictive: 10, bang_bang: 3, adaptive: 9,
  };
  return m[c];
}

export function computationalLoad(c: ControlSystem): number {
  const m: Record<ControlSystem, number> = {
    pid: 1, fuzzy_logic: 4, model_predictive: 10, bang_bang: 1, adaptive: 7,
  };
  return m[c];
}

export function disturbanceRejection(c: ControlSystem): number {
  const m: Record<ControlSystem, number> = {
    pid: 7, fuzzy_logic: 6, model_predictive: 9, bang_bang: 2, adaptive: 10,
  };
  return m[c];
}

export function robustness(c: ControlSystem): number {
  const m: Record<ControlSystem, number> = {
    pid: 7, fuzzy_logic: 8, model_predictive: 6, bang_bang: 5, adaptive: 10,
  };
  return m[c];
}

export function requiresModel(c: ControlSystem): boolean {
  const m: Record<ControlSystem, boolean> = {
    pid: false, fuzzy_logic: false, model_predictive: true, bang_bang: false, adaptive: true,
  };
  return m[c];
}

export function linearOnly(c: ControlSystem): boolean {
  const m: Record<ControlSystem, boolean> = {
    pid: true, fuzzy_logic: false, model_predictive: false, bang_bang: false, adaptive: false,
  };
  return m[c];
}

export function commonIndustry(c: ControlSystem): string {
  const m: Record<ControlSystem, string> = {
    pid: "process_control", fuzzy_logic: "appliances",
    model_predictive: "chemical_plants", bang_bang: "thermostat",
    adaptive: "aerospace",
  };
  return m[c];
}

export function responseCharacteristic(c: ControlSystem): string {
  const m: Record<ControlSystem, string> = {
    pid: "smooth_proportional", fuzzy_logic: "rule_based",
    model_predictive: "optimized_horizon", bang_bang: "on_off_oscillation",
    adaptive: "self_adjusting",
  };
  return m[c];
}

export function controlSystems(): ControlSystem[] {
  return ["pid", "fuzzy_logic", "model_predictive", "bang_bang", "adaptive"];
}
