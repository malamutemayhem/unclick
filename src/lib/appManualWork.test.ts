import { describe, expect, it } from "vitest";
import { APP_CATALOG } from "@/lib/appCatalog";
import {
  connectorSetupFor,
  manualWorkFor,
  NEEDS_HUMAN_KINDS,
  type ManualWork,
} from "@/lib/appManualWork";

function classify(slug: string): ManualWork {
  const app = APP_CATALOG.find((a) => a.slug === slug);
  if (!app) throw new Error(`app ${slug} not in catalog`);
  return manualWorkFor(app);
}

describe("manualWorkFor", () => {
  it("classifies OAuth connectors as sign-in with a connect link", () => {
    for (const slug of ["github", "gmail", "google-drive", "dropbox", "vercel", "supabase"]) {
      const work = classify(slug);
      expect(work.kind, slug).toBe("signin");
      expect(work.url, slug).toBe(`/connect/${slug}`);
    }
  });

  it("classifies bot/app connectors as bot_setup", () => {
    for (const slug of ["telegram", "discord", "slack", "bluesky", "mastodon"]) {
      expect(classify(slug).kind, slug).toBe("bot_setup");
    }
  });

  it("classifies paste-key connectors as provider_key with a setup link", () => {
    for (const slug of ["stripe", "alphavantage", "notion", "openai", "lotr", "supercell", "email"]) {
      const work = classify(slug);
      expect(work.kind, slug).toBe("provider_key");
      expect(work.url, slug).toBeTruthy();
    }
  });

  it("follows the pandascore -> esports setup alias", () => {
    expect(connectorSetupFor("pandascore")?.envVar).toBe("PANDASCORE_TOKEN");
    expect(classify("pandascore").kind).toBe("provider_key");
  });

  it("marks operator env-var connectors as env_key", () => {
    for (const slug of ["abn", "bgg", "tab"]) {
      const work = classify(slug);
      expect(work.kind, slug).toBe("env_key");
      expect(work.label, slug).toMatch(/Operator/);
    }
  });

  it("treats optional-key apps as no manual work", () => {
    for (const slug of ["nasa", "coingecko", "nvd"]) {
      const work = classify(slug);
      expect(work.kind, slug).toBe("none");
      expect(work.optionalKey, slug).toBe(true);
    }
  });

  it("treats internal XPass tools as no external work", () => {
    for (const slug of ["testpass", "uxpass", "vault", "crews"]) {
      const work = classify(slug);
      expect(work.kind, slug).toBe("none");
      expect(work.internal, slug).toBe(true);
    }
  });

  it("treats offline utilities and free public APIs as none", () => {
    expect(classify("twosat").kind).toBe("none");
    expect(classify("adviceslip").kind).toBe("none");
  });

  it("classifies every catalog app without throwing", () => {
    const counts: Record<string, number> = {};
    for (const app of APP_CATALOG) {
      const work = manualWorkFor(app);
      counts[work.kind] = (counts[work.kind] ?? 0) + 1;
    }
    // Every kind the page filters on actually occurs in the catalog.
    for (const kind of NEEDS_HUMAN_KINDS) {
      expect(counts[kind], kind).toBeGreaterThan(0);
    }
    // Most of the catalog is offline utilities and free APIs.
    expect(counts.none).toBeGreaterThan(400);
  });
});
