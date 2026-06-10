export type SterilizationMethod = "autoclave" | "ethylene_oxide" | "gamma_irradiation" | "dry_heat" | "plasma";

export function microbialKill(s: SterilizationMethod): number {
  const m: Record<SterilizationMethod, number> = {
    autoclave: 10, ethylene_oxide: 9, gamma_irradiation: 10, dry_heat: 8, plasma: 9,
  };
  return m[s];
}

export function materialCompatibility(s: SterilizationMethod): number {
  const m: Record<SterilizationMethod, number> = {
    autoclave: 5, ethylene_oxide: 9, gamma_irradiation: 7, dry_heat: 4, plasma: 8,
  };
  return m[s];
}

export function cycleTime(s: SterilizationMethod): number {
  const m: Record<SterilizationMethod, number> = {
    autoclave: 4, ethylene_oxide: 8, gamma_irradiation: 3, dry_heat: 9, plasma: 5,
  };
  return m[s];
}

export function operatingCost(s: SterilizationMethod): number {
  const m: Record<SterilizationMethod, number> = {
    autoclave: 3, ethylene_oxide: 7, gamma_irradiation: 8, dry_heat: 2, plasma: 9,
  };
  return m[s];
}

export function safetyRisk(s: SterilizationMethod): number {
  const m: Record<SterilizationMethod, number> = {
    autoclave: 4, ethylene_oxide: 9, gamma_irradiation: 8, dry_heat: 3, plasma: 2,
  };
  return m[s];
}

export function residueFree(s: SterilizationMethod): boolean {
  const m: Record<SterilizationMethod, boolean> = {
    autoclave: true, ethylene_oxide: false, gamma_irradiation: true, dry_heat: true, plasma: true,
  };
  return m[s];
}

export function suitableForPlastics(s: SterilizationMethod): boolean {
  const m: Record<SterilizationMethod, boolean> = {
    autoclave: false, ethylene_oxide: true, gamma_irradiation: true, dry_heat: false, plasma: true,
  };
  return m[s];
}

export function activeAgent(s: SterilizationMethod): string {
  const m: Record<SterilizationMethod, string> = {
    autoclave: "saturated_steam_121c", ethylene_oxide: "eto_gas_alkylation",
    gamma_irradiation: "cobalt_60_photons", dry_heat: "convection_160c_plus",
    plasma: "hydrogen_peroxide_vapor",
  };
  return m[s];
}

export function bestApplication(s: SterilizationMethod): string {
  const m: Record<SterilizationMethod, string> = {
    autoclave: "surgical_instrument_lab", ethylene_oxide: "heat_sensitive_device",
    gamma_irradiation: "single_use_disposable", dry_heat: "glass_powder_oil",
    plasma: "delicate_electronics_scope",
  };
  return m[s];
}

export function sterilizationMethods(): SterilizationMethod[] {
  return ["autoclave", "ethylene_oxide", "gamma_irradiation", "dry_heat", "plasma"];
}
