// BG3 Build Planner — Item library, party bar, paper doll and build summary.
//
// Loaded as a classic script, like the generated data files: these share one
// global scope, in the order index.html lists them. Not ES modules, because
// those are blocked over file:// and the page has to keep opening by itself.
"use strict";

// ---------------------------------------------------------------
// Item library
// ---------------------------------------------------------------
function filteredItems() {
  const q = document.getElementById("search-input").value.trim().toLowerCase();
  const type = document.getElementById("filter-type").value;
  const rarity = document.getElementById("filter-rarity").value;
  const act = document.getElementById("filter-act").value;
  return ITEMS.filter((it) => {
    if (q) {
      const hay = [it.name, it.summary, it.subtype, it.location].filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (type && it.type !== type) return false;
    if (rarity && it.rarity !== rarity) return false;
    if (act && String(it.act) !== act) return false;
    return true;
  });
}

function renderEquipTargetBar() {
  const bar = document.getElementById("equip-target-bar");
  bar.innerHTML = "";
  if (state.party.length <= 1) return;
  bar.appendChild(document.createTextNode("Equipping for: "));
  bar.appendChild(el("strong", {}, [activeMember().name]));
}

// Rendering all 934 cards at once put ~15,000 nodes in the DOM for a list nobody
// reads past the first screen. Cards are appended a page at a time as the sentinel
// scrolls into view, which keeps the grid instant on a modest machine while still
// reaching the end by scrolling — no pagination controls to click through.
const LIBRARY_PAGE = 60;
let libraryQueue = [];
let libraryObserver = null;

function appendLibraryPage() {
  const grid = document.getElementById("item-grid");
  const sentinel = document.getElementById("library-sentinel");
  const page = libraryQueue.splice(0, LIBRARY_PAGE);
  page.forEach((it) => grid.insertBefore(renderItemCard(it), sentinel));
  if (!libraryQueue.length && libraryObserver) {
    libraryObserver.disconnect();
    sentinel.textContent = "";
  } else if (sentinel) {
    sentinel.textContent = libraryQueue.length + " more — keep scrolling";
  }
}

function renderLibrary() {
  const grid = document.getElementById("item-grid");
  grid.innerHTML = "";
  const items = filteredItems();
  document.getElementById("result-count").textContent =
    items.length + (items.length === 1 ? " item" : " items");
  renderEquipTargetBar();

  if (libraryObserver) libraryObserver.disconnect();
  libraryQueue = items.slice();
  const sentinel = el("div", { id: "library-sentinel", class: "library-sentinel" });
  grid.appendChild(sentinel);
  appendLibraryPage();

  if (libraryQueue.length) {
    libraryObserver = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) appendLibraryPage();
    }, { rootMargin: "400px" });
    libraryObserver.observe(sentinel);
  }
}

function renderItemCard(it) {
  const card = el("div", { class: "item-card", "data-rarity": it.rarity });

  const header = el("div", { class: "card-header" });
  if (it.icon) {
    header.appendChild(el("div", { class: "card-icon" }, [
      el("img", { src: it.icon, alt: "", loading: "lazy" })
    ]));
  }
  const titleBox = el("div", { class: "card-title-box" });
  titleBox.appendChild(el("div", { class: "name-row" }, [
    el("span", { class: "name" }, [it.name]),
    el("span", { class: "meta" }, [RARITY_LABELS[it.rarity] || it.rarity])
  ]));
  const typeLabel = TYPE_LABELS[it.type] || it.type;
  const metaParts = [typeLabel];
  if (it.subtype && it.subtype.toLowerCase() !== typeLabel.toLowerCase()) metaParts.push(it.subtype);
    // "Act ?" is an admission of ignorance. For 68 items the wiki gives an answer —
  // "In chests and carried by characters throughout the game", "Sold by any trader
  // using the magic melee table" — and the answer is that they belong to no act.
  metaParts.push(it.act ? "Act " + it.act : it.anyAct ? "Any act" : "Act ?");
  if (it.attunement) metaParts.push("Attunement");
  titleBox.appendChild(el("div", { class: "meta" }, [metaParts.join(" · ")]));
  header.appendChild(titleBox);
  card.appendChild(header);

  if (it.damage || it.ac) {
    card.appendChild(el("div", { class: "card-roll" }, [it.damage || "AC " + it.ac]));
  }
  card.appendChild(el("div", { class: "summary" }, [it.summary || "No description available."]));
  if (it.special && it.special.length) {
    const abilities = el("div", { class: "card-abilities" });
    it.special.forEach((s) => abilities.appendChild(el("span", { class: "card-ability", title: s.d || "" }, [s.n])));
    card.appendChild(abilities);
  }
  if (it.location) card.appendChild(el("div", { class: "location" }, ["📍 " + it.location]));

  const actions = el("div", { class: "card-actions" });
  actions.appendChild(el("button", { class: "ghost details-btn", onclick: () => openItemDetail(it) }, ["Details"]));
  if (slotsForItem(it).length > 0) {
    actions.appendChild(el("button", { class: "primary", onclick: () => handleEquipClick(it) }, ["Equip"]));
  }
  card.appendChild(actions);
  return card;
}

const DAMAGE_TYPES = ["Slashing", "Piercing", "Bludgeoning", "Fire", "Cold", "Lightning", "Thunder",
  "Acid", "Poison", "Necrotic", "Radiant", "Psychic", "Force"];

function damageType(damage) {
  if (!damage) return null;
  return DAMAGE_TYPES.find((t) => new RegExp("\\b" + t + "\\b", "i").test(damage)) || null;
}

// Property chips worth showing: drop shop/flavour noise, keep what shapes a build
const DETAIL_NOISE = /^(Rarity:|Weight:|Price:|Consumable by|UID|UUID|Stats)/i;

