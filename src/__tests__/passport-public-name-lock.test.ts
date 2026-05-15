import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const PUBLIC_COPY_FILES = [
  "../pages/BackstagePass.tsx",
  "../pages/Dispatch.tsx",
  "../pages/Pricing.tsx",
  "../pages/NewToAI.tsx",
  "../pages/Crews.tsx",
  "../pages/Connect.tsx",
  "../pages/Privacy.tsx",
  "../pages/Terms.tsx",
  "../pages/Developers.tsx",
  "../pages/DeveloperDocs.tsx",
  "../components/FAQ.tsx",
  "../components/Tools.tsx",
  "../pages/admin/AdminShell.tsx",
  "../pages/admin/AdminEcosystemPages.tsx",
  "../pages/admin/AdminSettings.tsx",
  "../pages/admin/tools/ConnectedServices.tsx",
] as const;

describe("Passport public name lock", () => {
  it("keeps retired public product names out of visible copy surfaces", () => {
    for (const relativePath of PUBLIC_COPY_FILES) {
      const path = fileURLToPath(new URL(relativePath, import.meta.url));
      const source = readFileSync(path, "utf8");

      expect(source, relativePath).not.toMatch(/\b(?:BackstagePass|Backstage Pass|Keychain|Vault|Credentials)\b/);
    }
  });
});
