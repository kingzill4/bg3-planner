// BG3 Build Planner — Scroll mode, spell browser, pickup list, party overview, A/B compare, saved parties, share links, build card and startup.
//
// Loaded as a classic script, like the generated data files: these share one
// global scope, in the order index.html lists them. Not ES modules, because
// those are blocked over file:// and the page has to keep opening by itself.
"use strict";

// ---------------------------------------------------------------
// Scroll mode: three panels that scroll, or one page that does
// ---------------------------------------------------------------
// Independent panel scrolling keeps the sheet, the doll and the combat numbers on
// screen together, which is the point of the three-column layout. But nested
// scrollbars genuinely surprise people, and on a short screen the panels get
// cramped — so it is a preference rather than a decision made for the player.
const SCROLL_MODE_KEY = "bg3planner:scrollMode";

function scrollModeIsPage() {
  try { return localStorage.getItem(SCROLL_MODE_KEY) === "page"; } catch (e) { return false; }
}

function applyScrollMode() {
  const page = scrollModeIsPage();
  document.body.classList.toggle("scroll-page", page);
  const btn = document.getElementById("scroll-mode-btn");
  if (btn) {
    btn.textContent = page ? "⇕ One page" : "⊞ Panels";
    btn.setAttribute("aria-pressed", page ? "true" : "false");
    btn.classList.toggle("on", page);
  }
  // the measured cap only matters in panel mode
  if (!page) syncPlannerHeight();
}

function initScrollMode() {
  const btn = document.getElementById("scroll-mode-btn");
  btn.addEventListener("click", () => {
    try {
      localStorage.setItem(SCROLL_MODE_KEY, scrollModeIsPage() ? "panels" : "page");
    } catch (e) { /* private browsing: the mode just does not persist */ }
    applyScrollMode();
  });
  applyScrollMode();
}

// The three columns are told how tall they may be rather than guessing: the
// banner, tab bar and party bar all grow with content (a fifth party member,
// a wrapped duplicate warning), and a hardcoded offset would either clip the
// panels or leave the whole document scrolling — the one thing this layout is
// meant to avoid.
function syncPlannerHeight() {
  const planner = document.querySelector(".planner");
  if (!planner || planner.offsetParent === null) return;
  const top = Math.round(planner.getBoundingClientRect().top + window.scrollY);
  document.documentElement.style.setProperty("--planner-top", top + "px");
}
window.addEventListener("resize", syncPlannerHeight);

// The Loadout block shows one of two views of the same gear: the aggregated
// totals, or the per-slot detail. Switching is a view change, not a re-render,
// so both stay rendered and only visibility moves.
function initLoadoutViews() {
  const bar = document.getElementById("loadout-views");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-view]");
    if (!btn) return;
    [...bar.querySelectorAll("button[data-view]")].forEach((b) => {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    const slots = btn.dataset.view === "slots";
    document.getElementById("build-stats").hidden = slots;
    document.getElementById("effects-list").hidden = !slots;
  });
}

function renderEffects() {
  const member = activeMember();
  const list = document.getElementById("effects-list");
  list.innerHTML = "";
  const filled = SLOT_DEFS.filter((s) => gear(member)[s.key]);
  // the tab carries the count, the same way the act tabs do
  const slotTab = document.querySelector('#loadout-views button[data-view="slots"]');
  if (slotTab) {
    slotTab.innerHTML = "";
    slotTab.appendChild(document.createTextNode("By slot"));
    if (filled.length) slotTab.appendChild(el("span", { class: "act-count" }, [String(filled.length)]));
  }
  if (!filled.length) {
    list.appendChild(el("div", { class: "empty-hint" }, ["Nothing equipped yet."]));
    return;
  }
  filled.forEach((s) => {
    const item = itemsById[gear(member)[s.key]];
    const row = el("div", { class: "effect-row" });
    row.appendChild(el("div", { class: "effect-slot" }, [s.label]));
    const textBox = el("div", { class: "effect-text" });
    textBox.appendChild(el("div", {}, [
      el("a", { class: "effect-name", href: "#", onclick: (e) => { e.preventDefault(); openItemDetail(item); } }, [item.name])
    ]));
    textBox.appendChild(renderStatBlock(item, { dense: true }));
    row.appendChild(textBox);
    list.appendChild(row);
  });
}

