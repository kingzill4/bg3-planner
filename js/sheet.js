// BG3 Build Planner — Character panel, detail popover, level path, option picker, warnings and the planner render.
//
// Loaded as a classic script, like the generated data files: these share one
// global scope, in the order index.html lists them. Not ES modules, because
// those are blocked over file:// and the page has to keep opening by itself.
"use strict";

// ---------------------------------------------------------------
// Character panel: class, level, point-buy abilities
// ---------------------------------------------------------------
function initCharacterControls() {

  document.getElementById("add-class-btn").addEventListener("click", () => {
    const m = activeMember();
    const classes = memberClasses(m);
    if (totalLevel(m) >= MAX_LEVEL || classes.length >= 3) return;
    const taken = classes.map((c) => c.cls);
    const next = Object.keys(CLASSES).find((k) => !taken.includes(k));
    if (!next) return;
    // fund the new class by taking a level off the largest existing one
    const biggest = classes.reduce((a, b) => (b.levels > a.levels ? b : a));
    if (totalLevel(m) >= MAX_LEVEL) biggest.levels -= 1;
    m.classes = [...classes, { cls: next, subclass: null, levels: 1 }];
    syncPrimaryClass(m);
    saveCurrent();
    renderPlanner();
  });

  document.getElementById("preset-btn").addEventListener("click", () => {
    const m = activeMember();
    m.scores = presetScores(primaryClass(m).cls);
    saveCurrent();
    renderPlanner();
  });

}


// What the chosen background actually does to the sheet. The two skills it
// grants are free — they do not spend a class pick — so the impact worth
// showing is the modifier each one lands on, proficiency bonus included.
const fmtSigned = (n) => (n >= 0 ? "+" : "") + n;

function renderBackgroundDetail(m) {
  const box = document.getElementById("background-detail");
  box.innerHTML = "";
  const bg = BACKGROUNDS[m.background];
  if (!bg) {
    box.appendChild(el("div", { class: "meta" },
      ["No background: two free skill proficiencies left on the table."]));
    return;
  }
  const finals = finalScores(m);
  const prof = proficiencyBonus(totalLevel(m));
  const chosen = new Set(m.skills || []);

  box.appendChild(el("div", { class: "bg-desc" }, [bg.desc]));

  const grants = el("div", { class: "bg-grants" });
  bg.skills.forEach((key) => {
    const skill = SKILLS.find((s) => s.key === key);
    if (!skill) return;
    const mod = skillModifier(m, skill, finals, prof);
    const chip = el("span", { class: "bg-grant" }, [
      el("span", { class: "bg-grant-name" }, [skill.label]),
      el("span", { class: "bg-grant-mod" }, [fmtSigned(mod)])
    ]);
    // a background skill the class also picked is a wasted pick, exactly as in game
    if (chosen.has(key)) {
      chip.classList.add("overlap");
      chip.title = "Already spent a class pick on this skill — the background grants it for free.";
    } else {
      chip.title = skill.ability.toUpperCase() + " " + finals[skill.ability] +
        " (" + fmtSigned(abilityModifier(finals[skill.ability])) + ") · proficiency " + fmtSigned(prof);
    }
    grants.appendChild(chip);
  });
  box.appendChild(grants);

  const overlap = bg.skills.filter((k) => chosen.has(k));
  if (overlap.length) {
    box.appendChild(el("div", { class: "bg-warn" }, [
      "Redundant: " + overlap.map((k) => (SKILLS.find((s) => s.key === k) || {}).label).join(", ") +
      " already taken as a class pick. Spend the pick elsewhere."
    ]));
  }
  box.appendChild(el("div", { class: "meta bg-insp" }, ["Inspiration: " + bg.inspiration]));
}
// ---------------------------------------------------------------
// Detail popover: the game's own "click a feature, read what it does"
// ---------------------------------------------------------------
// A title attribute is not a description: it needs a hover, it cannot be reached
// from the keyboard, and long text is clipped. These are real panels instead, so
// every trait, feature and choice can be read the way the game shows them.
let openPopover = null;

function closePopover() {
  if (openPopover) { openPopover.remove(); openPopover = null; }
}
document.addEventListener("click", (e) => {
  if (openPopover && !openPopover.contains(e.target) &&
      !(e.target.closest && e.target.closest("[data-popover]"))) closePopover();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopover(); });

function showPopover(anchor, title, body, extras) {
  closePopover();
  const pop = el("div", { class: "detail-pop", role: "dialog", "aria-label": title });
  pop.appendChild(el("div", { class: "detail-pop-title" }, [title]));
  if (body) pop.appendChild(el("div", { class: "detail-pop-body" }, [body]));
  (extras || []).forEach((x) => {
    if (!x) return;
    pop.appendChild(el("div", { class: "detail-pop-extra" }, [x]));
  });
  pop.appendChild(el("button", {
    class: "detail-pop-close", type: "button", "aria-label": "Close",
    onclick: () => closePopover()
  }, ["×"]));
  document.body.appendChild(pop);

  // placed against the viewport so it is never clipped by a scrolling panel
  const r = anchor.getBoundingClientRect();
  const w = pop.offsetWidth;
  let left = r.left;
  if (left + w > window.innerWidth - 12) left = window.innerWidth - w - 12;
  let top = r.bottom + 6;
  if (top + pop.offsetHeight > window.innerHeight - 12) {
    top = Math.max(12, r.top - pop.offsetHeight - 6);
  }
  pop.style.left = Math.max(12, left) + "px";
  pop.style.top = top + "px";
  openPopover = pop;
}

// Turns any row into something you can click or tab to for its full description.
function withDetail(node, title, body, extras) {
  if (!body && !(extras || []).length) return node;
  node.setAttribute("data-popover", "1");
  node.setAttribute("tabindex", "0");
  node.setAttribute("role", "button");
  node.classList.add("has-detail");
  const open = (e) => { e.stopPropagation(); showPopover(node, title, body, extras); };
  node.addEventListener("click", open);
  node.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(e); }
  });
  return node;
}

