export type DrivetrainType = "fwd" | "rwd" | "awd" | "four_wd" | "mid_engine_rwd";

export function tractionScore(d: DrivetrainType): number {
  const m: Record<DrivetrainType, number> = {
    fwd: 6, rwd: 5, awd: 9, four_wd: 10, mid_engine_rwd: 7,
  };
  return m[d];
}

export function handlingBalance(d: DrivetrainType): number {
  const m: Record<DrivetrainType, number> = {
    fwd: 5, rwd: 8, awd: 7, four_wd: 4, mid_engine_rwd: 10,
  };
  return m[d];
}

export function fuelEfficiency(d: DrivetrainType): number {
  const m: Record<DrivetrainType, number> = {
    fwd: 9, rwd: 7, awd: 4, four_wd: 3, mid_engine_rwd: 5,
  };
  return m[d];
}

export function manufacturingCost(d: DrivetrainType): number {
  const m: Record<DrivetrainType, number> = {
    fwd: 2, rwd: 5, awd: 8, four_wd: 7, mid_engine_rwd: 10,
  };
  return m[d];
}

export function weightDistribution(d: DrivetrainType): number {
  const m: Record<DrivetrainType, number> = {
    fwd: 3, rwd: 7, awd: 6, four_wd: 5, mid_engine_rwd: 10,
  };
  return m[d];
}

export function understeerTendency(d: DrivetrainType): boolean {
  const m: Record<DrivetrainType, boolean> = {
    fwd: true, rwd: false, awd: false, four_wd: true, mid_engine_rwd: false,
  };
  return m[d];
}

export function offRoadCapable(d: DrivetrainType): boolean {
  const m: Record<DrivetrainType, boolean> = {
    fwd: false, rwd: false, awd: true, four_wd: true, mid_engine_rwd: false,
  };
  return m[d];
}

export function typicalVehicle(d: DrivetrainType): string {
  const m: Record<DrivetrainType, string> = {
    fwd: "economy_sedan", rwd: "sports_sedan",
    awd: "crossover_suv", four_wd: "truck_offroad",
    mid_engine_rwd: "supercar",
  };
  return m[d];
}

export function driveshaftConfig(d: DrivetrainType): string {
  const m: Record<DrivetrainType, string> = {
    fwd: "transaxle", rwd: "prop_shaft_differential",
    awd: "center_diff_two_axle", four_wd: "transfer_case",
    mid_engine_rwd: "rear_transaxle",
  };
  return m[d];
}

export function drivetrainTypes(): DrivetrainType[] {
  return ["fwd", "rwd", "awd", "four_wd", "mid_engine_rwd"];
}
