import { PackSchema, type PackInput } from "../pack-schema.js";
import type { Pack, RunResult } from "../types.js";

const DEFAULT_PACK = PackSchema.parse({
  id: "legalpass-mvp-v0",
  name: "LegalPass MVP",
  version: "0.1.0",
  description:
    "Phase-one issue-spotter pack for privacy, terms, OSS licence, and citation guardrails.",
  targets: ["url", "contract_upload", "repo"],
  jurisdictions: ["AU", "EU", "US-CA"],
  hats: [
    { hat_id: "privacy", enabled: true, weight: 1 },
    { hat_id: "consumer_tos", enabled: true, weight: 1 },
    { hat_id: "oss_licence", enabled: true, weight: 1 },
    { hat_id: "citation_verifier", enabled: true, weight: 1 },
  ],
  profile: "standard",
  items: [
    {
      id: "privacy.001",
      hat_id: "privacy",
      title: "Privacy contact and data-use signals are visible",
      category: "privacy.disclosure",
      severity: "high",
      jurisdictions: ["AU", "EU", "US-CA"],
      profiles: ["smoke", "standard", "deep"],
    },
    {
      id: "terms.001",
      hat_id: "consumer_tos",
      title: "Liability, variation, and dispute signals are visible",
      category: "terms.unfair-terms",
      severity: "high",
      jurisdictions: ["AU", "EU", "US-CA"],
      profiles: ["smoke", "standard", "deep"],
    },
    {
      id: "oss.001",
      hat_id: "oss_licence",
      title: "Licence, attribution, and notice signals are visible",
      category: "oss.licence",
      severity: "medium",
      jurisdictions: ["AU", "EU", "US-CA"],
      profiles: ["standard", "deep"],
    },
  ],
});

const packStore = new Map<string, Pack>([[DEFAULT_PACK.id, DEFAULT_PACK]]);
const runStore = new Map<string, RunResult>();

export function getDefaultPack(): Pack {
  return DEFAULT_PACK;
}

export function getPack(packId: string): Pack | undefined {
  return packStore.get(packId);
}

export function savePack(input: PackInput, overwrite = false): Pack {
  const pack = PackSchema.parse(input);
  const hasCitationVerifier = pack.hats.some(
    (hat) => hat.enabled !== false && hat.hat_id === "citation_verifier",
  );

  if (!hasCitationVerifier) {
    throw new Error(
      "legalpass_save_pack: citation_verifier hat is required for LegalPass packs",
    );
  }

  if (!overwrite && packStore.has(pack.id)) {
    throw new Error(
      `legalpass_save_pack: pack '${pack.id}' already exists; pass overwrite=true to update it`,
    );
  }

  packStore.set(pack.id, pack);
  return pack;
}

export function saveRun(result: RunResult): RunResult {
  runStore.set(result.run_id, structuredClone(result));
  return structuredClone(result);
}

export function getRun(runId: string): RunResult | undefined {
  const result = runStore.get(runId);
  return result ? structuredClone(result) : undefined;
}

export function updateRun(result: RunResult): RunResult {
  if (!runStore.has(result.run_id)) {
    throw new Error(`legalpass_status: run '${result.run_id}' was not found`);
  }

  runStore.set(result.run_id, structuredClone(result));
  return structuredClone(result);
}

export function resetLegalPassToolStore(): void {
  packStore.clear();
  packStore.set(DEFAULT_PACK.id, DEFAULT_PACK);
  runStore.clear();
}
