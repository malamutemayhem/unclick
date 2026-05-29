import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useSession } from "@/lib/auth";

const STORAGE_KEY = "unclick_beta_banner_dismissed";
const BANNER_H = 36;
const BANNER_H_PX = `${BANNER_H}px`;

function isDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function BetaBanner() {
  const enabled = import.meta.env.VITE_BETA_BANNER_ENABLED !== "false";
  const { session } = useSession();
  const [visible, setVisible] = useState(enabled && !isDismissed());

  useEffect(() => {
    document.documentElement.style.setProperty("--bbn-h", visible ? BANNER_H_PX : "0px");
    return () => {
      document.documentElement.style.setProperty("--bbn-h", "0px");
    };
  }, [visible]);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  const ctaHref = session ? "/admin/you" : "/signup";
  const ctaLabel = session ? "go to your dashboard" : "try it free";

  return (
    <div
      className="fixed inset-x-0 top-0 z-[70] flex items-center justify-center gap-2 border-b border-[#61C1C4]/20 bg-[#0D1A1A] px-10 sm:px-12"
      style={{ height: BANNER_H_PX }}
    >
      <p className="flex min-w-0 flex-wrap items-center justify-center gap-x-1 text-center text-[12px] leading-tight text-[#999]">
        <span className="mr-1" aria-hidden>&#9889;</span>
        <span className="font-medium text-[#ccc]">UnClick is in Beta.</span>
        <span className="hidden sm:inline">Free to try while we polish.</span>
        <Link
          to={ctaHref}
          className="inline-flex min-h-6 items-center rounded px-1 text-[#61C1C4] transition-colors hover:text-[#7dd4d7]"
        >
          {ctaLabel}
        </Link>
        <span className="hidden sm:inline">Spotted a bug?</span>
        <a
          href="mailto:bugs@unclick.world?subject=UnClick%20Beta%20Bug%20Report"
          className="inline-flex min-h-6 items-center rounded px-1 text-[#61C1C4] transition-colors hover:text-[#7dd4d7]"
        >
          Tell us.
        </a>
      </p>

      <button
        onClick={dismiss}
        aria-label="Dismiss beta banner"
        className="absolute right-3 flex h-6 w-6 items-center justify-center rounded text-[#555] transition-colors hover:text-[#999]"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