function usefulDetails(it) {
  if (!it.details || !it.details.length) return [];
  // details[0] is the item type, already shown in the header
  return it.details.slice(1).filter((d) => !DETAIL_NOISE.test(d));
}

// In-game-style stat block, in three clearly separated bands:
// the roll, the special abilities, then the properties.
// `dense` is the compressed variant used inside dropdown rows.
function renderStatBlock(it, opts) {
  const o = opts || {};
  const box = el("div", { class: "statblock" + (o.dense ? " dense" : "") });

  if (it.damage) {
    const type = damageType(it.damage);
    box.appendChild(el("div", { class: "sb-band sb-roll-band", "data-damage": type || "" }, [
      el("span", { class: "sb-key" }, ["Damage"]),
      el("span", { class: "sb-roll" }, [it.damage])
    ]));
  }
  if (it.ac) {
    box.appendChild(el("div", { class: "sb-band sb-ac-band" }, [
      el("span", { class: "sb-key" }, ["Armour Class"]),
      el("span", { class: "sb-roll" }, [String(it.ac)])
    ]));
  }

  if (it.special && it.special.length) {
    const list = el("div", { class: "sb-section sb-special" });
    it.special.forEach((s) => {
      const row = el("div", { class: "sb-ability" });
      row.appendChild(el("div", { class: "sb-ability-name" }, [s.n]));
      if (s.d) row.appendChild(el("div", { class: "sb-ability-desc" }, [s.d]));
      list.appendChild(row);
    });
    box.appendChild(list);
  }

  const details = o.allDetails ? (it.details || []) : usefulDetails(it);
  if (details.length) {
    const chips = el("div", { class: "sb-section sb-details" });
    details.forEach((d) => chips.appendChild(el("span", { class: "sb-chip" }, [d])));
    box.appendChild(chips);
  }

  return box;
}

function openItemDetail(it) {
  const overlay = el("div", { class: "modal-overlay" });
  const box = el("div", { class: "box detail-box" });

  const header = el("div", { class: "detail-header" });
  if (it.icon) header.appendChild(el("div", { class: "detail-icon" }, [el("img", { src: it.icon, alt: "" })]));
  const titleBox = el("div", {});
  titleBox.appendChild(el("h3", { class: "detail-name", "data-rarity": it.rarity }, [it.name]));
  const typeLabel = TYPE_LABELS[it.type] || it.type;
  const meta = [RARITY_LABELS[it.rarity] || it.rarity, it.subtype || typeLabel,
    it.act ? "Act " + it.act : it.anyAct ? "Any act" : "Act ?"];
  if (it.attunement) meta.push("Attunement");
  titleBox.appendChild(el("div", { class: "meta" }, [meta.join(" · ")]));
  header.appendChild(titleBox);
  box.appendChild(header);

  const body = el("div", { class: "detail-body" });
  body.appendChild(renderStatBlock(it, { allDetails: true }));

  const sets = setsByItem[it.id] || [];
  if (sets.length) {
    body.appendChild(el("div", { class: "stats-subtitle" }, ["Part of"]));
    const wrap = el("div", { class: "synergy-tags" });
    sets.forEach((s) => wrap.appendChild(el("a", {
      class: "synergy-tag", href: s.wiki, target: "_blank", rel: "noopener",
      title: s.desc || ""
    }, [s.name + " (" + s.items.length + ")"])));
    body.appendChild(wrap);
  }
  if (it.summary) body.appendChild(el("div", { class: "detail-summary" }, [it.summary]));
  if (it.location) {
    body.appendChild(el("div", { class: "stats-subtitle" }, ["Where to find"]));
    body.appendChild(el("div", { class: "detail-location" }, [it.location]));
  }
  box.appendChild(body);

  const footer = el("div", { class: "picker-footer" });
  const slots = slotsForItem(it);
  if (slots.length) {
    footer.appendChild(el("button", {
      class: "primary",
      onclick: () => { overlay.remove(); handleEquipClick(it); }
    }, ["Equip"]));
  }
  footer.appendChild(el("a", { class: "wikilink", href: it.wiki, target: "_blank", rel: "noopener" }, ["bg3.wiki ↗"]));
  footer.appendChild(el("button", { onclick: () => overlay.remove() }, ["Close"]));
  box.appendChild(footer);

  overlay.appendChild(box);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function handleEquipClick(it) {
  const slots = slotsForItem(it);
  if (slots.length === 0) return;
  if (slots.length === 1) { equip(slots[0], it.id); return; }
  showSlotChooser(it, slots);
}

function showSlotChooser(it, slots) {
  const overlay = el("div", { class: "modal-overlay" });
  const box = el("div", { class: "box" });
  box.appendChild(el("h3", {}, ['Where to equip "' + it.name + '"?']));
  const opts = el("div", { class: "opts" });
  const member = activeMember();
  slots.forEach((slotKey) => {
    const def = SLOT_DEFS.find((s) => s.key === slotKey);
    const occupantId = gear(member)[slotKey];
    const occupant = occupantId ? itemsById[occupantId] : null;
    opts.appendChild(el("button", {
      class: "primary",
      onclick: () => { equip(slotKey, it.id); overlay.remove(); }
    }, [def.label + (occupant ? " (replaces " + occupant.name + ")" : "")]));
  });
  box.appendChild(opts);
  box.appendChild(el("button", { onclick: () => overlay.remove() }, ["Cancel"]));
  overlay.appendChild(box);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function equip(slotKey, itemId) {
  gear(activeMember())[slotKey] = itemId;
  saveCurrent();
  renderPlanner();
}

function unequip(slotKey) {
  delete gear(activeMember())[slotKey];
  saveCurrent();
  renderPlanner();
}

// ---------------------------------------------------------------
// Party bar
// ---------------------------------------------------------------
function renderPartyBar() {
  const bar = document.getElementById("party-bar");
  bar.innerHTML = "";
  state.party.forEach((m) => {
    const isActive = m.id === state.activeMemberId;
    const pill = el("div", { class: "party-member-pill" + (isActive ? " active" : "") });

    // Only the character you are already on is renameable. Before this, the pill
    // was almost entirely an <input>, so clicking another character's name put the
    // caret in it instead of switching to them — you could barely change character.
    if (isActive) {
      const nameInput = el("input", {
        type: "text", value: m.name, "aria-label": "Character name",
        oninput: (e) => {
          m.name = e.target.value;
          saveCurrent();
          renderEquipTargetBar();
          renderDuplicateWarning();
          document.getElementById("doll-title").textContent = "Equipment — " + m.name;
        }
      });
      pill.appendChild(nameInput);
    } else {
      pill.appendChild(el("span", { class: "party-member-name" }, [m.name]));
      pill.setAttribute("role", "button");
      pill.setAttribute("tabindex", "0");
      pill.setAttribute("title", "Switch to " + m.name);
      const go = () => {
        state.activeMemberId = m.id;
        saveCurrent();
        renderPlanner();
      };
      pill.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-member")) return;
        go();
      });
      pill.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    }

    if (state.party.length > 1) {
      pill.appendChild(el("button", {
        class: "remove-member", title: "Remove this character",
        onclick: (e) => { e.stopPropagation(); removeMember(m.id); }
      }, ["×"]));
    }
    bar.appendChild(pill);
  });
  if (state.party.length < MAX_MEMBERS) {
    bar.appendChild(el("button", { class: "add-member-btn", onclick: addMember }, ["+ Add character"]));
    // A blank sheet is a poor first screen. This adds one that is already whole,
    // so the first thing you do is change something rather than fill everything.
    bar.appendChild(el("button", {
      class: "add-member-btn starter-btn",
      title: "Add a complete example character to take apart",
      // the document-level handler closes any popover on an outside click, and
      // without this marker the very click that opens this one counts as outside
      "data-popover": "",
      onclick: openStarterPicker
    }, ["✦ Example build"]));
  }
}

