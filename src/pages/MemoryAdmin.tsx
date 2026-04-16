import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Shield, FileText, MessageSquare, BookOpen, Activity } from "lucide-react";
import StorageBar from "./admin/memory/StorageBar";
import ContextTab from "./admin/memory/ContextTab";
import FactsTab from "./admin/memory/FactsTab";
import SessionsTab from "./admin/memory/SessionsTab";
import LibraryTab from "./admin/memory/LibraryTab";
import MemoryActivityTab from "./admin/memory/MemoryActivityTab";

const TABS = [
  { id: "context", label: "Context", icon: Shield },
  { id: "facts", label: "Facts", icon: FileText },
  { id: "sessions", label: "Sessions", icon: MessageSquare },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "activity", label: "Activity", icon: Activity },
] as const;

type TabId = (typeof TABS)[number]["id"];

function isValidTab(value: string | null): value is TabId {
  return TABS.some((t) => t.id === value);
}

export default function MemoryAdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab");
  const activeTab: TabId = isValidTab(rawTab) ? rawTab : "context";

  const setTab = (tab: TabId) => {
    setSearchParams({ tab }, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-32 pt-28">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2B93B]/10 text-[#E2B93B]">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Memory Admin</h1>
            <p className="text-sm text-white/50">View and manage your agent's persistent memory</p>
          </div>
        </div>

        {/* Storage bar */}
        <StorageBar />

        {/* Tab bar */}
        <div className="mb-6 flex gap-0 border-b border-white/[0.06]">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#E2B93B]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E2B93B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "context" && <ContextTab />}
        {activeTab === "facts" && <FactsTab />}
        {activeTab === "sessions" && <SessionsTab />}
        {activeTab === "library" && <LibraryTab />}
        {activeTab === "activity" && <MemoryActivityTab />}
      </main>
      <Footer />
    </div>
  );
}
