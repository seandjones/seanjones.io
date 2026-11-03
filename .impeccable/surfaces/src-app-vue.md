---
version: 1
slug: "src-app-vue"
primary_target: "src/App.vue"
related_targets: ["index.html"]
---

# Surface brief: seanjones.io (single page)

Scope: whole site, one page. Visitor mode: Persuade. Copy source: docs/redesign-copy.md (approved by Sean).

Audience: CTOs, eng managers, founders, recruiters arriving from LinkedIn or a résumé, 90 seconds, mostly laptop. Job: decide whether to start a conversation with a hands-on engineering lead (Principal/Staff+), open to conversations. Action: Get in touch (email hello@seanjones.io, LinkedIn, form). Proof: 590k MAU, Lighthouse 4×, deploys −25%, AI rec CTR +15%, verbatim identifiers.

Constraints: Vue 3 + Vite, GitHub Pages, WCAG AA, reduced motion, keyboard nav, self-hosted Overpass only new dependency. Approved screenshots: price.com, ai.price.com, taskriver.ai, whatcontractorspay.com, thefamilyshortlist.com, fsmaradar.com (captured 2026-11-03).

Unresolved: none blocking. Keyboard shortcut bindings deferred to the harden step.

## Direction contract

THESIS: The Price.com platform drawn as a transit system map; each workstream is a line, each station a real result, and the page is a ride from map to terminus. Refuses the dark glowing dev portfolio with a card grid and a skills wall.

OWN-WORLD: White map ground, ink black, four line colours plus ink for Leadership; colour means line identity and nothing else. Octilinear 45°/90° strokes at one weight, white station ticks with ink outlines, ringed interchanges, a terminus bar. Overpass (highway signage lettering) at four sizes, tabular numerals. Signage panels are solid ink with white type. No cards, no shadows beyond the map, no rounded chips.

STORY: Visitor sees the whole platform one person leads, reads four results in the legend, rides a line into its case study, scans the career line diagram and the independent branch line, and reaches contact at the terminus.

FIRST VIEWPORT: System map across the top two-thirds, five labelled lines with named stations. Ink signage panel bottom left: name, role line, one line, Get in touch (primary) and See the work. Legend bottom right: four line-coloured entries, each a result.

FORM: The System Map, candidate 1 (top of my ordered list, IMPECCABLE’S PICK on re-roll 1). seed:c4126ccdfe3db84c

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
