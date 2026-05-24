(function () {
  // --- Content: edit this list to add or change CS terms (single words, A-Z) ---
  var TERMS = [
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
  ];

  // --- Badges: unlocked when test() first returns true after a game ends ---
  var BADGES = [
    { id: "first_win", icon: "🎉", name: "First Win",    desc: "Win your first game",        test: function (s, c) { return c.won && s.wins >= 1; } },
    { id: "ace",       icon: "🎯", name: "Ace",          desc: "Solve in a single guess",    test: function (s, c) { return c.won && c.guesses === 1; } },
    { id: "sharp",     icon: "⚡", name: "Sharp",        desc: "Solve in 2 guesses or fewer", test: function (s, c) { return c.won && c.guesses <= 2; } },
    { id: "streak3",   icon: "🔥", name: "On Fire",      desc: "Reach a 3-win streak",       test: function (s) { return s.streak >= 3; } },
    { id: "streak5",   icon: "🚀", name: "Unstoppable",  desc: "Reach a 5-win streak",       test: function (s) { return s.streak >= 5; } },
    { id: "streak10",  icon: "👑", name: "Legendary",    desc: "Reach a 10-win streak",      test: function (s) { return s.streak >= 10; } },
    { id: "scholar",   icon: "🎓", name: "Scholar",      desc: "Win 10 games in total",      test: function (s) { return s.wins >= 10; } },
    { id: "daily7",    icon: "📅", name: "Regular",      desc: "Solve the daily 7 days in a row", test: function (s) { return s.dailyStreak >= 7; } },
    { id: "highscore", icon: "💎", name: "High Scorer",  desc: "Reach 500 points",           test: function (s) { return s.score >= 500; } }
  ];

  var MAX_GUESSES = 6;
  var KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ENTER ZXCVBNM DEL"];
  var STORE_KEY = "wordlet.stats.v2";

  var board = document.getElementById("wl-board");
  var keyboard = document.getElementById("wl-keyboard");
  var clueEl = document.getElementById("wl-clue");
  var messageEl = document.getElementById("wl-message");

  var mode = "daily";
  var answer = "";
  var rowIndex = 0;
  var current = "";
  var over = false;
  var recorded = true;   // practice-mode guard against double-recording
  var keyState = {};
  var stats;
  var toastTimer;

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
  function dailyIndex(key) {
    var p = key.split("-").map(Number);
    var days = Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000);
    return ((days % TERMS.length) + TERMS.length) % TERMS.length;
  }

  // ---- persistence (degrades to in-memory if localStorage is unavailable) ----
  function freshStats() {
    return {
      played: 0, wins: 0, streak: 0, best: 0, score: 0, badges: [],
      dailyStreak: 0, dailyBest: 0, dailyLast: null,
      dailyToday: { date: null, guesses: [], finished: false, won: false },
      mode: "daily"
    };
  }

  function loadStats() {
    var s = freshStats();
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        ["played", "wins", "streak", "best", "score", "dailyStreak", "dailyBest"].forEach(function (k) {
          if (typeof o[k] === "number") s[k] = o[k];
        });
        if (Array.isArray(o.badges)) s.badges = o.badges;
        if (typeof o.dailyLast === "string") s.dailyLast = o.dailyLast;
        if (o.mode === "daily" || o.mode === "practice") s.mode = o.mode;
        if (o.dailyToday && typeof o.dailyToday === "object") {
          s.dailyToday = {
            date: typeof o.dailyToday.date === "string" ? o.dailyToday.date : null,
            guesses: Array.isArray(o.dailyToday.guesses) ? o.dailyToday.guesses : [],
            finished: !!o.dailyToday.finished,
            won: !!o.dailyToday.won
          };
        }
      }
    } catch (e) { /* ignore */ }
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
      document.getElementById("wl-streak").textContent = stats.dailyStreak;
      document.getElementById("wl-best").textContent = stats.dailyBest;
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

      var icon = document.createElement("span");
      icon.className = "wl-badge-icon";
      icon.textContent = b.icon;
      var name = document.createElement("span");
      name.className = "wl-badge-name";
      name.textContent = b.name;

      el.appendChild(icon);
      el.appendChild(name);
      list.appendChild(el);
    });
  }

  function updateModeUI() {
    document.getElementById("wl-mode-daily").classList.toggle("active", mode === "daily");
    document.getElementById("wl-mode-practice").classList.toggle("active", mode === "practice");
    document.getElementById("wl-new").style.display = (mode === "practice") ? "" : "none";
    var note = document.getElementById("wl-mode-note");
    note.textContent = (mode === "daily")
      ? "Daily puzzle for " + todayKey() + " — one word a day, the same for everyone."
      : "Practice — unlimited random words.";
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

  function updateDailyStreak(won, dateKey) {
    if (won) {
      stats.dailyStreak = (stats.dailyLast === shiftDate(dateKey, -1)) ? stats.dailyStreak + 1 : 1;
      stats.dailyLast = dateKey;
      if (stats.dailyStreak > stats.dailyBest) stats.dailyBest = stats.dailyStreak;
    } else {
      stats.dailyStreak = 0;
    }
  }

  function dailyFinish(won, guesses) {
    if (stats.dailyToday.finished) return null;
    stats.dailyToday.finished = true;
    stats.dailyToday.won = won;
    updateDailyStreak(won, stats.dailyToday.date);
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
          group.split("").forEach(function (ch) {
            krow.appendChild(makeKey(ch, false));
          });
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

  function rank(state) {
    return { absent: 0, present: 1, correct: 2 }[state];
  }

  function scoreGuess(guess) {
    var result = new Array(answer.length).fill("absent");
    var counts = {};
    var i, ch;
    for (i = 0; i < answer.length; i++) {
      ch = answer[i];
      counts[ch] = (counts[ch] || 0) + 1;
    }
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
    if (label === "DEL") {
      current = current.slice(0, -1);
      refreshCurrentRow();
      return;
    }
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
    if (mode === "daily") stats.dailyToday.guesses.push(current);

    var win = (current === answer);
    if (win) {
      over = true;
      var res = (mode === "daily") ? dailyFinish(true, rowIndex + 1) : practiceFinish(true, rowIndex + 1);
      var pts = res ? res.points : 0;
      setMessage(mode === "daily"
        ? "Solved today's Wordlet! +" + pts + " pts — back tomorrow."
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
    var t = TERMS[Math.floor(Math.random() * TERMS.length)];
    answer = t.term;
    clueEl.textContent = t.clue;
    rowIndex = 0;
    current = "";
    over = false;
    recorded = false;
    keyState = {};
    setMessage("");
    buildBoard();
    buildKeyboard();
  }

  function startDaily() {
    var key = todayKey();
    if (stats.dailyToday.date !== key) {
      stats.dailyToday = { date: key, guesses: [], finished: false, won: false };
      saveStats();
    }
    var t = TERMS[dailyIndex(key)];
    answer = t.term;
    clueEl.textContent = t.clue;
    rowIndex = 0;
    current = "";
    over = false;
    recorded = true;   // daily uses dailyToday.finished as its guard
    keyState = {};
    buildBoard();
    buildKeyboard();

    stats.dailyToday.guesses.forEach(function (g) {
      if (g.length !== answer.length) return;
      paintRow(rowIndex, g);
      rowIndex++;
    });

    if (stats.dailyToday.finished) {
      over = true;
      setMessage(stats.dailyToday.won
        ? "You solved today's Wordlet — come back tomorrow!"
        : "Today's word was " + answer + " — come back tomorrow.",
        stats.dailyToday.won ? "#6aaa64" : "#b00020");
    } else {
      setMessage(stats.dailyToday.guesses.length ? "Resumed today's puzzle." : "");
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
    mode = m;
    stats.mode = m;
    saveStats();
    updateModeUI();
    renderStats();
    startGame();
  }

  // ---- events ----
  document.getElementById("wl-mode-daily").addEventListener("click", function () { switchMode("daily"); });
  document.getElementById("wl-mode-practice").addEventListener("click", function () { switchMode("practice"); });

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
    var keepMode = mode;
    stats = freshStats();
    stats.mode = keepMode;
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

  // ---- init ----
  stats = loadStats();
  mode = stats.mode;
  updateModeUI();
  renderStats();
  renderBadges();
  startGame();
})();
