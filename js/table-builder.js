function buildFoodTable(tableId, data, columns) {
  const table = document.querySelector(tableId);
  if (!table) return;

  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');

  thead.innerHTML = '';
  tbody.innerHTML = '';

  const headerRow = document.createElement('tr');
  columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col.label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.dataset.category = item.category;
    tr.dataset.calories = item.cal;

    columns.forEach(col => {
      const td = document.createElement('td');
      const val = item[col.key];

      if (col.render) {
        td.innerHTML = col.render(val, item);
      } else {
        td.textContent = val ?? '';
      }

      if (col.className) {
        td.className = col.className;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}
