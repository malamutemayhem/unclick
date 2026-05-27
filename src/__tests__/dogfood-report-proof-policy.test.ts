import { describe, expect, it } from "vitest";

import { dogfoodReport } from "@/data/dogfoodReport";

describe("Dogfood report proof policy", () => {
  it("keeps public status wording honest in the fallback receipt", () => {
    expect(dogfoodReport.statusLegend.passing).toMatch(/live check or scheduled package sweep ran/i);
    expect(dogfoodReport.statusLegend.blocked).toMatch(/needs action/i);
    expect(dogfoodReport.statusLegend.pending).toMatch(/scheduled proof is not available yet/i);
    expect(dogfoodReport.proofPolicy).toMatch(/live check or scheduled package sweep actually ran/i);

    const uxpass = dogfoodReport.results.find((result) => result.id === "uxpass");
    const securitypass = dogfoodReport.results.find((result) => result.id === "securitypass");
    const copypass = dogfoodReport.results.find((result) => result.id === "copypass");

    expect(uxpass?.reasonCode).toBe("missing_credential");
    expect(uxpass?.nextProof).toMatch(/rerun the dogfood report workflow/i);
    expect(securitypass?.reasonCode).toBe("scope_gate");
    expect(securitypass?.nextProof).toMatch(/before marking this passing/i);

    const compliancepass = dogfoodReport.results.find((result) => result.id === "compliancepass");
    expect(compliancepass?.status).toBe("blocked");
    expect(compliancepass?.reasonCode).toBe("readiness_gap");
    expect(compliancepass?.blockedReason).toMatch(/amber/i);
    expect(copypass?.reasonCode).toBe("package_ready_needs_scheduled_receipt");
    expect(copypass?.proof?.kind).toBe("package_ready");
  });

  it("keeps the XPass family maturity index visible", () => {
    const testpass = dogfoodReport.xpassIndex.find((entry) => entry.id === "testpass");
    const compliancepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "compliancepass");
    const sloppass = dogfoodReport.xpassIndex.find((entry) => entry.id === "sloppass");
    const commonsensepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "commonsensepass");
    const wakepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "wakepass");

    expect(dogfoodReport.xpassIndex).toHaveLength(13);
    expect(testpass?.stage).toBe("live_gate");
    expect(testpass?.mentionProfile).toMatch(/protects merges/i);
    expect(compliancepass?.stage).toBe("live_dogfood");
    expect(compliancepass?.nextStep).toMatch(/conservative/i);
    expect(sloppass?.stage).toBe("package_ready");
    expect(sloppass?.mentionProfile).toMatch(/QualityPass/i);
    expect(commonsensepass?.stage).toBe("live_gate");
    expect(commonsensepass?.nextStep).toMatch(/worker-claim sanity/i);
    expect(wakepass?.stage).toBe("live_gate");
  });
});
