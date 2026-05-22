---
layout: default
title: Wordlet - CS Vocabulary Game
---

Read the **definition**, then guess the computer-science **term**. Each guess must be a real word of the right length. Tiles turn <span style="color:#6aaa64;font-weight:bold;">green</span> (right letter, right spot), <span style="color:#c9b458;font-weight:bold;">yellow</span> (right letter, wrong spot) or grey (not in the word). You get 6 tries.

{% raw %}
<div id="wordlet">
  <p id="wl-clue" class="wl-clue"></p>
  <div id="wl-board" class="wl-board"></div>
  <p id="wl-message" class="wl-message"></p>
  <div id="wl-keyboard" class="wl-keyboard"></div>
  <p class="wl-controls">
    <button id="wl-new" type="button">New word</button>
    <button id="wl-reveal" type="button">Give up</button>
  </p>
</div>

<style>
#wordlet { max-width: 520px; margin: 0 auto; font-family: inherit; }
#wordlet .wl-clue {
  font-size: 1.15em; line-height: 1.45; background: #f4f7f7;
  border-left: 4px solid #157878; padding: 12px 16px; border-radius: 4px;
  min-height: 1.2em;
}
#wordlet .wl-board { display: grid; gap: 6px; justify-content: center; margin: 14px 0; }
#wordlet .wl-row { display: grid; gap: 6px; justify-content: center; }
#wordlet .wl-tile {
  width: 48px; height: 48px; border: 2px solid #d3d6da; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6em; font-weight: 700; text-transform: uppercase; color: #1a1a1b;
  box-sizing: border-box; transition: transform .1s ease;
}
#wordlet .wl-tile.filled { border-color: #878a8c; transform: scale(1.04); }
#wordlet .wl-tile.correct { background: #6aaa64; border-color: #6aaa64; color: #fff; }
#wordlet .wl-tile.present { background: #c9b458; border-color: #c9b458; color: #fff; }
#wordlet .wl-tile.absent  { background: #787c7e; border-color: #787c7e; color: #fff; }
#wordlet .wl-message { text-align: center; font-weight: 700; min-height: 1.4em; margin: 8px 0; }
#wordlet .wl-keyboard { display: flex; flex-direction: column; gap: 6px; align-items: center; margin-top: 6px; }
#wordlet .wl-krow { display: flex; gap: 5px; justify-content: center; }
#wordlet .wl-key {
  min-width: 30px; height: 48px; padding: 0 8px; border: 0; border-radius: 4px;
  background: #d3d6da; color: #1a1a1b; font-weight: 700; font-size: .95em;
  cursor: pointer; text-transform: uppercase;
}
#wordlet .wl-key.wide { min-width: 56px; font-size: .75em; }
#wordlet .wl-key.correct { background: #6aaa64; color: #fff; }
#wordlet .wl-key.present { background: #c9b458; color: #fff; }
#wordlet .wl-key.absent  { background: #787c7e; color: #fff; }
#wordlet .wl-controls { text-align: center; margin-top: 14px; }
#wordlet .wl-controls button {
  margin: 0 6px; padding: 8px 16px; border: 0; border-radius: 4px;
  background: #157878; color: #fff; font-weight: 700; cursor: pointer;
}
#wordlet .wl-controls button:hover { background: #0f5c5c; }
@media (max-width: 480px) {
  #wordlet .wl-tile { width: 38px; height: 38px; font-size: 1.3em; }
  #wordlet .wl-key { min-width: 24px; height: 44px; padding: 0 5px; }
}
</style>

<script type="text/javascript">
(function () {
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

  var MAX_GUESSES = 6;
  var KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ENTER ZXCVBNM DEL"];

  var board = document.getElementById("wl-board");
  var keyboard = document.getElementById("wl-keyboard");
  var clueEl = document.getElementById("wl-clue");
  var messageEl = document.getElementById("wl-message");

  var answer = "";
  var rowIndex = 0;
  var current = "";
  var over = false;
  var keyState = {};

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
      setMessage("Correct! It's " + answer + " 🎉", "#6aaa64");
      return;
    }
    rowIndex++;
    current = "";
    if (rowIndex >= MAX_GUESSES) {
      over = true;
      setMessage("Out of tries — the answer was " + answer, "#b00020");
    } else {
      setMessage("");
    }
  }

  function newGame() {
    var t = pickTerm();
    answer = t.term;
    clueEl.textContent = t.clue;
    rowIndex = 0;
    current = "";
    over = false;
    keyState = {};
    setMessage("");
    buildBoard();
    buildKeyboard();
  }

  document.getElementById("wl-new").addEventListener("click", newGame);
  document.getElementById("wl-reveal").addEventListener("click", function () {
    if (over) return;
    over = true;
    setMessage("The answer was " + answer, "#b00020");
  });

  document.addEventListener("keydown", function (e) {
    if (over && e.key !== "Enter") return;
    if (e.key === "Enter") { handleKey("ENTER"); }
    else if (e.key === "Backspace") { handleKey("DEL"); }
    else if (/^[a-zA-Z]$/.test(e.key)) { handleKey(e.key.toUpperCase()); }
  });

  newGame();
})();
</script>
{% endraw %}
