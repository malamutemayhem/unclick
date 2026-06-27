export function indicatedToTrue(ias: number, altitudeFt: number, tempC: number): number {
  const pressureRatio = Math.pow(1 - 0.0000068756 * altitudeFt, 5.2559);
  const densityAlt = altitudeFt + (120 * (tempC - (15 - 0.002 * altitudeFt)));
  const densityRatio = Math.pow(1 - 0.0000068756 * densityAlt, 4.2559);
  return parseFloat((ias / Math.sqrt(densityRatio)).toFixed(1));
}

export function machNumber(tas: number, tempC: number): number {
  const speedOfSound = 661.47 * Math.sqrt((tempC + 273.15) / 288.15);
  return parseFloat((tas / speedOfSound).toFixed(3));
}

export function groundSpeed(tas: number, windSpeed: number, windAngle: number): number {
  const rad = windAngle * Math.PI / 180;
  const headwind = windSpeed * Math.cos(rad);
  return parseFloat((tas - headwind).toFixed(1));
}

export function windCorrectionAngle(tas: number, windSpeed: number, windAngle: number): number {
  const rad = windAngle * Math.PI / 180;
  const crosswind = windSpeed * Math.sin(rad);
  return parseFloat((Math.asin(crosswind / tas) * 180 / Math.PI).toFixed(1));
}

export function densityAltitude(pressureAltFt: number, tempC: number): number {
  const isaTemp = 15 - 0.002 * pressureAltFt;
  return parseFloat((pressureAltFt + 120 * (tempC - isaTemp)).toFixed(0));
}

export function pressureAltitude(fieldElevation: number, altimeterSetting: number): number {
  return parseFloat((fieldElevation + (29.92 - altimeterSetting) * 1000).toFixed(0));
}

export function fuelBurn(gph: number, hours: number): number {
  return parseFloat((gph * hours).toFixed(1));
}

export function endurance(fuelGallons: number, gph: number, reserveMin = 45): number {
  const reserveHrs = reserveMin / 60;
  const available = fuelGallons / gph - reserveHrs;
  return parseFloat(Math.max(0, available).toFixed(2));
}

export function range(enduranceHrs: number, groundSpeedKts: number): number {
  return parseFloat((enduranceHrs * groundSpeedKts).toFixed(0));
}

export function timeEnRoute(distance: number, groundSpeedKts: number): number {
  if (groundSpeedKts <= 0) return Infinity;
  return parseFloat((distance / groundSpeedKts).toFixed(2));
}

export function topOfDescent(cruiseAltFt: number, fieldElevation: number, descentRate = 500, groundSpeedKts = 120): number {
  const altToLose = cruiseAltFt - fieldElevation;
  const timeMin = altToLose / descentRate;
  const distNm = (timeMin / 60) * groundSpeedKts;
  return parseFloat(distNm.toFixed(1));
}

export function crosswindComponent(windSpeed: number, windAngle: number): { headwind: number; crosswind: number } {
  const rad = windAngle * Math.PI / 180;
  return {
    headwind: parseFloat((windSpeed * Math.cos(rad)).toFixed(1)),
    crosswind: parseFloat((Math.abs(windSpeed * Math.sin(rad))).toFixed(1)),
  };
}

export function weightAndBalance(items: { weight: number; arm: number }[]): { totalWeight: number; cg: number } {
  let totalWeight = 0;
  let totalMoment = 0;
  for (const item of items) {
    totalWeight += item.weight;
    totalMoment += item.weight * item.arm;
  }
  const cg = totalWeight > 0 ? totalMoment / totalWeight : 0;
  return { totalWeight: parseFloat(totalWeight.toFixed(1)), cg: parseFloat(cg.toFixed(2)) };
}

export function isaTemperature(altitudeFt: number): number {
  return parseFloat((15 - 0.002 * altitudeFt).toFixed(1));
}

export function cloudBase(tempC: number, dewpointC: number): number {
  const spread = tempC - dewpointC;
  return parseFloat(((spread / 2.5) * 1000).toFixed(0));
}

export function visibilityCategory(visibilitySm: number, ceilingFt: number): string {
  if (visibilitySm >= 5 && ceilingFt >= 3000) return "VFR";
  if (visibilitySm >= 3 && ceilingFt >= 1000) return "MVFR";
  if (visibilitySm >= 1 && ceilingFt >= 500) return "IFR";
  return "LIFR";
}

export function fuelRequired(distanceNm: number, groundSpeedKts: number, gph: number, reserveMin = 45): number {
  const enRouteHrs = distanceNm / groundSpeedKts;
  const reserveGal = (reserveMin / 60) * gph;
  return parseFloat((enRouteHrs * gph + reserveGal).toFixed(1));
}

export function headingToRadial(heading: number): number {
  return (heading + 180) % 360;
}

export function formatTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}:${m.toString().padStart(2, "0")}`;
}