// The starter list, as a popover rather than a panel: it is used once and then
// never again, so it should not occupy the sheet permanently.
function openStarterPicker(e) {
  if (state.party.length >= MAX_MEMBERS) return;
  const anchor = (e && (e.currentTarget || e.target)) ||
    document.querySelector(".starter-btn");
  const body = el("div", { class: "starter-list" });
  // "Starter build" promised advice on how to start. These are not that, and the
  // list has always said so in its own second sentence — the button just said
  // something else. What they are is one complete, legal character per mechanic
  // this calculator computes, ready to be pulled apart.
  body.appendChild(el("div", { class: "starter-intro" }, [
    "Complete characters at level " + STARTER_LEVEL + " in Act 1 gear, each chosen " +
    "to show a different part of the calculator. Examples to pull apart, not " +
    "recommendations: what makes a build good is an opinion, and everything else " +
    "this tool tells you is checked against the wiki."
  ]));
  STARTER_BUILDS.forEach((b) => {
    const cls = CLASSES[b.cls];
    const sub = subclassById[b.subclass];
    const race = raceById[b.race];
    const row = el("div", {
      class: "starter-row",
      onclick: () => {
        const m = memberFromStarter(b);
        state.party.push(m);
        // the field is activeMemberId, as addMember uses — writing activeId
        // instead silently added the character without selecting it
        state.activeMemberId = m.id;
        saveCurrent();
        closePopover();
        renderPlanner();
      }
    });
    if (cls && cls.icon) {
      row.appendChild(el("span", { class: "starter-icon" },
        [el("img", { src: cls.icon, alt: "", loading: "lazy" })]));
    }
    const text = el("div", { class: "starter-text" });
    text.appendChild(el("div", { class: "starter-name" }, [b.name]));
    text.appendChild(el("div", { class: "starter-meta" }, [
      [race && race.name, sub && sub.name, (BACKGROUNDS[b.background] || {}).label]
        .filter(Boolean).join(" · ")
    ]));
    text.appendChild(el("div", { class: "starter-shows" }, ["Shows " + b.shows]));
    row.appendChild(text);
    body.appendChild(row);
  });
  showPopover(anchor, "Example builds", body);
}

function addMember() {
  if (state.party.length >= MAX_MEMBERS) return;
  const m = freshMember(state.party.length + 1);
  state.party.push(m);
  state.activeMemberId = m.id;
  saveCurrent();
  renderPlanner();
}

function removeMember(id) {
  if (state.party.length <= 1) return;
  state.party = state.party.filter((m) => m.id !== id);
  if (state.activeMemberId === id) state.activeMemberId = state.party[0].id;
  saveCurrent();
  renderPlanner();
}

