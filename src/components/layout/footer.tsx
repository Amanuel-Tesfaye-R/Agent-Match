export function Footer() {
  return (
    <footer className="grid-12 border-t mt-8">
      <div className="grid-cell" style={{ gridColumn: "span 2" }}>
        <small className="tracking-xl opacity-70 text-xs">Agent Match</small>
        <small className="ml-2 text-xs opacity-50">v1.0.0</small>
      </div>
      <div className="grid-cell" style={{ gridColumn: "span 4" }}>
        <small className="tracking-xl opacity-50 text-xs">
          Curated AI agent directory — updated regularly
        </small>
      </div>
      <div className="grid-cell" style={{ gridColumn: "span 3" }}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Suggest an Agent ↗
        </a>
      </div>
      <div className="grid-cell" style={{ gridColumn: "span 3" }}>
        <small className="text-xs opacity-50">
          Open Source · MIT License · 2026
        </small>
      </div>
    </footer>
  );
}
