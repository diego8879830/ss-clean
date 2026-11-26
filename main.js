/* ==========================================================================
   SS Clean Service & More — comportamiento
   Los datos editables están en content.js (window.SS_CONFIG).
   Si este archivo falla, la página sigue completa y usable.
   ========================================================================== */
(function () {
  'use strict';

  window.SS_READY = true;

  var CONFIG = window.SS_CONFIG || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function get(key) { return CONFIG[key] || {}; }
  function digits(str) { return String(str || '').replace(/\D/g, ''); }

  /* Número para "tel:" a partir del teléfono que se ve: (787) 000-0000 -> +17870000000 */
  function telHref() {
    var d = digits(get('telefono').valor);
    if (d.length === 10) d = '1' + d;
    return d ? 'tel:+' + d : '#contacto';
  }
  function waNumber() {
    var d = digits(get('whatsapp').valor);
    if (d.length === 10) d = '1' + d;
    return d;
  }
  function waHref(text) {
    var url = 'https://wa.me/' + waNumber();
    return text ? url + '?text=' + encodeURIComponent(text) : url;
  }

  /* ---------- 1. Aplicar content.js a la página ---------- */
  function applyConfig() {
    // Franja y nota de muestra
    if (CONFIG.modoMuestra === false) {
      $$('[data-muestra]').forEach(function (el) { el.hidden = true; });
    }

    // Textos: data-c="clave" toma el valor y se resalta mientras esté pendiente
    $$('[data-c]').forEach(function (el) {
      var item = get(el.getAttribute('data-c'));
      if (typeof item.valor === 'string' && item.valor) el.textContent = item.valor;
      el.classList.toggle('ph', item.pendiente !== false);
    });

    // Notas de ejemplo: se esconden cuando el dato ya no está pendiente
    $$('[data-nota]').forEach(function (el) {
      if (get(el.getAttribute('data-nota')).pendiente === false) el.hidden = true;
    });

    // Enlaces de teléfono, WhatsApp y correo
    $$('[data-link="tel"]').forEach(function (a) { a.href = telHref(); });
    $$('[data-link="wa"]').forEach(function (a) { a.href = waHref(); });
    $$('[data-link="wa-form"]').forEach(function (f) { f.action = waHref(); });
    $$('[data-link="mail"]').forEach(function (a) {
      var mail = get('correo').valor;
      if (mail) a.href = 'mailto:' + mail;
    });

    // Servicio de limpieza profunda: se puede esconder
    if (get('limpiezaProfunda').mostrar === false) {
      $$('[data-servicio="limpiezaProfunda"]').forEach(function (el) { el.hidden = true; });
    }

    // Pueblos
    var pueblos = get('pueblos').valor;
    var list = $('[data-pueblos]');
    if (list && Array.isArray(pueblos) && pueblos.length) {
      list.innerHTML = '';
      pueblos.forEach(function (name, i) {
        var li = document.createElement('li');
        li.className = 'town' + (i === 0 ? ' town-home' : '');
        if (i === 0) {
          li.innerHTML = '<svg class="i" aria-hidden="true"><use href="#i-pin"/></svg>';
        }
        li.appendChild(document.createTextNode(name));
        list.appendChild(li);
      });
    }

    // Fotos de la galería
    var fotos = get('fotos');
    if (Array.isArray(fotos.lista)) {
      $$('.gallery .shot').forEach(function (fig, i) {
        var f = fotos.lista[i];
        if (!f) return;
        var img = $('img', fig);
        if (f.src) img.src = f.src;
        if (f.alt) img.alt = (fotos.pendiente !== false ? 'Foto de ejemplo: ' : '') + f.alt;
        var cap = $('figcaption', fig);
        if (cap && f.titulo) {
          var cat = $('.shot-cat', cap);
          cap.textContent = '';
          if (cat) cap.appendChild(cat);
          cap.appendChild(document.createTextNode(f.titulo));
        }
      });
    }

    // Datos estructurados (JSON-LD): solo con datos confirmados
    var ld = $('#ld-business');
    if (ld) {
      try {
        var data = JSON.parse(ld.textContent);
        if (get('telefono').pendiente === false) data.telephone = '+' + digits(telHref());
        if (get('correo').pendiente === false) data.email = get('correo').valor;
        ld.textContent = JSON.stringify(data);
      } catch (e) { /* se deja como está */ }
    }
  }

  /* ---------- 2. Menú móvil ---------- */
  function setupMenu() {
    var btn = $('.menu-toggle');
    var nav = $('#menu');
    if (!btn || !nav) return;

    function setOpen(open, returnFocus) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
      if (open) {
        var first = $('a', nav);
        if (first) first.focus();
      } else if (returnFocus) {
        btn.focus();
      }
    }

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false, true);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) setOpen(false);
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- 3. Botones "Copiar" ---------- */
  function setupCopy() {
    var status = $('.copy-status');
    var timer;

    function announce(msg) {
      if (!status) return;
      status.textContent = msg;
      clearTimeout(timer);
      timer = setTimeout(function () { status.textContent = ''; }, 2500);
    }

    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    }

    $$('[data-copy]').forEach(function (btn) {
      var target = $(btn.getAttribute('data-copy'));
      if (!target) return;
      btn.hidden = false;
      var label = btn.lastChild;

      btn.addEventListener('click', function () {
        var text = target.textContent.trim();
        var done = function () {
          label.textContent = 'Copiado';
          announce('Copiado: ' + text);
          setTimeout(function () { label.textContent = 'Copiar'; }, 2000);
        };
        var fail = function () {
          if (fallbackCopy(text)) done();
          else announce('No se pudo copiar. Seleccione el texto y cópielo.');
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done, fail);
        } else {
          fail();
        }
      });
    });
  }

  /* ---------- 4. Formulario -> WhatsApp ---------- */
  function setupForm() {
    var form = $('#cotizacion');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var fd = new FormData(form);
      var lines = [
        'Hola, SS Clean Service & More. Quisiera pedir una cotización.',
        '',
        'Nombre: ' + (fd.get('nombre') || '').trim(),
        'Teléfono: ' + (fd.get('telefono') || '').trim(),
        'Servicio: ' + (fd.get('servicio') || '')
      ];
      var msg = (fd.get('text') || '').trim();
      if (msg) lines.push('Mensaje: ' + msg);

      // Se abre con un enlace temporal (con "noopener", window.open no permite saber si abrió)
      var a = document.createElement('a');
      a.href = waHref(lines.join('\n'));
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  applyConfig();
  setupMenu();
  setupCopy();
  setupForm();
})();
