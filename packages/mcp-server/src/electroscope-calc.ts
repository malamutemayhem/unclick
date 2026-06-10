export type ElectroscopeType = "gold_leaf" | "pith_ball" | "quartz_fiber" | "condensing" | "wulf";

export function leafDeflection(chargeNC: number, capacitancePf: number): number {
  if (capacitancePf <= 0) return 0;
  const voltage = chargeNC / capacitancePf;
  return parseFloat(Math.min(90, voltage * 5).toFixed(1));
}

export function sensitivity(type: ElectroscopeType): number {
  const nC: Record<ElectroscopeType, number> = {
    gold_leaf: 0.01, pith_ball: 1, quartz_fiber: 0.001,
    condensing: 0.1, wulf: 0.005,
  };
  return nC[type];
}

export function chargeDecayTime(humidity: number): number {
  if (humidity >= 80) return 5;
  if (humidity >= 50) return 30;
  return 120;
}

export function leafThicknessUm(type: ElectroscopeType): number {
  if (type === "gold_leaf") return 0.1;
  return 0;
}

export function jarCapacitancePf(heightCm: number, diameterCm: number): number {
  const area = Math.PI * diameterCm * heightCm;
  return parseFloat((area * 0.08).toFixed(2));
}

export function triboelectricCharge(material1: string, material2: string): string {
  const series = ["glass", "nylon", "wool", "silk", "paper", "rubber", "teflon"];
  const i1 = series.indexOf(material1);
  const i2 = series.indexOf(material2);
  if (i1 < 0 || i2 < 0) return "unknown";
  if (i1 < i2) return `${material1} positive, ${material2} negative`;
  return `${material2} positive, ${material1} negative`;
}

export function coulombForce(q1NC: number, q2NC: number, distanceM: number): number {
  if (distanceM <= 0) return 0;
  const k = 8.99e9;
  const q1 = q1NC * 1e-9;
  const q2 = q2NC * 1e-9;
  return parseFloat((k * Math.abs(q1 * q2) / (distanceM * distanceM)).toFixed(6));
}

export function inductionCharge(nearFieldNC: number): number {
  return parseFloat((nearFieldNC * 0.8).toFixed(2));
}

export function groundingTime(): number {
  return 2;
}

export function electroscopeTypes(): ElectroscopeType[] {
  return ["gold_leaf", "pith_ball", "quartz_fiber", "condensing", "wulf"];
}
