/* =========================================================
 *  首頁：Portfolio 的兩個 O 眼睛跟著滑鼠轉
 *  ---------------------------------------------------------
 *  MAX_X / MAX_Y：瞳孔最多可以移動多少（眼眶寬高的百分比）
 *  EASE：跟隨的滑順程度（0~1，越小越慢越黏）
 * ========================================================= */
(function () {
  const MAX_X = 0.14;
  const MAX_Y = 0.12;
  const EASE = 0.18;

  const eyes = Array.from(document.querySelectorAll('.eye')).map((el) => ({
    el,
    pupil: el.querySelector('.eye__pupil'),
    x: 0, y: 0,     // 目前位置
    tx: 0, ty: 0,   // 目標位置
  }));
  if (!eyes.length) return;

  let pointer = null;   // 最後一次滑鼠/手指位置
  let idleTimer = null;

  function aim(clientX, clientY) {
    eyes.forEach((eye) => {
      const r = eye.el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const angle = Math.atan2(dy, dx);
      // 離眼睛越遠看得越「用力」，大約 1/3 個螢幕寬就到極限
      const reach = Math.min(Math.hypot(dx, dy) / (window.innerWidth / 3), 1);
      eye.tx = Math.cos(angle) * reach * MAX_X * 100;
      eye.ty = Math.sin(angle) * reach * MAX_Y * 100;
    });
  }

  function onMove(e) {
    const p = e.touches ? e.touches[0] : e;
    pointer = { x: p.clientX, y: p.clientY };
    aim(pointer.x, pointer.y);
    // 一段時間沒動作就慢慢看回正前方
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => eyes.forEach((eye) => { eye.tx = 0; eye.ty = 0; }), 4000);
  }

  function tick() {
    eyes.forEach((eye) => {
      eye.x += (eye.tx - eye.x) * EASE;
      eye.y += (eye.ty - eye.y) * EASE;
      eye.pupil.style.transform = `translate3d(${eye.x.toFixed(2)}%, ${eye.y.toFixed(2)}%, 0)`;
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchstart', onMove, { passive: true });
  window.addEventListener('scroll', () => pointer && aim(pointer.x, pointer.y), { passive: true });
  // 滑鼠移到手寫選單上時，眼睛會盯著那個選項
  document.querySelectorAll('.hand-link').forEach((link) => {
    link.addEventListener('focus', () => {
      const r = link.getBoundingClientRect();
      aim(r.left + r.width / 2, r.top + r.height / 2);
    });
  });

  requestAnimationFrame(tick);
})();
