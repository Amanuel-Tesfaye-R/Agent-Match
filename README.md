# Agent Match — AI Agent Explorer & Matchmaker

A curated directory of AI agents — LLMs, image generation, video creation, music, code assistants, research tools, and more. Built with a retro terminal-inspired UI.

Browse 90+ agents, filter by category or pricing, and click any agent to visit its website.

## Project Structure

```
├── index.html                # Home page — hero, terminal demo, agent table
├── agents.html               # Full agent directory with all columns
├── README.md
├── data/
│   └── agents.js             # All agent data (single source of truth)
├── css/
│   ├── style.css             # Aggregator — imports all partials
│   ├── base/                 # Variables, reset, typography, animations, layout
│   ├── components/           # Overlays, nav, hero, terminal, features, table, search, pills
│   └── pages/                # Page-specific styles (home.css, agents.css)
└── js/
    ├── main.js               # Shared: copyText, filterTable, searchTable, view logic
    ├── table-builder.js      # Builds HTML tables from data + column config
    └── pages/                # Page-specific scripts (agents.js)
```

## Architecture

- **CSS**: Modular partials imported via `style.css`. Base → Layout → Components → Pages.
- **JS**: Shared utilities in `main.js`, data in `data/agents.js`, table builder in `table-builder.js`.
- **Data**: All agents live in `data/agents.js`. Add, edit, or remove entries there — both pages update automatically.
- **Tables**: Built dynamically by `buildAgentTable()`. Each page passes a column config to control which columns render.

## Adding a New Agent

Open `data/agents.js` and add an object to the `AGENTS` array:

```js
{ name: 'Agent Name', category: 'Category', description: 'What it does', pricing: 'Free | Freemium | Paid', platform: 'Web, API, App', best_for: 'What it is best at', url: 'https://agent-website.com' }
```

The agent will appear on both pages on next reload.

## Adding a New Category

1. Add agents with the new `category` value in `data/agents.js`
2. Add a filter button in the HTML files:

```html
<button class="cat-pill" onclick="filterTable('CategoryName', this)">Category Name</button>
```

## Agent Data Fields

| Field       | Description                                  |
|-------------|----------------------------------------------|
| `name`      | Agent name                                   |
| `category`  | Category grouping (LLMs & Chat, Image Gen…)  |
| `description` | One-line capability summary                |
| `pricing`   | Free, Freemium, Paid, or Free (Open)         |
| `platform`  | Where it runs                                |
| `best_for`  | Best use case                                |
| `url`       | Official website — click to visit            |

## Customization

- **Colors**: Edit `css/base/variables.css` — all theme colors are CSS custom properties.
- **Fonts**: Imported via Google Fonts in `css/base/variables.css`.
- **Terminal animation**: Script data is in a `<script>` block at the bottom of `index.html`.

## Features

- Responsive layout with hamburger menu
- Terminal typing animation on home page
- Dynamic agent table with category and pricing filters
- Random 10-item preview with "View All / View Less" toggle
- Click agent name or row to visit its website (opens in new tab)
- Copy-to-clipboard for matchmaking commands
- Light / dark theme toggle

## License

MIT License
