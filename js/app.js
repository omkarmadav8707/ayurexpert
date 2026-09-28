/**
 * AyurExpert — Main Application Controller (Enhanced v2.0)
 * ──────────────────────────────────────────────────────────
 * Features:
 *  • Premium animated SVG tridosha wheel on home
 *  • Live dosha tracker sidebar (real-time bar + mini triangle updates)
 *  • Slide-transition question wizard with dosha-coloured option cards
 *  • Animated confidence ring (SVG arc)
 *  • Animated barycentric triangle point
 *  • 6-axis radar spider chart
 *  • Recommendations tabs (diet / lifestyle / yoga)
 *  • Paginated sortable rule browser
 *  • Animated async test suite runner
 *  • Dosha encyclopedia renderer
 */

import { QUESTIONNAIRE_DATA } from "./data/questions.js";
import { RULE_BASE }           from "./data/rules.js";
import { DOSHA_DETAILS, PRAKRITI_PROFILES } from "./data/doshas.js";
import { TEST_SUITE }          from "./data/testCases.js";
import { validateAnswers, evaluateRules } from "./engine/ruleEngine.js";
import { computeScoreProfile } from "./engine/scoring.js";
import { classifyPrakriti, DEFAULT_THRESHOLDS } from "./engine/classifier.js";
import { buildExplanation }    from "./engine/explainer.js";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const DOSHA_CSS = { VATA: "vata", PITTA: "pitta", KAPHA: "kapha" };
const DOSHA_EMOJI = { VATA: "💨", PITTA: "🔥", KAPHA: "💧" };
const OPTION_CLASS = { A1: "vata-opt", A2: "pitta-opt", A3: "kapha-opt", A4: "sama-opt" };
const OPTION_DOSHA = { A1: "vata", A2: "pitta", A3: "kapha", A4: "sama" };
const OPTION_LETTERS = { A1: "A", A2: "B", A3: "C", A4: "D" };

const AGNI_LABELS = {
  SAMAGNI: { label: "Samagni", desc: "Balanced, regular digestive fire — optimal metabolic efficiency." },
  TIKSHNAGNI: { label: "Tikshnagni", desc: "Sharp, intense digestive fire — rapid metabolism, prone to hyperacidity." },
  VISHAMAGNI: { label: "Vishamagni", desc: "Irregular, variable digestive fire — unpredictable digestion, gas." },
  MANDAGNI: { label: "Mandagni", desc: "Slow, sluggish digestive fire — slow metabolism, weight gain tendency." }
};
const KOSHTHA_LABELS = {
  KRURA: { label: "Krura Koshtha", desc: "Dry, hard bowels — constipation tendency, Vata dominant motility." },
  MRIDU: { label: "Mridu Koshtha", desc: "Soft, loose bowels — frequent loose stools, Pitta dominant motility." },
  MADHYAMA: { label: "Madhyama Koshtha", desc: "Balanced bowel motility — regular elimination, Kapha equilibrium." }
};

/* ─── App State ──────────────────────────────────────────────────────────── */
const state = {
  currentView: "home",
  theme: localStorage.getItem("iks_theme") || "dark",
  currentQIndex: 0,
  answers: loadAnswers(),
  evaluation: null,
  scoreProfile: null,
  classification: null,
  explanation: null,
  activeEvidenceFilter: "ALL",
  activeRecoTab: "diet",
  rulePage: 0,
  ruleFilter: "ALL",
  ruleSearch: "",
  ruleSort: { col: null, dir: 1 },
  activeDoshaTab: "VATA",
  filteredRules: [...RULE_BASE],
  testsRun: false
};

/* ─── Storage ─────────────────────────────────────────────────────────────── */
function loadAnswers() {
  try { return JSON.parse(sessionStorage.getItem("iks_v2_answers") || "{}"); }
  catch { return {}; }
}
function saveAnswers() {
  try { sessionStorage.setItem("iks_v2_answers", JSON.stringify(state.answers)); }
  catch {}
}

/* ─── Utilities ──────────────────────────────────────────────────────────── */
function qs(id) { return document.getElementById(id); }
function qsa(sel) { return document.querySelectorAll(sel); }
function answeredCount() { return Object.keys(state.answers).filter(k => state.answers[k]).length; }
function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

