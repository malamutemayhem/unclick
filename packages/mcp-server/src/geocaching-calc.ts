export type CacheType = "traditional" | "multi" | "mystery" | "earthcache" | "letterbox" | "wherigo";
export type DifficultyTerrain = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type ContainerSize = "nano" | "micro" | "small" | "regular" | "large";

const CONTAINER_ML: Record<ContainerSize, number> = {
  nano: 5,
  micro: 50,
  small: 500,
  regular: 2000,
  large: 10000,
};

export function containerVolume(size: ContainerSize): number {
  return CONTAINER_ML[size];
}

export function hikeDistance(difficulty: DifficultyTerrain, terrain: DifficultyTerrain): number {
  return parseFloat(((difficulty + terrain) * 0.4).toFixed(1));
}

export function estimatedTime(difficulty: DifficultyTerrain, terrain: DifficultyTerrain): number {
  return parseFloat(((difficulty * 15 + terrain * 20) / 60).toFixed(1));
}

export function gpsAccuracy(waasEnabled: boolean): number {
  return waasEnabled ? 3 : 10;
}

export function bearingDeg(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (d: number) => d * Math.PI / 180;
  const toDeg = (r: number) => r * 180 / Math.PI;
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (d: number) => d * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(3));
}

export function projectedCoord(
  lat: number, lon: number, bearingDegrees: number, distanceM: number
): { lat: number; lon: number } {
  const toRad = (d: number) => d * Math.PI / 180;
  const toDeg = (r: number) => r * 180 / Math.PI;
  const R = 6371000;
  const d = distanceM / R;
  const brng = toRad(bearingDegrees);
  const lat1 = toRad(lat);
  const lon1 = toRad(lon);
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
  );
  const lon2 = lon1 + Math.atan2(
    Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
    Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
  );
  return {
    lat: parseFloat(toDeg(lat2).toFixed(6)),
    lon: parseFloat(toDeg(lon2).toFixed(6)),
  };
}

export function ftfProbability(cacheAgeHours: number, watchers: number): number {
  if (cacheAgeHours <= 0) return 0;
  const base = Math.max(0, 1 - cacheAgeHours / 24);
  const watcherFactor = Math.max(0, 1 - watchers * 0.05);
  return parseFloat((base * watcherFactor * 100).toFixed(1));
}

export function swagItems(containerSize: ContainerSize): number {
  const counts: Record<ContainerSize, number> = {
    nano: 0, micro: 0, small: 3, regular: 8, large: 20,
  };
  return counts[containerSize];
}

export function logbookPages(containerSize: ContainerSize): number {
  const pages: Record<ContainerSize, number> = {
    nano: 0, micro: 1, small: 5, regular: 20, large: 50,
  };
  return pages[containerSize];
}

export function maintenanceVisits(terrain: DifficultyTerrain): number {
  if (terrain <= 2) return 4;
  if (terrain <= 3.5) return 2;
  return 1;
}

export function favoritePoints(finds: number, hides: number): number {
  return Math.floor(finds / 10) + hides;
}

export function streakDays(findDates: string[]): number {
  if (findDates.length === 0) return 0;
  const sorted = [...findDates].sort();
  let maxStreak = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (Math.abs(diffDays - 1) < 0.01) {
      current++;
      maxStreak = Math.max(maxStreak, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }
  return maxStreak;
}

export function cacheTypes(): CacheType[] {
  return ["traditional", "multi", "mystery", "earthcache", "letterbox", "wherigo"];
}

export function containerSizes(): ContainerSize[] {
  return ["nano", "micro", "small", "regular", "large"];
}
