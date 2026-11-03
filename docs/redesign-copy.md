# Copy deck: System Map redesign

Source of truth for every user-facing string in the redesign. Facts come only from the current site copy. Anything marked **OPEN** needs Sean's answer before it ships.

## No-JavaScript fallback

"Sean Jones. Director of Engineering at Price.com. At Price.com since 2016. Sole technical lead for a platform with 590,000 monthly users. This page needs JavaScript for the system map. You can reach me at hello@seanjones.io or on LinkedIn."

## Metadata

- **Title:** Sean Jones, Engineering Lead at Price.com
- **Description:** Sean Jones is Director of Engineering at Price.com and its sole technical lead: Django, TypeScript, AWS, and AI features for a platform with 590,000 monthly users.
- **OG / Twitter title:** Sean Jones, Engineering Lead
- **OG / Twitter description:** Hands-on engineering lead behind the Price.com platform, its browser extensions, and ai.price.com.

Change from today: drops "specialist", which reads below Director level.

## Navigation

Work · Experience · Projects · Contact

- Brand link accessible name: "Sean Jones, back to top"
- Skip link: "Skip to main content" (visible text only, no longer overridden by an aria-label)
- Second skip link: "Skip to the work" (to #work)

## First viewport

### Signage panel

- **Name:** Sean Jones
- **Role line:** Director of Engineering at Price.com. At Price.com since 2016.
- **Positioning** (under the one line, above the actions, bold): "Open to Staff, Principal and engineering-lead roles. Remote, or hybrid in the Denver area."
- **One line:** Sole technical lead for a platform with 590,000 monthly users. I set the architecture and I still write the code.
- **Primary action:** Get in touch
- **Secondary action:** See the work

### Results (bottom right)

Each row is labelled with its line by name. The 590k figure is not repeated here; it is already in the one line above.

| Line | Figure | Caption |
|---|---|---|
| Frontend | −20% | sitewide load time |
| Platform | −25% | deployment time |
| AI | +15% | click-through on AI recommendations |

Removed: the "Shipping measurable outcomes" stamp and the three claim-style proof lines.

### Map

Line names and stations. Each station links to the case study section that backs it.

**Platform**
- Manual deploys replaced with CI/CD
- Django rebuilt: views, services, presenters
- About 1,540 pytest tests
- EC2 to ECS
- Deploy time −25%

**Frontend**
- Redesign built end to end
- About 90 Cotton components
- About 70 Stimulus controllers, no jQuery
- Lighthouse 16 → 64, load time −20%

**Extensions**
- Rewritten in Angular and TypeScript
- 10,000+ users
- Chrome, Firefox, Edge, Safari stores

**AI**
- ai.price.com frontend
- Responses streamed over WebSockets
- Recommendation click-through +15%

**Leadership**
- Roadmap with the CEO and executive team
- Directs the outside extension firm
- Owns releases to four browser stores
- Sole technical lead since 2022

**Interchanges:**
- "Redesign" (Frontend × Platform)
- "Extension releases" (Extensions × Leadership)

Keyboard hint, shown while the map has focus and announced as its description: "Tab moves between lines. Arrow keys move between stations."

Map legend line, for screen readers and as a caption: "The Price.com platform as a system map. Each line is a workstream I own; each station links to the result behind it."

## Work (case studies)

- **Section heading:** Work
- **Intro:** none. The map already introduces it.
- **Order inside each case study:** title, line bullets, summary, live link, then **Result** (always shown, set large), then a **"Full case study"** disclosure holding Problem and What I did. Links from the map into Problem or What I did open the disclosure.
- **Earlier work group:** heading "Earlier work, 2012–2016" for Starbucks Branded Solutions and Procter & Gamble, in a compact row (smaller picture, body-size result).
- **Copy link:** one icon button beside each title, accessible name "Copy link to {title}". After it's clicked: "Link copied" (also announced).
- **Live product link** (Price.com and ai.price.com, after the summary): "Visit {domain}"
- **Starbucks result:** "Launched and used by businesses across the US to order custom coffee and products." (from the former Senior Web Developer bullet)

Case study bodies keep their current text, except the Price.com result now states the Lighthouse scores: "Quadrupled the site's Lighthouse performance score, from 16 to 64, on PageSpeed Insights…" (scores supplied by Sean). Each uses three labelled parts: **Problem**, **What I did**, **Result**. The current "Challenge / Solution / Approach / Impact / Status / Stack / Editorial stance / Audience fit / Design priority" labels map onto those three:
- Challenge → Problem
- Solution, Approach, Frontend, Backend, Extensions, Delivery, Stack → What I did
- Impact, Status → Result
- Editorial stance, Audience fit, Design priority → What I did

## Projects (independent products, the branch line)

- **Heading:** Projects (matches the nav)
- **Intro:** Independent products I've built and run on my own time.
- **Link label:** "Visit {domain}"

Live links:
- taskriver.ai
- whatcontractorspay.com
- thefamilyshortlist.com
- fsmaradar.com

## Skills (compact strip, no longer a section of cards)

- **Label:** Stack
- **Line:** Python, Django, FastAPI, TypeScript, Angular, Vue, React, Stimulus, PostgreSQL, AWS (ECS, S3, CloudFront), GitHub Actions, Docker, LLM integration (Gemini, Claude), RAG

Removed:
- the "Proven track record…" intro
- IIS and LAMP from the headline list (still mentioned in the 2012–2016 role, where they belong)
- the pill wall

## Experience (line diagram)

- **Heading:** Experience
- **Intro:** none. The current "Combines deep technical expertise…" line is removed.
- **Current role marker:** "Now"
- Experience does not repeat the case studies. Each role keeps only what Work does not already say, then links to the case studies that carry the detail ("Case studies: …").
- **Director of Engineering:** the scope line, one bullet ("Work directly with the CEO and executive team on the roadmap, and oversee the outside development firm that builds the browser extensions (10,000+ users), including releases to the Chrome, Firefox, Edge, and Safari stores."), then "Case studies: Price.com platform, ai.price.com".
- **Senior Web Developer:** the client-revenue and deployment-rate bullets, then "Case studies: Starbucks Branded Solutions, Procter & Gamble".
- Other roles keep their current bullets.
- Senior Web Developer: the description line that only restates dates becomes the entry's sub-line: "Marlinco, 2012–2015 · The Alchemedia Project, 2015–2016".

## Contact (terminus)

- **Heading:** Get in touch
- **Line** (bold, same weight as the facts below): Open to conversations about Staff, Principal and engineering-lead roles.
- **Facts (below the line):** "Remote, or hybrid in the Denver area." and "I usually reply within a day."
- **Email:** hello@seanjones.io (shown as a mailto link, label "Email hello@seanjones.io")
- **LinkedIn:** "LinkedIn", with the accessible name "Sean Jones on LinkedIn"
- **Form intro:** Or send a message here. All fields are required.

### Form fields

| Field | Label | Placeholder |
|---|---|---|
| Name | Name | none (was "Sean Jones") |
| Email | Email | you@company.com |
| Message | Message | What are you working on? |

Message hint under the field: "Up to 5,000 characters." Limits: name 100, email 254, message 5,000.

### Validation (on blur and on submit)

- Name empty: "Enter your name."
- Email empty: "Enter your email address."
- Email malformed: "That email address doesn't look right. Check for a typo."
- Message empty: "Write a short message."

### States

- **Submit button:** "Send message"
- **While sending:** "Sending…"
- **Success heading:** "Message sent"
- **Success body:** "Thanks, {name}. I'll reply to {email}."
- **Success action:** "Send another message"
- **Network failure:** "Your message didn't send. Check your connection and try again, or email hello@seanjones.io."
- **Request hangs past 15 seconds:** same as network failure.
- **Server error:** "Your message didn't send. Try again, or email hello@seanjones.io."
- **Form not configured:** "The form isn't working right now. Email hello@seanjones.io instead."
- Typed text stays in the fields after any failure.

## Keyboard help

- **Title:** Keyboard shortcuts
- **Entries:**
  - Work
  - Experience
  - Projects
  - Contact
  - Back to top
  - Show this help
- **Off switch** (checkbox in the dialog, on by default, remembered): "Use single-key shortcuts", with the hint "Turn these off if you use speech input or the keys get in the way."
- **Footer entry:** "Keyboard shortcuts" button, which opens the dialog without a key press.

## Footer

- © {year} Sean Jones
- Keyboard shortcuts (button)
- GitHub (accessible name "Sean Jones on GitHub")
- LinkedIn (accessible name "Sean Jones on LinkedIn")
