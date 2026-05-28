import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { SplineDemoSection } from "@/components/sections/spline-demo";
import { FeaturesSection } from "@/components/sections/features";
import { AgentTableSection } from "@/components/sections/agent-table";

export default function HomePage() {
  return (
    <>
      <div className="page-wrap">
        <Header />

        <div className="grid-12">
          <div className="grid-cell" style={{ gridColumn: "span 12" }}>
            <HeroSection />
          </div>
        </div>

        <div className="grid-12">
          <div className="grid-cell" style={{ gridColumn: "span 12", padding: 0 }}>
            <SplineDemoSection />
          </div>
        </div>

        <FeaturesSection />

        <div className="grid-12">
          <div className="grid-cell" style={{ gridColumn: "span 12", padding: 0 }}>
            <AgentTableSection />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
