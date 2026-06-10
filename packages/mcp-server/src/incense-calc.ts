export type IncenseForm = "stick" | "cone" | "coil" | "powder" | "resin";

export function burnTime(lengthCm: number, diameterMm: number): number {
  return parseFloat((lengthCm * diameterMm * 0.8).toFixed(0));
}

export function smokeVolume(burnRateMgPerMin: number, minutes: number): number {
  return parseFloat((burnRateMgPerMin * minutes * 0.001).toFixed(2));
}

export function bindingRatio(woodPowderG: number): number {
  return parseFloat((woodPowderG * 0.1).toFixed(1));
}

export function waterContent(totalDryG: number): number {
  return parseFloat((totalDryG * 0.3).toFixed(1));
}

export function dryingHours(form: IncenseForm): number {
  const hours: Record<IncenseForm, number> = {
    stick: 48, cone: 24, coil: 72, powder: 0, resin: 0,
  };
  return hours[form];
}

export function fragranceIntensity(essentialOilPercent: number, burnRate: number): number {
  return parseFloat((essentialOilPercent * burnRate * 0.1).toFixed(1));
}

export function roomSizeM2(burnTime: number, ventilation: string): number {
  const factors: Record<string, number> = {
    closed: 10, partial: 20, open: 40,
  };
  return parseFloat(((factors[ventilation] || 20) * burnTime / 60).toFixed(0));
}

export function batchWeight(sticks: number, form: IncenseForm): number {
  const perUnit: Record<IncenseForm, number> = {
    stick: 3, cone: 2, coil: 15, powder: 50, resin: 10,
  };
  return parseFloat((sticks * perUnit[form]).toFixed(0));
}

export function charcoalPercent(form: IncenseForm): number {
  const pct: Record<IncenseForm, number> = {
    stick: 30, cone: 40, coil: 25, powder: 0, resin: 0,
  };
  return pct[form];
}

export function cureTimeDays(form: IncenseForm): number {
  const days: Record<IncenseForm, number> = {
    stick: 14, cone: 7, coil: 21, powder: 0, resin: 0,
  };
  return days[form];
}

export function incenseForms(): IncenseForm[] {
  return ["stick", "cone", "coil", "powder", "resin"];
}
