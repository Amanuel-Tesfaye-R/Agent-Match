import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AgentTableSection } from "@/components/sections/agent-table";
import { AGENTS } from "@/data/agents";

export default function AgentsPage() {
  return (
    <div className="page-wrap">
      <Header />

      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mix-lighter leading-tight">
          Agent Directory
        </h1>
        <p className="max-w-[620px] mx-auto mt-4 mb-8 text-lg leading-relaxed opacity-60">
          Browse, search, and filter through {AGENTS.length} AI agents. Find
          the right tool for your workflow.
        </p>
      </div>

      <div className="grid-12">
        <div className="grid-cell" style={{ gridColumn: "span 12", padding: 0 }}>
          <AgentTableSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
