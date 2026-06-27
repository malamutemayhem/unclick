export type PropolisForm = "raw" | "tincture" | "powder" | "extract" | "capsule";

export function collectionGPerHive(): number {
  return 150;
}

export function processingMethod(form: PropolisForm): string {
  const methods: Record<PropolisForm, string> = {
    raw: "scraping", tincture: "alcohol_extraction", powder: "freeze_grind",
    extract: "water_extraction", capsule: "encapsulation",
  };
  return methods[form];
}

export function processingTimeHours(form: PropolisForm): number {
  const hours: Record<PropolisForm, number> = {
    raw: 1, tincture: 720, powder: 4, extract: 48, capsule: 8,
  };
  return hours[form];
}

export function activeCompoundPercent(form: PropolisForm): number {
  const pct: Record<PropolisForm, number> = {
    raw: 50, tincture: 30, powder: 45, extract: 60, capsule: 40,
  };
  return pct[form];
}

export function shelfLifeMonths(form: PropolisForm): number {
  const months: Record<PropolisForm, number> = {
    raw: 60, tincture: 36, powder: 24, extract: 18, capsule: 24,
  };
  return months[form];
}

export function storageTempCelsius(form: PropolisForm): number {
  const temps: Record<PropolisForm, number> = {
    raw: 20, tincture: 20, powder: 5, extract: 5, capsule: 20,
  };
  return temps[form];
}

export function bioavailability(form: PropolisForm): number {
  const ratings: Record<PropolisForm, number> = {
    raw: 2, tincture: 5, powder: 3, extract: 4, capsule: 3,
  };
  return ratings[form];
}

export function allergyRisk(form: PropolisForm): number {
  const risk: Record<PropolisForm, number> = {
    raw: 4, tincture: 2, powder: 3, extract: 2, capsule: 1,
  };
  return risk[form];
}

export function costPerGram(form: PropolisForm): number {
  const costs: Record<PropolisForm, number> = {
    raw: 0.5, tincture: 2, powder: 3, extract: 4, capsule: 5,
  };
  return costs[form];
}

export function propolisForms(): PropolisForm[] {
  return ["raw", "tincture", "powder", "extract", "capsule"];
}
