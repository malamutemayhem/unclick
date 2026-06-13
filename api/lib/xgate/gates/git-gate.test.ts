import { describe, expect, it } from "vitest";
import type { GateContext, GateResult } from "../../types.js";
import {
  gitGate,
  isProtectedBranch,
  recommendBranchProtection,
  tokenizeShellCommand,
} from "./git-gate";

const FIXED_NOW = 1_700_000_000_000;

function ctx(raw: string, overrides: Partial<GateContext> = {}): GateContext {
  return {
    action: {
      class: "git",
      raw,
      tool: "shell",
      ...(overrides.action ?? {}),
    },
    environment: overrides.environment ?? "dev",
    autonomyLevel: overrides.autonomyLevel ?? "interactive",
    ownedFiles: overrides.ownedFiles,
    tainted: overrides.tainted,
    now: overrides.now ?? FIXED_NOW,
  };
}

function run(raw: string, overrides: Partial<GateContext> = {}): GateResult {
  return gitGate(ctx(raw, overrides));
}

describe("gitGate - force push to protected branches", () => {
  it("denies git push --force to main", () => {
    const r = run("git push --force origin main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
    expect(r.gate).toBe("GitGate");
  });

  it("denies git push -f to master", () => {
    const r = run("git push -f origin master");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });

  it("denies a bundled short flag like -fu to main", () => {
    const r = run("git push -fu origin main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });

  it("denies the + refspec force marker to a protected branch", () => {
    const r = run("git push origin +main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });

  it("denies force push to a release/* branch", () => {
    const r = run("git push --force origin release/2026-06");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });

  it("denies HEAD:main forced refspec", () => {
    const r = run("git push --force origin HEAD:refs/heads/main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });

  it("denies git push --all --force (blasts every branch)", () => {
    const r = run("git push --all --force origin");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });
});

describe("gitGate - force push to feature branches is allowed", () => {
  it("allows force-with-lease to a feature branch", () => {
    const r = run("git push --force-with-lease origin feature/login");
    expect(r.verdict).toBe("allow");
  });

  it("allows plain force to a non-protected feature branch", () => {
    const r = run("git push --force origin feature/login");
    expect(r.verdict).toBe("allow");
  });

  it("allows --force-with-lease with an explicit expected value", () => {
    const r = run("git push --force-with-lease=feature/x:abc123 origin feature/x");
    expect(r.verdict).toBe("allow");
  });
});

describe("gitGate - ordinary git operations are allowed", () => {
  it("allows a normal push to main (no force)", () => {
    const r = run("git push origin main");
    expect(r.verdict).toBe("allow");
  });

  it("allows a normal push to a feature branch", () => {
    const r = run("git push origin feature/y");
    expect(r.verdict).toBe("allow");
  });

  it("allows git add", () => {
    expect(run("git add -A").verdict).toBe("allow");
  });

  it("allows git commit with a $ in the message", () => {
    const r = run('git commit -m "fix $bug in handler"');
    expect(r.verdict).toBe("allow");
  });

  it("allows git push --dry-run --force to main (no remote change)", () => {
    const r = run("git push --dry-run --force origin main");
    expect(r.verdict).toBe("allow");
  });

  it("allows git push --all without force", () => {
    expect(run("git push --all origin").verdict).toBe("allow");
  });

  it("allows a soft reset", () => {
    expect(run("git reset --soft HEAD~1").verdict).toBe("allow");
  });

  it("abstains (allow) when the command is not git", () => {
    const r = run("npm run build");
    expect(r.verdict).toBe("allow");
    expect(r.ruleId).toBe("git.not_git_command");
  });
});

describe("gitGate - unparseable input fails closed to ask", () => {
  it("asks on an unterminated quote", () => {
    const r = run('git push --force origin "main');
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("git.unparseable");
  });

  it("asks on a dangling escape", () => {
    const r = run("git push --force origin main\\");
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("git.unparseable");
  });

  it("asks on a force push whose target is an unresolved expansion", () => {
    const r = run("git push --force origin $(cat target_branch)");
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("git.force_push_unresolved_target");
  });

  it("asks on a force push with no explicit branch (unknown upstream)", () => {
    const r = run("git push --force");
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("git.force_push_unknown_target");
  });
});

describe("gitGate - branch and ref deletion", () => {
  it("denies deleting main via git push :main", () => {
    const r = run("git push origin :main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.delete_protected_branch");
  });

  it("denies git push --delete origin master", () => {
    const r = run("git push --delete origin master");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.delete_protected_branch");
  });

  it("denies git branch -D main", () => {
    const r = run("git branch -D main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.delete_protected_branch");
  });

  it("allows git branch -D feature/old", () => {
    expect(run("git branch -D feature/old").verdict).toBe("allow");
  });

  it("allows deleting a non-protected remote branch", () => {
    expect(run("git push origin :feature/old").verdict).toBe("allow");
  });

  it("denies update-ref delete of a protected ref", () => {
    const r = run("git update-ref -d refs/heads/main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.update_ref_delete_protected");
  });
});

describe("gitGate - destructive ops scale by environment and autonomy", () => {
  it("asks on git reset --hard in interactive dev", () => {
    const r = run("git reset --hard HEAD~3", { environment: "dev", autonomyLevel: "interactive" });
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("git.reset_hard");
  });

  it("denies git reset --hard in prod", () => {
    const r = run("git reset --hard origin/main", { environment: "prod" });
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.reset_hard");
  });

  it("denies git reset --hard when unattended", () => {
    const r = run("git reset --hard", { environment: "dev", autonomyLevel: "unattended" });
    expect(r.verdict).toBe("deny");
  });

  it("asks on git clean -fdx in interactive dev, denies in prod", () => {
    expect(run("git clean -fdx").verdict).toBe("ask");
    expect(run("git clean -fdx", { environment: "prod" }).verdict).toBe("deny");
  });

  it("allows git clean --dry-run", () => {
    expect(run("git clean -n -d").verdict).toBe("allow");
  });

  it("asks on git filter-repo in dev, denies in prod", () => {
    expect(run("git filter-repo --path secrets --invert-paths").verdict).toBe("ask");
    expect(run("git filter-branch --tree-filter rm", { environment: "prod" }).verdict).toBe("deny");
  });

  it("force-with-lease to a protected branch asks in dev, denies in prod", () => {
    const dev = run("git push --force-with-lease origin main", { environment: "dev" });
    expect(dev.verdict).toBe("ask");
    expect(dev.ruleId).toBe("git.force_push_protected_lease");
    const prod = run("git push --force-with-lease origin main", { environment: "prod" });
    expect(prod.verdict).toBe("deny");
  });

  it("git push --mirror scales by environment", () => {
    expect(run("git push --mirror origin").verdict).toBe("ask");
    expect(run("git push --mirror origin", { autonomyLevel: "unattended" }).verdict).toBe("deny");
  });
});

describe("gitGate - chained commands and prefixes", () => {
  it("denies a force push hidden after a safe command", () => {
    const r = run("npm run build && git push --force origin main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });

  it("sees through env-var assignment and git global options", () => {
    const r = run("GIT_SSH_COMMAND='ssh -i k' git -c user.name=bot push --force origin main");
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });

  it("sees through a sudo prefix", () => {
    const r = run("sudo git push -f origin main");
    expect(r.verdict).toBe("deny");
  });

  it("takes the most restrictive verdict across segments", () => {
    const r = run("git push origin feature/x ; git push --force origin master");
    expect(r.verdict).toBe("deny");
  });
});

describe("gitGate - honours a pre-parsed argv", () => {
  it("uses ctx.action.parsed when provided", () => {
    const r = gitGate({
      action: { class: "git", raw: "", tool: "shell", parsed: ["git", "push", "--force", "origin", "main"] },
      environment: "dev",
      autonomyLevel: "interactive",
      now: FIXED_NOW,
    });
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("git.force_push_protected");
  });
});

describe("gitGate - evidence never leaks secrets", () => {
  it("masks a credential embedded in a push URL", () => {
    const r = run("git push --force https://user:ghp_abcdEFGH1234567890ZZ@github.com/o/r.git main");
    expect(r.verdict).toBe("deny");
    const joined = r.evidence.join(" ");
    expect(joined).not.toContain("ghp_abcdEFGH1234567890ZZ");
    expect(joined).toContain("***");
  });
});

describe("gitGate - never throws (defense in depth)", () => {
  it("returns a verdict for empty input rather than throwing", () => {
    expect(() => run("")).not.toThrow();
    expect(run("").verdict).toBe("allow");
  });

  it("tolerates a malformed context object", () => {
    // The gate must degrade gracefully, not throw, on unexpected shapes.
    const r = gitGate({} as unknown as GateContext);
    expect(["allow", "ask", "deny"]).toContain(r.verdict);
  });
});

describe("tokenizeShellCommand", () => {
  it("splits quoted arguments correctly", () => {
    expect(tokenizeShellCommand('git commit -m "a b c"')).toEqual(["git", "commit", "-m", "a b c"]);
  });

  it("emits control operators as standalone tokens", () => {
    expect(tokenizeShellCommand("a && b")).toEqual(["a", "&&", "b"]);
  });

  it("returns null on an unterminated quote", () => {
    expect(tokenizeShellCommand('git push "main')).toBeNull();
  });
});

describe("isProtectedBranch", () => {
  it("recognizes main, master, and release/*", () => {
    expect(isProtectedBranch("main")).toBe(true);
    expect(isProtectedBranch("master")).toBe(true);
    expect(isProtectedBranch("release/2026-q3")).toBe(true);
    expect(isProtectedBranch("refs/heads/main")).toBe(true);
    expect(isProtectedBranch("+main")).toBe(true);
  });

  it("treats feature branches as not protected", () => {
    expect(isProtectedBranch("feature/x")).toBe(false);
    expect(isProtectedBranch("develop")).toBe(false);
  });
});

describe("recommendBranchProtection", () => {
  it("recommends disabling force pushes and deletions on protected branches", () => {
    const recs = recommendBranchProtection();
    expect(recs.map((r) => r.branch)).toEqual(["main", "master", "release/*"]);
    for (const rec of recs) {
      expect(rec.settings.allow_force_pushes).toBe(false);
      expect(rec.settings.allow_deletions).toBe(false);
      expect(rec.settings.enforce_admins).toBe(true);
    }
  });

  it("accepts a custom branch list", () => {
    const recs = recommendBranchProtection(["main"]);
    expect(recs).toHaveLength(1);
    expect(recs[0].branch).toBe("main");
  });
});
