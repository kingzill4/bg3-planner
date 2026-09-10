# Attribution and licensing

This project mixes three things under three different terms. They are separated here
so nobody has to guess which applies to what.

## 1. The code — MIT

Everything in `js/`, `scripts/`, `index.html` and `style.css` is mine, under the MIT
licence in [LICENSE](LICENSE). Reuse it freely.

## 2. The game data and art — CC BY-NC-SA 4.0, from bg3.wiki

`data/`, `icons/` and `assets/` are derived from [bg3.wiki](https://bg3.wiki), whose
pages carry this footer:

> Content is available under CC BY-NC-SA 4.0 or CC BY-SA 4.0

That licence is not optional decoration. It sets three conditions, and this project
meets all three:

- **BY — attribution.** The site footer credits bg3.wiki and links the licence, and
  every single item, spell, class, subclass, race and feat links back to its own
  source page. Nothing is presented as if it originated here.
- **NC — non-commercial.** The tool is free, has no ads, no paywall, no gated
  features and no registration. The licence defines NonCommercial as *"not primarily
  intended for or directed towards commercial advantage or monetary compensation."*
- **SA — share alike.** This page is published under CC BY-NC-SA 4.0 in turn, which
  is what the footer says.

The scraped page copies in `cache/` are deliberately **not** committed: extracting
facts and citing them back is one thing, republishing wholesale copies of someone
else's pages is another.

## 3. The game itself — Larian Studios / Wizards of the Coast

Baldur's Gate 3 is a trademark of Larian Studios. The icons depict in-game assets
owned by Larian. This is unofficial fan content, not affiliated with or endorsed by
Larian Studios or Wizards of the Coast, published under the
[Wizards Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy),
to which the [BG3 Fan Content Terms](https://baldursgate3.game/bg3-fan-content-terms/)
defer on the question of compensation.

### On the name

The policy says you "may not incorporate any Wizards of the Coast logos and trademarks in your Fan
Content without our prior, written consent", and that extends to branding, titles and domain names.
"BG3" abbreviates a trademark, and it appears in both the title and the host
(`bg3-build-planner.pages.dev`).

That is a deliberate choice, not an oversight. The policy exists to permit exactly this kind of
thing — free, clearly unofficial fan content that credits the source and carries the required
statement — and naming the game is what makes the tool findable by the people it is for. Nothing
here uses a Wizards or Larian *logo*, no artwork of theirs is used as branding, and the required
Fan Content statement is displayed verbatim in the footer.

The strictly safer reading is to keep "BG3" out of the host and let the page title carry it. That
remains available at any time: it is one string in `index.html`, `robots.txt` and `sitemap.xml`.

### On donations

The Wizards Fan Content Policy addresses this directly:

> Yep! We know you put lots of time and energy into your Fan Content and are OK with
> you recouping some of that investment in the form of donations on sites like Patreon
> or ad/click revenue on sites like Twitch and YouTube.

and permits "sponsorships, ad revenue, and donations—so long as it doesn't interfere
with the Community's access to your Fan Content."

What it forbids is putting the thing behind a wall:

> You can't require payments, surveys, downloads, subscriptions, or email registration
> to access your Fan Content

> You can't sell or license your Fan Content to any third parties for any type of
> compensation.

So a voluntary tip jar is allowed; a paywall, a "donate to unlock", a supporter-only
feature, an email gate or a sale of the tool is not. The CC NonCommercial term points
the same way: a free tool with an optional tip jar is not *primarily* directed towards
monetary compensation.

In practice that shapes how the link is presented: a quiet line in the footer, next to the source
link, marked *"entirely optional, everything here is free"*. Never a modal, never a prompt, never
attached to a feature. **If a future change would put anything behind that link, the change is the
problem, not the link.**

This is a plain reading of the two published policies, not legal advice.
