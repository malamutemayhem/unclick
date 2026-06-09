import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { checkEnvCredential } from "../keychain-secure-input.js";

describe("checkEnvCredential", () => {
  const SAVED: Record<string, string | undefined> = {};
  const TOUCHED_KEYS: string[] = [];

  function setEnv(key: string, value: string) {
    if (!(key in SAVED)) SAVED[key] = process.env[key];
    TOUCHED_KEYS.push(key);
    process.env[key] = value;
  }

  function clearEnv(key: string) {
    if (!(key in SAVED)) SAVED[key] = process.env[key];
    TOUCHED_KEYS.push(key);
    delete process.env[key];
  }

  beforeEach(() => {
    Object.keys(SAVED).forEach((k) => delete SAVED[k]);
    TOUCHED_KEYS.length = 0;
  });

  afterEach(() => {
    for (const key of TOUCHED_KEYS) {
      if (SAVED[key] === undefined) delete process.env[key];
      else process.env[key] = SAVED[key];
    }
  });

  it("finds GITHUB_TOKEN for github platform", () => {
    setEnv("GITHUB_TOKEN", "ghp_1234567890abcdef");
    expect(checkEnvCredential("github")).toBe("ghp_1234567890abcdef");
  });

  it("tries alternative env var names", () => {
    clearEnv("GITHUB_TOKEN");
    clearEnv("GITHUB_PAT");
    clearEnv("GITHUB_API_KEY");
    setEnv("GH_TOKEN", "gh_alt_token_value");
    expect(checkEnvCredential("github")).toBe("gh_alt_token_value");
  });

  it("returns first found from mapping order", () => {
    setEnv("GITHUB_TOKEN", "first_one_here");
    setEnv("GH_TOKEN", "second_one_here");
    expect(checkEnvCredential("github")).toBe("first_one_here");
  });

  it("returns null when no env var is set", () => {
    clearEnv("OPENAI_API_KEY");
    clearEnv("OPENAI_KEY");
    expect(checkEnvCredential("openai")).toBe(null);
  });

  it("rejects values shorter than 6 characters", () => {
    setEnv("STRIPE_SECRET_KEY", "short");
    clearEnv("STRIPE_API_KEY");
    clearEnv("STRIPE_KEY");
    expect(checkEnvCredential("stripe")).toBe(null);
  });

  it("accepts values with exactly 6 characters", () => {
    setEnv("STRIPE_SECRET_KEY", "abcdef");
    expect(checkEnvCredential("stripe")).toBe("abcdef");
  });

  it("falls back to generic pattern for unknown platforms", () => {
    setEnv("MYPLATFORM_API_KEY", "my_api_key_value_here");
    expect(checkEnvCredential("myplatform")).toBe("my_api_key_value_here");
  });

  it("tries PLATFORM_TOKEN as fallback for unknown platforms", () => {
    clearEnv("CUSTOM_API_KEY");
    setEnv("CUSTOM_TOKEN", "custom_token_value_here");
    expect(checkEnvCredential("custom")).toBe("custom_token_value_here");
  });

  it("returns null for unknown platform with no matching env vars", () => {
    clearEnv("ZZZZZ_API_KEY");
    clearEnv("ZZZZZ_TOKEN");
    expect(checkEnvCredential("zzzzz")).toBe(null);
  });

  it("detects Slack bot token", () => {
    setEnv("SLACK_BOT_TOKEN", "xoxb-slack-token-value");
    expect(checkEnvCredential("slack")).toBe("xoxb-slack-token-value");
  });

  it("detects Anthropic API key", () => {
    setEnv("ANTHROPIC_API_KEY", "sk-ant-test-key-value");
    expect(checkEnvCredential("anthropic")).toBe("sk-ant-test-key-value");
  });

  it("detects Supabase key", () => {
    setEnv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    expect(checkEnvCredential("supabase")).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
  });
});
