export function Footer() {
  return (
    <footer className="grid-12 border-t mt-8">
      <div className="grid-cell" style={{ gridColumn: "span 3" }}>
        <small className="tracking-xl opacity-70 text-xs">Agent Match</small>
        <small className="ml-2 text-xs opacity-50">v1.0.0</small>
      </div>
      <div className="grid-cell" style={{ gridColumn: "span 3" }}>
        <small className="tracking-xl opacity-50 text-xs">
          Made by Amanuel Tesfaye
        </small>
      </div>
      <div className="grid-cell" style={{ gridColumn: "span 3" }}>
        <a
          href="https://github.com/Amanuel-Tesfaye-R/Agent-Match/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Suggest an Agent ↗
        </a>
      </div>
      <div className="grid-cell" style={{ gridColumn: "span 3" }}>
        <small className="text-xs opacity-50">
          MIT License · {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
}