// ---------------------------------------------------------------
// Spell browser
// ---------------------------------------------------------------
const SPELL_LIST = typeof SPELLS !== "undefined" ? SPELLS : [];

const SCHOOLS = ["Abjuration", "Conjuration", "Divination", "Enchantment",
  "Evocation", "Illusion", "Necromancy", "Transmutation"];

function initSpellControls() {
  const clsSel = document.getElementById("spell-class");
  Object.values(CLASSES).forEach((c) => clsSel.appendChild(el("option", { value: c.label }, [c.label])));
  const lvlSel = document.getElementById("spell-level");
  lvlSel.appendChild(el("option", { value: "0" }, ["Cantrips"]));
  for (let i = 1; i <= 9; i++) lvlSel.appendChild(el("option", { value: String(i) }, ["Level " + i]));
  const schoolSel = document.getElementById("spell-school");
  SCHOOLS.forEach((s) => schoolSel.appendChild(el("option", { value: s }, [s])));

  ["spell-search", "spell-class", "spell-level", "spell-school", "spell-mine", "spell-learnable"].forEach((id) => {
    const node = document.getElementById(id);
    const evt = (node.tagName === "INPUT" && node.type === "search") ? "input" : "change";
    node.addEventListener(evt, renderSpells);
  });
}

function renderSpells() {
  const q = document.getElementById("spell-search").value.trim().toLowerCase();
  const cls = document.getElementById("spell-class").value;
  const lvl = document.getElementById("spell-level").value;
  const school = document.getElementById("spell-school").value;
  const mine = document.getElementById("spell-mine").checked;
  const learnableOnly = document.getElementById("spell-learnable").checked;
  const member = activeMember();

  const matches = SPELL_LIST.filter((s) => {
    if (q && ![s.name, s.desc].filter(Boolean).join(" ").toLowerCase().includes(q)) return false;
    // the class dropdown matches subclass grants too, so picking "Rogue" still
    // surfaces what an Arcane Trickster gets
    if (cls && !(s.classes || []).includes(cls) &&
        !(s.subclasses || []).some((n) => (SUBCLASSES_BY_CLASS_LABEL[cls] || []).includes(n))) return false;
    if (lvl !== "" && String(s.level) !== lvl) return false;
    if (school && s.school !== school) return false;
    if (learnableOnly && !isLearnable(s)) return false;
    // "Only my class" has to use the same rule as the combat panel, or an Arcane
    // Trickster ticks it and sees nothing — subclasses and races grant spells too.
    if (mine && !canCast(member, s)) return false;
    return true;
  }).sort((a, b) => (a.level ?? 99) - (b.level ?? 99) || a.name.localeCompare(b.name));

  document.getElementById("spell-count").textContent =
    matches.length + (matches.length === 1 ? " spell" : " spells");

  const grid = document.getElementById("spell-grid");
  grid.innerHTML = "";
  matches.slice(0, 300).forEach((s) => grid.appendChild(renderSpellCard(s)));
  if (matches.length > 300) {
    grid.appendChild(el("div", { class: "empty-hint" },
      ["… and " + (matches.length - 300) + " more. Refine your search."]));
  }
}

