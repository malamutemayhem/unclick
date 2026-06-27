export type WeatherStation = "home_consumer" | "professional_aws" | "airport_asos" | "marine_buoy" | "radiosonde";

export function sensorCount(w: WeatherStation): number {
  const m: Record<WeatherStation, number> = {
    home_consumer: 4, professional_aws: 8, airport_asos: 10, marine_buoy: 7, radiosonde: 5,
  };
  return m[w];
}

export function dataAccuracy(w: WeatherStation): number {
  const m: Record<WeatherStation, number> = {
    home_consumer: 5, professional_aws: 8, airport_asos: 10, marine_buoy: 7, radiosonde: 9,
  };
  return m[w];
}

export function transmissionReliability(w: WeatherStation): number {
  const m: Record<WeatherStation, number> = {
    home_consumer: 6, professional_aws: 9, airport_asos: 10, marine_buoy: 7, radiosonde: 4,
  };
  return m[w];
}

export function installComplexity(w: WeatherStation): number {
  const m: Record<WeatherStation, number> = {
    home_consumer: 2, professional_aws: 6, airport_asos: 10, marine_buoy: 9, radiosonde: 3,
  };
  return m[w];
}

export function systemCost(w: WeatherStation): number {
  const m: Record<WeatherStation, number> = {
    home_consumer: 2, professional_aws: 6, airport_asos: 10, marine_buoy: 8, radiosonde: 4,
  };
  return m[w];
}

export function requiresPower(w: WeatherStation): boolean {
  const m: Record<WeatherStation, boolean> = {
    home_consumer: true, professional_aws: true, airport_asos: true, marine_buoy: true, radiosonde: true,
  };
  return m[w];
}

export function disposable(w: WeatherStation): boolean {
  const m: Record<WeatherStation, boolean> = {
    home_consumer: false, professional_aws: false, airport_asos: false, marine_buoy: false, radiosonde: true,
  };
  return m[w];
}

export function communicationMethod(w: WeatherStation): string {
  const m: Record<WeatherStation, string> = {
    home_consumer: "wifi_bluetooth_console", professional_aws: "cellular_satellite_modem",
    airport_asos: "dedicated_landline_network", marine_buoy: "satellite_iridium_argos",
    radiosonde: "uhf_radio_balloon_ascent",
  };
  return m[w];
}

export function bestDeployment(w: WeatherStation): string {
  const m: Record<WeatherStation, string> = {
    home_consumer: "backyard_hobby_garden", professional_aws: "agriculture_research_network",
    airport_asos: "aviation_safety_official", marine_buoy: "ocean_coastal_monitoring",
    radiosonde: "upper_atmosphere_profile",
  };
  return m[w];
}

export function weatherStations(): WeatherStation[] {
  return ["home_consumer", "professional_aws", "airport_asos", "marine_buoy", "radiosonde"];
}