// ---------------------------------------------------------------
// Paper doll
// ---------------------------------------------------------------
function renderActTabs() {
  const box = document.getElementById("act-tabs");
  box.innerHTML = "";
  const m = activeMember();
  // The three tab groups in the app used the same look and three different levels
  // of markup: the main nav and the Loadout pair were proper tablists, while these
  // — visually identical — were plain buttons with nothing saying which act was
  // current. Only the act buttons are tabs; "Copy forward" sits in the same row
  // and is an action, the same trap as the scroll-mode button in the main nav.
  box.setAttribute("role", "tablist");
  box.setAttribute("aria-label", "Act");
  ACTS.forEach((a) => {
    const current = state.activeAct === a;
    box.appendChild(el("button", {
      class: "act-tab" + (current ? " active" : ""),
      role: "tab",
      "aria-selected": current ? "true" : "false",
      onclick: () => { state.activeAct = a; saveCurrent(); renderPlanner(); }
    }, [
      "Act " + a,
      el("span", { class: "act-count" }, [String(Object.values(gear(m, a)).filter(Boolean).length)])
    ]));
  });
  box.appendChild(el("button", {
    class: "act-copy",
    title: "Copy this act's gear into the later acts",
    onclick: () => {
      const src = { ...gear(m, state.activeAct) };
      ACTS.filter((a) => a > state.activeAct).forEach((a) => { m.loadouts[a] = { ...src }; });
      saveCurrent();
      renderPlanner();
    }
  }, ["Copy forward →"]));
}

function renderSlots() {
  const member = activeMember();
  const container = document.getElementById("slots-container");
  container.innerHTML = "";

  const doll = el("div", { class: "paperdoll" });

  const leftCol = el("div", { class: "doll-col" });
  SLOT_DEFS.filter((s) => s.col === "left").forEach((s) => leftCol.appendChild(renderSlot(member, s)));

  // The centre of the doll shows who you are equipping. An origin companion has a
  // scraped portrait; a custom character falls back to the silhouette. Either way
  // the key defensive numbers sit under it, so the middle column stops being dead
  // space and reads like the game's inspect panel.
  const center = el("div", { class: "doll-center" });
  const companion = companionById[member.companion];
  const frame = el("div", { class: "doll-portrait" });
  if (companion && companion.portrait) {
    frame.appendChild(el("img", { src: companion.portrait, alt: companion.name, loading: "lazy" }));
  } else {
    frame.appendChild(el("div", { class: "doll-figure", html: SILHOUETTE_SVG }));
    frame.classList.add("is-silhouette");
  }
  center.appendChild(frame);

  const d = derivedStats(member);
  const vitals = el("div", { class: "doll-vitals" });
  const vital = (value, label, title) => {
    const v = el("div", { class: "doll-vital", title: title || "" });
    v.appendChild(el("div", { class: "doll-vital-value" }, [String(value)]));
    v.appendChild(el("div", { class: "doll-vital-label" }, [label]));
    return v;
  };
  vitals.appendChild(vital(d.ac, "AC", d.acFormula || ""));
  vitals.appendChild(vital("~" + d.hp, "HP", "Averaged hit points at this level and Constitution."));
  center.appendChild(vitals);

  const equipped = SLOT_DEFS.filter((s) => gear(member)[s.key]).length;
  center.appendChild(el("div", { class: "doll-count" }, [equipped + " / " + SLOT_DEFS.length + " equipped"]));

  const rightCol = el("div", { class: "doll-col" });
  SLOT_DEFS.filter((s) => s.col === "right").forEach((s) => rightCol.appendChild(renderSlot(member, s)));

  doll.appendChild(leftCol);
  doll.appendChild(center);
  doll.appendChild(rightCol);
  container.appendChild(doll);

  const bottom = el("div", { class: "doll-bottom" });
  SLOT_DEFS.filter((s) => s.col === "bottom").forEach((s) => bottom.appendChild(renderSlot(member, s)));
  container.appendChild(bottom);
}

function renderSlot(member, def) {
  const itemId = gear(member)[def.key];
  const item = itemId ? itemsById[itemId] : null;
  const slotEl = el("div", {
    class: "slot clickable" + (item ? " filled" : ""),
    "data-rarity": item ? item.rarity : "",
    title: item ? item.name + (item.summary ? " — " + item.summary : "") : def.label,
    onclick: (e) => {
      if (e.target.classList.contains("remove")) return;
      openSlotItemPicker(def.key);
    }
  });

  const iconBox = el("div", { class: "slot-icon" });
  if (item && item.icon) iconBox.appendChild(el("img", { src: item.icon, alt: "", loading: "lazy" }));
  else iconBox.appendChild(el("span", { class: "slot-icon-empty" }, [SLOT_GLYPHS[def.key] || "+"]));
  slotEl.appendChild(iconBox);

  const textBox = el("div", { class: "slot-text" });
  textBox.appendChild(el("div", { class: "slot-label" }, [def.label]));
  textBox.appendChild(el("div", { class: "slot-item" }, [item ? item.name : "Empty"]));
  slotEl.appendChild(textBox);

  // Where it comes from, so a slot filled with Act 3 gear is obvious while planning
  // an Act 1 party. BG3 items have no level requirement; the act is the real gate.
  if (item && item.act) {
    textBox.appendChild(el("div", { class: "slot-act" }, ["Act " + item.act]));
  }

  if (item) slotEl.appendChild(el("button", { class: "remove", onclick: () => unequip(def.key) }, ["×"]));
  return slotEl;
}

