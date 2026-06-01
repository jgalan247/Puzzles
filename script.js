(function () {
  // --- Content: edit terms per subject (single words, A-Z only) ---
  var SUBJECTS = [
    {
      id: "cs", name: "Computer Science", terms: [
        { term: "ALGORITHM",  clue: "A precise, step-by-step set of instructions for solving a problem." },
        { term: "VARIABLE",   clue: "A named storage location that holds a value which can change." },
        { term: "FUNCTION",   clue: "A reusable, named block of code that performs a task and may return a value." },
        { term: "BOOLEAN",    clue: "A data type with only two possible values: true or false." },
        { term: "COMPILER",   clue: "A program that translates source code into machine code before it runs." },
        { term: "ARRAY",      clue: "An ordered collection of elements stored under one name and accessed by index." },
        { term: "POINTER",    clue: "A variable that stores the memory address of another value." },
        { term: "RECURSION",  clue: "When a function calls itself to solve smaller versions of a problem." },
        { term: "BINARY",     clue: "The base-2 number system that uses only the digits 0 and 1." },
        { term: "SYNTAX",     clue: "The set of rules that defines how programs in a language must be written." },
        { term: "KERNEL",     clue: "The core part of an operating system that manages hardware and resources." },
        { term: "CACHE",      clue: "A small, fast store of recently used data that speeds up future access." },
        { term: "STACK",      clue: "A last-in, first-out (LIFO) data structure." },
        { term: "QUEUE",      clue: "A first-in, first-out (FIFO) data structure." },
        { term: "ITERATION",  clue: "Repeating a block of code, for example with a loop." },
        { term: "ENCRYPTION", clue: "Encoding data so that only authorised parties can read it." },
        { term: "DATABASE",   clue: "An organised collection of data that can be queried and updated." },
        { term: "PROTOCOL",   clue: "An agreed set of rules for communication between devices." },
        { term: "BANDWIDTH",  clue: "The maximum rate of data transfer across a network connection." },
        { term: "DEBUGGING",  clue: "The process of finding and fixing errors in a program." }
      ]
    },
    {
      id: "business", name: "Business", terms: [
        { term: "REVENUE",     clue: "The total income a business earns from sales before any costs are deducted." },
        { term: "PROFIT",      clue: "What is left after expenses are subtracted from revenue." },
        { term: "BUDGET",      clue: "A financial plan setting out expected income and spending." },
        { term: "BRAND",       clue: "The identity, name and image that distinguishes a company's products." },
        { term: "ASSETS",      clue: "Things a business owns that have economic value." },
        { term: "EQUITY",      clue: "The owners' share of value in a company after debts." },
        { term: "INVOICE",     clue: "A document that requests payment for goods or services supplied." },
        { term: "DIVIDEND",    clue: "A share of company profits paid to shareholders." },
        { term: "MARKETING",   clue: "Activities a business uses to promote and sell its products." },
        { term: "INFLATION",   clue: "A general rise in the level of prices over time." },
        { term: "MONOPOLY",    clue: "A market controlled by a single supplier." },
        { term: "OVERHEAD",    clue: "Ongoing business costs not directly tied to making a product, like rent." },
        { term: "FRANCHISE",   clue: "An arrangement where someone runs a local business under an established brand." },
        { term: "LIQUIDITY",   clue: "How easily an asset can be turned into cash." },
        { term: "MERGER",      clue: "When two companies combine to form a single new one." }
      ]
    },
    {
      id: "art", name: "Art", terms: [
        { term: "PALETTE",     clue: "The range of colours an artist chooses to work with." },
        { term: "CANVAS",      clue: "A fabric surface stretched on a frame, used for painting." },
        { term: "SCULPTURE",   clue: "A three-dimensional work of art that is carved, modelled or assembled." },
        { term: "PORTRAIT",    clue: "An artistic representation of a person." },
        { term: "LANDSCAPE",   clue: "A picture depicting natural scenery such as fields, mountains or coast." },
        { term: "COLLAGE",     clue: "Art made by gluing different materials onto a surface." },
        { term: "CONTRAST",    clue: "The difference between light and dark areas or opposing colours." },
        { term: "TEXTURE",     clue: "The surface feel or appearance of a work of art." },
        { term: "PIGMENT",     clue: "A coloured substance that gives paint its hue." },
        { term: "MOSAIC",      clue: "A picture made from small coloured pieces of glass, stone or tile." },
        { term: "IMPASTO",     clue: "A painting technique using paint applied so thickly it stands out from the surface." },
        { term: "SYMMETRY",    clue: "A balanced arrangement where parts mirror each other." },
        { term: "COMPOSITION", clue: "The way elements are arranged within a work of art." },
        { term: "PERSPECTIVE", clue: "A technique for creating the illusion of depth on a flat surface." },
        { term: "ENGRAVING",   clue: "An image made by cutting lines into a hard surface and printing from it." }
      ]
    },
    {
      id: "english", name: "English", terms: [
        { term: "METAPHOR",      clue: "Describing one thing as if it were another, without using 'like' or 'as'." },
        { term: "SIMILE",        clue: "A comparison between two things using 'like' or 'as'." },
        { term: "ALLITERATION",  clue: "Repetition of the same initial consonant sound across nearby words." },
        { term: "PROTAGONIST",   clue: "The main character of a story." },
        { term: "ANTAGONIST",    clue: "A character who opposes the main character." },
        { term: "HYPERBOLE",     clue: "Deliberate exaggeration used for effect." },
        { term: "SYMBOLISM",     clue: "Using objects or images to represent ideas or qualities." },
        { term: "NARRATOR",      clue: "The voice that tells the story." },
        { term: "DIALOGUE",      clue: "Spoken conversation between characters in a text." },
        { term: "IMAGERY",       clue: "Descriptive language that creates pictures in the reader's mind." },
        { term: "IRONY",         clue: "Meaning that is the opposite of, or different from, what is said." },
        { term: "STANZA",        clue: "A group of lines that form a unit within a poem." },
        { term: "ALLEGORY",      clue: "A story whose characters and events stand for a hidden, often moral, meaning." },
        { term: "SOLILOQUY",     clue: "A speech in which a character speaks their thoughts aloud while alone." },
        { term: "ANECDOTE",      clue: "A short personal story told to illustrate a point." }
      ]
    },
    {
      id: "french", name: "French", kind: "mfl", language: "French", pairs: [
        { en: "HOUSE",   target: "MAISON" },
        { en: "BOOK",    target: "LIVRE" },
        { en: "SCHOOL",  target: "ECOLE" },
        { en: "MOON",    target: "LUNE" },
        { en: "STAR",    target: "ETOILE" },
        { en: "BREAD",   target: "PAIN" },
        { en: "WATER",   target: "EAU" },
        { en: "FRIEND",  target: "AMI" },
        { en: "TEACHER", target: "PROFESSEUR" },
        { en: "WINDOW",  target: "FENETRE" },
        { en: "APPLE",   target: "POMME" },
        { en: "CHEESE",  target: "FROMAGE" },
        { en: "MONDAY",  target: "LUNDI" },
        { en: "MORNING", target: "MATIN" },
        { en: "FLOWER",  target: "FLEUR" }
      ]
    },
    {
      id: "spanish", name: "Spanish", kind: "mfl", language: "Spanish", pairs: [
        { en: "HOUSE",   target: "CASA" },
        { en: "BOOK",    target: "LIBRO" },
        { en: "SCHOOL",  target: "ESCUELA" },
        { en: "MOON",    target: "LUNA" },
        { en: "STAR",    target: "ESTRELLA" },
        { en: "BREAD",   target: "PAN" },
        { en: "WATER",   target: "AGUA" },
        { en: "FRIEND",  target: "AMIGO" },
        { en: "TEACHER", target: "PROFESOR" },
        { en: "WINDOW",  target: "VENTANA" },
        { en: "APPLE",   target: "MANZANA" },
        { en: "CHEESE",  target: "QUESO" },
        { en: "MONDAY",  target: "LUNES" },
        { en: "MORNING", target: "MANANA" },
        { en: "FLOWER",  target: "FLOR" }
      ]
    },
    {
      id: "portuguese", name: "Portuguese", kind: "mfl", language: "Portuguese", pairs: [
        { en: "HOUSE",   target: "CASA" },
        { en: "BOOK",    target: "LIVRO" },
        { en: "SCHOOL",  target: "ESCOLA" },
        { en: "MOON",    target: "LUA" },
        { en: "STAR",    target: "ESTRELA" },
        { en: "BREAD",   target: "PAO" },
        { en: "WATER",   target: "AGUA" },
        { en: "FRIEND",  target: "AMIGO" },
        { en: "TEACHER", target: "PROFESSOR" },
        { en: "WINDOW",  target: "JANELA" },
        { en: "APPLE",   target: "MACA" },
        { en: "CHEESE",  target: "QUEIJO" },
        { en: "MONDAY",  target: "SEGUNDA" },
        { en: "MORNING", target: "MANHA" },
        { en: "FLOWER",  target: "FLOR" }
      ]
    }
  ];

  // --- Badges: unlocked when test() first returns true after a game ends ---
  var BADGES = [
    { id: "first_win", icon: "🎉", name: "First Win",    desc: "Win your first game",         test: function (s, c) { return c.won && s.wins >= 1; } },
    { id: "ace",       icon: "🎯", name: "Ace",          desc: "Solve in a single guess",     test: function (s, c) { return c.won && c.guesses === 1; } },
    { id: "sharp",     icon: "⚡", name: "Sharp",        desc: "Solve in 2 guesses or fewer", test: function (s, c) { return c.won && c.guesses <= 2; } },
    { id: "streak3",   icon: "🔥", name: "On Fire",      desc: "Reach a 3-win streak",        test: function (s) { return s.streak >= 3; } },
    { id: "streak5",   icon: "🚀", name: "Unstoppable",  desc: "Reach a 5-win streak",        test: function (s) { return s.streak >= 5; } },
    { id: "streak10",  icon: "👑", name: "Legendary",    desc: "Reach a 10-win streak",       test: function (s) { return s.streak >= 10; } },
    { id: "scholar",   icon: "🎓", name: "Scholar",      desc: "Win 10 games in total",       test: function (s) { return s.wins >= 10; } },
    { id: "daily7",    icon: "📅", name: "Regular",      desc: "Solve any subject's daily 7 days in a row", test: function (s) { return maxDailyStreak(s) >= 7; } },
    { id: "polyglot",  icon: "🌍", name: "Polyglot",     desc: "Win at least once in every subject",  test: function (s) {
        return SUBJECTS.every(function (sub) { return (s.subjectWins[sub.id] || 0) > 0; });
      } },
    { id: "highscore", icon: "💎", name: "High Scorer",  desc: "Reach 500 points",            test: function (s) { return s.score >= 500; } }
  ];

  var MAX_GUESSES = 6;
  var KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ENTER ZXCVBNM DEL"];
  var STORE_KEY = "wordlet.stats.v3";

  var board = document.getElementById("wl-board");
  var keyboard = document.getElementById("wl-keyboard");
  var clueEl = document.getElementById("wl-clue");
  var messageEl = document.getElementById("wl-message");

  var mode = "daily";
  var subject = "cs";
  var answer = "";
  var rowIndex = 0;
  var current = "";
  var over = false;
  var recorded = true;
  var keyState = {};
  var stats;
  var toastTimer;

  // ---- subjects ----
  function getSubject(id) {
    for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i];
    return SUBJECTS[0];
  }
  function ensurePracticeDirection(id) {
    if (!stats.practiceDirection) stats.practiceDirection = {};
    if (typeof stats.practiceDirection[id] !== "string") stats.practiceDirection[id] = "to-target";
  }
  function getPracticeDirection(id) {
    ensurePracticeDirection(id);
    return stats.practiceDirection[id];
  }
  function dailyDirection() {
    var p = todayKey().split("-").map(Number);
    var days = Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000);
    return (days % 2 === 0) ? "to-target" : "to-en";
  }
  function effectiveDirection(sub) {
    if (!sub || sub.kind !== "mfl") return null;
    return (mode === "daily") ? dailyDirection() : getPracticeDirection(sub.id);
  }
  function termsFor(sub) {
    if (sub.kind === "mfl") {
      var dir = effectiveDirection(sub);
      return sub.pairs.map(function (p) {
        return (dir === "to-target")
          ? { term: p.target, clue: "Translate to " + sub.language + ": " + p.en }
          : { term: p.en,     clue: "Translate to English: " + p.target };
      });
    }
    return sub.terms;
  }
  function getTerms() { return termsFor(getSubject(subject)); }
  function maxDailyStreak(s) {
    var m = 0;
    if (s.daily) {
      var keys = Object.keys(s.daily);
      for (var i = 0; i < keys.length; i++) if (s.daily[keys[i]].streak > m) m = s.daily[keys[i]].streak;
    }
    return m;
  }

  // ---- date helpers ----
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function shiftDate(key, delta) {
    var p = key.split("-").map(Number);
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
    d.setUTCDate(d.getUTCDate() + delta);
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate());
  }
  function dailyIndex(key, total) {
    var p = key.split("-").map(Number);
    var days = Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000);
    return ((days % total) + total) % total;
  }

  // ---- persistence ----
  function freshDaily() {
    return { streak: 0, best: 0, last: null, today: { date: null, guesses: [], finished: false, won: false } };
  }
  function freshStats() {
    return {
      played: 0, wins: 0, streak: 0, best: 0, score: 0, badges: [],
      daily: {}, subjectWins: {}, practiceDirection: {},
      mode: "daily", subject: SUBJECTS[0].id
    };
  }
  function ensureDaily(id) {
    if (!stats.daily[id]) stats.daily[id] = freshDaily();
    return stats.daily[id];
  }
  function ensureSubjectWins(id) {
    if (typeof stats.subjectWins[id] !== "number") stats.subjectWins[id] = 0;
  }

  function loadStats() {
    var s = freshStats();
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        ["played", "wins", "streak", "best", "score"].forEach(function (k) {
          if (typeof o[k] === "number") s[k] = o[k];
        });
        if (Array.isArray(o.badges)) s.badges = o.badges;
        if (o.mode === "daily" || o.mode === "practice") s.mode = o.mode;
        if (typeof o.subject === "string") s.subject = o.subject;
        if (o.daily && typeof o.daily === "object") {
          Object.keys(o.daily).forEach(function (k) {
            var d = o.daily[k];
            if (!d || typeof d !== "object") return;
            s.daily[k] = {
              streak: typeof d.streak === "number" ? d.streak : 0,
              best:   typeof d.best   === "number" ? d.best   : 0,
              last:   typeof d.last   === "string" ? d.last   : null,
              today:  d.today && typeof d.today === "object" ? {
                date:     typeof d.today.date === "string" ? d.today.date : null,
                guesses:  Array.isArray(d.today.guesses) ? d.today.guesses : [],
                finished: !!d.today.finished,
                won:      !!d.today.won
              } : freshDaily().today
            };
          });
        }
        if (o.subjectWins && typeof o.subjectWins === "object") {
          Object.keys(o.subjectWins).forEach(function (k) {
            if (typeof o.subjectWins[k] === "number") s.subjectWins[k] = o.subjectWins[k];
          });
        }
        if (o.practiceDirection && typeof o.practiceDirection === "object") {
          Object.keys(o.practiceDirection).forEach(function (k) {
            if (o.practiceDirection[k] === "to-target" || o.practiceDirection[k] === "to-en") {
              s.practiceDirection[k] = o.practiceDirection[k];
            }
          });
        }
      }
    } catch (e) { /* ignore */ }
    if (!SUBJECTS.some(function (sub) { return sub.id === s.subject; })) s.subject = SUBJECTS[0].id;
    return s;
  }

  function saveStats() {
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(stats)); } catch (e) { /* ignore */ }
  }

  // ---- rendering ----
  function renderStats() {
    document.getElementById("wl-score").textContent = stats.score;
    document.getElementById("wl-wins").textContent = stats.wins;
    if (mode === "daily") {
      var d = ensureDaily(subject);
      document.getElementById("wl-streak").textContent = d.streak;
      document.getElementById("wl-best").textContent = d.best;
      document.getElementById("wl-streak-label").textContent = "Day streak";
      document.getElementById("wl-best-label").textContent = "Best run";
    } else {
      document.getElementById("wl-streak").textContent = stats.streak;
      document.getElementById("wl-best").textContent = stats.best;
      document.getElementById("wl-streak-label").textContent = "Streak";
      document.getElementById("wl-best-label").textContent = "Best";
    }
  }

  function renderBadges() {
    var list = document.getElementById("wl-badge-list");
    list.innerHTML = "";
    BADGES.forEach(function (b) {
      var earned = stats.badges.indexOf(b.id) !== -1;
      var el = document.createElement("div");
      el.className = "wl-badge" + (earned ? " earned" : "");
      el.title = earned ? b.desc : b.desc + " (locked)";
      var icon = document.createElement("span"); icon.className = "wl-badge-icon"; icon.textContent = b.icon;
      var name = document.createElement("span"); name.className = "wl-badge-name"; name.textContent = b.name;
      el.appendChild(icon); el.appendChild(name);
      list.appendChild(el);
    });
  }

  function updateModeUI() {
    document.getElementById("wl-mode-daily").classList.toggle("active", mode === "daily");
    document.getElementById("wl-mode-practice").classList.toggle("active", mode === "practice");
    document.getElementById("wl-new").style.display = (mode === "practice") ? "" : "none";
    var sub = getSubject(subject);
    var note = document.getElementById("wl-mode-note");
    var dirText = "";
    if (sub.kind === "mfl") {
      var d = effectiveDirection(sub);
      dirText = (d === "to-target") ? "English → " + sub.language : sub.language + " → English";
    }
    if (mode === "daily") {
      note.textContent = sub.name + " · daily for " + todayKey() +
        (sub.kind === "mfl" ? " — today: " + dirText : " — one word a day per subject.");
    } else {
      note.textContent = sub.name + " · practice" +
        (sub.kind === "mfl" ? " — " + dirText : " — unlimited random words.");
    }
    updateDirectionUI();
  }

  function updateDirectionUI() {
    var sub = getSubject(subject);
    var row = document.getElementById("wl-direction-row");
    if (sub.kind !== "mfl" || mode !== "practice") { row.hidden = true; return; }
    row.hidden = false;
    var dir = getPracticeDirection(sub.id);
    var btnT = document.getElementById("wl-dir-to-target");
    var btnE = document.getElementById("wl-dir-to-en");
    btnT.textContent = "English → " + sub.language;
    btnE.textContent = sub.language + " → English";
    btnT.classList.toggle("active", dir === "to-target");
    btnE.classList.toggle("active", dir === "to-en");
  }

  function setDirection(dir) {
    var sub = getSubject(subject);
    if (sub.kind !== "mfl" || mode !== "practice") return;
    ensurePracticeDirection(sub.id);
    if (stats.practiceDirection[sub.id] === dir) return;
    maybeAbandon();
    stats.practiceDirection[sub.id] = dir;
    saveStats();
    updateDirectionUI();
    startGame();
  }

  function populateSubjects() {
    var sel = document.getElementById("wl-subject-select");
    sel.innerHTML = "";
    SUBJECTS.forEach(function (s) {
      var opt = document.createElement("option");
      opt.value = s.id; opt.textContent = s.name;
      sel.appendChild(opt);
    });
    sel.value = subject;
  }

  function showToast(text) {
    var t = document.getElementById("wl-toast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }

  // ---- scoring / results ----
  function checkBadges(won, guesses) {
    var ctx = { won: won, guesses: guesses };
    var newly = [];
    BADGES.forEach(function (b) {
      if (stats.badges.indexOf(b.id) === -1 && b.test(stats, ctx)) {
        stats.badges.push(b.id);
        newly.push(b);
      }
    });
    return newly;
  }

  function recordResult(won, guesses) {
    stats.played++;
    var points = 0;
    if (won) {
      stats.wins++;
      ensureSubjectWins(subject);
      stats.subjectWins[subject]++;
      stats.streak++;
      if (stats.streak > stats.best) stats.best = stats.streak;
      points = (MAX_GUESSES - guesses + 1) * 10 + stats.streak * 5;
      stats.score += points;
    } else {
      stats.streak = 0;
    }
    var newBadges = checkBadges(won, guesses);
    saveStats();
    renderStats();
    renderBadges();
    return { points: points, newBadges: newBadges };
  }

  function practiceFinish(won, guesses) {
    if (recorded) return null;
    recorded = true;
    return recordResult(won, guesses);
  }

  function updateDailyStreakFor(d, won, dateKey) {
    if (won) {
      d.streak = (d.last === shiftDate(dateKey, -1)) ? d.streak + 1 : 1;
      d.last = dateKey;
      if (d.streak > d.best) d.best = d.streak;
    } else {
      d.streak = 0;
    }
  }

  function dailyFinish(won, guesses) {
    var d = ensureDaily(subject);
    if (d.today.finished) return null;
    d.today.finished = true;
    d.today.won = won;
    updateDailyStreakFor(d, won, d.today.date);
    return recordResult(won, guesses);
  }

  function announceBadges(newBadges) {
    if (newBadges && newBadges.length) {
      showToast("Badge unlocked: " + newBadges.map(function (b) { return b.icon + " " + b.name; }).join(", "));
    }
  }

  // ---- board / keyboard ----
  function buildBoard() {
    board.innerHTML = "";
    board.style.gridTemplateRows = "repeat(" + MAX_GUESSES + ", auto)";
    for (var r = 0; r < MAX_GUESSES; r++) {
      var row = document.createElement("div");
      row.className = "wl-row";
      row.style.gridTemplateColumns = "repeat(" + answer.length + ", auto)";
      for (var c = 0; c < answer.length; c++) {
        var tile = document.createElement("div");
        tile.className = "wl-tile";
        tile.id = "wl-t-" + r + "-" + c;
        row.appendChild(tile);
      }
      board.appendChild(row);
    }
  }

  function buildKeyboard() {
    keyboard.innerHTML = "";
    KEY_ROWS.forEach(function (rowStr) {
      var krow = document.createElement("div");
      krow.className = "wl-krow";
      rowStr.split(" ").forEach(function (group) {
        if (group === "ENTER" || group === "DEL") {
          krow.appendChild(makeKey(group, true));
        } else {
          group.split("").forEach(function (ch) { krow.appendChild(makeKey(ch, false)); });
        }
      });
      keyboard.appendChild(krow);
    });
  }

  function makeKey(label, wide) {
    var key = document.createElement("button");
    key.type = "button";
    key.className = "wl-key" + (wide ? " wide" : "");
    key.textContent = label === "DEL" ? "⌫" : label;
    key.setAttribute("data-key", label);
    key.addEventListener("click", function () { handleKey(label); });
    return key;
  }

  function rank(state) { return { absent: 0, present: 1, correct: 2 }[state]; }

  function scoreGuess(guess) {
    var result = new Array(answer.length).fill("absent");
    var counts = {};
    var i, ch;
    for (i = 0; i < answer.length; i++) { ch = answer[i]; counts[ch] = (counts[ch] || 0) + 1; }
    for (i = 0; i < answer.length; i++) {
      if (guess[i] === answer[i]) { result[i] = "correct"; counts[guess[i]]--; }
    }
    for (i = 0; i < answer.length; i++) {
      if (result[i] === "correct") continue;
      ch = guess[i];
      if (counts[ch] > 0) { result[i] = "present"; counts[ch]--; }
    }
    return result;
  }

  function paintRow(r, guess) {
    var result = scoreGuess(guess);
    for (var c = 0; c < answer.length; c++) {
      var tile = document.getElementById("wl-t-" + r + "-" + c);
      tile.textContent = guess[c];
      tile.className = "wl-tile " + result[c];
      var ch = guess[c];
      if (!keyState[ch] || rank(result[c]) > rank(keyState[ch])) {
        keyState[ch] = result[c];
        var keyBtn = keyboard.querySelector('[data-key="' + ch + '"]');
        if (keyBtn) keyBtn.className = "wl-key " + result[c];
      }
    }
  }

  function refreshCurrentRow() {
    for (var c = 0; c < answer.length; c++) {
      var tile = document.getElementById("wl-t-" + rowIndex + "-" + c);
      var ch = current[c] || "";
      tile.textContent = ch;
      tile.className = "wl-tile" + (ch ? " filled" : "");
    }
  }

  function setMessage(text, color) {
    messageEl.textContent = text || "";
    messageEl.style.color = color || "#1a1a1b";
  }

  function handleKey(label) {
    if (over) return;
    if (label === "ENTER") return submitGuess();
    if (label === "DEL") { current = current.slice(0, -1); refreshCurrentRow(); return; }
    if (/^[A-Z]$/.test(label) && current.length < answer.length) {
      current += label;
      refreshCurrentRow();
    }
  }

  function submitGuess() {
    if (current.length !== answer.length) {
      setMessage("Need " + answer.length + " letters", "#b00020");
      return;
    }
    paintRow(rowIndex, current);
    if (mode === "daily") ensureDaily(subject).today.guesses.push(current);

    var win = (current === answer);
    if (win) {
      over = true;
      var res = (mode === "daily") ? dailyFinish(true, rowIndex + 1) : practiceFinish(true, rowIndex + 1);
      var pts = res ? res.points : 0;
      setMessage(mode === "daily"
        ? "Solved today's " + getSubject(subject).name + " Wordlet! +" + pts + " pts — back tomorrow."
        : "Correct! It's " + answer + "  +" + pts + " pts", "#6aaa64");
      announceBadges(res ? res.newBadges : []);
    } else {
      rowIndex++;
      current = "";
      if (rowIndex >= MAX_GUESSES) {
        over = true;
        var lost = (mode === "daily") ? dailyFinish(false, MAX_GUESSES) : practiceFinish(false, MAX_GUESSES);
        setMessage("Out of tries — the answer was " + answer, "#b00020");
        announceBadges(lost ? lost.newBadges : []);
      } else {
        setMessage("");
      }
    }
    if (mode === "daily") saveStats();
  }

  // ---- game setup ----
  function startPractice() {
    var terms = getTerms();
    var t = terms[Math.floor(Math.random() * terms.length)];
    answer = t.term;
    clueEl.textContent = t.clue;
    rowIndex = 0; current = ""; over = false; recorded = false; keyState = {};
    setMessage("");
    buildBoard();
    buildKeyboard();
  }

  function startDaily() {
    var d = ensureDaily(subject);
    var key = todayKey();
    if (d.today.date !== key) {
      d.today = { date: key, guesses: [], finished: false, won: false };
      saveStats();
    }
    var terms = getTerms();
    var t = terms[dailyIndex(key, terms.length)];
    answer = t.term;
    clueEl.textContent = t.clue;
    rowIndex = 0; current = ""; over = false; recorded = true; keyState = {};
    buildBoard();
    buildKeyboard();

    d.today.guesses.forEach(function (g) {
      if (g.length !== answer.length) return;
      paintRow(rowIndex, g);
      rowIndex++;
    });

    if (d.today.finished) {
      over = true;
      setMessage(d.today.won
        ? "You solved today's " + getSubject(subject).name + " Wordlet — come back tomorrow!"
        : "Today's word was " + answer + " — come back tomorrow.",
        d.today.won ? "#6aaa64" : "#b00020");
    } else {
      setMessage(d.today.guesses.length ? "Resumed today's puzzle." : "");
    }
  }

  function startGame() {
    if (mode === "daily") startDaily(); else startPractice();
  }

  function maybeAbandon() {
    if (mode === "practice" && !recorded && rowIndex > 0) practiceFinish(false, MAX_GUESSES);
  }

  function switchMode(m) {
    if (mode === "practice") maybeAbandon();
    mode = m; stats.mode = m; saveStats();
    updateModeUI();
    renderStats();
    startGame();
  }

  function switchSubject(id) {
    if (!SUBJECTS.some(function (s) { return s.id === id; })) return;
    maybeAbandon();
    subject = id; stats.subject = id; saveStats();
    updateModeUI();
    renderStats();
    startGame();
  }

  // ---- events ----
  document.getElementById("wl-mode-daily").addEventListener("click", function () { switchMode("daily"); });
  document.getElementById("wl-mode-practice").addEventListener("click", function () { switchMode("practice"); });
  document.getElementById("wl-subject-select").addEventListener("change", function (e) { switchSubject(e.target.value); });
  document.getElementById("wl-dir-to-target").addEventListener("click", function () { setDirection("to-target"); });
  document.getElementById("wl-dir-to-en").addEventListener("click", function () { setDirection("to-en"); });

  document.getElementById("wl-new").addEventListener("click", function () {
    if (mode !== "practice") return;
    maybeAbandon();
    startPractice();
  });

  document.getElementById("wl-reveal").addEventListener("click", function () {
    if (over) return;
    over = true;
    var lost = (mode === "daily") ? dailyFinish(false, rowIndex + 1) : practiceFinish(false, rowIndex + 1);
    setMessage("The answer was " + answer, "#b00020");
    announceBadges(lost ? lost.newBadges : []);
    if (mode === "daily") saveStats();
  });

  document.getElementById("wl-reset").addEventListener("click", function () {
    if (!window.confirm("Reset your score, streaks and badges?")) return;
    var keepMode = mode, keepSubject = subject;
    stats = freshStats();
    stats.mode = keepMode; stats.subject = keepSubject;
    saveStats();
    renderStats();
    renderBadges();
    showToast("Progress reset");
    startGame();
  });

  document.addEventListener("keydown", function (e) {
    if (over && e.key !== "Enter") return;
    if (e.key === "Enter") { handleKey("ENTER"); }
    else if (e.key === "Backspace") { handleKey("DEL"); }
    else if (/^[a-zA-Z]$/.test(e.key)) { handleKey(e.key.toUpperCase()); }
  });

  // ---- service worker (PWA) ----
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* ignore */ });
    });
  }

  // ---- init ----
  stats = loadStats();
  mode = stats.mode;
  subject = stats.subject;
  populateSubjects();
  updateModeUI();
  renderStats();
  renderBadges();
  startGame();
})();
