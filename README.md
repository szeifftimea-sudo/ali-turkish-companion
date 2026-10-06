# Ali — The Turkish Companion

**Discover Istanbul with someone who is already waiting for you.**

**Live demo:** [https://szeifftimea-sudo.github.io/ali-turkish-companion/](https://szeifftimea-sudo.github.io/ali-turkish-companion/)

Ali is a Hungarian-first, story-led Turkish learning experience for adults
preparing for a trip to Türkiye. It replaces the feeling of completing a
course with the feeling of being welcomed by a local friend. Language appears
inside memorable situations: meeting Ali, ordering tea, taking a ferry,
visiting a bazaar, and finding one's way through Istanbul.

This repository contains the working OpenAI Build Week MVP. It is a static web
application with no required backend, account, database, API key, or build
step. Personal progress and saved phrases are stored locally in the browser.

## Why this product exists

Most travel-language products begin with vocabulary lists and lessons. Ali
begins with hospitality. The visitor is not treated as a student or a generic
user, but as Ali's guest. The product's guiding question is:

> If we remove this feature, is the experience missing?

The goal is not merely to make someone study Turkish. The goal is to make
Türkiye feel familiar enough that speaking Turkish begins naturally.

## Build Week MVP

- A responsive landing page and a guided first experience through **10
  Istanbul stops**.
- A branching journey that personalizes useful Turkish phrases without
  turning the experience into a test.
- A 17-place Istanbul discovery map with **7 connected place stories**.
- A Turkish–Hungarian situation and vocabulary library derived from a larger
  structured learning knowledge base.
- **Ali's Pocket**, where personally meaningful phrases can be saved.
- Individual study mode plus printable, double-sided 63 × 88 mm learning
  cards, four cards per A4 page.
- A Turkish food experience that connects meals, customs, venues, and useful
  expressions.
- A canonical visual system for Ali, Mırmır, expressions, locations, and
  recurring Istanbul motifs.
- Local progress persistence through `localStorage`.
- A daily-updated Turkish lira–Hungarian forint travel converter with cached
  offline fallback.
- Visible pronunciation affordances marking the planned production voice
  layer; synthetic Turkish audio itself is intentionally not claimed as
  complete in this MVP.

Planned extensions—including the AI Turkish–Hungarian dictionary and Turkish
history—are deliberately outside the submitted MVP.

## Run locally

No installation or package download is required beyond any simple static web
server.

### Option A: Python

```bash
python -m http.server 8080
```

### Option B: Node.js

```bash
npx --yes http-server . -p 8080 -c-1
```

Then open:

```text
http://localhost:8080/index.html
```

Do not open the application through `file://`; browser security and navigation
behaviour are more reliable through `http://localhost`.

## Online demo

The submission is deployed directly from the repository's `main` branch using
GitHub Pages:

```text
https://szeifftimea-sudo.github.io/ali-turkish-companion/
```

## Suggested judge path

1. Open `index.html` and start the first walk with Ali.
2. Complete at least the opening stop and save a phrase to Ali's Pocket.
3. Open `zseb.html` to review, study, select, and print saved phrases.
4. Explore `isztambul-helyei.html` and switch between its three discovery
   layers.
5. Open `torok-konyha.html` for the cultural and practical food experience.
6. Use `helyzetek.html` or `szavak.html` to search the wider learning material.

## Main application files

| Area | Entry point |
| --- | --- |
| Landing page and ten-stop journey | `index.html`, `styles.css`, `script.js` |
| Situation knowledge map | `helyzetek.html`, `helyzetek-data.js` |
| Vocabulary view | `szavak.html` |
| Ali's Pocket and learning cards | `zseb.html` |
| Turkish lira–Hungarian forint converter | `arfolyam.html` |
| Turkish cuisine | `torok-konyha.html` |
| Istanbul places and interactive map | `isztambul-helyei.html` |
| Seven connected place stories | `kadikoy-moda.html`, `bazartol-kikotoig.html`, `regi-utcak.html`, `toronytol-parkig.html`, `gepektol-kilatasig.html`, `egy-nap-a-szigeten.html`, plus the Sultanahmet story inside the map experience |
| Canonical image library | `assets/canon/` |
| Optimized runtime images | `assets/web/` |
| Product and UX documentation | Root-level `*.md` files |
| Knowledge maps and text audits | Final `*.xlsx`, `*.docx`, and `*.md` artifacts under `outputs/` |

Start with `ALI_PROJECT_MASTER_AUDIT_AND_FILE_INDEX.md` for the detailed
project history, system inventory, and open-point audit.

Key structured evidence includes the ten-adventure knowledge map, content
coverage map, causal journey architecture, living story map, question-tree
text audit, and adventure quality matrix under `outputs/`. Generated previews,
inspect dumps, caches, and local build dependencies are intentionally excluded.

## How Codex and GPT-5.6 were used

This product was built through an extended human–Codex collaboration rather
than a single generation prompt.

Codex helped to:

- inspect and structure ten source learning documents into a reusable content
  and decision map;
- turn product philosophy into the Character Bible, Hospitality Manifesto,
  UX Blueprint, visual canon, and Mırmır character system;
- implement and repeatedly refactor the responsive HTML, CSS, and JavaScript
  experience;
- design and test branching dialogue logic across all ten journey stops;
- normalize Turkish–Hungarian content, remove duplicates, repair missing
  translations, and improve search behaviour;
- build persistence, Ali's Pocket, learning-card selection, study mode, and
  duplex print layouts;
- audit navigation, CTA destinations, mobile layouts, image safety, map
  behaviour, semantic hierarchy, and natural Hungarian dialogue;
- create traceable asset briefs and maintain the canonical visual library;
- challenge feature ideas against the product's hospitality principles and
  deliberately remove or postpone elements that weakened the first journey.

The human creator made the core product, character, pedagogy, editorial,
visual-direction, and prioritization decisions. GPT-5.6 and Codex accelerated
implementation, cross-file reasoning, systematic QA, content transformation,
and documentation. Generated output was reviewed through frequent visual and
functional tests and revised when it did not feel natural, coherent, or true
to Ali.

## Build Week scope and evidence

The submitted version was meaningfully designed, implemented, expanded, and
audited during OpenAI Build Week. The repository commit history identifies the
submission snapshot; `BUILD_WEEK_SUBMISSION_PACKAGE_HU.md` and
`ALI_PROJECT_MASTER_AUDIT_AND_FILE_INDEX.md` document the implemented systems
and the collaboration process in greater detail.

The primary Codex project thread's `/feedback` Session ID is supplied in the
Devpost submission form as required.

## Privacy and security

- No API keys or credentials are required.
- No personal data is sent to a server.
- Saved phrases and journey state remain in the visitor's browser.
- `.env` files, private keys, generated QA output, and local tooling are
  excluded from version control.

## Audience and extensibility

The MVP is written for Hungarian adults who are new to Turkish or returning to
it for travel, cultural interest, or personal connection. The experience
architecture can later support additional interface languages; nationality
choices in the current journey generate Turkish self-introduction phrases and
must not be mistaken for 57 localized product languages.

## Rights

See [LICENSE.md](LICENSE.md). Ali, Mırmır, the illustrations, written content,
visual identity, and character canon remain proprietary creative assets of
the project creator.
