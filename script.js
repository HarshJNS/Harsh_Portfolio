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

const aboutTimeline = document.getElementById("aboutTimeline");
if (aboutTimeline) {
  const timelineProgress = aboutTimeline.querySelector(".timeline-progress");
  const timelineMarker = aboutTimeline.querySelector(".timeline-marker");
  const updateTimelineProgress = () => {
    const bounds = aboutTimeline.getBoundingClientRect();
    const travel = Math.max(1, bounds.height - window.innerHeight * 0.38);
    const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.42 - bounds.top) / travel));
    const percentage = `${progress * 100}%`;
    timelineProgress.style.height = percentage;
    timelineMarker.style.top = percentage;
  };
  window.addEventListener("scroll", updateTimelineProgress, { passive: true });
  window.addEventListener("resize", updateTimelineProgress);
  updateTimelineProgress();
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

  // --- 3D TACTICAL GLOBE ---
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;

  class TacticalGlobe {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      this.options = Object.assign({
        dataUrl: "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        oceanColor: "#080808",
        landFill: "rgba(255, 255, 255, 0.08)",
        landStroke: "rgba(255, 255, 255, 0.16)",
        strokeWidth: 0.5,
        glowColor: "#168f4b",
        glowIntensity: 0.35,
        autoRotate: true,
        autoRotateSpeed: 4.5,
        initialLambda: 78.9629, // India longitude
        initialPhi: 20.5937,   // India latitude
        initialGamma: 0,
        markers: [
          { label: "India", lat: 20.5937, lng: 78.9629 },
          { label: "UK", lat: 51.5074, lng: -0.1278 },
          { label: "USA", lat: 40.7128, lng: -74.0060 }
        ]
      }, options);

      // Centered initially on India
      this.lambda = this.options.initialLambda;
      this.phi = this.options.initialPhi;
      this.gamma = this.options.initialGamma;

      this.baseLambda = this.lambda;
      this.basePhi = this.phi;
      this.hoverOffset = { lambda: 0, phi: 0 };
      this.isHovered = false;

      this.targetLambda = this.lambda;
      this.targetPhi = this.phi;
      this.isTransitioning = false;

      this.isDragging = false;
      this.dragStart = { x: 0, y: 0 };
      this.dragStartRot = { lambda: 0, phi: 0 };
      this.userInteractedTime = 0;

      this.features = [];
      this.width = 300;
      this.height = 250;
      this.R = 100;
      this.cx = 150;
      this.cy = 125;

      this.init();
    }

    async init() {
      this.setupSvg();
      this.resize();
      this.setupEvents();
      
      try {
        const response = await fetch(this.options.dataUrl);
        if (!response.ok) throw new Error("Globe fetch failed");
        const topo = await response.json();
        this.features = this.decodeTopoJson(topo);
        this.render();
        this.animate();
      } catch (err) {
        console.error("TacticalGlobe load failed:", err);
        this.container.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:11px;color:rgba(255,107,107,0.7);flex-direction:column;gap:6px;">
            <span>Map data unavailable</span>
            <span style="font-size:9px;opacity:0.6;">Check connection</span>
          </div>`;
      }
    }

    setupSvg() {
      this.container.innerHTML = "";
      
      this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.svg.setAttribute("style", "display:block;width:100%;height:100%;cursor:grab;touch-action:none;user-select:none;");
      this.container.appendChild(this.svg);
      
      const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
      style.textContent = `
        .mm-c { transition: fill 140ms ease; }
        .mm-c:hover { filter: brightness(1.2); }
        @keyframes mm-pulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.6); opacity: 0.05; }
        }
        .mm-pulse {
          animation: mm-pulse 2.4s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `;
      this.svg.appendChild(style);

      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      this.svg.appendChild(defs);

      this.gAtm = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
      this.gAtm.setAttribute("id", "gAtm");
      this.gAtm.setAttribute("cx", "50%");
      this.gAtm.setAttribute("cy", "50%");
      this.gAtm.setAttribute("r", "50%");
      defs.appendChild(this.gAtm);

      this.gO = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      this.gO.setAttribute("id", "gO");
      this.gO.setAttribute("x1", "0%");
      this.gO.setAttribute("y1", "0%");
      this.gO.setAttribute("x2", "100%");
      this.gO.setAttribute("y2", "100%");
      defs.appendChild(this.gO);
      
      const gShade = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
      gShade.setAttribute("id", "gShade");
      gShade.setAttribute("cx", "38%");
      gShade.setAttribute("cy", "32%");
      gShade.setAttribute("r", "78%");
      gShade.innerHTML = `
        <stop offset="0%" stop-color="rgba(255,255,255,0.12)" />
        <stop offset="55%" stop-color="rgba(255,255,255,0)" />
        <stop offset="92%" stop-color="rgba(0,0,0,0.32)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.55)" />
      `;
      defs.appendChild(gShade);

      this.clipDisc = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
      this.clipDisc.setAttribute("id", "clipDisc");
      this.clipCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.clipDisc.appendChild(this.clipCircle);
      defs.appendChild(this.clipDisc);

      this.atmosphereCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.atmosphereCircle.setAttribute("fill", "url(#gAtm)");
      this.atmosphereCircle.setAttribute("pointer-events", "none");
      this.svg.appendChild(this.atmosphereCircle);

      this.oceanCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.oceanCircle.setAttribute("fill", this.options.oceanColor);
      this.svg.appendChild(this.oceanCircle);

      this.oceanGradientCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.oceanGradientCircle.setAttribute("fill", "url(#gO)");
      this.svg.appendChild(this.oceanGradientCircle);

      this.clipGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      this.clipGroup.setAttribute("clip-path", "url(#clipDisc)");
      this.svg.appendChild(this.clipGroup);

      this.gridPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      this.gridPath.setAttribute("fill", "none");
      this.gridPath.setAttribute("stroke", "rgba(255, 255, 255, 0.08)");
      this.gridPath.setAttribute("stroke-width", "0.5");
      this.gridPath.setAttribute("pointer-events", "none");
      this.clipGroup.appendChild(this.gridPath);

      this.countriesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      this.clipGroup.appendChild(this.countriesGroup);

      this.shadeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.shadeCircle.setAttribute("fill", "url(#gShade)");
      this.shadeCircle.setAttribute("pointer-events", "none");
      this.svg.appendChild(this.shadeCircle);

      this.edgeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.edgeCircle.setAttribute("fill", "none");
      this.edgeCircle.setAttribute("stroke", this.options.glowColor);
      this.edgeCircle.setAttribute("stroke-opacity", "0.2");
      this.edgeCircle.setAttribute("stroke-width", "1");
      this.edgeCircle.setAttribute("pointer-events", "none");
      this.svg.appendChild(this.edgeCircle);

      this.markersGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      this.svg.appendChild(this.markersGroup);
    }

    resize() {
      const rect = this.container.getBoundingClientRect();
      this.width = rect.width || 300;
      this.height = rect.height || 280;
      this.cx = this.width / 2;
      this.cy = this.height / 2;
      this.R = Math.max(30, Math.min(this.width, this.height) / 2 - 12);

      this.svg.setAttribute("width", this.width);
      this.svg.setAttribute("height", this.height);
      this.svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);

      this.atmosphereCircle.setAttribute("cx", this.cx);
      this.atmosphereCircle.setAttribute("cy", this.cy);
      this.atmosphereCircle.setAttribute("r", this.R + 40);

      this.oceanCircle.setAttribute("cx", this.cx);
      this.oceanCircle.setAttribute("cy", this.cy);
      this.oceanCircle.setAttribute("r", this.R);

      this.oceanGradientCircle.setAttribute("cx", this.cx);
      this.oceanGradientCircle.setAttribute("cy", this.cy);
      this.oceanGradientCircle.setAttribute("r", this.R);

      this.clipCircle.setAttribute("cx", this.cx);
      this.clipCircle.setAttribute("cy", this.cy);
      this.clipCircle.setAttribute("r", this.R);

      this.shadeCircle.setAttribute("cx", this.cx);
      this.shadeCircle.setAttribute("cy", this.cy);
      this.shadeCircle.setAttribute("r", this.R);

      this.edgeCircle.setAttribute("cx", this.cx);
      this.edgeCircle.setAttribute("cy", this.cy);
      this.edgeCircle.setAttribute("r", this.R);

      this.gAtm.innerHTML = `
        <stop offset="0%" stop-color="${this.options.glowColor}" stop-opacity="0" />
        <stop offset="${(this.R / (this.R + 40) * 100).toFixed(1)}%" stop-color="${this.options.glowColor}" stop-opacity="0" />
        <stop offset="${((this.R + 4) / (this.R + 40) * 100).toFixed(1)}%" stop-color="${this.options.glowColor}" stop-opacity="${0.22 * this.options.glowIntensity}" />
        <stop offset="100%" stop-color="${this.options.glowColor}" stop-opacity="0" />
      `;

      this.gO.innerHTML = `
        <stop offset="0%" stop-color="#14181a" stop-opacity="0.35" />
        <stop offset="50%" stop-color="#0c0e10" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#050608" stop-opacity="0.3" />
      `;
      
      this.render();
    }

    setupEvents() {
      this.svg.addEventListener("pointerdown", e => {
        this.isDragging = true;
        this.isTransitioning = false;
        this.dragStart.x = e.clientX;
        this.dragStart.y = e.clientY;
        this.dragStartRot.lambda = this.baseLambda;
        this.dragStartRot.phi = this.basePhi;
        this.svg.style.cursor = "grabbing";
        try { this.svg.setPointerCapture(e.pointerId); } catch(err) {}
      });

      this.svg.addEventListener("pointermove", e => {
        const rect = this.svg.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        const dx = mx - this.cx;
        const dy = my - this.cy;
        const dist = Math.hypot(dx, dy);

        if (this.isDragging) {
          const dragDx = e.clientX - this.dragStart.x;
          const dragDy = e.clientY - this.dragStart.y;
          
          const sens = 0.35;
          this.baseLambda = this.dragStartRot.lambda - dragDx * sens;
          this.basePhi = Math.max(-85, Math.min(85, this.dragStartRot.phi + dragDy * sens));
          this.lambda = this.baseLambda;
          this.phi = this.basePhi;
          return;
        }

        // Pointer hover tracking
        if (dist < this.R + 30) {
          this.isHovered = true;
          this.hoverOffset.lambda = -(dx / (this.R + 30)) * 25;
          this.hoverOffset.phi = (dy / (this.R + 30)) * 20;
          this.userInteractedTime = Date.now();
        } else {
          this.isHovered = false;
          this.hoverOffset.lambda = 0;
          this.hoverOffset.phi = 0;
        }
      });

      const endDrag = e => {
        if (!this.isDragging) return;
        
        // Click-to-center hit test
        const dragDx = Math.abs(e.clientX - this.dragStart.x);
        const dragDy = Math.abs(e.clientY - this.dragStart.y);
        
        if (dragDx < 5 && dragDy < 5) {
          const rect = this.svg.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;
          
          const ll = this.unproject(mx, my, this.lambda, this.phi, this.gamma, this.R, this.cx, this.cy);
          if (ll) {
            this.rotateTo(ll.lng, ll.lat);
          }
        }

        this.isDragging = false;
        this.userInteractedTime = Date.now();
        this.svg.style.cursor = "grab";
        try { this.svg.releasePointerCapture(e.pointerId); } catch(err) {}
      };

      this.svg.addEventListener("pointerup", endDrag);
      this.svg.addEventListener("pointercancel", endDrag);
      this.svg.addEventListener("pointerleave", () => {
        this.isHovered = false;
        this.hoverOffset.lambda = 0;
        this.hoverOffset.phi = 0;
      });

      window.addEventListener("resize", () => this.resize());
    }

    rotateTo(lng, lat) {
      this.targetLambda = lng;
      this.targetPhi = lat;
      this.isTransitioning = true;
    }

    unproject(px, py, lambda, phi, gamma, R, cx, cy) {
      const Ry = (px - cx) / R;
      const Rz = -(py - cy) / R;
      const r2 = Ry * Ry + Rz * Rz;
      if (r2 > 1) return null;
      
      const cg = Math.cos(gamma * D2R);
      const sg = Math.sin(gamma * D2R);
      const y1 = Ry * cg + Rz * sg;
      const z1 = -Ry * sg + Rz * cg;
      
      const x1 = Math.sqrt(Math.max(0, 1 - r2));
      
      const cp = Math.cos(phi * D2R);
      const sp = Math.sin(phi * D2R);
      const x0 = x1 * cp - z1 * sp;
      const y0 = y1;
      const z0 = x1 * sp + z1 * cp;
      
      const lat = Math.asin(Math.max(-1, Math.min(1, z0))) * R2D;
      let lng = Math.atan2(y0, x0) * R2D + lambda;
      lng = ((lng + 180) % 360 + 360) % 360 - 180;
      return { lng, lat };
    }

    project(lng, lat, lambda, phi, gamma, R, cx, cy) {
      const lr = (lng - lambda) * D2R;
      const la = lat * D2R;
      const cl = Math.cos(la);
      const x0 = cl * Math.cos(lr);
      const y0 = cl * Math.sin(lr);
      const z0 = Math.sin(la);
      const cp = Math.cos(phi * D2R);
      const sp = Math.sin(phi * D2R);
      const x1 = x0 * cp + z0 * sp;
      const y1 = y0;
      const z1 = -x0 * sp + z0 * cp;
      const cg = Math.cos(gamma * D2R);
      const sg = Math.sin(gamma * D2R);
      const rx = x1;
      const ry = y1 * cg - z1 * sg;
      const rz = y1 * sg + z1 * cg;
      return {
        sx: cx + R * ry,
        sy: cy - R * rz,
        rx, ry, rz,
        v: rx >= 0
      };
    }

    limbIntersect(a, b, R, cx, cy) {
      const dr = a.rx - b.rx;
      if (Math.abs(dr) < 1e-12) return null;
      const t = a.rx / dr;
      if (t < 0 || t > 1) return null;
      let ry = a.ry + t * (b.ry - a.ry);
      let rz = a.rz + t * (b.rz - a.rz);
      const norm = Math.sqrt(ry * ry + rz * rz);
      if (norm < 1e-9) return null;
      ry /= norm;
      rz /= norm;
      return { sx: cx + R * ry, sy: cy - R * rz, rx: 0, ry, rz, v: true };
    }

    ringToSegments(ring, lambda, phi, gamma, R, cx, cy) {
      const n = ring.length;
      if (n < 3) return [];
      const proj = new Array(n);
      let visCount = 0;
      for (let i = 0; i < n; i++) {
        const p = ring[i];
        proj[i] = this.project(p[0], p[1], lambda, phi, gamma, R, cx, cy);
        if (proj[i].v) visCount++;
      }
      if (visCount === 0) return [];
      if (visCount === n) return [proj.slice()];

      let startIdx = -1;
      for (let i = 0; i < n; i++) {
        if (!proj[i].v && proj[(i + 1) % n].v) {
          startIdx = i;
          break;
        }
      }
      if (startIdx === -1) return [proj.slice()];

      const segments = [];
      let cur = [];
      for (let k = 0; k < n; k++) {
        const i = (startIdx + k) % n;
        const j = (startIdx + k + 1) % n;
        const A = proj[i];
        const B = proj[j];
        if (A.v && B.v) {
          cur.push(B);
        } else if (A.v && !B.v) {
          const inter = this.limbIntersect(A, B, this.R, this.cx, this.cy);
          if (inter) cur.push(inter);
          if (cur.length >= 2) segments.push(cur);
          cur = [];
        } else if (!A.v && B.v) {
          const inter = this.limbIntersect(A, B, this.R, this.cx, this.cy);
          if (inter) cur.push(inter);
          cur.push(B);
        }
      }
      return segments;
    }

    segmentsToPath(segs) {
      if (segs.length === 0) return "";
      let out = "";
      for (const seg of segs) {
        for (let i = 0; i < seg.length; i++) {
          const p = seg[i];
          out += (i === 0 ? "M" : "L") + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
        }
        out += "Z";
      }
      return out;
    }

    buildSphericalPath(type, coords, lambda, phi, gamma, R, cx, cy) {
      if (!coords) return "";
      if (type === "Polygon") {
        let out = "";
        for (const ring of coords) {
          out += this.segmentsToPath(this.ringToSegments(ring, lambda, phi, gamma, R, cx, cy));
        }
        return out;
      }
      if (type === "MultiPolygon") {
        let out = "";
        for (const poly of coords) {
          for (const ring of poly) {
            out += this.segmentsToPath(this.ringToSegments(ring, lambda, phi, gamma, R, cx, cy));
          }
        }
        return out;
      }
      return "";
    }

    buildGraticule(lambda, phi, gamma, R, cx, cy) {
      let out = "";
      for (let lat = -60; lat <= 60; lat += 30) {
        let started = false;
        let prev = null;
        for (let lng = -180; lng <= 180; lng += 4) {
          const p = this.project(lng, lat, lambda, phi, gamma, R, cx, cy);
          if (p.v) {
            if (!started || (prev && !prev.v)) {
              out += "M" + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
              started = true;
            } else {
              out += "L" + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
            }
          }
          prev = p;
        }
      }
      for (let lng = -180; lng < 180; lng += 30) {
        let started = false;
        let prev = null;
        for (let lat = -80; lat <= 80; lat += 4) {
          const p = this.project(lng, lat, lambda, phi, gamma, R, cx, cy);
          if (p.v) {
            if (!started || (prev && !prev.v)) {
              out += "M" + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
              started = true;
            } else {
              out += "L" + p.sx.toFixed(1) + "," + p.sy.toFixed(1);
            }
          }
          prev = p;
        }
      }
      return out;
    }

    decodeTopoJson(topo) {
      const transform = topo.transform;
      const scale = transform ? transform.scale : [1, 1];
      const translate = transform ? transform.translate : [0, 0];
      
      const arcs = topo.arcs.map(arc => {
        let x = 0, y = 0;
        return arc.map(p => {
          x += p[0];
          y += p[1];
          return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
        });
      });

      const resolveRing = ringIndices => {
        const ring = [];
        for (const idx of ringIndices) {
          const a = idx >= 0 ? arcs[idx] : arcs[~idx].slice().reverse();
          for (let j = ring.length > 0 ? 1 : 0; j < a.length; j++) {
            ring.push(a[j]);
          }
        }
        return ring;
      };

      const geometries = topo.objects.countries.geometries;
      return geometries.map(g => {
        let coords = null;
        if (g.type === "Polygon") {
          coords = g.arcs.map(r => resolveRing(r));
        } else if (g.type === "MultiPolygon") {
          coords = g.arcs.map(poly => poly.map(r => resolveRing(r)));
        }
        return {
          id: String(g.id ?? ""),
          type: g.type,
          coords: coords
        };
      });
    }

    renderMarkers() {
      this.markersGroup.innerHTML = "";
      this.options.markers.forEach((m, idx) => {
        const p = this.project(m.lng, m.lat, this.lambda, this.phi, this.gamma, this.R, this.cx, this.cy);
        if (p.v) {
          const fade = Math.max(0, Math.min(1, p.rx * 4));
          
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.setAttribute("transform", `translate(${p.sx.toFixed(1)}, ${p.sy.toFixed(1)})`);
          g.setAttribute("style", `opacity: ${fade}; cursor: pointer;`);
          
          const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          pulse.setAttribute("class", "mm-pulse");
          pulse.setAttribute("r", "7");
          pulse.setAttribute("fill", this.options.glowColor);
          pulse.setAttribute("fill-opacity", "0.55");
          g.appendChild(pulse);

          const outer = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          outer.setAttribute("r", "10");
          outer.setAttribute("fill", this.options.glowColor);
          outer.setAttribute("fill-opacity", "0.14");
          g.appendChild(outer);

          const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          core.setAttribute("r", "4.2");
          core.setAttribute("fill", this.options.glowColor);
          g.appendChild(core);

          const spec = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          spec.setAttribute("cx", "-1.2");
          spec.setAttribute("cy", "-1.2");
          spec.setAttribute("r", "1.2");
          spec.setAttribute("fill", "rgba(255, 255, 255, 0.7)");
          g.appendChild(spec);

          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", "11");
          text.setAttribute("y", "3.5");
          text.setAttribute("fill", "#e7ece9");
          text.setAttribute("font-size", "9.5");
          text.setAttribute("font-weight", "600");
          text.setAttribute("letter-spacing", "0.04em");
          text.setAttribute("stroke", this.options.oceanColor);
          text.setAttribute("stroke-width", "3");
          text.setAttribute("paint-order", "stroke");
          text.setAttribute("style", "pointer-events:none; user-select:none; font-family: Outfit, sans-serif;");
          text.textContent = m.label;
          g.appendChild(text);

          this.markersGroup.appendChild(g);
        }
      });
    }

    render() {
      if (!this.features.length) return;
      
      if (this.countriesGroup.childElementCount === 0) {
        this.countryPaths = new Map();
        this.features.forEach(c => {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("class", "mm-c");
          path.setAttribute("fill", this.options.landFill);
          path.setAttribute("stroke", this.options.landStroke);
          path.setAttribute("stroke-width", this.options.strokeWidth);
          path.setAttribute("vector-effect", "non-scaling-stroke");
          this.countriesGroup.appendChild(path);
          this.countryPaths.set(c.id, path);
        });
      }

      this.features.forEach(c => {
        const d = this.buildSphericalPath(c.type, c.coords, this.lambda, this.phi, this.gamma, this.R, this.cx, this.cy);
        const path = this.countryPaths.get(c.id);
        if (path) path.setAttribute("d", d);
      });

      this.gridPath.setAttribute("d", this.buildGraticule(this.lambda, this.phi, this.gamma, this.R, this.cx, this.cy));
      this.renderMarkers();
    }

    animate() {
      let lastTime = performance.now();
      
      const step = now => {
        const dt = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;

        if (this.isTransitioning) {
          const dx = this.targetLambda - this.baseLambda;
          const dy = this.targetPhi - this.basePhi;

          let ndx = ((dx + 180) % 360 + 360) % 360 - 180;

          this.baseLambda += ndx * 0.08;
          this.basePhi += dy * 0.08;

          if (Math.abs(ndx) < 0.1 && Math.abs(dy) < 0.1) {
            this.baseLambda = this.targetLambda;
            this.basePhi = this.targetPhi;
            this.isTransitioning = false;
            this.userInteractedTime = Date.now();
          }
          
          this.lambda = this.baseLambda;
          this.phi = this.basePhi;
          this.render();
        } else {
          if (this.options.autoRotate && !this.isDragging) {
            const sinceUser = Date.now() - this.userInteractedTime;
            if (sinceUser > 1500) {
              this.baseLambda += this.options.autoRotateSpeed * dt;
            }
          }

          if (this.isDragging) {
            this.render();
          } else {
            const targetL = this.baseLambda + this.hoverOffset.lambda;
            const targetP = this.basePhi + this.hoverOffset.phi;
            
            const diffL = targetL - this.lambda;
            const diffP = targetP - this.phi;

            this.lambda += diffL * 0.1;
            this.phi += diffP * 0.1;
            
            this.render();
          }
        }
        
        requestAnimationFrame(step);
      };
      
      requestAnimationFrame(step);
    }
  }

  // Initialize Globe
  const globe = new TacticalGlobe("globe-container");
  
  // Set up timezone pills click handlers
  const pills = document.querySelectorAll(".tz-pill");
  const activeCountryText = document.getElementById("active-country");
  
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      
      const lat = parseFloat(pill.getAttribute("data-lat"));
      const lng = parseFloat(pill.getAttribute("data-lng"));
      const label = pill.getAttribute("data-label");
      
      // Rotate globe to focus on clicked location
      if (globe) {
        globe.rotateTo(lng, lat);
      }
      
      // Update active country label
      if (activeCountryText) {
        activeCountryText.textContent = label;
      }
    });
  });

  // Timezone live clocks
  function updateTimezoneClocks() {
    pills.forEach(pill => {
      const tz = pill.getAttribute("data-tz");
      let tzId = "Asia/Kolkata";
      if (tz === "UK") tzId = "Europe/London";
      if (tz === "USA") tzId = "America/New_York";
      
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: tzId,
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }).format(new Date());
        
        const timeSpan = pill.querySelector(".tz-time");
        if (timeSpan) {
          timeSpan.textContent = timeStr;
        }
      } catch (err) {
        console.error("Failed to format timezone clock:", err);
      }
    });
  }
  
  updateTimezoneClocks();
  setInterval(updateTimezoneClocks, 20000); // update every 20 seconds

});
