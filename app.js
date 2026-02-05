(function () {
  'use strict';

  var card = document.getElementById('card');
  var cardWrapper = document.getElementById('cardWrapper');
  var heartsContainer = document.getElementById('hearts');
  var confettiCanvas = document.getElementById('confetti');
  var btnYes = document.getElementById('btnYes');
  var btnNo = document.getElementById('btnNo');

  function getToken() {
    var params = new URLSearchParams(window.location.search);
    return params.get('t') || '';
  }

  function initCard() {
    if (!card || !heartsContainer || !confettiCanvas) return;

    var heartCount = 8;
    for (var i = 0; i < heartCount; i++) {
      var el = document.createElement('span');
      el.textContent = '\u2665';
      el.style.animationDelay = i * 1.2 + 's';
      heartsContainer.appendChild(el);
    }

    if (btnYes) {
      btnYes.addEventListener('click', function () {
        if (card.classList.contains('is-open')) return;
        card.classList.add('is-open');
        runHeartsConfetti();
        sendFeedback();
      });
      btnYes.addEventListener('touchstart', function (e) {
        if (card.classList.contains('is-open')) return;
        e.preventDefault();
        card.classList.add('is-open');
        runHeartsConfetti();
        sendFeedback();
      }, { passive: false });
    }

    var btnDownload = document.getElementById('btnDownload');
    if (btnDownload) {
      function downloadPig(e) {
        e.preventDefault();
        fetch('images/pig.png')
          .then(function (res) { return res.blob(); })
          .then(function (blob) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'valentines-pig.png';
            a.click();
            URL.revokeObjectURL(url);
          })
          .catch(function () {
            window.open('images/pig.png', '_blank');
          });
      }
      btnDownload.addEventListener('click', downloadPig);
      btnDownload.addEventListener('touchstart', function (e) {
        e.preventDefault();
        downloadPig(e);
      }, { passive: false });
    }

    function sendFeedback() {
      var apiUrl = typeof window.VALENTINES_API_URL === 'string' && window.VALENTINES_API_URL.trim();
      var token = getToken();
      if (!apiUrl || !token) return;
      var url = apiUrl.replace(/\/$/, '') + '/api/opened';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
        keepalive: true
      }).catch(function () {});
    }

    function runHeartsConfetti() {
      var ctx = confettiCanvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = (confettiCanvas.width = window.innerWidth * dpr);
      var h = (confettiCanvas.height = window.innerHeight * dpr);
      ctx.scale(dpr, dpr);

      var colors = ['#ffb3c6', '#ff8fa3', '#ff6b8a', '#e91e63', '#ff4081', '#ffb6c1'];
      var pieces = [];
      var count = 60;

      for (var i = 0; i < count; i++) {
        pieces.push({
          x: w / (2 * dpr),
          y: h / (2 * dpr),
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.6) * 12,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 12 + Math.random() * 20,
          rotation: Math.random() * 360,
          spin: (Math.random() - 0.5) * 20
        });
      }

      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var elapsed = ts - start;
        var scale = 1 / dpr;
        ctx.clearRect(0, 0, w, h);

        for (var j = 0; j < pieces.length; j++) {
          var p = pieces[j];
          p.x += p.vx * scale;
          p.y += p.vy * scale;
          p.vy += 0.3 * scale;
          p.rotation += p.spin * scale;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.font = p.size + 'px "Press Start 2P", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('\u2665', 0, 0);
          ctx.restore();
        }

        if (elapsed < 2800) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    document.body.addEventListener('touchmove', function (e) {
      if (e.target === document.body || e.target === document.documentElement) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  initCard();
})();
