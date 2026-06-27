export type AsteroidType = "c_type" | "s_type" | "m_type" | "v_type" | "d_type";

export function albedo(asteroid: AsteroidType): number {
  const m: Record<AsteroidType, number> = {
    c_type: 0.05, s_type: 0.2, m_type: 0.15, v_type: 0.4, d_type: 0.03,
  };
  return m[asteroid];
}

export function densityGPerCm3(asteroid: AsteroidType): number {
  const m: Record<AsteroidType, number> = {
    c_type: 1.7, s_type: 2.7, m_type: 5.3, v_type: 3.5, d_type: 1.5,
  };
  return m[asteroid];
}

export function populationPercent(asteroid: AsteroidType): number {
  const m: Record<AsteroidType, number> = {
    c_type: 75, s_type: 17, m_type: 5, v_type: 1, d_type: 2,
  };
  return m[asteroid];
}

export function miningValue(asteroid: AsteroidType): number {
  const m: Record<AsteroidType, number> = {
    c_type: 6, s_type: 5, m_type: 10, v_type: 3, d_type: 2,
  };
  return m[asteroid];
}

export function scientificInterest(asteroid: AsteroidType): number {
  const m: Record<AsteroidType, number> = {
    c_type: 8, s_type: 6, m_type: 7, v_type: 9, d_type: 5,
  };
  return m[asteroid];
}

export function carbonaceous(asteroid: AsteroidType): boolean {
  const m: Record<AsteroidType, boolean> = {
    c_type: true, s_type: false, m_type: false, v_type: false, d_type: true,
  };
  return m[asteroid];
}

export function metallic(asteroid: AsteroidType): boolean {
  const m: Record<AsteroidType, boolean> = {
    c_type: false, s_type: false, m_type: true, v_type: false, d_type: false,
  };
  return m[asteroid];
}

export function composition(asteroid: AsteroidType): string {
  const m: Record<AsteroidType, string> = {
    c_type: "carbon_silicates", s_type: "silicates_nickel_iron",
    m_type: "nickel_iron", v_type: "basaltic", d_type: "organic_rich",
  };
  return m[asteroid];
}

export function typicalDiameterKm(asteroid: AsteroidType): number {
  const m: Record<AsteroidType, number> = {
    c_type: 50, s_type: 20, m_type: 10, v_type: 30, d_type: 15,
  };
  return m[asteroid];
}

export function asteroidTypes(): AsteroidType[] {
  return ["c_type", "s_type", "m_type", "v_type", "d_type"];
}
