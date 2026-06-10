export type PatinaMethod = "liver_sulfur" | "vinegar_salt" | "ammonia" | "heat" | "burial";

export function applicationTimeMinutes(method: PatinaMethod): number {
  const times: Record<PatinaMethod, number> = {
    liver_sulfur: 5, vinegar_salt: 1440, ammonia: 60, heat: 2, burial: 43200,
  };
  return times[method];
}

export function colorRange(method: PatinaMethod): string {
  const colors: Record<PatinaMethod, string> = {
    liver_sulfur: "black_brown", vinegar_salt: "green_blue", ammonia: "blue_green",
    heat: "straw_to_purple", burial: "green",
  };
  return colors[method];
}

export function metalCompatibility(method: PatinaMethod): string[] {
  const compat: Record<PatinaMethod, string[]> = {
    liver_sulfur: ["copper", "brass", "silver"],
    vinegar_salt: ["copper", "brass", "bronze"],
    ammonia: ["copper", "brass"],
    heat: ["steel", "copper", "titanium"],
    burial: ["copper", "bronze"],
  };
  return compat[method];
}

export function sealerRequired(method: PatinaMethod): boolean {
  return method !== "heat";
}

export function durabilityRating(method: PatinaMethod): number {
  const ratings: Record<PatinaMethod, number> = {
    liver_sulfur: 3, vinegar_salt: 4, ammonia: 3, heat: 5, burial: 5,
  };
  return ratings[method];
}

export function reversibility(method: PatinaMethod): boolean {
  return method === "liver_sulfur" || method === "heat";
}

export function toxicityRating(method: PatinaMethod): number {
  const ratings: Record<PatinaMethod, number> = {
    liver_sulfur: 3, vinegar_salt: 1, ammonia: 4, heat: 1, burial: 1,
  };
  return ratings[method];
}

export function temperatureCelsius(method: PatinaMethod): number {
  const temps: Record<PatinaMethod, number> = {
    liver_sulfur: 60, vinegar_salt: 20, ammonia: 20, heat: 300, burial: 15,
  };
  return temps[method];
}

export function costRating(method: PatinaMethod): number {
  const costs: Record<PatinaMethod, number> = {
    liver_sulfur: 2, vinegar_salt: 1, ammonia: 2, heat: 1, burial: 1,
  };
  return costs[method];
}

export function patinaMethods(): PatinaMethod[] {
  return ["liver_sulfur", "vinegar_salt", "ammonia", "heat", "burial"];
}
