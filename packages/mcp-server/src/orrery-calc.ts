export type Planet = "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune";

export function orbitalPeriodDays(planet: Planet): number {
  const days: Record<Planet, number> = {
    mercury: 88, venus: 225, earth: 365, mars: 687,
    jupiter: 4333, saturn: 10759, uranus: 30687, neptune: 60190,
  };
  return days[planet];
}

export function gearRatio(planet: Planet): number {
  const earthDays = 365;
  return parseFloat((orbitalPeriodDays(planet) / earthDays).toFixed(4));
}

export function gearTeeth(ratio: number, baseTeeth: number): number {
  return Math.round(baseTeeth * ratio);
}

export function armLength(orbitRadiusAu: number, scaleFactor: number): number {
  return parseFloat((orbitRadiusAu * scaleFactor).toFixed(1));
}

export function orbitRadiusAu(planet: Planet): number {
  const au: Record<Planet, number> = {
    mercury: 0.39, venus: 0.72, earth: 1.0, mars: 1.52,
    jupiter: 5.2, saturn: 9.54, uranus: 19.2, neptune: 30.07,
  };
  return au[planet];
}

export function rotationRpm(planetPeriodDays: number, demoSpeedFactor: number): number {
  if (planetPeriodDays <= 0) return 0;
  return parseFloat((demoSpeedFactor / planetPeriodDays).toFixed(4));
}

export function planetDiameterMm(planet: Planet, scaleFactor: number): number {
  const kmDia: Record<Planet, number> = {
    mercury: 4879, venus: 12104, earth: 12742, mars: 6779,
    jupiter: 139820, saturn: 116460, uranus: 50724, neptune: 49244,
  };
  return parseFloat((kmDia[planet] * scaleFactor).toFixed(1));
}

export function totalGears(planets: number): number {
  return planets * 2 + 1;
}

export function crankSpeed(): number {
  return 1;
}

export function planets(): Planet[] {
  return ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
}
