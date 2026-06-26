import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Public marketing + shared copy surfaces. None of the retired vault product
// names may appear here, including the parked BackstagePass brand.
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
  "../pages/admin/AdminEcosystemPages.tsx",
  "../pages/admin/AdminSettings.tsx",
  "../pages/admin/tools/ConnectedServices.tsx",
] as const;

// Superuser-only admin shell. The BackstagePass brand is deliberately
// reignited here as an internal/superuser surface (gated behind the admin
// email allowlist, same load-bearing-internal-name precedent as Fishbowl), so
// "BackstagePass" is allowed - but the genuinely retired vault terms
// (Keychain / Vault / Credentials) stay blocked even on this surface.
const ADMIN_INTERNAL_FILES = ["../pages/admin/AdminShell.tsx"] as const;

const PUBLIC_RETIRED = /\b(?:BackstagePass|Backstage Pass|Keychain|Vault|Credentials)\b/;
const ADMIN_RETIRED = /\b(?:Keychain|Vault|Credentials)\b/;

describe("Passport public name lock", () => {
  it("keeps retired public product names out of visible copy surfaces", () => {
    for (const relativePath of PUBLIC_COPY_FILES) {
      const path = fileURLToPath(new URL(relativePath, import.meta.url));
      const source = readFileSync(path, "utf8");

      expect(source, relativePath).not.toMatch(PUBLIC_RETIRED);
    }
  });

  it("allows the reignited BackstagePass brand in the admin shell but still blocks retired vault terms", () => {
    for (const relativePath of ADMIN_INTERNAL_FILES) {
      const path = fileURLToPath(new URL(relativePath, import.meta.url));
      const source = readFileSync(path, "utf8");

      expect(source, relativePath).not.toMatch(ADMIN_RETIRED);
    }
  });
});