function renderSpellCard(s) {
  const card = el("div", { class: "item-card spell-card" });

  const header = el("div", { class: "card-header" });
  if (s.icon) header.appendChild(el("div", { class: "card-icon" }, [el("img", { src: s.icon, alt: "", loading: "lazy" })]));
  const titleBox = el("div", { class: "card-title-box" });
  titleBox.appendChild(el("div", { class: "name-row" }, [
    el("span", { class: "name" }, [s.name]),
    el("span", { class: "meta" }, [s.level === 0 ? "Cantrip" : "Level " + s.level])
  ]));
  titleBox.appendChild(el("div", { class: "meta" }, [
    [s.school, s.cost, s.range].filter(Boolean).join(" · ")
  ]));
  header.appendChild(titleBox);
  card.appendChild(header);

  if (s.damage) card.appendChild(el("div", { class: "card-roll" }, [s.damage]));
  if (s.desc) card.appendChild(el("div", { class: "summary" }, [s.desc]));

  const tags = el("div", { class: "card-abilities" });
  if (s.save) tags.appendChild(el("span", { class: "card-ability" }, [s.save + " save"]));
  if (s.concentration) tags.appendChild(el("span", { class: "card-ability" }, ["Concentration"]));
  if (s.ritual) tags.appendChild(el("span", { class: "card-ability" }, ["Ritual"]));
  if (tags.children.length) card.appendChild(tags);

  // Who gets it, at what level, and on what condition — the card used to print a
  // bare list of class names, which read as "every one of these, from level 1".
  if ((s.availability || []).length) {
    const byLevel = new Map();
    s.availability.forEach((a) => {
      const k = a.level || 0;
      (byLevel.get(k) || byLevel.set(k, []).get(k)).push(a.name + (a.via ? " (via " + a.via + ")" : ""));
    });
    const parts = [...byLevel.entries()].sort((a, b) => a[0] - b[0])
      .map(([lvl, names]) => (lvl ? "L" + lvl + ": " : "") + names.join(", "));
    card.appendChild(el("div", { class: "location" }, [parts.join(" · ")]));
  } else if ((s.classes || []).length) {
    card.appendChild(el("div", { class: "location" }, [s.classes.join(", ")]));
  }

  const actions = el("div", { class: "card-actions" });
  actions.appendChild(el("a", { class: "wikilink", href: s.wiki, target: "_blank", rel: "noopener" }, ["bg3.wiki ↗"]));
  card.appendChild(actions);
  return card;
}

// ---------------------------------------------------------------
// Pickup list
// ---------------------------------------------------------------
function getPickupState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_PICKUP) || "{}"); }
  catch (e) { return {}; }
}

function togglePickup(id) {
  const s = getPickupState();
  if (s[id]) delete s[id]; else s[id] = true;
  try { localStorage.setItem(STORAGE_PICKUP, JSON.stringify(s)); } catch (e) { /* no storage */ }
}

// ---------------------------------------------------------------
// Party overview: the four characters read as one group
// ---------------------------------------------------------------
// A/B comparison: pin a build, then watch what changes
// ---------------------------------------------------------------
// Theorycrafting is mostly "is this better than what I had", and answering it by
// remembering four numbers is exactly the work worth removing. Pinning snapshots
// the numbers, not the character, so you can keep editing freely.
let pinnedBuild = null;

function buildSnapshot(member) {
  const targetAcInput = document.getElementById("target-ac");
  const targetAc = targetAcInput ? parseInt(targetAcInput.value, 10) || 15 : 15;
  const d = derivedStats(member);
  // the same roll state the combat panel is showing, so a pinned build is compared
  // under the conditions you are actually looking at
  const roll = rollState();
  const turn = turnSummary(member, {
    targetAc,
    advantage: roll > 0,
    disadvantage: roll < 0,
    ground: parseInt((document.getElementById("combat-ground") || {}).value, 10) || 0,
  });
  return {
    name: member.name,
    label: memberClasses(member).map((e) => (CLASSES[e.cls] || {}).label + " " + e.levels).join(" / "),
    ac: d.ac, hp: d.hp, initiative: d.initiative,
    spellDc: d.spellDc, dpr: turn ? turn.total : 0
  };
}

