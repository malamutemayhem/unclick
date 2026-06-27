export type RingType = "ecliptic" | "equatorial" | "meridian" | "horizon" | "colure";

export function ringDiameter(sphereRadius: number, ringIndex: number): number {
  return parseFloat((sphereRadius * 2 * (1 - ringIndex * 0.1)).toFixed(1));
}

export function eclipticTilt(): number {
  return 23.44;
}

export function tropicAngle(): number {
  return 23.44;
}

export function hourAngle(localTime: number, rightAscension: number): number {
  return parseFloat(((localTime - rightAscension) * 15).toFixed(2));
}

export function declination(latitude: number, altitude: number, azimuth: number): number {
  const latRad = (latitude * Math.PI) / 180;
  const altRad = (altitude * Math.PI) / 180;
  const azRad = (azimuth * Math.PI) / 180;
  const dec = Math.asin(
    Math.sin(latRad) * Math.sin(altRad) +
    Math.cos(latRad) * Math.cos(altRad) * Math.cos(azRad)
  );
  return parseFloat(((dec * 180) / Math.PI).toFixed(2));
}

export function ringCount(complexity: string): number {
  const counts: Record<string, number> = {
    simple: 3, standard: 5, complex: 8, master: 12,
  };
  return counts[complexity] || 5;
}

export function bandWidth(sphereRadius: number): number {
  return parseFloat((sphereRadius * 0.08).toFixed(1));
}

export function graduationMarks(ringCircumference: number, intervalDeg: number): number {
  if (intervalDeg <= 0) return 0;
  return Math.floor(360 / intervalDeg);
}

export function axleLength(sphereRadius: number): number {
  return parseFloat((sphereRadius * 2.2).toFixed(1));
}

export function ringTypes(): RingType[] {
  return ["ecliptic", "equatorial", "meridian", "horizon", "colure"];
}