// What changes if this candidate replaces what is in the slot right now.
// Why an item might matter to this character, expressed as facts rather than a
// score. Each one is something the player can check for themselves.
function itemFacets(member, item) {
  const out = [];
  if (!proficiencyIssue(member, item)) out.push("proficient");
  const searchText = itemSearchText(item);

  // A mechanic another equipped piece already carries. Two pieces is what makes a
  // BG3 build work, so "one more of these" is a real, checkable reason.
  const text = itemSearchText(item);
  const equipped = equippedItems(member).filter((it) => it.id !== item.id);
  const shared = MECHANICS.filter((mech) => {
    const re = mechanicPattern(mech);
    return re.test(text) && equipped.some((it) => re.test(itemSearchText(it)));
  });
  if (shared.length) out.push({ facet: "synergy", detail: shared.slice(0, 2).join(", ") });

  // Something the character's own numbers care about. This used to look for four
  // phrases and found six of ninety-four helmets, which made the filter read as
  // broken rather than as selective — most of what a build is actually built on
  // was invisible to it: saving throws, an ability score, Advantage, a resistance,
  // or the character's own weapon damage type.
  const d = derivedStats(member);
  const wants = [];
  if (/Armou?r Class/i.test(text)) wants.push("AC");
  if (/Attack Rolls?/i.test(text)) wants.push("attack rolls");
  if (d.spellAbility && /Spell Save DC|Spell Attack/i.test(text)) wants.push("spellcasting");
  if (/Initiative/i.test(text)) wants.push("initiative");
  if (/Saving Throws?/i.test(text)) wants.push("saving throws");
  if (/Advantage/i.test(text)) wants.push("advantage");
  if (/Resistan(?:ce|t)/i.test(text)) wants.push("resistance");
  if (/Temporary Hit Points|Hit Point Maximum/i.test(text)) wants.push("hit points");
  if (/Movement Speed/i.test(text)) wants.push("movement");
  // The ability this character actually leans on, by name — a +2 Dexterity item
  // matters to a Rogue and not to a Cleric, and the sheet knows which is which.
  ABILITIES.forEach((a) => {
    if (new RegExp("\\b" + a.label + "\\b", "i").test(text) &&
        (a.key === d.spellAbility || a.key === "con" ||
         memberClasses(member).some((c) => (CLASSES[c.cls] || {}).saves &&
           CLASSES[c.cls].saves.includes(a.key)))) {
      wants.push(a.label);
    }
  });
  // And the damage type this character's own weapon deals.
  const main = itemsById[gear(member).weapon1] || itemsById[gear(member).ranged1];
  const mainType = main && main.damage ? (parseWeaponDamage(main.damage, false) || {}).main : null;
  if (mainType && mainType.type && new RegExp("\\b" + mainType.type + "\\b", "i").test(text)) {
    wants.push(mainType.type.toLowerCase() + " damage");
  }
  if (wants.length) {
    out.push({ facet: "stat", detail: [...new Set(wants)].slice(0, 3).join(", ") });
  }

  return out;
}

const hasFacet = (facets, key) =>
  facets.some((f) => f === key || (f && f.facet === key));
const facetDetail = (facets, key) => {
  const f = facets.find((x) => x && x.facet === key);
  return f ? f.detail : null;
};

// Which items another party member is already wearing — most unique items exist
// once per playthrough, so proposing one that is taken wastes the player's time.
function itemsTakenElsewhere(member) {
  const taken = new Set();
  state.party.forEach((m) => {
    if (m.id === member.id) return;
    ACTS.forEach((act) => SLOT_DEFS.forEach((s) => {
      const id = gear(m, act)[s.key];
      if (id) taken.add(id);
    }));
  });
  return taken;
}

// Deliberately a comparison and not a score: only AC, damage per turn and spell
// DC can be read out of an item, so ranking by them would quietly rate a ring of
// Radiating Orb below a +1 ring. The numbers are shown, the judgement is not.
function previewImpact(member, slotKey, candidate) {
  const before = derivedStats(member);
  const beforeDpr = totalDpr(member);

  const saved = gear(member)[slotKey];
  gear(member)[slotKey] = candidate.id;
  const after = derivedStats(member);
  const afterDpr = totalDpr(member);
  if (saved === undefined) delete gear(member)[slotKey];
  else gear(member)[slotKey] = saved;

  return {
    ac: after.ac - before.ac,
    dpr: afterDpr - beforeDpr,
    spellDc: (after.spellDc || 0) - (before.spellDc || 0)
  };
}

function totalDpr(member) {
  const targetAcInput = document.getElementById("target-ac");
  const targetAc = targetAcInput ? parseInt(targetAcInput.value, 10) || 15 : 15;
  // read the live roll state rather than controls that no longer exist: the old
  // lookups fell back to false, so this silently ignored whatever was selected
  const roll = rollState();
  const advantage = roll > 0;
  const disadvantage = roll < 0;
  const groundSel = document.getElementById("combat-ground");
  const ground = groundSel ? parseInt(groundSel.value, 10) || 0 : 0;
  return ["weapon1", "ranged1"].reduce((sum, k) => {
    const it = itemsById[gear(member)[k]];
    if (!it || it.type !== "weapon" || !it.damage) return sum;
    return Math.max(sum, weaponAttack(member, it, {
      targetAc, advantage, disadvantage, ground, slotKey: k, twoHanded: isTwoHanded(member, k)
    }).dpr);
  }, 0);
}

