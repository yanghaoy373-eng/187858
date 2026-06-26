const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('.filter')];
const dialog = document.getElementById('projectDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDesc = document.getElementById('dialogDesc');
const dialogTags = document.getElementById('dialogTags');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const cats = card.dataset.category.split(' ');
      card.classList.toggle('hide', !(filter === 'all' || cats.includes(filter)));
    });
  });
});

cards.forEach(card => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    dialogTitle.textContent = card.dataset.title;
    dialogDesc.textContent = card.dataset.desc;
    dialogTags.innerHTML = '';
    card.dataset.tags.split('/').map(t => t.trim()).filter(Boolean).forEach(t => {
      const span = document.createElement('span');
      span.textContent = t;
      dialogTags.appendChild(span);
    });
    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
