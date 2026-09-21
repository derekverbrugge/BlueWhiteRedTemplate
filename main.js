/* Load header and footer partials, then wire up the Show More toggle */

async function loadPartial(url, targetId) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} loading ${url}`);
    const html = await res.text();
    document.getElementById(targetId).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

async function init() {
  await Promise.all([
    loadPartial('header.html', 'site-header'),
    loadPartial('footer.html', 'site-footer'),
  ]);

  /* Footer year */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Show More / Show Less toggle */
  const btn = document.getElementById('more-btn');
  const hiddenCards = document.querySelectorAll('.card-hidden');

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    btn.setAttribute('aria-expanded', String(expanded));

    const label = btn.querySelector('.more-btn-label');

    if (expanded) {
      hiddenCards.forEach((card, i) => {
        card.classList.add('visible');
        card.style.animationDelay = `${i * 60}ms`;
      });
      label.textContent = 'Show Fewer Templates';
    } else {
      hiddenCards.forEach(card => {
        card.classList.remove('visible');
        card.style.animationDelay = '0ms';
      });
      label.textContent = 'Show More Templates';
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
