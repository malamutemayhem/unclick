import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSession } from "@/lib/auth";

const BANNER_H = 40;
const BANNER_H_PX = `${BANNER_H}px`;

export default function BetaBanner() {
  const enabled = import.meta.env.VITE_BETA_BANNER_ENABLED !== "false";
  const { session } = useSession();

  useEffect(() => {
    document.documentElement.style.setProperty("--bbn-h", enabled ? BANNER_H_PX : "0px");
    return () => {
      document.documentElement.style.setProperty("--bbn-h", "0px");
    };
  }, [enabled]);

  if (!enabled) return null;

  const ctaHref = session ? "/admin/you" : "/signup";
  const ctaLabel = session ? "Go to your dashboard" : "Try it free";

  return (
    <div
      className="fixed inset-x-0 top-0 z-[70] box-border w-full border-b border-[rgba(134,218,221,0.15)] bg-[rgba(0,0,0,0.25)] px-4 py-[11px] text-center text-[13px] leading-[17px] text-[hsl(189_24%_68%)]"
      style={{ height: BANNER_H_PX }}
    >
      <p className="m-0">
        <span className="mr-1.5 text-[#ff7b2b]" aria-hidden>&#9889;</span>
        <span className="font-semibold text-heading">UnClick is in beta.</span>
        <span className="hidden sm:inline"> Free to try while we polish.</span>
        <Link
          to={ctaHref}
          className="ml-3 text-[#61C1C4] transition-colors hover:text-[#7dd4d7]"
        >
          {ctaLabel}
        </Link>
      </p>
    </div>
  );
}
