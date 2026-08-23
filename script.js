const STORE_KEY = "dsp-language";

const copy = {
  en: {
    "nav.sessions": "Sessions",
    "nav.map": "Course Map",
    "nav.home": "Home",
    "nav.contents": "Contents",
    "schedule.eyebrow": "Schedule",
    "schedule.title": "Seven Tuesday meetings",
    "schedule.note": "The calendar is recreated as text so it remains readable, responsive, and bilingual.",
    "home.eyebrow": "Academic Space",
    "home.title": "Data Science Programming",
    "home.lead": "A bilingual, student-facing route for learning Python programming as a foundation for data analysis, automation, visualization, and reusable analytical workflows.",
    "home.start": "Start Session 01",
    "home.viewSessions": "View all sessions",
    "map.eyebrow": "Learning Route",
    "map.title": "From first variables to reusable data workflows",
    "map.step1.title": "Represent",
    "map.step1.text": "Use variables, types, and expressions to model information.",
    "map.step2.title": "Structure",
    "map.step2.text": "Organize values with lists, dictionaries, arrays, and tabular data.",
    "map.step3.title": "Analyze",
    "map.step3.text": "Transform, summarize, visualize, and interpret datasets.",
    "map.step4.title": "Generalize",
    "map.step4.text": "Move from isolated answers to reusable, documented solutions.",
    "sessions.eyebrow": "Table of Contents",
    "sessions.title": "Sessions",
    "sessions.note": "The course is organized as a sequence of seven sessions. New pages will be activated as the academic space advances.",
    "table.session": "Session",
    "table.topic": "Topic",
    "table.focus": "Focus",
    "table.status": "Status",
    "table.action": "Open",
    "status.ready": "Available",
    "status.soon": "Coming soon",
    "action.open": "Open",
    "action.pending": "Pending",
    "footer.text": "Data Science Programming · Student-facing bilingual resources",
    "lesson.contents": "Contents",
    "lesson.loading": "Loading session...",
    "lesson.error": "The session could not be loaded.",
    "lesson.back": "Back to course table of contents"
  },
  es: {
    "nav.sessions": "Sesiones",
    "nav.map": "Mapa del curso",
    "nav.home": "Inicio",
    "nav.contents": "Contenido",
    "schedule.eyebrow": "Cronograma",
    "schedule.title": "Siete encuentros los martes",
    "schedule.note": "El calendario se recrea como texto para que sea legible, responsive y bilingüe.",
    "home.eyebrow": "Espacio académico",
    "home.title": "Data Science Programming",
    "home.lead": "Ruta bilingüe, dirigida a estudiantes, para aprender programación en Python como base del análisis de datos, la automatización, la visualización y los flujos analíticos reutilizables.",
    "home.start": "Iniciar sesión 01",
    "home.viewSessions": "Ver todas las sesiones",
    "map.eyebrow": "Ruta de aprendizaje",
    "map.title": "De las primeras variables a flujos de datos reutilizables",
    "map.step1.title": "Representar",
    "map.step1.text": "Usar variables, tipos y expresiones para modelar información.",
    "map.step2.title": "Estructurar",
    "map.step2.text": "Organizar valores con listas, diccionarios, arreglos y datos tabulares.",
    "map.step3.title": "Analizar",
    "map.step3.text": "Transformar, resumir, visualizar e interpretar conjuntos de datos.",
    "map.step4.title": "Generalizar",
    "map.step4.text": "Pasar de respuestas aisladas a soluciones reutilizables y documentadas.",
    "sessions.eyebrow": "Tabla de contenido",
    "sessions.title": "Sesiones",
    "sessions.note": "El curso está organizado como una secuencia de siete sesiones. Las nuevas páginas se activarán a medida que avance el espacio académico.",
    "table.session": "Sesión",
    "table.topic": "Tema",
    "table.focus": "Enfoque",
    "table.status": "Estado",
    "table.action": "Abrir",
    "status.ready": "Disponible",
    "status.soon": "Próximamente",
    "action.open": "Abrir",
    "action.pending": "Pendiente",
    "footer.text": "Data Science Programming · Recursos bilingües para estudiantes",
    "lesson.contents": "Contenido",
    "lesson.loading": "Cargando sesión...",
    "lesson.error": "No se pudo cargar la sesión.",
    "lesson.back": "Volver a la tabla de contenido del curso"
  }
};