function renderBuildCompare() {
  const box = document.getElementById("build-compare");
  const label = document.getElementById("pin-label");
  const clearBtn = document.getElementById("clear-pin-btn");
  box.innerHTML = "";
  if (!pinnedBuild) {
    label.textContent = "Pin a build to compare changes against it.";
    clearBtn.hidden = true;
    return;
  }
  clearBtn.hidden = false;
  label.textContent = "vs " + pinnedBuild.name + " · " + pinnedBuild.label;

  const now = buildSnapshot(activeMember());
  const rows = [
    { key: "ac", label: "Armour Class", digits: 0 },
    { key: "hp", label: "Hit points", digits: 0 },
    { key: "dpr", label: "Damage / turn", digits: 1 },
    { key: "initiative", label: "Initiative", digits: 0, signed: true },
    { key: "spellDc", label: "Spell save DC", digits: 0 }
  ];
  const table = el("div", { class: "compare-table" });
  rows.forEach((r) => {
    const before = pinnedBuild[r.key];
    const after = now[r.key];
    if (before == null && after == null) return;
    const delta = (after || 0) - (before || 0);
    const row = el("div", { class: "compare-row" });
    row.appendChild(el("span", { class: "compare-label" }, [r.label]));
    row.appendChild(el("span", { class: "compare-before" },
      [before == null ? "—" : (r.signed ? fmtSigned(before) : before.toFixed(r.digits))]));
    row.appendChild(el("span", { class: "compare-arrow" }, ["→"]));
    row.appendChild(el("span", { class: "compare-after" },
      [after == null ? "—" : (r.signed ? fmtSigned(after) : after.toFixed(r.digits))]));
    row.appendChild(el("span", {
      class: "compare-delta " + (Math.abs(delta) < 0.05 ? "same" : delta > 0 ? "up" : "down")
    }, [Math.abs(delta) < 0.05 ? "=" : (delta > 0 ? "+" : "") + delta.toFixed(r.digits)]));
    table.appendChild(row);
  });
  box.appendChild(table);
}

function initCompareControls() {
  document.getElementById("pin-build-btn").addEventListener("click", () => {
    pinnedBuild = buildSnapshot(activeMember());
    renderBuildCompare();
  });
  document.getElementById("clear-pin-btn").addEventListener("click", () => {
    pinnedBuild = null;
    renderBuildCompare();
  });
}

// ---------------------------------------------------------------
// A planner for a party of four should answer party-level questions — who is the
// squishiest, who deals the most, and which skills nobody covers — not just
// per-character ones.
function renderPartyOverview() {
  const box = document.getElementById("party-overview");
  box.innerHTML = "";

  const targetAcInput = document.getElementById("target-ac");
  const targetAc = targetAcInput ? parseInt(targetAcInput.value, 10) || 15 : 15;
  const rows = state.party.map((m) => {
    const d = derivedStats(m);
    const turn = turnSummary(m, { targetAc, advantage: false, powerAttack: false, ground: 0 });
    return { m, d, dpr: turn ? turn.total : 0, skills: skillProficiencies(m) };
  });

  const best = (key) => Math.max(...rows.map((r) => r[key] || 0));
  const bestAc = best("dpr") === 0 ? 0 : 0;
  const maxAc = Math.max(...rows.map((r) => r.d.ac));
  const maxHp = Math.max(...rows.map((r) => r.d.hp));
  const maxDpr = Math.max(...rows.map((r) => r.dpr));
  void bestAc;

  const table = el("div", { class: "party-table" });
  const head = el("div", { class: "party-row party-head" });
  ["Character", "Class", "AC", "HP", "Damage / turn", "Gear"].forEach((h) =>
    head.appendChild(el("div", {}, [h])));
  table.appendChild(head);

  rows.forEach((r) => {
    const row = el("div", {
      class: "party-row" + (r.m.id === state.activeMemberId ? " is-active" : ""),
      onclick: () => {
        state.activeMemberId = r.m.id;
        document.querySelector('[data-tab="tab-planner"]').click();
      }
    });
    const who = el("div", { class: "party-who" });
    const c = companionById[r.m.companion];
    if (c && c.portrait) who.appendChild(el("img", { src: c.portrait, alt: "", loading: "lazy" }));
    who.appendChild(el("span", {}, [r.m.name]));
    row.appendChild(who);

    row.appendChild(el("div", { class: "party-cell-dim" }, [
      memberClasses(r.m).map((e) => (CLASSES[e.cls] || {}).label + " " + e.levels).join(" / ")
    ]));
    row.appendChild(el("div", { class: "party-num" + (r.d.ac === maxAc ? " is-best" : "") },
      [String(r.d.ac)]));
    row.appendChild(el("div", { class: "party-num" + (r.d.hp === maxHp ? " is-best" : "") },
      ["~" + r.d.hp]));
    row.appendChild(el("div", { class: "party-num" + (r.dpr && r.dpr === maxDpr ? " is-best" : "") },
      [r.dpr ? r.dpr.toFixed(1) : "—"]));
    const filled = SLOT_DEFS.filter((s) => gear(r.m)[s.key]).length;
    row.appendChild(el("div", { class: "party-cell-dim" }, [filled + " / " + SLOT_DEFS.length]));
    table.appendChild(row);
  });
  box.appendChild(table);

  // Which skills nobody in the party is proficient in. Out of combat this is what
  // actually blocks a run — no one able to pick a lock or spot a trap.
  const covered = new Set();
  rows.forEach((r) => r.skills.forEach((s) => covered.add(s)));
  const missing = SKILLS.filter((s) => !covered.has(s.key));
  box.appendChild(el("div", { class: "stats-subtitle", style: "margin-top:20px" }, ["Skill coverage"]));
  const cov = el("div", { class: "party-skills" });
  SKILLS.forEach((s) => {
    const who = rows.filter((r) => r.skills.has(s.key)).map((r) => r.m.name);
    cov.appendChild(el("span", {
      class: "party-skill" + (who.length ? " covered" : " uncovered"),
      title: who.length ? "Covered by " + who.join(", ") : "Nobody in the party is proficient"
    }, [s.label + (who.length > 1 ? " ×" + who.length : "")]));
  });
  box.appendChild(cov);
  if (missing.length) {
    box.appendChild(el("div", { class: "party-warn" }, [
      missing.length + " skill" + (missing.length === 1 ? "" : "s") + " nobody covers: " +
      missing.map((s) => s.label).join(", ")
    ]));
  }
}

