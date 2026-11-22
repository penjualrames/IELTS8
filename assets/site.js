// IELTS Band 8 site
(function () {

  // Accordion: every content box with a title collapses under its title
  var panel = document.querySelector('main .panel');
  if (panel) {
    var boxes = Array.prototype.filter.call(panel.querySelectorAll('.box'), function (b) {
      var h = b.querySelector(':scope > h3');
      return h && !b.classList.contains('blk') && !b.classList.contains('level');
    });
    boxes.forEach(function (b, i) {
      var h = b.querySelector(':scope > h3');
      var body = document.createElement('div');
      body.className = 'acc-body';
      while (h.nextSibling) body.appendChild(h.nextSibling);
      b.appendChild(body);
      b.classList.add('acc');
      h.classList.add('acc-h');
      h.setAttribute('role', 'button');
      h.setAttribute('tabindex', '0');
      h.setAttribute('aria-expanded', 'false');
      body.hidden = true;
      function toggle(open) {
        if (typeof open !== 'boolean') open = body.hidden;
        body.hidden = !open;
        h.setAttribute('aria-expanded', open ? 'true' : 'false');
        b.classList.toggle('open', open);
      }
      b._toggle = toggle;
      h.addEventListener('click', function (e) { if (e.target.closest('a')) return; toggle(); });
      h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
    if (boxes.length > 1) {
      var bar = document.createElement('div');
      bar.className = 'acc-bar';
      bar.innerHTML = '<span>' + boxes.length + ' bagian</span><button type="button" data-a="1">Buka semua</button><button type="button" data-a="0">Tutup semua</button>';
      bar.addEventListener('click', function (e) {
        var btn = e.target.closest('button'); if (!btn) return;
        var open = btn.dataset.a === '1';
        boxes.forEach(function (b) { b._toggle(open); });
      });
      var first = panel.querySelector('.banner');
      if (first) first.insertAdjacentElement('afterend', bar);
      else panel.insertBefore(bar, panel.firstChild);
    }
  }
  // Vocabulary search + word-type filter
  var q = document.getElementById('vsearch'), cnt = document.getElementById('vcount');
  if (q) {
    var pf = Array.prototype.slice.call(document.querySelectorAll('.posf button')), cur = '';
    function filt() {
      var t = q.value.trim().toLowerCase(), shown = 0;
      Array.prototype.forEach.call(document.querySelectorAll('.vi'), function (r) {
        var ok = (!t || r.dataset.text.indexOf(t) > -1) && (!cur || (' ' + r.dataset.pos + ' ').indexOf(' ' + cur + ' ') > -1);
        r.hidden = !ok; if (ok) shown++;
      });
      Array.prototype.forEach.call(document.querySelectorAll('.vgroup'), function (g) { var has = !!g.querySelector('.vi:not([hidden])'); g.hidden = !has; if (g._toggle && (t || cur)) g._toggle(has); });
      if (cnt) cnt.textContent = shown + ' kata';
    }
    q.addEventListener('input', filt);
    pf.forEach(function (b) {
      b.addEventListener('click', function () {
        cur = b.dataset.pos === cur ? '' : b.dataset.pos;
        pf.forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.pos === cur ? 'true' : 'false'); });
        filt();
      });
    });
    filt();
  }
})();
