export type SonarType = "side_scan" | "multibeam" | "single_beam" | "sub_bottom_profiler" | "forward_looking";

export function resolution(s: SonarType): number {
  const m: Record<SonarType, number> = {
    side_scan: 9, multibeam: 8, single_beam: 4, sub_bottom_profiler: 7, forward_looking: 6,
  };
  return m[s];
}

export function coverageArea(s: SonarType): number {
  const m: Record<SonarType, number> = {
    side_scan: 8, multibeam: 10, single_beam: 3, sub_bottom_profiler: 5, forward_looking: 6,
  };
  return m[s];
}

export function penetrationDepth(s: SonarType): number {
  const m: Record<SonarType, number> = {
    side_scan: 2, multibeam: 1, single_beam: 3, sub_bottom_profiler: 10, forward_looking: 2,
  };
  return m[s];
}

export function dataRate(s: SonarType): number {
  const m: Record<SonarType, number> = {
    side_scan: 8, multibeam: 10, single_beam: 3, sub_bottom_profiler: 7, forward_looking: 6,
  };
  return m[s];
}

export function equipmentCost(s: SonarType): number {
  const m: Record<SonarType, number> = {
    side_scan: 7, multibeam: 10, single_beam: 3, sub_bottom_profiler: 8, forward_looking: 6,
  };
  return m[s];
}

export function requiresTowfish(s: SonarType): boolean {
  const m: Record<SonarType, boolean> = {
    side_scan: true, multibeam: false, single_beam: false, sub_bottom_profiler: true, forward_looking: false,
  };
  return m[s];
}

export function realTimeDisplay(s: SonarType): boolean {
  const m: Record<SonarType, boolean> = {
    side_scan: true, multibeam: true, single_beam: true, sub_bottom_profiler: true, forward_looking: true,
  };
  return m[s];
}

export function frequencyBand(s: SonarType): string {
  const m: Record<SonarType, string> = {
    side_scan: "high_freq_100_500khz", multibeam: "mid_freq_12_400khz",
    single_beam: "low_mid_freq_24_200khz", sub_bottom_profiler: "low_freq_2_16khz",
    forward_looking: "mid_high_freq_60_300khz",
  };
  return m[s];
}

export function bestApplication(s: SonarType): string {
  const m: Record<SonarType, string> = {
    side_scan: "seafloor_imaging_search", multibeam: "bathymetric_mapping",
    single_beam: "depth_sounding_navigation", sub_bottom_profiler: "sediment_geology_survey",
    forward_looking: "obstacle_avoidance_navigation",
  };
  return m[s];
}

export function sonarTypes(): SonarType[] {
  return ["side_scan", "multibeam", "single_beam", "sub_bottom_profiler", "forward_looking"];
}
