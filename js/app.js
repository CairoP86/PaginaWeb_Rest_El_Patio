(function () {
  "use strict";

  var CURRENT_LANG = 'es';
  /* WhatsApp (pedidos y reservas desde la web). Teléfono fijo en página: 4034 6245 */
  var WA_NUMBER = "50683180049";
  var STORAGE_KEY = "elpatio-cart-v1";

  function formatCRC(n) {
    if (!n || n <= 0) return "Consultar";
    return "₡" + n.toLocaleString("es-CR");
  }

  function tagEmoji() {
    return "";
  }

  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(lines) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }

  function cartLineKey(line) {
    var opt = line.options && line.options.length ? line.options.slice().sort().join(",") : "";
    return line.id + "|" + opt;
  }

  function addToCart(item, categoryTitle, extraOptions) {
    var lines = loadCart();
    var id =
      categoryTitle.replace(/\s+/g, "-").toLowerCase() +
      "--" +
      item.name.replace(/\s+/g, "-").toLowerCase();
    var opts = extraOptions || [];
    var key = id + "|" + opts.slice().sort().join(",");
    var found = lines.find(function (l) {
      return cartLineKey(l) === key;
    });
    if (found) {
      found.qty += 1;
    } else {
      lines.push({
        id: id,
        name: item.name,
        price: item.price,
        category: categoryTitle,
        qty: 1,
        options: opts
      });
    }
    saveCart(lines);
    updateCartUI();
    openCart();
  }

  function setQty(key, qty) {
    var lines = loadCart();
    var line = lines.find(function (l) {
      return cartLineKey(l) === key;
    });
    if (!line) return;
    line.qty = qty;
    if (line.qty <= 0) {
      lines = lines.filter(function (l) {
        return cartLineKey(l) !== key;
      });
    }
    saveCart(lines);
    updateCartUI();
  }

  function cartTotal(lines) {
    return lines.reduce(function (sum, l) {
      var optExtra = 0;
      if (l.options && MENU_OPTIONS_PRICES) {
        l.options.forEach(function (o) {
          if (MENU_OPTIONS_PRICES[o]) optExtra += MENU_OPTIONS_PRICES[o];
        });
      }
      return sum + (l.price + optExtra) * l.qty;
    }, 0);
  }

  var MENU_OPTIONS_PRICES = {
    "extra-carne": 2000,
    "doble-proteina": 2000
  };

  function updateCartUI() {
    var lines = loadCart();
    var count = lines.reduce(function (s, l) {
      return s + l.qty;
    }, 0);
    var fab = document.getElementById("cart-fab");
    var badge = document.getElementById("cart-count");
    if (badge) badge.textContent = count;
    if (fab) fab.disabled = count === 0;

    var listEl = document.getElementById("cart-lines");
    var totalEl = document.getElementById("cart-total-amount");
    if (!listEl || !totalEl) return;

    if (lines.length === 0) {
      listEl.innerHTML = "<p>Tu carrito está vacío. Agrega platos desde el menú.</p>";
      totalEl.textContent = formatCRC(0);
      return;
    }

    listEl.innerHTML = lines
      .map(function (line) {
        var optExtra = 0;
        var optLabel = "";
        if (line.options && line.options.length) {
          line.options.forEach(function (o) {
            if (MENU_OPTIONS_PRICES[o]) {
              optExtra += MENU_OPTIONS_PRICES[o];
              optLabel += " +" + formatCRC(MENU_OPTIONS_PRICES[o]) + " (" + o + ")";
            }
          });
        }
        var unit = line.price + optExtra;
        var key = cartLineKey(line);
        return (
          '<div class="cart-line">' +
          "<div>" +
          "<strong>" +
          escapeHtml(line.name) +
          "</strong>" +
          (optLabel ? "<br><small>" + escapeHtml(optLabel) + "</small>" : "") +
          '<div class="cart-controls" style="margin-top:0.5rem">' +
          '<button type="button" data-qty="-1" data-key="' +
          escapeAttr(key) +
          '" aria-label="Menos">-</button>' +
          "<span>" +
          line.qty +
          "</span>" +
          '<button type="button" data-qty="1" data-key="' +
          escapeAttr(key) +
          '" aria-label="Más">+</button>' +
          "</div></div>" +
          "<div>" +
          formatCRC(unit * line.qty) +
          "</div></div>"
        );
      })
      .join("");

    totalEl.textContent = formatCRC(cartTotal(lines));

    listEl.querySelectorAll("button[data-key]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-key");
        var delta = parseInt(btn.getAttribute("data-qty"), 10);
        var line = lines.find(function (l) {
          return cartLineKey(l) === key;
        });
        if (!line) return;
        setQty(key, line.qty + delta);
      });
    });
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    return s.replace(/"/g, "&quot;");
  }

  function openCart() {
    var m = document.getElementById("cart-modal");
    if (m) {
      m.classList.add("is-open");
      m.setAttribute("aria-hidden", "false");
    }
  }

  function closeCart() {
    var m = document.getElementById("cart-modal");
    if (m) {
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden", "true");
    }
  }

  function whatsappOrder() {
    var lines = loadCart();
    if (!lines.length) return;
    var total = cartTotal(lines);
    var parts = [
      "¡Hola! Pedido desde la web de *Restaurante El Patio*:",
      "",
      lines
        .map(function (l, i) {
          var optExtra = 0;
          var extra = "";
          if (l.options && l.options.length) {
            l.options.forEach(function (o) {
              if (MENU_OPTIONS_PRICES[o]) {
                optExtra += MENU_OPTIONS_PRICES[o];
                extra += " (+" + formatCRC(MENU_OPTIONS_PRICES[o]) + ")";
              }
            });
          }
          return (
            i +
            1 +
            ". " +
            l.name +
            (l.options && l.options.length ? " (" + l.options.join(", ") + ")" : "") +
            " x" +
            l.qty +
            " — " +
            formatCRC((l.price + optExtra) * l.qty)
          );
        })
        .join("\n"),
      "",
      "*Total estimado:* " + formatCRC(total),
      "",
      "_Precios no incluyen 10% servicio. Empaque para llevar ₡300._"
    ];
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(parts.join("\n"));
    window.open(url, "_blank");
  }

  function whatsappReserve(e) {
    e.preventDefault();
    var form = document.getElementById("form-reserva");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var fd = new FormData(form);
    var name = fd.get("nombre");
    var tel = fd.get("telefono");
    var fecha = fd.get("fecha");
    var hora = fd.get("hora");
    var personas = fd.get("personas");
    var notas = fd.get("notas") || "";
    var msg = [
      "Hola, quiero *reservar mesa* en Restaurante El Patio:",
      "",
      "*Nombre:* " + name,
      "*Teléfono:* " + tel,
      "*Fecha:* " + fecha,
      "*Hora:* " + hora,
      "*Personas:* " + personas,
      notas ? "*Notas:* " + notas : ""
    ]
      .filter(Boolean)
      .join("\n");
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
  }

  function renderMenu(filterId) {
    var root = document.getElementById("menu-root");
    if (!root || !window.MENU_DATA) return;

    var trans = window.TRANSLATIONS[CURRENT_LANG] || window.TRANSLATIONS.es;
    var actionText = (trans.menu && trans.menu.addToCart) ? trans.menu.addToCart : 'Agregar al pedido';

    root.innerHTML = MENU_DATA.map(function (cat, catIndex) {
      if (filterId && filterId !== "all" && cat.id !== filterId) return "";

      var itemsHtml = cat.items
        .map(function (item, itemIndex) {
          var canAdd = item.price > 0;
          var optionsHtml = "";
          if (item.options && item.options.length) {
            var inputType = item.options.every(opt => opt.price === 0) ? 'radio' : 'checkbox';
            var nameAttr = inputType === 'radio' ? ' name="options-' + catIndex + '-' + itemIndex + '"' : '';
            optionsHtml =
              '<div class="option-row">' +
              item.options
                .map(function (opt) {
                  return (
                    '<label><input type="' + inputType + '" class="opt-extra" data-opt="' +
                    escapeAttr(opt.id) + '"' + nameAttr + '> ' +
                    escapeHtml(opt.label) +
                    (opt.price > 0 ? " (" + formatCRC(opt.price) + ")" : "") +
                    "</label>"
                  );
                })
                .join("") +
              "</div>";
          }

          return (
            '<article class="menu-item" data-category="' +
            escapeAttr(cat.id) +
            '">' +
            '<div class="menu-item-top">' +
            '<span class="tag-icon">' +
            tagEmoji(item.tags) +
            "</span>" +
            "<h4>" +
            escapeHtml(item.name) +
            "</h4>" +
            "</div>" +
            '<p class="price">' +
            formatCRC(item.price) +
            "</p>" +
            (item.desc ? '<p class="desc">' + escapeHtml(item.desc) + "</p>" : "") +
            optionsHtml +
            (canAdd
              ? '<div class="menu-actions"><button type="button" class="btn btn-outline add-to-cart" data-cat-title="' +
                escapeAttr(cat.title) +
                '" data-cat-index="' +
                catIndex +
                '" data-item-index="' +
                itemIndex +
                '">' + escapeHtml(actionText) + '</button></div>'
              : "") +
            "</article>"
          );
        })
        .join("");

      return (
        '<section class="menu-category" id="cat-' +
        escapeAttr(cat.id) +
        '">' +
        "<h3>" +
        escapeHtml(cat.title) +
        "</h3>" +
        (cat.note ? '<p class="menu-note">' + escapeHtml(cat.note) + "</p>" : "") +
        itemsHtml +
        "</section>"
      );
    }).join("");

    root.querySelectorAll(".add-to-cart").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ci = parseInt(btn.getAttribute("data-cat-index"), 10);
        var ii = parseInt(btn.getAttribute("data-item-index"), 10);
        var catTitle = btn.getAttribute("data-cat-title");
        var cat = MENU_DATA[ci];
        if (!cat || !cat.items[ii]) return;
        var item = cat.items[ii];
        var parent = btn.closest(".menu-item");
        var extras = [];
        if (parent) {
          parent.querySelectorAll(".opt-extra:checked").forEach(function (cb) {
            var optId = cb.getAttribute("data-opt");
            var opt = item.options.find(o => o.id === optId);
            if (opt) extras.push(opt.label);
          });
        }
        addToCart(item, catTitle, extras);
      });
    });
  }

  function initFilters() {
    var filters = document.getElementById("menu-filters");
    if (!filters || !MENU_DATA) return;
    var langTrans = window.TRANSLATIONS[CURRENT_LANG] || window.TRANSLATIONS.es;
    var allTitle = langTrans.menu && langTrans.menu.all ? langTrans.menu.all : "Todo el menú";
    var allCats = [{ id: "all", title: allTitle }].concat(
      MENU_DATA.map(function (c) {
        return { id: c.id, title: c.title };
      })
    );
    filters.innerHTML = allCats
      .map(function (c, i) {
        return (
          '<button type="button" class="filter-btn' +
          (i === 0 ? " is-active" : "") +
          '" data-filter="' +
          c.id +
          '">' +
          c.title +
          "</button>"
        );
      })
      .join("");

    filters.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        var id = btn.getAttribute("data-filter");
        if (id === "all") {
          renderMenu(null);
        } else {
          renderMenu(id);
        }
      });
    });
  }

  function initLightbox() {
    var lb = document.getElementById("lightbox");
    var imgEl = document.getElementById("lightbox-img");
    var closeBtn = document.getElementById("lightbox-close");
    if (!lb || !imgEl) return;

    function openLightbox(src, alt) {
      imgEl.src = src;
      imgEl.alt = alt || "";
      lb.hidden = false;
      lb.setAttribute("aria-hidden", "false");
      requestAnimationFrame(function () {
        lb.classList.add("is-open");
      });
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      imgEl.removeAttribute("src");
      imgEl.alt = "";
      window.setTimeout(function () {
        lb.hidden = true;
      }, 200);
    }

    document.querySelectorAll(".gallery-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var full = btn.getAttribute("data-full");
        var thumb = btn.querySelector("img");
        var src = full || (thumb && thumb.getAttribute("src"));
        var alt = thumb ? thumb.getAttribute("alt") : "";
        if (src) openLightbox(src, alt);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("is-open")) closeLightbox();
    });
  }

  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function initLanguage() {
    var currentLang = localStorage.getItem('lang') || 'es';
    setLanguage(currentLang);

    document.getElementById('lang-es').addEventListener('click', function() {
      setLanguage('es');
    });
    document.getElementById('lang-en').addEventListener('click', function() {
      setLanguage('en');
    });
    document.getElementById('lang-es-mobile').addEventListener('click', function() {
      setLanguage('es');
    });
    document.getElementById('lang-en-mobile').addEventListener('click', function() {
      setLanguage('en');
    });
  }

  function setLanguage(lang) {
    CURRENT_LANG = lang;
    localStorage.setItem('lang', lang);
    var trans = window.TRANSLATIONS[lang];
    if (!trans) return;

    // Update nav
    document.getElementById('nav-inicio').textContent = trans.nav.inicio;
    document.getElementById('nav-servicios').textContent = trans.nav.servicios;
    document.getElementById('nav-menu').textContent = trans.nav.menu;
    document.getElementById('nav-galeria').textContent = trans.nav.galeria;
    document.getElementById('nav-reservas').textContent = trans.nav.reservas;
    document.getElementById('nav-pedido').textContent = trans.nav.pedido;
    document.getElementById('nav-contacto').textContent = trans.nav.contacto;

    // Update hero
    document.getElementById('hero-title').textContent = trans.hero.title;
    document.getElementById('hero-lead').textContent = trans.hero.lead;
    document.getElementById('hero-btn-reservar').textContent = trans.hero.btnReservar;
    document.getElementById('hero-btn-menu').textContent = trans.hero.btnMenu;

    // Update servicios
    document.getElementById('servicios-title').textContent = trans.servicios.title;
    document.getElementById('servicios-subtitle').textContent = trans.servicios.subtitle;
    document.getElementById('servicios-feature1').textContent = trans.servicios.feature1;
    document.getElementById('servicios-desc1').textContent = trans.servicios.desc1;
    document.getElementById('servicios-feature2').textContent = trans.servicios.feature2;
    document.getElementById('servicios-desc2').textContent = trans.servicios.desc2;
    document.getElementById('servicios-feature3').textContent = trans.servicios.feature3;
    document.getElementById('servicios-desc3').textContent = trans.servicios.desc3;

    // Update nosotros
    document.getElementById('nosotros-title').textContent = trans.nosotros.title;
    document.getElementById('nosotros-desc').innerHTML = trans.nosotros.desc;
    document.getElementById('nosotros-precio').innerHTML = trans.nosotros.precio;
    document.getElementById('nosotros-btn-menu').textContent = trans.nosotros.btnMenu;

    // Update menu
    document.getElementById('menu-title').textContent = trans.menu.title;
    document.getElementById('menu-note').innerHTML = trans.menu.note;

    // Update galeria
    document.getElementById('galeria-title').textContent = trans.galeria.title;
    document.getElementById('galeria-desc').textContent = trans.galeria.desc;

    // Update reservas
    document.getElementById('reservas-title').textContent = trans.reservas.title;
    document.getElementById('reservas-desc').innerHTML = trans.reservas.desc;
    document.getElementById('reservas-form-title').textContent = trans.reservas.formTitle;
    document.getElementById('reservas-nombre').textContent = trans.reservas.nombre;
    document.getElementById('reservas-telefono').textContent = trans.reservas.telefono;
    document.getElementById('reservas-fecha').textContent = trans.reservas.fecha;
    document.getElementById('reservas-hora').textContent = trans.reservas.hora;
    document.getElementById('reservas-personas').textContent = trans.reservas.personas;
    document.getElementById('reservas-notas').textContent = trans.reservas.notas;
    document.getElementById('notas').placeholder = trans.reservas.placeholderNotas;
    document.getElementById('reservas-btn-enviar').textContent = trans.reservas.btnEnviar;

    // Update pedido
    document.getElementById('pedido-title').textContent = trans.pedido.title;
    document.getElementById('pedido-desc').innerHTML = trans.pedido.desc;
    document.getElementById('pedido-how-title').textContent = trans.pedido.howTitle;
    document.getElementById('pedido-step1').textContent = trans.pedido.step1;
    document.getElementById('pedido-step2').textContent = trans.pedido.step2;
    document.getElementById('pedido-step3').textContent = trans.pedido.step3;
    document.getElementById('pedido-note').textContent = trans.pedido.note;

    // Update contacto
    document.getElementById('contacto-title').textContent = trans.contacto.title;
    document.getElementById('contacto-direccion').innerHTML = trans.contacto.direccion;
    document.getElementById('contacto-telefono').innerHTML = trans.contacto.telefono;
    document.getElementById('contacto-horario').innerHTML = trans.contacto.horario;
    document.getElementById('contacto-btn-maps').textContent = trans.contacto.btnMaps;

    // Update footer
    document.getElementById('footer-title').textContent = trans.footer.title;
    document.getElementById('footer-info').innerHTML = trans.footer.info;
    document.getElementById('footer-note').textContent = trans.footer.note;
    document.getElementById('footer-redes').textContent = trans.footer.redes;
    document.getElementById('footer-enlaces').textContent = trans.footer.enlaces;
    document.getElementById('footer-copyright').innerHTML = trans.footer.copyright;

    // Update menu-filter and add-to-cart labels
    var allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) allFilter.textContent = trans.menu.all;
    document.querySelectorAll('.add-to-cart').forEach(function (btn) {
      btn.textContent = trans.menu.addToCart;
    });

    // Update cart
    document.getElementById('cart-title').textContent = trans.cart.title;
    document.getElementById('cart-total-text').textContent = trans.cart.total;
    var whatsappOrderBtn = document.getElementById('whatsapp-order');
    if (whatsappOrderBtn) whatsappOrderBtn.textContent = trans.cart.btnEnviar;
    document.getElementById('cart-btn-cerrar').textContent = trans.cart.btnCerrar;

    // Update skip link
    document.querySelector('.skip-link').textContent = trans.skipLink;

    // Update lang buttons
    document.getElementById('lang-es').classList.toggle('active', lang === 'es');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-es-mobile').classList.toggle('active', lang === 'es');
    document.getElementById('lang-en-mobile').classList.toggle('active', lang === 'en');

    // Update document lang
    document.documentElement.lang = lang;

    // Render dynamic UI items (filter/menu text) after entire language applied
    var currentFilterBtn = document.querySelector('.filter-btn.is-active');
    var currentFilter = currentFilterBtn ? currentFilterBtn.getAttribute('data-filter') : 'all';
    initFilters();
    renderMenu(currentFilter === 'all' ? null : currentFilter);
  }

  document.addEventListener("DOMContentLoaded", function () {    initNav();
    initLightbox();
    initLanguage();
    initFilters();
    renderMenu(null);
    updateCartUI();

    var fab = document.getElementById("cart-fab");
    if (fab) fab.addEventListener("click", openCart);

    var modal = document.getElementById("cart-modal");
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeCart();
      });
    }
    var closeBtn = document.getElementById("cart-close");
    if (closeBtn) closeBtn.addEventListener("click", closeCart);

    var waBtn = document.getElementById("whatsapp-order");
    if (waBtn) waBtn.addEventListener("click", whatsappOrder);

    var resForm = document.getElementById("form-reserva");
    if (resForm) resForm.addEventListener("submit", whatsappReserve);
  });
})();
