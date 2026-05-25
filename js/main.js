const STORAGE_KEY = 'nutriagent-theme';

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => applyTheme(getPreferredTheme()));

let isViewAll = false;
let currentFilter = 'all';

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.color = 'rgba(105, 183, 255, 1)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.color = '';
    }, 1500);
  });
}

function applyFilter() {
  const rows = document.querySelectorAll('#calorieTable tbody tr');
  const visible = [];
  rows.forEach(row => {
    let show = false;
    if (currentFilter === 'all') show = true;
    else if (currentFilter === 'low') show = parseInt(row.dataset.calories) < 50;
    else if (currentFilter === 'high') show = parseInt(row.dataset.calories) > 300;
    else show = row.dataset.category === currentFilter;
    row.style.display = show ? '' : 'none';
    if (show) visible.push(row);
  });

  if (!isViewAll) {
    visible.forEach(r => r.style.display = 'none');
    const shuffled = [...visible].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    selected.forEach(r => r.style.display = '');
  }

  const countEl = document.getElementById('visibleCount');
  if (countEl) countEl.textContent = isViewAll ? visible.length : Math.min(10, visible.length);

  const btn = document.getElementById('viewAllBtn');
  if (btn) {
    if (visible.length <= 10) {
      btn.style.display = 'none';
    } else {
      btn.style.display = '';
      btn.textContent = isViewAll ? 'View Less' : 'View All (' + visible.length + ' items)';
    }
  }
}

function filterTable(category, btn) {
  currentFilter = category;
  isViewAll = false;
  applyFilter();
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function searchTable(query) {
  const q = query.toLowerCase();
  const rows = document.querySelectorAll('#calorieTable tbody tr');
  const visible = [];
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const show = text.includes(q);
    row.style.display = show ? '' : 'none';
    if (show) visible.push(row);
  });

  if (!isViewAll) {
    visible.forEach(r => r.style.display = 'none');
    const shuffled = [...visible].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    selected.forEach(r => r.style.display = '');
  }

  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  const firstPill = document.querySelector('.cat-pill:first-child');
  if (firstPill) firstPill.classList.add('active');

  const countEl = document.getElementById('visibleCount');
  if (countEl) countEl.textContent = isViewAll ? visible.length : Math.min(10, visible.length);

  const btn = document.getElementById('viewAllBtn');
  if (btn) {
    if (visible.length <= 10) {
      btn.style.display = 'none';
    } else {
      btn.style.display = '';
      btn.textContent = isViewAll ? 'View Less' : 'View All (' + visible.length + ' items)';
    }
  }
}

function showRandomRows(count) {
  isViewAll = false;
  currentFilter = 'all';
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  const firstPill = document.querySelector('.cat-pill:first-child');
  if (firstPill) firstPill.classList.add('active');
  applyFilter();
}

function showAllRows() {
  isViewAll = true;
  const btn = document.getElementById('viewAllBtn');
  btn.textContent = 'View Less';
  btn.onclick = function() { showRandomRows(10); };
  applyFilter();
}