// Race and background are pickers rather than <select>s so each option can carry
// its icon and what it grants — the same treatment as feats and fighting styles.
function renderRacePicker(m) {
  const box = document.getElementById("char-race");
  box.innerHTML = "";

  const current = raceById[m.race] || null;
  // Fall back to the remembered family, not to blank. Picking a family that has
  // subraces deliberately leaves `race` null until the ancestry is chosen — so
  // deriving the field purely from `race` made the top field snap back to
  // "— none —" the instant you chose Dragonborn, as if the click had been
  // rejected, while the ancestry menu appeared underneath it.
  const family = current ? raceFamilyOf(current) : (m.raceFamily || "");
  // raceFamily only exists to remember a half-made choice, so it must never
  // contradict a race that *is* set. Loading a companion, or any other path that
  // writes `race` directly, would otherwise leave the previous family behind —
  // harmless while a race is chosen, and wrong the moment one is cleared.
  if (current && m.raceFamily !== family) m.raceFamily = family;
  const families = raceFamilies();

  const describe = (r) => ({
    icon: r.icon,
    badge: r.darkvision ? "Darkvision" : "",
    desc: (r.traits || []).filter((t) => !/^(Base Racial Speed|Size)$/i.test(t.n))
      .map((t) => t.n).join(" · "),
    grants: (r.resistances || []).map((x) => ({ n: x + " resistance" }))
      .concat((r.armour || []).map((x) => ({ n: x })))
      .concat((r.weapons || []).map((x) => ({ n: x })))
  });

  // First picker: the family, as the game's own character creation presents it.
  // A flat list worked at 23 races; at 33 it is ten near-identical "… Dragonborn"
  // rows buried among everything else, and the thing that actually differs — the
  // ancestry damage type — is invisible until you read each one.
  box.appendChild(optionPicker({
    label: "Race",
    placeholder: "Choose a race…",
    value: family,
    options: [{ value: "", label: "— none —" }].concat(families.map((f) => {
      const members = raceFamilyMembers(f);
      const lead = members[0];
      return {
        value: f,
        label: f,
        ...describe(lead),
        badge: members.length > 1 ? members.length + " subraces"
          : (lead.darkvision ? "Darkvision" : ""),
        // for a family the traits differ per subrace, so summarise rather than
        // show one member's list as if it spoke for all of them
        desc: members.length > 1
          ? members.map((r) => r.name.replace(new RegExp("\\s*" + f + "$", "i"), "").trim() || r.name).join(" · ")
          : describe(lead).desc
      };
    })),
    onSelect: (value) => {
      const mem = value ? raceFamilyMembers(value) : [];
      // a family with one member is the race itself; otherwise wait for the subrace
      activeMember().race = mem.length === 1 ? mem[0].id : null;
      activeMember().raceFamily = value || null;
      saveCurrent();
      renderPlanner();
    }
  }));

  // Second picker: only when the chosen family actually branches.
  const chosenFamily = family || m.raceFamily || "";
  // The bare "Dragonborn" entry is kept in the data so an older saved character
  // still resolves, but it is not a choice anyone should make now — every real
  // dragonborn has a colour. Hide it unless it is what this character already is.
  const members = (chosenFamily ? raceFamilyMembers(chosenFamily) : [])
    .filter((r) => r.name !== chosenFamily || r.id === m.race || raceFamilyMembers(chosenFamily).length === 1);
  if (members.length > 1) {
    const sub = el("div", { class: "subrace-picker" });
    sub.appendChild(el("div", { class: "subrace-label" }, [chosenFamily + " ancestry"]));
    sub.appendChild(optionPicker({
      label: chosenFamily + " subrace",
      // "Choose a dragonborn…" reads as though you were picking a creature; the
      // thing being chosen is which ancestry, which the label above already names
      placeholder: "Choose an ancestry…",
      value: m.race || "",
      options: members.map((r) => ({
        value: r.id,
        label: r.name.replace(new RegExp("\\s*" + chosenFamily + "$", "i"), "").trim() || r.name,
        ...describe(r)
      })),
      onSelect: (value) => {
        activeMember().race = value || null;
        saveCurrent();
        renderPlanner();
      }
    }));
    box.appendChild(sub);
  }
}

function renderBackgroundPicker(m) {
  const box = document.getElementById("char-background");
  box.innerHTML = "";
  box.appendChild(optionPicker({
    label: "Background",
    placeholder: "Choose a background…",
    value: m.background || "",
    options: [{ value: "", label: "— none —" }].concat(
      Object.entries(BACKGROUNDS).map(([k, b]) => ({
        value: k,
        label: b.label,
        desc: b.desc,
        grants: b.skills.map((s) => ({ n: (SKILLS.find((x) => x.key === s) || {}).label || s }))
      }))),
    onSelect: (value) => {
      activeMember().background = value || null;
      saveCurrent();
      renderPlanner();
    }
  }));
}

function renderRaceTraits(m) {
  const box = document.getElementById("race-traits");
  box.innerHTML = "";
  const race = raceById[m.race];
  if (!race) return;

  // The named traits, as the wiki gives them — each opening what it does.
  const traits = (race.traits || []).filter((t) =>
    t.n && !/^(Base Racial Speed|Size)$/i.test(t.n));

  // The mechanical summary the rest of the tool computes with. It used to sit in
  // its own row above, which meant a Tiefling showed "Darkvision" twice — once as
  // a blue fact and once as a named trait — and "Fire resistance" beside the
  // "Hellish Resistance" that grants it. Two rows, two colours, one fact. So a
  // derived bit is dropped when a trait already says it, and what survives joins
  // the same row.
  // Only a literal duplicate is dropped. "Darkvision" is a trait by that exact
  // name, so the blue copy goes; "Fire resistance" stays, because the trait that
  // grants it is called "Hellish Resistance" and a reader scanning the row would
  // otherwise have to open it to learn which element.
  const traitNames = traits.map((t) => t.n.toLowerCase());
  const covered = (bit) => traitNames.includes(bit.toLowerCase());
  const bits = [race.speed + " m speed"];
  if (race.darkvision) bits.push("Darkvision");
  (race.resistances || []).forEach((r) => bits.push(r + " resistance"));
  (race.armour || []).forEach((a) => bits.push(a));
  (race.weapons || []).forEach((w) => bits.push(w));
  const derived = bits.filter((b) => !covered(b));

  if (!traits.length && !derived.length) return;
  // Same shape as every other list of things a build grants: a marker, then one
  // chip per thing. Neutral for a named trait you can read about, blue for a fact
  // the tool derived — the colours the rest of the sheet already uses.
  const list = el("div", { class: "sub-features race-features" });
  const row = el("div", { class: "sub-feature" });
  row.appendChild(el("span", { class: "sub-feature-level" }, ["◆"]));
  const bag = el("span", { class: "sub-feature-set" });
  traits.forEach((t) => {
    bag.appendChild(withDetail(el("span", { class: "sub-chip" }, [t.n]), t.n, t.d, [race.name]));
  });
  derived.forEach((b) => bag.appendChild(el("span", { class: "race-trait" }, [b])));
  row.appendChild(bag);
  list.appendChild(row);
  box.appendChild(list);
}

// the first class drives presets and full proficiencies
function syncPrimaryClass(m) {
  const first = memberClasses(m)[0];
  if (!first) return;
  m.cls = first.cls;
  m.subclass = first.subclass || null;
  m.level = totalLevel(m);
}

