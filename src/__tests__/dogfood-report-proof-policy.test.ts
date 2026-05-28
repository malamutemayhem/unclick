import { describe, expect, it } from "vitest";

import { dogfoodReport } from "@/data/dogfoodReport";

describe("Dogfood report proof policy", () => {
  it("keeps public status wording honest in the fallback receipt", () => {
    expect(dogfoodReport.statusLegend.passing).toMatch(/live check ran/i);
    expect(dogfoodReport.statusLegend.blocked).toMatch(/needs action/i);
    expect(dogfoodReport.statusLegend.pending).toMatch(/live proof is not available yet/i);
    expect(dogfoodReport.proofPolicy).toMatch(/passing only when a live check actually ran/i);

    const uxpass = dogfoodReport.results.find((result) => result.id === "uxpass");
    const securitypass = dogfoodReport.results.find((result) => result.id === "securitypass");

    expect(uxpass?.status).toBe("passing");
    expect(uxpass?.summary).toMatch(/validated the UXPass result shape/i);
    expect(securitypass?.reasonCode).toBe("scope_gate");
    expect(securitypass?.nextProof).toMatch(/before marking this passing/i);

    const compliancepass = dogfoodReport.results.find((result) => result.id === "compliancepass");
    expect(compliancepass?.status).toBe("passing");
    expect(compliancepass?.reasonCode).toBe("public_receipt_complete");
    expect(compliancepass?.summary).toMatch(/98\.4\/100/i);
  });

  it("keeps the XPass family maturity index visible", () => {
    const testpass = dogfoodReport.xpassIndex.find((entry) => entry.id === "testpass");
    const compliancepass = dogfoodReport.xpassIndex.find((entry) => entry.id === "compliancepass");

    expect(testpass?.stage).toBe("live_gate");
    expect(testpass?.mentionProfile).toMatch(/protects merges/i);
    expect(compliancepass?.stage).toBe("live_dogfood");
    expect(compliancepass?.nextStep).toMatch(/conservative/i);
  });
});
