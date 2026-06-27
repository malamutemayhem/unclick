export type NetworkAttack = "ddos" | "mitm" | "phishing" | "sql_injection" | "ransomware";

export function frequencyScore(n: NetworkAttack): number {
  const m: Record<NetworkAttack, number> = {
    ddos: 8, mitm: 5, phishing: 10, sql_injection: 7, ransomware: 9,
  };
  return m[n];
}

export function avgDamageUsd(n: NetworkAttack): number {
  const m: Record<NetworkAttack, number> = {
    ddos: 100000, mitm: 500000, phishing: 50000, sql_injection: 300000, ransomware: 1000000,
  };
  return m[n];
}

export function detectionDifficulty(n: NetworkAttack): number {
  const m: Record<NetworkAttack, number> = {
    ddos: 3, mitm: 8, phishing: 5, sql_injection: 6, ransomware: 4,
  };
  return m[n];
}

export function technicalSkillNeeded(n: NetworkAttack): number {
  const m: Record<NetworkAttack, number> = {
    ddos: 3, mitm: 8, phishing: 2, sql_injection: 6, ransomware: 7,
  };
  return m[n];
}

export function recoveryTimeDays(n: NetworkAttack): number {
  const m: Record<NetworkAttack, number> = {
    ddos: 1, mitm: 7, phishing: 5, sql_injection: 14, ransomware: 30,
  };
  return m[n];
}

export function targetsHumans(n: NetworkAttack): boolean {
  const m: Record<NetworkAttack, boolean> = {
    ddos: false, mitm: false, phishing: true, sql_injection: false, ransomware: true,
  };
  return m[n];
}

export function requiresNetworkAccess(n: NetworkAttack): boolean {
  const m: Record<NetworkAttack, boolean> = {
    ddos: true, mitm: true, phishing: false, sql_injection: true, ransomware: false,
  };
  return m[n];
}

export function primaryDefense(n: NetworkAttack): string {
  const m: Record<NetworkAttack, string> = {
    ddos: "rate_limiting_cdn", mitm: "tls_certificate_pinning",
    phishing: "security_awareness", sql_injection: "parameterized_queries",
    ransomware: "backup_strategy",
  };
  return m[n];
}

export function owaspCategory(n: NetworkAttack): string {
  const m: Record<NetworkAttack, string> = {
    ddos: "availability", mitm: "cryptographic_failure",
    phishing: "social_engineering", sql_injection: "injection",
    ransomware: "malware",
  };
  return m[n];
}

export function networkAttacks(): NetworkAttack[] {
  return ["ddos", "mitm", "phishing", "sql_injection", "ransomware"];
}