// ---------------------------------------------------------------
// Level path: what this character gains on the way to their level
// ---------------------------------------------------------------
// Picking "level 12" told you nothing about the road there. This is the road:
// every level of every class in the build, in the order the levels were taken,
// with what is already earned separated from what is still ahead. It is also the
// only place a multiclass split shows its real cost — six levels of Wizard means
// the Fighter half never reaches Extra Attack.
function renderLevelPath(m) {
  const box = document.getElementById("level-path");
  box.innerHTML = "";
  const entries = memberClasses(m);
  if (!entries.length) return;

  // The wiki's progression table has a column per class that the scraper reads by
  // cell, so a row whose only entry is a die arrives as a bare "1d6". The column
  // headers say what those are: "Sneak Attack Damage" for the rogue, "Martial
  // Arts" for the monk. Unlabelled, "1d6" on its own line means nothing.
  const DICE_COLUMN = { rogue: "Sneak Attack", monk: "Martial Arts die" };
  const labelFeature = (clsKey, f) =>
    /^\d+d\d+$/.test(String(f).trim()) && DICE_COLUMN[clsKey]
      ? DICE_COLUMN[clsKey] + " " + f
      : f;

  const rows = [];
  const ahead = [];
  // Character level, not class level. A Fighter 6 / Rogue 3 is level 9, and the
  // old list never said so — it counted each class from 1 again. The classes are
  // numbered in the order they were added, which is the only order the sheet
  // records; a real playthrough may have interleaved them differently, and the
  // footnote below says so rather than implying a precision we do not have.
  let charLevel = 0;
  // The progression table gives names; the class page's own level-by-level
  // section gives what those names do, and the scraper now carries both. So a
  // level-path entry answers the same click as every other feature on the sheet
  // instead of being the one list you cannot interrogate.
  const detailOf = (step, name) =>
    (step.detail || []).find((d) => d.n === name) || null;
  const describe = (cls, step, raw) => {
    const d = detailOf(step, raw);
    return {
      label: labelFeature(cls, raw),
      desc: d ? d.d : "",
      opts: d && d.opts ? d.opts : []
    };
  };

  entries.forEach((entry) => {
    const cls = CLASSES[entry.cls];
    if (!cls) return;
    (cls.progression || []).forEach((step) => {
      if (step.level > entry.levels) return;
      charLevel++;
      rows.push({
        cls: cls.label, icon: cls.icon, level: step.level, charLevel,
        features: (step.features || []).map((f) => describe(entry.cls, step, f))
      });
    });
    // What one more level of this class would buy — kept out of the main list.
    // Interleaved, "Fighter 7" sat between Fighter 6 and Rogue 1 and read as
    // something already taken, in an order that never happened.
    const next = (cls.progression || []).find((s) => s.level === entry.levels + 1);
    if (next && totalLevel(m) < MAX_LEVEL) {
      ahead.push({
        cls: cls.label, icon: cls.icon, level: next.level,
        features: (next.features || []).map((f) => describe(entry.cls, next, f))
      });
    }
  });
  if (!rows.length) return;

  // Open by default. This is the answer to the question a build planner exists to
  // answer — what a level buys, and what a multiclass split costs on the way — and
  // it was folded shut behind a label that did not say so. The viewer's own choice
  // wins over the default and survives a re-render and a reload.
  const wrap = el("details", { class: "level-path" });
  wrap.open = readPref("level-path-open", true);
  wrap.addEventListener("toggle", () => writePref("level-path-open", wrap.open));
  wrap.appendChild(el("summary", {}, [
    el("span", {}, ["Level path"]),
    el("span", { class: "level-path-hint" }, ["what each level gives you"]),
    el("span", { class: "sheet-badge" }, ["Character level " + charLevel])
  ]));

  // Half of every class's progression table is scaffolding, not content: "Feat"
  // appears twenty times across the twelve classes, "Subclass feature" six, and
  // "-" — the wiki's marker for a level that grants nothing — eighty-five. Listing
  // one row per level spent half its height saying "you will choose something
  // here", which is the shape of levelling rather than anything about this build.
  //
  // So the two are split. What the class hands you is listed by level; what you
  // still have to decide is collected into one line naming where each decision
  // falls. A Barbarian 12 goes from twelve rows to six and a sentence.
  const CHOICE_FEATURES = {
    "Feat": "Feats",
    "Subclass feature": "Subclass features",
    "Choose a subclass": "Subclass",
    "Fighting Style": "Fighting style"
  };
  const isNothing = (f) => !f || !f.label || f.label.trim() === "-";

  // One chip per feature, opening what it does — the same object the race traits
  // and the subclass features are made of, so the three lists on this sheet read
  // as one kind of thing rather than three.
  const featureChip = (f, extras) => {
    const chip = el("span", { class: "sub-chip" }, [f.label]);
    if (f.opts.length > 1) chip.appendChild(el("span", { class: "sub-chip-count" }, [
      f.opts.length + " options"
    ]));
    return withDetail(chip, f.label, f.desc, [
      ...extras,
      ...f.opts.map((o) => o.n + (o.d ? " — " + o.d : ""))
    ]);
  };

  const list = el("div", { class: "level-path-list" });
  let lastClass = null;
  const choices = new Map();

  rows.forEach((r) => {
    const gained = [];
    (r.features || []).forEach((f) => {
      if (isNothing(f)) return;
      const label = CHOICE_FEATURES[f.label];
      if (label) {
        if (!choices.has(label)) choices.set(label, []);
        choices.get(label).push(r.charLevel);
      } else {
        gained.push(f);
      }
    });
    if (!gained.length) return;

    if (r.cls !== lastClass) {
      lastClass = r.cls;
      const head = el("div", { class: "level-class-head" });
      if (r.icon) {
        head.appendChild(el("span", { class: "level-step-icon" },
          [el("img", { src: r.icon, alt: "", loading: "lazy" })]));
      }
      head.appendChild(el("span", { class: "level-class-name" }, [r.cls]));
      const runEnd = rows.filter((x) => x.cls === r.cls).slice(-1)[0];
      head.appendChild(el("span", { class: "level-class-range" },
        ["levels " + r.charLevel + "–" + runEnd.charLevel]));
      list.appendChild(head);
    }
    const row = el("div", { class: "level-step" });
    // the character level leads, because that is the number the game asks for
    row.appendChild(el("span", { class: "level-step-level", title: r.cls + " " + r.level },
      [String(r.charLevel)]));
    const bag = el("span", { class: "level-step-features sub-feature-set" });
    gained.forEach((f) => bag.appendChild(featureChip(f, [r.cls + " " + r.level])));
    row.appendChild(bag);
    list.appendChild(row);
  });
  wrap.appendChild(list);

  if (choices.size) {
    const parts = [...choices.entries()].map(([label, levels]) =>
      label + " at " + levels.join(", "));
    wrap.appendChild(el("div", { class: "level-choices" }, [
      el("span", { class: "level-choices-head" }, ["You choose"]),
      el("span", { class: "level-choices-body" }, [parts.join(" · ")])
    ]));
  }

  if (ahead.length) {
    wrap.appendChild(el("div", { class: "level-ahead-head" }, ["One more level would give"]));
    const next = el("div", { class: "level-path-list" });
    ahead.forEach((r) => {
      const row = el("div", { class: "level-step ahead" });
      if (r.icon) {
        row.appendChild(el("span", { class: "level-step-icon" },
          [el("img", { src: r.icon, alt: "", loading: "lazy" })]));
      }
      row.appendChild(el("span", { class: "level-step-level" }, [r.cls + " " + r.level]));
      const bag = el("span", { class: "level-step-features sub-feature-set" });
      r.features.filter((f) => !isNothing(f))
        .forEach((f) => bag.appendChild(featureChip(f, [r.cls + " " + r.level])));
      row.appendChild(bag);
      next.appendChild(row);
    });
    wrap.appendChild(next);
  }

  if (entries.length > 1) {
    wrap.appendChild(el("div", { class: "level-path-note" }, [
      "Numbered in the order the classes were added — the sheet records how many " +
      "levels of each, not which order you took them in."
    ]));
  }
  box.appendChild(wrap);
}