const sessions = [
  {
    number: "01",
    href: "sessions/session-01/",
    ready: true,
    en: {
      topic: "Programming for Data Science: First Steps with Python",
      focus: "Programming purpose, environments, variables, types, operators, decisions, functions, and debugging."
    },
    es: {
      topic: "Programación para Data Science: primer contacto con Python",
      focus: "Propósito de programar, ambientes, variables, tipos, operadores, decisiones, funciones y depuración."
    }
  },
  {
    number: "02",
    ready: false,
    en: { topic: "Data structures", focus: "Lists, dictionaries, iteration, and structured representations." },
    es: { topic: "Estructuras de datos", focus: "Listas, diccionarios, iteración y representaciones estructuradas." }
  },
  {
    number: "03",
    ready: false,
    en: { topic: "NumPy foundations", focus: "Arrays, vectorized operations, indexing, and numerical thinking." },
    es: { topic: "Fundamentos de NumPy", focus: "Arreglos, operaciones vectorizadas, indexación y pensamiento numérico." }
  },
  {
    number: "04",
    ready: false,
    en: { topic: "Pandas and Polars", focus: "DataFrames, selection, transformations, grouping, and comparison of workflows." },
    es: { topic: "Pandas y Polars", focus: "DataFrames, selección, transformaciones, agrupación y comparación de flujos." }
  },
  {
    number: "05",
    ready: false,
    en: { topic: "Loading and cleaning data", focus: "Files, missing values, inconsistent data, and reproducible cleaning steps." },
    es: { topic: "Carga y limpieza de datos", focus: "Archivos, valores faltantes, datos inconsistentes y pasos reproducibles de limpieza." }
  },
  {
    number: "06",
    ready: false,
    en: { topic: "Visualization and exploratory analysis", focus: "Charts, summaries, patterns, and responsible interpretation." },
    es: { topic: "Visualización y análisis exploratorio", focus: "Gráficas, resúmenes, patrones e interpretación responsable." }
  },
  {
    number: "07",
    ready: false,
    en: { topic: "Reusable analytical code", focus: "Functions, modules, notebooks, documentation, and final integration." },
    es: { topic: "Código analítico reutilizable", focus: "Funciones, módulos, notebooks, documentación e integración final." }
  }
];

const schedule = [
  { day: "25", month: { en: "August", es: "agosto" }, duration: "" },
  { day: "1", month: { en: "September", es: "septiembre" }, duration: "" },
  { day: "8", month: { en: "September", es: "septiembre" }, duration: "" },
  { day: "15", month: { en: "September", es: "septiembre" }, duration: "" },
  { day: "22", month: { en: "September", es: "septiembre" }, duration: "" },
  { day: "29", month: { en: "September", es: "septiembre" }, duration: "" },
  { day: "6", month: { en: "October", es: "octubre" }, duration: "3 hrs" }
];

function getLanguage() {
  const saved = localStorage.getItem(STORE_KEY);
  return saved === "es" ? "es" : "en";
}

function setLanguage(lang) {
  localStorage.setItem(STORE_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (copy[lang][key]) node.textContent = copy[lang][key];
  });
  renderSessionRows(lang);
  renderSchedule(lang);
  if (document.body.dataset.page === "session") loadLesson(lang);
}

function renderSchedule(lang) {
  const target = document.querySelector("#scheduleGrid");
  if (!target) return;

  const weekday = lang === "es" ? "martes" : "Tuesday";
  const durationLabel = lang === "es" ? "3 horas" : "3 hours";
  target.innerHTML = schedule.map((item) => `
    <article class="schedule-card">
      <strong>${item.day}</strong>
      <span>${weekday}</span>
      <span>${item.month[lang]}${item.duration ? ` · ${durationLabel}` : ""}</span>
    </article>
  `).join("");
}

