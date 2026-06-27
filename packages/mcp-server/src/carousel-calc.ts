export type CarouselStyle = "galloper" | "venetian" | "fairground" | "band_organ" | "kiddie";

export function platformDiameter(horses: number, rowSpacing: number): number {
  const circumference = horses * rowSpacing;
  return parseFloat((circumference / Math.PI).toFixed(1));
}

export function rotationRpm(rimSpeed: number, diameter: number): number {
  if (diameter <= 0) return 0;
  const circumference = Math.PI * diameter;
  return parseFloat(((rimSpeed * 60) / circumference).toFixed(2));
}

export function horseCount(rows: number, horsesPerRow: number): number {
  return rows * horsesPerRow;
}

export function crankRodLength(horseTravel: number): number {
  return parseFloat((horseTravel / 2).toFixed(1));
}

export function gearRatio(motorRpm: number, platformRpm: number): number {
  if (platformRpm <= 0) return 0;
  return parseFloat((motorRpm / platformRpm).toFixed(1));
}

export function centrifugalForce(massKg: number, radiusM: number, rpm: number): number {
  const omega = (rpm * 2 * Math.PI) / 60;
  return parseFloat((massKg * omega * omega * radiusM).toFixed(1));
}

export function rideTime(revolutions: number, rpm: number): number {
  if (rpm <= 0) return 0;
  return parseFloat(((revolutions / rpm) * 60).toFixed(0));
}

export function lightCount(diameter: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil((Math.PI * diameter * 100) / spacingCm);
}

export function musicBpm(style: CarouselStyle): number {
  const bpms: Record<CarouselStyle, number> = {
    galloper: 120, venetian: 100, fairground: 130, band_organ: 110, kiddie: 90,
  };
  return bpms[style];
}

export function ridersPerHour(capacity: number, rideMinutes: number): number {
  if (rideMinutes <= 0) return 0;
  return parseFloat(((60 / rideMinutes) * capacity).toFixed(0));
}

export function carouselStyles(): CarouselStyle[] {
  return ["galloper", "venetian", "fairground", "band_organ", "kiddie"];
}
