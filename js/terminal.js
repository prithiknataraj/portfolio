// Live typing terminal — 4 lines only
(function () {
  const terminal = document.getElementById("dev-terminal");
  const output = document.getElementById("terminal-output");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lines = [
    { text: "$ whoami", delay: 45 },
    { text: "prithik-nataraj · software-developer @ avalara", delay: 28, class: "terminal__line--accent" },
    { text: "● Pune · python · sql · aws · react", delay: 30, class: "terminal__line--success" },
    { text: "$ scroll ↓ for projects & resume_", delay: 35, class: "terminal__line--muted" },
  ];

  if (!terminal || !output) return;

  if (reduced) {
    output.innerHTML = lines
      .map((l) => `<div class="terminal__line ${l.class || ""}">${l.text}</div>`)
      .join("");
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = null;

  function typeNext() {
    if (lineIndex >= lines.length) return; // stop after 4 lines — no loop

    const line = lines[lineIndex];

    if (!currentLine) {
      currentLine = document.createElement("div");
      currentLine.className = `terminal__line ${line.class || ""}`;
      output.appendChild(currentLine);
      charIndex = 0;
    }

    if (charIndex < line.text.length) {
      currentLine.textContent += line.text[charIndex];
      charIndex++;
      setTimeout(typeNext, line.delay);
    } else {
      currentLine = null;
      lineIndex++;
      setTimeout(typeNext, 450);
    }
  }

  setTimeout(typeNext, 600);
})();
