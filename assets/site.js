// IELTS Band 8 site
(function () {
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
      Array.prototype.forEach.call(document.querySelectorAll('.vgroup'), function (g) { g.hidden = !g.querySelector('.vi:not([hidden])'); });
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
