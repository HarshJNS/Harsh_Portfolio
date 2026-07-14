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
      "Harsh builds with Python, Flask, FastAPI, React, JavaScript, SQLite, ChromaDB, Gemini, embeddings, Whisper, AssemblyAI, PDF/DOCX parsing, GitHub, and deployment workflows. His strength is turning AI workflows into usable product systems.",
  },
  {
    keys: ["college", "education", "university", "cgpa", "graduation"],
    answer:
      "Harsh Raj is a Computer Science Engineering student at IILM University. His expected graduation year is 2028 and his current CGPA is 7.45.",
  },
  {
    keys: ["contact", "email", "phone", "linkedin", "hire", "work"],
    answer:
      `You can reach Harsh at ${email}, ${phone}, or LinkedIn: ${linkedIn}. He is best aligned with AI product systems, agentic workflows, automation tools, product engineering, and zero-to-one builds.`,
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

const askForm = document.getElementById("askForm");
if (askForm) {
  askForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("questionInput");
    const answerBox = document.getElementById("answerBox");
    const question = input.value.trim().toLowerCase();

    if (!question) {
      answerBox.textContent = "Ask about MeetMind, Resume Analyzer, Harsh's skills, education, or contact details.";
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
  const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
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
      const nextBg = newTheme === "light" ? "#fbfcf7" : "#090d16";
      
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

  // --- CUSTOM CURSOR ---
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  
  let mouseX = -100;
  let mouseY = -100;
  let dotX = -100;
  let dotY = -100;
  let ringX = -100;
  let ringY = -100;
  
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  
  if (isFinePointer && cursorDot && cursorRing) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Add hover states to body when hovering interactive items
    const setupInteractiveHover = () => {
      const interactiveElements = document.querySelectorAll("a, button, input, select, textarea, .play-chip");
      interactiveElements.forEach(el => {
        // Remove existing listener (just in case) to avoid duplication
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
        
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
      });
    };
    
    const addHoverClass = () => document.body.classList.add("cursor-hovering");
    const removeHoverClass = () => document.body.classList.remove("cursor-hovering");
    
    setupInteractiveHover();
    
    // Periodically re-check DOM if elements change (e.g. through the Ask form answering)
    const observer = new MutationObserver(setupInteractiveHover);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Smooth cursor follow loop
    const animateCursor = () => {
      // Small dot follows mouse closely
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
      
      // Large ring has spring lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  // --- INTERACTIVE ANTIGRAVITY BG ---
  const canvas = document.getElementById("antigravity-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Optimize performance: throttle resize triggers
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 100);
    });
    
    let particles = [];
    // Adaptive count based on display size
    const getParticleCount = () => Math.min(65, Math.floor((width * height) / 24000));
    
    class Particle {
      constructor() {
        this.reset();
        // Spread particles across screen height initially so they don't all rise from bottom at once
        this.y = Math.random() * height;
      }
      
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2.2 + 1.0;
        this.speedY = Math.random() * 0.5 + 0.25; // Gentler drift
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.baseOpacity = this.opacity;
        this.wobbleSpeed = Math.random() * 0.008 + 0.003;
        this.wobbleVal = Math.random() * 100;
        // Physics repulsion displacement velocities
        this.vx = 0;
        this.vy = 0;
      }
      
      update() {
        // Base drift speed
        this.y -= this.speedY;
        this.wobbleVal += this.wobbleSpeed;
        this.x += Math.sin(this.wobbleVal) * 0.12 + this.speedX;
        
        // Apply repulsion force velocities with friction decay
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.92;
        this.vy *= 0.92;
        
        // Repulsion from mouse pointer
        if (mouseX > 0 && mouseY > 0) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.hypot(dx, dy);
          const maxDist = 130;
          
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            
            // Push velocities outward
            this.vx += Math.cos(angle) * force * 0.7;
            this.vy += Math.sin(angle) * force * 0.7;
            
            // Brighten near pointer
            this.opacity = Math.min(0.85, this.baseOpacity + force * 0.5);
          } else {
            // Smoothly restore base opacity
            this.opacity += (this.baseOpacity - this.opacity) * 0.05;
          }
        }
        
        // Wrap around boundaries
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }
      
      draw() {
        const theme = document.documentElement.getAttribute("data-theme") || "light";
        const colorStr = theme === "light" 
          ? `rgba(16, 136, 59, ${this.opacity})` 
          : `rgba(52, 211, 153, ${this.opacity * 1.35})`;
          
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();
      }
    }
    
    function initParticles() {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }
    
    function animateParticles() {
      if (document.hidden) {
        // Skip rendering when tab is inactive to preserve resources
        requestAnimationFrame(animateParticles);
        return;
      }
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw subtle connecting grid lines near the cursor
      if (mouseX > 0 && mouseY > 0) {
        const theme = document.documentElement.getAttribute("data-theme") || "light";
        ctx.strokeStyle = theme === "dark" 
          ? "rgba(52, 211, 153, 0.05)" 
          : "rgba(16, 136, 59, 0.035)";
        ctx.lineWidth = 0.8;
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
  }
});
