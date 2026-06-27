export type FilmFormat = "35mm" | "medium_format" | "large_format" | "instant" | "super8";

export function frameSizeMm2(film: FilmFormat): number {
  const m: Record<FilmFormat, number> = {
    "35mm": 864, medium_format: 3600, large_format: 12900, instant: 4600, super8: 26,
  };
  return m[film];
}

export function resolution(film: FilmFormat): number {
  const m: Record<FilmFormat, number> = {
    "35mm": 6, medium_format: 9, large_format: 10, instant: 4, super8: 2,
  };
  return m[film];
}

export function portability(film: FilmFormat): number {
  const m: Record<FilmFormat, number> = {
    "35mm": 9, medium_format: 6, large_format: 2, instant: 8, super8: 7,
  };
  return m[film];
}

export function costPerFrame(film: FilmFormat): number {
  const m: Record<FilmFormat, number> = {
    "35mm": 1, medium_format: 3, large_format: 8, instant: 2, super8: 1,
  };
  return m[film];
}

export function exposuresPerRoll(film: FilmFormat): number {
  const m: Record<FilmFormat, number> = {
    "35mm": 36, medium_format: 12, large_format: 1, instant: 10, super8: 72,
  };
  return m[film];
}

export function stillPhotography(film: FilmFormat): boolean {
  const m: Record<FilmFormat, boolean> = {
    "35mm": true, medium_format: true, large_format: true, instant: true, super8: false,
  };
  return m[film];
}

export function selfDeveloping(film: FilmFormat): boolean {
  const m: Record<FilmFormat, boolean> = {
    "35mm": false, medium_format: false, large_format: false, instant: true, super8: false,
  };
  return m[film];
}

export function bestApplication(film: FilmFormat): string {
  const m: Record<FilmFormat, string> = {
    "35mm": "street", medium_format: "fashion", large_format: "architecture",
    instant: "casual", super8: "home_movies",
  };
  return m[film];
}

export function availabilityScore(film: FilmFormat): number {
  const m: Record<FilmFormat, number> = {
    "35mm": 10, medium_format: 7, large_format: 4, instant: 9, super8: 5,
  };
  return m[film];
}

export function filmFormats(): FilmFormat[] {
  return ["35mm", "medium_format", "large_format", "instant", "super8"];
}
