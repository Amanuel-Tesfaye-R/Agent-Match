# NutriAgent — The Diet That Grows With You

A nutrition tracking and food calorie database website with a retro terminal-inspired UI.

## Project Structure

```
├── index.html                # Home page
├── calories.html             # Calorie database page
├── README.md
├── data/
│   └── foods.js              # All food data (single source of truth)
├── css/
│   ├── style.css             # Aggregator — imports all partials
│   ├── base/                 # Variables, reset, typography, animations, layout
│   ├── components/           # Overlays, nav, hero, terminal, features, table, search, pills
│   └── pages/                # Page-specific styles (home.css, calories.css)
└── js/
    ├── main.js               # Shared: copyText, filterTable, searchTable, view logic
    ├── table-builder.js      # Builds HTML tables from data + column config
    └── pages/                # Page-specific scripts (calories.js)
```

## Architecture

- **CSS**: Modular partials imported via `style.css`. Base → Layout → Components → Pages.
- **JS**: Shared utilities in `main.js`, data in `data/foods.js`, table builder in `table-builder.js`.
- **Data**: All food items live in `data/foods.js`. Add, edit, or remove items there — both pages update automatically.
- **Tables**: Built dynamically by `buildFoodTable()`. Each page passes a column config to control which columns render.

## Adding New Food Items

Open `data/foods.js` and add an object to the `FOODS` array:

```js
{ name: 'Food Name', category: 'Category', cal: 100, serving: 'Serving Size', ingredients: 'comma, separated, list' }
```

The item will appear on both pages on next reload.

## Adding a New Category

1. Add items with the new `category` value in `data/foods.js`
2. Add a filter button in the HTML files:

```html
<button class="cat-pill" onclick="filterTable('CategoryName', this)">Category Name</button>
```

## Customization

- **Colors**: Edit `css/base/variables.css` — all theme colors are CSS custom properties.
- **Fonts**: Imported via Google Fonts in `css/base/variables.css`.
- **Terminal animation**: Script data is in a `<script>` block at the bottom of `index.html`.

## Features

- Responsive layout with hamburger menu (breakpoint at 780px)
- Terminal typing animation on home page
- Dynamic food table with category filtering and search
- Random 10-item preview with "View All / View Less" toggle
- Copy-to-clipboard for code samples

## License


