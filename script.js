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
      "Harsh is a Computer Science Engineering student at IILM University. His expected graduation year is 2028 and his current CGPA is 7.45.",
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
      const nextBg = newTheme === "light" ? "#fbfcf7" : "#090b10";
      
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