function renderClassRows(m) {
  const box = document.getElementById("class-rows");
  box.innerHTML = "";
  const classes = memberClasses(m);
  m.classes = classes;

  document.getElementById("total-level").textContent = "Level " + totalLevel(m) + " / " + MAX_LEVEL;

  classes.forEach((entry, index) => {
    const row = el("div", { class: "class-row" });

    // The class picker carries the game's own class badge and what the class
    // grants, so the choice is readable without leaving the sheet.
    row.appendChild(optionPicker({
      label: "Class",
      placeholder: "Choose a class…",
      value: entry.cls,
      options: Object.entries(CLASSES).map(([k, c]) => ({
        value: k,
        label: c.label,
        icon: c.icon,
        badge: c.hpLevel1 ? c.hpLevel1 + " HP · +" + c.hpOnLevelUp + "/level" : "",
        desc: [
          (c.armour || []).join(", "),
          (c.weapons || []).join(", "),
          c.spellAbility ? "Casts on " + c.spellAbility.toUpperCase() : null
        ].filter(Boolean).join(" · "),
        grants: (c.saves || []).map((s) => ({ n: s.toUpperCase() + " save" })),
        disabled: classes.some((other, i) => i !== index && other.cls === k)
      })),
      onSelect: (value) => {
        entry.cls = value;
        entry.subclass = null;
        if (index === 0) m.scores = presetScores(entry.cls);
        syncPrimaryClass(m);
        saveCurrent();
        renderPlanner();
      }
    }));

    const lvlSel = el("select", {
      class: "class-level-select", "aria-label": "Levels in this class",
      onchange: (e) => {
        entry.levels = parseInt(e.target.value, 10);
        syncPrimaryClass(m);
        saveCurrent();
        renderPlanner();
      }
    });
    const otherLevels = classes.reduce((n, c, i) => n + (i === index ? 0 : c.levels), 0);
    for (let i = 1; i <= MAX_LEVEL - otherLevels; i++) {
      lvlSel.appendChild(el("option", { value: String(i) }, [String(i)]));
    }
    lvlSel.value = String(entry.levels);
    row.appendChild(lvlSel);

    if (classes.length > 1) {
      row.appendChild(el("button", {
        class: "remove-class", title: "Remove this class",
        onclick: () => {
          m.classes = classes.filter((_, i) => i !== index);
          syncPrimaryClass(m);
          saveCurrent();
          renderPlanner();
        }
      }, ["×"]));
    }
    box.appendChild(row);
    const clsLabel = CLASSES[entry.cls].label;

    const subs = SUBCLASS_LIST.filter((s) => s.class === clsLabel);
    box.appendChild(optionPicker({
      label: "Subclass",
      placeholder: "— no subclass —",
      value: entry.subclass || "",
      options: [{ value: "", label: "— no subclass —" }].concat(subs.map((s) => ({
        value: s.id,
        label: s.name,
        icon: s.icon,
        desc: s.desc,
        badge: s.patch ? "Patch " + s.patch : "",
        grants: (s.features || []).slice(0, 3).map((f) => ({
          n: (f.level ? "L" + f.level + " " : "") + f.n, d: f.d
        }))
      }))),
      onSelect: (value) => {
        entry.subclass = value || null;
        syncPrimaryClass(m);
        saveCurrent();
        renderPlanner();
      }
    }));

    // What the subclass actually gives, by level, with anything above this
    // character's level greyed out — the sheet should show what is earned and
    // what is still ahead, not one undifferentiated list.
    const chosen = subclassById[entry.subclass];
    if (chosen && (chosen.features || []).length) {
      // Several subclasses list the same feature once per level just to restate a
      // bigger number: an Arcane Archer showed "Arcane Arrows: 4", then ": 7", then
      // ": 10", and the same for Arcane Shots — six of its ten rows were one
      // feature counting up twice. Those collapse into one row that shows the
      // progression, which is what the numbers were saying all along.
      const grouped = [];
      const byName = new Map();
      chosen.features.forEach((f) => {
        const m2 = /^(.*?):\s*([\d.]+)$/.exec(f.n || "");
        if (!m2) { grouped.push({ single: f }); return; }
        const stem = m2[1].trim();
        if (!byName.has(stem)) {
          const g = { stem, steps: [] };
          byName.set(stem, g);
          grouped.push({ group: g });
        }
        byName.get(stem).steps.push({ value: m2[2], level: f.level, d: f.d });
      });

      // Flatten the groups back into one entry per thing to show, each carrying the
      // level it arrives at. Grouping happens by level below.
      const entriesToShow = grouped.map((item) => {
        if (item.single) {
          const f = item.single;
          // The wiki nests: the eight Lands are options of "2nd Level Circle of the
          // Land Spells", the six fighting styles options of "Fighting Style". They
          // belong inside their parent, not beside it as features of their own —
          // read flat, one druid subclass claimed 48 features instead of 16.
          const opts = f.opts || [];
          return {
            level: f.level, label: f.n, desc: f.d, count: opts.length,
            extras: opts.map((o) => o.n + (o.d ? " — " + o.d : ""))
          };
        }
        const g = item.group;
        if (g.steps.length === 1) {
          return { level: g.steps[0].level, label: g.stem + ": " + g.steps[0].value,
            desc: g.steps[0].d, extras: [] };
        }
        const reached = g.steps.filter((s) => s.level == null || entry.levels >= s.level);
        const current = reached.length ? reached[reached.length - 1] : null;
        return {
          level: g.steps[0].level, label: g.stem, desc: g.steps[0].d,
          scale: g.steps.map((s) => s.value).join(" → "),
          extras: [
            g.steps.map((s) => s.value + " at level " + s.level).join(" · "),
            current ? "You have " + current.value : null
          ]
        };
      });

      // One row per *level*, not per feature. A Circle of the Land druid listed 48
      // rows, 32 of which were the same eight terrains repeated at levels 3, 5, 7
      // and 9 — the data is nested (level → land → spells) and the list was flat,
      // so the shape of the subclass was invisible under its own length. Gathering
      // each level's features onto one line puts that shape back: seven rows, and
      // the repetition is now legible as repetition.
      const byLevel = new Map();
      entriesToShow.forEach((e) => {
        const key = e.level == null ? "—" : e.level;
        if (!byLevel.has(key)) byLevel.set(key, []);
        byLevel.get(key).push(e);
      });

      // "Land's Stride: Difficult Terrain", ": Advantage", ": Plants" are one
      // feature the wiki writes on three lines because each part is its own game
      // entry. On a level's row they read as three things gained; folded back into
      // "Land's Stride", they read as the one thing they are, and the three parts
      // are a hover away.
      const foldPrefixes = (items) => {
        const out = [];
        const byStem = new Map();
        items.forEach((e) => {
          const m2 = /^(.+?):\s+(.+)$/.exec(e.label);
          if (!m2 || e.scale || e.count) { out.push(e); return; }
          const stem = m2[1].trim();
          if (!byStem.has(stem)) {
            const folded = { ...e, label: stem, parts: [], extras: [...e.extras] };
            byStem.set(stem, folded);
            out.push(folded);
          }
          byStem.get(stem).parts.push(m2[2].trim() + (e.desc ? " — " + e.desc : ""));
        });
        return out.map((e) => {
          if (!e.parts || e.parts.length < 2) {
            // un seul morceau : le nom complet reste plus clair que le tronc seul
            return e.parts ? items.find((i) => i.label.startsWith(e.label + ":")) || e : e;
          }
          return { ...e, count: e.parts.length, countLabel: "part", extras: [...e.extras, ...e.parts] };
        });
      };

      const list = el("div", { class: "sub-features" });
      [...byLevel.entries()]
        .sort((a, b) => (a[0] === "—" ? -1 : b[0] === "—" ? 1 : a[0] - b[0]))
        .forEach(([level, rawItems]) => {
          const items = foldPrefixes(rawItems);
          const earned = level === "—" || entry.levels >= level;
          const row = el("div", { class: "sub-feature" + (earned ? "" : " locked") });
          row.appendChild(el("span", { class: "sub-feature-level" },
            [level === "—" ? "—" : "L" + level]));
          const bag = el("span", { class: "sub-feature-set" });
          items.forEach((e) => {
            const chip = el("span", { class: "sub-chip" }, [e.label]);
            if (e.scale) chip.appendChild(el("span", { class: "sub-feature-scale" }, [e.scale]));
            // A chip that hides eight choices should say so, otherwise the one that
            // matters most on this level looks like the one that matters least.
            // "1 option" is noise — the tooltip already carries it.
            if (e.count > 1) chip.appendChild(el("span", { class: "sub-chip-count" }, [
              e.count + " " + (e.countLabel || "option") + (e.count > 1 ? "s" : "")
            ]));
            bag.appendChild(withDetail(chip, e.label, e.desc, [
              chosen.name,
              ...e.extras.filter(Boolean),
              level === "—" ? null : (earned ? "Gained at level " + level
                : "Unlocks at level " + level + " — you are level " + entry.levels)
            ]));
          });
          row.appendChild(bag);
          list.appendChild(row);
        });
      box.appendChild(list);
    }

    // A subclass choice that changes everything downstream — a Draconic Bloodline
    // sorcerer's ancestry sets their damage type and grants a spell — deserves to
    // be picked here rather than left implicit.
    if (chosen && (chosen.choices || []).length) {
      if (!m.subChoices) m.subChoices = {};
      chosen.choices.forEach((choice, ci) => {
        const key = chosen.id + ":" + ci;
        const rows = [{ value: "", label: "— not chosen —" }].concat(
          choice.options.map((o) => {
            const parts = Object.entries(o.fields || {});
            const desc = parts.filter(([k]) => /descri/i.test(k)).map(([, v]) => v).join(" ");
            const rest = parts.filter(([k]) => !/descri/i.test(k));
            return {
              value: o.n,
              label: o.n,
              desc: desc || rest.map(([k, v]) => k + ": " + v).join(" · "),
              grants: rest.map(([k, v]) => ({ n: k + ": " + v, d: v })),
              badge: (o.fields || {})["Damage Type"] || ""
            };
          }));
        const wrap = el("div", { class: "sub-choice" });
        wrap.appendChild(el("div", { class: "sub-choice-label" },
          [choice.label + (choice.count > 1 ? " (choose " + choice.count + ")" : "")]));
        wrap.appendChild(optionPicker({
          label: choice.label,
          placeholder: "Choose " + choice.label + "…",
          value: m.subChoices[key] || "",
          options: rows,
          onSelect: (value) => {
            m.subChoices[key] = value || null;
            saveCurrent();
            renderPlanner();
          }
        }));
        box.appendChild(wrap);
      });
    }
  });

  const addBtn = document.getElementById("add-class-btn");
  addBtn.disabled = classes.length >= 3 || totalLevel(m) < 2;
}

