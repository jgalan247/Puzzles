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
    { id: "highscore", icon: "💎", name: "High Scorer",  desc: "Reach 500 points",           test: function (s) { return s.score >= 500; } }
  ];

  var MAX_GUESSES = 6;
  var KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ENTER ZXCVBNM DEL"];
  var STORE_KEY = "wordlet.stats.v1";
  var DEFAULTS = { played: 0, wins: 0, streak: 0, best: 0, score: 0, badges: [] };

  var board = document.getElementById("wl-board");
  var keyboard = document.getElementById("wl-keyboard");
  var clueEl = document.getElementById("wl-clue");
  var messageEl = document.getElementById("wl-message");

  var answer = "";
  var rowIndex = 0;
  var current = "";
  var over = false;
  var recorded = true;
  var keyState = {};
  var stats;
  var toastTimer;

  // ---- persistence (degrades to in-memory if localStorage is unavailable) ----
  function loadStats() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        return {
          played: saved.played || 0,
          wins: saved.wins || 0,
          streak: saved.streak || 0,
          best: saved.best || 0,
          score: saved.score || 0,
          badges: saved.badges || []
        };
      }
    } catch (e) { /* ignore */ }
    return { played: 0, wins: 0, streak: 0, best: 0, score: 0, badges: [] };
  }

  function saveStats() {
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(stats)); } catch (e) { /* ignore */ }
  }

  // ---- rendering ----
  function renderStats() {
    document.getElementById("wl-score").textContent = stats.score;
    document.getElementById("wl-streak").textContent = stats.streak;
    document.getElementById("wl-best").textContent = stats.best;
    document.getElementById("wl-wins").textContent = stats.wins;
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
    if (recorded) return { points: 0, newBadges: [] };
    recorded = true;
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

  function announceBadges(newBadges) {
    if (newBadges && newBadges.length) {
      showToast("Badge unlocked: " + newBadges.map(function (b) { return b.icon + " " + b.name; }).join(", "));
    }
  }

  // ---- board / keyboard ----
  function pickTerm() {
    return TERMS[Math.floor(Math.random() * TERMS.length)];
  }

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

  function rank(state) {
    return { absent: 0, present: 1, correct: 2 }[state];
  }

  function submitGuess() {
    if (current.length !== answer.length) {
      setMessage("Need " + answer.length + " letters", "#b00020");
      return;
    }
    var result = scoreGuess(current);
    for (var c = 0; c < answer.length; c++) {
      var tile = document.getElementById("wl-t-" + rowIndex + "-" + c);
      tile.className = "wl-tile " + result[c];
      var ch = current[c];
      if (!keyState[ch] || rank(result[c]) > rank(keyState[ch])) {
        keyState[ch] = result[c];
        var keyBtn = keyboard.querySelector('[data-key="' + ch + '"]');
        if (keyBtn) keyBtn.className = "wl-key " + result[c];
      }
    }

    if (current === answer) {
      over = true;
      var res = recordResult(true, rowIndex + 1);
      setMessage("Correct! It's " + answer + "  +" + res.points + " pts", "#6aaa64");
      announceBadges(res.newBadges);
      return;
    }
    rowIndex++;
    current = "";
    if (rowIndex >= MAX_GUESSES) {
      over = true;
      var lost = recordResult(false, MAX_GUESSES);
      setMessage("Out of tries — the answer was " + answer, "#b00020");
      announceBadges(lost.newBadges);
    } else {
      setMessage("");
    }
  }

  function newGame() {
    // abandoning a started-but-unfinished game counts as a loss
    if (!recorded && rowIndex > 0) recordResult(false, MAX_GUESSES);

    var t = pickTerm();
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

  document.getElementById("wl-new").addEventListener("click", newGame);

  document.getElementById("wl-reveal").addEventListener("click", function () {
    if (over) return;
    over = true;
    var lost = recordResult(false, rowIndex + 1);
    setMessage("The answer was " + answer, "#b00020");
    announceBadges(lost.newBadges);
  });

  document.getElementById("wl-reset").addEventListener("click", function () {
    if (!window.confirm("Reset your score, streaks and badges?")) return;
    stats = { played: 0, wins: 0, streak: 0, best: 0, score: 0, badges: [] };
    saveStats();
    renderStats();
    renderBadges();
    showToast("Progress reset");
  });

  document.addEventListener("keydown", function (e) {
    if (over && e.key !== "Enter") return;
    if (e.key === "Enter") { handleKey("ENTER"); }
    else if (e.key === "Backspace") { handleKey("DEL"); }
    else if (/^[a-zA-Z]$/.test(e.key)) { handleKey(e.key.toUpperCase()); }
  });

  // ---- init ----
  stats = loadStats();
  renderStats();
  renderBadges();
  newGame();
})();
