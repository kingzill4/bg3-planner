# BG3 Build Planner

Theorycrafting tool for Baldur's Gate 3: a complete item database plus a gear planner for a party
of four, built around an equipment doll — every number checked against bg3.wiki rather than
recalled.

Code is MIT ([LICENSE](LICENSE)). Game data and art come from [bg3.wiki](https://bg3.wiki) under
CC BY-NC-SA 4.0 and are reshared under the same terms — see [NOTICE.md](NOTICE.md). Unofficial fan
content, free to use, not affiliated with Larian Studios or Wizards of the Coast.

## Running it

Just open `index.html` in a browser. No install, no server, no dependencies (no Node, no Python).
The JavaScript is split across `js/*.js` loaded as **classic scripts**, exactly like the generated
data files — not ES modules, which browsers block over `file://` and which would have forced you
to always run a server just to open the page.

Serving it over HTTP is recommended — the page background is a CSS `background-image`, and
browsers refuse to paint one that is served with the wrong MIME type (which is what `file://`
and a naive static server both do):

```bash
pwsh -File scripts/serve.ps1
```

then open http://localhost:8791

## Features

- **Build Planner** — a paper doll with the 12 real BG3 slots (head, cloak, chest, gloves,
  boots, amulet, 2 rings, melee main/off-hand, ranged main/off-hand). An origin companion's
  portrait sits at its centre with their AC and hit points beneath; empty slots step back so
  the eye lands on what is equipped, and filled ones carry their rarity colour and the act
  the item drops in. Click any slot to pick from the compatible items only — searchable by name
  *or* effect, filterable by act and minimum rarity, and narrowable with four facets: usable by
  this character, continues a synergy already on the sheet, boosts a stat this character uses,
  and not already taken by someone else in the party. Each row says which of those apply, so
  a suggestion is always something the player can check rather than a score to trust.
- **Combat tiles** read To hit / Hit chance / **Per attack** / Damage per turn. "Per attack" is
  the expected damage of one attack including its critical, so the turn total is visibly that
  figure times the number of attacks plus the once-per-turn riders. It replaced an "Avg damage"
  tile that showed one normal hit before criticals, Extra Attack and riders — a level 11 Fighter
  read 13.0 there while actually dealing 32.3.
- **Full stat blocks, no wiki trip needed** — damage rolls (including 1H/2H for versatile weapons,
  colour-coded by damage type), Armour Class, special abilities with their descriptions, and
  property chips. Shown inline in the slot dropdown as you browse, in the equipped-gear panel,
  on library cards, and in full in the item detail view.
- **Loadout** — one block under the paper doll, with two views of the same gear. *Totals* parses
  equipped items for numeric bonuses (AC, attack rolls, spell save DC, saving throws, initiative)
  and, more usefully for BG3, surfaces **stacking synergies**: mechanics carried by two or more
  pieces (Radiating Orb, Reverberation, Lightning Charges, Arcane Acuity…) plus the sets they come
  from. *By slot* is the same gear itemised, each piece with its full stat block. These were two
  panels in two columns answering one question; merging them freed a column and removed a second
  scroll region.
- **Origin companions** — pick Astarion, Shadowheart, Gale, Lae'zel, Wyll, Karlach, Halsin,
  Jaheira, Minsc or Minthara and they load with the ability scores the game ships them with.
  their shipped subrace, subclass, background and ability scores. "Respec" switches to the
  27-point buy exactly like visiting Withers, and **Reset to origin** rebuilds the whole sheet
  from the shipped baseline however far you have drifted from it — gear is kept.
- **Character sheet** — race with its named traits listed (Halfling Luck, Fey Ancestry, Dwarven
  Resilience) alongside the mechanical chips, class and subclass (all 58, including the twelve
  added in Patch 8) with their features by level, multiclassing up to three classes, level,
  background, and skills with expertise. **Skill picks follow the class's own list**: a Fighter
  chooses 2 of the 8 the wiki names, a Wizard 2 of 6, a Bard 3 of all 18. Multiclassing adds
  only what the wiki's multiclass table grants — one skill for Bard, Ranger and Rogue, two for
  Cleric (which the wiki flags as probably a game bug, and the tool follows the game), none for
  the rest. Ability scores use the game's 27-point buy (8–15, 2 points per step above 13).
  Picking a background shows what it grants, the modifier each granted skill lands on, and a
  warning when it duplicates a class pick you have already spent.
- **Gear per act** — each character keeps a separate loadout for Act 1, 2 and 3, with a
  "copy forward" button, because what you wear at the Grove is not what you finish on.
- **Spell browser** — every spell and cantrip, filterable by class, level and school, with a
  "only my class" toggle that reads the character's actual (multi)class.
- **Share links** — the whole party packs into the URL, compressed; a four-character party with
  gear across three acts fits in a few hundred characters. Verified to round-trip every field —
  race, subclass, background, fighting style, feats and per-act gear — with local storage cleared.
- **Derived stats** — Armour Class computed properly (armour base, Dexterity capped by armour
  category, shield, item bonuses), hit points, initiative, proficiency bonus, spell save DC and
  spell attack bonus.
- **Impact preview** — every candidate in the slot dropdown shows what equipping it would do to
  your AC, damage per turn and spell DC.
- **Every choice previews itself** — race, class, subclass, background, feats and fighting styles
  all use the same listbox rather than a native dropdown: the game's own badge icon, the wiki's
  description, and a badge for the part the tool computes with. Scrolling the list *is* the
  preview, and arrow keys plus Enter work throughout.
- **Subclass choices** — a Draconic Bloodline sorcerer picks their ancestry (10 options, each with
  its damage type and the spell it grants), a Wildheart their Bestial Heart and Aspect, a Hunter
  their Defensive Tactics. Scraped from the wiki's own choice tables.
- **Every version of the turn at once** — the base figure, then With Advantage, With Disadvantage,
  Power attack, Sneak Attack and Divine Smite each on their own line with their delta, and "All of
  the above". These were checkboxes: you toggled one, the number moved, and you had to remember the
  old value to compare. Showing them together *is* the comparison. Only the lines that actually
  apply to this character and this weapon appear — "All of the above" no longer counts the two roll
  states as things to combine, since they are alternatives to each other rather than riders.
- **The roll: Advantage, Disadvantage or a straight d20** — one control with three states, not two
  checkboxes, because BG3 cancels the two against each other and no combination of ticks should be
  reachable that the game collapses anyway. Disadvantage is the exact mirror of Advantage: two d20,
  worst kept, so it lands only if both dice would have landed and crits only if both would have
  critted. It also **switches Sneak Attack off**, because Sneak Attack (Melee) reads *"Deal extra
  damage to a foe you have Advantage against. Also works if you have an ally within 1.5 m (5 ft) of
  the target and you don't have Disadvantage"* — so the row is withdrawn rather than offering a
  turn the game will not let you take, and the Disadvantage line says why.
- **The three target fields say what they are measured against** — Armour Class *vs your attack
  rolls*, Saving throw *its bonus vs your DC 14* (your own, filled in live), and Defends against
  *applied after the damage lands*. They are three different questions — whether the attack lands,
  whether the target resists the spell, and how much of the damage survives — and labelling all
  three "Target …" made them read as three versions of one number.
- **Conditions in play** — eleven of them, folded away until wanted, each a stepper with clickable
  pips where the wiki counts turns or charges, and a plain on/off pill where it does not — Prone
  is not a quantity, but Lightning Charges and Reverberation both are, and both change at 5: five
  charges are consumed on your next damage for one extra 1d8 Lightning, five turns of Reverberation
  detonate for 1d4 Thunder with a DC 10 CON save or fall Prone. Neither payout is folded into the
  per-attack numbers — they happen once, and a per-attack figure would double them.
  Arcane Acuity, Bless and Lightning Charges raise your rolls;
  Reverberation and Bane lower the target's saves; Prone and Restrained hand you Advantage.
  Radiating Orb protects you rather than helping you hit, and says so instead of pretending to
  count. **Wet** is the one BG3 combos are built on — *"Resistant to Fire damage. Vulnerable to
  Lightning and Cold damage"* — and it is not a flat doubling: the page adds that a target already
  resistant to those has *"their resistances negated instead of becoming vulnerable"*, so a
  Lightning-resistant enemy takes normal damage rather than double. Getting that backwards would
  overstate a lightning build against precisely the enemies it exists to beat. Bleeding and Burning
  are listed because they are commonly stacked, and both say plainly that their damage lands on the
  target's own turn rather than on your attack. **Momentum is deliberately absent**: it only raises
  movement speed, and a condition that moves no number here would be noise in a list meant to be
  read. Every wording is quoted from that condition's own wiki page.
- **"Not counted above"** — a folded list of every named ability on your equipped gear that the
  damage figures leave out. Across the library items carry 545 of them, and most cannot be computed
  from the wiki's wording alone: they recharge, they need a condition the tool does not track, or
  they fire outside the attack. Listing them makes the projection a floor rather than a claim of
  completeness — the alternative was inventing numbers for them or ignoring them in silence.
- **Extra Actions** — Action Surge and Haste each grant one more Action, which is one more Attack
  action, so each is worth exactly what the main action is worth. Neither repeats the off-hand:
  that costs a Bonus Action and you only get one. Action Surge appears only for a build that has
  it, read from the scraped Fighter progression rather than a hardcoded level. Haste carries its
  price on the row — Concentration, and **Lethargic** when it ends ("Can't move or take Actions,
  Bonus Actions, or Reactions"), a whole turn gone.
- **Honour mode toggle** — off by default, because the tool projects normal play. The Hastened page
  files *"A Hastened creature can not use Extra Attack with its additional action"* under its
  **Honour mode** heading, so it is that mode only — easy to get backwards by guessing, and a big
  swing: a Fighter 12 does 48.3 damage on a Hasted turn normally, 32.2 in Honour mode. Every cached
  rule page was checked for an `id="Honour_mode"` section and Hastened is the only one, so the
  toggle changes exactly one rule and its tooltip says so rather than implying the whole calculator
  switches difficulty. A build without Extra Attack sees no change and is told nothing.
- **Opportunity Attack** — its own line after the turn total, marked apart, because a Reaction is
  not part of your turn and folding it in would inflate every figure.
- **Level path** — every milestone of every class in the build, in the order the levels were taken,
  with the next level shown ahead in blue. It is the only place a multiclass split shows its cost.
- **Copy build card** — the build as a readable block of text you can paste anywhere.
- **Click any trait or feature for its full description** — race traits, subclass features and
  choices open a panel like the game's, reachable from the keyboard, instead of a clipped tooltip.
- **Feats** — 41 scraped from the wiki, slots follow the game's progression (levels 4/8/12, plus 6 and 12 for Fighter and
  10 for Rogue). Feats that grant ability points or proficiencies feed back into the sheet:
  take Heavily Armoured and the heavy-armour warning disappears.
- **Fighting styles** — the six the game has, offered only to the classes and levels the wiki lists
  (Fighter 1, Paladin and Ranger 2, College of Swords 3, and a second one for a Champion at 10).
  Five of them change the numbers: Archery, Defence, Duelling, Great Weapon Fighting and
  Two-Weapon Fighting. Protection is a reaction and is described rather than simulated.
- **Proficiency cross-check** — items your class cannot use are flagged in the slot dropdown and
  summarised on the sheet, the way the game warns you.
- **Target defences** — set a damage type the enemy resists, is vulnerable to or is immune from,
  and every component of the damage takes the wiki's multiplier only if its own type matches.
  Which weapon wins often changes.
- **Combat calculator** — per weapon: attack bonus, hit chance against a target AC, average
  damage and damage per turn, with Advantage and power-attack (Great Weapon Master /
  Sharpshooter) toggles so you can see whether −5/+10 is actually worth it, plus elevation, the
  number of attacks your level grants, and Sneak Attack / Divine Smite for the classes that have them.
- **Spell slots and upcasting** — the slot picker offers only the levels your Effective Spellcaster
  Level allows, and a warlock is locked to their pact level because BG3 always upcasts their casts.
- **Spell projection** — pick from a dropdown of the damaging spells your class can actually
  cast and see how it lands. Spells resolve three ways and the tool handles each: a spell attack
  roll against AC, a saving throw against your DC (halving damage on a success where the spell
  says so), or an automatic hit like Magic Missile.
- **Slots respect weapon class** — the ranged slots only accept bows, crossbows and slings.
- **Party of four** — each character has their own loadout, sheet and notes; switch with the
  pills on top. The **Party** tab reads them as one group: AC, hit points and damage per turn
  side by side with the best in each column highlighted, plus skill coverage — which skills the
  party has, and which nobody is proficient in at all.
- **Turn summary** — the headline damage figure for a whole turn: the Attack action (already
  multiplied by Extra Attack) plus the off-hand bonus action. Sneak Attack and Divine Smite are
  counted once, on the Action, rather than on both weapon cards.
- **Pin a build to compare** — snapshot AC, hit points, damage per turn, initiative and spell DC,
  then keep editing and watch each delta. It pins the numbers, not the character, so nothing is
  locked while you experiment.
- **Duplicate detection** — warns when the same item is equipped on two characters, since most
  unique items exist only once per playthrough.
- **Pickup List** — every item planned across the party, grouped by act then location, with
  checkboxes and a progress bar, overall and per act.
- **Accessibility** — every clickable card, slot and row is reachable and firable from the
  keyboard with a visible focus ring, and every control carries an accessible name. Making the
  element helper do it means it cannot be forgotten at a call site later.
- **Item Library** — 934 items with icons, searchable by name/effect, filterable by type,
  rarity and act. Cards stream in a page at a time as you scroll, so the grid holds ~1,700 DOM
  nodes instead of ~15,000.
- Everything saves locally (localStorage); parties can be exported/imported as JSON.

## Project structure

```
index.html            UI
js/core.js            data normalisation, character rules, skills, backgrounds, multiclassing,
                      feats, persistence, tabs
js/panels.js          item library, party bar, paper doll, build summary
js/character.js       origin companions, derived stats, fighting styles
js/combat.js          combat maths, conditions, number transitions, spell slots, projection
js/sheet.js           character panel, detail popover, level path, option picker, planner
js/app.js             scroll mode, spell browser, pickup list, party overview, A/B compare,
                      saved parties, share links, build card, startup
style.css             theme
data/items.js         item database — GENERATED, do not edit by hand
data/item-index.json  list of wiki pages to scrape
data/scraped.json     raw data extracted from the wiki
data/overrides.json   hand-written corrections (take priority over scraped data)
icons/                item icons, downloaded locally
assets/               game cover art used in the header banner
data/companions.js    origin companions — GENERATED
data/subclasses.js    subclasses — GENERATED
data/races.js         playable races and traits — GENERATED
data/sets.js          thematic equipment sets — GENERATED
data/spells.js        spells and cantrips — GENERATED
data/fighting-styles.js  fighting styles — GENERATED
data/feats.js         feats — GENERATED
assets/portraits/     companion portraits
scripts/scrape.ps1    downloads and parses bg3.wiki item pages
scripts/scrape-companions.ps1  companion stats and portraits
scripts/scrape-subclasses.ps1  subclasses
scripts/scrape-races.ps1       playable races
scripts/scrape-sets.ps1        equipment set membership
scripts/scrape-spells.ps1      spells and cantrips
scripts/scrape-fighting-styles.ps1  fighting styles
scripts/scrape-feats.ps1       feats
scripts/wiki-read.ps1          one-off lookup of a wiki rules page, for verification
scripts/build-*.ps1            each *.json -> its *.js counterpart
scripts/fetch-icons.ps1  downloads item icons
scripts/fetch-sheet-icons.ps1  class, subclass and race badges
scripts/build-db.ps1  merges scraped.json + overrides.json -> data/items.js
scripts/serve.ps1     tiny static local server
cache/                cached HTML pages (makes re-scraping instant)
```

## Refreshing the database

```bash
# items
pwsh -File scripts/scrape.ps1        # add -Refresh to bypass the cache
pwsh -File scripts/fetch-icons.ps1
pwsh -File scripts/build-db.ps1

# everything else
pwsh -File scripts/scrape-companions.ps1 ; pwsh -File scripts/build-companions.ps1
pwsh -File scripts/scrape-subclasses.ps1 ; pwsh -File scripts/build-subclasses.ps1
pwsh -File scripts/scrape-races.ps1      ; pwsh -File scripts/build-races.ps1
pwsh -File scripts/scrape-sets.ps1       ; pwsh -File scripts/build-sets.ps1
pwsh -File scripts/scrape-spells.ps1     ; pwsh -File scripts/fetch-spell-icons.ps1
pwsh -File scripts/build-spells.ps1
pwsh -File scripts/scrape-fighting-styles.ps1 ; pwsh -File scripts/build-fighting-styles.ps1
pwsh -File scripts/scrape-feats.ps1      ; pwsh -File scripts/build-feats.ps1

# class, subclass and race badges (after those three are scraped)
pwsh -File scripts/fetch-sheet-icons.ps1
pwsh -File scripts/build-classes.ps1 ; pwsh -File scripts/build-subclasses.ps1 ; pwsh -File scripts/build-races.ps1
```

`cache/`, `icons/` and `assets/` are gitignored: they are large and fully regenerable.

Current coverage: 934 items (100% with an effect description and a locally cached icon, 99%
rarity, 96% location, 80% act, and 99% of real weapons with a damage roll — the 15 without are
musical instruments), 579 spells (every one with its own icon and range, 103 with an area,
231 learnable by a player character), 58 subclasses with 511 features and their choice tables,
41 feats, 23 races with their named traits, 6 fighting styles, 55 equipment sets and 10 origin
companions — all with the game's own badge icons. Content cut from the game (mod-only) is
detected and excluded.

The scraper is polite: 250 ms between requests, an identifiable User-Agent, and a disk cache so
pages are fetched once. It only touches `/wiki/<Article>` pages — the paths bg3.wiki disallows in
its `robots.txt` (`/w/api.php`, `Special:`, `User:`) are never requested.

## Publishing it

There is no server and no database, and adding either would buy nothing: the app is static
HTML/CSS/JS, the data is baked into `data/*.js`, parties live in the visitor's own `localStorage`,
and sharing already works through the URL. So it deploys as a static site — free, on any host.

**It runs on GitHub Pages**, straight from this repo, at
**https://kingzill4.github.io/bg3-planner/**. `.github/workflows/pages.yml` republishes on every
push to `main`; there is no build step to run, so it just uploads the repo as it stands.

Enabling it is two clicks, and the workflow fails until you do — with exactly this error, which
means the setting, not a bug in the file:

> Get Pages site failed. Please verify that the repository has Pages enabled and configured to
> build using GitHub Actions

**Settings → Pages → Source: GitHub Actions**, then re-run the failed job.

(The action offers an `enablement` input that would do this automatically, but it "requires a token
other than `GITHUB_TOKEN`" — a PAT with `repo` scope. Not worth it to avoid two clicks.)

A GitHub Pages project site is served from a **sub-path**, `/bg3-planner/`, not the domain root.
Every path in the app is relative, so nothing breaks — but it is why `robots.txt` is inert here
(crawlers only read it at the domain root) and why the sitemap should be submitted directly in
Google Search Console. See the note inside `robots.txt`.

The free tier is not a constraint at this size: 43.8 MB across ~1,800 files, largest file 1 MB,
against a 1 GB soft limit and 100 GB of bandwidth a month.

Cloudflare Pages and Azure Static Web Apps would work equally well and are also free — Cloudflare
is the one to reach for if the repo ever goes private, since GitHub Pages needs a paid plan for
that. Neither is set up here; one host is enough.

### Why the repo has to stay public

GitHub's Free plan — personal *and* organization — advertises "unlimited public/private
repositories", and that is true. It is not the same feature as Pages: **Pages is available "in
public repositories with GitHub Free and GitHub Free for organizations, and in public and private
repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server."**
A free org does not unlock it. Neither does the Actions allowance on that card, which reads "2,000
CI/CD minutes/month — *free for public repositories*": going private would start billing the deploy
workflow against a quota it currently does not touch at all.

So on a free plan it is public repo + GitHub Pages, or private repo + Cloudflare Pages. There is no
free combination of private and GitHub Pages.

### The URL

**`https://kingzill4.github.io/bg3-planner/`** — free, HTTPS included, nothing bought. It is written
into three files that must agree: the `canonical` and `og:url` in `index.html`, the `Sitemap:` line
in `robots.txt`, and the `<loc>` in `sitemap.xml`. Change all three together, or search engines get
contradictory answers about which URL is the real one.

The name carries "BG3" deliberately. The Wizards Fan Content Policy asks you not to put their
trademarks in a domain name without written consent, and a subdomain is a domain name — but this is
a free, non-commercial fan tool that displays the required Fan Content statement verbatim, which is
the situation the policy exists to permit. It is a judgement call, made knowingly; see
[NOTICE.md](NOTICE.md). Keeping "BG3" out of the host and only in the page title would be the
strictly safer reading, and costs nothing if you ever want to switch.

A **custom domain** is supported free on all three hosts (GitHub Pages: one per site; Cloudflare
Pages: 100 per project; Azure SWA Free: 2 per app) — only the registration costs money, roughly
$10–15 a year for a `.com`. DNS is a `CNAME` for `www` and an ALIAS/ANAME (or Cloudflare's flattened
`CNAME`) at the apex. On GitHub Pages, setting the domain in **Settings → Pages** writes a `CNAME`
file into the repo — leave it there, it keeps the domain bound across deploys.

**You do not need to buy or configure a certificate — but not because HTTPS is optional.** All three
provision and renew one automatically, for free: GitHub "queues a job to request a TLS certificate
from Let's Encrypt" as soon as the DNS check passes, Azure SWA Free lists a complimentary SSL
certificate, Cloudflare issues its own. There is effectively no opt-out, and you would not want one:
browsers label plain HTTP "Not secure" and now try HTTPS first, so a friend opening an HTTP-only
link would meet a warning before they ever saw the planner. Turn on **Enforce HTTPS** (GitHub Pages)
once it becomes available — it can take up to 24 hours after the domain is set.

Two things worth knowing:

- `icons/` and `assets/` are **committed on purpose** (~40 MB). They used to be gitignored as
  regenerable, which was right for a local tool and wrong for a published one: a static host serves
  what the repo holds, so leaving them out publishes 1720 broken images, and re-fetching them in CI
  would hit bg3.wiki on every deploy for files that never change. `cache/` stays ignored — 103 MB,
  and republishing whole copies of someone else's pages is a different thing from citing them.
- Scaling later is a tier change, not a migration. Static Web Apps Free → Standard adds managed
  Azure Functions, which is the point at which a database (Supabase, Cosmos serverless) would
  actually earn its place — when you want accounts or builds shared across devices, rather than the
  local storage and share links that already cover it.

See [NOTICE.md](NOTICE.md) before publishing: it sets out the three licences in play, and what the
Wizards Fan Content Policy does and does not allow around donations.

## Fixing an item

Do not edit `data/items.js` (it gets regenerated). Add an entry to `data/overrides.json`:

```json
{ "id": "boots-of-speed", "act": 1,
  "summary": "Bonus action Click Heels: extra speed and freedom of movement.",
  "location": "Ebonlake Grotto — reward from Thulla." }
```

Any of `summary`, `location` or `act` may be set; whatever you omit keeps the scraped value.
Then re-run `scripts/build-db.ps1`.

## Notes

Unofficial personal tool. Item text, icons and the cover art come from
[bg3.wiki](https://bg3.wiki), and every item links back to its source page. Baldur's Gate 3 is a
trademark of Larian Studios / Wizards of the Coast.

Before publishing this anywhere public, check bg3.wiki's content licence and Larian's asset terms:
the descriptions are wiki-authored text, and the icons and cover art are Larian's artwork. All fine
for personal use, but redistribution has strings attached (attribution and share-alike at minimum).

### Scope of the item database

934 equippable items: weapons, armour (including robes and clothing), shields, headwear, cloaks,
gloves, boots, amulets, rings and instruments. Deliberately **not** included:

- 114 items cut from the game (reachable only through mods) — detected and filtered out
- consumables: potions, elixirs, scrolls, grenades, arrows, coatings, food (~490 wiki pages) —
  they occupy no equipment slot, though elixirs do matter for builds
- camp clothing and underwear (~64 pages) — cosmetic only, no stats

### Rules come from the wiki, not from tabletop 5e

BG3 diverges from tabletop D&D in places, so the class rules the tool applies are scraped from
bg3.wiki rather than written from 5e memory (`scripts/scrape-classes.ps1` → `data/classes.js`):
hit points per level, saving throws, armour and weapon proficiencies, spellcasting ability,
skill picks, and the separate **multiclass** proficiency set the wiki lists for each class.

Differences the wiki caught that a 5e assumption would have got wrong:

- Dwarven Armour Training belongs to the **Shield dwarf** subrace only — reading a whole species
  page at once (which mixes every subrace) is what previously credited it to all dwarves.
- Halflings have no Darkvision in BG3, and Poison resistance is the Strongheart subrace's, not
  the Lightfoot's.
- Great Weapon Master's All In needs a Two-Handed **or Versatile-in-both-hands** melee weapon you
  are proficient with — a Heavy one-handed weapon does not qualify, and a shield disqualifies a
  versatile one.
- Savage Attacker is melee only, and rerolls the damage dice keeping the best (not a flat bonus).
- Off-hand attacks add only the weapon dice; the ability modifier needs Two-Weapon Fighting.
- **An off-hand attack only exists if the pair may legally be dual-wielded.** *"Normally, a
  character can only dual-wield two weapons with the Light property"*; the Dual Wielder feat
  extends that to One-Handed and Versatile weapons, but *"You cannot dual-wield Two-Handed
  weapons"* — not even with the feat. The tool used to add the bonus-action swing for any two
  weapons at all, which inflated a two-greatsword loadout by a full extra attack the game never
  offers. Now the Bonus line either names the feat that made it legal, or says why there is no
  attack, and the loadout itself is flagged as one BG3 would not let you equip.
- Saving throws do **not** auto-succeed on a natural 20 or auto-fail on a natural 1, unlike attack
  rolls and ability checks. A high enough save bonus genuinely never fails.
- Cantrips gain dice at character levels 5 and 10, so a level 12 Fire Bolt is 3d10, not 1d10.
- "Spellcasting ability" on a Barbarian/Fighter/Monk/Rogue page refers to using scrolls and
  items, not class spellcasting — those classes are correctly left with none.
- The twelve Patch 8 subclasses (Bladesinging, Hexblade, Arcane Archer, Swashbuckler…) are real
  and included.
- BG3 has no mechanical set bonuses at all.

### Reading an icon URL off the wiki

Three traps, each caught only by loading every icon and counting the failures:

- A thumbnail URL needs its size segment. Matching lazily up to the first `.webp` stops on the
  source filename and yields a directory path, which the wiki answers with a 400.
- The size cannot be rewritten. Only the sizes the wiki has actually generated exist, so forcing
  `/96px-` returns 404 on most images; take the size the `srcset` offers.
- The thumbnail of a `.png` is served as `.png.webp`, so the filename must be captured to the end
  of the token rather than to the first recognised extension.

And, as with Wyll's portrait once being Mizora's, the first image on a page is not the subject's:
twelve spell pages put the "Honour mode" badge ahead of the spell icon. Anchoring on the infobox
image (`class="mw-file-description"`) is what makes it the right one.
- The Haunted One background grants Medicine and **Intimidation**; tabletop gives Survival. The
  wiki flags it as the only background that diverges, and the tool follows the wiki.
- Origin companions ship with a specific subrace and subclass (Astarion is a High Elf Arcane
  Trickster, Shadowheart a High Half-Elf Trickery Domain cleric), scraped from their infoboxes
  rather than inferred from the broad race the summary line shows.

### Companion presets

Companion baselines live in `data/companions.js`, which is generated and never written to at
runtime. Editing a companion's sheet changes the party, not the baseline, so "Reset to origin"
rebuilds class, subclass, race, background, ability scores, skills and feats from the shipped
values at any point. Minthara's infobox carries no ability scores or background; her background
comes from the Backgrounds article and her scores fall back to the class preset.

### What actually feeds the numbers

Verified by changing one variable at a time and watching the outputs move:

| Input | Feeds |
| --- | --- |
| Race | armour and weapon proficiency (BG3 races grant no ability bonuses) |
| Class | hit points, proficiency bonus, spellcasting ability, proficiencies, skill picks |
| Subclass | proficiency (Hexblade, College of Valour, Bladesinging) and spellcasting — Arcane Trickster and Eldritch Knight cast on Intelligence although their class does not cast at all |
| Multiclass | hit points per class, feat slots per class, total level, reduced proficiencies |
| Ability scores | attack, damage, AC, hit points, initiative, spell DC and attack, every skill |
| Equipment | AC, damage, enchantment, spell DC and attack, initiative, damage reduction |
| Feats | ability points, proficiency grants, hit points, initiative, power-attack maths |
| Fighting style | attack rolls (Archery), AC (Defence), damage (Duelling, Great Weapon Fighting, Two-Weapon Fighting) |
| Skills | background grants, class picks, expertise, ability modifier, proficiency bonus |
| Class level | attacks per turn (Extra Attack at 5, Improved Extra Attack at 11), Sneak Attack dice, Divine Smite dice, spell slot level |

Spell access is not read from the base class alone. The wiki's "How to learn" section lists
subclasses and races too, so Arcane Trickster, Eldritch Knight, cleric domains, warlock patrons
and racial cantrips all open up the right spells — and the Spells tab's class filter and "only my
class" toggle use the same rule as the combat panel, so a subclass caster is never shown nothing.

**It is also not a flat list of names.** The wiki writes availability as a level and sometimes a
condition:

> Classes: **Class level 1**: Cleric and Ranger *(via Sanctified Stalker)* · **Class level 6**:
> College of Lore *(via Magical Secrets)* · **Class level 10**: Bard *(via Magical Secrets)*

The scraper used to match class names across that whole section and keep only the names, which
went wrong three ways: the level was lost (a Bard 1 was offered spells the wiki gates at class
level 10), the condition was lost (every Ranger was offered Sacred Flame, which needs Sanctified
Stalker), and the sections that follow — *Granted by features*, *Granted by items*, *Used by
creatures* — were scanned too, so a spell joined a class's list because an item or an NPC
mentioned it. It now parses the `Classes:` block alone into `{name, kind, level, via}` entries,
and each `(via …)` attaches to the **last** name before it, which is what the wiki means: in
*"Wizard and Ranger (via Beast Tamer)"* only the Ranger is conditional. 217 spells carry structured
availability, 152 of them with a qualifier. Access is then checked against the levels held **in
that class**, not the character's total, and a conditional route is printed wherever the spell
appears — in the browser card, in the projection dropdown, and on the projection itself, because a
damage figure is only real if you actually took that option.

Subclass features are recorded and described rather than simulated, with one exception that
changes the numbers too much to leave out: a Champion's **Improved Critical Hit** lowers the
critical threshold, as do items carrying Improved Critical or Organ Rearranger, and those stack.

**Choices pending** on the sheet lists what is still unset (race, subclass, background, unspent
ability points, empty skill and feat slots), because quietly computing with defaults is what
makes a planner untrustworthy.

### Known approximations

- **Act** is inferred from location names, so ~20% of items have none — mostly gear sold from
  levelled vendor tables that is not tied to one act.
- **Ability presets** use the standard 15/14/13/12/10/8 array in each class's priority order.
- **Damage per turn** counts the whole Attack action: Extra Attack (level 5) and Improved Extra
  Attack (Fighter 11), the weapon's rider dice ("Extra 1d4 Fire"), the doubled dice of a critical
  and its lowered threshold, high or low ground, Halfling Luck, the five damage- or
  attack-changing fighting styles, the once-per-turn riders Sneak Attack and Divine Smite when
  you tick them, and the target's resistance, vulnerability or immunity applied per damage type.
  Versatile
  weapons are read two-handed when the matching off-hand is empty and one-handed when it is
  not, so a shield visibly costs damage.
- **Sneak Attack and Divine Smite get their own comparison rows**, because both are conditional:
  Sneak Attack needs Advantage, or an ally beside the target and no Disadvantage; a smite spends a
  spell slot. Each row assumes its condition is met once in the turn, which is the optimistic case
  — except under Disadvantage, where Sneak Attack is not offered at all because the game forbids it.
- **Equipment sets** are the wiki's thematic groupings. BG3 has no mechanical set bonuses, so the
  tool shows how many pieces of a theme you are wearing, not a bonus you unlock.
- **Spell slots** follow the wiki's Effective Spellcaster Level: a full caster's ESL is their
  class level, a half caster's is half and a one-third caster's a third, rounded up when single-
  classed and summed then rounded down when multiclassed. Warlock levels are excluded, because
  Pact Magic is a separate progression whose slots are always the highest level available — which
  is why a warlock's upcast level is shown locked. The spell save DC still comes from the
  highest-level casting class.
- **Spell projection** covers a single cast. Cantrips scale with character level, levelled spells
  can be cast from a higher slot (59 spells carry computable upcast dice), and spell attack rolls
  include their criticals. Spells that add a projectile rather than dice when upcast — Magic
  Missile, Scorching Ray — show the note but are not recomputed, and area size and non-damage
  effects are not modelled — though every spell now carries its range (including Self and Touch)
  and, for the 103 that have one, its area. Booming Blade is the one cantrip whose scaling the wiki writes as a
  range rather than dice, so it stays at its level-1 dice.
- **The spell catalogue is wider than what a player can learn**: 348 of the 579 entries are NPC
  abilities, item-granted casts or sub-actions of other spells. They list no class, subclass or
  race, and the Spells tab hides them by default behind "Learnable only".
- **Conditions** are modelled only where they change a number this tool computes. Bless and Bane
  are 1d4 in the game and are averaged as ±2.5, which their labels say. Radiating Orb lowers the
  *enemy's* attack rolls, and this calculator projects the damage you deal, so it is offered and
  explained rather than folded into a figure. Momentum affects movement speed only, so it is not
  offered at all.
- **Subclass features** are scraped per level — 511 across the 58 subclasses — and listed on the
  sheet, greyed out until the character reaches the level that grants them. Their mechanical
  effects are still not simulated, beyond the critical threshold and the spell access a casting
  subclass grants. That threshold is now read from the scraped feature rather than a hardcoded
  subclass name, so any subclass the wiki gives Improved Critical Hit to is picked up.
