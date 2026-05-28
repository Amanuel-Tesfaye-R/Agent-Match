const FEATURES = [
  {
    title: "LLMs & Chat",
    desc: "General-purpose language models for reasoning, writing, coding, and conversation. GPT-4, Claude, Gemini, Llama, and more.",
  },
  {
    title: "Image Generation",
    desc: "Text-to-image and image-to-image models for art, design, marketing, and concept work. DALL-E, Midjourney, Flux, Stable Diffusion.",
  },
  {
    title: "Video Generation",
    desc: "From text to cinematic clips. Sora, Runway, Pika, Veo — generate, edit, and enhance videos with natural language prompts.",
  },
  {
    title: "Music & Audio",
    desc: "Full song generation, voice cloning, TTS, and audio production. Suno, Udio, ElevenLabs, AIVA for every sound need.",
  },
  {
    title: "Code & Development",
    desc: "AI coding agents that write, debug, refactor, and deploy. Copilot, Cursor, Devin, Claude Code, and the next generation of dev tools.",
  },
  {
    title: "Research & Search",
    desc: "Deep research agents, academic search, literature reviews, and evidence-based answers. Perplexity, Consensus, Elicit, NotebookLM.",
  },
];

export function FeaturesSection() {
  return (
    <div className="features-section my-8">
      <div className="grid-12">
        <div className="grid-cell border-b" style={{ gridColumn: "span 12" }}>
          <small className="tracking-xl font-bold text-xs">
            <span className="font-bold">Categories</span>
          </small>
        </div>
      </div>
      <div className="features-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-hover"></div>
            <div>
              <small className="feature-title mix-lighter">{f.title}</small>
              <p className="feature-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
