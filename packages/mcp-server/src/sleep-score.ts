export interface SleepEntry {
  bedtime: number;
  wakeTime: number;
  awakenings: number;
  sleepLatency: number;
  quality: number;
}

export function createEntry(
  bedtimeHour: number,
  wakeHour: number,
  awakenings = 0,
  sleepLatency = 15,
  quality = 7
): SleepEntry {
  return {
    bedtime: bedtimeHour,
    wakeTime: wakeHour,
    awakenings,
    sleepLatency,
    quality,
  };
}

export function sleepDuration(entry: SleepEntry): number {
  let duration = entry.wakeTime - entry.bedtime;
  if (duration < 0) duration += 24;
  return Math.max(0, duration - entry.sleepLatency / 60);
}

export function sleepScore(entry: SleepEntry): number {
  const duration = sleepDuration(entry);

  let durationScore = 0;
  if (duration >= 7 && duration <= 9) durationScore = 40;
  else if (duration >= 6 && duration < 7) durationScore = 30;
  else if (duration > 9 && duration <= 10) durationScore = 30;
  else if (duration >= 5 && duration < 6) durationScore = 20;
  else durationScore = 10;

  const latencyScore = entry.sleepLatency <= 15 ? 15 :
    entry.sleepLatency <= 30 ? 10 :
    entry.sleepLatency <= 60 ? 5 : 0;

  const awakeningScore = entry.awakenings === 0 ? 20 :
    entry.awakenings <= 1 ? 15 :
    entry.awakenings <= 3 ? 10 : 5;

  const qualityScore = Math.min(25, Math.round(entry.quality / 10 * 25));

  return Math.min(100, durationScore + latencyScore + awakeningScore + qualityScore);
}

export function sleepEfficiency(entry: SleepEntry): number {
  let timeInBed = entry.wakeTime - entry.bedtime;
  if (timeInBed < 0) timeInBed += 24;
  if (timeInBed === 0) return 0;
  const actualSleep = sleepDuration(entry);
  return Math.round(actualSleep / timeInBed * 100);
}

export function recommendedSleep(age: number): { min: number; max: number } {
  if (age <= 0) return { min: 14, max: 17 };
  if (age <= 1) return { min: 12, max: 15 };
  if (age <= 2) return { min: 11, max: 14 };
  if (age <= 5) return { min: 10, max: 13 };
  if (age <= 13) return { min: 9, max: 11 };
  if (age <= 17) return { min: 8, max: 10 };
  if (age <= 25) return { min: 7, max: 9 };
  if (age <= 64) return { min: 7, max: 9 };
  return { min: 7, max: 8 };
}

export function sleepDebt(entries: SleepEntry[], targetHours = 8): number {
  let debt = 0;
  for (const entry of entries) {
    const duration = sleepDuration(entry);
    debt += Math.max(0, targetHours - duration);
  }
  return Math.round(debt * 10) / 10;
}

export function averageSleepDuration(entries: SleepEntry[]): number {
  if (entries.length === 0) return 0;
  const total = entries.reduce((sum, e) => sum + sleepDuration(e), 0);
  return Math.round(total / entries.length * 10) / 10;
}

export function averageSleepScore(entries: SleepEntry[]): number {
  if (entries.length === 0) return 0;
  const total = entries.reduce((sum, e) => sum + sleepScore(e), 0);
  return Math.round(total / entries.length);
}

export function sleepConsistency(entries: SleepEntry[]): number {
  if (entries.length < 2) return 100;
  const bedtimes = entries.map(e => e.bedtime);
  const mean = bedtimes.reduce((a, b) => a + b, 0) / bedtimes.length;
  const variance = bedtimes.reduce((sum, b) => sum + (b - mean) * (b - mean), 0) / bedtimes.length;
  const stdDev = Math.sqrt(variance);
  return Math.max(0, Math.round(100 - stdDev * 20));
}

export function idealBedtime(wakeTime: number, targetHours = 8): number {
  let bedtime = wakeTime - targetHours;
  if (bedtime < 0) bedtime += 24;
  return bedtime;
}

export function sleepCycles(hours: number, cycleLength = 1.5): number {
  return Math.floor(hours / cycleLength);
}

export function optimalWakeTimes(bedtime: number, maxCycles = 6): number[] {
  const times: number[] = [];
  for (let i = 3; i <= maxCycles; i++) {
    let wake = bedtime + i * 1.5;
    if (wake >= 24) wake -= 24;
    times.push(Math.round(wake * 10) / 10);
  }
  return times;
}

export function formatTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
}
