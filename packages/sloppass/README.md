# SlopPass

SlopPass is a scoped code-quality verdict engine for AI-generated code. It reports evidence-based slop signals in the target and scope for a run, including unified PR diffs. It is not a correctness certification, full test suite, or quality guarantee.

This package is a deliberately small promptfoo-derived engine. It keeps the useful 80/20 primitives:

- deterministic evaluation runner
- provider abstraction
- test schema
- report surface
- a small provider set
- unified-diff input with file and line evidence
- markdown build-fix prompts an agent can paste back into its work loop

It drops red-team and jailbreak modules, enterprise auth, plugin ecosystem, complex CLI flags, and the wide provider zoo.

See `docs/prd/sloppass-chunk2.md` for the locked scope contract.
