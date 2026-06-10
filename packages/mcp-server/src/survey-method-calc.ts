export type SurveyMethod = "triangulation" | "trilateration" | "photogrammetry" | "lidar" | "total_station";

export function accuracyCm(method: SurveyMethod): number {
  const m: Record<SurveyMethod, number> = {
    triangulation: 10, trilateration: 5, photogrammetry: 15, lidar: 2, total_station: 1,
  };
  return m[method];
}

export function rangeKm(method: SurveyMethod): number {
  const m: Record<SurveyMethod, number> = {
    triangulation: 50, trilateration: 30, photogrammetry: 100, lidar: 5, total_station: 3,
  };
  return m[method];
}

export function speedRating(method: SurveyMethod): number {
  const m: Record<SurveyMethod, number> = {
    triangulation: 3, trilateration: 5, photogrammetry: 8, lidar: 10, total_station: 4,
  };
  return m[method];
}

export function equipmentCost(method: SurveyMethod): number {
  const m: Record<SurveyMethod, number> = {
    triangulation: 3, trilateration: 5, photogrammetry: 7, lidar: 10, total_station: 8,
  };
  return m[method];
}

export function dataVolume(method: SurveyMethod): number {
  const m: Record<SurveyMethod, number> = {
    triangulation: 2, trilateration: 3, photogrammetry: 8, lidar: 10, total_station: 4,
  };
  return m[method];
}

export function remote(method: SurveyMethod): boolean {
  const m: Record<SurveyMethod, boolean> = {
    triangulation: false, trilateration: true, photogrammetry: true, lidar: true, total_station: false,
  };
  return m[method];
}

export function creates3dModel(method: SurveyMethod): boolean {
  const m: Record<SurveyMethod, boolean> = {
    triangulation: false, trilateration: false, photogrammetry: true, lidar: true, total_station: false,
  };
  return m[method];
}

export function bestApplication(method: SurveyMethod): string {
  const m: Record<SurveyMethod, string> = {
    triangulation: "land_survey", trilateration: "gps_network", photogrammetry: "aerial_mapping",
    lidar: "terrain_modeling", total_station: "construction",
  };
  return m[method];
}

export function crewSizeRequired(method: SurveyMethod): number {
  const m: Record<SurveyMethod, number> = {
    triangulation: 3, trilateration: 2, photogrammetry: 1, lidar: 1, total_station: 2,
  };
  return m[method];
}

export function surveyMethods(): SurveyMethod[] {
  return ["triangulation", "trilateration", "photogrammetry", "lidar", "total_station"];
}
