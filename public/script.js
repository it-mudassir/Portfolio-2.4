// Project data with detailed information
const projectsData = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack online store with payment integration, inventory management, and admin dashboard.",
    image: "projects/ecommerce.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "#",
    demo: "#",
    features: [
      "Secure payment processing with Stripe integration",
      "Real-time inventory management system",
      "Comprehensive admin dashboard",
      "Responsive design for all devices",
      "Advanced product filtering and search",
    ],
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates and team collaboration features.",
    image: "projects/taskmanager.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    github: "#",
    demo: "#",
    features: [
      "Real-time collaboration with WebSockets",
      "Drag-and-drop task management",
      "Team member assignment and notifications",
      "Project timeline visualization",
      "Integration with popular tools",
    ],
  },
  {
    title: "Social Media API",
    description:
      "RESTful API service with authentication, rate limiting, and comprehensive documentation.",
    image: "projects/api.jpg",
    tags: ["Node.js", "Express", "JWT", "Redis"],
    github: "#",
    demo: "#",
    features: [
      "JWT-based authentication system",
      "Rate limiting with Redis",
      "Comprehensive API documentation",
      "RESTful architecture",
      "Error handling and validation",
    ],
  },
];

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "light";

// Set initial theme
document.documentElement.setAttribute("data-theme", currentTheme);

themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");
  const newTheme = theme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Navigation scroll effect
const nav = document.getElementById("navigation");
const heroBg = document.querySelector(".hero-bg");
let lastScroll = 0;

function updateHeroParallax() {
  if (!heroBg) return;
  const offset = Math.min(window.pageYOffset * 0.15, 80);
  heroBg.style.transform = `translateY(${offset}px)`;
}

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  updateHeroParallax();
  lastScroll = currentScroll;
});

updateHeroParallax();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  // Animate hamburger icon
  const spans = mobileMenuBtn.querySelectorAll("span");
  if (mobileMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

const logoElement = document.getElementById("flickerText");
let logoHoverTimeouts = [];

function renderLogoSpans(text) {
  logoElement.innerHTML = text
    .split("")
    .map((char) =>
      char === " "
        ? '<span class="letter letter-space">&nbsp;</span>'
        : `<span class="letter">${char}</span>`,
    )
    .join("");
}

function animateLogoLetters(action) {
  logoHoverTimeouts.forEach(clearTimeout);
  logoHoverTimeouts = [];

  const letters = [...logoElement.querySelectorAll(".letter")];
  letters.forEach((letter, idx) => {
    const timeout = setTimeout(() => {
      letter.classList[action]("hover");
    }, idx * 70);
    logoHoverTimeouts.push(timeout);
  });
}

renderLogoSpans("Mudassir");

setTimeout(() => {
  animateLogoLetters("add");
  setTimeout(() => {
    animateLogoLetters("remove");
  }, 900);
}, 50);

logoElement.addEventListener("mouseenter", () => animateLogoLetters("add"));
logoElement.addEventListener("mouseleave", () => animateLogoLetters("remove"));

const sectionLinks = document.querySelectorAll(".nav-link, .mobile-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
  const referencePoint = window.scrollY + window.innerHeight * 0.4;
  let currentId = sections[0]?.id || "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      referencePoint >= sectionTop &&
      referencePoint < sectionTop + sectionHeight
    ) {
      currentId = section.id;
    }
  });

  sectionLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${currentId}`);
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("resize", updateActiveNav);
updateActiveNav();

// Smooth scroll for all navigation links
const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });

      // Close mobile menu if open
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        const spans = mobileMenuBtn.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    }
  });
});

// Scroll down button
const scrollDownBtn = document.querySelector(".scroll-down");
if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () => {
    const target = scrollDownBtn.getAttribute("data-target");
    const targetElement = document.getElementById(target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Scroll reveal animation
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -120px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal elements and stagger child transitions
document.querySelectorAll(".reveal, .scroll-reveal").forEach((element) => {
  const children = Array.from(element.children);
  children.forEach((child, idx) => {
    child.style.transitionDelay = `${idx * 0.08}s`;
  });

  revealObserver.observe(element);
});

// Project modal functionality
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = modal.querySelector(".modal-backdrop");

// Open modal
document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const projectCard = e.target.closest(".project-card");
    const projectIndex = parseInt(projectCard.getAttribute("data-project"));
    const project = projectsData[projectIndex];

    // Populate modal
    document.getElementById("modalImage").src = project.image;
    document.getElementById("modalImage").alt = project.title;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalDescription").textContent =
      project.description;

    // Tags
    const modalTags = document.getElementById("modalTags");
    modalTags.innerHTML = "";
    project.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    // Features
    const modalFeatures = document.getElementById("modalFeatures");
    modalFeatures.innerHTML = "";
    project.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });

    // Links
    document.getElementById("modalGithub").href = project.github;
    document.getElementById("modalDemo").href = project.demo;

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// Form submission
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    if (contactStatus) {
      contactStatus.textContent = "Sending your message...";
      contactStatus.className = "contact-status sending";
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Message failed to send.");
      }

      if (contactStatus) {
        contactStatus.textContent = "Message sent! I’ll get back to you soon.";
        contactStatus.className = "contact-status success";
      }

      contactForm.reset();
    } catch (error) {
      console.error(error);
      if (contactStatus) {
        contactStatus.textContent =
          "Sorry, something went wrong. Please try again later.";
        contactStatus.className = "contact-status error";
      }
    }
  });
}

// Set current year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
