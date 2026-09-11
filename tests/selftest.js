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

  function run() {
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
        Object.entries(b.gear || {}).forEach(([slot, id]) => {
          if (!itemsById[id]) bad.push(b.id + " " + slot + " " + id);
        });
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

function runSelfTest() {
  const res = SelfTest.run();
  const s = SelfTest.summary(res);
  return { ...s, results: res };
}
