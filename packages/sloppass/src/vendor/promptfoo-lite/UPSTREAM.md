# promptfoo upstream tracking

This folder is the deliberately stripped promptfoo-derived vendor surface for SlopPass.

Upstream:

- Repository: https://github.com/promptfoo/promptfoo
- Baseline release: `promptfoo@0.121.9`
- Baseline commit: `195df77800b749679f73ed3f258d858d33d55b48`
- Import style: vendored snapshot, not a submodule
- Sync policy: no automatic sync

Selective upstream updates should use a temporary remote:

```bash
git remote add promptfoo https://github.com/promptfoo/promptfoo.git
npm run upstream:fetch --workspace=@unclick/sloppass
npm run upstream:log --workspace=@unclick/sloppass
```

Cherry-pick only the small primitives SlopPass keeps: eval runner concepts, provider abstraction, test schema, and report surface. Do not import promptfoo red-team or jailbreak modules, enterprise auth, plugin ecosystem, complex CLI flags, or the provider zoo.
