/* =========================================================
 *  Fine Arts 瀑布流
 *  ---------------------------------------------------------
 *  依照 js/artworks.js 的清單產生作品，
 *  每張圖放進「目前最矮的那一欄」，排出左到右的瀑布流。
 *  欄數依螢幕寬度調整（COLUMNS），間距是 GAP。
 * ========================================================= */
(function () {
  const container = document.getElementById('masonry');
  if (!container || typeof ARTWORKS === 'undefined') return;

  const GAP = 14;
  const COLUMNS = [            // [最小螢幕寬度, 欄數]
    [1500, 5],
    [1100, 4],
    [700, 3],
    [0, 2],
  ];
  const LABELS = { sketch: '炭筆素描', watercolor: '水彩', gouache: '廣告顏料' };

  let filter = 'all';

  // ---- 1. 建立作品元素 ----
  const items = ARTWORKS.map((art, i) => {
    const fig = document.createElement('figure');
    fig.className = 'masonry__item';
    fig.tabIndex = 0;
    fig.dataset.category = art.category;
    fig.setAttribute('aria-label', art.title || LABELS[art.category] || '作品');

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = art.title || LABELS[art.category] || '';
    img.src = 'images/fine-arts/thumb/' + art.file;
    img.addEventListener('load', () => img.classList.add('is-loaded'));
    img.addEventListener('error', () => {           // 沒有縮圖就改用大圖
      if (!img.dataset.fallback) { img.dataset.fallback = 1; img.src = 'images/fine-arts/full/' + art.file; }
    });
    fig.appendChild(img);
    container.appendChild(fig);

    const open = () => {
      const visible = items.filter((it) => !it.hidden);
      const list = visible.map((it) => ({
        src: 'images/fine-arts/full/' + it.art.file,
        caption: it.art.title || LABELS[it.art.category] || '',
      }));
      Lightbox.open(list, visible.findIndex((it) => it.index === i));
    };
    fig.addEventListener('click', open);
    fig.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });

    return { el: fig, art, index: i, hidden: false };
  });

  // ---- 2. 排版 ----
  function columnCount() {
    const w = container.clientWidth;
    return COLUMNS.find(([min]) => w >= min)[1];
  }

  function layout() {
    const cols = columnCount();
    const colW = (container.clientWidth - GAP * (cols - 1)) / cols;
    const heights = new Array(cols).fill(0);

    items.forEach((it) => {
      if (it.hidden) {
        it.el.style.width = colW + 'px';
        return;
      }
      const h = colW * (it.art.h / it.art.w);
      const c = heights.indexOf(Math.min(...heights));
      const x = c * (colW + GAP);
      const y = heights[c];
      it.el.style.width = colW + 'px';
      it.el.style.height = h + 'px';
      it.el.style.transform = `translate(${x}px, ${y}px)`;
      heights[c] += h + GAP;
    });
    container.style.height = Math.max(...heights) - GAP + 'px';
  }

  // ---- 3. 分類篩選 ----
  const buttons = document.querySelectorAll('.filter');
  buttons.forEach((btn) => {
    const f = btn.dataset.filter;
    const count = f === 'all' ? items.length : items.filter((it) => it.art.category === f).length;
    const badge = btn.querySelector('.filter__count');
    if (badge) badge.textContent = count;
    if (count === 0 && f !== 'all') btn.hidden = true;

    btn.addEventListener('click', () => {
      filter = f;
      buttons.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', b === btn);
      });
      items.forEach((it) => {
        it.hidden = filter !== 'all' && it.art.category !== filter;
        it.el.classList.toggle('is-hidden', it.hidden);
      });
      layout();
    });
  });

  // ---- 4. 視窗大小改變時重排 ----
  let raf = null;
  new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(layout);
  }).observe(container);

  layout();
})();
