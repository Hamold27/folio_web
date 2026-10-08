/* =========================================================
 *  Lightbox：點圖片放大檢視
 *  ---------------------------------------------------------
 *  - 一般頁面：任何 class="zoomable" 的 <img> 點了都會放大
 *  - Fine Arts 頁：gallery.js 會呼叫 Lightbox.open(list, index)
 *  - 支援 ← → 鍵盤切換、Esc 關閉、手機左右滑動
 * ========================================================= */
const Lightbox = (function () {
  let items = [];   // [{ src, caption }]
  let index = 0;
  let lastFocus = null;

  const root = document.createElement('div');
  root.className = 'lightbox';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = `
    <button class="lightbox__btn lightbox__close" aria-label="關閉">✕</button>
    <button class="lightbox__btn lightbox__prev" aria-label="上一張">‹</button>
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
    <button class="lightbox__btn lightbox__next" aria-label="下一張">›</button>`;
  document.body.appendChild(root);

  const img = root.querySelector('.lightbox__img');
  const caption = root.querySelector('.lightbox__caption');

  function render() {
    const item = items[index];
    img.src = item.src;
    img.alt = item.caption || '';
    caption.textContent = items.length > 1
      ? `${item.caption ? item.caption + '　' : ''}${index + 1} / ${items.length}`
      : (item.caption || '');
    // 預先載入下一張
    const next = items[(index + 1) % items.length];
    if (next) { const pre = new Image(); pre.src = next.src; }
  }

  function open(list, start) {
    items = list;
    index = start || 0;
    lastFocus = document.activeElement;
    root.classList.toggle('lightbox--single', items.length < 2);
    render();
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    root.querySelector('.lightbox__close').focus();
  }

  function close() {
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  function step(d) {
    if (items.length < 2) return;
    index = (index + d + items.length) % items.length;
    render();
  }

  root.querySelector('.lightbox__close').addEventListener('click', close);
  root.querySelector('.lightbox__prev').addEventListener('click', () => step(-1));
  root.querySelector('.lightbox__next').addEventListener('click', () => step(1));
  root.addEventListener('click', (e) => { if (e.target === root) close(); });

  document.addEventListener('keydown', (e) => {
    if (!root.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  // 手機滑動切換
  let startX = null;
  root.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    startX = null;
  });

  // 一般頁面的 .zoomable 圖片：同一頁的圖可以左右切換
  const zoomables = Array.from(document.querySelectorAll('img.zoomable'));
  if (zoomables.length) {
    const list = zoomables.map((el) => ({ src: el.currentSrc || el.src, caption: el.alt }));
    zoomables.forEach((el, i) => {
      el.tabIndex = 0;
      el.addEventListener('click', () => open(list, i));
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(list, i); });
    });
  }

  return { open, close };
})();
