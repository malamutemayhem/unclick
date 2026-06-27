export type NalbindingStitch = "oslo" | "york" | "mammen" | "korgen" | "brodén";

export function needleLengthCm(stitch: NalbindingStitch): number {
  const lengths: Record<NalbindingStitch, number> = {
    oslo: 8, york: 7, mammen: 9, korgen: 10, brodén: 8,
  };
  return lengths[stitch];
}

export function yarnLengthPerPassCm(stitch: NalbindingStitch): number {
  const lengths: Record<NalbindingStitch, number> = {
    oslo: 120, york: 100, mammen: 150, korgen: 180, brodén: 130,
  };
  return lengths[stitch];
}

export function fabricThicknessMm(stitch: NalbindingStitch): number {
  const thick: Record<NalbindingStitch, number> = {
    oslo: 4, york: 3, mammen: 5, korgen: 6, brodén: 4,
  };
  return thick[stitch];
}

export function stretchPercent(stitch: NalbindingStitch): number {
  const stretch: Record<NalbindingStitch, number> = {
    oslo: 15, york: 20, mammen: 10, korgen: 5, brodén: 12,
  };
  return stretch[stitch];
}

export function connectionsPerStitch(stitch: NalbindingStitch): number {
  const conn: Record<NalbindingStitch, number> = {
    oslo: 2, york: 1, mammen: 3, korgen: 4, brodén: 2,
  };
  return conn[stitch];
}

export function difficultyRating(stitch: NalbindingStitch): number {
  const diff: Record<NalbindingStitch, number> = {
    oslo: 2, york: 1, mammen: 3, korgen: 5, brodén: 3,
  };
  return diff[stitch];
}

export function stitchesPerHour(stitch: NalbindingStitch): number {
  const sph: Record<NalbindingStitch, number> = {
    oslo: 80, york: 100, mammen: 60, korgen: 40, brodén: 70,
  };
  return sph[stitch];
}

export function unravels(): boolean {
  return false;
}

export function yarnWeightBest(stitch: NalbindingStitch): string {
  const best: Record<NalbindingStitch, string> = {
    oslo: "worsted", york: "dk", mammen: "bulky", korgen: "super_bulky", brodén: "worsted",
  };
  return best[stitch];
}

export function nalbindingStitches(): NalbindingStitch[] {
  return ["oslo", "york", "mammen", "korgen", "brodén"];
}