// Only rendered when the swap actually moves a number, and always labelled as a
// comparison against the item currently in the slot.
function impactBadges(impact, hasCurrent) {
  const wrap = el("div", { class: "impact-row" });
  const add = (value, label, digits) => {
    if (!value || Math.abs(value) < 0.05) return;
    const cls = value > 0 ? "impact up" : "impact down";
    const shown = (value > 0 ? "+" : "") + (digits ? value.toFixed(1) : value);
    wrap.appendChild(el("span", { class: cls }, [shown + " " + label]));
  };
  add(impact.ac, "AC");
  add(impact.dpr, "dmg/turn", true);
  add(impact.spellDc, "spell DC");
  if (!wrap.children.length) return null;
  wrap.appendChild(el("span", { class: "impact-note" },
    [hasCurrent ? "vs equipped" : "vs empty slot"]));
  return wrap;
}
// Click a slot -> pick from compatible items only
function openSlotItemPicker(slotKey) {
  const def = SLOT_DEFS.find((s) => s.key === slotKey);
  const candidates = ITEMS.filter((it) => slotAccepts(def, it));

  const overlay = el("div", { class: "modal-overlay" });
  const box = el("div", { class: "box picker-box" });
  box.appendChild(el("h3", {}, ["Pick an item — " + def.label]));

  const controls = el("div", { class: "picker-controls" });
  const search = el("input", { type: "search", "aria-label": "Search compatible items",
    placeholder: "Search by name or effect..." });
  controls.appendChild(search);
  // No "best for this build" ordering. Only AC, damage and spell DC are readable
  // from an item, and most slots carry none of them, so such a ranking would be
  // mostly arbitrary while looking authoritative. Sorting is by explicit, honest
  // keys; the per-item comparison against what is equipped is shown instead.
  const sortSel = el("select", { class: "picker-sort", "aria-label": "Sort the item list" }, [
    el("option", { value: "rarity" }, ["Sort: rarity"]),
    el("option", { value: "name" }, ["Sort: name"]),
    el("option", { value: "act" }, ["Sort: act found"])
  ]);
  controls.appendChild(sortSel);

  const actSel = el("select", { class: "picker-sort", "aria-label": "Filter by act" }, [
    el("option", { value: "" }, ["Any act"]),
    el("option", { value: "1" }, ["Act 1"]),
    el("option", { value: "2" }, ["Act 2"]),
    el("option", { value: "3" }, ["Act 3"]),
    el("option", { value: "0" }, ["Act unknown"])
  ]);
  controls.appendChild(actSel);

  const raritySel = el("select", { class: "picker-sort", "aria-label": "Minimum rarity" }, [
    el("option", { value: "" }, ["Any rarity"]),
    el("option", { value: "uncommon" }, ["Uncommon +"]),
    el("option", { value: "rare" }, ["Rare +"]),
    el("option", { value: "veryrare" }, ["Very rare +"]),
    el("option", { value: "legendary" }, ["Legendary"])
  ]);
  controls.appendChild(raritySel);
  box.appendChild(controls);

  // Facets rather than a score. Each one is a plain fact about the item and this
  // character, so the player can see *why* something is suggested instead of
  // trusting a number the tool made up.
  const facets = el("div", { class: "picker-facets" });
  const facetState = { proficient: false, synergy: false, stat: false, free: false };
  const facetDefs = [
    { key: "proficient", label: "Usable by this character",
      title: "Hides anything this character has no proficiency for." },
    { key: "synergy", label: "Continues a synergy",
      title: "Carries a mechanic another equipped piece already has — Radiating Orb, Reverberation, and so on." },
    { key: "stat", label: "Boosts a stat I use",
      title: "Mentions this character's spellcasting ability, Armour Class, attack rolls or their weapon's damage type." },
    { key: "free", label: "Not taken by the party",
      title: "Hides items already equipped on another character, since most exist only once." }
  ];
  facetDefs.forEach((f) => {
    const chip = el("button", {
      class: "picker-facet", type: "button", title: f.title,
      "aria-pressed": "false",
      onclick: () => {
        facetState[f.key] = !facetState[f.key];
        chip.classList.toggle("on", facetState[f.key]);
        chip.setAttribute("aria-pressed", facetState[f.key] ? "true" : "false");
        renderList();
      }
    }, [f.label]);
    facets.appendChild(chip);
  });
  box.appendChild(facets);

  const listEl = el("div", { class: "picker-list" });
  box.appendChild(listEl);

  const member = activeMember();
  const currentItem = itemsById[gear(member)[slotKey]];
  // The comparison badges below are all relative to this, so it is worth naming.
  if (currentItem) {
    box.insertBefore(el("div", { class: "picker-current" }, [
      el("span", { class: "picker-current-label" }, ["Currently equipped"]),
      el("span", { class: "picker-item-name", "data-rarity": currentItem.rarity }, [currentItem.name])
    ]), listEl);
  }
  const RARITY_ORDER = ["legendary", "veryrare", "rare", "uncommon", "common", "unknown", "artifact"];
  const impactCache = new Map();
  const impactOf = (it) => {
    if (!impactCache.has(it.id)) impactCache.set(it.id, previewImpact(member, slotKey, it));
    return impactCache.get(it.id);
  };

  const RARITY_MIN = ["legendary", "veryrare", "rare", "uncommon", "common"];
  const takenElsewhere = itemsTakenElsewhere(member);
  const facetCache = new Map();
  const facetsOf = (it) => {
    if (!facetCache.has(it.id)) facetCache.set(it.id, itemFacets(member, it));
    return facetCache.get(it.id);
  };

  function renderList() {
    const q = search.value.trim().toLowerCase();
    listEl.innerHTML = "";
    let matches = candidates.filter((it) => {
      if (q && ![it.name, it.summary, it.subtype].filter(Boolean).join(" ").toLowerCase().includes(q)) return false;
      if (actSel.value !== "") {
        const want = parseInt(actSel.value, 10);
        if (want === 0 ? !!it.act : it.act !== want) return false;
      }
      if (raritySel.value) {
        // "Rare +" means rare and everything above it
        const floor = RARITY_MIN.indexOf(raritySel.value);
        const here = RARITY_MIN.indexOf(it.rarity);
        if (here < 0 || here > floor) return false;
      }
      const f = facetsOf(it);
      if (facetState.proficient && !hasFacet(f, "proficient")) return false;
      if (facetState.synergy && !hasFacet(f, "synergy")) return false;
      if (facetState.stat && !hasFacet(f, "stat")) return false;
      if (facetState.free && takenElsewhere.has(it.id)) return false;
      return true;
    });
    const sortBy = sortSel.value;
    const byRarity = (a, b) =>
      RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || a.name.localeCompare(b.name);
    if (sortBy === "name") {
      matches = matches.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "act") {
      matches = matches.slice().sort((a, b) => (a.act || 9) - (b.act || 9) || byRarity(a, b));
    } else {
      matches = matches.slice().sort(byRarity);
    }
    // The list is capped, and the cap used to be silent — which is what made the
    // filters look broken. Ninety-four helmets cut to sixty; then "Usable by this
    // character" left sixty-eight, cut to sixty again, and nothing on screen
    // changed. The filter had worked perfectly and the cap hid it.
    const CAP = 60;
    const shown = matches.slice(0, CAP);
    if (shown.length === 0) {
      listEl.appendChild(el("div", { class: "empty-hint" },
        ["No item matches. Try clearing a filter."]));
      return;
    }
    if (matches.length > CAP) {
      listEl.appendChild(el("div", { class: "picker-capped" }, [
        matches.length + " match — showing the first " + CAP +
        ". Narrow it with a filter or the search box."
      ]));
    }
    shown.forEach((it) => {
      const row = el("div", {
        class: "picker-row", "data-rarity": it.rarity,
        onclick: () => { equip(slotKey, it.id); overlay.remove(); }
      });

      const head = el("div", { class: "picker-head" });
      if (it.icon) head.appendChild(el("div", { class: "picker-icon" }, [el("img", { src: it.icon, alt: "", loading: "lazy" })]));
      const headText = el("div", { class: "picker-head-text" });
      headText.appendChild(el("div", { class: "picker-name" }, [
        el("span", { class: "picker-item-name", "data-rarity": it.rarity }, [it.name]),
        el("span", { class: "picker-rarity" }, [RARITY_LABELS[it.rarity] || it.rarity])
      ]));
      const sub = [it.subtype || TYPE_LABELS[it.type], it.act ? "Act " + it.act : null]
        .filter(Boolean).join(" · ");
      headText.appendChild(el("div", { class: "picker-sub" }, [sub]));
      head.appendChild(headText);
      row.appendChild(head);

      const issue = proficiencyIssue(member, it);
      if (issue) {
        row.classList.add("not-proficient");
        row.appendChild(el("div", { class: "prof-badge" }, ["⚠ " + issue]));
      }

      // Why this one is worth a look — stated as facts, so nothing is taken on trust.
      const f = facetsOf(it);
      const reasons = el("div", { class: "picker-why" });
      const synergy = facetDetail(f, "synergy");
      if (synergy) {
        reasons.appendChild(el("span", { class: "why-tag why-synergy" },
          ["Stacks " + synergy + " with your gear"]));
      }
      const stat = facetDetail(f, "stat");
      if (stat) reasons.appendChild(el("span", { class: "why-tag" }, ["Boosts " + stat]));
      if (takenElsewhere.has(it.id)) {
        reasons.appendChild(el("span", { class: "why-tag why-warn" }, ["Already on another character"]));
      }
      if (reasons.children.length) row.appendChild(reasons);

      const badges = impactBadges(impactOf(it), !!currentItem);
      if (badges) row.appendChild(badges);

      row.appendChild(renderStatBlock(it, { dense: true }));
      listEl.appendChild(row);
    });
    if (matches.length > shown.length) {
      listEl.appendChild(el("div", { class: "empty-hint" }, ["… and " + (matches.length - shown.length) + " more. Refine your search."]));
    }
  }

  search.addEventListener("input", renderList);
  sortSel.addEventListener("change", renderList);
  renderList();

  const footer = el("div", { class: "picker-footer" });
  if (gear(activeMember())[slotKey]) {
    footer.appendChild(el("button", { class: "danger", onclick: () => { unequip(slotKey); overlay.remove(); } }, ["Unequip"]));
  }
  footer.appendChild(el("button", { onclick: () => overlay.remove() }, ["Cancel"]));
  box.appendChild(footer);

  overlay.appendChild(box);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
  search.focus();
}

