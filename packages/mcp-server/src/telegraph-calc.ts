export type TelegraphType = "single_needle" | "double_needle" | "morse_key" | "sounder" | "ticker";

export function dotDuration(wpm: number): number {
  if (wpm <= 0) return 0;
  return parseFloat((1200 / wpm).toFixed(0));
}

export function dashDuration(wpm: number): number {
  return dotDuration(wpm) * 3;
}

export function wordSpaceMs(wpm: number): number {
  return dotDuration(wpm) * 7;
}

export function charSpaceMs(wpm: number): number {
  return dotDuration(wpm) * 3;
}

export function messageTimeMs(chars: number, wpm: number): number {
  if (wpm <= 0) return 0;
  const avgDotsPerChar = 10;
  return chars * avgDotsPerChar * dotDuration(wpm);
}

export function wireResistanceOhms(lengthKm: number, gaugeAwg: number): number {
  const ohmPerKm: Record<number, number> = {
    10: 3.3, 12: 5.2, 14: 8.3, 16: 13.2, 18: 21.0,
  };
  const r = ohmPerKm[gaugeAwg] ?? 10;
  return parseFloat((lengthKm * r).toFixed(1));
}

export function batteryVoltage(lineKm: number): number {
  if (lineKm <= 10) return 6;
  if (lineKm <= 50) return 24;
  if (lineKm <= 200) return 60;
  return 120;
}

export function relaySpacing(voltageV: number, wireGauge: number): number {
  const resistance = wireResistanceOhms(1, wireGauge);
  if (resistance <= 0) return Infinity;
  return parseFloat((voltageV / (resistance * 0.05)).toFixed(0));
}

export function keyForceGrams(type: TelegraphType): number {
  const g: Record<TelegraphType, number> = {
    single_needle: 50, double_needle: 60, morse_key: 80,
    sounder: 0, ticker: 30,
  };
  return g[type];
}

export function operatorSpeed(monthsTraining: number): number {
  return Math.min(35, parseFloat((5 + monthsTraining * 2.5).toFixed(0)));
}

export function lineCapacity(wires: number): number {
  return wires;
}

export function telegraphTypes(): TelegraphType[] {
  return ["single_needle", "double_needle", "morse_key", "sounder", "ticker"];
}
