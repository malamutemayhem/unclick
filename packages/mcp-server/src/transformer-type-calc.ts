export type TransformerType = "step_up" | "step_down" | "isolation" | "autotransformer" | "instrument";

export function voltageRatioRange(t: TransformerType): number {
  const m: Record<TransformerType, number> = {
    step_up: 9, step_down: 9, isolation: 1, autotransformer: 5, instrument: 10,
  };
  return m[t];
}

export function efficiencyPercent(t: TransformerType): number {
  const m: Record<TransformerType, number> = {
    step_up: 8, step_down: 8, isolation: 7, autotransformer: 9, instrument: 6,
  };
  return m[t];
}

export function sizeWeight(t: TransformerType): number {
  const m: Record<TransformerType, number> = {
    step_up: 9, step_down: 8, isolation: 7, autotransformer: 4, instrument: 2,
  };
  return m[t];
}

export function costScore(t: TransformerType): number {
  const m: Record<TransformerType, number> = {
    step_up: 8, step_down: 7, isolation: 6, autotransformer: 4, instrument: 5,
  };
  return m[t];
}

export function safetyIsolation(t: TransformerType): number {
  const m: Record<TransformerType, number> = {
    step_up: 5, step_down: 5, isolation: 10, autotransformer: 1, instrument: 8,
  };
  return m[t];
}

export function galvanicIsolation(t: TransformerType): boolean {
  const m: Record<TransformerType, boolean> = {
    step_up: true, step_down: true, isolation: true, autotransformer: false, instrument: true,
  };
  return m[t];
}

export function forMeasurement(t: TransformerType): boolean {
  const m: Record<TransformerType, boolean> = {
    step_up: false, step_down: false, isolation: false, autotransformer: false, instrument: true,
  };
  return m[t];
}

export function primaryApplication(t: TransformerType): string {
  const m: Record<TransformerType, string> = {
    step_up: "power_generation_transmission", step_down: "distribution_to_consumer",
    isolation: "medical_sensitive_equipment", autotransformer: "voltage_regulation",
    instrument: "metering_protection",
  };
  return m[t];
}

export function windingConfig(t: TransformerType): string {
  const m: Record<TransformerType, string> = {
    step_up: "low_primary_high_secondary", step_down: "high_primary_low_secondary",
    isolation: "equal_turns_ratio", autotransformer: "single_tapped_winding",
    instrument: "precision_ratio_winding",
  };
  return m[t];
}

export function transformerTypes(): TransformerType[] {
  return ["step_up", "step_down", "isolation", "autotransformer", "instrument"];
}
