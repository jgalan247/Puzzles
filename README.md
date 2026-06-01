# Wordlet

A Wordle-style vocabulary game for computer science.
Read the **definition**, then guess the **term** letter-by-letter with green/yellow/grey feedback.

## How to play

- A computer-science definition is shown at the top of the page.
- Type your guess using the on-screen keyboard or your physical keyboard.
- Tiles colour after each submitted guess:
  - **green** — right letter, right spot
  - **yellow** — right letter, wrong spot
  - **grey** — letter not in the word
- You have 6 tries. The board sizes itself to the answer's length, so 5-letter and 9-letter terms both work.

## Modes

- **Daily** — One deterministic puzzle per day; the same word for everyone. Locked after you finish; resumes on reload. Builds a consecutive-day streak.
- **Practice** — Unlimited random words for revision. The "New word" button gives you another puzzle at any time.

## Scoring, streaks and badges

- Points per win: `(tries_left + 1) × 10 + streak × 5`. A one-guess win on a 1-streak earns 65; a sixth-guess win earns 15.
- Wins extend your streak; a loss or "Give up" resets it.
- Nine unlockable badges: First Win · Ace (1 guess) · Sharp (≤2) · On Fire (3-streak) · Unstoppable (5) · Legendary (10) · Scholar (10 wins) · Regular (7-day daily streak) · High Scorer (500 pts).
- All progress is saved to `localStorage` on the player's device.

## Running locally

It's plain static HTML/CSS/JS — no build step. Just open `index.html` in a browser.

## Deploying on GitHub Pages

Push this repo to GitHub, then in **Settings → Pages** pick the branch to serve from. The site will be served at:

```
https://<user-or-org>.github.io/<repo>/
```

A `.nojekyll` file is included so Pages skips Jekyll and serves files as-is.

## Adding or editing terms

Edit the `TERMS` array at the top of `script.js`:

```js
var TERMS = [
  { term: "ALGORITHM", clue: "A precise, step-by-step set of instructions for solving a problem." },
  { term: "VARIABLE",  clue: "A named storage location that holds a value which can change." },
  // ...
];
```

Rules for terms:
- Single word, letters A–Z only (no spaces, digits or punctuation).
- Any length — the board adapts automatically.
- The clue is plain text shown above the board.

## File structure

```
index.html    Page markup
styles.css    All styles
script.js     Game logic + term list (edit TERMS to change content)
.nojekyll     Tells GitHub Pages to serve files as-is
```

## License

MIT — see [LICENSE](LICENSE).