function renderPickupList() {
  const container = document.getElementById("pickup-list");
  container.innerHTML = "";

  // the shopping list spans the whole playthrough, not just the act on screen
  const wanted = new Map();
  state.party.forEach((m) => {
    ACTS.forEach((act) => {
      SLOT_DEFS.forEach((s) => {
        const id = gear(m, act)[s.key];
        if (!id || !itemsById[id]) return;
        if (!wanted.has(id)) wanted.set(id, []);
        const who = m.name + " · " + s.label + " (Act " + act + ")";
        if (!wanted.get(id).includes(who)) wanted.get(id).push(who);
      });
    });
  });

  if (!wanted.size) {
    container.appendChild(el("div", { class: "empty-hint" }, ["Equip items in the build planner and they will show up here, sorted by where you find them."]));
    return;
  }

  const byAct = new Map();
  wanted.forEach((carriers, id) => {
    const it = itemsById[id];
    const actKey = it.act || 0;
    if (!byAct.has(actKey)) byAct.set(actKey, new Map());
    const locKey = (it.location || "").split(" • ")[0] || "Location not listed — check the wiki page";
    const byLoc = byAct.get(actKey);
    if (!byLoc.has(locKey)) byLoc.set(locKey, []);
    byLoc.get(locKey).push({ item: it, carriers });
  });

  const done = getPickupState();
  const total = wanted.size;
  let checked = 0;
  wanted.forEach((_, id) => { if (done[id]) checked++; });
  // A bar rather than a bare count: the point of this list is watching it fill up
  // across a playthrough.
  const bar = el("div", { class: "pickup-progress" });
  bar.appendChild(el("div", { class: "pickup-progress-track" }, [
    el("div", {
      class: "pickup-progress-fill",
      style: "width:" + (total ? Math.round((checked / total) * 100) : 0) + "%"
    })
  ]));
  bar.appendChild(el("div", { class: "pickup-progress-text" },
    [checked + " / " + total + " picked up"]));
  container.appendChild(bar);

  [...byAct.keys()].sort((a, b) => a - b).forEach((actKey) => {
    const byLoc = byAct.get(actKey);
    // per-act progress, because that is the unit you actually play through
    let actTotal = 0, actDone = 0;
    byLoc.forEach((list) => list.forEach(({ item }) => {
      actTotal++;
      if (done[item.id]) actDone++;
    }));
    const head = el("h2", { class: "pickup-act" });
    head.appendChild(el("span", {}, [actKey ? "Act " + actKey : "Act unknown"]));
    head.appendChild(el("span", { class: "pickup-act-count" }, [actDone + " / " + actTotal]));
    container.appendChild(head);
    [...byLoc.keys()].sort().forEach((locKey) => {
      const group = el("div", { class: "pickup-group" });
      group.appendChild(el("div", { class: "pickup-location" }, ["📍 " + locKey]));
      byLoc.get(locKey).forEach(({ item, carriers }) => {
        const row = el("div", { class: "pickup-row" + (done[item.id] ? " done" : "") });
        const cb = el("input", { type: "checkbox", "aria-label": "Mark " + item.name + " as picked up", onchange: () => { togglePickup(item.id); renderPickupList(); } });
        cb.checked = !!done[item.id];
        row.appendChild(cb);
        if (item.icon) row.appendChild(el("div", { class: "pickup-icon" }, [el("img", { src: item.icon, alt: "", loading: "lazy" })]));
        const info = el("div", { class: "pickup-info" });
        info.appendChild(el("div", { class: "pickup-name" }, [
          el("a", { href: item.wiki, target: "_blank", rel: "noopener" }, [item.name])
        ]));
        info.appendChild(el("div", { class: "pickup-carriers" }, [carriers.join(" · ")]));
        if (item.location && item.location !== locKey) {
          info.appendChild(el("div", { class: "pickup-detail" }, [item.location]));
        }
        row.appendChild(info);
        group.appendChild(row);
      });
      container.appendChild(group);
    });
  });
}

