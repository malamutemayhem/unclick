import { test } from "node:test";
import assert from "node:assert/strict";
import { gitProxyRemoteUrl, normalizeBase, ownerRepoFromGitUrl } from "./unclick-git-remote.mjs";

test("ownerRepoFromGitUrl parses common github remote shapes", () => {
  assert.equal(ownerRepoFromGitUrl("git@github.com:malamutemayhem/unclick.git"), "malamutemayhem/unclick");
  assert.equal(ownerRepoFromGitUrl("https://github.com/malamutemayhem/unclick.git"), "malamutemayhem/unclick");
  assert.equal(ownerRepoFromGitUrl("https://github.com/malamutemayhem/unclick"), "malamutemayhem/unclick");
  assert.equal(ownerRepoFromGitUrl("ssh://git@github.com/a/b.git"), "a/b");
});

test("ownerRepoFromGitUrl rejects malformed input", () => {
  assert.equal(ownerRepoFromGitUrl(""), "");
  assert.equal(ownerRepoFromGitUrl("not-a-url"), "");
  assert.equal(ownerRepoFromGitUrl("https://github.com/only-owner"), "");
});

test("gitProxyRemoteUrl builds the .git proxy URL the engine expects", () => {
  assert.equal(
    gitProxyRemoteUrl({ base: "https://unclick.world", ownerRepo: "malamutemayhem/unclick", apiKey: "uc_x" }),
    "https://unclick:uc_x@unclick.world/api/git-proxy/malamutemayhem/unclick.git",
  );
});

test("gitProxyRemoteUrl omits credentials when no key is given", () => {
  assert.equal(
    gitProxyRemoteUrl({ base: "https://unclick.world", ownerRepo: "a/b" }),
    "https://unclick.world/api/git-proxy/a/b.git",
  );
});

test("gitProxyRemoteUrl url-encodes the key and trims the base", () => {
  assert.equal(
    gitProxyRemoteUrl({ base: "https://my.host/", ownerRepo: "a/b", apiKey: "uc_a/b+c" }),
    "https://my.host/api/git-proxy/a/b.git".replace("https://my.host", "https://unclick:uc_a%2Fb%2Bc@my.host"),
  );
});

test("gitProxyRemoteUrl throws on a bad repo", () => {
  assert.throws(() => gitProxyRemoteUrl({ ownerRepo: "nope" }));
});

test("normalizeBase strips trailing slashes and defaults", () => {
  assert.equal(normalizeBase("https://unclick.world/"), "https://unclick.world");
  assert.equal(normalizeBase(""), "https://unclick.world");
});
