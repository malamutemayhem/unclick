export type CellularGeneration = "2g" | "3g" | "4g_lte" | "5g_nr" | "5g_mmwave";

export function peakSpeed(g: CellularGeneration): number {
  const m: Record<CellularGeneration, number> = {
    "2g": 1, "3g": 3, "4g_lte": 6, "5g_nr": 8, "5g_mmwave": 10,
  };
  return m[g];
}

export function latencyScore(g: CellularGeneration): number {
  const m: Record<CellularGeneration, number> = {
    "2g": 1, "3g": 3, "4g_lte": 6, "5g_nr": 9, "5g_mmwave": 10,
  };
  return m[g];
}

export function coverageArea(g: CellularGeneration): number {
  const m: Record<CellularGeneration, number> = {
    "2g": 10, "3g": 8, "4g_lte": 7, "5g_nr": 5, "5g_mmwave": 2,
  };
  return m[g];
}

export function deviceDensity(g: CellularGeneration): number {
  const m: Record<CellularGeneration, number> = {
    "2g": 2, "3g": 3, "4g_lte": 5, "5g_nr": 9, "5g_mmwave": 10,
  };
  return m[g];
}

export function infrastructureCost(g: CellularGeneration): number {
  const m: Record<CellularGeneration, number> = {
    "2g": 2, "3g": 4, "4g_lte": 6, "5g_nr": 8, "5g_mmwave": 10,
  };
  return m[g];
}

export function voiceNative(g: CellularGeneration): boolean {
  const m: Record<CellularGeneration, boolean> = {
    "2g": true, "3g": true, "4g_lte": false, "5g_nr": false, "5g_mmwave": false,
  };
  return m[g];
}

export function iotOptimized(g: CellularGeneration): boolean {
  const m: Record<CellularGeneration, boolean> = {
    "2g": false, "3g": false, "4g_lte": false, "5g_nr": true, "5g_mmwave": true,
  };
  return m[g];
}

export function accessTechnology(g: CellularGeneration): string {
  const m: Record<CellularGeneration, string> = {
    "2g": "gsm_tdma", "3g": "wcdma_cdma2000",
    "4g_lte": "ofdma_sc_fdma", "5g_nr": "ofdma_sub6ghz",
    "5g_mmwave": "ofdma_mmwave_beamforming",
  };
  return m[g];
}

export function primaryUseCase(g: CellularGeneration): string {
  const m: Record<CellularGeneration, string> = {
    "2g": "voice_sms_basic", "3g": "mobile_internet_video_call",
    "4g_lte": "streaming_mobile_broadband", "5g_nr": "enhanced_broadband_iot",
    "5g_mmwave": "fixed_wireless_ar_vr",
  };
  return m[g];
}

export function cellularGenerations(): CellularGeneration[] {
  return ["2g", "3g", "4g_lte", "5g_nr", "5g_mmwave"];
}
