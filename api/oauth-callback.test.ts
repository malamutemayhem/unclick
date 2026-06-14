import { describe, expect, it } from "vitest";
import { resolveCredentialStorageBaseUrl } from "./oauth-callback.js";

describe("oauth callback credential storage origin", () => {
  it("uses the canonical production origin instead of the Vercel deployment host", () => {
    expect(
      resolveCredentialStorageBaseUrl({
        VERCEL_ENV: "production",
        VERCEL_URL: "unclick-git-main-example.vercel.app",
      } as NodeJS.ProcessEnv)
    ).toBe("https://unclick.world");
  });

  it("keeps preview callbacks on their own deployment host", () => {
    expect(
      resolveCredentialStorageBaseUrl({
        VERCEL_ENV: "preview",
        VERCEL_URL: "unclick-git-branch-example.vercel.app",
      } as NodeJS.ProcessEnv)
    ).toBe("https://unclick-git-branch-example.vercel.app");
  });

  it("allows an explicit app origin override", () => {
    expect(
      resolveCredentialStorageBaseUrl({
        VERCEL_ENV: "production",
        VERCEL_URL: "unclick-git-main-example.vercel.app",
        UNCLICK_APP_ORIGIN: "https://app.example.com/",
      } as NodeJS.ProcessEnv)
    ).toBe("https://app.example.com");
  });
});
