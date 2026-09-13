// Self-test harness. Open tests/index.html, or call runSelfTest() from the console
// on the main page.
//
// Why this exists: every check in here was, at some point, done by hand in a browser
// console and then forgotten. A one-off check finds a bug once; a named assertion
// finds it every time the data is regenerated. The scrapers rebuild 934 items and
// 579 spells from a wiki that changes, so "it was right when I looked" is not a
// property this project can rely on.
//
// The checks are grouped by what they protect:
//   1. Identity      — ids unique and resolvable
//   2. References    — every cross-reference points at something real
//   3. Shape         — scraped values are within the ranges the game allows
//   4. Arithmetic    — no NaN, no negatives, and the orderings that must hold
//   5. Rules         — game rules that were verified on the wiki and must not drift

const SelfTest = (() => {
  let results = [];

  // Le balisage de index.html, quand la page de test a pu le charger : certaines
  // verifications portent sur l'application elle-meme et pas sur ses donnees.
  let APP_HTML = "";
  let APP_CSS = "";

  function check(group, name, fn) {
    let pass = false, detail = "";
    try {
      const r = fn();
      if (r === true || r === undefined) { pass = true; }
      else if (typeof r === "string") { pass = false; detail = r; }
      else if (Array.isArray(r)) {
        pass = r.length === 0;
        detail = pass ? "" : r.length + " offender(s): " + r.slice(0, 5).join(" · ") +
          (r.length > 5 ? " …" : "");
      } else { pass = !!r; }
    } catch (e) {
      pass = false;
      detail = "threw: " + (e && e.message ? e.message : String(e));
    }
    results.push({ group, name, pass, detail });
  }

  // A member we can mutate freely without touching the user's saved party. The
  // field names have to match the real shape exactly — `scores`, not `abilities`,
  // and `racial1`/`racial2` rather than a bonus map — or every calculator reads
  // undefined and the suite reports app bugs that are really harness bugs.
  function scratchMember(cls, levels, subclass) {
    return {
      id: "selftest", name: "Selftest",
      race: "human", background: null,
      cls, subclass: subclass || null, level: levels,
      classes: [{ cls, levels, subclass: subclass || null }],
      scores: { str: 15, dex: 14, con: 14, int: 10, wis: 12, cha: 8 },
      racial2: "str", racial1: "dex",
      skills: [], expertise: [], feats: [], featBoosts: {}, styles: [],
      subChoices: {}, loadouts: { 1: {}, 2: {}, 3: {} }
    };
  }

  const CLASS_KEYS = Object.keys(CLASSES);
  const CLASS_LABELS = Object.values(CLASSES).map((c) => c.label);
  const SUB_NAMES = SUBCLASS_LIST.map((s) => s.name);
  const RACE_NAMES = RACES.map((r) => r.name);

  function run(appHtml, appCss) {
    APP_HTML = appHtml || "";
    APP_CSS = appCss || "";
    results = [];

    // ---- 1. Identity ------------------------------------------------------
    check("Identity", "item ids are unique", () => {
      const seen = new Set(), dup = [];
      ITEMS.forEach((i) => { if (seen.has(i.id)) dup.push(i.id); seen.add(i.id); });
      return dup;
    });
    check("Identity", "spell ids are unique", () => {
      const seen = new Set(), dup = [];
      SPELLS.forEach((s) => { if (seen.has(s.id)) dup.push(s.id); seen.add(s.id); });
      return dup;
    });
    // this one exists because a variable collision in the scraper once overwrote
    // 228 spell ids with strings like "class|Paladin"
    check("Identity", "no id contains a separator character", () =>
      [...ITEMS, ...SPELLS].filter((x) => /[|]/.test(x.id)).map((x) => x.id));
    check("Identity", "every item has a name and a type", () =>
      ITEMS.filter((i) => !i.name || !i.type).map((i) => i.id));
    check("Identity", "every spell has a name", () =>
      SPELLS.filter((s) => !s.name).map((s) => s.id));
    check("Identity", "itemsById covers every item", () =>
      ITEMS.filter((i) => itemsById[i.id] !== i).map((i) => i.id));

    // ---- 2. References ----------------------------------------------------
    check("References", "spell availability names resolve", () => {
      const bad = [];
      SPELLS.forEach((s) => (s.availability || []).forEach((a) => {
        const pool = a.kind === "class" ? CLASS_LABELS
          : a.kind === "subclass" ? SUB_NAMES
          : a.kind === "race" ? RACE_NAMES : null;
        if (!pool || !pool.includes(a.name)) bad.push(s.name + " -> " + a.kind + " " + a.name);
      }));
      return bad;
    });
    check("References", "flat class lists agree with availability", () => {
      const bad = [];
      SPELLS.forEach((s) => {
        if (!(s.availability || []).length) return;
        const fromAvail = new Set(s.availability.filter((a) => a.kind === "class").map((a) => a.name));
        (s.classes || []).forEach((c) => { if (!fromAvail.has(c)) bad.push(s.name + " -> " + c); });
      });
      return bad;
    });
    check("References", "every subclass belongs to a real class", () =>
      SUBCLASS_LIST.filter((s) => s.class && !CLASS_LABELS.includes(s.class))
        .map((s) => s.name + " -> " + s.class));
    check("References", "set members resolve to real items", () => {
      const bad = [];
      SETS.forEach((set) => (set.items || []).forEach((id) => {
        if (!itemsById[id]) bad.push(set.name + " -> " + id);
      }));
      return bad;
    });
    // Companions record a race *name* plus an optional subrace name, not an id.
    // The subrace is what the sheet must land on — an earlier bug loaded Astarion
    // with no race at all because the broad "Elf" was looked up instead of
    // "High elf", so this asserts the subrace resolves whenever there is one.
    check("References", "companion race, subrace, class and subclass resolve", () => {
      const byName = {};
      RACES.forEach((r) => { byName[r.name.toLowerCase()] = r.id; });
      const bad = [];
      COMPANIONS.forEach((c) => {
        const want = (c.subrace || c.race || "").toLowerCase();
        if (want && !byName[want]) bad.push(c.name + " race '" + (c.subrace || c.race) + "'");
        // class and subclass are display names here too, not ids
        if (c.class && !CLASS_LABELS.some((l) => l.toLowerCase() === c.class.toLowerCase())) {
          bad.push(c.name + " class '" + c.class + "'");
        }
        if (c.subclass && !SUB_NAMES.some((n) => n.toLowerCase() === c.subclass.toLowerCase())) {
          bad.push(c.name + " subclass '" + c.subclass + "'");
        }
      });
      return bad;
    });
    check("References", "every companion resolves to a subrace, not a broad race", () => {
      // "Elf" and "Half-elf" are not playable on their own in BG3 — a companion
      // stuck on one would show an empty race on the sheet
      const broad = ["elf", "half-elf", "tiefling", "drow", "halfling", "dwarf", "gnome"];
      return COMPANIONS.filter((c) => !c.subrace && broad.includes((c.race || "").toLowerCase()))
        .map((c) => c.name + " = " + c.race);
    });
    // Every pending choice is a button that opens the section settling it. A
    // section id that no longer exists makes that button do nothing, silently.
    check("References", "every pending choice points at a real section", () => {
      if (!APP_HTML) return true;   // the app's markup was not reachable from here
      const src = String(renderPendingChoices);
      const used = [...new Set([...src.matchAll(/"([a-z]+-section)"/g)].map((m) => m[1]))];
      if (!used.length) return "renderPendingChoices names no section";
      return used.filter((id) => !APP_HTML.includes('id="' + id + '"'));
    });
    // A Tiefling used to show "Darkvision" twice in one place — once as a named
    // trait, once as a derived fact in another colour. One row, one mention.
    check("Shape", "a race never lists the same chip twice", () => {
      const bad = [];
      RACE_LIST.forEach((r) => {
        const names = (r.traits || [])
          .filter((t) => t.n && !/^(Base Racial Speed|Size)$/i.test(t.n))
          .map((t) => t.n.toLowerCase());
        const derived = [r.speed + " m speed"];
        if (r.darkvision) derived.push("Darkvision");
        (r.resistances || []).forEach((x) => derived.push(x + " resistance"));
        (r.armour || []).forEach((x) => derived.push(x));
        (r.weapons || []).forEach((x) => derived.push(x));
        const shown = names.concat(derived.filter((d) => !names.includes(d.toLowerCase()))
          .map((d) => d.toLowerCase()));
        const seen = new Set();
        shown.forEach((s) => { if (seen.has(s)) bad.push(r.name + ": " + s); seen.add(s); });
      });
      return bad;
    });

    // The sheet drifted into five chip treatments, seven pill radii between 8 and
    // 20px and thirteen sizes of the same small uppercase label, none of which
    // meant anything. Three shapes now come from tokens; a member of a family that
    // sets its own size is the drift starting again.
    check("Shape", "the chip, pill and label tokens exist", () => {
      if (!APP_CSS) return true;
      return ["--chip-font", "--chip-pad", "--chip-radius",
              "--pill-font", "--pill-pad", "--pill-radius",
              "--btn-font", "--btn-font-sm", "--btn-radius",
              "--section-font", "--label-font"]
        .filter((t) => !APP_CSS.includes(t + ":"));
    });
    check("Shape", "no chip or pill sets its own size", () => {
      if (!APP_CSS) return true;
      const family = ["sub-chip", "pending-chip", "opt-grant", "bg-grant", "opt-row-badge",
                      "party-skill", "sheet-badge", "act-count", "rarity-chip", "doll-count",
                      "card-ability", "pickup-act-count", "sub-chip-count"];
      const bad = [];
      // Rule by rule: a selector naming one of these must not also pin geometry,
      // unless it is the shared rule that defines it from the tokens.
      APP_CSS.replace(/\/\*[\s\S]*?\*\//g, "").split("}").forEach((block) => {
        const [sel, body] = block.split("{");
        if (!sel || !body) return;
        if (body.includes("var(--chip-") || body.includes("var(--pill-")) return;
        // A pseudo-element is its own glyph — the arrow on a pending chip may size
        // itself. And ".bg-grant-mod" is a different thing from ".bg-grant".
        if (/::/.test(sel)) return;
        const named = family.filter((f) => new RegExp("\\." + f + "(?![\\w-])").test(sel));
        if (!named.length) return;
        ["font-size", "border-radius"].forEach((prop) => {
          if (new RegExp("(^|;|\\s)" + prop + "\\s*:").test(body)) {
            bad.push(named[0] + " sets " + prop);
          }
        });
      });
      return bad;
    });

    // A .lsv save carries an item's internal name and nothing else — never the
    // display name. "MAG_ElementalGish_ArcaneAcuity_Helmet" is all a save says
    // about a Helmet of Arcane Acuity, so without this field no item in a save
    // could ever be matched to its card. The wiki records it in the infobox.
    // They are not unique, and that is the game's doing rather than a scraping
    // fault: "+1 Breastplate" and "Breastplate" are both ARM_Breastplate_Body,
    // "Bloody Amulet" and "Dog Collar" are both ARM_Amulet. A save holding one of
    // those cannot say which it is, so any import has to show both. What must not
    // happen is that becoming common enough to make an import meaningless.
    check("Identity", "internal item names are nearly always unambiguous", () => {
      const byStats = new Map();
      ITEMS.forEach((i) => {
        if (!i.stats) return;
        if (!byStats.has(i.stats)) byStats.set(i.stats, []);
        byStats.get(i.stats).push(i.name);
      });
      const shared = [...byStats.entries()].filter(([, names]) => names.length > 1);
      return shared.length / byStats.size > 0.05
        ? [shared.length + " of " + byStats.size + " internal names are shared"]
        : [];
    });
    check("Shape", "most magical items carry their internal name", () => {
      // Common items are largely vendor stock the wiki does not give a Stats row,
      // and they are not what a build is made of. Anything rare or better is.
      const wanted = ITEMS.filter((i) => ["rare", "veryrare", "legendary"].includes(i.rarity));
      const have = wanted.filter((i) => i.stats).length;
      return have / wanted.length < 0.8
        ? [have + " of " + wanted.length + " rare-or-better items have one"]
        : [];
    });

    // "Act ?" reads as a gap in our data. For some items it is not one: the wiki
    // says they are found "throughout the game", sold by "any trader using the
    // magic melee table", or are random loot. Those belong to no act, and saying
    // so is an answer rather than a shrug — but only where the wiki says it.
    check("Shape", "an item is act-specific or explicitly not, never both", () =>
      ITEMS.filter((i) => i.act && i.anyAct).map((i) => i.name));
    check("Shape", "items marked as any-act say so in their own location text", () => {
      const said = /throughout the game|random loot|any trader|levelled magic|magic (melee|armour|ranged) table|traders? using|in chests and carried/i;
      return ITEMS.filter((i) => i.anyAct && !said.test(i.location || "")).map((i) => i.name);
    });

    // The facet filters looked broken and were not: a silent cap of 60 rows meant
    // a filter leaving 68 items changed nothing on screen. What was genuinely
    // broken was the text they search — the summary was dropped whenever an item
    // had a named ability, and "Lightning Charge" could not match the plural the
    // game actually writes.
    check("Shape", "a mechanic matches the plural the game writes", () => {
      const bad = [];
      MECHANICS.forEach((mech) => {
        const carriers = ITEMS.filter((i) => mechanicPattern(mech).test(itemSearchText(i)));
        if (!carriers.length) bad.push(mech + ": no item in the library mentions it");
      });
      return bad;
    });
    check("Shape", "an item's search text keeps its summary", () => {
      // itemStatText deliberately drops it — it adds numbers up and the summary
      // restates them. itemSearchText must not, or mechanics named only there are
      // invisible to every filter.
      const withBoth = ITEMS.find((i) => i.summary && (i.special || []).length);
      if (!withBoth) return true;
      return itemSearchText(withBoth).includes(withBoth.summary)
        ? true
        : withBoth.name + ": summary missing from its search text";
    });
    check("Shape", "the stat facet finds more than a handful", () => {
      const m = scratchMember("rogue", 10);
      const heads = ITEMS.filter((i) => i.type === "head");
      const hit = heads.filter((i) => hasFacet(itemFacets(m, i), "stat")).length;
      // It found six of ninety-four before, which read as a broken filter rather
      // than a selective one.
      return hit < heads.length * 0.15
        ? [hit + " of " + heads.length + " helmets boost anything this character uses"]
        : [];
    });

    check("Shape", "Clear leaves nothing on the pickup list", () => {
      const armour = ITEMS.find((i) => i.type === "armor");
      const m = scratchMember("fighter", 5);
      ACTS.forEach((a) => { m.loadouts[a] = { chest: armour.id }; });
      if (plannedPickups([m]).size !== 1) return "the scratch gear was not planned at all";
      clearAllActs(m);
      const left = plannedPickups([m]).size;
      return left === 0 || left + " item(s) still listed after Clear";
    });

    check("References", "every icon path is set", () =>
      [...ITEMS, ...SPELLS].filter((x) => !x.icon).map((x) => x.id));
    // GitHub Pages serves everything with max-age=600, so for ten minutes after a
    // deploy a returning visitor runs the previous js/*.js out of their own cache
    // without asking the server. That is how a change can be live and invisible at
    // once — it happened, and cost a quarter of an hour of chasing a phantom.
    // The content hash in each URL is what makes a changed file a different file.
    // Three groups of tabs shared one look and three different levels of markup:
    // the main nav and the Loadout pair announced themselves properly while the
    // act tabs, visually identical, were plain buttons. Same component, same
    // contract — a group that looks like tabs has to behave like tabs.
    check("References", "every tab group is marked up the same way", () => {
      const doc = typeof document === "undefined" ? null : document;
      if (!doc) return true;
      const groups = [...doc.querySelectorAll("nav.tabs, .act-tabs")];
      if (!groups.length) return true;
      const bad = [];
      groups.forEach((g) => {
        const tabs = [...g.querySelectorAll('button[role="tab"]')];
        if (!tabs.length) {
          bad.push((g.className || g.tagName) + ": no button carries role=tab");
          return;
        }
        if (g.getAttribute("role") !== "tablist") {
          bad.push((g.className || g.tagName) + ": container is not a tablist");
        }
        const selected = tabs.filter((t) => t.getAttribute("aria-selected") === "true");
        if (selected.length !== 1) {
          bad.push((g.className || g.tagName) + ": " + selected.length + " tabs marked selected");
        }
      });
      return bad;
    });

    check("References", "every local script and stylesheet is version-stamped", () => {
      const doc = typeof document === "undefined" ? null : document;
      if (!doc) return true;
      const local = [...doc.querySelectorAll("script[src], link[rel=stylesheet]")]
        .map((e) => e.getAttribute("src") || e.getAttribute("href"))
        .filter((u) => u && !/^https?:/i.test(u));
      // the test page loads the app with ../ paths and is not the deployed document
      if (!local.some((u) => /^(js|data)\//.test(u))) return true;
      return local.filter((u) => !/\?v=[0-9a-f]{6,}$/.test(u));
    });

    // ---- 3. Shape ---------------------------------------------------------
    check("Shape", "spell levels are 0-9", () =>
      SPELLS.filter((s) => s.level != null && (s.level < 0 || s.level > 9))
        .map((s) => s.name + "=" + s.level));
    check("Shape", "availability levels are 1-12", () => {
      const bad = [];
      SPELLS.forEach((s) => (s.availability || []).forEach((a) => {
        if (a.level != null && (a.level < 1 || a.level > 12)) bad.push(s.name + " L" + a.level);
      }));
      return bad;
    });
    check("Shape", "a 'via' qualifier is a label, not prose", () => {
      const bad = [];
      SPELLS.forEach((s) => (s.availability || []).forEach((a) => {
        if (a.via && (a.via.length > 60 || /\.\s|\bis the sum\b/.test(a.via))) {
          bad.push(s.name + ": " + a.via.slice(0, 40));
        }
      }));
      return bad;
    });
    check("Shape", "class progression covers levels 1-12 with no gaps", () => {
      const bad = [];
      Object.entries(CLASSES).forEach(([k, c]) => {
        const lv = (c.progression || []).map((p) => p.level).sort((a, b) => a - b);
        if (!lv.length) { bad.push(k + ": empty"); return; }
        for (let i = 1; i <= 12; i++) if (!lv.includes(i)) bad.push(k + ": missing L" + i);
      });
      return bad;
    });
    // The scraper used to take "the last non-empty column" of the wiki's
    // progression table as the feature list. That is the right column only for
    // the barbarian. The bard came out with no class features at any level (his
    // last column is his spell slots) and the monk with "+ 3 m / 10 ft" at level
    // 2 and "1d6" at level 3 — his movement and his martial-arts die. A feature
    // is a name; a measurement in that column means the column is wrong again.
    // Every feature on the sheet opens its description on a click — except the
    // level path, which had none to open, because the progression table gives
    // only names. The descriptions come from elsewhere on the class page, so
    // they can drift away from the names they belong to.
    check("References", "class feature descriptions name a real feature", () => {
      const bad = [];
      Object.entries(CLASSES).forEach(([k, c]) => {
        (c.progression || []).forEach((p) => {
          (p.detail || []).forEach((d) => {
            if (!(p.features || []).includes(d.n)) bad.push(k + " L" + p.level + ": " + d.n);
          });
        });
      });
      return bad;
    });
    // Some of those come from a feature's own wiki page, whose first paragraph is
    // sometimes a sidebar: "Pact Magic" once described itself as "Lists of spells
    // by level All spells Cantrips 1st level...". A description is a sentence.
    check("Shape", "class feature descriptions are prose, not navigation", () => {
      const bad = [];
      Object.entries(CLASSES).forEach(([k, c]) => {
        (c.progression || []).forEach((p) => {
          (p.detail || []).forEach((d) => {
            if (!d.d) return;
            // Terse is fine — "Choose 1 Favoured Enemy" is a real description. What
            // must never appear is a sidebar's table of contents, which is long,
            // has no verb, and reads as a run of capitalised links.
            if (/Lists of spells|Core actions Action|^(\w+ ){3,}(Cantrips|1st level)/.test(d.d)) {
              bad.push(k + " / " + d.n + ": sidebar text");
            } else if (d.d.length > 80 && !/[.!?]/.test(d.d)) {
              bad.push(k + " / " + d.n + ": " + d.d.length + " chars, no sentence end");
            }
          });
        });
      });
      return bad;
    });
    check("Shape", "most class features carry a description", () => {
      const skip = new Set(["feat", "choose a subclass", "subclass feature", "fighting style"]);
      let total = 0, described = 0;
      Object.values(CLASSES).forEach((c) => {
        (c.progression || []).forEach((p) => {
          (p.features || []).forEach((f) => {
            if (skip.has(String(f).toLowerCase())) return;
            total++;
            if ((p.detail || []).some((d) => d.n === f)) described++;
          });
        });
      });
      // 99 of 105 today; the four without are features the wiki has no page for.
      return described / total < 0.9 ? [described + " of " + total + " described"] : [];
    });

    check("Shape", "class features are names, not numbers", () => {
      const bad = [];
      Object.entries(CLASSES).forEach(([k, c]) => {
        (c.progression || []).forEach((p) => {
          (p.features || []).forEach((f) => {
            if (/^[+\-]?\s*[\d.]+\s*(m|ft|d\d+)?\s*(\/.*)?$/i.test(f)) bad.push(k + " L" + p.level + ": " + f);
          });
        });
      });
      return bad;
    });
    check("Shape", "every class gains named features before level 4", () =>
      Object.entries(CLASSES)
        .filter(([, c]) => !(c.progression || []).some((p) => p.level <= 3 && (p.features || []).length))
        .map(([k]) => k));

    // The wiki nests: the eight Lands are options of one spell feature, the six
    // fighting styles options of "Fighting Style". Read flat, Circle of the Land
    // claimed 48 features instead of 16 and the same eight terrain names appeared
    // four times over. No subclass has that many features; a count this high means
    // the nesting was lost again.
    check("Shape", "no subclass lists more than 30 top-level features", () =>
      SUBCLASS_LIST.filter((s) => (s.features || []).length > 30)
        .map((s) => s.name + ": " + s.features.length));
    check("Shape", "a subclass never repeats a feature name at one level", () => {
      const bad = [];
      SUBCLASS_LIST.forEach((s) => {
        const seen = new Set();
        (s.features || []).forEach((f) => {
          const key = f.level + "|" + f.n;
          if (seen.has(key)) bad.push(s.name + " L" + f.level + ": " + f.n);
          seen.add(key);
        });
      });
      return bad;
    });
    check("Shape", "every nested option carries a name", () =>
      SUBCLASS_LIST.flatMap((s) => (s.features || []).flatMap((f) =>
        (f.opts || []).filter((o) => !o.n).map(() => s.name + " / " + f.n))));

    check("Shape", "every weapon's damage string parses", () =>
      ITEMS.filter((i) => i.type === "weapon" && i.damage)
        .filter((i) => { const p = parseWeaponDamage(i.damage, false); return !p || !p.main || !p.main.count; })
        .map((i) => i.name));
    // The wiki writes an ability's cost as icons inside brackets, so stripping the
    // tags left 131 of 511 subclass features named "Frenzied Strike ( )" or
    // "Frenzy ( + )". Brackets holding real text are legitimate and stay.
    check("Shape", "no feature name carries an empty bracket", () => {
      const bad = [];
      SUBCLASS_LIST.forEach((s) => (s.features || []).forEach((f) => {
        if (/\(\s*[+\-,/&\s]*\)/.test(f.n || "")) bad.push(s.name + ': "' + f.n + '"');
      }));
      Object.entries(CLASSES).forEach(([k, c]) => (c.progression || []).forEach((p) =>
        (p.features || []).forEach((f) => {
          if (/\(\s*[+\-,/&\s]*\)/.test(f)) bad.push(k + ': "' + f + '"');
        })));
      return bad;
    });

    check("Shape", "every race has at least one trait", () =>
      RACES.filter((r) => !(r.traits || []).length).map((r) => r.name));
    // Dragonborn showed no bonuses at all because its ten colour subraces were
    // never scraped: the wiki keeps Draconic Ancestry, the breath weapon and the
    // resistance under each colour's section, and "Racial features" holds only
    // speed and size. Anything with speed and size and nothing else is that bug.
    check("Shape", "no race has only speed and size", () =>
      RACES.filter((r) => {
        const real = (r.traits || []).filter((t) => !/^(Base Racial Speed|Size)$/i.test(t.n));
        return real.length === 0 && r.name !== "Dragonborn";
      }).map((r) => r.name));
    check("Shape", "every dragonborn colour has a breath and a resistance", () => {
      const colours = RACES.filter((r) => /Dragonborn$/.test(r.name) && r.name !== "Dragonborn");
      if (colours.length !== 10) return "expected 10 colours, found " + colours.length;
      return colours.filter((r) =>
        !(r.resistances || []).length ||
        !(r.traits || []).some((t) => /Breath/i.test(t.n))
      ).map((r) => r.name);
    });

    check("References", "every race belongs to exactly one family", () => {
      const covered = raceFamilies().reduce((s, f) => s + raceFamilyMembers(f).length, 0);
      return covered === RACES.length ? true : covered + " of " + RACES.length + " races grouped";
    });
    // "Drow Half-Elf" is a Half-Elf, not a Drow. Matching the first family name
    // found instead of the longest trailing one files it under the wrong parent.
    check("References", "a Drow Half-Elf is filed under Half-Elf", () => {
      const r = RACES.find((x) => x.name === "Drow Half-Elf");
      if (!r) return true;
      const f = raceFamilyOf(r);
      return f === "Half-Elf" ? true : "filed under " + f;
    });
    // Choosing a family that branches leaves `race` null on purpose, waiting for
    // the ancestry — so the family field has to read from the remembered family
    // and not from `race`, or the top field snaps back to "— none —" the instant
    // you click Dragonborn, as if the click had been refused.
    check("References", "the race field reads the family, not just the race", () => {
      const src = renderRacePicker.toString();
      return /m\.raceFamily/.test(src) && /current \? raceFamilyOf\(current\)\s*:\s*\(m\.raceFamily/.test(src)
        ? true
        : "the family value does not fall back to m.raceFamily";
    });
    // Starter builds are hand-written ids pointing into scraped data, which is
    // exactly the pairing that rots silently: rename a subclass upstream and the
    // starter still "works", producing a sheet with a missing subclass nobody
    // notices. These fail loudly instead.
    check("References", "every starter build's ids resolve", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        if (!CLASSES[b.cls]) bad.push(b.id + " class " + b.cls);
        if (b.subclass && !subclassById[b.subclass]) bad.push(b.id + " subclass " + b.subclass);
        if (!raceById[b.race]) bad.push(b.id + " race " + b.race);
        if (!BACKGROUNDS[b.background]) bad.push(b.id + " background " + b.background);
        (b.feats || []).forEach((f) => { if (!FEATS[f]) bad.push(b.id + " feat " + f); });
        // The kits held a style's display name where everything else holds its id,
        // so hasStyle never matched and the Greatsword Fighter's Great Weapon
        // Fighting had never once reached its damage. An id that resolves is the
        // difference between a style being chosen and a style doing anything.
        if (b.kit && b.kit.style && !STYLE_LIST.some((s) => s.id === b.kit.style)) {
          bad.push(b.id + " style " + b.kit.style);
        }
        Object.entries(b.gear || {}).forEach(([slot, id]) => {
          if (!itemsById[id]) bad.push(b.id + " " + slot + " " + id);
        });
      });
      return bad;
    });
    check("Rules", "a starter's fighting style actually applies", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        if (!b.kit || !b.kit.style) return;
        const m = memberFromStarter(b);
        if (!styleSlots(m)) return;          // the class grants none at this level
        if (!hasStyle(m, b.kit.style)) bad.push(b.name + ": " + b.kit.style + " never took effect");
      });
      return bad;
    });
    check("References", "a starter's subclass belongs to its class", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        if (!b.subclass) return;
        const sub = subclassById[b.subclass];
        const cls = CLASSES[b.cls];
        if (sub && cls && sub.class !== cls.label) {
          bad.push(b.id + ": " + sub.name + " is a " + sub.class + ", not a " + cls.label);
        }
      });
      return bad;
    });
    // A starter that hands out something the class cannot have renders perfectly
    // and is simply wrong — the Rogue arrived with a fighting style it has no slot
    // for. Every budget the sheet enforces is checked here too.
    check("Shape", "no starter exceeds its own feat, skill or style budget", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        const m = memberFromStarter(b, "test-" + b.id);
        const s = styleSlots(m);
        if ((m.styles || []).length > s) {
          bad.push(b.id + ": " + m.styles.length + " styles, " + s + " slot(s)");
        }
        if ((m.feats || []).length > featSlots(m)) {
          bad.push(b.id + ": " + m.feats.length + " feats, " + featSlots(m) + " slot(s)");
        }
        if ((m.skills || []).length > skillPickBudget(m)) {
          bad.push(b.id + ": " + m.skills.length + " skills, " + skillPickBudget(m) + " pick(s)");
        }
      });
      return bad;
    });
    // Deriving gear from the data is only better than listing ids if what comes
    // back is actually wearable — a mis-specified category would silently equip
    // nothing and drop the starter back to AC 11.
    check("Shape", "every starter is armoured and armed without a proficiency problem", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        const m = memberFromStarter(b, "test-" + b.id);
        const gear = m.loadouts[1] || {};
        if (!gear.chest) bad.push(b.id + ": no armour");
        if ((b.kit || {}).weapon && !gear.weapon1) bad.push(b.id + ": no weapon");
        Object.values(gear).forEach((id) => {
          const it = itemsById[id];
          if (!it) return;
          const issue = proficiencyIssue(m, it);
          if (issue) bad.push(b.id + ": " + it.name + " — " + issue);
          // A "starter" carrying Helldusk Armour is not a starter. The first pass
          // at these put endgame gear on a level 12 sheet, which is the opposite
          // of what the word means.
          if (it.act !== 1) bad.push(b.id + ": " + it.name + " is act " + it.act);
          if (it.rarity !== "common" && it.rarity !== "uncommon") {
            bad.push(b.id + ": " + it.name + " is " + it.rarity);
          }
        });
      });
      return bad;
    });

    check("Shape", "every starter build produces a legal point-buy sheet", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        const m = memberFromStarter(b, "test-" + b.id);
        const spent = spentPoints(m.scores);
        if (spent > POINT_POOL) bad.push(b.id + " spends " + spent + " of " + POINT_POOL);
        Object.entries(m.scores).forEach(([k, v]) => {
          if (v < ABILITY_MIN || v > ABILITY_MAX) bad.push(b.id + " " + k + "=" + v);
        });
        if (totalLevel(m) > MAX_LEVEL) bad.push(b.id + " is level " + totalLevel(m));
      });
      return bad;
    });
    check("Arithmetic", "every starter build renders numbers without NaN", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        const m = memberFromStarter(b, "test-" + b.id);
        const d = derivedStats(m);
        ["ac", "hp", "initiative", "prof"].forEach((f) => {
          if (!Number.isFinite(d[f])) bad.push(b.id + "." + f + "=" + d[f]);
        });
        const t = turnSummary(m, { targetAc: 15, ground: 0 });
        if (t && !Number.isFinite(t.total)) bad.push(b.id + ".dpr=" + t.total);
      });
      return bad;
    });
    // A starter that ships a weapon in each hand must ship a pair the game would
    // let you hold, or it demonstrates a turn nobody can take.
    check("Rules", "a starter's two weapons may legally be dual-wielded", () => {
      const bad = [];
      STARTER_BUILDS.forEach((b) => {
        const main = itemsById[(b.gear || {}).weapon1];
        const off = itemsById[(b.gear || {}).weapon2];
        if (!main || !off) return;
        const m = memberFromStarter(b, "test-" + b.id);
        const check2 = dualWieldCheck(m, main, off);
        if (!check2.ok) bad.push(b.id + ": " + check2.reason);
      });
      return bad;
    });

    check("References", "Duergar is filed under Dwarf", () => {
      const r = RACES.find((x) => x.id === "duergar");
      if (!r) return true;
      const f = raceFamilyOf(r);
      return f === "Dwarf" ? true : "filed under " + f;
    });

    // ---- 4. Arithmetic ----------------------------------------------------
    const weapon = ITEMS.find((i) => i.type === "weapon" && i.damage &&
      (i.details || []).some((d) => /Two-Handed/i.test(d)));

    check("Arithmetic", "no NaN in any class's turn summary", () => {
      const bad = [];
      CLASS_KEYS.forEach((k) => {
        const m = scratchMember(k, 12);
        m.loadouts[1].weapon1 = weapon.id;
        const t = turnSummary(m, { targetAc: 15, ground: 0 });
        if (!t) { bad.push(k + ": null"); return; }
        ["total"].forEach((f) => { if (!Number.isFinite(t[f])) bad.push(k + "." + f); });
        ["dpr", "hitChance", "avgDamage", "attackBonus", "perAttack"].forEach((f) => {
          if (!Number.isFinite(t.main[f])) bad.push(k + ".main." + f + "=" + t.main[f]);
        });
      });
      return bad;
    });
    check("Arithmetic", "attackOdds survives a missing AC", () => {
      const o = attackOdds(5, undefined, 20, 0, false);
      return Number.isFinite(o.hit) && Number.isFinite(o.crit) && Number.isFinite(o.miss);
    });
    check("Arithmetic", "odds always sum to 1", () => {
      const bad = [];
      [-1, 0, 1].forEach((roll) => {
        for (let ac = 5; ac <= 25; ac += 5) {
          for (let b = -2; b <= 15; b += 3) {
            const o = attackOdds(b, ac, 20, roll, false);
            const sum = o.hit + o.crit + o.miss;
            if (Math.abs(sum - 1) > 1e-9) bad.push("roll" + roll + " ac" + ac + " +" + b + " = " + sum);
          }
        }
      });
      return bad;
    });
    check("Arithmetic", "hit chance stays within 0-1", () => {
      const bad = [];
      [-1, 0, 1].forEach((roll) => {
        for (let ac = 1; ac <= 30; ac++) {
          const o = attackOdds(5, ac, 20, roll, false);
          [o.hit, o.crit, o.miss].forEach((v) => { if (v < -1e-9 || v > 1 + 1e-9) bad.push("ac" + ac + "=" + v); });
        }
      });
      return bad;
    });
    check("Arithmetic", "Advantage >= straight >= Disadvantage", () => {
      const bad = [];
      CLASS_KEYS.forEach((k) => {
        const m = scratchMember(k, 12);
        m.loadouts[1].weapon1 = weapon.id;
        const o = { targetAc: 15, ground: 0 };
        const adv = turnSummary(m, { ...o, advantage: true }).total;
        const str = turnSummary(m, o).total;
        const dis = turnSummary(m, { ...o, disadvantage: true }).total;
        if (!(adv >= str - 1e-9 && str >= dis - 1e-9)) bad.push(k + ": " + [dis, str, adv].join(" / "));
      });
      return bad;
    });
    check("Arithmetic", "attacks per action is 1-3", () =>
      CLASS_KEYS.map((k) => ({ k, n: attacksPerAction(scratchMember(k, 12)) }))
        .filter((x) => x.n < 1 || x.n > 3).map((x) => x.k + "=" + x.n));
    check("Arithmetic", "damage never goes negative", () => {
      const bad = [];
      CLASS_KEYS.forEach((k) => {
        const m = scratchMember(k, 12);
        m.loadouts[1].weapon1 = weapon.id;
        const t = turnSummary(m, { targetAc: 30, ground: -2 });
        if (t && (t.total < 0 || t.main.avgDamage < 0)) bad.push(k);
      });
      return bad;
    });
    check("Arithmetic", "no NaN in any spell projection", () => {
      const bad = [];
      const m = scratchMember("wizard", 12);
      SPELLS.filter((s) => s.damage || s.damageMax != null).forEach((s) => {
        const p = spellProjection(m, s, { targetAc: 15, targetSave: 2, slotLevel: s.level });
        if (!p) return;
        if (p.chance != null && !Number.isFinite(p.chance)) bad.push(s.name + ".chance");
        if (p.expected != null && !Number.isFinite(p.expected)) bad.push(s.name + ".expected");
        if (p.avg != null && !Number.isFinite(p.avg)) bad.push(s.name + ".avg");
      });
      return bad;
    });

    // ---- 5. Rules (each verified on bg3.wiki) -----------------------------
    check("Rules", "Two-Handed weapons can never be dual-wielded", () => {
      const th = ITEMS.filter((i) => i.type === "weapon" && i.damage &&
        (i.details || []).some((d) => /Two-Handed/i.test(d))).slice(0, 8);
      const m = scratchMember("fighter", 12);
      m.feats = ["dualWielder"];
      return th.filter((i) => dualWieldCheck(m, i, th[0]).ok).map((i) => i.name);
    });
    check("Rules", "two Light weapons dual-wield without the feat", () => {
      const light = ITEMS.filter((i) => i.type === "weapon" && i.damage &&
        (i.details || []).some((d) => /\bLight\b/i.test(d) && !/Crossbow/i.test(d))).slice(0, 2);
      const m = scratchMember("fighter", 12);
      return dualWieldCheck(m, light[0], light[1]).ok || "blocked a legal Light pair";
    });
    check("Rules", "non-Light pairs need Dual Wielder", () => {
      const oneH = ITEMS.filter((i) => i.type === "weapon" && i.damage &&
        !(i.details || []).some((d) => /\bLight\b|Two-Handed/i.test(d))).slice(0, 2);
      const plain = scratchMember("fighter", 12);
      const feat = scratchMember("fighter", 12); feat.feats = ["dualWielder"];
      if (dualWieldCheck(plain, oneH[0], oneH[1]).ok) return "allowed without the feat";
      if (!dualWieldCheck(feat, oneH[0], oneH[1]).ok) return "blocked even with the feat";
      return true;
    });
    check("Rules", "Sneak Attack is withdrawn at Disadvantage", () => {
      const finesse = ITEMS.find((i) => i.type === "weapon" && i.damage &&
        (i.details || []).some((d) => /Finesse/i.test(d)));
      const m = scratchMember("rogue", 12);
      m.loadouts[1].weapon1 = finesse.id;
      const o = { targetAc: 15, ground: 0 };
      const normal = turnVariants(m, o).rows.some((r) => /Sneak Attack/.test(r.label));
      const dis = turnVariants(m, { ...o, disadvantage: true }).rows.some((r) => /Sneak Attack/.test(r.label));
      if (!normal) return "not offered even on a straight roll";
      if (dis) return "still offered at Disadvantage";
      return true;
    });
    // A Paladin 11's every melee swing carries an extra 1d8 Radiant and nothing in
    // the tool knew it: "Melee weapon attacks deal an additional 1d8 Radiant
    // damage" (bg3.wiki/wiki/Improved_Divine_Smite). It is a passive, so it needs
    // no toggle — which is exactly why its absence was invisible.
    check("Rules", "Improved Divine Smite rides every melee hit from Paladin 11", () => {
      const melee = ITEMS.find((i) => i.type === "weapon" && i.damage && !isRangedWeapon(i));
      const at = (lv) => {
        const m = scratchMember("paladin", lv);
        m.loadouts[1].weapon1 = melee.id;
        return weaponAttack(m, melee, { targetAc: 15, slotKey: "weapon1" });
      };
      if (at(10).impSmiteDice !== 0) return "granted before level 11";
      if (at(11).impSmiteDice !== 1) return "missing at level 11";
      // and it must not reach a bow
      const bow = ITEMS.find((i) => i.type === "weapon" && i.damage && isRangedWeapon(i));
      if (bow) {
        const m = scratchMember("paladin", 11);
        m.loadouts[1].ranged1 = bow.id;
        if (weaponAttack(m, bow, { targetAc: 15, slotKey: "ranged1" }).impSmiteDice !== 0) {
          return "applied to a ranged weapon";
        }
      }
      return true;
    });
    // "Brutal Critical and Savage Attacks add an extra damage die to the damage of
    // the attack, i.e. an attack dealing 1d10 will critically deal 2d10 + 1d10"
    // (bg3.wiki/wiki/Critical_Hit). One die, whatever the weapon's dice count — the
    // Brutal Critical page is explicit that a greatsword's 2d6 gains a single d6.
    check("Rules", "a crit die is one die of the weapon's size, not one per die", () => {
      const multi = ITEMS.find((i) => {
        if (i.type !== "weapon" || !i.damage || isRangedWeapon(i)) return false;
        const p = parseWeaponDamage(i.damage, true);
        return p && p.main && p.main.count > 1;
      });
      if (!multi) return true;
      const m = scratchMember("barbarian", 9);
      m.loadouts[1].weapon1 = multi.id;
      const a = weaponAttack(m, multi, { targetAc: 15, slotKey: "weapon1", twoHanded: true });
      if (a.critDice !== 1) return "critDice = " + a.critDice;
      const oneDie = (a.main.size + 1) / 2;
      return Math.abs(a.critBonusAvg - oneDie) < 1e-9
        ? true
        : "added " + a.critBonusAvg.toFixed(2) + " for a d" + a.main.size + ", expected " + oneDie;
    });
    // Brutal Critical's notes: "only applies to main hand melee weapon attacks or
    // unarmed melee attacks". Savage Attacks "only applies to melee weapon attacks
    // (main hand or offhand)". So a half-orc barbarian has two dice in the main
    // hand and one in the off-hand.
    check("Rules", "Brutal Critical skips the off-hand, Savage Attacks does not", () => {
      const light = ITEMS.filter((i) => i.type === "weapon" && i.damage && !isRangedWeapon(i) &&
        (i.details || []).some((d) => /^Light$/i.test(d)));
      if (!light.length) return true;
      const m = scratchMember("barbarian", 9);
      m.race = "half-orc";
      m.loadouts[1].weapon1 = light[0].id;
      m.loadouts[1].weapon2 = light[0].id;
      const t = turnSummary(m, { targetAc: 15 });
      if (!t || !t.off) return "no off-hand attack to test";
      if (t.main.critDice !== 2) return "main hand has " + t.main.critDice + " extra crit dice, expected 2";
      if (t.off.critDice !== 1) return "off-hand has " + t.off.critDice + ", expected 1";
      return true;
    });
    // The wiki's own Rage Damage column: +2 through level 8, +3 from 9. And Rage
    // Impeded: "Until the armour is removed, Raging won't grant extra damage".
    check("Rules", "Rage is +2 then +3, and heavy armour cancels it", () => {
      const light = scratchMember("barbarian", 8);
      if (rageDamage(light) !== 2) return "level 8 gives " + rageDamage(light);
      const nine = scratchMember("barbarian", 9);
      if (rageDamage(nine) !== 3) return "level 9 gives " + rageDamage(nine);
      const heavy = ITEMS.find((i) => i.type === "armor" && armourCategory(i) === "heavy");
      if (heavy) {
        const armoured = scratchMember("barbarian", 9);
        armoured.loadouts[1].chest = heavy.id;
        if (rageDamage(armoured) !== 0) return "heavy armour still grants " + rageDamage(armoured);
      }
      const bard = scratchMember("bard", 12);
      return rageDamage(bard) === 0 ? true : "a bard rages";
    });

    // The breakdown on the card is the only figure a player can check against the
    // game — hit something once and compare the combat log. So the lines printed
    // and the totals beside them have to be the same arithmetic, not two
    // calculations that happen to agree today.
    check("Arithmetic", "the damage breakdown sums to its own totals", () => {
      const bad = [];
      const cases = [
        ["barbarian", 9, "half-orc", ["savageAttacker"]],
        ["paladin", 11, "human", []],
        ["fighter", 11, "human", ["greatWeaponMaster"]],
        ["rogue", 12, "lightfoot-halfling", []]
      ];
      const weapons = ITEMS.filter((i) => i.type === "weapon" && i.damage).slice(0, 40);
      cases.forEach(([cls, lv, race, feats]) => {
        weapons.forEach((it) => {
          const m = scratchMember(cls, lv);
          m.race = race;
          m.feats = feats;
          m.loadouts[1].weapon1 = it.id;
          const r = weaponAttack(m, it, {
            targetAc: 15, slotKey: "weapon1", twoHanded: true, rage: true
          });
          if (!r.main || !r.parts.length) return;
          const hit = r.parts.filter((p) => !p.critOnly);
          const min = hit.reduce((s, p) => s + (p.count + p.flat) * p.mult, 0);
          const max = hit.reduce((s, p) => s + (p.count * p.size + p.flat) * p.mult, 0);
          if (Math.abs(min - r.minDamage) > 1e-9) bad.push(cls + "/" + it.name + " min");
          if (Math.abs(max - r.maxDamage) > 1e-9) bad.push(cls + "/" + it.name + " max");
          // a hit can never roll below its span or above it
          if (r.avgDamage < min - 1e-9 || r.avgDamage > max + 1e-9) {
            bad.push(cls + "/" + it.name + " avg " + r.avgDamage.toFixed(2) +
              " outside " + min + "-" + max);
          }
          // a critical is never worse than a hit, and its span contains its average
          if (r.critMin < r.minDamage - 1e-9) bad.push(cls + "/" + it.name + " crit min below hit min");
          const critAvg = r.avgDamage + r.critExtra;
          if (critAvg < r.critMin - 1e-9 || critAvg > r.critMax + 1e-9) {
            bad.push(cls + "/" + it.name + " crit avg " + critAvg.toFixed(2) +
              " outside " + r.critMin + "-" + r.critMax);
          }
        });
      });
      return [...new Set(bad)];
    });
    // Every line has to name where it came from, or the breakdown stops being
    // something you can reconcile against the game and becomes a list of numbers.
    check("Shape", "every damage line is labelled and typed", () => {
      const bad = [];
      const weapons = ITEMS.filter((i) => i.type === "weapon" && i.damage).slice(0, 60);
      weapons.forEach((it) => {
        const m = scratchMember("paladin", 11);
        m.loadouts[1].weapon1 = it.id;
        const r = weaponAttack(m, it, { targetAc: 15, slotKey: "weapon1", twoHanded: true });
        (r.parts || []).forEach((p) => {
          if (!p.label) bad.push(it.name + ": unlabelled line");
          if (!p.count && !p.flat) bad.push(it.name + ": empty line " + p.label);
        });
      });
      return [...new Set(bad)];
    });

    // A spell carrying dice is not automatically a spell that deals them on cast.
    // Cure Wounds was projecting damage, Hex was counted as a strike of its own
    // when it only adds to yours, Spiritual Weapon was a spell rather than the
    // weapon it summons. Anything with no attack roll and no save has to say which
    // of those it is, or go back to claiming it always hits.
    check("Shape", "a spell with no roll says what kind it is", () => {
      const kinds = ["heal", "rider", "weapon", "zone"];
      const loose = SPELLS.filter((s) =>
        s.damage && !s.attackRoll && !s.save && !s.kind);
      // The genuinely automatic ones are few — Magic Missile and its kin. If this
      // grows, the classification has stopped keeping up with the data.
      return loose.length > 12
        ? [loose.length + " unclassified: " + loose.slice(0, 5).map((s) => s.name).join(", ")]
        : [];
    });
    check("Shape", "no healing spell is projected as damage", () => {
      const m = scratchMember("cleric", 12);
      return SPELLS.filter((s) => s.kind === "heal")
        .filter((s) => {
          const p = spellProjection(m, s, { targetAc: 15, targetSave: 2, slotLevel: s.level });
          return p && (p.expected != null || /damage/i.test(p.mode));
        })
        .map((s) => s.name);
    });
    // The save is written two ways on the wiki — "DEX Save", and the long form
    // inside the damage line's bracket. Reading only the short one left Hellish
    // Rebuke and Cloudkill claiming to hit automatically.
    check("Rules", "a spell that allows a save records which one", () => {
      const m = scratchMember("warlock", 12);
      const known = { "Hellish Rebuke": "DEX", "Cloudkill": "CON" };
      const bad = [];
      Object.entries(known).forEach(([name, save]) => {
        const s = SPELLS.find((x) => x.name === name);
        if (!s) return;
        if (s.save !== save) bad.push(name + " reads " + (s.save || "no save") + ", expected " + save);
        const p = spellProjection(m, s, { targetAc: 15, targetSave: 2, slotLevel: s.level });
        if (p && p.chance === 1) bad.push(name + " still projects as an automatic hit");
      });
      return bad;
    });

    // Two items add dice to every weapon attack with no condition attached, and
    // their damage was missing from every figure because item abilities are listed
    // as uncounted rather than read. Anything that is counted must also stop being
    // listed as left out.
    check("Rules", "gear that adds dice to every attack is counted", () => {
      const glove = ITEMS.find((i) => (i.special || [])
        .some((sp) => /^\s*Your weapon attacks deal an additional \d+d\d+/.test(sp.d || "")));
      if (!glove) return true;
      const weapon = ITEMS.find((i) => i.type === "weapon" && i.damage && !isRangedWeapon(i));
      const m = scratchMember("fighter", 6);
      m.loadouts[1].weapon1 = weapon.id;
      const before = weaponAttack(m, weapon, { targetAc: 15, slotKey: "weapon1", twoHanded: true });
      m.loadouts[1].gloves = glove.id;
      const after = weaponAttack(m, weapon, { targetAc: 15, slotKey: "weapon1", twoHanded: true });
      if (!(after.dpr > before.dpr)) return glove.name + " changes nothing";
      if (after.parts.length !== before.parts.length + 1) {
        return "the breakdown gained " + (after.parts.length - before.parts.length) + " lines, expected 1";
      }
      return true;
    });

    // Checked against bg3.wiki's "Overview of abilities and skills", which groups
    // them the same way: Strength carries Athletics alone, Dexterity three,
    // Constitution none at all, and the skill list is grouped to match.
    check("Rules", "every skill sits under the ability the wiki gives it", () => {
      const wiki = {
        str: ["Athletics"],
        dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
        con: [],
        int: ["Arcana", "History", "Investigation", "Nature", "Religion"],
        wis: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
        cha: ["Deception", "Intimidation", "Performance", "Persuasion"]
      };
      const bad = [];
      Object.entries(wiki).forEach(([ability, names]) => {
        const ours = SKILLS.filter((s) => s.ability === ability).map((s) => s.label).sort();
        const want = [...names].sort();
        if (ours.join("|") !== want.join("|")) {
          bad.push(ability + ": [" + ours.join(", ") + "] vs wiki [" + want.join(", ") + "]");
        }
      });
      const total = Object.values(wiki).reduce((n, a) => n + a.length, 0);
      if (SKILLS.length !== total) bad.push(SKILLS.length + " skills, wiki lists " + total);
      return bad;
    });

    // Resistance is "halved (rounded down)" per hit. That floor is not something
    // an average has to give up on: E[floor(X/2)] = (E[X] − P(X odd)) / 2, and
    // P(X odd) follows from the dice's parity bias. Checked here against the exact
    // distribution rather than against the formula that produced it.
    check("Arithmetic", "resisted damage carries the game's rounding", () => {
      const weapon = ITEMS.find((i) => {
        if (i.type !== "weapon" || !i.damage || isRangedWeapon(i)) return false;
        const p = parseWeaponDamage(i.damage, true);
        return p && p.main && p.main.count && !p.riders.length;
      });
      if (!weapon) return true;
      const m = scratchMember("fighter", 6);
      m.loadouts[1].weapon1 = weapon.id;
      const opts = { targetAc: 15, slotKey: "weapon1", twoHanded: true };
      const full = weaponAttack(m, weapon, opts);
      const half = weaponAttack(m, weapon,
        { ...opts, defence: { type: full.main.type, mult: 0.5 } });

      // the exact distribution of one hit, by convolution
      const flat = full.parts.reduce((s, p) => s + p.flat, 0);
      const dicePart = full.parts.find((p) => p.count);
      let dist = { 0: 1 };
      for (let d = 0; d < dicePart.count; d++) {
        const next = {};
        Object.entries(dist).forEach(([v, pr]) => {
          for (let f = 1; f <= dicePart.size; f++) {
            const k = +v + f;
            next[k] = (next[k] || 0) + pr / dicePart.size;
          }
        });
        dist = next;
      }
      let exact = 0;
      Object.entries(dist).forEach(([v, pr]) => { exact += pr * Math.floor((+v + flat) / 2); });
      return Math.abs(half.avgDamage - exact) < 1e-9
        ? true
        : "tool " + half.avgDamage.toFixed(4) + ", exact " + exact.toFixed(4);
    });

    // A weapon attack is one damage source, so every rider applies once and the
    // wiki's "damage riders treated as damage sources" cannot change these
    // figures. That holds only while the breakdown stays one source deep: if a
    // second source ever joined it, riders would need to apply twice and none of
    // this arithmetic would know.
    check("Shape", "a weapon attack computes exactly one damage source", () => {
      const bad = [];
      const weapons = ITEMS.filter((i) => i.type === "weapon" && i.damage).slice(0, 60);
      weapons.forEach((it) => {
        const m = scratchMember("fighter", 6);
        m.loadouts[1].weapon1 = it.id;
        const r = weaponAttack(m, it, { targetAc: 15, slotKey: "weapon1", twoHanded: true });
        if (!r.main) return;
        // the weapon's own line is the source; everything else rides it
        const sources = (r.parts || []).filter((p) => p.label === it.name);
        if (sources.length !== 1) bad.push(it.name + ": " + sources.length + " source lines");
      });
      return bad;
    });

    // The combined row used to be called "All of the above" while the rows above
    // it included both Advantage and Disadvantage — and no turn is both. A reader
    // who noticed that was right to distrust the figure. It names its parts now,
    // and must never name the roll state it excludes.
    check("Rules", "the combined turn does not claim both roll states", () => {
      const finesse = ITEMS.find((i) => i.type === "weapon" && i.damage &&
        (i.details || []).some((d) => /Finesse/i.test(d)));
      if (!finesse) return true;
      const m = scratchMember("rogue", 10);
      m.loadouts[1].weapon1 = finesse.id;
      const v = turnVariants(m, { targetAc: 15 });
      if (!v) return "no turn to read";
      const combined = v.rows.find((r) => r.combined);
      if (!combined) return true;               // nothing to combine on this build
      if (/disadvantage/i.test(combined.label)) return "names Disadvantage: " + combined.label;
      if (/all of the above/i.test(combined.label)) return "still says 'all of the above'";
      // and it has to beat every single rider it claims to stack
      const singles = v.rows.filter((r) => !r.rollState && !r.combined);
      const weaker = singles.filter((r) => r.total > combined.total + 1e-9);
      return weaker.length
        ? "lower than " + weaker.map((r) => r.label).join(", ")
        : true;
    });

    check("Rules", "Action Surge is Fighter-only", () => {
      const wrong = CLASS_KEYS.filter((k) => hasClassFeature(scratchMember(k, 12), "Action Surge"));
      return wrong.length === 1 && wrong[0] === "fighter" ? true : "found on: " + wrong.join(", ");
    });
    check("Rules", "Haste loses Extra Attack only in Honour mode", () => {
      const m = scratchMember("fighter", 12);
      m.loadouts[1].weapon1 = weapon.id;
      const o = { targetAc: 15, ground: 0 };
      const norm = turnVariants(m, o).rows.find((r) => /^Hasted/.test(r.label));
      const hon = turnVariants(m, { ...o, honour: true }).rows.find((r) => /^Hasted/.test(r.label));
      if (!norm || !hon) return "no Hasted row";
      return hon.total < norm.total ? true : "Honour mode is not lower: " + hon.total + " vs " + norm.total;
    });
    check("Rules", "a spell is gated on the level in that class", () => {
      const fb = SPELLS.find((s) => s.name === "Fireball");
      if (!fb) return "Fireball missing";
      if (canCast(scratchMember("wizard", 4), fb)) return "offered to Wizard 4";
      if (!canCast(scratchMember("wizard", 5), fb)) return "withheld from Wizard 5";
      return true;
    });
    // Wet is the mechanic BG3 combos are built on, and the easy version of it is
    // wrong. "Vulnerable to Lightning and Cold" is not a flat doubling: the page
    // adds that a target already resistant to those has "their resistances negated
    // instead of becoming vulnerable". Getting that backwards would overstate a
    // lightning build against precisely the enemies it exists to beat.
    check("Rules", "Wet halves Fire and doubles Lightning and Cold", () => {
      const saved = conditionState.wet;
      conditionState.wet = 1;
      const d = { type: "", mult: 1, wet: true };
      const got = ["Fire", "Lightning", "Cold", "Slashing"].map((t) => t + "=" + defenceMult(d, t));
      conditionState.wet = saved;
      const want = ["Fire=0.5", "Lightning=2", "Cold=2", "Slashing=1"];
      return got.join(",") === want.join(",") ? true : got.join(", ");
    });
    check("Rules", "Wet negates an existing resistance rather than doubling", () => {
      const d = { type: "Lightning", mult: 0.5, wet: true };
      const v = defenceMult(d, "Lightning");
      return v === 1 ? true : "resistant + Wet gave x" + v + ", expected x1";
    });
    check("Rules", "Wet does not break through immunity", () => {
      const d = { type: "Cold", mult: 0, wet: true };
      const v = defenceMult(d, "Cold");
      return v === 0 ? true : "immune + Wet gave x" + v;
    });

    // Opening a picker used to scroll the character panel ~118px, sliding the
    // field out from under the cursor mid-click. The cause was focus(), which
    // scrolls its element into view by default and walks every scrollable
    // ancestor doing it. Both guards below are cheap and catch the regression in
    // source rather than needing the DOM.
    check("Rules", "the picker takes focus without scrolling the page", () => {
      const src = optionPicker.toString();
      if (!/list\.focus\(/.test(src)) return true;
      return /list\.focus\(\s*\{[^}]*preventScroll\s*:\s*true/.test(src)
        ? true : "list.focus() is called without preventScroll";
    });
    // Choosing an option rebuilt the whole sheet synchronously, inside the click
    // that was still propagating. The row vanished mid-dispatch and the freshly
    // rendered toggle caught the same click, re-opening the menu you had just
    // chosen from — so picking Dragonborn left the list hanging open over the
    // result. The re-render has to wait for the event to finish.
    check("Rules", "selecting an option does not re-render mid-event", () => {
      const src = optionPicker.toString();
      if (!/opts\.onSelect/.test(src)) return "onSelect is not called at all";
      return /setTimeout\(\s*\(\)\s*=>\s*opts\.onSelect/.test(src)
        ? true
        : "onSelect is called synchronously from the click handler";
    });
    check("Rules", "row scrolling stays inside the list", () => {
      const src = optionPicker.toString();
      return /scrollIntoView/.test(src)
        ? "a row still uses scrollIntoView, which scrolls ancestors too"
        : true;
    });

    // The wiki's progression table is read cell by cell, so a row whose only entry
    // is a die arrives as a bare "1d6" — meaningless on its own line. The column
    // headers name them: "Sneak Attack Damage" for the rogue, "Martial Arts" for
    // the monk. Verified against those tables; both numbers were right, only the
    // labels were missing. This fails if a third class starts doing the same.
    check("Shape", "bare dice features only come from classes we label", () => {
      const labelled = ["rogue", "monk"];
      const bad = [];
      Object.entries(CLASSES).forEach(([k, c]) => (c.progression || []).forEach((p) =>
        (p.features || []).forEach((f) => {
          if (/^\d+d\d+$/.test(String(f).trim()) && !labelled.includes(k)) {
            bad.push(k + " L" + p.level + ' "' + f + '"');
          }
        })));
      return bad;
    });

    check("Rules", "binary conditions have max 1, stacking ones more", () => {
      // Momentum is deliberately absent: "Movement Speed increased by 1.5 m per
      // remaining duration" touches nothing this tool computes, and a condition
      // that changes no number is noise in a list meant to be read.
      const expect = { acuity: 10, bless: 1, charges: 5, reverb: 5, bane: 1,
        restrained: 1, prone: 1, wet: 1, bleeding: 1, burning: 1, orb: 10 };
      return CONDITIONS.filter((c) => expect[c.key] !== c.max)
        .map((c) => c.key + "=" + c.max + " (expected " + expect[c.key] + ")");
    });
    check("Rules", "saving throws do not auto-succeed on a 20", () => {
      // BG3 has no natural-20 auto-success on saves, so a big enough bonus means
      // the target never fails and expected damage is exactly the half-on-save part
      const m = scratchMember("wizard", 12);
      const s = SPELLS.find((x) => x.save && x.damage && x.halfOnSave);
      if (!s) return true;
      const p = spellProjection(m, s, { targetAc: 15, targetSave: 99, slotLevel: s.level });
      return p && Math.abs(p.chance) < 1e-9 ? true : "target still fails sometimes";
    });

    return results;
  }

  function summary(res) {
    const failed = res.filter((r) => !r.pass);
    return { total: res.length, passed: res.length - failed.length, failed: failed.length, failures: failed };
  }

  return { run, summary };
})();

function runSelfTest(appHtml, appCss) {
  const res = SelfTest.run(appHtml, appCss);
  const s = SelfTest.summary(res);
  return { ...s, results: res };
}
