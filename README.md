# Wordlet

A Wordle-style vocabulary game for school subjects (Computer Science, Business, Art, English).
Read the **definition**, then guess the **term** letter-by-letter with green/yellow/grey feedback.
Installs as a **PWA** and works fully offline after first load.

## How to play

- A computer-science definition is shown at the top of the page.
- Type your guess using the on-screen keyboard or your physical keyboard.
- Tiles colour after each submitted guess:
  - **green** — right letter, right spot
  - **yellow** — right letter, wrong spot
  - **grey** — letter not in the word
- You have 6 tries. The board sizes itself to the answer's length, so 5-letter and 9-letter terms both work.

## Subjects

A dropdown at the top picks the subject: **Computer Science · Business · Art · English Language · English Literature · French · Spanish · Portuguese**.
Each subject has its own term pool and its own independent **daily puzzle and day-streak**, so a student can do all of the dailies in a session.

For the **MFL** subjects (French, Spanish, Portuguese), play is bidirectional:
- **English → Target**: clue shows the English word; student types the foreign word.
- **Target → English**: clue shows the foreign word; student types the English word.

In **Daily** mode the direction is fixed by the date (alternating, same for everyone). In **Practice** mode a direction toggle appears so the student can choose. Accents are stripped from answers (e.g. FENÊTRE → FENETRE, MAÑANA → MANANA) so the standard A–Z keyboard works.

## Modes

- **Daily** — One deterministic puzzle per subject per day, same word for everyone. Locked after you finish; resumes on reload. Builds a per-subject consecutive-day streak.
- **Practice** — Unlimited random words from the selected subject. The "New word" button gives you another puzzle at any time.

## Scoring, streaks and badges

- Points per win: `(tries_left + 1) × 10 + streak × 5`. A one-guess win on a 1-streak earns 65; a sixth-guess win earns 15.
- Wins extend your streak; a loss or "Give up" resets it.
- Nine unlockable badges: First Win · Ace (1 guess) · Sharp (≤2) · On Fire (3-streak) · Unstoppable (5) · Legendary (10) · Scholar (10 wins) · Regular (7-day daily streak) · High Scorer (500 pts).
- All progress is saved to `localStorage` on the player's device.

## Installing as a PWA

On a phone or laptop, open the site and use the browser's "Install app" / "Add to Home Screen" prompt. After first load, the service worker caches the assets so the game runs **fully offline** — useful in classrooms without reliable Wi-Fi.

## Running locally

It's plain static HTML/CSS/JS — no build step. Open `index.html` in a browser, or run any static server (the service worker only activates over `http(s)://`, not `file://`):

```bash
# any of these will do
python3 -m http.server 8000
npx serve .
```

Then visit http://localhost:8000.

## Deploying on GitHub Pages

Push this repo to GitHub, then in **Settings → Pages** pick the branch to serve from. The site will be served at:

```
https://<user-or-org>.github.io/<repo>/
```

A `.nojekyll` file is included so Pages skips Jekyll and serves files as-is.

## Adding or editing terms

Edit the `SUBJECTS` array at the top of `script.js`. Each subject has an `id`, a display `name` and a list of `terms`:

```js
var SUBJECTS = [
  {
    id: "cs", name: "Computer Science", terms: [
      { term: "ALGORITHM", clue: "A precise, step-by-step set of instructions for solving a problem." },
      { term: "VARIABLE",  clue: "A named storage location that holds a value which can change." },
      // ...
    ]
  },
  // add a new subject by appending another { id, name, terms } object
];
```

Rules for terms:
- Single word, letters A–Z only (no spaces, digits or punctuation).
- Any length — the board adapts automatically.
- The clue is plain text shown above the board.

To bust the offline cache after editing, bump `CACHE` in `sw.js` (e.g. `"wordlet-v1"` → `"wordlet-v2"`).

## File structure

```
index.html             Page markup
styles.css             All styles
script.js              Game logic + per-subject term lists
manifest.webmanifest   PWA manifest (name, theme, icons)
sw.js                  Service worker (offline caching)
icon.svg               App icon
.nojekyll              Tells GitHub Pages to serve files as-is
```

## License

MIT — see [LICENSE](LICENSE).
