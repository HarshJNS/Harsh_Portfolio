const email = "harshrajj.work@gmail.com";
const phone = "+91 7765028008";
const linkedIn = "https://www.linkedin.com/in/harshrajjns";

const knowledge = [
  {
    keys: ["meetmind", "meeting", "memory", "rag", "chroma"],
    answer:
      "MeetMind is Harsh's AI meeting accountability product. It accepts audio or transcripts, extracts decisions, action items, owners, deadlines, unanswered questions, sentiment, summaries, and follow-up emails, then stores meetings in ChromaDB so users can ask questions across meeting history.",
  },
  {
    keys: ["resume", "ats", "analyzer", "job", "career"],
    answer:
      "AI Resume Analyzer is Harsh's ATS/job-match tool. It parses PDF/DOCX resumes, compares them with a job description, and returns ATS score, match score, skill score, missing skills, found keywords, strengths, and improvement suggestions.",
  },
  {
    keys: ["tubeai", "tube", "youtube", "summarizer", "video", "transcript"],
    answer:
      "TubeAI Summarizer turns YouTube videos into structured AI notes. It extracts transcripts, creates Gemini-powered summaries, key insights, action points, chapters, mind maps, downloadable reports, and transcript-aware chat.",
  },
  {
    keys: ["skills", "stack", "tech", "tools"],
    answer:
      "Harsh works across Python, JavaScript, TypeScript, React, Next.js, Node.js, Express, Flask, FastAPI, MongoDB, PostgreSQL, SQLite, Redis, ChromaDB, Docker, Kubernetes, GitHub Actions, Gemini, embeddings, Whisper, and API testing. His strength is turning AI workflows into reliable full-stack systems.",
  },
  {
    keys: ["contact", "email", "phone", "linkedin", "hire", "work"],
    answer:
      `You can reach Harsh at ${email}, ${phone}, or LinkedIn: ${linkedIn}. He is best aligned with AI systems, agentic workflows, automation tools, full-stack development, and zero-to-one builds.`,
  },
];

function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

const copyEmailBtn = document.getElementById("copyEmailBtn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;

  const now = new Date();
  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(now);

  clock.textContent = `Delhi ${time} · ${date}`;
}

updateClock();
window.setInterval(updateClock, 30000);

// Interactive dot field, adapted to the portfolio's active colour theme.
const dotsCanvas = document.getElementById("interactiveDots");
if (dotsCanvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const dotsContext = dotsCanvas.getContext("2d");
  const dotField = { dots: [], pointer: { x: -999, y: -999 }, time: 0 };
  const spacing = 34;

  const getThemeColours = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      background: styles.getPropertyValue("--bg").trim(),
      accent: styles.getPropertyValue("--accent-color").trim(),
    };
  };

  const resizeDotField = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    dotsCanvas.width = window.innerWidth * ratio;
    dotsCanvas.height = window.innerHeight * ratio;
    dotsCanvas.style.width = `${window.innerWidth}px`;
    dotsCanvas.style.height = `${window.innerHeight}px`;
    dotsContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    dotField.dots = [];
    for (let x = spacing / 2; x < window.innerWidth; x += spacing) {
      for (let y = spacing / 2; y < window.innerHeight; y += spacing) {
        dotField.dots.push({ x, y, phase: Math.random() * Math.PI * 2 });
      }
    }
  };

  const hexToRgb = (hex) => {
    const parsed = Number.parseInt(hex.slice(1), 16);
    return `${(parsed >> 16) & 255}, ${(parsed >> 8) & 255}, ${parsed & 255}`;
  };

  const drawDotField = () => {
    const { background, accent } = getThemeColours();
    const accentRgb = hexToRgb(accent);
    dotField.time += 0.012;
    dotsContext.fillStyle = background;
    dotsContext.fillRect(0, 0, window.innerWidth, window.innerHeight);

    dotField.dots.forEach((dot) => {
      const distance = Math.hypot(dot.x - dotField.pointer.x, dot.y - dotField.pointer.y);
      const influence = Math.max(0, 1 - distance / 160);
      const radius = 1.05 + influence * 3.1 + Math.sin(dotField.time + dot.phase) * 0.18;
      const opacity = 0.12 + influence * 0.44;
      dotsContext.beginPath();
      dotsContext.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      dotsContext.fillStyle = `rgba(${accentRgb}, ${opacity})`;
      dotsContext.fill();
    });
    window.requestAnimationFrame(drawDotField);
  };

  window.addEventListener("pointermove", (event) => {
    dotField.pointer.x = event.clientX;
    dotField.pointer.y = event.clientY;
  }, { passive: true });
  window.addEventListener("resize", resizeDotField);
  resizeDotField();
  drawDotField();
}

// A lightweight, dependency-free 3D tilt for cards that keeps the portfolio's visual style intact.
const canTiltCards = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canTiltCards) {
  document.querySelectorAll(".project, .skill-list article").forEach((card) => {
    card.classList.add("tilt-card");

    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width;
      const vertical = (event.clientY - bounds.top) / bounds.height;
      const tiltX = (0.5 - vertical) * 7;
      const tiltY = (horizontal - 0.5) * 7;

      card.style.setProperty("--tilt-x", `${tiltX}deg`);
      card.style.setProperty("--tilt-y", `${tiltY}deg`);
      card.style.setProperty("--glow-x", `${horizontal * 100}%`);
      card.style.setProperty("--glow-y", `${vertical * 100}%`);
      card.classList.add("is-tilting");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.classList.remove("is-tilting");
    });
  });
}