/* ═══════════════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(state.theme);
  buildQPalette();
  buildRuleTable();
  buildTestTable();
  buildDoshaEncyclopedia();
  buildHomeWheel();
  bindEvents();

  // URL hash routing
  const hash = location.hash.replace("#", "");
  navigateTo(["home","assessment","results","academic","methodology","doshas"].includes(hash) ? hash : "home");

  // Restore prior session
  if (validateAnswers(state.answers).isValid) {
    runInference(false);
  }
  updateLiveTracker();
});

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════════════════ */
function navigateTo(view, pushHistory = true) {
  // Hide all
  qsa(".view-container").forEach(v => v.classList.remove("active"));
  qsa(".nav-link-btn").forEach(b => b.classList.remove("active"));

  // Show target
  const el = qs(`view-${view}`);
  if (el) {
    el.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const navBtn = qs(`nav-${view}`);
  if (navBtn) navBtn.classList.add("active");

  state.currentView = view;
  if (pushHistory) history.pushState({}, "", `#${view}`);

  // View-specific logic
  if (view === "assessment") renderQuestion(state.currentQIndex);
  if (view === "results") renderResults();
  if (view === "methodology") applyRuleFilter();

  // Close mobile menu
  qs("navLinks")?.classList.remove("mobile-open");
}

/* ═══════════════════════════════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("iks_theme", theme);
  state.theme = theme;
  const btn = qs("themeToggleBtn");
  if (!btn) return;
  btn.innerHTML = theme === "light"
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOME — DOSHA WHEEL SVG
═══════════════════════════════════════════════════════════════════════════ */
function buildHomeWheel() {
  const svg = qs("doshaWheelSvg");
  if (!svg) return;
  const arcs = qs("wheelArcs");
  if (!arcs) return;

  // Default equal thirds display
  drawWheelArcs(arcs, 33, 33, 34);

  // Animate rotation
  svg.style.animation = "none";
  let angle = 0;
  function animateWheel() {
    angle += 0.15;
    arcs.setAttribute("transform", `rotate(${angle} 150 150)`);
    requestAnimationFrame(animateWheel);
  }
  animateWheel();
}

function drawWheelArcs(container, vataPct, pittaPct, kaphaPct) {
  const cx = 150, cy = 150, r = 110, sw = 22;
  const perimeter = 2 * Math.PI * r;

  const segments = [
    { pct: pittaPct, color: "#FB923C", offset: 0, label: "P" },
    { pct: vataPct,  color: "#818CF8", label: "V" },
    { pct: kaphaPct, color: "#34D399", label: "K" }
  ];

  let currentAngle = -90;
  container.innerHTML = "";

  segments.forEach(seg => {
    const frac = seg.pct / 100;
    const dashLen = perimeter * frac;
    const dashGap = perimeter - dashLen;
    const rotate = currentAngle;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", seg.color);
    circle.setAttribute("stroke-width", sw);
    circle.setAttribute("stroke-dasharray", `${dashLen} ${dashGap}`);
    circle.setAttribute("stroke-dashoffset", 0);
    circle.setAttribute("transform", `rotate(${rotate} ${cx} ${cy})`);
    circle.style.opacity = "0.8";
    container.appendChild(circle);

    currentAngle += (frac * 360);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   ASSESSMENT — QUESTION RENDERING
═══════════════════════════════════════════════════════════════════════════ */
function renderQuestion(idx, direction = 0) {
  const q = QUESTIONNAIRE_DATA[idx];
  if (!q) return;

  const card = qs("questionCard");
  const total = QUESTIONNAIRE_DATA.length;

  // Animate slide
  if (direction !== 0 && card) {
    const outClass = direction > 0 ? "slide-out-left" : "slide-out-right";
    const inClass  = direction > 0 ? "slide-in-right" : "slide-in-left";
    card.classList.add(outClass);
    setTimeout(() => {
      card.classList.remove(outClass);
      _populateQuestion(q, idx, total);
      card.classList.add(inClass);
      setTimeout(() => card.classList.remove(inClass), 280);
    }, 230);
  } else {
    _populateQuestion(q, idx, total);
  }

  // Update progress
  const pct = Math.round(((idx) / total) * 100);
  const fill = qs("progressFill");
  if (fill) fill.style.width = `${Math.max(4, pct)}%`;
  el("currentQNum", idx + 1);
  el("qNumBadge", `Q${String(idx + 1).padStart(2,"0")} / ${total}`);

  // Buttons
  const prevBtn = qs("prevBtn");
  const nextBtn = qs("nextBtn");
  const submitBtn = qs("submitBtn");
  if (prevBtn) prevBtn.disabled = idx === 0;

  const allAnswered = validateAnswers(state.answers).isValid;
  if (submitBtn) {
    submitBtn.style.display = (idx === total - 1 && allAnswered) ? "inline-flex" : "none";
    nextBtn.style.display   = (idx === total - 1 && allAnswered) ? "none" : "inline-flex";
  }

  updateProgressSegments(idx);
  updateQPalette(idx);
  updateLiveTracker();
}

function _populateQuestion(q, idx, total) {
  el("qDomainTag", q.domain || "General");
  el("qTierTag", q.tierName || `Tier ${q.tier}`);
  el("qSanskritTerm", q.sanskritTerm || "");
  el("questionText", q.text);
  el("questionHint", q.hint || "");

  const grid = qs("optionsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  q.options.forEach(opt => {
    const optClass = OPTION_CLASS[opt.id] || "sama-opt";
    const dLabel   = OPTION_DOSHA[opt.id] || "sama";
    const letter   = OPTION_LETTERS[opt.id] || opt.id;
    const isSelected = state.answers[q.id] === opt.id;

    const btn = document.createElement("button");
    btn.className = `option-card ${optClass}${isSelected ? " selected" : ""}`;
    btn.setAttribute("data-qid", q.id);
    btn.setAttribute("data-aid", opt.id);
    btn.setAttribute("aria-pressed", isSelected);
    btn.innerHTML = `
      <div class="option-header">
        <span class="option-letter">${letter}</span>
        <span class="option-title">${opt.text}</span>
      </div>
      ${opt.subtext ? `<p class="option-desc">${opt.subtext}</p>` : ""}
      <span class="option-dosha-tag ${dLabel}">${DOSHA_EMOJI[dLabel.toUpperCase()] || "✦"} ${dLabel === "sama" ? "Balanced" : dLabel.charAt(0).toUpperCase() + dLabel.slice(1)}</span>
      <div class="option-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>`;

    btn.addEventListener("click", () => selectOption(q.id, opt.id, idx, total));
    grid.appendChild(btn);
  });
}

function selectOption(qid, aid, idx, total) {
  state.answers[qid] = aid;
  saveAnswers();

  // Visual update — deselect all, select chosen
  qsa(`[data-qid="${qid}"]`).forEach(b => {
    const isThis = b.getAttribute("data-aid") === aid;
    b.classList.toggle("selected", isThis);
    b.setAttribute("aria-pressed", isThis);
  });

  updateQPalette(idx);
  updateLiveTracker();

  const allDone = validateAnswers(state.answers).isValid;
  const submitBtn = qs("submitBtn");
  const nextBtn = qs("nextBtn");
  if (submitBtn) {
    submitBtn.style.display = (idx === total - 1 && allDone) ? "inline-flex" : "none";
    nextBtn.style.display   = (idx === total - 1 && allDone) ? "none" : "inline-flex";
  }

  // Auto-advance after short delay
  if (idx < total - 1) {
    setTimeout(() => {
      state.currentQIndex = idx + 1;
      renderQuestion(state.currentQIndex, 1);
    }, 400);
  } else if (allDone) {
    setTimeout(showCompletion, 500);
  }
}

function showCompletion() {
  const card = qs("questionCard");
  const banner = qs("completionBanner");
  if (card) card.style.display = "none";
  if (banner) banner.classList.add("visible");
  runInference(true);
}

/* ─── Progress Segments ─────────────────────────────────────────────────── */
function updateProgressSegments(currentIdx) {
  const seg = qs("progressSegments");
  if (!seg) return;
  seg.innerHTML = "";
  QUESTIONNAIRE_DATA.forEach((q, i) => {
    const d = document.createElement("div");
    d.className = `progress-seg ${state.answers[q.id] ? "done" : ""} ${i === currentIdx ? "curr" : ""}`;
    seg.appendChild(d);
  });
}

/* ─── Question Palette ───────────────────────────────────────────────────── */
function buildQPalette() {
  const grid = qs("qPaletteGrid");
  if (!grid) return;
  QUESTIONNAIRE_DATA.forEach((q, i) => {
    const dot = document.createElement("button");
    dot.className = "q-palette-dot";
    dot.id = `qdot-${i}`;
    dot.title = q.text.substring(0, 50);
    dot.setAttribute("aria-label", `Question ${i + 1}`);
    dot.addEventListener("click", () => {
      state.currentQIndex = i;
      const card = qs("questionCard");
      const banner = qs("completionBanner");
      if (card) card.style.display = "";
      if (banner) banner.classList.remove("visible");
      renderQuestion(i);
    });
    grid.appendChild(dot);
  });
}

function updateQPalette(currentIdx) {
  const answered = answeredCount();
  el("answeredCount", `${answered}/${QUESTIONNAIRE_DATA.length}`);
  QUESTIONNAIRE_DATA.forEach((q, i) => {
    const dot = qs(`qdot-${i}`);
    if (!dot) return;
    dot.className = `q-palette-dot${state.answers[q.id] ? " answered" : ""}${i === currentIdx ? " current" : ""}`;
  });
}

/* ─── Live Dosha Tracker ─────────────────────────────────────────────────── */
function updateLiveTracker() {
  if (answeredCount() < 2) {
    ["Vata","Pitta","Kapha"].forEach(d => {
      el(`tracker${d}Pct`, "—");
      const bar = qs(`tracker${d}Bar`);
      if (bar) bar.style.width = "33%";
    });
    el("trackerLeaning", "Awaiting answers…");
    el("trackerConfidence", "—%");
    return;
  }

  const ev = evaluateRules(state.answers);
  const sp = computeScoreProfile(ev.adjustedScores, ev.rawScores);

  const { vata, pitta, kapha } = sp.percentages;
  el("trackerVataPct",  `${vata}%`);
  el("trackerPittaPct", `${pitta}%`);
  el("trackerKaphaPct", `${kapha}%`);
  const vatBar = qs("trackerVataBar");
  const pitBar = qs("trackerPittaBar");
  const kapBar = qs("trackerKaphaBar");
  if (vatBar) vatBar.style.width = `${vata}%`;
  if (pitBar) pitBar.style.width = `${pitta}%`;
  if (kapBar) kapBar.style.width = `${kapha}%`;

  // Mini triangle point
  const bp = sp.barycentricPoint;
  // Triangle vertices (trackerTriangleSvg viewBox 0 0 140 120): Pitta=70,8 Vata=10,108 Kapha=130,108
  const tx = (sp.ranked[0].key === "vata" ? 10 : sp.ranked[0].key === "kapha" ? 130 : 70);
  const ty = (sp.ranked[0].key === "pitta" ? 8 : 108);
  const vNorm = vata / 100, pNorm = pitta / 100, kNorm = kapha / 100;
  const ptx = 10 * vNorm + 70 * pNorm + 130 * kNorm;
  const pty = 108 * vNorm + 8 * pNorm + 108 * kNorm;
  const pt = qs("trackerPoint");
  if (pt) { pt.setAttribute("cx", ptx.toFixed(1)); pt.setAttribute("cy", pty.toFixed(1)); }

  // Leaning label
  const top = sp.ranked[0];
  const sec = sp.ranked[1];
  const diff = top.score - sec.score;
  let leaning = diff > 6 ? `${top.label} Dominant` : `${top.label}–${sec.label} Dual`;
  el("trackerLeaning", leaning);
  el("trackerConfidence", `${ev.confidencePct}%`);
}

/* ═══════════════════════════════════════════════════════════════════════════
   INFERENCE ENGINE
═══════════════════════════════════════════════════════════════════════════ */
function runInference(showResults) {
  const ev = evaluateRules(state.answers);
  const sp = computeScoreProfile(ev.adjustedScores, ev.rawScores);
  const cl = classifyPrakriti(sp.ranked, DEFAULT_THRESHOLDS, {
    agni: ev.agniEvaluation,
    koshtha: ev.koshthaEvaluation,
    manas: ev.manasEvaluation
  });
  const ex = buildExplanation(ev, sp, cl);

  state.evaluation = ev;
  state.scoreProfile = sp;
  state.classification = cl;
  state.explanation = ex;

  if (showResults) navigateTo("results");
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESULTS RENDERING
═══════════════════════════════════════════════════════════════════════════ */
function renderResults() {
  const empty = qs("resultsEmpty");
  const content = qs("resultsContent");

  if (!state.classification) {
    if (empty) empty.style.display = "flex";
    if (content) content.style.display = "none";
    return;
  }

  if (empty) empty.style.display = "none";
  if (content) content.style.display = "block";

  const cl = state.classification;
  const sp = state.scoreProfile;
  const ev = state.evaluation;

  // Get profile info
  const profile = PRAKRITI_PROFILES[cl.prakritiCode] || PRAKRITI_PROFILES[cl.leadingDosha] || {};

  // Hero Banner
  el("resultsPrakritiName", profile.title || cl.prakritiCode);
  el("resultsPrakritiDevan", profile.sanskritTitle || "");
  el("resultsPrakritiTagline", profile.tagline || cl.reasoning?.substring(0, 120) || "");

  // Meta pills
  const pills = qs("resultsMetaPills");
  if (pills) {
    pills.innerHTML = `
      <span class="badge badge-saffron">${cl.categoryType}</span>
      <span class="badge badge-jade">${cl.directionality?.replace(/_/g," ")}</span>
      ${cl.leadingDosha !== "BALANCED" ? `<span class="badge badge-vata">${DOSHA_EMOJI[cl.leadingDosha] || ""} ${cl.leadingDosha}</span>` : ""}
      ${cl.secondaryDosha ? `<span class="badge badge-pitta">${DOSHA_EMOJI[cl.secondaryDosha] || ""} ${cl.secondaryDosha}</span>` : ""}
    `;
  }

  // Confidence Ring
  const confPct = ev.confidencePct;
  el("ringPct", `${confPct}%`);
  setTimeout(() => {
    const arc = qs("confidenceArc");
    if (arc) {
      const circum = 352;
      arc.setAttribute("stroke-dashoffset", circum - (confPct / 100 * circum));
    }
  }, 200);

  // Analysis Strip
  el("metricFiredRules", ev.totalFired);
  el("metricExecTime", `${ev.executionTimeMs}ms`);
  el("metricDissonance", `${sp.dissonanceIndex}%`);
  el("metricMargin", `${sp.margins.diff12.toFixed(1)}pt`);

  // Dosha Score Bars
  renderScoreBars(sp);

  // Barycentric Point
  updateBarycentricPoint(sp);

  // Sub-classifiers
  renderSubClassifiers(cl, ev);

  // Radar
  setTimeout(() => renderRadar(sp), 300);

  // Recommendations
  renderRecommendations(profile);

  // Evidence table
  renderEvidenceTable(ev.firedRules, state.activeEvidenceFilter);

  // Update home wheel with real scores
  const arcs = qs("wheelArcs");
  if (arcs) drawWheelArcs(arcs, sp.percentages.vata, sp.percentages.pitta, sp.percentages.kapha);
}

/* ─── Score Bars ──────────────────────────────────────────────────────── */
function renderScoreBars(sp) {
  const container = qs("doshaScoreRows");
  if (!container) return;
  container.innerHTML = "";

  sp.ranked.forEach((d, rank) => {
    const key = d.key;
    const row = document.createElement("div");
    row.className = "dosha-score-row";
    row.innerHTML = `
      <div class="dscore-label-row">
        <span class="dscore-name">
          <span class="dscore-dot ${key}"></span>
          ${DOSHA_EMOJI[d.dosha]} ${d.label}
          ${rank === 0 ? '<span class="badge badge-saffron" style="font-size:0.65rem;padding:2px 7px">Primary</span>' : ""}
        </span>
        <span class="dscore-pct ${key}">${d.percentage}%</span>
      </div>
      <div class="dscore-bar-track">
        <div class="dscore-bar-fill ${key}" id="sbar-${key}" style="width:0%"></div>
      </div>
      <div class="dscore-details">
        <span>Adjusted: <strong>${d.score.toFixed(1)}</strong></span>
        <span>Raw: ${d.rawScore.toFixed(1)}</span>
      </div>`;
    container.appendChild(row);
  });

  // Animate bars
  setTimeout(() => {
    sp.ranked.forEach(d => {
      const bar = qs(`sbar-${d.key}`);
      if (bar) bar.style.width = `${d.percentage}%`;
    });
  }, 100);
}

/* ─── Barycentric Point ──────────────────────────────────────────────── */
function updateBarycentricPoint(sp) {
  // SVG viewBox 0 0 380 330, vertices: Pitta=190,20  Vata=40,280  Kapha=340,280
  const vN = sp.percentages.vata / 100;
  const pN = sp.percentages.pitta / 100;
  const kN = sp.percentages.kapha / 100;
  const bx = 40 * vN + 190 * pN + 340 * kN;
  const by = 280 * vN + 20 * pN + 280 * kN;
  const pt = qs("barycentricPoint");
  if (pt) {
    pt.setAttribute("cx", bx.toFixed(1));
    pt.setAttribute("cy", by.toFixed(1));
  }
}

/* ─── Sub-Classifiers ────────────────────────────────────────────────── */
function renderSubClassifiers(cl, ev) {
  // Agni
  const agni = AGNI_LABELS[cl.agniCode] || { label: cl.agniCode, desc: "" };
  el("agniVal", agni.label);
  el("agniDesc", agni.desc);

  // Koshtha
  const koshtha = KOSHTHA_LABELS[cl.koshthaCode] || { label: cl.koshthaCode, desc: "" };
  el("koshthaVal", koshtha.label);
  el("koshthaDesc", koshtha.desc);

  // Manas
  const manas = ev.manasEvaluation;
  if (manas) {
    el("manasVal", manas.dominantGuna);
    const sv = qs("sattvBar"), rv = qs("rajasBar"), tv = qs("tamasBar");
    const sp2 = qs("sattvPct"), rp = qs("rajasPct"), tp = qs("tamasPct");
    setTimeout(() => {
      if (sv) sv.style.width = `${manas.sattvaPct}%`;
      if (rv) rv.style.width = `${manas.rajasPct}%`;
      if (tv) tv.style.width = `${manas.tamasPct}%`;
      if (sp2) sp2.textContent = `${manas.sattvaPct}%`;
      if (rp) rp.textContent = `${manas.rajasPct}%`;
      if (tp) tp.textContent = `${manas.tamasPct}%`;
    }, 200);
  }
}

/* ─── Radar Spider Chart ─────────────────────────────────────────────── */
function renderRadar(sp) {
  const svg = qs("radarSpiderSvg");
  if (!svg) return;
  const grid = qs("radarGrid");
  const shape = qs("radarShape");
  const labels = qs("radarLabels");
  const dots = qs("radarDots");
  if (!grid || !shape || !labels || !dots) return;

  const cx = 140, cy = 140, maxR = 100;
  const axes = [
    { key: "mobility",      label: "Mobility",      emoji: "💨" },
    { key: "thermogenesis", label: "Thermogenesis", emoji: "🔥" },
    { key: "cohesion",      label: "Cohesion",      emoji: "🌍" },
    { key: "lightness",     label: "Lightness",     emoji: "✨" },
    { key: "sharpness",     label: "Sharpness",     emoji: "⚡" },
    { key: "stability",     label: "Stability",     emoji: "🌿" }
  ];
  const n = axes.length;

  // Draw grid rings
  grid.innerHTML = "";
  [0.25, 0.5, 0.75, 1.0].forEach(frac => {
    const pts = axes.map((_, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      return `${cx + maxR * frac * Math.cos(angle)},${cy + maxR * frac * Math.sin(angle)}`;
    }).join(" ");
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", pts);
    poly.setAttribute("fill", "none");
    poly.setAttribute("stroke", "rgba(255,255,255,0.06)");
    poly.setAttribute("stroke-width", "1");
    grid.appendChild(poly);
  });

  // Axis lines
  axes.forEach((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", cx); line.setAttribute("y1", cy);
    line.setAttribute("x2", cx + maxR * Math.cos(angle));
    line.setAttribute("y2", cy + maxR * Math.sin(angle));
    line.setAttribute("stroke", "rgba(255,255,255,0.06)");
    line.setAttribute("stroke-width", "1");
    grid.appendChild(line);
  });

  // Shape
  const radarVals = sp.radarAxes;
  const shapePoints = axes.map((ax, i) => {
    const val = radarVals[ax.key] || 0.5;
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return `${cx + maxR * val * Math.cos(angle)},${cy + maxR * val * Math.sin(angle)}`;
  }).join(" ");
  shape.setAttribute("points", shapePoints);

  // Labels
  labels.innerHTML = "";
  dots.innerHTML = "";
  axes.forEach((ax, i) => {
    const val = radarVals[ax.key] || 0.5;
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const lx = cx + (maxR + 20) * Math.cos(angle);
    const ly = cy + (maxR + 20) * Math.sin(angle);
    const dx = cx + maxR * val * Math.cos(angle);
    const dy = cy + maxR * val * Math.sin(angle);

    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("x", lx);
    txt.setAttribute("y", ly + 4);
    txt.setAttribute("text-anchor", "middle");
    txt.setAttribute("fill", "rgba(148,163,184,0.8)");
    txt.setAttribute("font-size", "9");
    txt.setAttribute("font-family", "Outfit,sans-serif");
    txt.textContent = `${ax.emoji} ${ax.label}`;
    labels.appendChild(txt);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", dx); dot.setAttribute("cy", dy); dot.setAttribute("r", "4");
    dot.setAttribute("fill", "#F97316"); dot.setAttribute("stroke", "white"); dot.setAttribute("stroke-width", "1.5");
    dots.appendChild(dot);
  });
}

/* ─── Recommendations ────────────────────────────────────────────────── */
const DEFAULT_RECOS = {
  VATA: {
    diet: [
      { icon: "🍲", title: "Warm, Oily Foods", desc: "Prefer warm cooked meals with ghee, sesame oil, and moist textures to counter dryness." },
      { icon: "🥛", title: "Nourishing Dairy", desc: "Warm milk with ashwagandha or nutmeg aids grounding and sleep quality." },
      { icon: "🚫", title: "Avoid Raw/Cold Foods", desc: "Cold salads, raw vegetables, and carbonated drinks aggravate Vata." },
      { icon: "🫚", title: "Sweet, Sour, Salty Tastes", desc: "These three pacifying tastes (Rasas) balance Vata's dry, cold, mobile nature." }
    ],
    lifestyle: [
      { icon: "⏰", title: "Regular Routine (Dinacharya)", desc: "Fixed wake, meal, and sleep times deeply pacify erratic Vata energy." },
      { icon: "🛁", title: "Abhyanga (Oil Massage)", desc: "Daily self-massage with sesame oil grounds Vata and nourishes the nervous system." },
      { icon: "🌡️", title: "Warmth & Shelter", desc: "Protect from cold, wind, and dryness; prefer warm, humid climates." },
      { icon: "😴", title: "Adequate Sleep", desc: "Vata types need 8–9 hours; irregular sleep worsens anxiety and depletion." }
    ],
    yoga: [
      { icon: "🧘", title: "Slow, Grounding Asanas", desc: "Balasana, Virasana, Shavasana — slow held postures over dynamic flow." },
      { icon: "🌿", title: "Ashwagandha & Shatavari", desc: "Adaptogenic herbs that nourish depleted Vata tissues and support Ojas." },
      { icon: "🫁", title: "Nadi Shodhana Pranayama", desc: "Alternate nostril breathing balances Vata's erratic Prana movement." },
      { icon: "🎵", title: "Sound & Music Therapy", desc: "Dhrupad classical ragas pacify and ground the mobile Vata mind." }
    ]
  },
  PITTA: {
    diet: [
      { icon: "🥗", title: "Cool, Sweet Foods", desc: "Favour cooling cucumbers, coconut, sweet fruits, and room-temperature meals." },
      { icon: "🌿", title: "Bitter & Astringent Tastes", desc: "Leafy greens, turmeric, coriander calm Pitta's intense digestive fire." },
      { icon: "🚫", title: "Avoid Spicy/Fermented", desc: "Chillies, vinegar, alcohol, and excess salt overheat Pitta." },
      { icon: "🥥", title: "Coconut & Pomegranate", desc: "Classically cooling foods that pacify Pitta's fire without reducing Agni." }
    ],
    lifestyle: [
      { icon: "🌊", title: "Cool Environments", desc: "Moonlight walks, swimming, and cool climates balance Pitta's thermogenic excess." },
      { icon: "⚖️", title: "Moderation in Work", desc: "Avoid perfectionism and overwork — the Pitta mind's greatest imbalance trigger." },
      { icon: "🌸", title: "Sandalwood & Rose", desc: "Cooling Pitta-pacifying aromas for Abhyanga and aromatherapy practice." },
      { icon: "🤝", title: "Compassion Practice", desc: "Cultivating forgiveness and letting go of control calms Pitta's Rajas excess." }
    ],
    yoga: [
      { icon: "🧊", title: "Cooling Asanas", desc: "Moon salutations (Chandra Namaskar), forward bends, and Shavasana." },
      { icon: "🌿", title: "Amalaki & Shatavari", desc: "Cooling Rasayanas that build Ojas while pacifying Pitta's heat." },
      { icon: "🌬️", title: "Sheetali Pranayama", desc: "Cooling breath through rolled tongue — directly reduces internal Pitta heat." },
      { icon: "🎨", title: "Creative Expression", desc: "Channelling Pitta's intensity into art, music, or writing without competition." }
    ]
  },
  KAPHA: {
    diet: [
      { icon: "🌶️", title: "Light, Spicy, Dry Foods", desc: "Favour pungent, bitter, astringent foods; dry-cooked grains and legumes." },
      { icon: "🫚", title: "Minimal Oils & Dairy", desc: "Kapha types need reduced fat intake — use small amounts of lighter oils." },
      { icon: "☕", title: "Warm Stimulating Drinks", desc: "Ginger tea, black pepper, and tulsi warm and stimulate slow Kapha digestion." },
      { icon: "🚫", title: "Avoid Sweets & Heavy Foods", desc: "Sweet, sour, salty tastes increase Kapha's heaviness and fluid retention." }
    ],
    lifestyle: [
      { icon: "🏃", title: "Vigorous Daily Exercise", desc: "Kapha types thrive with aerobic exercise — jogging, dance, or vigorous yoga." },
      { icon: "☀️", title: "Early Rising", desc: "Wake before sunrise (Brahma Muhurta) to avoid heavy Kapha morning lethargy." },
      { icon: "🌬️", title: "Dry Brushing (Udvartana)", desc: "Stimulating powder massage instead of oil to activate sluggish Kapha circulation." },
      { icon: "✨", title: "Stimulating Experiences", desc: "Novel experiences, travel, and social engagement counter Kapha's tendency to stagnate." }
    ],
    yoga: [
      { icon: "🔥", title: "Surya Namaskar (Fast)", desc: "Vigorous sun salutations, Kapalabhati, and standing sequences stimulate Kapha." },
      { icon: "🌿", title: "Trikatu & Guggulu", desc: "Metabolic stimulant herbs that kindle Mandagni and reduce excess Kapha." },
      { icon: "💪", title: "Kapalabhati Pranayama", desc: "Forceful breath of fire clears respiratory Kapha and stimulates digestive fire." },
      { icon: "🎯", title: "Goal Setting & Purpose", desc: "Kapha thrives when motivated by clear long-term goals and community purpose." }
    ]
  }
};

function renderRecommendations(profile) {
  const leadingDosha = state.classification?.leadingDosha || "VATA";
  const recos = DEFAULT_RECOS[leadingDosha] || DEFAULT_RECOS.VATA;

  Object.entries(recos).forEach(([tab, items]) => {
    const panel = qs(`recoPanelDiet`)?.getAttribute("data-reco-panel") === tab
      ? qs("recoPanelDiet")
      : qs(`recoPanelLifestyle`)?.getAttribute("data-reco-panel") === tab
        ? qs("recoPanelLifestyle")
        : qs("recoPanelYoga");

    // Find by data attribute
    const p = document.querySelector(`[data-reco-panel="${tab}"]`);
    if (!p) return;
    p.innerHTML = items.map(r => `
      <div class="reco-item">
        <span class="reco-item-icon">${r.icon}</span>
        <div class="reco-item-content">
          <div class="reco-item-title">${r.title}</div>
          <div class="reco-item-desc">${r.desc}</div>
        </div>
      </div>`).join("");
  });
}

/* ─── Evidence Table ─────────────────────────────────────────────────── */
function renderEvidenceTable(firedRules, filter = "ALL") {
  const tbody = qs("evidenceTbody");
  if (!tbody) return;

  let rules = [...firedRules];
  if (filter === "VATA")  rules = rules.filter(r => r.effects.some(e => e.dosha === "VATA" && e.adjustedWeight > 0));
  if (filter === "PITTA") rules = rules.filter(r => r.effects.some(e => e.dosha === "PITTA" && e.adjustedWeight > 0));
  if (filter === "KAPHA") rules = rules.filter(r => r.effects.some(e => e.dosha === "KAPHA" && e.adjustedWeight > 0));
  if (filter === "TIER1") rules = rules.filter(r => r.tier === 1);

  tbody.innerHTML = rules.slice(0, 60).map(r => {
    const primaryEffect = r.effects.sort((a, b) => b.adjustedWeight - a.adjustedWeight)[0];
    const doshaKey = primaryEffect?.dosha?.toLowerCase() || "vata";
    return `
      <tr>
        <td class="rule-id-cell">${r.ruleId || "—"}</td>
        <td>${r.category || "—"}</td>
        <td class="rule-q-cell" title="${r.questionText}">${(r.answerText || "").substring(0,55)}…</td>
        <td><span class="ev-dosha-chip ${doshaKey}">${DOSHA_EMOJI[primaryEffect?.dosha]} ${primaryEffect?.dosha}</span></td>
        <td class="ev-wt">${primaryEffect?.adjustedWeight?.toFixed(2) || "—"}</td>
        <td>
          <div class="ev-conf-bar">
            <div class="ev-conf-track"><div class="ev-conf-fill" style="width:${Math.round((r.confidence||1)*100)}%"></div></div>
          </div>
        </td>
        <td class="ev-ref" title="${r.sanskritReference || ''}">${(r.sanskritReference||"").substring(0,35) || "—"}</td>
      </tr>`;
  }).join("");
}

/* ═══════════════════════════════════════════════════════════════════════════
   RULE BROWSER
═══════════════════════════════════════════════════════════════════════════ */
const RULES_PER_PAGE = 20;

function buildRuleTable() {
  applyRuleFilter();
}

function applyRuleFilter() {
  let rules = [...RULE_BASE];

  // Filter by dosha
  if (state.ruleFilter !== "ALL") {
    rules = rules.filter(r => r.effects?.some(e => e.dosha === state.ruleFilter));
  }

  // Search
  const term = state.ruleSearch.toLowerCase();
  if (term) {
    rules = rules.filter(r => {
      const q = QUESTIONNAIRE_DATA.find(q => q.id === r.questionId);
      return (r.id || "").toLowerCase().includes(term)
        || (q?.domain || "").toLowerCase().includes(term)
        || (r.sanskritReference || "").toLowerCase().includes(term)
        || (r.explanation || "").toLowerCase().includes(term);
    });
  }

  // Sort
  if (state.ruleSort.col) {
    rules.sort((a, b) => {
      let av, bv;
      if (state.ruleSort.col === "weight") {
        av = a.effects?.[0]?.weight || 0;
        bv = b.effects?.[0]?.weight || 0;
      } else if (state.ruleSort.col === "dosha") {
        av = a.effects?.[0]?.dosha || "";
        bv = b.effects?.[0]?.dosha || "";
      } else if (state.ruleSort.col === "id") {
        av = a.id || "";
        bv = b.id || "";
      } else if (state.ruleSort.col === "tier") {
        const qa = QUESTIONNAIRE_DATA.find(q => q.id === a.questionId);
        const qb = QUESTIONNAIRE_DATA.find(q => q.id === b.questionId);
        av = qa?.tier || 2;
        bv = qb?.tier || 2;
      }
      if (av < bv) return -state.ruleSort.dir;
      if (av > bv) return state.ruleSort.dir;
      return 0;
    });
  }

  state.filteredRules = rules;
  state.rulePage = 0;
  renderRulePage();
  updateRuleCount(rules.length);
}

function renderRulePage() {
  const tbody = qs("ruleTbody");
  if (!tbody) return;
  const page = state.rulePage;
  const rules = state.filteredRules.slice(page * RULES_PER_PAGE, (page + 1) * RULES_PER_PAGE);

  tbody.innerHTML = rules.map(r => {
    const q = QUESTIONNAIRE_DATA.find(q => q.id === r.questionId);
    const primaryEffect = (r.effects || [])[0];
    const doshaKey = primaryEffect?.dosha?.toLowerCase() || "vata";
    const opt = q?.options?.find(o => o.id === r.answerId);
    return `
      <tr>
        <td class="rule-id-cell">${r.id || "—"}</td>
        <td>${q?.domain || "—"}</td>
        <td class="rule-q-cell" title="${q?.text || ""}">${(opt?.text || r.answerId || "").substring(0,55)}</td>
        <td><span class="ev-dosha-chip ${doshaKey}">${DOSHA_EMOJI[primaryEffect?.dosha] || ""} ${primaryEffect?.dosha || "—"}</span></td>
        <td class="rule-wt-cell">${primaryEffect?.weight?.toFixed(1) || "—"}</td>
        <td><span class="badge badge-${q?.tier === 1 ? "saffron" : q?.tier === 3 ? "violet" : "jade"}" style="font-size:0.65rem">${q?.tierName || `T${q?.tier||2}`}</span></td>
        <td class="rule-ref-cell" title="${r.sanskritReference||""}">${(r.sanskritReference||"").substring(0,30)||"—"}</td>
      </tr>`;
  }).join("");

  renderPagination();
}

function renderPagination() {
  const total = state.filteredRules.length;
  const totalPages = Math.ceil(total / RULES_PER_PAGE);
  const page = state.rulePage;
  const info = qs("rulePageInfo");
  const btns = qs("paginationBtns");
  if (info) info.textContent = `Showing ${page * RULES_PER_PAGE + 1}–${Math.min((page + 1) * RULES_PER_PAGE, total)} of ${total}`;
  if (!btns) return;
  btns.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const b = document.createElement("button");
    b.className = `pagination-btn${i === page ? " active" : ""}`;
    b.textContent = i + 1;
    b.addEventListener("click", () => { state.rulePage = i; renderRulePage(); });
    btns.appendChild(b);
  }
}

function updateRuleCount(count) {
  el("ruleCountBadge", `${count} rule${count !== 1 ? "s" : ""}`);
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEST SUITE
═══════════════════════════════════════════════════════════════════════════ */
function buildTestTable() {
  const tbody = qs("testTbody");
  if (!tbody) return;
  tbody.innerHTML = TEST_SUITE.map(tc => `
    <tr id="tr-${tc.id}">
      <td class="rule-id-cell">${tc.id}</td>
      <td>${tc.name}</td>
      <td><span class="badge badge-jade" style="font-size:0.65rem">${tc.category}</span></td>
      <td><span class="test-prakriti-badge">${tc.expectedClassification}</span></td>
      <td id="actual-${tc.id}">—</td>
      <td id="status-${tc.id}"><span class="test-status-badge pend">⏳ Pending</span></td>
      <td id="margin-${tc.id}">—</td>
    </tr>`).join("");

  el("testPassCount", `0 Passed`);
  el("testFailCount", `0 Failed`);
  el("testPendCount", `${TEST_SUITE.length} Pending`);
}

async function runAllTests() {
  const log = qs("testRunLog");
  const progress = qs("testRunProgress");
  if (progress) progress.classList.add("visible");
  if (log) log.innerHTML = "";

  const addLog = (msg) => { if (log) log.innerHTML += msg + "\n"; log.scrollTop = log.scrollHeight; };
  addLog(`[${new Date().toLocaleTimeString()}] Starting Formal Verification Suite — ${TEST_SUITE.length} test vectors…`);

  let passed = 0, failed = 0;

  for (let i = 0; i < TEST_SUITE.length; i++) {
    const tc = TEST_SUITE[i];
    const statusCell = qs(`status-${tc.id}`);
    const actualCell = qs(`actual-${tc.id}`);
    const marginCell = qs(`margin-${tc.id}`);

    if (statusCell) statusCell.innerHTML = `<span class="test-status-badge running">⚙ Running</span>`;
    addLog(`  → Running ${tc.id}: ${tc.name}…`);

    await new Promise(r => setTimeout(r, 80 + Math.random() * 120));

    try {
      const ev = evaluateRules(tc.answers);
      const sp = computeScoreProfile(ev.adjustedScores, ev.rawScores);
      const cl = classifyPrakriti(sp.ranked, DEFAULT_THRESHOLDS, {
        agni: ev.agniEvaluation, koshtha: ev.koshthaEvaluation, manas: ev.manasEvaluation
      });

      const actual = cl.prakritiCode;
      const pass = actual === tc.expectedClassification;
      if (pass) passed++; else failed++;

      if (statusCell) statusCell.innerHTML = `<span class="test-status-badge ${pass ? "pass" : "fail"}">${pass ? "✓ Pass" : "✗ Fail"}</span>`;
      if (actualCell) actualCell.innerHTML = `<span class="test-prakriti-badge" style="${pass ? "" : "background:rgba(244,63,94,0.15);color:#F43F5E"}">${actual}</span>`;
      if (marginCell) marginCell.textContent = `${sp.margins.diff12.toFixed(1)}pt`;
      addLog(`     ${pass ? "✓ PASS" : "✗ FAIL"} — Expected: ${tc.expectedClassification}, Got: ${actual}`);
    } catch (err) {
      failed++;
      if (statusCell) statusCell.innerHTML = `<span class="test-status-badge fail">✗ Error</span>`;
      addLog(`     ✗ ERROR — ${err.message}`);
    }
  }

  const pending = TEST_SUITE.length - passed - failed;
  el("testPassCount", `${passed} Passed`);
  el("testFailCount", `${failed} Failed`);
  el("testPendCount", `${pending} Pending`);
  addLog(`\n[${new Date().toLocaleTimeString()}] Suite complete — ${passed}/${TEST_SUITE.length} passed (${Math.round(passed/TEST_SUITE.length*100)}%)`);
  state.testsRun = true;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DOSHA ENCYCLOPEDIA
═══════════════════════════════════════════════════════════════════════════ */
function buildDoshaEncyclopedia() {
  ["VATA", "PITTA", "KAPHA"].forEach(key => {
    const d = DOSHA_DETAILS[key];
    if (!d) return;
    const dkey = key.toLowerCase();

    // Elements
    const elems = qs(`${dkey}Elements`);
    if (elems) {
      elems.innerHTML = d.elements.map(e =>
        `<span class="dosha-element-pill badge badge-${dkey}" style="font-size:0.72rem">${e}</span>`
      ).join("");
    }

    // Qualities
    const quals = qs(`${dkey}Qualities`);
    if (quals) {
      quals.innerHTML = d.qualities.map(q =>
        `<div class="dosha-quality-item"><span class="dosha-quality-icon">✦</span>${q}</div>`
      ).join("");
    }

    // Sutra
    const sutra = qs(`${dkey}Sutra`);
    if (sutra) sutra.textContent = d.governingSutra || "";

    // Info panels
    const panels = qs(`${dkey}Panels`);
    if (panels) {
      panels.innerHTML = `
        <div class="dosha-info-panel">
          <div class="dosha-info-panel-title">Governing Seat (Adhishthana)</div>
          <p style="font-size:0.85rem;color:var(--text-secondary)">${d.seat}</p>
        </div>
        <div class="dosha-info-panel">
          <div class="dosha-info-panel-title">Key Biological Functions</div>
          <ul>${d.keyFunctions.map(f => `<li>${f}</li>`).join("")}</ul>
        </div>`;
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   EVENT BINDING
═══════════════════════════════════════════════════════════════════════════ */
function bindEvents() {
  // Nav buttons
  qsa("[data-nav]").forEach(btn => {
    btn.addEventListener("click", () => navigateTo(btn.getAttribute("data-nav")));
  });

  // Theme toggle
  qs("themeToggleBtn")?.addEventListener("click", () => {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  });

  // Mobile menu
  qs("mobileMenuBtn")?.addEventListener("click", () => {
    qs("navLinks")?.classList.toggle("mobile-open");
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    qs("siteHeader")?.classList.toggle("scrolled", window.scrollY > 20);
  });

  // Assessment - prev/next/skip/submit
  qs("prevBtn")?.addEventListener("click", () => {
    if (state.currentQIndex > 0) {
      state.currentQIndex--;
      renderQuestion(state.currentQIndex, -1);
    }
  });

  qs("nextBtn")?.addEventListener("click", () => {
    if (state.currentQIndex < QUESTIONNAIRE_DATA.length - 1) {
      state.currentQIndex++;
      renderQuestion(state.currentQIndex, 1);
    }
  });

  qs("skipBtn")?.addEventListener("click", () => {
    if (state.currentQIndex < QUESTIONNAIRE_DATA.length - 1) {
      state.currentQIndex++;
      renderQuestion(state.currentQIndex, 1);
    }
  });

  qs("submitBtn")?.addEventListener("click", () => {
    runInference(true);
  });

  qs("viewResultsBtn")?.addEventListener("click", () => navigateTo("results"));
  qs("restartBtn")?.addEventListener("click", restartAssessment);
  qs("retakeBtn")?.addEventListener("click", restartAssessment);
  qs("printResultsBtn")?.addEventListener("click", () => window.print());

  // Evidence filter buttons
  qsa("[data-ef]").forEach(btn => {
    btn.addEventListener("click", () => {
      qsa("[data-ef]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeEvidenceFilter = btn.getAttribute("data-ef");
      if (state.evaluation) renderEvidenceTable(state.evaluation.firedRules, state.activeEvidenceFilter);
    });
  });

  // Reco tabs
  qsa("[data-reco]").forEach(btn => {
    btn.addEventListener("click", () => {
      qsa("[data-reco]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      qsa("[data-reco-panel]").forEach(p => p.classList.remove("active"));
      const tab = btn.getAttribute("data-reco");
      document.querySelector(`[data-reco-panel="${tab}"]`)?.classList.add("active");
    });
  });

  // Rule search
  qs("ruleSearchInput")?.addEventListener("input", (e) => {
    state.ruleSearch = e.target.value;
    applyRuleFilter();
  });

  // Rule filter chips
  qsa("[data-rf]").forEach(btn => {
    btn.addEventListener("click", () => {
      qsa("[data-rf]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.ruleFilter = btn.getAttribute("data-rf");
      applyRuleFilter();
    });
  });

  // Rule table column sorting
  qsa("[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.getAttribute("data-sort");
      if (state.ruleSort.col === col) {
        state.ruleSort.dir *= -1;
      } else {
        state.ruleSort.col = col;
        state.ruleSort.dir = 1;
      }
      qsa("[data-sort]").forEach(t => t.classList.remove("sorted"));
      th.classList.add("sorted");
      applyRuleFilter();
    });
  });

  // Test runner
  qs("runTestsBtn")?.addEventListener("click", runAllTests);

  // Dosha encyclopedia tabs
  qsa("[data-dosha-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      qsa("[data-dosha-tab]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      qsa(".dosha-panel").forEach(p => p.classList.remove("active"));
      const tab = btn.getAttribute("data-dosha-tab");
      qs(`doshaPanel-${tab}`)?.classList.add("active");
    });
  });

  // All data-nav buttons (including inline HTML)
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-nav]");
    if (btn) navigateTo(btn.getAttribute("data-nav"));
  });

  // Hero brand logo
  qs("brandLogo")?.addEventListener("keydown", e => {
    if (e.key === "Enter") navigateTo("home");
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESTART
═══════════════════════════════════════════════════════════════════════════ */
function restartAssessment() {
  state.answers = {};
  state.evaluation = null;
  state.scoreProfile = null;
  state.classification = null;
  state.explanation = null;
  state.currentQIndex = 0;
  saveAnswers();

  const card = qs("questionCard");
  const banner = qs("completionBanner");
  if (card) card.style.display = "";
  if (banner) banner.classList.remove("visible");

  navigateTo("assessment");
  renderQuestion(0);
}

/* ─── Tiny helper: set textContent ──────────────────────────────────── */
function el(id, val) {
  const e = qs(id);
  if (e) e.textContent = val;
}