function renderCompanionPicker() {
  const m = activeMember();
  const box = document.getElementById("companion-picker");
  box.innerHTML = "";

  const custom = el("button", {
    class: "companion-chip" + (m.companion ? "" : " active"),
    title: "Custom character",
    onclick: () => {
      // Leaving an origin behind should drop their name too, or the party bar
      // keeps saying "Lae'zel" while the sheet says Custom character. A name the
      // player typed themselves is theirs, so only the companion's own name goes.
      const was = companionById[m.companion];
      if (was && m.name === was.name) {
        const index = state.party.findIndex((x) => x.id === m.id);
        m.name = "Character " + (index + 1);
      }
      m.companion = null;
      m.useOrigin = false;
      m.originScores = null;
      if (!m.racial2) { m.racial2 = "str"; m.racial1 = "con"; }
      saveCurrent();
      renderPlanner();
    }
  }, [el("span", { class: "companion-custom" }, ["✦"])]);
  box.appendChild(custom);

  COMPANION_LIST.forEach((c) => {
    const chip = el("button", {
      class: "companion-chip" + (m.companion === c.id ? " active" : ""),
      title: c.name + " — " + (c.class || "?") + (c.scores ? "" : " (origin stats unavailable)"),
      onclick: () => { applyCompanion(m, c.id); saveCurrent(); renderPlanner(); }
    });
    if (c.portrait) chip.appendChild(el("img", { src: c.portrait, alt: c.name, loading: "lazy" }));
    else chip.appendChild(el("span", { class: "companion-custom" }, [c.name.slice(0, 2)]));
    box.appendChild(chip);
  });

  const label = el("div", { class: "companion-label" });
  if (m.companion && companionById[m.companion]) {
    const c = companionById[m.companion];
    label.appendChild(el("span", {}, [c.name + " · " +
      (c.subrace || c.race || "") + " " +
      (c.subclass ? c.subclass + " " : "") + (c.class || "")]));
    if (m.useOrigin) {
      label.appendChild(el("button", {
        class: "ghost respec-btn",
        title: "Switch to the 27-point buy, like respeccing with Withers",
        onclick: () => {
          m.useOrigin = false;
          m.scores = presetScores(m.cls);
          m.racial2 = "str"; m.racial1 = "con";
          saveCurrent();
          renderPlanner();
        }
      }, ["Respec"]));
    } else {
      label.appendChild(el("span", { class: "respec-note" }, ["respecced"]));
      if (m.originScores) {
        label.appendChild(el("button", {
          class: "ghost respec-btn",
          title: "Put the shipped ability scores back, leaving the rest of the sheet alone",
          onclick: () => { m.useOrigin = true; saveCurrent(); renderPlanner(); }
        }, ["Restore origin stats"]));
      }
    }
    // The baseline lives in COMPANIONS and is never written to, so this works
    // however far the sheet has drifted — that is the point of having it.
    label.appendChild(el("button", {
      class: "ghost respec-btn reset-origin",
      title: "Rebuild the whole sheet from " + c.name +
             "'s shipped version: class, race, background, scores, skills and feats. Gear is kept.",
      onclick: () => {
        if (!confirm("Reset " + c.name + " to their origin sheet?\n\n" +
                     "Class, subclass, race, background, ability scores, skills and feats go back " +
                     "to what the game ships. Equipment is kept.")) return;
        applyCompanion(m, m.companion, true);
        saveCurrent();
        renderPlanner();
      }
    }, ["↺ Reset to origin"]));
  } else {
    label.appendChild(el("span", {}, ["Custom character"]));
  }
  box.appendChild(label);
}

function renderCharacter() {
  const m = activeMember();
  renderCompanionPicker();
  renderRacePicker(m);
  renderBackgroundPicker(m);
  renderRaceTraits(m);
  renderBackgroundDetail(m);
  renderClassRows(m);
  renderLevelPath(m);

  const origin = !!(m.useOrigin && m.originScores);
  document.querySelector(".racial-row").hidden = origin;
  document.getElementById("preset-btn").hidden = origin;

  const spent = spentPoints(m.scores);
  const pool = document.getElementById("point-pool");
  if (origin) {
    pool.textContent = "Origin stats, as the game ships them";
    pool.className = "points-origin";
  } else {
    pool.textContent = spent + " / " + POINT_POOL + " points";
    pool.className = spent > POINT_POOL ? "points-over" : "points-ok";
  }

  const finals = finalScores(m);
  const list = document.getElementById("ability-list");
  list.innerHTML = "";
  ABILITIES.forEach((a) => {
    const base = origin ? finals[a.key] : m.scores[a.key];
    const row = el("div", { class: "ability-row" + (origin ? " ability-row-origin" : "") });
    row.appendChild(el("span", { class: "ability-short" }, [a.short]));

    const dec = el("button", { class: "ability-btn", onclick: () => adjustAbility(a.key, -1) }, ["−"]);
    dec.disabled = origin || base <= ABILITY_MIN;
    row.appendChild(dec);

    row.appendChild(el("span", { class: "ability-base" }, [String(base)]));

    const inc = el("button", { class: "ability-btn", onclick: () => adjustAbility(a.key, 1) }, ["+"]);
    const nextCost = base < ABILITY_MAX ? abilityCost(base + 1) - abilityCost(base) : 99;
    inc.disabled = origin || base >= ABILITY_MAX || spent + nextCost > POINT_POOL;
    row.appendChild(inc);

    // racial bonuses sit inline as +2 / +1 columns, the way the game's own
    // creation screen presents them
    [["racial2", 2], ["racial1", 1]].forEach(([field, amount]) => {
      const dot = el("button", {
        class: "racial-dot" + (m[field] === a.key ? " on" : ""),
        title: "Racial +" + amount,
        onclick: () => {
          m[field] = m[field] === a.key ? null : a.key;
          saveCurrent();
          renderPlanner();
        }
      }, ["+" + amount]);
      dot.disabled = origin;
      row.appendChild(dot);
    });

    const bonus = finals[a.key] - base;
    row.appendChild(el("span", { class: "ability-bonus" }, [bonus ? "+" + bonus : ""]));

    const mod = abilityModifier(finals[a.key]);
    row.appendChild(el("span", { class: "ability-total" }, [String(finals[a.key])]));
    row.appendChild(el("span", { class: "ability-mod" }, [(mod >= 0 ? "+" : "") + mod]));
    list.appendChild(row);
  });
}