const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gamerCursor = document.getElementById("gamerCursor");
if (canUseCustomCursor && gamerCursor) {
  const cursorTarget = { x: -100, y: -100 };
  const cursorPosition = { x: -100, y: -100 };
  document.body.classList.add("has-custom-cursor");

  const renderCursor = () => {
    cursorPosition.x += (cursorTarget.x - cursorPosition.x) * 0.22;
    cursorPosition.y += (cursorTarget.y - cursorPosition.y) * 0.22;
    gamerCursor.style.left = `${cursorPosition.x}px`;
    gamerCursor.style.top = `${cursorPosition.y}px`;
    window.requestAnimationFrame(renderCursor);
  };

  window.addEventListener("pointermove", (event) => {
    cursorTarget.x = event.clientX;
    cursorTarget.y = event.clientY;
    gamerCursor.classList.add("is-visible");
  }, { passive: true });
  window.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget) gamerCursor.classList.remove("is-visible");
  });
  document.addEventListener("pointerover", (event) => {
    gamerCursor.classList.toggle("is-active", Boolean(event.target.closest("a, button, input, textarea, select, [role='button']")));
  });
  renderCursor();
}

const sideDock = document.getElementById("sideDock");
const sideDockToggle = document.getElementById("sideDockToggle");
if (sideDock && sideDockToggle) {
  const commandSearch = document.getElementById("commandSearch");
  const commandItems = [...sideDock.querySelectorAll(".command-item")];
  let activeCommandIndex = 0;

  const setSideDockOpen = (isOpen) => {
    sideDock.classList.toggle("is-open", isOpen);
    sideDock.setAttribute("aria-hidden", String(!isOpen));
    sideDockToggle.setAttribute("aria-expanded", String(isOpen));
    sideDockToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    if (isOpen) {
      setActiveCommand(0);
      window.setTimeout(() => commandSearch?.focus(), 0);
    }
  };

  const setActiveCommand = (index) => {
    const visibleItems = commandItems.filter((item) => !item.hidden);
    if (!visibleItems.length) return;
    activeCommandIndex = (index + visibleItems.length) % visibleItems.length;
    commandItems.forEach((item) => item.classList.remove("is-active"));
    visibleItems[activeCommandIndex].classList.add("is-active");
    visibleItems[activeCommandIndex].scrollIntoView({ block: "nearest" });
  };

  commandSearch?.addEventListener("input", () => {
    const query = commandSearch.value.trim().toLowerCase();
    commandItems.forEach((item) => {
      item.hidden = !item.dataset.command.includes(query) && !item.textContent.toLowerCase().includes(query);
    });
    setActiveCommand(0);
  });

  commandSearch?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveCommand(activeCommandIndex + 1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveCommand(activeCommandIndex - 1);
    }
    if (event.key === "Enter") {
      const visibleItems = commandItems.filter((item) => !item.hidden);
      visibleItems[activeCommandIndex]?.click();
    }
  });

  sideDockToggle.addEventListener("click", () => {
    setSideDockOpen(!sideDock.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setSideDockOpen(!sideDock.classList.contains("is-open"));
    }
    if (event.key === "Escape") setSideDockOpen(false);
  });

  sideDock.addEventListener("click", (event) => {
    if (event.target === sideDock) setSideDockOpen(false);
  });

  sideDock.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setSideDockOpen(false));
  });
}

const askForm = document.getElementById("askForm");
if (askForm) {
  askForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("questionInput");
    const answerBox = document.getElementById("answerBox");
    const question = input.value.trim().toLowerCase();

    if (!question) {
      answerBox.textContent = "Ask about MeetMind, Resume Analyzer, Harsh's skills, or contact details.";
      return;
    }

    const match = knowledge.find((item) => item.keys.some((key) => question.includes(key)));
    answerBox.textContent = match
      ? match.answer
    : "Harsh builds AI product systems and agentic workflows. His strongest examples right now are MeetMind, TubeAI Summarizer, and AI Resume Analyzer. Ask about any project for a more specific answer.";
    input.value = "";
  });
}

// Initialize theme on DOMContentLoaded to align body attribute
document.addEventListener("DOMContentLoaded", () => {
  const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
  document.body.setAttribute("data-theme", initialTheme);

  // --- THEME TOGGLE & RIPPLE ANIMATION ---
  const themeToggle = document.getElementById("themeToggle");
  const themeRipple = document.getElementById("themeRipple");
  
  if (themeToggle && themeRipple) {
    themeToggle.addEventListener("click", (e) => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      // Get pointer click coordinates (fall back to screen center if keyboard activated)
      const x = e.clientX || window.innerWidth / 2;
      const y = e.clientY || window.innerHeight / 2;
      
      // Prevent double triggers during animation
      if (themeRipple.classList.contains("animating")) return;
      
      // Get the background color of the target theme
      const nextBg = newTheme === "light" ? "#f7f7f5" : "#050505";
      
      // Set ripple start state
      themeRipple.style.backgroundColor = nextBg;
      themeRipple.style.clipPath = `circle(0% at ${x}px ${y}px)`;
      themeRipple.classList.add("animating");
      
      // Force layout reflow
      themeRipple.offsetWidth;
      
      // Calculate target radius to cover entire screen
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      
      // Animate circular expansion
      themeRipple.style.clipPath = `circle(${radius * 1.2}px at ${x}px ${y}px)`;
      
      // Clean up after transition
      const onTransitionEnd = (event) => {
        if (event.propertyName === "clip-path" || event.propertyName === "clipPath") {
          // Commit the theme change to DOM
          document.documentElement.setAttribute("data-theme", newTheme);
          document.body.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
          
          // Reset ripple layer
          themeRipple.classList.remove("animating");
          themeRipple.style.clipPath = "circle(0% at 0px 0px)";
          themeRipple.removeEventListener("transitionend", onTransitionEnd);
        }
      };
      
      themeRipple.addEventListener("transitionend", onTransitionEnd);
    });
  }

});