// ---------------------------------------------------------------
// Saved parties
// ---------------------------------------------------------------
function renderSavedBuilds() {
  const builds = loadBuilds();
  const container = document.getElementById("saved-builds");
  container.innerHTML = "";
  const names = Object.keys(builds);
  if (!names.length) {
    container.appendChild(el("div", { class: "empty-hint" }, ["No saved party yet."]));
    return;
  }
  names.forEach((name) => {
    const row = el("div", { class: "saved-build-row" });
    row.appendChild(el("span", {}, [name]));
    const actions = el("div", { class: "actions" });
    actions.appendChild(el("button", { onclick: () => loadBuild(name) }, ["Load"]));
    actions.appendChild(el("button", { class: "danger", onclick: () => deleteBuild(name) }, ["Delete"]));
    row.appendChild(actions);
    container.appendChild(row);
  });
}

function loadBuild(name) {
  const b = loadBuilds()[name];
  if (!b || !Array.isArray(b.party)) return;
  state.party = b.party.map((m) => ensureCharacterFields({ ...m, id: nextMemberId() }));
  state.activeMemberId = state.party[0].id;
  saveCurrent();
  renderPlanner();
}

function deleteBuild(name) {
  const builds = loadBuilds();
  delete builds[name];
  saveBuilds(builds);
  renderSavedBuilds();
}

