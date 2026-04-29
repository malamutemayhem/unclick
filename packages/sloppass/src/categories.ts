import type { SlopPassCategory } from "./types.js";

export const SLOPPASS_CATEGORIES: Record<SlopPassCategory, string> = {
  grounding_api_reality: "Grounding and API reality",
  logic_plausibility: "Logic plausibility",
  scaffold_without_substance: "Scaffold-without-substance patterns",
  test_proof_theatre: "Test and proof theatre",
  slopocalypse_failure_mode: "Karpathy-style slopocalypse failure modes",
  maintenance_change_risk: "Maintenance and change-risk signals",
};

export const DEFAULT_CHECKS = Object.keys(SLOPPASS_CATEGORIES) as SlopPassCategory[];
