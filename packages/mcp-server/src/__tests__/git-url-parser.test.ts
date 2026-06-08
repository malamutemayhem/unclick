import { describe, it, expect } from "vitest";
import { GitUrlParser } from "../git-url-parser.js";

describe("GitUrlParser", () => {
  it("parses SSH URLs", () => {
    const result = GitUrlParser.parse("git@github.com:user/repo.git");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("ssh");
    expect(result!.host).toBe("github.com");
    expect(result!.owner).toBe("user");
    expect(result!.repo).toBe("repo");
  });

  it("parses HTTPS URLs", () => {
    const result = GitUrlParser.parse("https://github.com/user/repo");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https");
    expect(result!.owner).toBe("user");
    expect(result!.repo).toBe("repo");
  });

  it("parses URLs with .git suffix", () => {
    const result = GitUrlParser.parse("https://github.com/user/repo.git");
    expect(result!.repo).toBe("repo");
  });

  it("parses URLs with ref and filepath", () => {
    const result = GitUrlParser.parse("https://github.com/user/repo/tree/main/src/index.ts");
    expect(result!.ref).toBe("main");
    expect(result!.filepath).toBe("src/index.ts");
  });

  it("returns null for invalid URLs", () => {
    expect(GitUrlParser.parse("not-a-url")).toBeNull();
  });

  it("converts to HTTPS", () => {
    expect(GitUrlParser.toHttps("git@github.com:user/repo.git")).toBe("https://github.com/user/repo");
  });

  it("converts to SSH", () => {
    expect(GitUrlParser.toSsh("https://github.com/user/repo")).toBe("git@github.com:user/repo.git");
  });

  it("converts to clone URL", () => {
    expect(GitUrlParser.toCloneUrl("git@github.com:user/repo.git")).toBe("https://github.com/user/repo.git");
  });

  it("checks if string is git URL", () => {
    expect(GitUrlParser.isGitUrl("git@github.com:user/repo.git")).toBe(true);
    expect(GitUrlParser.isGitUrl("hello world")).toBe(false);
  });

  it("extracts owner and repo", () => {
    expect(GitUrlParser.owner("https://github.com/user/repo")).toBe("user");
    expect(GitUrlParser.repo("https://github.com/user/repo")).toBe("repo");
  });

  it("compares repos", () => {
    expect(GitUrlParser.sameRepo(
      "git@github.com:user/repo.git",
      "https://github.com/user/repo",
    )).toBe(true);
    expect(GitUrlParser.sameRepo(
      "https://github.com/user/repo1",
      "https://github.com/user/repo2",
    )).toBe(false);
  });
});
