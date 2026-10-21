/* ==========================================================
   Aquella vez 2 · motor del manual interactivo
   Cada unidad se describe con datos (ver js/unidad1.js) y este
   archivo la convierte en páginas con ejercicios interactivos.
   Marcas dentro de los textos:
     [[palabra|перевод]]   → palabra con traducción al pasar el cursor
     {{respuesta|otra}}     → hueco para completar (acepta varias)
     **negrita**            → negrita
   ========================================================== */
(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));
  const el = (etiqueta, attrs = {}, hijos = []) => {
    const n = document.createElement(etiqueta);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const h of [].concat(hijos)) if (h != null) n.append(h);
    return n;
  };
  const escapar = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mezclar = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  /* convierte las marcas de texto en HTML (sin huecos) */
  function marcar(texto) {
    let s = escapar(texto);
    s = s.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, es, ru) =>
      `<span class="g" tabindex="0" data-ru="${ru.replace(/"/g, "&quot;")}">${es}</span>`);
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return s;
  }
  /* texto plano para la voz */
  const plano = (t) => String(t).replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, "$1").replace(/\{\{([^|}]+)[^}]*\}\}/g, "…").replace(/\*\*/g, "");

  /* normalización de respuestas */
  const limpiar = (s) => String(s).toLowerCase().replace(/[¿?¡!.,;:«»"“”—–-]/g, " ").replace(/\s+/g, " ").trim();
  const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  function comparar(dado, aceptadas) {
    const d = limpiar(dado);
    if (!d) return "vacio";
    if (aceptadas.some((a) => limpiar(a) === d)) return "bien";
    if (aceptadas.some((a) => sinTildes(limpiar(a)) === sinTildes(d))) return "casi";
    return "mal";
  }

  /* ---------- memoria (localStorage, con protección) ---------- */
  const CLAVE = "aquellavez2";
  let memoria = {};
  try { memoria = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { memoria = {}; }
  const guardarMemoria = () => { try { localStorage.setItem(CLAVE, JSON.stringify(memoria)); } catch (e) {} };
  let U = "u0";
  const mem = () => (memoria[U] = memoria[U] || { notas: {}, textos: {} });

  /* ---------- avisos y confeti ---------- */
  let avisoTimer;
  function aviso(texto) {
    let a = $(".aviso");
    if (!a) { a = el("div", { class: "aviso", role: "status" }); document.body.append(a); }
    a.textContent = texto; a.classList.add("visible");
    clearTimeout(avisoTimer); avisoTimer = setTimeout(() => a.classList.remove("visible"), 2200);
  }
  function confeti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colores = ["#b0365a", "#b8873b", "#1f4e8c", "#2f7d4f", "#e9d3a6", "#c0611b"];
    for (let i = 0; i < 60; i++) {
      const c = el("i", { class: "confeti" });
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colores[i % colores.length];
      c.style.animationDelay = Math.random() * .5 + "s";
      c.style.animationDuration = 1.4 + Math.random() * 1.2 + "s";
      document.body.append(c);
      setTimeout(() => c.remove(), 3200);
    }
  }

  /* ---------- voz (síntesis del navegador) ---------- */
  let vozEs = null;
  function elegirVoz() {
    if (!("speechSynthesis" in window)) return;
    const voces = speechSynthesis.getVoices();
    const pref = ["es-AR", "es-US", "es-419", "es-MX", "es-ES", "es"];
    for (const p of pref) { const v = voces.find((x) => x.lang && x.lang.replace("_", "-").startsWith(p)); if (v) { vozEs = v; return; } }
  }
  if ("speechSynthesis" in window) { elegirVoz(); speechSynthesis.onvoiceschanged = elegirVoz; }
  function hablar(texto, boton) {
    if (!("speechSynthesis" in window)) { aviso("Tu navegador no puede leer en voz alta"); return; }
    const yaSonaba = boton && boton.classList.contains("sonando");
    speechSynthesis.cancel();
    $$(".btn-voz.sonando").forEach((b) => b.classList.remove("sonando"));
    if (yaSonaba) return;
    const u = new SpeechSynthesisUtterance(plano(texto));
    u.lang = vozEs ? vozEs.lang : "es-ES"; if (vozEs) u.voice = vozEs; u.rate = 0.9;
    if (boton) { boton.classList.add("sonando"); u.onend = u.onerror = () => boton.classList.remove("sonando"); }
    speechSynthesis.speak(u);
  }
  const botonVoz = (texto, etiqueta = "Escuchar") =>
    el("button", { class: "btn-voz", type: "button", title: etiqueta, "aria-label": etiqueta, onclick: (e) => hablar(texto, e.currentTarget) }, "🔊");

  /* ---------- glosario: tooltip ---------- */
  const tip = el("div", { class: "tooltip", role: "tooltip" });
  let tipActual = null;
  function mostrarTip(n) {
    if (!tip.isConnected) document.body.append(tip);
    tipActual && tipActual.classList.remove("activa");
    tipActual = n; n.classList.add("activa");
    tip.innerHTML = `<span class="es">${n.textContent}</span><span class="ruw">${n.dataset.ru}</span>`;
    tip.classList.add("visible");
    const r = n.getBoundingClientRect();
    const t = tip.getBoundingClientRect();
    let x = r.left + r.width / 2 - t.width / 2;
    x = Math.max(8, Math.min(x, innerWidth - t.width - 8));
    let y = r.top - t.height - 10, abajo = false;
    if (y < 70) { y = r.bottom + 10; abajo = true; }
    tip.style.left = x + "px"; tip.style.top = y + "px";
    tip.style.setProperty("--flecha", r.left + r.width / 2 - x + "px");
    tip.classList.toggle("abajo", abajo);
  }
  function ocultarTip() { tip.classList.remove("visible"); tipActual && tipActual.classList.remove("activa"); tipActual = null; }
  const ratonFino = matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.addEventListener("mouseover", (e) => { if (!ratonFino) return; const g = e.target.closest(".g"); if (g) mostrarTip(g); });
  document.addEventListener("mouseout", (e) => { if (!ratonFino) return; if (e.target.closest(".g") && !e.relatedTarget?.closest?.(".g")) ocultarTip(); });
  document.addEventListener("click", (e) => {
    const g = e.target.closest(".g");
    if (g) { e.preventDefault(); mostrarTip(g); }
    else ocultarTip();
  });
  document.addEventListener("focusin", (e) => { if (e.target.classList?.contains("g")) mostrarTip(e.target); });
  document.addEventListener("focusout", (e) => { if (e.target.classList?.contains("g")) ocultarTip(); });
  addEventListener("scroll", ocultarTip, { passive: true });

  /* ---------- teclado de tildes ---------- */
  const tildes = el("div", { class: "tildes", "aria-label": "Letras especiales" });
  ["á", "é", "í", "ó", "ú", "ñ", "ü", "¿", "¡"].forEach((c) =>
    tildes.append(el("button", {
      type: "button", text: c, tabindex: "-1",
      onmousedown: (e) => e.preventDefault(),
      onclick: () => {
        const a = document.activeElement;
        if (!a || !/INPUT|TEXTAREA/.test(a.tagName)) return;
        const i = a.selectionStart ?? a.value.length, f = a.selectionEnd ?? a.value.length;
        a.value = a.value.slice(0, i) + c + a.value.slice(f);
        a.setSelectionRange(i + 1, i + 1);
        a.dispatchEvent(new Event("input", { bubbles: true }));
      },
    }))
  );
  document.addEventListener("focusin", (e) => {
    if (e.target.matches?.("input.hueco, textarea")) { if (!tildes.isConnected) document.body.append(tildes); tildes.classList.add("visible"); }
  });
  document.addEventListener("focusout", (e) => {
    if (e.target.matches?.("input.hueco, textarea")) setTimeout(() => { if (!document.activeElement?.matches?.("input.hueco, textarea")) tildes.classList.remove("visible"); }, 120);
  });

  function cerrarMenus() { $$(".menu-fichas").forEach((m) => m.remove()); }
  document.addEventListener("click", (e) => { if (!e.target.closest(".menu-fichas")) cerrarMenus(); });
  addEventListener("resize", cerrarMenus);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarMenus(); });

  /* ---------- piezas comunes ---------- */
  function imagen(src, alt = "", clase = "") {
    if (!src) return null;
    return el("picture", { class: clase }, [
      el("source", { srcset: `img/${src}.webp`, type: "image/webp" }),
      el("img", { src: `img/${src}.jpg`, alt, loading: "lazy", decoding: "async" }),
    ]);
  }
  function cabeceraEj(b, num) {
    return el("div", { class: "ej-cabecera" }, [
      num != null ? el("div", { class: "ej-num", text: num }) : null,
      el("div", { class: "ej-titulos" }, [
        el("h3", { html: marcar(b.titulo) + (b.etiqueta ? `<span class="etiqueta">${b.etiqueta}</span>` : "") }),
        b.ru ? el("p", { class: "ru", text: b.ru }) : null,
      ]),
    ]);
  }
  function tarjeta(b, contenido, num) {
    const t = el("article", { class: "tarjeta" + (b.imagen ? " tarjeta--con-imagen" + (b.imagenIzq ? " imagen-izq" : "") : "") });
    const cuerpo = el("div", {}, [b.titulo ? cabeceraEj(b, num) : null, contenido]);
    t.append(cuerpo);
    if (b.imagen) t.append(el("div", { class: "tarjeta__imagen" }, imagen(b.imagen, b.alt || "", b.recorte ? "recorte" : "")));
    return t;
  }
  function resultadoUI() { return el("span", { class: "resultado", role: "status", "aria-live": "polite" }); }
  function pintarResultado(nodo, bien, total) {
    const p = total ? bien / total : 0;
    nodo.className = "resultado ver " + (p >= .8 ? "r-alto" : p >= .5 ? "r-medio" : "r-bajo");
    const frase = p === 1 ? "¡Perfecto!" : p >= .8 ? "¡Muy bien!" : p >= .5 ? "¡Casi!" : "Inténtalo otra vez";
    nodo.textContent = `${frase} ${bien} / ${total}`;
    if (p === 1) confeti();
  }
  function registrar(id, bien, total) {
    const notas = mem().notas;
    const antes = notas[id];
    if (!antes || bien / total >= antes.b / antes.t) notas[id] = { b: bien, t: total };
    guardarMemoria();
    actualizarProgreso();
  }

  /* ---------- tipos de bloque ---------- */
  const TIPOS = {};

  /* diálogo con burbujas */
  TIPOS.dialogo = (b) => {
    const d = el("div", { class: "dialogo" });
    if (b.intro) d.append(el("p", { class: "dialogo__intro", html: marcar(b.intro) }));
    const lados = {}; let siguiente = "izq";
    b.lineas.forEach((l) => {
      if (!lados[l.p]) { lados[l.p] = siguiente; siguiente = siguiente === "izq" ? "der" : "izq"; }
      d.append(el("div", { class: `replica ${lados[l.p]} p-${l.p.toLowerCase()}` }, [
        el("div", { class: "avatar", text: l.p[0], "aria-hidden": "true" }),
        el("div", { class: "burbuja" }, [
          el("div", { class: "burbuja__nombre" }, [l.p, botonVoz(l.t, `Escuchar a ${l.p}`)]),
          el("div", { html: marcar(l.t) }),
        ]),
      ]));
    });
    const todo = b.lineas.map((l) => `${l.p}: ${l.t}`).join(" ");
    const barra = el("div", { class: "barra-lectura" }, [
      el("button", { class: "btn btn--claro btn--pequeno", type: "button", onclick: (e) => hablar(todo, e.currentTarget) }, "🔊 Escuchar todo"),
    ]);
    return tarjeta(b, el("div", {}, [barra, d]), b.num);
  };

  /* texto de lectura */
  TIPOS.texto = (b) => {
    const cont = el("div", { class: "lectura" });
    if (b.encabezado) cont.append(el("h4", { class: "titulo-texto", text: b.encabezado }));
    b.parrafos.forEach((p, i) => cont.append(el("p", { class: i === 0 && b.capitular ? "capitular" : "", html: marcar(p) })));
    const barra = el("div", { class: "barra-lectura" }, [
      el("button", { class: "btn btn--claro btn--pequeno", type: "button", onclick: (e) => hablar((b.encabezado ? b.encabezado + ". " : "") + b.parrafos.join(" "), e.currentTarget) }, "🔊 Escuchar"),
    ]);
    return tarjeta(b, el("div", {}, [barra, cont]), b.num);
  };

  TIPOS.figura = (b) => el("figure", { class: "figura" + (b.ancha ? " figura--ancha" : ""), style: b.max ? `max-width:${b.max}px;margin-inline:auto` : null }, [imagen(b.src, b.alt, b.recorte ? "recorte" : ""), b.pie ? el("figcaption", { text: b.pie }) : null]);

  TIPOS.sabias = (b) => el("aside", { class: "sabias" }, [
    el("div", { class: "sabias__icono", text: "💡", "aria-hidden": "true" }),
    el("div", {}, [el("h4", { text: "¿Sabías que…?" }), el("p", { html: marcar(b.texto) }), b.ru ? el("p", { class: "ru", style: "color:var(--tinta-suave);font-size:15px;margin-top:6px", text: b.ru }) : null]),
  ]);

  TIPOS.pista = (b) => el("details", { class: "pista" }, [
    el("summary", { html: "📘 " + marcar(b.titulo) }),
    el("div", { class: "pista__cuerpo teoria", html: b.html }),
  ]);

  TIPOS.teoria = (b) => tarjeta({ ...b, titulo: null }, el("div", { class: "teoria", html: b.html }));

  /* Verdadero / Falso y elección entre opciones */
  function ejercicioOpciones(b, id, opciones) {
    const lista = el("ol", { class: b.rejilla ? "lista-ej hl" : "lista-ej" });
    const res = resultadoUI();
    const respuestas = {};
    const comprobarFin = () => {
      const n = Object.keys(respuestas).length;
      if (n === b.items.length) {
        const bien = b.items.filter((it, i) => respuestas[i] === it.r).length;
        pintarResultado(res, bien, b.items.length); registrar(id, bien, b.items.length);
      }
    };
    b.items.forEach((it, i) => {
      const li = el("li", { class: "item" });
      const marcaRes = el("span", { class: "marca-res", "aria-hidden": "true" });
      const grupo = el("div", { class: "vf", role: "group", "aria-label": "Respuesta" });
      opciones.forEach(([valor, etiqueta, titulo]) => {
        grupo.append(el("button", {
          type: "button", text: etiqueta, title: titulo,
          onclick: (e) => {
            if (respuestas[i] != null) return;
            respuestas[i] = valor;
            e.currentTarget.classList.add("elegido");
            const ok = valor === it.r;
            li.classList.add(ok ? "bien" : "mal");
            marcaRes.textContent = ok ? "✓" : "✗";
            $$("button", grupo).forEach((x) => (x.disabled = true));
            if (!ok && it.nota) li.append(el("div", { style: "flex-basis:100%;font-size:15px;color:var(--rojo)", html: "→ " + marcar(it.nota) }));
            comprobarFin();
          },
        }));
      });
      if (!b.rejilla) li.append(el("span", { class: "item__n", text: i + 1 }));
      li.append(el("span", { class: "item__texto", html: marcar(it.t) }), grupo, marcaRes);
      lista.append(li);
    });
    const reiniciar = el("button", {
      class: "btn btn--claro btn--pequeno", type: "button", text: "↺ Repetir",
      onclick: () => { const nuevo = ejercicioOpciones(b, id, opciones); contenedor.replaceWith(nuevo); },
    });
    const contenedor = el("div", {}, [lista, el("div", { class: "acciones" }, [res, reiniciar])]);
    return contenedor;
  }
  TIPOS.vf = (b, id) => tarjeta(b, ejercicioOpciones(b, id, [[true, "V", "Verdadero"], [false, "F", "Falso"]]), b.num);
  TIPOS.elegir = (b, id) => tarjeta(b, ejercicioOpciones(b, id, b.opciones), b.num);

  /* textos con huecos (escribir o colocar fichas) */
  TIPOS.huecos = (b, id) => {
    const caja = el("div", {});
    const huecos = [];
    let activo = null;
    const conFichas = !!b.banco && !b.escribir;
    let banco = null;

    if (b.banco) {
      banco = el("div", { class: "banco" + (b.bancoFijo ? " banco--fijo" : ""), "aria-label": "Palabras" }, [el("div", { class: "banco__titulo", text: conFichas ? (b.textoBanco || "Toca un hueco y elige una palabra") : "Palabras" })]);
      (b.mezclar === false ? b.banco : mezclar(b.banco)).forEach((w) => {
        const [es, ru] = Array.isArray(w) ? w : [w, null];
        const f = el("button", { type: "button", class: "ficha", "data-valor": es }, [es, ru ? el("small", { text: ru }) : null]);
        if (conFichas) f.addEventListener("click", () => colocar(f));
        banco.append(f);
      });
      caja.append(banco);
    }

    if (b.antes) caja.append(el("div", { class: "teoria", html: b.antes }));
    const texto = el("div", { class: "texto-huecos" + (b.lista ? " lista" : "") });
    if (b.encabezado) texto.append(el("h4", { class: "titulo-texto", text: b.encabezado }));
    b.parrafos.forEach((p) => {
      const par = el("p");
      const partes = p.split(/(\{\{[^}]*\}\})/);
      partes.forEach((parte) => {
        const m = parte.match(/^\{\{([^}]*)\}\}$/);
        if (!m) { par.insertAdjacentHTML("beforeend", marcar(parte)); return; }
        const aceptadas = m[1] === "?" ? null : m[1].split("|");
        let nodo;
        if (conFichas) {
          nodo = el("button", { type: "button", class: "hueco", "aria-label": "hueco vacío" });
          nodo.addEventListener("click", (e) => {
            e.stopPropagation();
            if (nodo.dataset.valor) { devolver(nodo); }
            activar(nodo);
            abrirMenu(nodo);
          });
        } else {
          const largo = aceptadas ? Math.max(...aceptadas.map((a) => a.length)) : 10;
          nodo = el("input", { class: "hueco", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "completar" });
          nodo.style.width = Math.max(5, largo + 2) + "ch";
          nodo.addEventListener("input", () => { nodo.classList.remove("bien", "mal", "casi"); const c = nodo.nextElementSibling; if (c?.classList.contains("correccion")) c.remove(); });
          nodo.addEventListener("keydown", (e) => {
            if (e.key === "Enter") { e.preventDefault(); const i = huecos.findIndex((h) => h.nodo === nodo); (huecos[i + 1]?.nodo || botonComprobar).focus(); }
          });
        }
        huecos.push({ nodo, aceptadas });
        par.append(nodo);
      });
      texto.append(par);
    });
    caja.append(texto);

    function abrirMenu(n) {
      cerrarMenus();
      const libres = $$(".ficha:not(.usada)", banco);
      if (!libres.length) return;
      const menu = el("div", { class: "menu-fichas", role: "menu" }, [el("div", { class: "menu-fichas__titulo", text: "Elige una palabra" })]);
      libres.forEach((f) => menu.append(el("button", {
        type: "button", class: "ficha", role: "menuitem", html: f.innerHTML,
        onclick: (e) => { e.stopPropagation(); cerrarMenus(); activar(n); colocar(f); },
      })));
      document.body.append(menu);
      const r = n.getBoundingClientRect(), m = menu.getBoundingClientRect();
      let x = r.left + scrollX; x = Math.min(x, scrollX + innerWidth - m.width - 12); x = Math.max(scrollX + 12, x);
      let y = r.bottom + scrollY + 6;
      if (r.bottom + m.height + 12 > innerHeight && r.top > m.height + 80) y = r.top + scrollY - m.height - 6;
      menu.style.left = x + "px"; menu.style.top = y + "px";
    }
    function activar(n) { activo && activo.classList.remove("activo"); activo = n; n && n.classList.add("activo"); }
    function colocar(ficha) {
      if (ficha.classList.contains("usada")) return;
      const destino = activo && !activo.dataset.valor ? activo : huecos.map((h) => h.nodo).find((n) => !n.dataset.valor);
      if (!destino) { aviso("Todos los huecos están llenos"); return; }
      destino.dataset.valor = ficha.dataset.valor; destino.textContent = ficha.dataset.valor;
      destino.classList.remove("bien", "mal", "casi");
      ficha.classList.add("usada");
      const sig = huecos.map((h) => h.nodo).find((n) => !n.dataset.valor);
      activar(sig || null);
    }
    function devolver(n) {
      const f = $$(".ficha.usada", banco).find((x) => x.dataset.valor === n.dataset.valor);
      f && f.classList.remove("usada");
      delete n.dataset.valor; n.textContent = ""; n.classList.remove("bien", "mal", "casi");
      const c = n.nextElementSibling; if (c?.classList.contains("correccion")) c.remove();
      activar(n);
    }
    if (conFichas && huecos[0]) activar(huecos[0].nodo);

    const res = resultadoUI();
    const valorDe = (n) => (conFichas ? n.dataset.valor || "" : n.value);
    const botonComprobar = el("button", {
      class: "btn", type: "button", text: "Comprobar",
      onclick: () => {
        $$(".correccion", texto).forEach((c) => c.remove());
        let bien = 0;
        if (b.libre) {
          // cada palabra del banco una sola vez; cualquier orden razonable vale
          const usados = huecos.map((h) => limpiar(valorDe(h.nodo)));
          const validos = b.banco.map((w) => limpiar(Array.isArray(w) ? w[0] : w));
          huecos.forEach((h, i) => {
            const v = usados[i];
            const ok = v && validos.includes(v) && usados.indexOf(v) === i;
            h.nodo.classList.remove("bien", "mal", "casi");
            h.nodo.classList.add(ok ? "bien" : "mal");
            if (ok) bien++;
          });
        } else {
          huecos.forEach((h) => {
            const r = comparar(valorDe(h.nodo), h.aceptadas);
            h.nodo.classList.remove("bien", "mal", "casi");
            if (r === "bien") { bien++; h.nodo.classList.add("bien"); }
            else {
              h.nodo.classList.add(r === "casi" ? "casi" : "mal");
              h.nodo.after(el("span", { class: "correccion", text: h.aceptadas[0], title: r === "casi" ? "¡Ojo con la tilde!" : "Respuesta correcta" }));
              if (r === "casi") bien += 0.5;
            }
          });
        }
        pintarResultado(res, Math.round(bien * 2) / 2, huecos.length);
        registrar(id, bien, huecos.length);
        if (huecos.some((h) => h.nodo.classList.contains("casi"))) aviso("Amarillo = falta una tilde");
      },
    });
    const acciones = el("div", { class: "acciones" }, [botonComprobar, res]);
    if (b.propuesta) {
      acciones.append(el("button", {
        class: "btn btn--claro btn--pequeno", type: "button", text: "Ver una propuesta",
        onclick: (e) => { e.currentTarget.replaceWith(el("div", { class: "modelo", style: "flex-basis:100%", html: "<b>Propuesta:</b> " + marcar(b.propuesta) })); },
      }));
    }
    acciones.append(el("button", {
      class: "btn btn--claro btn--pequeno", type: "button", text: "↺ Borrar",
      onclick: () => {
        huecos.forEach((h) => { if (conFichas) { if (h.nodo.dataset.valor) devolver(h.nodo); } else h.nodo.value = ""; h.nodo.classList.remove("bien", "mal", "casi"); });
        $$(".correccion", texto).forEach((c) => c.remove()); res.className = "resultado";
        if (conFichas) activar(huecos[0].nodo);
      },
    }));
    caja.append(acciones);
    return tarjeta(b, caja, b.num);
  };

  /* unir preguntas con respuestas */
  TIPOS.unir = (b, id) => {
    const letras = Object.keys(b.opciones);
    const lista = el("ol", { class: "lista-ej" });
    const selects = b.items.map((it, i) => {
      const s = el("select", { class: "select-bonito", "aria-label": `Respuesta para la pregunta ${i + 1}` }, [el("option", { value: "", text: "—" }), ...letras.map((l) => el("option", { value: l, text: l }))]);
      const marcaRes = el("span", { class: "marca-res" });
      const li = el("li", { class: "item" }, [el("span", { class: "item__n", text: i + 1 }), el("span", { class: "item__texto", html: marcar(it.q) }), s, marcaRes]);
      s.addEventListener("change", () => { li.classList.remove("bien", "mal"); marcaRes.textContent = ""; });
      lista.append(li);
      return { s, li, marcaRes, r: it.r };
    });
    const opciones = el("ul", { class: "respuestas-unir" }, letras.map((l) => el("li", { html: `<b>${l}.</b>${marcar(b.opciones[l])}` })));
    const res = resultadoUI();
    const acc = el("div", { class: "acciones" }, [
      el("button", {
        class: "btn", type: "button", text: "Comprobar",
        onclick: () => {
          let bien = 0;
          selects.forEach((x) => { const ok = x.s.value === x.r; x.li.classList.remove("bien", "mal"); x.li.classList.add(ok ? "bien" : "mal"); x.marcaRes.textContent = ok ? "✓" : "✗"; if (ok) bien++; });
          pintarResultado(res, bien, selects.length); registrar(id, bien, selects.length);
        },
      }),
      res,
    ]);
    return tarjeta(b, el("div", {}, [el("div", { class: "unir" }, [lista, opciones]), acc]), b.num);
  };

  /* ordenar palabras */
  TIPOS.ordenar = (b, id) => {
    const lista = el("div", { class: "lista-ej" });
    const filas = b.items.map((it, i) => {
      const armada = el("div", { class: "frase-armada", "aria-label": "Tu frase" });
      const fichas = el("div", { class: "fichas-orden" });
      const caja = el("div", { class: "ordenar-item" });
      const pintar = () => {
        fichas.innerHTML = "";
        mezclar(it.palabras).forEach((w) => {
          fichas.append(el("button", {
            type: "button", class: "ficha", text: w,
            onclick: (e) => {
              const f = e.currentTarget; f.remove(); caja.classList.remove("bien", "mal"); $(".correccion", caja)?.remove();
              armada.append(el("button", { type: "button", class: "ficha", text: w, onclick: (ev) => { ev.currentTarget.remove(); fichas.append(f); caja.classList.remove("bien", "mal"); } }));
            },
          }));
        });
      };
      pintar();
      caja.append(el("div", { class: "ordenar-fila" }, [el("span", { class: "item__n", text: i + 1 }), el("span", { style: "color:var(--tinta-suave);font-size:15px", text: "Forma la frase:" })]), armada, fichas);
      lista.append(caja);
      return {
        caja, armada, it,
        reiniciar: () => { armada.innerHTML = ""; caja.classList.remove("bien", "mal"); $(".correccion", caja)?.remove(); pintar(); },
      };
    });
    const res = resultadoUI();
    const acc = el("div", { class: "acciones" }, [
      el("button", {
        class: "btn", type: "button", text: "Comprobar",
        onclick: () => {
          let bien = 0;
          filas.forEach((f) => {
            const frase = $$(".ficha", f.armada).map((x) => x.textContent).join(" ");
            const ok = f.it.variantes.some((v) => limpiar(v) === limpiar(frase));
            f.caja.classList.remove("bien", "mal"); f.caja.classList.add(ok ? "bien" : "mal");
            $(".correccion", f.caja)?.remove();
            if (ok) bien++; else f.caja.append(el("div", { class: "correccion", text: f.it.variantes[0] }));
          });
          pintarResultado(res, bien, filas.length); registrar(id, bien, filas.length);
        },
      }),
      res,
      el("button", { class: "btn btn--claro btn--pequeno", type: "button", text: "↺ Repetir", onclick: () => { filas.forEach((f) => f.reiniciar()); res.className = "resultado"; } }),
    ]);
    return tarjeta(b, el("div", {}, [b.nota ? el("p", { style: "margin-top:0;color:var(--tinta-suave)", html: marcar(b.nota) }) : null, lista, acc]), b.num);
  };

  /* respuestas abiertas (se guardan en este dispositivo) */
  TIPOS.abierta = (b, id) => {
    const cont = el("div", { class: "lista-ej" });
    if (b.ejemplo) cont.append(el("div", { class: "modelo", html: "<b>Ejemplo:</b> " + marcar(b.ejemplo) }));
    b.preguntas.forEach((p, i) => {
      const clave = `${id}-${i}`;
      const ta = el("textarea", { id: clave, rows: p.lineas || 2, placeholder: "Escribe aquí tu respuesta…" });
      ta.value = mem().textos[clave] || "";
      const ok = el("span", { class: "guardado", text: "✓ guardado" });
      let t; ta.addEventListener("input", () => { mem().textos[clave] = ta.value; guardarMemoria(); ok.classList.add("si"); clearTimeout(t); t = setTimeout(() => ok.classList.remove("si"), 1200); });
      const caja = el("div", { class: "abierta" }, [el("label", { for: clave, html: `${b.preguntas.length > 1 ? i + 1 + ". " : ""}${marcar(p.q)}` }), ta]);
      const pie = el("div", { class: "acciones", style: "margin-top:8px" }, [ok]);
      if (p.modelo) pie.prepend(el("button", {
        class: "btn btn--claro btn--pequeno", type: "button", text: b.textoModelo || "Ver un ejemplo",
        onclick: (e) => e.currentTarget.replaceWith(el("div", { class: "modelo", style: "flex-basis:100%;margin:0", html: `<b>${b.textoModelo ? "Respuesta" : "Ejemplo"}:</b> ` + marcar(p.modelo) })),
      }));
      caja.append(pie);
      cont.append(caja);
    });
    return tarjeta(b, cont, b.num);
  };

  /* escala de frecuencia (gramática) */
  TIPOS.escala = (b) => {
    const cont = el("div", { class: "escala" });
    b.filas.forEach((f) => {
      const relleno = el("div", { class: "escala__relleno" });
      const fila = el("div", { class: "escala__fila", tabindex: "0", role: "button", "aria-expanded": "false" }, [
        el("div", { class: "escala__pct", text: f.pct + "%" }),
        el("div", { class: "escala__barra" }, [relleno, el("div", { class: "escala__palabra", html: `${f.es} <small>${f.ru}</small>` })]),
        el("div", { class: "escala__ejemplo", html: "✦ " + marcar(f.ej) + " " }),
      ]);
      const alternar = () => { fila.classList.toggle("abierta"); fila.setAttribute("aria-expanded", fila.classList.contains("abierta")); };
      fila.addEventListener("click", (e) => { if (!e.target.closest(".btn-voz")) alternar(); });
      fila.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alternar(); } });
      $(".escala__ejemplo", fila).append(botonVoz(f.ej));
      relleno.dataset.ancho = Math.max(f.pct, 3) + "%";
      cont.append(fila);
    });
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { $$(".escala__relleno", en.target).forEach((r) => (r.style.width = r.dataset.ancho)); io.unobserve(en.target); } }), { threshold: .2 });
    io.observe(cont);
    return tarjeta(b, el("div", {}, [b.intro ? el("p", { html: marcar(b.intro) }) : null, el("p", { style: "font-size:14px;color:var(--tinta-suave);margin:0", text: "Toca cada fila para ver un ejemplo." }), cont]), b.num);
  };

  /* historieta */
  TIPOS.historieta = (b) => {
    const img = imagen(b.src, b.alt);
    const visor = el("div", { class: "visor", onclick: () => visor.classList.remove("abierto") }, [
      el("button", { class: "visor__cerrar", type: "button", "aria-label": "Cerrar", text: "✕" }),
      el("img", { src: `img/${b.src}.jpg`, alt: b.alt, loading: "lazy" }),
    ]);
    img.addEventListener("click", () => visor.classList.add("abierto"));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") visor.classList.remove("abierto"); });
    return el("div", {}, [
      tarjeta({ titulo: b.titulo, ru: b.ru }, el("div", { class: "historieta" }, [
        b.texto ? el("p", { style: "margin-top:0", html: marcar(b.texto) }) : null,
        img,
        el("p", { style: "font-size:14px;color:var(--tinta-suave)", text: "Toca la imagen para verla en grande." }),
      ]), b.num),
      visor,
    ]);
  };

  /* ---------- progreso ---------- */
  let unidadActual = null;
  const evaluables = new Set(["vf", "elegir", "huecos", "unir", "ordenar"]);
  function idsSeccion(s) { return s.bloques.map((b, i) => (evaluables.has(b.tipo) ? `${s.id}-${i}` : null)).filter(Boolean); }
  function actualizarProgreso() {
    if (!unidadActual) return;
    const notas = mem().notas;
    let total = 0, hechos = 0;
    unidadActual.secciones.forEach((s) => {
      const ids = idsSeccion(s);
      total += ids.length;
      const h = ids.filter((id) => notas[id]).length;
      hechos += h;
      const tab = $(`.pestana[data-id="${s.id}"]`);
      if (tab) tab.classList.toggle("hecha", ids.length > 0 && h === ids.length);
    });
    const barra = $(".progreso-mini__barra i");
    if (barra) barra.style.width = total ? (hechos / total) * 100 + "%" : "0";
    const txt = $(".progreso-mini span");
    if (txt) txt.textContent = `${hechos}/${total} ejercicios`;
  }

  /* ---------- montaje de la unidad ---------- */
  function montarUnidad(u) {
    unidadActual = u; U = "u" + u.numero;
    document.title = `Unidad ${u.numero} · Aquella vez 2`;

    // pestañas
    const pestanas = $("#pestanas");
    u.secciones.forEach((s) => pestanas.append(el("a", { class: "pestana", href: "#" + s.id, "data-id": s.id }, [el("b", { text: s.letra }), s.corto || s.titulo, el("span", { class: "ok", text: "✓" })])));

    // secciones
    const main = $("#secciones");
    u.secciones.forEach((s, si) => {
      const sec = el("section", { class: "seccion", id: "sec-" + s.id, "aria-labelledby": "t-" + s.id });
      sec.append(el("header", { class: "seccion__cabecera" }, [
        el("div", { class: "seccion__letra", text: s.letra }),
        el("h2", { id: "t-" + s.id, text: s.titulo }),
        s.ru ? el("p", { class: "seccion__ru", text: s.ru }) : null,
        s.lema ? el("p", { class: "lema", text: s.lema }) : null,
      ]));
      s.bloques.forEach((b, bi) => {
        const f = TIPOS[b.tipo];
        if (!f) { console.warn("Tipo desconocido", b.tipo); return; }
        sec.append(f(b, `${s.id}-${bi}`));
      });
      const ant = u.secciones[si - 1], sig = u.secciones[si + 1];
      sec.append(el("nav", { class: "nav-secciones", "aria-label": "Navegación entre apartados" }, [
        ant ? el("a", { href: "#" + ant.id }, [el("small", { text: "← Anterior" }), el("strong", { text: `${ant.letra}. ${ant.titulo}` })]) : el("span", { class: "vacio" }),
        sig ? el("a", { href: "#" + sig.id, class: "sig" }, [el("small", { text: "Siguiente →" }), el("strong", { text: `${sig.letra}. ${sig.titulo}` })])
            : el("a", { href: "index.html", class: "sig" }, [el("small", { text: "Fin de la unidad" }), el("strong", { text: "Volver al inicio ⌂" })]),
      ]));
      main.append(sec);
    });

    // navegación por #
    const mostrar = (desplazar) => {
      const id = location.hash.slice(1) || u.secciones[0].id;
      const s = u.secciones.find((x) => x.id === id) || u.secciones[0];
      $$(".seccion").forEach((x) => x.classList.toggle("activa", x.id === "sec-" + s.id));
      $$(".pestana").forEach((p) => p.toggleAttribute("aria-current", false));
      const tab = $(`.pestana[data-id="${s.id}"]`);
      if (tab) { tab.setAttribute("aria-current", "page"); tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); }
      ocultarTip();
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      if (desplazar) {
        const destino = $("#sec-" + s.id);
        const y = destino.getBoundingClientRect().top + scrollY - $(".barra").offsetHeight - 8;
        scrollTo({ top: y, behavior: "smooth" });
      }
    };
    addEventListener("hashchange", () => mostrar(true));
    mostrar(!!location.hash);
    actualizarProgreso();

    // interruptor del glosario
    const sw = $("#interruptor-glosario");
    if (sw) sw.addEventListener("change", () => document.body.classList.toggle("sin-glosario", !sw.checked));
    const rein = $("#reiniciar");
    if (rein) rein.addEventListener("click", () => {
      if (!confirm("¿Borrar todas tus respuestas y tu progreso de esta unidad?")) return;
      delete memoria[U]; guardarMemoria(); location.reload();
    });
  }

  window.Manual = { montarUnidad, marcar, imagen };
})();
