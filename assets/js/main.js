/* Modus-Button. Der gewählte Modus überdauert das Neuladen, alles andere
   auf dieser Seite bleibt zustandslos. Gesetzt wird er bereits im head. */

document.getElementById('theme-toggle')?.addEventListener('click', function () {
  var root = document.documentElement;
  var isLight = root.getAttribute('data-theme') === 'light';

  if (isLight) {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', 'light');
  }

  try { localStorage.setItem('theme', isLight ? 'dark' : 'light'); } catch (e) {}
});

/* Kopierbuttons für alle Code-Blöcke.
   Der zu kopierende Text steht im Attribut data-copy des Buttons. */

document.querySelectorAll('.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var txt = btn.getAttribute('data-copy');

    var done = function () {
      var old = btn.textContent;
      btn.textContent = 'Kopiert';
      btn.classList.add('done');
      setTimeout(function () {
        btn.textContent = old;
        btn.classList.remove('done');
      }, 1600);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(done);
    } else {
      // Rückfallebene, etwa beim Öffnen der Datei ohne Server
      var ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  });
});
