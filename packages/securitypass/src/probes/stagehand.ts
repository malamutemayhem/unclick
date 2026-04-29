import type { SecurityRunTarget } from "../types/index.js";
import type { SecurityProbeFinding, SecurityProbeResult } from "./types.js";

export interface StagehandObservation {
  check_id: string;
  title: string;
  ok: boolean;
  evidence: Record<string, unknown>;
  remediation?: string;
}

export interface StagehandLike {
  observeSecurity(targetUrl: string): Promise<StagehandObservation[]>;
}

export async function runStagehandProbe(
  target: SecurityRunTarget,
  stagehand: StagehandLike,
): Promise<SecurityProbeResult> {
  if (!target.url) {
    return {
      probe: "stagehand",
      target,
      findings: [{
        check_id: "securitypass.stagehand.target-url",
        title: "Stagehand probe requires a URL target",
        severity: "low",
        verdict: "na",
        category: "browser",
        evidence: { target },
      }],
    };
  }

  const observations = await stagehand.observeSecurity(target.url);
  const findings: SecurityProbeFinding[] = observations.map((obs) => ({
    check_id: obs.check_id,
    title: obs.title,
    severity: obs.ok ? "low" : "medium",
    verdict: obs.ok ? "check" : "fail",
    category: "browser",
    remediation: obs.remediation,
    evidence: obs.evidence,
  }));
  return { probe: "stagehand", target, findings, raw: observations };
}

