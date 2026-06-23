import { describe, expect, it } from "vitest";
import {
  githubBasicAuthHeader,
  githubRemoteUrl,
  gitProxyPathSegments,
  parseBasicAuth,
  repoAllowed,
  repoFromGitProxySegments,
  unclickApiKeyFromAuth,
  validateGitProxyPath,
} from "./lib/git-proxy";

describe("UnClick git proxy contract", () => {
  it("accepts a narrow UnClick key through Basic auth instead of a GitHub token", () => {
    const authorization = `Basic ${Buffer.from("unclick:uc_test_key").toString("base64")}`;

    expect(parseBasicAuth(authorization)).toEqual({
      username: "unclick",
      password: "uc_test_key",
    });
    expect(unclickApiKeyFromAuth({ authorization })).toBe("uc_test_key");
  });

  it("keeps GitHub auth server-side when forwarding upstream", () => {
    expect(githubBasicAuthHeader("gh-secret")).toBe(
      `Basic ${Buffer.from("x-access-token:gh-secret").toString("base64")}`,
    );
  });

  it("allows only Git smart HTTP discovery and pack endpoints", () => {
    const discovery = ["malamutemayhem", "unclick.git", "info", "refs"];
    const receivePack = ["malamutemayhem", "unclick.git", "git-receive-pack"];
    const randomPath = ["malamutemayhem", "unclick.git", "admin"];

    expect(validateGitProxyPath("GET", discovery, { service: "git-receive-pack" })).toEqual({ ok: true });
    expect(validateGitProxyPath("POST", receivePack, {})).toEqual({ ok: true });
    expect(validateGitProxyPath("POST", randomPath, {}).ok).toBe(false);
  });

  it("builds the upstream GitHub URL without forwarding the UnClick key", () => {
    const segments = gitProxyPathSegments(["malamutemayhem", "unclick.git", "info", "refs"]);

    expect(repoFromGitProxySegments(segments)).toBe("malamutemayhem/unclick");
    expect(githubRemoteUrl(segments, { service: "git-receive-pack", key: "uc_secret" })).toBe(
      "https://github.com/malamutemayhem/unclick.git/info/refs?service=git-receive-pack",
    );
  });

  it("supports an optional repo allowlist", () => {
    expect(repoAllowed("malamutemayhem/unclick", "")).toBe(true);
    expect(repoAllowed("malamutemayhem/unclick", "malamutemayhem/unclick")).toBe(true);
    expect(repoAllowed("other/repo", "malamutemayhem/unclick")).toBe(false);
  });
});
