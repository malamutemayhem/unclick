export type HourglassSand = "silica" | "marble_dust" | "garnet" | "iron_filings" | "crushed_shell";

export function flowConsistency(sand: HourglassSand): number {
  const m: Record<HourglassSand, number> = {
    silica: 8, marble_dust: 6, garnet: 9, iron_filings: 7, crushed_shell: 5,
  };
  return m[sand];
}

export function grainSizeUniformity(sand: HourglassSand): number {
  const m: Record<HourglassSand, number> = {
    silica: 7, marble_dust: 5, garnet: 9, iron_filings: 8, crushed_shell: 4,
  };
  return m[sand];
}

export function humiditySensitivity(sand: HourglassSand): number {
  const m: Record<HourglassSand, number> = {
    silica: 3, marble_dust: 7, garnet: 2, iron_filings: 8, crushed_shell: 6,
  };
  return m[sand];
}

export function wearResistance(sand: HourglassSand): number {
  const m: Record<HourglassSand, number> = {
    silica: 7, marble_dust: 4, garnet: 9, iron_filings: 6, crushed_shell: 3,
  };
  return m[sand];
}

export function colorRichness(sand: HourglassSand): number {
  const m: Record<HourglassSand, number> = {
    silica: 3, marble_dust: 5, garnet: 8, iron_filings: 7, crushed_shell: 4,
  };
  return m[sand];
}

export function magnetic(sand: HourglassSand): boolean {
  const m: Record<HourglassSand, boolean> = {
    silica: false, marble_dust: false, garnet: false, iron_filings: true, crushed_shell: false,
  };
  return m[sand];
}

export function naturallyOccurring(sand: HourglassSand): boolean {
  const m: Record<HourglassSand, boolean> = {
    silica: true, marble_dust: false, garnet: true, iron_filings: false, crushed_shell: true,
  };
  return m[sand];
}

export function bestTimerDuration(sand: HourglassSand): string {
  const m: Record<HourglassSand, string> = {
    silica: "one_hour", marble_dust: "three_minutes", garnet: "thirty_minutes",
    iron_filings: "one_minute", crushed_shell: "five_minutes",
  };
  return m[sand];
}

export function costPerKg(sand: HourglassSand): number {
  const m: Record<HourglassSand, number> = {
    silica: 5, marble_dust: 8, garnet: 25, iron_filings: 12, crushed_shell: 3,
  };
  return m[sand];
}

export function hourglassSands(): HourglassSand[] {
  return ["silica", "marble_dust", "garnet", "iron_filings", "crushed_shell"];
}