function renderDerivedStats() {
  const m = activeMember();
  const d = derivedStats(m);
  const box = document.getElementById("derived-stats");
  box.innerHTML = "";

  const grid = el("div", { class: "derived-grid" });
  const tile = (value, label, cls) => {
    const t = el("div", { class: "derived-tile" + (cls ? " " + cls : "") });
    t.appendChild(el("div", { class: "derived-value" }, [value]));
    t.appendChild(el("div", { class: "derived-label" }, [label]));
    return t;
  };
  // AC and hit points are the two the player watches while swapping gear, so they
  // count to their new value rather than snapping.
  const acTile = tile(String(d.ac), "Armour Class", "derived-ac");
  animateNumber(acTile.firstChild, "ac:" + m.id, d.ac, 0);
  grid.appendChild(acTile);
  const hpTile = tile("~" + d.hp, "Hit Points");
  animateNumber(hpTile.firstChild, "hp:" + m.id, d.hp, 0, "~");
  grid.appendChild(hpTile);
  grid.appendChild(tile((d.initiative >= 0 ? "+" : "") + d.initiative, "Initiative"));
  grid.appendChild(tile("+" + d.prof, "Proficiency"));
  if (d.spellDc !== null) {
    grid.appendChild(tile(String(d.spellDc), "Spell save DC", "derived-magic"));
    grid.appendChild(tile("+" + d.spellAttack, "Spell attack", "derived-magic"));
  }
  box.appendChild(grid);
}

// Open the section that settles a pending choice and put it under the eye. The
// sheet scrolls inside its own panel, not the page, so scrollIntoView on the
// window would move the wrong thing.
function revealSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.open = true;
  const panel = section.closest(".stats-panel") || section.parentElement;
  const top = section.offsetTop - 12;
  if (panel && panel.scrollHeight > panel.clientHeight) {
    panel.scrollTo({ top, behavior: "smooth" });
  } else {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  // A section that was already open and already in view would otherwise answer a
  // click with nothing at all.
  section.classList.remove("just-revealed");
  void section.offsetWidth;
  section.classList.add("just-revealed");
}

// Everything the sheet still needs before its numbers mean anything. Quietly
// computing with defaults is what makes a planner feel unreliable, so say it.
function renderPendingChoices() {
  const m = activeMember();
  const box = document.getElementById("pending-choices");
  box.innerHTML = "";
  const pending = [];
  const origin = !!(m.useOrigin && m.originScores);
  // Each one names the section that settles it, so the list stops being a notice
  // and becomes the way through: read what is missing, click it, land on it.
  const add = (text, section) => pending.push({ text, section });

  // A family with subraces leaves `race` null until the ancestry is picked, and
  // "Race not chosen" reads as though the first choice had not registered. Name
  // the step that is actually outstanding, the way the subclass line below does.
  if (!m.race) {
    add(m.raceFamily ? m.raceFamily + " ancestry" : "Race", "identity-section");
  }
  if (!origin) {
    const spent = spentPoints(m.scores);
    if (spent < POINT_POOL) add((POINT_POOL - spent) + " ability points", "abilities-section");
    if (!m.racial2 || !m.racial1) add("Racial +2 / +1", "abilities-section");
  }
  memberClasses(m).forEach((c) => {
    const label = (CLASSES[c.cls] || {}).label || c.cls;
    const hasSubclasses = SUBCLASS_LIST.some((s) => s.class === label);
    if (hasSubclasses && !c.subclass) add(label + " subclass", "classes-section");
  });
  if (!m.background) add("Background", "identity-section");
  const picks = skillPickBudget(m);
  const chosen = (m.skills || []).length;
  if (chosen < picks) add((picks - chosen) + " skill pick" + (picks - chosen > 1 ? "s" : ""), "skills-section");
  const styleGap = styleSlots(m) - (m.styles || []).length;
  if (styleGap > 0) add(styleGap + " fighting style" + (styleGap > 1 ? "s" : ""), "styles-section");
  const slots = featSlots(m);
  const taken = memberFeats(m).length;
  if (taken < slots) add((slots - taken) + " feat" + (slots - taken > 1 ? "s" : ""), "feats-section");

  if (!pending.length) {
    // Saying nothing when a sheet is complete is a missed chance to say so: the
    // absence of a warning reads as "not checked yet", not as "nothing left".
    box.appendChild(el("div", { class: "pending-box done" }, [
      el("span", { class: "pending-tick" }, ["✓"]),
      el("span", {}, ["Every choice made — the numbers above are the whole build."])
    ]));
    return;
  }

  const wrap = el("div", { class: "pending-box" });
  wrap.appendChild(el("div", { class: "pending-head" }, [
    el("strong", {}, ["Still to choose"]),
    el("span", { class: "sheet-badge" }, [String(pending.length)])
  ]));
  const bag = el("div", { class: "pending-set" });
  pending.forEach((p) => {
    bag.appendChild(el("button", {
      type: "button", class: "pending-chip",
      onclick: () => revealSection(p.section)
    }, [p.text]));
  });
  wrap.appendChild(bag);
  box.appendChild(wrap);
}

function renderSkills() {
  const m = activeMember();
  const finals = finalScores(m);
  const prof = proficiencyBonus(totalLevel(m));
  const fromBackground = new Set((BACKGROUNDS[m.background] || {}).skills || []);
  const chosen = new Set(m.skills || []);
  const picks = skillPickBudget(m);
  const offered = availableSkillKeys(m);
  const expertise = new Set(m.expertise || []);
  const allowExpertise = canTakeExpertise(m);

  // A skill picked before a class change may no longer be on offer; drop it rather
  // than keeping a proficiency the character could not have taken.
  const stale = (m.skills || []).filter((k) => !offered.has(k));
  if (stale.length) {
    m.skills = (m.skills || []).filter((k) => offered.has(k));
    m.expertise = (m.expertise || []).filter((k) => offered.has(k));
    stale.forEach((k) => chosen.delete(k));
    saveCurrent();
  }

  document.getElementById("skills-title").textContent = chosen.size + " / " + picks;

  const list = document.getElementById("skill-list");
  list.innerHTML = "";
  SKILLS.forEach((skill) => {
    const isBackground = fromBackground.has(skill.key);
    const isChosen = chosen.has(skill.key);
    const proficient = isBackground || isChosen;
    const canPick = offered.has(skill.key);
    const mod = skillModifier(m, skill, finals, prof);

    const row = el("div", {
      class: "skill-row" + (proficient ? " proficient" : "") +
             (!canPick && !isBackground ? " unavailable" : "")
    });

    const dot = el("button", {
      class: "skill-dot" + (proficient ? " on" : "") +
             (isBackground || !canPick ? " locked" : ""),
      title: isBackground ? "Granted by your background"
        : !canPick ? "Not on this class's skill list"
        : "Toggle class proficiency",
      onclick: () => {
        if (isBackground || !canPick) return;
        if (isChosen) {
          m.skills = (m.skills || []).filter((s) => s !== skill.key);
          m.expertise = (m.expertise || []).filter((s) => s !== skill.key);
        } else {
          if (chosen.size >= picks) return;
          m.skills = [...(m.skills || []), skill.key];
        }
        saveCurrent();
        renderPlanner();
      }
    }, [proficient ? "●" : isBackground || canPick ? "○" : "·"]);
    row.appendChild(dot);

    row.appendChild(el("span", { class: "skill-name" }, [skill.label]));
    row.appendChild(el("span", { class: "skill-ability" }, [skill.ability.toUpperCase()]));

    if (allowExpertise && proficient) {
      row.appendChild(el("button", {
        class: "skill-expertise" + (expertise.has(skill.key) ? " on" : ""),
        title: "Expertise: double proficiency bonus",
        onclick: () => {
          m.expertise = expertise.has(skill.key)
            ? (m.expertise || []).filter((s) => s !== skill.key)
            : [...(m.expertise || []), skill.key];
          saveCurrent();
          renderPlanner();
        }
      }, ["E"]));
    } else {
      row.appendChild(el("span", {}, []));
    }

    row.appendChild(el("span", { class: "skill-mod" }, [(mod >= 0 ? "+" : "") + mod]));
    list.appendChild(row);
  });
}

