export type MissionType = "flyby" | "orbiter" | "lander" | "rover" | "sample_return";

export function missionComplexity(m2: MissionType): number {
  const m: Record<MissionType, number> = {
    flyby: 3, orbiter: 5, lander: 7, rover: 9, sample_return: 10,
  };
  return m[m2];
}

export function scienceReturn(m2: MissionType): number {
  const m: Record<MissionType, number> = {
    flyby: 4, orbiter: 7, lander: 8, rover: 9, sample_return: 10,
  };
  return m[m2];
}

export function costBillionUsd(m2: MissionType): number {
  const m: Record<MissionType, number> = {
    flyby: 1, orbiter: 3, lander: 5, rover: 8, sample_return: 10,
  };
  return m[m2];
}

export function missionDurationYears(m2: MissionType): number {
  const m: Record<MissionType, number> = {
    flyby: 5, orbiter: 8, lander: 2, rover: 10, sample_return: 7,
  };
  return m[m2];
}

export function riskLevel(m2: MissionType): number {
  const m: Record<MissionType, number> = {
    flyby: 3, orbiter: 4, lander: 8, rover: 9, sample_return: 10,
  };
  return m[m2];
}

export function touchesSurface(m2: MissionType): boolean {
  const m: Record<MissionType, boolean> = {
    flyby: false, orbiter: false, lander: true, rover: true, sample_return: true,
  };
  return m[m2];
}

export function returnsMaterial(m2: MissionType): boolean {
  const m: Record<MissionType, boolean> = {
    flyby: false, orbiter: false, lander: false, rover: false, sample_return: true,
  };
  return m[m2];
}

export function exampleMission(m2: MissionType): string {
  const m: Record<MissionType, string> = {
    flyby: "voyager", orbiter: "cassini", lander: "viking",
    rover: "curiosity", sample_return: "osiris_rex",
  };
  return m[m2];
}

export function primaryInstrument(m2: MissionType): string {
  const m: Record<MissionType, string> = {
    flyby: "camera", orbiter: "spectrometer", lander: "seismometer",
    rover: "drill", sample_return: "collection_capsule",
  };
  return m[m2];
}

export function missionTypes(): MissionType[] {
  return ["flyby", "orbiter", "lander", "rover", "sample_return"];
}
