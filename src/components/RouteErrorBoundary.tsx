import { Component, type ErrorInfo, type ReactNode } from "react";
import { isChunkLoadError, recoverFromStaleChunk } from "@/lib/chunk-reload";

interface Props {
  children: ReactNode;
}

interface State {
  phase: "ok" | "reloading" | "failed";
}

/**
 * Catches render-time errors that Suspense cannot, the important one being a
 * rejected lazy() import after a deploy (a dead/404 chunk in a stale tab). For
 * a chunk-load error it self-heals by reloading once (loop-guarded); if a
 * reload was already tried it shows a friendly manual recovery card instead of
 * blanking to the navy canvas (the prior behaviour) or reloading forever. Any
 * other render error also lands on the card rather than an empty screen.
 */
class RouteErrorBoundary extends Component<Props, State> {
  state: State = { phase: "ok" };

  static getDerivedStateFromError(error: unknown): State {
    return { phase: isChunkLoadError(error) ? "reloading" : "failed" };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    if (isChunkLoadError(error)) {
      // Self-heal: pull the fresh index.html + new chunk hashes.
      const reloading = recoverFromStaleChunk();
      if (!reloading) this.setState({ phase: "failed" });
      return;
    }
    // Non-chunk render error: keep it visible in the console for diagnostics.
    console.error("RouteErrorBoundary caught a render error", error, info?.componentStack);
  }

  private readonly handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.phase === "reloading") {
      // A reload is in flight; show the same quiet spinner the route fallback
      // uses so there is no flash of error UI before the page swaps.
      return (
        <div className="flex min-h-screen items-center justify-center" aria-busy="true">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
        </div>
      );
    }

    if (this.state.phase === "failed") {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-semibold text-foreground">This page didn't load fully.</p>
          <p className="max-w-md text-sm text-muted-foreground">
            A new version of UnClick may have just shipped. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