// ---------------------------------------------------------------
// Share links: the party packed into the URL hash
// ---------------------------------------------------------------
const b64urlEncode = (bytes) => {
  let bin = "";
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const b64urlDecode = (str) => {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

async function deflate(text) {
  if (typeof CompressionStream === "undefined") return null;
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function inflate(bytes) {
  if (typeof DecompressionStream === "undefined") return null;
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return await new Response(stream).text();
}

async function buildShareUrl() {
  const payload = JSON.stringify({ v: 1, party: state.party.map(serialiseMember) });
  const packed = await deflate(payload);
  // "d" is deflated, "j" is plain JSON for browsers without CompressionStream
  const hash = packed ? "d" + b64urlEncode(packed)
                      : "j" + b64urlEncode(new TextEncoder().encode(payload));
  return location.origin + location.pathname + "#" + hash;
}

async function loadFromHash() {
  const hash = location.hash.slice(1);
  if (!hash || hash.length < 2) return false;
  try {
    const bytes = b64urlDecode(hash.slice(1));
    const text = hash[0] === "d" ? await inflate(bytes) : new TextDecoder().decode(bytes);
    if (!text) return false;
    const parsed = JSON.parse(text);
    if (!parsed || !Array.isArray(parsed.party) || !parsed.party.length) return false;
    state.party = parsed.party.slice(0, MAX_MEMBERS).map((m) =>
      ensureCharacterFields({ ...m, id: nextMemberId() }));
    state.activeMemberId = state.party[0].id;
    return true;
  } catch (e) {
    return false;
  }
}

function flashButton(btn, message) {
  const original = btn.textContent;
  btn.textContent = message;
  btn.disabled = true;
  setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 1600);
}

// ---------------------------------------------------------------
// Build card: something you can actually show someone
// ---------------------------------------------------------------
// Export was JSON or a link — fine for the tool, useless in a conversation. This
// is the build as a readable block: what they are, what they wear, what they do.
// Plain text rather than an image, because it survives being pasted anywhere and
// needs no library.
function buildCardText(m) {
  const d = derivedStats(m);
  const targetAcInput = document.getElementById("target-ac");
  const targetAc = targetAcInput ? parseInt(targetAcInput.value, 10) || 15 : 15;
  const turn = turnSummary(m, {
    targetAc, advantage: false, powerAttack: false, ground: 0,
    sneakAttack: false, divineSmite: false, smiteSlot: 1
  });

  const lines = [];
  const classes = memberClasses(m)
    .map((c) => {
      const sub = (subclassById[c.subclass] || {}).name;
      return (CLASSES[c.cls] || {}).label + " " + c.levels + (sub ? " (" + sub + ")" : "");
    }).join(" / ");
  const race = (raceById[m.race] || {}).name;
  lines.push(m.name + " — " + [race, classes].filter(Boolean).join(" "));

  const bg = BACKGROUNDS[m.background];
  if (bg) lines.push("Background: " + bg.label);

  lines.push("");
  lines.push("ABILITIES  " + ABILITIES.map((a) => {
    const v = finalScores(m)[a.key];
    return a.key.toUpperCase() + " " + v + " (" + fmtSigned(abilityModifier(v)) + ")";
  }).join("  "));
  lines.push("AC " + d.ac + "   HP ~" + d.hp + "   Initiative " + fmtSigned(d.initiative) +
    "   Proficiency " + fmtSigned(d.prof) +
    (d.spellDc ? "   Spell DC " + d.spellDc : ""));
  if (turn) lines.push("Damage/turn " + turn.total.toFixed(1) + " vs AC " + targetAc);

  const styles = memberStyles(m).map((s) => (styleById[s] || {}).name).filter(Boolean);
  if (styles.length) lines.push("Fighting style: " + styles.join(", "));
  const feats = memberFeats(m).map((f) => (FEATS[f] || {}).label).filter(Boolean);
  if (feats.length) lines.push("Feats: " + feats.join(", "));
  const skills = [...skillProficiencies(m)]
    .map((k) => (SKILLS.find((s) => s.key === k) || {}).label).filter(Boolean);
  if (skills.length) lines.push("Skills: " + skills.join(", "));

  ACTS.forEach((act) => {
    const worn = SLOT_DEFS
      .map((s) => ({ slot: s, item: itemsById[gear(m, act)[s.key]] }))
      .filter((x) => x.item);
    if (!worn.length) return;
    lines.push("");
    lines.push("ACT " + act);
    worn.forEach((x) => lines.push("  " + x.slot.label + ": " + x.item.name));
  });

  lines.push("");
  lines.push("Planned with the BG3 Build Planner · data from bg3.wiki");
  return lines.join("\n");
}

function initBuildCard() {
  const btn = document.getElementById("copy-card-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const text = buildCardText(activeMember());
    const area = document.getElementById("import-export-area");
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = "Copy build card"), 1600);
    } catch (e) {
      // clipboard needs a secure context; showing the text is the honest fallback
      area.hidden = false;
      area.value = text;
      area.select();
      btn.textContent = "Select and copy";
      setTimeout(() => (btn.textContent = "Copy build card"), 2600);
    }
  });
}

