/* =====================================================
   RESTORWEB — script.js
   ===================================================== */

/* >>> EDITA AQUÍ <<<
   Pega entre las comillas la URL de la web a la que debe llevar
   el botón de "Contacto" (por ejemplo, tu Google Form). */
const CONTACT_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=ax0_yh_9sUC0GkiLmA6ffwdXy1cNgORPmmcc-fKAJ_1URDZHMVJMTFlTUzVWM1lIMVJGQlpPTllBOS4u";

/* ---------- Datos ---------- */
const TEAMS = [
  { id: "dir", short: "Dirección y Administración", cargo: "Director/a general", belbin: "Coordinador", katz: "Conceptual", habilidad: "Ve la empresa completa y define la estrategia", supreme: true },
  { id: "dev", short: "Desarrollo y Tecnología", cargo: "Líder de desarrollo", belbin: "Cerebro", katz: "Técnica", habilidad: "Programa, mantiene y mejora el software" },
  { id: "ops", short: "Operaciones y Calidad", cargo: "Responsable de calidad", belbin: "Finalizador", katz: "Técnica", habilidad: "Controla procesos y detecta errores antes del cliente" },
  { id: "com", short: "Comercial y Marketing", cargo: "Líder comercial", belbin: "Investigador de recursos", katz: "Humana", habilidad: "Conecta con restaurantes y abre oportunidades de venta" },
  { id: "cli", short: "Servicio al Cliente y Soporte Técnico", cargo: "Líder de soporte", belbin: "Cohesionador", katz: "Humana", habilidad: "Escucha al usuario y lo acompaña hasta resolver su problema" },
  { id: "fin", short: "Finanzas y Contabilidad", cargo: "Responsable financiero", belbin: "Monitor evaluador", katz: "Técnica", habilidad: "Controla ingresos, gastos y obligaciones tributarias" },
  { id: "rrhh", short: "Recursos Humanos", cargo: "Responsable de talento", belbin: "Implementador", katz: "Humana", habilidad: "Organiza al personal y sus responsabilidades" },
  { id: "jur", short: "Jurídica y Cumplimiento", cargo: "Responsable legal", belbin: "Especialista", katz: "Técnica", habilidad: "Cuida contratos, datos y obligaciones legales" }
];

const TICKET = [
  ["Pedidos y ventas", "Prueba"],
  ["Gestión de menú", "Prueba"],
  ["Inventario", "Básico"],
  ["Reportes", "Básico"],
  ["Compras y proveedores", "Michelin"],
  ["Mesas y reservas", "Michelin"],
  ["Pedidos de cocina", "Michelin"],
  ["Sucursales", "Empresarial"]
];

const SMART = [
  ["Específica", "Desplegar el primer MVP del sitio web de Restorweb."],
  ["Medible", "MVP en línea y proceso documentado en GitHub Projects."],
  ["Alcanzable", "Equipo organizado con la técnica 1-2-4."],
  ["Relevante", "Es la base del software que ofreceremos a los restaurantes."],
  ["Temporal", "4 semanas, en un entorno Linux."]
];

const RACI_COLS = ["Dirección", "Desarrollo", "Operaciones", "Recursos Humanos", "Comercial"];
const RACI_ROWS = [
  ["Organizar el equipo (técnica 1-2-4)", ["A", "C", "C", "R", "I"]],
  ["Montar el entorno Linux", ["I", "A/R", "C", "", ""]],
  ["Desarrollar el MVP web", ["A", "R", "C", "", "C"]],
  ["Documentar en GitHub Projects", ["A", "R", "R", "I", "I"]],
  ["Subir el código base a GitHub", ["I", "A/R", "C", "", ""]]
];

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);
const make = (tag, cls, html) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html !== undefined) el.innerHTML = html;
  return el;
};

/* ---------- Botón de contacto ---------- */
$("contactBtn").href = CONTACT_URL;

/* ---------- Comanda de inicio ---------- */
(function renderTicket() {
  const ul = $("ticketLines");
  TICKET.forEach(([item, plan], i) => {
    const li = make("li", "", `<span>${item}</span><span>${plan}</span>`);
    li.style.animationDelay = `${0.3 + i * 0.28}s`;
    ul.appendChild(li);
  });
})();

/* ---------- Organigrama y fichas ---------- */
(function renderTeam() {
  const org = $("org");
  const cards = $("teamCards");
  const [boss, ...rest] = TEAMS;

  const bossNode = make("button", "node top-node", `${boss.short}<small>Poder supremo</small>`);
  bossNode.type = "button";
  bossNode.dataset.id = boss.id;
  org.appendChild(bossNode);
  org.appendChild(make("div", "org-stem"));

  const row = make("div", "org-row");
  rest.forEach((t) => {
    const n = make("button", "node", t.short);
    n.type = "button";
    n.dataset.id = t.id;
    row.appendChild(n);
  });
  org.appendChild(row);

  TEAMS.forEach((t) => {
    const c = make("article", "card" + (t.supreme ? " supreme" : ""));
    c.id = "card-" + t.id;
    c.innerHTML = `
      <h4>${t.short}</h4>
      <p class="cargo">${t.cargo}</p>
      <dl>
        <div><dt>Rol de Belbin</dt><dd>${t.belbin}</dd></div>
        <div><dt>Habilidad de Katz</dt><dd><b>${t.katz}:</b> ${t.habilidad}</dd></div>
      </dl>`;
    cards.appendChild(c);
  });

  org.addEventListener("click", (e) => {
    const btn = e.target.closest(".node");
    if (!btn) return;
    org.querySelectorAll(".node").forEach((n) => n.classList.remove("sel"));
    document.querySelectorAll(".card").forEach((c) => c.classList.remove("hl"));
    btn.classList.add("sel");
    const card = $("card-" + btn.dataset.id);
    card.classList.add("hl");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();

/* ---------- Meta SMART ---------- */
SMART.forEach(([k, v]) => $("smartList").appendChild(make("li", "", `<b>${k}:</b> ${v}`)));

/* ---------- Matriz RACI + avance del OKR ---------- */
(function renderRaci() {
  const table = $("raci");
  const head = `<thead><tr><th>Tarea del Sprint Cero</th>${RACI_COLS.map((c) => `<th>${c}</th>`).join("")}</tr></thead>`;
  const body = RACI_ROWS.map(([task, vals], i) => {
    const cells = vals.map((v) => `<td class="${v.includes("A") ? "A" : v.includes("R") ? "R" : ""}">${v || "–"}</td>`).join("");
    return `<tr data-row="${i}"><td><label><input type="checkbox" data-task="${i}"><span>${task}</span></label></td>${cells}</tr>`;
  }).join("");
  table.innerHTML = head + `<tbody>${body}</tbody>`;

  table.addEventListener("change", () => {
    const boxes = [...table.querySelectorAll("input[type=checkbox]")];
    boxes.forEach((b) => b.closest("tr").classList.toggle("done", b.checked));
    const pct = Math.round((boxes.filter((b) => b.checked).length / boxes.length) * 100);
    $("meterFill").style.width = pct + "%";
    $("meterText").textContent = pct;
  });
})();

/* ---------- Enlace activo en el menú ---------- */
(function activeNav() {
  const links = [...document.querySelectorAll(".menu a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((l) => l.classList.toggle("on", l.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section").forEach((s) => io.observe(s));
})();
