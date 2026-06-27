export type SafetyGlassesType = "clear_lens_standard" | "tinted_outdoor_uv" | "anti_fog_sealed" | "over_glasses_fit" | "prescription_insert_rx";

export function impactResist(t: SafetyGlassesType): number {
  const m: Record<SafetyGlassesType, number> = {
    clear_lens_standard: 7, tinted_outdoor_uv: 7, anti_fog_sealed: 9, over_glasses_fit: 6, prescription_insert_rx: 8,
  };
  return m[t];
}

export function clarity(t: SafetyGlassesType): number {
  const m: Record<SafetyGlassesType, number> = {
    clear_lens_standard: 10, tinted_outdoor_uv: 7, anti_fog_sealed: 8, over_glasses_fit: 5, prescription_insert_rx: 9,
  };
  return m[t];
}

export function fogResist(t: SafetyGlassesType): number {
  const m: Record<SafetyGlassesType, number> = {
    clear_lens_standard: 4, tinted_outdoor_uv: 4, anti_fog_sealed: 10, over_glasses_fit: 3, prescription_insert_rx: 6,
  };
  return m[t];
}

export function comfort(t: SafetyGlassesType): number {
  const m: Record<SafetyGlassesType, number> = {
    clear_lens_standard: 8, tinted_outdoor_uv: 8, anti_fog_sealed: 6, over_glasses_fit: 4, prescription_insert_rx: 7,
  };
  return m[t];
}

export function glassesCost(t: SafetyGlassesType): number {
  const m: Record<SafetyGlassesType, number> = {
    clear_lens_standard: 1, tinted_outdoor_uv: 2, anti_fog_sealed: 4, over_glasses_fit: 3, prescription_insert_rx: 8,
  };
  return m[t];
}

export function uvProtect(t: SafetyGlassesType): boolean {
  const m: Record<SafetyGlassesType, boolean> = {
    clear_lens_standard: true, tinted_outdoor_uv: true, anti_fog_sealed: true, over_glasses_fit: true, prescription_insert_rx: true,
  };
  return m[t];
}

export function fitsOverRx(t: SafetyGlassesType): boolean {
  const m: Record<SafetyGlassesType, boolean> = {
    clear_lens_standard: false, tinted_outdoor_uv: false, anti_fog_sealed: false, over_glasses_fit: true, prescription_insert_rx: false,
  };
  return m[t];
}

export function lensType(t: SafetyGlassesType): string {
  const m: Record<SafetyGlassesType, string> = {
    clear_lens_standard: "polycarbonate_clear_z87",
    tinted_outdoor_uv: "polycarbonate_grey_uv400",
    anti_fog_sealed: "polycarbonate_coated_gasket",
    over_glasses_fit: "polycarbonate_otg_wide",
    prescription_insert_rx: "polycarbonate_rx_insert",
  };
  return m[t];
}

export function bestTask(t: SafetyGlassesType): string {
  const m: Record<SafetyGlassesType, string> = {
    clear_lens_standard: "indoor_shop_lab_general",
    tinted_outdoor_uv: "outdoor_construction_sun",
    anti_fog_sealed: "humid_cold_chemical_splash",
    over_glasses_fit: "rx_wearer_occasional_use",
    prescription_insert_rx: "daily_wear_rx_worker",
  };
  return m[t];
}

export function safetyGlasses(): SafetyGlassesType[] {
  return ["clear_lens_standard", "tinted_outdoor_uv", "anti_fog_sealed", "over_glasses_fit", "prescription_insert_rx"];
}