function renderSessionRows(lang) {
  const target = document.querySelector("#sessionRows");
  if (!target) return;

  const labels = copy[lang];
  target.innerHTML = sessions.map((session) => {
    const data = session[lang];
    const status = session.ready ? labels["status.ready"] : labels["status.soon"];
    const action = session.ready
      ? `<a class="button primary" href="${session.href}">${labels["action.open"]}</a>`
      : `<span class="status-pill">${labels["action.pending"]}</span>`;

    return `
      <tr>
        <td data-label="${labels["table.session"]}">${session.number}</td>
        <td data-label="${labels["table.topic"]}"><strong>${data.topic}</strong></td>
        <td data-label="${labels["table.focus"]}">${data.focus}</td>
        <td data-label="${labels["table.status"]}"><span class="status-pill ${session.ready ? "ready" : ""}">${status}</span></td>
        <td data-label="${labels["table.action"]}">${action}</td>
      </tr>
    `;
  }).join("");
}

function stripFrontMatter(markdown) {
  return markdown.replace(/^---[\s\S]*?---\s*/, "");
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function prepareMarkdown(markdown) {
  return stripFrontMatter(markdown)
    .replace(/<div class="([^"]+)" markdown="1">\s*/g, "\n\n@@OPEN:$1@@\n\n")
    .replace(/<\/div>/g, "\n\n@@CLOSE@@\n\n");
}

function parseContainers(markdown) {
  const root = { type: "root", children: [], buffer: [] };
  const stack = [root];

  prepareMarkdown(markdown).split("\n").forEach((line) => {
    const open = line.match(/^@@OPEN:(.+)@@$/);
    const close = line.match(/^@@CLOSE@@$/);
    const current = stack[stack.length - 1];

    if (open) {
      flushBuffer(current);
      const node = { type: "container", className: open[1], children: [], buffer: [] };
      current.children.push(node);
      stack.push(node);
      return;
    }

    if (close && stack.length > 1) {
      flushBuffer(current);
      stack.pop();
      return;
    }

    current.buffer.push(line);
  });

  while (stack.length) flushBuffer(stack.pop());
  return root.children;
}

function flushBuffer(node) {
  if (!node.buffer.length) return;
  const text = node.buffer.join("\n").trim();
  if (text) node.children.push({ type: "markdown", text });
  node.buffer = [];
}

function renderNodes(nodes) {
  return nodes.map((node) => {
    if (node.type === "container") {
      return `<div class="${node.className}">${renderNodes(node.children)}</div>`;
    }
    return marked.parse(node.text);
  }).join("");
}

function enhanceLesson() {
  document.querySelectorAll(".markdown-body pre code.language-mermaid").forEach((code) => {
    const wrapper = document.createElement("div");
    wrapper.className = "mermaid";
    wrapper.textContent = code.textContent;
    code.closest("pre").replaceWith(wrapper);
  });

  document.querySelectorAll(".markdown-body h2").forEach((heading) => {
    if (!heading.id) heading.id = slugify(heading.textContent);
  });

  const toc = document.querySelector("#lessonToc");
  if (toc) {
    toc.innerHTML = Array.from(document.querySelectorAll(".markdown-body h2"))
      .map((heading) => `<li><a href="#${heading.id}">${heading.textContent}</a></li>`)
      .join("");
  }

  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      themeVariables: {
        primaryColor: "#0b1020",
        primaryTextColor: "#eef6ff",
        primaryBorderColor: "#62f7ff",
        lineColor: "#ff4fd8",
        secondaryColor: "#111a30",
        tertiaryColor: "#061018"
      }
    });
    mermaid.run({ querySelector: ".mermaid" });
  }
}

async function loadLesson(lang) {
  const status = document.querySelector("#lessonStatus");
  const content = document.querySelector("#lessonContent");
  if (!content) return;

  status.textContent = copy[lang]["lesson.loading"];
  const path = `../session-01_${lang}.md`;

  try {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    content.innerHTML = renderNodes(parseContainers(markdown));
    status.textContent = "";
    enhanceLesson();
  } catch (error) {
    status.textContent = copy[lang]["lesson.error"];
    console.error(error);
  }
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(getLanguage());
