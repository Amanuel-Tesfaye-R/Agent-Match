document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cat-pill').forEach(p => {
    p.addEventListener('click', function () {
      document.querySelectorAll('.cat-pill').forEach(el => el.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