function renderStyles() {
  const m = activeMember();
  const slots = styleSlots(m);
  const options = availableStyles(m);
  const title = document.getElementById("styles-title");
  const section = document.getElementById("styles-section");
  const list = document.getElementById("style-list");
  list.innerHTML = "";

  if (!slots || !options.length) {
    // A class that grants no fighting style should not show an empty section at
    // all — the sheet only offers what this character can actually take.
    section.hidden = true;
    list.innerHTML = "";
    m.styles = [];
    return;
  }
  section.hidden = false;

  title.textContent = memberStyles(m).length + " / " + slots;
  if (!Array.isArray(m.styles)) m.styles = [];
  if (!m.subChoices) m.subChoices = {};
  m.styles.length = slots;

  for (let i = 0; i < slots; i++) {
    const wrap = el("div", { class: "feat-row" });
    const rows = [{ value: "", label: "— empty —" }].concat(options.map((s) => ({
      value: s.id,
      label: s.name,
      desc: s.desc,
      // The notes carry the precisions that change the maths — a shield still
      // counting as a free hand for Duelling, Versatile weapons for GWF.
      grants: (s.notes || []).slice(0, 1).map((n) => ({ n: n.length > 80 ? n.slice(0, 77) + "…" : n, d: n })),
      // "Each fighting style can only be chosen once."
      disabled: (m.styles || []).includes(s.id) && m.styles[i] !== s.id
    })));
    wrap.appendChild(optionPicker({
      label: "Fighting style " + (i + 1),
      placeholder: "Choose a fighting style…",
      value: m.styles[i] || "",
      options: rows,
      onSelect: (value) => {
        m.styles[i] = value || null;
        saveCurrent();
        renderPlanner();
      }
    }));
    list.appendChild(wrap);
  }
}
// ---------------------------------------------------------------
// Option picker: a dropdown that shows what each choice does
// ---------------------------------------------------------------
// A native <select> can only show a line of text, so picking a feat meant choosing
// blind and reading the description afterwards. This is a listbox instead: the
// description sits in every row, so scrolling *is* the preview. Arrow keys move
// the highlight and Enter commits, so it stays usable without a mouse.
// ids have to be unique across the page, and several pickers are rendered at once
let optionPickerSeq = 0;

// Bring a row into view *inside its own list*, and nowhere else.
//
// scrollIntoView cannot do this: it walks up and scrolls every scrollable
// ancestor, so opening a picker scrolled the whole character panel by ~118px and
// the field you had just clicked slid out from under the cursor. The list is the
// only thing that should move, so its scrollTop is set directly.
function scrollRowIntoList(list, row) {
  if (!list || !row) return;
  // Measured from rectangles rather than offsetTop: offsetTop is relative to the
  // nearest *positioned* ancestor, which is not necessarily the list, and the
  // resulting drift left End stopping short of the last row.
  const lr = list.getBoundingClientRect();
  const rr = row.getBoundingClientRect();
  if (rr.top < lr.top) list.scrollTop += rr.top - lr.top;
  else if (rr.bottom > lr.bottom) list.scrollTop += rr.bottom - lr.bottom;
}

function optionPicker(opts) {
  const wrap = el("div", { class: "opt-picker" });
  const current = opts.options.find((o) => o.value === opts.value);
  const toggle = el("button", {
    class: "opt-toggle" + (current ? " has-value" : ""),
    type: "button",
    "aria-haspopup": "listbox",
    "aria-expanded": "false",
    "aria-label": opts.label,
    onclick: () => setOpen(!wrap.classList.contains("open"))
  }, [
    current && current.icon
      ? el("span", { class: "opt-toggle-icon" }, [el("img", { src: current.icon, alt: "" })])
      : null,
    el("span", { class: "opt-toggle-text" }, [current ? current.label : opts.placeholder]),
    el("span", { class: "opt-toggle-caret" }, [""])
  ]);
  wrap.appendChild(toggle);

  const list = el("div", { class: "opt-list", role: "listbox", "aria-label": opts.label });
  const rows = [];

  const commit = (value) => {
    setOpen(false);
    // onSelect rebuilds the whole sheet, and doing that synchronously tore the DOM
    // out from under the click that was still propagating: the row vanished
    // mid-dispatch and the freshly rendered toggle caught the same click, which
    // re-opened the menu you had just chosen from. Choosing Dragonborn left the
    // list hanging open over the result. Deferring by one turn lets the event
    // finish against the DOM it was dispatched into, and only then replaces it.
    setTimeout(() => opts.onSelect(value), 0);
  };

  // Each option needs an id so the listbox can point at the highlighted one with
  // aria-activedescendant. Focus stays on the list while the arrows move a purely
  // visual highlight, so without this a screen reader is never told which option
  // is current — a sighted keyboard user sees it move, a blind one hears nothing.
  const listId = "optlist-" + (optionPickerSeq++);
  list.id = listId;

  opts.options.forEach((o, i) => {
    const row = el("div", {
      class: "opt-row" + (o.value === opts.value ? " selected" : "") + (o.disabled ? " disabled" : ""),
      id: listId + "-opt" + i,
      role: "option",
      "aria-selected": o.value === opts.value ? "true" : "false",
      "aria-disabled": o.disabled ? "true" : null,
      onclick: () => { if (!o.disabled) commit(o.value); }
    });
    const head = el("div", { class: "opt-row-head" });
    if (o.icon) {
      head.appendChild(el("span", { class: "opt-row-icon" },
        [el("img", { src: o.icon, alt: "", loading: "lazy" })]));
    }
    head.appendChild(el("span", { class: "opt-row-name" }, [o.label]));
    if (o.badge) head.appendChild(el("span", { class: "opt-row-badge" }, [o.badge]));
    row.appendChild(head);
    // the preview itself — the reason this is not a <select>
    if (o.desc) row.appendChild(el("div", { class: "opt-row-desc" }, [o.desc]));
    if ((o.grants || []).length) {
      const chips = el("div", { class: "opt-row-grants" });
      o.grants.forEach((g) => chips.appendChild(
        el("span", { class: "opt-grant", title: g.d || "" }, [g.n])));
      row.appendChild(chips);
    }
    if (o.disabled) row.appendChild(el("div", { class: "opt-row-note" }, ["Already taken"]));
    rows.push(row);
    list.appendChild(row);
  });
  wrap.appendChild(list);

  let active = Math.max(0, opts.options.findIndex((o) => o.value === opts.value));
  function highlight(i) {
    if (!rows.length) return;
    active = Math.max(0, Math.min(rows.length - 1, i));
    rows.forEach((r, n) => r.classList.toggle("active", n === active));
    // the same move, announced: the class is for eyes, this is for everything else
    list.setAttribute("aria-activedescendant", rows[active].id);
    scrollRowIntoList(list, rows[active]);
  }

  function setOpen(open) {
    wrap.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      openPicker(wrap);
      highlight(active);
      // preventScroll matters more than it looks: focus() scrolls the element into
      // view by default, walking up and moving every scrollable ancestor. That is
      // what yanked the character panel 118px the instant a picker opened, sliding
      // the field out from under the cursor mid-click. The list still takes focus,
      // it just does not drag the page with it.
      list.focus({ preventScroll: true });
    }
  }

  list.setAttribute("tabindex", "-1");
  list.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); highlight(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); highlight(active - 1); }
    else if (e.key === "Home") { e.preventDefault(); highlight(0); }
    else if (e.key === "End") { e.preventDefault(); highlight(rows.length - 1); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const o = opts.options[active];
      if (o && !o.disabled) commit(o.value);
    } else if (e.key === "Escape") { e.preventDefault(); setOpen(false); toggle.focus(); }
  });

  return wrap;
}

