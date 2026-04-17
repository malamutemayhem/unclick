# Phase 5 Build Desk Foundation -- Automated Claude Code Runner
# Usage: Open PowerShell in your unclick repo directory, then run:
#   .\run-phase5.ps1
#
# This script feeds each chunk to Claude Code sequentially.
# After each chunk completes, it pauses for you to review before continuing.
# Press Enter to proceed to the next chunk, or type 'skip' to skip, or 'quit' to stop.

$ErrorActionPreference = "Stop"

$briefsDir = $PSScriptRoot
if (-not $briefsDir) { $briefsDir = "." }

$chunks = @(
    @{ file = "phase5-chunk0-agents-md.md";         desc = "Chunk 0: Create AGENTS.md and CLAUDE.md" },
    @{ file = "phase5-chunk1-memory-reliability.md"; desc = "Chunk 1: Memory reliability instrumentation" },
    @{ file = "phase5-chunk2-build-desk-scaffold.md"; desc = "Chunk 2: Build Desk admin surface scaffold" },
    @{ file = "phase5-chunk3-schema-and-api.md";     desc = "Chunk 3: Build Desk schema and API actions" },
    @{ file = "phase5-chunk4-docs-and-pr.md";        desc = "Chunk 4: Session docs, verification, and PR" }
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Phase 5: Build Desk Foundation" -ForegroundColor Cyan
Write-Host "  5 chunks to run sequentially" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check we're in the right repo
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not in a git repo. cd to your unclick-agent-native-endpoints directory first." -ForegroundColor Red
    exit 1
}

# Check claude is available
$claudePath = Get-Command claude -ErrorAction SilentlyContinue
if (-not $claudePath) {
    Write-Host "ERROR: 'claude' CLI not found. Make sure Claude Code is installed and in your PATH." -ForegroundColor Red
    exit 1
}

# Ensure we're on the right branch
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow

if ($currentBranch -ne "claude/phase-5-build-desk-foundation") {
    Write-Host "Creating and switching to claude/phase-5-build-desk-foundation..." -ForegroundColor Yellow

    # Make sure we have the deploy branch
    git fetch origin "claude/setup-malamute-mayhem-zkquO" 2>$null

    # Create the new branch off the deploy branch
    git checkout -b "claude/phase-5-build-desk-foundation" "origin/claude/setup-malamute-mayhem-zkquO" 2>$null
    if ($LASTEXITCODE -ne 0) {
        # Branch might already exist
        git checkout "claude/phase-5-build-desk-foundation" 2>$null
    }
}

Write-Host ""

for ($i = 0; $i -lt $chunks.Count; $i++) {
    $chunk = $chunks[$i]
    $filePath = Join-Path $briefsDir $chunk.file

    Write-Host "----------------------------------------" -ForegroundColor DarkGray
    Write-Host "[$($i+1)/$($chunks.Count)] $($chunk.desc)" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor DarkGray

    if (-not (Test-Path $filePath)) {
        Write-Host "WARNING: Brief file not found: $filePath" -ForegroundColor Red
        Write-Host "Skipping..." -ForegroundColor Yellow
        continue
    }

    # Prompt user
    Write-Host ""
    $response = Read-Host "Press Enter to run this chunk, 'skip' to skip, 'quit' to stop"

    if ($response -eq "quit") {
        Write-Host "Stopped by user." -ForegroundColor Yellow
        break
    }
    if ($response -eq "skip") {
        Write-Host "Skipped." -ForegroundColor Yellow
        continue
    }

    # Read the brief content
    $briefContent = Get-Content $filePath -Raw

    Write-Host "Sending to Claude Code..." -ForegroundColor Cyan
    Write-Host ""

    # Run Claude Code with the brief as the prompt
    $briefContent | claude --dangerously-skip-permissions

    Write-Host ""
    Write-Host "Chunk $($i+1) complete." -ForegroundColor Green

    # Show git status after each chunk
    Write-Host ""
    Write-Host "Git status:" -ForegroundColor Yellow
    git status --short
    Write-Host ""

    if ($i -lt $chunks.Count - 1) {
        Write-Host "Review the changes above before continuing to the next chunk." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Phase 5 automation complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review the PR on GitHub" -ForegroundColor White
Write-Host "  2. Check unclick.world/admin/build after deploy" -ForegroundColor White
Write-Host "  3. Report back to Cowork for Phase 6 planning" -ForegroundColor White
