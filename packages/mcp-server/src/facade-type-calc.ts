export type FacadeType = "curtain_wall" | "rain_screen" | "masonry" | "double_skin" | "green_wall";

export function thermalPerformance(f: FacadeType): number {
  const m: Record<FacadeType, number> = {
    curtain_wall: 6, rain_screen: 8, masonry: 7, double_skin: 10, green_wall: 9,
  };
  return m[f];
}

export function naturalVentilation(f: FacadeType): number {
  const m: Record<FacadeType, number> = {
    curtain_wall: 3, rain_screen: 5, masonry: 4, double_skin: 9, green_wall: 6,
  };
  return m[f];
}

export function maintenanceCost(f: FacadeType): number {
  const m: Record<FacadeType, number> = {
    curtain_wall: 7, rain_screen: 5, masonry: 3, double_skin: 8, green_wall: 9,
  };
  return m[f];
}

export function daylightAdmission(f: FacadeType): number {
  const m: Record<FacadeType, number> = {
    curtain_wall: 10, rain_screen: 5, masonry: 3, double_skin: 9, green_wall: 2,
  };
  return m[f];
}

export function acousticInsulation(f: FacadeType): number {
  const m: Record<FacadeType, number> = {
    curtain_wall: 5, rain_screen: 6, masonry: 8, double_skin: 10, green_wall: 7,
  };
  return m[f];
}

export function transparent(f: FacadeType): boolean {
  const m: Record<FacadeType, boolean> = {
    curtain_wall: true, rain_screen: false, masonry: false, double_skin: true, green_wall: false,
  };
  return m[f];
}

export function sustainable(f: FacadeType): boolean {
  const m: Record<FacadeType, boolean> = {
    curtain_wall: false, rain_screen: false, masonry: true, double_skin: false, green_wall: true,
  };
  return m[f];
}

export function bestClimate(f: FacadeType): string {
  const m: Record<FacadeType, string> = {
    curtain_wall: "temperate", rain_screen: "wet_coastal",
    masonry: "continental", double_skin: "hot_arid", green_wall: "tropical",
  };
  return m[f];
}

export function lifespanYears(f: FacadeType): number {
  const m: Record<FacadeType, number> = {
    curtain_wall: 35, rain_screen: 40, masonry: 100, double_skin: 30, green_wall: 25,
  };
  return m[f];
}

export function facadeTypes(): FacadeType[] {
  return ["curtain_wall", "rain_screen", "masonry", "double_skin", "green_wall"];
}