// Only one picker open at a time, and a click elsewhere closes it.
let openPickerEl = null;
function openPicker(wrap) {
  if (openPickerEl && openPickerEl !== wrap) openPickerEl.classList.remove("open");
  openPickerEl = wrap;
}
document.addEventListener("click", (e) => {
  if (openPickerEl && !openPickerEl.contains(e.target)) {
    openPickerEl.classList.remove("open");
    openPickerEl = null;
  }
});

// A one-glance summary of the mechanical part the tool actually computes with, so a
// feat that moves a number is distinguishable from one that only reads well.
function featBadge(f) {
  const bits = [];
  if (f.ability) bits.push("+" + f.ability + " ability");
  if (f.abilities) {
    Object.entries(f.abilities).forEach(([k, v]) => bits.push("+" + v + " " + k.toUpperCase()));
  }
  if (f.ac) bits.push("+" + f.ac + " AC");
  if (f.initiative) bits.push("+" + f.initiative + " initiative");
  if (f.tough) bits.push("+2 HP / level");
  if (f.armour) bits.push(f.armour.join(", "));
  if (f.gwm || f.sharpshooter) bits.push("−5 / +10");
  if (f.savage) bits.push("reroll damage");
  if (f.spellCrit) bits.push("spell crit 19–20");
  return bits.length ? bits.join(" · ") : "";
}

function renderFeats() {
  const m = activeMember();
  const slots = featSlots(m);
  document.getElementById("feats-title").textContent =
    slots ? memberFeats(m).length + " / " + slots : "none until level 4";

  const list = document.getElementById("feat-list");
  list.innerHTML = "";
  if (!slots) return;

  if (!m.feats) m.feats = [];
  m.feats.length = slots;

  const sorted = Object.entries(FEATS).sort((a, b) => a[1].label.localeCompare(b[1].label));
  for (let i = 0; i < slots; i++) {
    const wrap = el("div", { class: "feat-row" });
    const options = [{ value: "", label: "— empty —" }].concat(
      sorted.map(([key, f]) => ({
        value: key,
        label: f.label,
        desc: f.desc,
        grants: f.grants,
        badge: featBadge(f),
        disabled: m.feats.includes(key) && m.feats[i] !== key
      })));
    wrap.appendChild(optionPicker({
      label: "Feat " + (i + 1),
      placeholder: "Choose a feat…",
      value: m.feats[i] || "",
      options,
      onSelect: (value) => {
        m.feats[i] = value || null;
        saveCurrent();
        renderPlanner();
      }
    }));
    list.appendChild(wrap);
  }

  // Feats that grant free ability points let the player place them
  const flexible = memberFeats(m).filter((k) => FEATS[k] && FEATS[k].ability);
  if (flexible.length) {
    const total = flexible.reduce((s, k) => s + FEATS[k].ability, 0);
    const placed = Object.values(m.featBoosts || {}).reduce((s, n) => s + n, 0);
    const row = el("div", { class: "feat-boost-row" });
    row.appendChild(el("span", { class: "feat-boost-label" }, ["Feat ability points " + placed + " / " + total]));
    ABILITIES.forEach((a) => {
      const btn = el("button", {
        class: "ability-btn",
        onclick: () => {
          m.featBoosts = m.featBoosts || {};
          const cur = Object.values(m.featBoosts).reduce((s, n) => s + n, 0);
          if (cur >= total) return;
          m.featBoosts[a.key] = (m.featBoosts[a.key] || 0) + 1;
          saveCurrent();
          renderPlanner();
        }
      }, ["+" + a.short]);
      btn.disabled = placed >= total;
      row.appendChild(btn);
    });
    if (placed > 0) {
      row.appendChild(el("button", {
        class: "ability-btn", title: "Clear feat ability points",
        onclick: () => { m.featBoosts = {}; saveCurrent(); renderPlanner(); }
      }, ["↺"]));
    }
    list.appendChild(row);
  }
}

function adjustAbility(key, delta) {
  const m = activeMember();
  const next = m.scores[key] + delta;
  if (next < ABILITY_MIN || next > ABILITY_MAX) return;
  const trial = { ...m.scores, [key]: next };
  if (spentPoints(trial) > POINT_POOL) return;
  m.scores = trial;
  saveCurrent();
  renderPlanner();
}

// ---------------------------------------------------------------
// Proficiency cross-check, like the game's own warning
// ---------------------------------------------------------------
function renderProficiencyWarnings() {
  const m = activeMember();
  const box = document.getElementById("proficiency-warnings");
  box.innerHTML = "";
  const issues = [];
  SLOT_DEFS.forEach((s) => {
    const id = gear(m)[s.key];
    if (!id || !itemsById[id]) return;
    const issue = proficiencyIssue(m, itemsById[id]);
    if (issue) issues.push({ item: itemsById[id], issue });
  });
  if (issues.length) {
    box.appendChild(el("div", { class: "prof-warning" }, [
      el("div", {}, [el("strong", {}, ["⚠ Proficiency problems"])]),
      ...issues.map((i) => el("div", {}, [i.item.name + " — " + i.issue]))
    ]));
  }

  // A pair that cannot be dual-wielded is not merely an off-hand attack you do not
  // get: the game would not let you equip it at all. The combat panel already
  // explains the missing bonus action; this says the loadout itself is impossible,
  // because the main-hand damage is still being read as one-handed on the strength
  // of an off-hand slot that could never hold that weapon.
  [["weapon1", "weapon2"], ["ranged1", "ranged2"]].forEach(([mainKey, offKey]) => {
    const main = itemsById[gear(m)[mainKey]];
    const off = itemsById[gear(m)[offKey]];
    if (!main || !off || main.type !== "weapon" || off.type !== "weapon") return;
    const check = dualWieldCheck(m, main, off);
    if (check.ok) return;
    box.appendChild(el("div", { class: "prof-warning" }, [
      el("div", {}, [el("strong", {}, ["⚠ This pair cannot be dual-wielded"])]),
      el("div", {}, [check.reason]),
      el("div", { class: "meta" }, [
        "BG3 would not let you equip these together, so the main-hand damage above " +
        "assumes an off-hand that the game would leave empty."
      ])
    ]));
  });
}

// ---------------------------------------------------------------
// Duplicates across the party
// ---------------------------------------------------------------
function renderDuplicateWarning() {
  const box = document.getElementById("duplicate-warning");
  const usage = {};
  state.party.forEach((m) => {
    Object.values(gear(m)).forEach((itemId) => {
      if (!itemId) return;
      (usage[itemId] = usage[itemId] || []).push(m.name);
    });
  });
  const dupes = Object.entries(usage).filter(([, names]) => names.length > 1);
  if (!dupes.length) { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = false;
  box.innerHTML = "";
  box.appendChild(el("div", {}, [el("strong", {}, ["⚠ Duplicate items in the party:"])]));
  dupes.forEach(([itemId, names]) => {
    const item = itemsById[itemId];
    box.appendChild(el("div", {}, [(item ? item.name : itemId) + " → equipped on " + names.join(" and ")]));
  });
}

// ---------------------------------------------------------------
// Planner
// ---------------------------------------------------------------
function renderPlanner() {
  renderPartyBar();
  renderCharacter();
  renderDerivedStats();
  renderSkills();
  renderPendingChoices();
  renderStyles();
  renderFeats();
  renderActTabs();
  renderSlots();
  renderProficiencyWarnings();
  renderCombat();
  renderSpellProjection();
  renderBuildStats();
  renderBuildCompare();
  renderEffects();
  renderSavedBuilds();
  renderDuplicateWarning();
  document.getElementById("doll-title").textContent = "Equipment — " + activeMember().name;
  document.getElementById("build-notes").value = activeMember().notes || "";
  syncPlannerHeight();
}

