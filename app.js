(function () {
  'use strict';

  const card = document.getElementById('card');
  const cardWrapper = document.getElementById('cardWrapper');
  const heartsContainer = document.getElementById('hearts');
  const confettiCanvas = document.getElementById('confetti');

  if (!card || !heartsContainer || !confettiCanvas) return;

  // --- Spawn background hearts (♥) ---
  const heartCount = 8;
  for (let i = 0; i < heartCount; i++) {
    const el = document.createElement('span');
    el.textContent = '♥';
    el.style.animationDelay = `${i * 1.2}s`;
    heartsContainer.appendChild(el);
  }

  // --- Tap/click: open card + confetti ---
  function openCard() {
    if (card.classList.contains('is-open')) return;
    card.classList.add('is-open');
    runConfetti();
  }

  cardWrapper.addEventListener('click', openCard);
  cardWrapper.addEventListener('touchstart', function (e) {
    e.preventDefault();
    openCard();
  }, { passive: false });

  // --- Confetti ---
  function runConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (confettiCanvas.width = window.innerWidth * dpr);
    const h = (confettiCanvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const colors = ['#ffb3c6', '#ff8fa3', '#ff6b8a', '#ff4081', '#fce4ec', '#fff'];
    const pieces = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: w / (2 * dpr),
        y: h / (2 * dpr),
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.6) * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 20,
      });
    }

    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const scale = 1 / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const p of pieces) {
        p.x += p.vx * scale;
        p.y += p.vy * scale;
        p.vy += 0.25 * scale;
        p.rotation += p.spin * scale;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      if (elapsed < 2200) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Prevent pull-to-refresh / overscroll on iOS when used as standalone
  document.body.addEventListener('touchmove', function (e) {
    if (e.target === document.body || e.target === document.documentElement) {
      e.preventDefault();
    }
  }, { passive: false });
})();
