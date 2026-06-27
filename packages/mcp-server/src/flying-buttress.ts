export type StoneGrade = "ashlar" | "rubble" | "dressed" | "freestone";

export function thrustAngle(archHeight: number, wallHeight: number): number {
  if (wallHeight <= 0) return 0;
  return parseFloat((Math.atan(archHeight / wallHeight) * 180 / Math.PI).toFixed(1));
}

export function buttressThickness(wallHeight: number, thrustForceKn: number): number {
  return parseFloat((Math.sqrt(thrustForceKn) * wallHeight * 0.02).toFixed(1));
}

export function archSpan(wallToWallM: number): number {
  return parseFloat((wallToWallM * 1.05).toFixed(1));
}

export function pinnacleWeight(thrustKn: number, angle: number): number {
  const angleRad = (angle * Math.PI) / 180;
  return parseFloat((thrustKn * Math.tan(angleRad)).toFixed(1));
}

export function flyerCount(naveLength: number, baySpacing: number): number {
  if (baySpacing <= 0) return 0;
  return Math.ceil(naveLength / baySpacing) * 2;
}

export function stoneMass(volumeM3: number, grade: StoneGrade): number {
  const densities: Record<StoneGrade, number> = {
    ashlar: 2500, rubble: 2200, dressed: 2400, freestone: 2300,
  };
  return parseFloat((volumeM3 * densities[grade]).toFixed(0));
}

export function compressionForce(weightKn: number, area: number): number {
  if (area <= 0) return 0;
  return parseFloat((weightKn / area).toFixed(2));
}

export function windResistance(heightM: number, exposedAreaM2: number, windSpeedMs: number): number {
  return parseFloat((0.5 * 1.225 * windSpeedMs * windSpeedMs * exposedAreaM2 / 1000).toFixed(1));
}

export function mortarJointMm(grade: StoneGrade): number {
  const joints: Record<StoneGrade, number> = {
    ashlar: 3, rubble: 15, dressed: 5, freestone: 8,
  };
  return joints[grade];
}

export function stoneGrades(): StoneGrade[] {
  return ["ashlar", "rubble", "dressed", "freestone"];
}