// ---------------------------------------------------------------
// Build summary: parsed numeric bonuses + stacking synergies
// ---------------------------------------------------------------
// BG3 builds are largely about stacking these mechanics, so they are the
// meaningful equivalent of a classic "total stats" panel.
const MECHANICS = [
  "Radiating Orb", "Reverberation", "Lightning Charge", "Arcane Acuity", "Arcane Charge",
  "Momentum", "Bleeding", "Burning", "Chilled", "Wet", "Prone", "Frightened", "Blinded",
  "Advantage", "Resistance", "Immunity", "Concentration", "Misty Step", "Critical Hit",
  "Initiative", "Movement Speed", "Temporary Hit Points",
  "Necrotic", "Radiant", "Psychic", "Force", "Thunder", "Poison", "Acid", "Fire", "Cold", "Lightning"
];

const NUMERIC_PATTERNS = [
  { key: "ac", label: "Armour Class bonus", re: /\+\s*(\d+)\s*(?:bonus\s*)?to\s*(?:your\s*)?Armou?r Class/gi },
  { key: "attack", label: "Attack rolls", re: /\+\s*(\d+)\s*(?:bonus\s*)?to\s*(?:your\s*)?(?:Attack Rolls|Attack and Damage Rolls)/gi },
  // spell save DC is reported as a total in the derived tiles, not as a bonus here
  { key: "saves", label: "Saving throws", re: /\+\s*(\d+)\s*(?:bonus\s*)?to\s*(?:all\s*)?Saving Throws/gi },
  { key: "initiative", label: "Initiative", re: /\+\s*(\d+)\s*(?:bonus\s*)?to\s*Initiative/gi },
  { key: "damageReduction", label: "Incoming damage reduced by", re: /incoming damage is reduced by\s*(\d+)/gi },
  { key: "enchantment", label: "Weapon enchantment", re: /Enchantment:\s*\+\s*(\d+)/gi, mode: "max" }
];

