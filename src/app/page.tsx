import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { SplineDemoSection } from "@/components/sections/spline-demo";
import { FeaturesSection } from "@/components/sections/features";
import { AgentTableSection } from "@/components/sections/agent-table";
import { RobotSection } from "@/components/sections/robot-section";

export default function HomePage() {
  return (
    <>
      <div className="page-wrap">
        <Header />

        {/* Hero + Robot side by side */}
        <div className="flex flex-col lg:flex-row border-b border-border my-8 lg:h-[580px]">
          <div className="flex-1 min-w-0">
            <HeroSection layout="split" />
          </div>
          <div className="w-full lg:w-[580px] shrink-0">
            <RobotSection />
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
