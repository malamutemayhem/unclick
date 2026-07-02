import { describe, expect, it } from "vitest";
import {
  buildForwardHeaders,
  COPIED_GIT_RESPONSE_HEADERS,
  FORWARDED_GIT_REQUEST_HEADERS,
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

  it("forwards Content-Encoding so a gzipped git pack body reaches GitHub intact", () => {
    const headers = buildForwardHeaders(
      { "content-type": "application/x-git-upload-pack-request", "content-encoding": "gzip" },
      "gh-token",
    );
    expect(headers["content-encoding"]).toBe("gzip");
    expect(headers["content-type"]).toBe("application/x-git-upload-pack-request");
  });

  it("forwards Git-Protocol so protocol v2 negotiation is preserved", () => {
    const headers = buildForwardHeaders({ "git-protocol": "version=2" }, "gh-token");
    expect(headers["git-protocol"]).toBe("version=2");
  });

  it("always replaces Authorization with the GitHub token and never forwards client auth", () => {
    const headers = buildForwardHeaders(
      { authorization: "Bearer uc_caller_key", cookie: "sb-session=secret", host: "evil.example" },
      "gh-token",
    );
    expect(headers.authorization).toBe(githubBasicAuthHeader("gh-token"));
    expect(headers.authorization).not.toContain("uc_caller_key");
    expect(headers).not.toHaveProperty("cookie");
    expect(headers).not.toHaveProperty("host");
  });

  it("collapses an array-valued header to its first value", () => {
    const headers = buildForwardHeaders({ accept: ["application/x-git-upload-pack-result", "*/*"] }, "gh-token");
    expect(headers.accept).toBe("application/x-git-upload-pack-result");
  });

  it("never copies content-length or content-encoding back on the response", () => {
    // The fetch runtime decompresses the upstream body, so echoing the upstream
    // (compressed) length or encoding would corrupt the git stream.
    expect(COPIED_GIT_RESPONSE_HEADERS).not.toContain("content-length");
    expect(COPIED_GIT_RESPONSE_HEADERS).not.toContain("content-encoding");
    expect(COPIED_GIT_RESPONSE_HEADERS).toContain("content-type");
  });

  it("keeps the request allowlist free of credential-bearing headers", () => {
    for (const banned of ["authorization", "cookie", "host", "content-length", "transfer-encoding"]) {
      expect(FORWARDED_GIT_REQUEST_HEADERS).not.toContain(banned);
    }
  });
});
