import { useEffect, useState, useMemo } from "react";
import { Wrench, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnClickTools from "./tools/UnClickTools";
import ConnectedServices from "./tools/ConnectedServices";

interface Connector {
  id: string;
  name: string;
  icon?: string;
  category?: string;
  credential: { is_valid: boolean; last_tested_at: string | null } | null;
}

export default function AdminToolsPage() {
  const [metering, setMetering] = useState<Record<string, { count: number }>>({});
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = useMemo(() => localStorage.getItem("unclick_api_key") ?? "", []);

  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/memory-admin?action=admin_tools", {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (res.ok) {
          const body = await res.json();
          setMetering(body.metering ?? {});
          setConnectors(body.connectors ?? []);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [apiKey]);

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pb-32 pt-28">
          <p className="text-sm text-white/50">
            No API key found. Set your UnClick API key in Settings to access Tools Admin.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-32 pt-28">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <Wrench className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Tools</h1>
            <p className="text-sm text-white/50">Everything your agent can use through UnClick</p>
          </div>
        </div>

        {/* Section 1 - Your UnClick Tools */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-white">Your UnClick Tools</h2>
          <UnClickTools metering={metering} />
        </section>

        {/* Section 2 - Connected Services */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-white">Connected Services</h2>
          <ConnectedServices connectors={connectors} loading={loading} />
        </section>

        {/* Section 3 - Marketplace placeholder */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-white">Marketplace</h2>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-8 text-center">
            <Rocket className="mx-auto h-8 w-8 text-white/20 mb-3" />
            <p className="text-sm text-white/50">
              Community tools and custom integrations - coming soon.
            </p>
            <p className="mt-1 text-xs text-white/30">
              Build your own MCP tools or install from the UnClick marketplace.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