// What the parser reads for one item. The prose summary usually restates the
// named abilities word for word ("grants a +2 bonus to Spell Save DC" appears in
// both), so reading both would double every bonus. The structured abilities win;
// the summary is only a fallback for items that have none.
function itemStatText(it) {
  const special = (it.special || []).map((s) => s.n + " " + (s.d || ""));
  const parts = special.length ? special : [it.summary || ""];
  (it.details || []).forEach((d) => parts.push(d));
  return parts.join(" ");
}

// Everything an item says about itself, for asking *whether* it mentions
// something rather than *how much* it gives. The two are different jobs and want
// different text: the function above must not read the summary, because it adds
// numbers up and the summary restates them; this one must, because a mechanic is
// often named only there. Searching both took the number of items a mechanic can
// be recognised on from 190 to 282.
function itemSearchText(it) {
  const parts = [it.summary || ""];
  (it.special || []).forEach((s) => parts.push(s.n + " " + (s.d || "")));
  (it.details || []).forEach((d) => parts.push(d));
  return parts.join(" ");
}

// "Lightning Charge" never matched "Lightning Charges": a word boundary after the
// singular refuses the plural, and the game writes it plural. Eleven items carry
// it and the filter found none of them.
const mechanicPattern = (mech) =>
  new RegExp("\\b" + mech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?:s|es)?\\b", "i");

function computeBuildStats(member) {
  const equipped = SLOT_DEFS
    .map((s) => gear(member)[s.key]).filter(Boolean)
    .map((id) => itemsById[id]).filter(Boolean);

  const numbers = {};
  const mechanics = new Map();

  equipped.forEach((it) => {
    const text = itemStatText(it);
    if (it.ac) numbers.acBase = Math.max(numbers.acBase || 0, it.ac);
    NUMERIC_PATTERNS.forEach(({ key, re, mode }) => {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text)) !== null) {
        const v = parseInt(m[1], 10);
        if (isNaN(v)) continue;
        if (mode === "max") numbers[key] = Math.max(numbers[key] || 0, v);
        else numbers[key] = (numbers[key] || 0) + v;
      }
    });
    const mechText = [it.summary || "", ...(it.special || []).map((s) => s.n + " " + (s.d || ""))].join(" ");
    MECHANICS.forEach((mech) => {
      if (new RegExp("\\b" + mech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(mechText)) {
        if (!mechanics.has(mech)) mechanics.set(mech, []);
        mechanics.get(mech).push(it.name);
      }
    });
  });

  const rarities = {};
  equipped.forEach((it) => { rarities[it.rarity] = (rarities[it.rarity] || 0) + 1; });

  return { equipped, numbers, mechanics, rarities };
}

function renderBuildStats() {
  const box = document.getElementById("build-stats");
  box.innerHTML = "";
  const { equipped, numbers, mechanics, rarities } = computeBuildStats(activeMember());

  if (equipped.length === 0) {
    box.appendChild(el("div", { class: "empty-hint" }, ["Click a slot to equip an item — totals and synergies show up here."]));
    return;
  }

  const rows = [];
  if (numbers.acBase) rows.push({ label: "Armour Class (armour)", value: String(numbers.acBase) });
  NUMERIC_PATTERNS.forEach((p) => {
    if (!numbers[p.key]) return;
    const prefix = (p.key === "damageReduction" || p.mode === "max") ? "" : "+";
    rows.push({ label: p.label, value: prefix + numbers[p.key] });
  });

  if (rows.length) {
    const statList = el("div", { class: "stat-list" });
    rows.forEach((r) => statList.appendChild(el("div", { class: "stat-row" }, [
      el("span", { class: "stat-label" }, [r.label]),
      el("span", { class: "stat-value" }, [r.value])
    ])));
    box.appendChild(statList);
  }

  const rarityBar = el("div", { class: "rarity-bar" });
  ["legendary", "veryrare", "rare", "uncommon", "common"].forEach((r) => {
    if (!rarities[r]) return;
    rarityBar.appendChild(el("span", { class: "rarity-chip", "data-rarity": r }, [rarities[r] + " " + RARITY_LABELS[r]]));
  });
  if (rarityBar.children.length) box.appendChild(rarityBar);

  // which thematic sets this loadout is drawing from
  const setCounts = new Map();
  equipped.forEach((it) => {
    (setsByItem[it.id] || []).forEach((s) => {
      setCounts.set(s.id, { set: s, count: (setCounts.get(s.id)?.count || 0) + 1 });
    });
  });
  const activeSets = [...setCounts.values()]
    .filter((e) => e.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  if (activeSets.length) {
    box.appendChild(el("div", { class: "stats-subtitle" }, ["Set pieces equipped"]));
    const wrap = el("div", { class: "synergy-tags" });
    activeSets.forEach(({ set, count }) => {
      wrap.appendChild(el("a", {
        class: "synergy-tag set-tag", href: set.wiki, target: "_blank", rel: "noopener",
        title: set.desc || ""
      }, [set.name.replace(/ set$/, "") + " " + count + "/" + set.items.length]));
    });
    box.appendChild(wrap);
  }

  // Only mechanics carried by 2+ items actually stack — that is the interesting signal.
  const stacking = [...mechanics.entries()]
    .filter(([, items]) => items.length >= 2)
    .sort((a, b) => b[1].length - a[1].length);
  if (stacking.length) {
    box.appendChild(el("div", { class: "stats-subtitle" }, ["Stacking synergies"]));
    const tags = el("div", { class: "synergy-tags" });
    stacking.forEach(([mech, items]) => {
      tags.appendChild(el("span", { class: "synergy-tag", title: items.join(", ") }, [mech + " ×" + items.length]));
    });
    box.appendChild(tags);
  }
}

