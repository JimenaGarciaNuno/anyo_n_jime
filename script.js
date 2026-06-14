/* anyo_n_jime — script.js
   All content comes from content.json — no code editing needed! */

const PIXEL_HEART_SM = `<svg width="16" height="14" viewBox="0 0 7 6" aria-hidden="true"><rect x="1" y="0" width="2" height="1" fill="#e02020"/><rect x="4" y="0" width="2" height="1" fill="#e02020"/><rect x="0" y="1" width="7" height="2" fill="#e02020"/><rect x="0" y="3" width="7" height="1" fill="#e02020"/><rect x="1" y="4" width="5" height="1" fill="#e02020"/><rect x="2" y="5" width="3" height="1" fill="#e02020"/></svg>`;

async function loadContent() {
  try {
    const res = await fetch('content.json');
    return await res.json();
  } catch {
    return null;
  }
}

function badge(author) {
  if (!author) return '';
  const a = author.toLowerCase();
  const cls = a === 'anya' ? 'badge-anya' : 'badge-jime';
  return `<span class="badge ${cls}">${author}</span>`;
}

function renderJournal(entries) {
  const el = document.getElementById('journal-entries');
  if (!entries || !entries.length) {
    el.innerHTML = `<div class="empty">${PIXEL_HEART_SM} no entries yet — write the first one! ${PIXEL_HEART_SM}</div>`;
    return;
  }
  el.innerHTML = [...entries].reverse().map(e => `
    <div class="card">
      <div class="card-meta">${e.date || ''}${badge(e.author)}</div>
      <p class="card-body">${e.text || ''}</p>
    </div>
  `).join('');
}

function renderGalleryUs(photos) {
  const el = document.getElementById('gallery-us');
  if (!photos || !photos.length) {
    el.innerHTML = `<div class="g-placeholder" style="grid-column:1/-1;aspect-ratio:2/1;font-size:16px">+ add photos via content.json</div>`;
    return;
  }
  el.innerHTML = photos.map(p => `
    <div>
      <div class="g-wrap">
        <img src="${p.src || ''}" alt="${p.caption || 'photo of us'}" loading="lazy"
             onerror="this.parentElement.style.background='var(--cream2)';this.style.display='none'" />
      </div>
      ${p.caption ? `<p class="g-caption">${p.caption}</p>` : ''}
      ${p.date ? `<p class="g-caption" style="font-style:normal">${p.date}</p>` : ''}
    </div>
  `).join('');
}

function renderGallery2(items) {
  const el = document.getElementById('gallery-descriptions');
  if (!items || !items.length) {
    el.innerHTML = `<div class="empty">${PIXEL_HEART_SM} no entries yet!</div>`;
    return;
  }
  el.innerHTML = [...items].reverse().map(item => `
    <div class="card">
      <div class="card-meta">${item.date || ''}${badge(item.author)}</div>
      <div class="card-title">${item.title || ''}</div>
      <p class="card-body">${item.description || ''}</p>
    </div>
  `).join('');
}

function renderPrompts(prompts) {
  const el = document.getElementById('prompts-list');
  if (!prompts || !prompts.length) {
    el.innerHTML = `<div class="empty">${PIXEL_HEART_SM} no prompts yet — add one in content.json!</div>`;
    return;
  }
  el.innerHTML = [...prompts].reverse().map((p, i) => `
    <div class="prompt-card">
      <span class="prompt-type">${p.type || 'prompt'}</span>
      <p class="prompt-q">${p.question || ''}</p>
      ${p.option_a && p.option_b ? `
        <div class="prompt-opts">
          <button class="po" onclick="pickPrompt(${i},'a',this)">${p.option_a}</button>
          <button class="po" onclick="pickPrompt(${i},'b',this)">${p.option_b}</button>
        </div>
        <div class="prompt-result" id="pr-${i}"></div>
      ` : ''}
      ${p.date ? `<div class="prompt-date">${p.date}</div>` : ''}
    </div>
  `).join('');
}

window.pickPrompt = function(idx, side, btn) {
  btn.closest('.prompt-opts').querySelectorAll('.po').forEach(b => b.classList.remove('pa','pb'));
  btn.classList.add(side === 'a' ? 'pa' : 'pb');
  const res = document.getElementById(`pr-${idx}`);
  res.style.display = 'block';
  res.innerHTML = `${PIXEL_HEART_SM} you picked: ${btn.textContent} — let's see what pookie picks`;
};

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`sec-${btn.dataset.section}`).classList.remove('hidden');
  });
});

(async () => {
  const data = await loadContent();
  if (!data) {
    document.querySelector('.container').innerHTML =
      '<div class="empty">could not load content.json — make sure it\'s in the same folder as index.html</div>';
    return;
  }
  renderJournal(data.journal);
  renderGalleryUs(data.gallery_us);
  renderGallery2(data.gallery_descriptions);
  renderPrompts(data.prompts);
})();
