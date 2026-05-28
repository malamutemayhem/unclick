import { describe, expect, it } from "vitest";

import { dogfoodReport } from "@/data/dogfoodReport";

describe("Dogfood report proof policy", () => {
  it("keeps public status wording honest in the fallback receipt", () => {
    expect(dogfoodReport.statusLegend.passing).toMatch(/live check or scheduled package sweep ran/i);
    expect(dogfoodReport.statusLegend.passing).toMatch(/scheduled boundary sweep ran/i);
    expect(dogfoodReport.statusLegend.blocked).toMatch(/needs action|action is needed/i);
    expect(dogfoodReport.statusLegend.pending).toMatch(/scheduled proof is not available yet/i);
    expect(dogfoodReport.proofPolicy).toMatch(/live check or scheduled package sweep actually ran/i);
    expect(dogfoodReport.proofPolicy).toMatch(/scheduled boundary sweep actually ran/i);

    const uxpass = dogfoodReport.results.find((result) => result.id === "uxpass");
    const securitypass = dogfoodReport.results.find((result) => result.id === "securitypass");
    const copypass = dogfoodReport.results.find((result) => result.id === "copypass");
    const enterprisepass = dogfoodReport.results.find((result) => result.id === "enterprisepass");
    const seopass = dogfoodReport.results.find((result) => result.id === "seopass");

    expect(uxpass?.status).toBe("pending");
    expect(uxpass?.reasonCode).toBe("dry_run_only");
    expect(uxpass?.summary).toMatch(/validated the UXPass result shape/i);
    expect(securitypass?.status).toBe("passing");
    expect(securitypass?.proof?.kind).toBe("securitypass_safe_static_proof");
    expect(securitypass?.nextProof).toMatch(/active-runner receipt/i);

    const compliancepass = dogfoodReport.results.find((result) => result.id === "compliancepass");
    expect(compliancepass?.status).toBe("passing");
    expect(compliancepass?.reasonCode).toBe("public_receipt_complete");
    expect(compliancepass?.summary).toMatch(/99\.3\/100/i);
    expect(copypass?.reasonCode).toBe("package_ready_needs_scheduled_receipt");
    expect(copypass?.proof?.kind).toBe("package_ready");
    expect(enterprisepass?.reasonCode).toBe("boundary_needs_runner");
    expect(enterprisepass?.proof?.kind).toBe("boundary");
    expect(seopass?.proof?.kind).toBe("seopass_run");
    expect(seopass?.evidence).not.toMatch(/scaffold-only/i);
  });

  it("keeps the XPass family maturity index visible", () => {
    const testpass = dogfoodReport.xpassIndex.find((entry) => entry.id === "testpass");
    const compliancepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "compliancepass");
    const sloppass = dogfoodReport.xpassIndex.find((entry) => entry.id === "sloppass");
    const commonsensepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "commonsensepass");
    const wakepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "wakepass");
    const enterprisepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "enterprisepass");
    const seopass = dogfoodReport.xpassIndex.find((entry) => entry.id === "seopass");

    expect(dogfoodReport.xpassIndex).toHaveLength(14);
    expect(testpass?.stage).toBe("live_gate");
    expect(testpass?.mentionProfile).toMatch(/protects merges/i);
    expect(compliancepass?.stage).toBe("live_dogfood");
    expect(compliancepass?.nextStep).toMatch(/conservative/i);
    expect(sloppass?.stage).toBe("package_ready");
    expect(sloppass?.mentionProfile).toMatch(/QualityPass/i);
    expect(commonsensepass?.stage).toBe("live_gate");
    expect(commonsensepass?.nextStep).toMatch(/worker-claim sanity/i);
    expect(wakepass?.stage).toBe("live_gate");
    expect(enterprisepass?.stage).toBe("guidance");
    expect(seopass?.stage).toBe("live_dogfood");
    expect(seopass?.automation).toMatch(/read-only SEO receipt/i);
  });
});
