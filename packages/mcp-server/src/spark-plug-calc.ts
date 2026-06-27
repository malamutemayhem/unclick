export type SparkPlugType = "copper_core_standard" | "platinum_single_tip" | "double_platinum_long" | "iridium_fine_wire" | "ruthenium_hk_performance";

export function ignitionEfficiency(t: SparkPlugType): number {
  const m: Record<SparkPlugType, number> = {
    copper_core_standard: 6, platinum_single_tip: 7, double_platinum_long: 8, iridium_fine_wire: 10, ruthenium_hk_performance: 10,
  };
  return m[t];
}

export function longevity(t: SparkPlugType): number {
  const m: Record<SparkPlugType, number> = {
    copper_core_standard: 3, platinum_single_tip: 6, double_platinum_long: 8, iridium_fine_wire: 9, ruthenium_hk_performance: 10,
  };
  return m[t];
}

export function coldStartPerformance(t: SparkPlugType): number {
  const m: Record<SparkPlugType, number> = {
    copper_core_standard: 9, platinum_single_tip: 7, double_platinum_long: 6, iridium_fine_wire: 8, ruthenium_hk_performance: 10,
  };
  return m[t];
}

export function fuelEconomy(t: SparkPlugType): number {
  const m: Record<SparkPlugType, number> = {
    copper_core_standard: 5, platinum_single_tip: 7, double_platinum_long: 8, iridium_fine_wire: 9, ruthenium_hk_performance: 10,
  };
  return m[t];
}

export function plugCost(t: SparkPlugType): number {
  const m: Record<SparkPlugType, number> = {
    copper_core_standard: 2, platinum_single_tip: 5, double_platinum_long: 7, iridium_fine_wire: 8, ruthenium_hk_performance: 10,
  };
  return m[t];
}

export function wasteSparkOk(t: SparkPlugType): boolean {
  const m: Record<SparkPlugType, boolean> = {
    copper_core_standard: false, platinum_single_tip: false, double_platinum_long: true, iridium_fine_wire: false, ruthenium_hk_performance: true,
  };
  return m[t];
}

export function preGapped(t: SparkPlugType): boolean {
  const m: Record<SparkPlugType, boolean> = {
    copper_core_standard: false, platinum_single_tip: true, double_platinum_long: true, iridium_fine_wire: true, ruthenium_hk_performance: true,
  };
  return m[t];
}

export function electrodeMaterial(t: SparkPlugType): string {
  const m: Record<SparkPlugType, string> = {
    copper_core_standard: "nickel_alloy_copper_core",
    platinum_single_tip: "platinum_disc_center",
    double_platinum_long: "platinum_both_electrodes",
    iridium_fine_wire: "iridium_fine_tip_0_6mm",
    ruthenium_hk_performance: "ruthenium_hk_alloy_tip",
  };
  return m[t];
}

export function bestEngine(t: SparkPlugType): string {
  const m: Record<SparkPlugType, string> = {
    copper_core_standard: "older_carbureted_engine",
    platinum_single_tip: "modern_coil_on_plug",
    double_platinum_long: "waste_spark_ignition",
    iridium_fine_wire: "high_compression_turbo",
    ruthenium_hk_performance: "direct_injection_gdi",
  };
  return m[t];
}

export function sparkPlugs(): SparkPlugType[] {
  return ["copper_core_standard", "platinum_single_tip", "double_platinum_long", "iridium_fine_wire", "ruthenium_hk_performance"];
}
