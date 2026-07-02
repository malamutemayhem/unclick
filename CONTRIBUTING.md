# Contributing

## Licensing and the DCO

UnClick uses a split license (AGPL-3.0 platform, MIT/Apache packages). See
[LICENSING.md](./LICENSING.md) for the breakdown.

By contributing, you certify the [Developer Certificate of Origin](https://developercertificate.org/)
(DCO): you wrote the change or have the right to submit it under the license of
the component you are touching. Sign off each commit with `git commit -s`, which
adds a `Signed-off-by` line. Contributions are accepted under the license of the
component they touch, and this sign-off keeps a dual-licensing option open for
the project.

## Required CI Checks

The main merge rail is GitHub ruleset `16788514`. It requires the `Website (root package)` and `MCP server package` checks from `.github/workflows/ci.yml`.

Those jobs intentionally run on every pull request. If GitHub leaves either required check in `Expected` after a narrow change, do not bypass the rule. First confirm `.github/workflows/ci.yml` still has an unfiltered `pull_request` trigger. If the workflow is unfiltered, push an empty trigger commit to the pull request branch so GitHub re-evaluates the required checks:

```bash
git commit --allow-empty -m "chore: trigger required checks"
git push
```

If a workflow path filter is reintroduced later, it must include every path that can affect either required job, including `api/**`, `.github/workflows/ci.yml`, `package.json`, `package-lock.json`, `packages/**`, `scripts/**`, and `src/**`.