function initShareControls() {
  document.getElementById("share-btn").addEventListener("click", async (e) => {
    const url = await buildShareUrl();
    history.replaceState(null, "", "#" + url.split("#")[1]);
    try {
      await navigator.clipboard.writeText(url);
      flashButton(e.target, "Link copied");
    } catch (err) {
      // clipboard is blocked on file:// — fall back to showing the link
      const ta = document.getElementById("import-export-area");
      ta.hidden = false;
      ta.value = url;
      ta.focus();
      ta.select();
      flashButton(e.target, "Link ready below");
    }
  });
}

function initPlannerControls() {
  document.getElementById("build-notes").addEventListener("input", (e) => {
    activeMember().notes = e.target.value;
    saveCurrent();
  });

  document.getElementById("save-build-btn").addEventListener("click", () => {
    const input = document.getElementById("build-name-input");
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    const builds = loadBuilds();
    builds[name] = { party: state.party.map(serialiseMember) };
    saveBuilds(builds);
    input.value = "";
    renderSavedBuilds();
  });

  document.getElementById("clear-build-btn").addEventListener("click", () => {
    Object.keys(gear(activeMember())).forEach((k) => delete gear(activeMember())[k]);
    saveCurrent();
    renderPlanner();
  });

  document.getElementById("export-build-btn").addEventListener("click", () => {
    const ta = document.getElementById("import-export-area");
    ta.value = JSON.stringify({ party: state.party.map(serialiseMember) }, null, 2);
    ta.hidden = false;
    ta.focus();
    ta.select();
  });

  document.getElementById("import-build-btn").addEventListener("click", () => {
    const ta = document.getElementById("import-export-area");
    ta.hidden = false;
    try {
      const parsed = JSON.parse(ta.value);
      if (parsed && Array.isArray(parsed.party)) {
        state.party = parsed.party.slice(0, MAX_MEMBERS).map((m) => ensureCharacterFields({ ...m, id: nextMemberId() }));
        state.activeMemberId = state.party[0].id;
        saveCurrent();
        renderPlanner();
      }
    } catch (e) {
      alert("Invalid JSON: could not import this party.");
    }
  });
}

function initLibraryControls() {
  ["search-input", "filter-type", "filter-rarity", "filter-act"].forEach((id) => {
    const node = document.getElementById(id);
    node.addEventListener(id === "search-input" ? "input" : "change", renderLibrary);
  });
  document.getElementById("reset-filters-btn").addEventListener("click", () => {
    document.getElementById("search-input").value = "";
    document.getElementById("filter-type").value = "";
    document.getElementById("filter-rarity").value = "";
    document.getElementById("filter-act").value = "";
    renderLibrary();
  });
}

function populateFilters() {
  const typeSel = document.getElementById("filter-type");
  Object.entries(TYPE_LABELS).forEach(([k, v]) => typeSel.appendChild(el("option", { value: k }, [v])));
  const raritySel = document.getElementById("filter-rarity");
  Object.entries(RARITY_LABELS).forEach(([k, v]) => raritySel.appendChild(el("option", { value: k }, [v])));
}

async function init() {
  loadCurrent();
  // a shared link wins over whatever was last open locally
  if (await loadFromHash()) saveCurrent();
  populateFilters();
  initTabs();
  initLibraryControls();
  initPlannerControls();
  initCharacterControls();
  initCombatControls();
  initShareControls();
  initSpellControls();
  initCompareControls();
  initLoadoutViews();
  initBuildCard();
  initScrollMode();
  document.getElementById("app-subtitle").textContent =
    ITEMS.length + " items from bg3.wiki — plan gear for a party of four and see where every piece drops.";
  renderLibrary();
  renderPlanner();
}

document.addEventListener("DOMContentLoaded", init);
