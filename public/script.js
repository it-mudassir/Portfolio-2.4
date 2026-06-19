// Project data with detailed information
const projectsData = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack online store with payment integration, inventory management, and admin dashboard.",
    images: ["projects/ecommerce.jpg"],
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
    images: ["projects/taskmanager.jpg"],
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
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce website with fully connected pages, smooth UI, and interactive shopping experience.",
    images: [
      "projects/ecom-1.png",
      "projects/ecom-2.png",
      "projects/ecom-3.png",
      "projects/ecom-4.png",
      "projects/ecom-5.png",
      "projects/ecom-6.png",
    ],
    tags: ["Html", "CSS", "Javascript"],
    github: "https://github.com/it-mudassir/E-commerce",
    demo: "https://it-mudassir.github.io/E-commerce/index.html",
    features: [
      "Modern and responsive UI with smooth animations",
      "Fully connected multi-page navigation system",
      "Interactive shopping cart with localStorage support",
      "Dynamic product display with filtering and search functionality",
    ],
  },
  {
    title: "Social Media API",
    description:
      "RESTful API service with authentication, rate limiting, and comprehensive documentation.",
    images: ["projects/api.jpg"],
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
  {
    title: "Job Portal",
    description:
      "A full-stack job portal web application that connects job seekers and employers for job posting, searching, and application management.",
    images: [
      "projects/jobportal-1.png",
      "projects/jobportal-2.png",
      "projects/jobportal-3.png",
      "projects/jobportal-4.png",
      "projects/jobportal-5.png",
      "projects/jobportal-6.png",
      "projects/jobportal-7.png",
      "projects/jobportal-8.png",
      "projects/jobportal-9.png",
    ],
    tags: ["Node.js", "Express", "Javascript", "MongoDB"],
    github: "#",
    demo: "#",
    features: [
      "User authentication and role-based access control",
      "Job posting and management system for employers",
      "Job search, filtering, and application system",
      "Application tracking with interview scheduling",
    ],
  },
  {
    title: "Resturant Site",
    description:
      "A premium, single-page website for an upscale restaurant featuring an interactive digital menu, reservation system, and smooth animations, optimized for serverless hosting on GitHub Pages.",
    images: [
      "projects/res-1.png",
      "projects/res-2.png",
      "projects/res-3.png",
      "projects/res-4.png",
      "projects/res-5.png",
      "projects/res-6.png",
      "projects/res-7.png",
    ],
    tags: ["Html", "CSS", "Javascript"],
    github: "https://github.com/it-mudassir/Resturant",
    demo: "https://it-mudassir.github.io/Resturant/",
    features: [
      "Serverless routing for instant, multi-page client navigation",
      "Interactive digital menu with dynamic category filtering",
      "Premium table reservation request system with confirmation overlays",
      "Immersive visual media gallery with seamless lightbox viewing",
    ],
  },
  {
    title: "Coffee & Co",
    description:
      "Coffee & Co — where rich flavors, cozy vibes, and handcrafted brews come together to create your perfect coffee experience.",
    images: [
      "projects/coffe.png",
      "projects/coffe-1.png",
      "projects/coffe-2.png",
      "projects/coffe-3.png",
      "projects/coffe-4.png",
      "projects/coffe-5.png",
      "projects/coffe-6.png",
    ],
    tags: ["Html", "CSS", "Javascript", "Typescript"],
    github: "https://github.com/it-mudassir/portfolio-spark",
    demo: "https://portfolio-spark-zeta.vercel.app/",
    features: [
      "Seamless responsive layout optimized for flawless cross-device experience",
      "Elegant product showcase with refined hover interactions and micro-animations",
      "Smart ordering interface with real-time customization and instant updates",
      "Ambient UI transitions crafted for smooth and engaging user flow",
      "High-performance architecture ensuring fast load times and fluid navigation",
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
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // ✅ Only handle internal section links
    if (!href || !href.startsWith("#") || href === "#") return;

    e.preventDefault();

    const targetElement = document.querySelector(href);

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
// const observerOptions = {
//   threshold: 0.15,
//   rootMargin: "0px 0px -120px 0px",
// };

// const revealObserver = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("active");
//       revealObserver.unobserve(entry.target);
//     }
//   });
// }, observerOptions);

// // Observe all reveal elements and stagger child transitions
// document.querySelectorAll(".reveal, .scroll-reveal").forEach((element) => {
//   const children = Array.from(element.children);
//   children.forEach((child, idx) => {
//     child.style.transitionDelay = `${idx * 0.08}s`;
//   });

//   revealObserver.observe(element);
// });

const isMobile = window.innerWidth < 768;

const observerOptions = {
  threshold: isMobile ? 0.1 : 0.15,
  rootMargin: isMobile ? "0px 0px -60px 0px" : "0px 0px -120px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal, .scroll-reveal").forEach((element) => {
  const children = Array.from(element.children);

  children.forEach((child, idx) => {
    child.style.transitionDelay = isMobile
      ? `${idx * 0.04}s` // faster on mobile
      : `${idx * 0.08}s`;
  });

  revealObserver.observe(element);
});

// Project modal functionality
const projectsGrid = document.getElementById("projectsGrid");
const showMoreProjectsBtn = document.getElementById("showMoreProjects");
let projectsExpanded = false;
const PROJECTS_VISIBLE_COUNT = 3;
const skillsGrid = document.getElementById("skillsGrid");
const showMoreSkillsBtn = document.getElementById("showMoreSkills");
let skillsExpanded = false;
const SKILLS_VISIBLE_COUNT = 6;

function createProjectCard(project, index) {
  const card = document.createElement("div");
  card.className = "project-card scroll-reveal";
  card.dataset.project = index;
  if (index >= PROJECTS_VISIBLE_COUNT && !projectsExpanded) {
    card.classList.add("hidden-card");
  }

  const tagsHtml = project.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  card.innerHTML = `
    <div class="project-image">
      <img src="${project.images[0] || ""}" alt="${project.title}" />
      <div class="project-overlay"></div>
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">${tagsHtml}</div>
      <div class="project-links">
        <a href="${project.github || "#"}" class="btn btn-outline btn-sm" ${project.github && project.github !== "#" ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Code
        </a>
        <a href="${project.demo || "#"}" class="btn btn-primary btn-sm" ${project.demo && project.demo !== "#" ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Demo
        </a>
        <button type="button" class="btn btn-outline btn-sm view-details-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          Details
        </button>
      </div>
    </div>`;

  return card;
}

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = "";

  projectsData.forEach((project, index) => {
    const card = createProjectCard(project, index);
    projectsGrid.appendChild(card);
    revealObserver.observe(card);
  });

  if (showMoreProjectsBtn) {
    const shouldShow = projectsData.length > PROJECTS_VISIBLE_COUNT;
    showMoreProjectsBtn.style.display = shouldShow ? "inline-flex" : "none";
    showMoreProjectsBtn.textContent = projectsExpanded
      ? "Show Less Projects"
      : "Show More Projects";
  }

  attachProjectCardListeners();
}

function attachProjectCardListeners() {
  if (!projectsGrid) return;

  projectsGrid.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const projectCard = e.target.closest(".project-card");
      const projectIndex = parseInt(projectCard.dataset.project, 10);
      if (!Number.isNaN(projectIndex)) {
        openProjectModal(projectIndex);
      }
    });
  });
}

function openProjectModal(projectIndex) {
  const project = projectsData[projectIndex];
  if (!project) return;

  const modalSlider = document.getElementById("modalSlider");
  modalSlider.innerHTML = "";
  project.images.forEach((imageSrc) => {
    const slide = document.createElement("div");
    slide.className = "modal-slide";
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = project.title;
    img.className = "modal-media";
    slide.appendChild(img);
    modalSlider.appendChild(slide);
  });

  currentIndex = 0;
  dotsContainer.innerHTML = "";
  project.images.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;

  const modalTags = document.getElementById("modalTags");
  modalTags.innerHTML = "";
  project.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    modalTags.appendChild(span);
  });

  const modalFeatures = document.getElementById("modalFeatures");
  modalFeatures.innerHTML = "";
  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    modalFeatures.appendChild(li);
  });

  const modalGithub = document.getElementById("modalGithub");
  const modalDemo = document.getElementById("modalDemo");
  if (modalGithub) {
    modalGithub.href = project.github || "#";
    if (project.github && project.github !== "#") {
      modalGithub.target = "_blank";
      modalGithub.rel = "noopener noreferrer";
    } else {
      modalGithub.removeAttribute("target");
      modalGithub.removeAttribute("rel");
    }
  }
  if (modalDemo) {
    modalDemo.href = project.demo || "#";
    if (project.demo && project.demo !== "#") {
      modalDemo.target = "_blank";
      modalDemo.rel = "noopener noreferrer";
    } else {
      modalDemo.removeAttribute("target");
      modalDemo.removeAttribute("rel");
    }
  }

  updateSlider();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  startAutoSlide();
}

function updateSkillCards() {
  if (!skillsGrid || !showMoreSkillsBtn) return;

  const skillCards = [...skillsGrid.querySelectorAll(".skill-card")];
  skillCards.forEach((card, index) => {
    card.classList.toggle(
      "hidden-card",
      !skillsExpanded && index >= SKILLS_VISIBLE_COUNT,
    );
  });

  const shouldShow = skillCards.length > SKILLS_VISIBLE_COUNT;
  showMoreSkillsBtn.style.display = shouldShow ? "inline-flex" : "none";
  showMoreSkillsBtn.textContent = skillsExpanded
    ? "Show Less Skills"
    : "Show More Skills";
}

renderProjects();
updateSkillCards();

if (showMoreProjectsBtn) {
  showMoreProjectsBtn.addEventListener("click", () => {
    projectsExpanded = !projectsExpanded;
    renderProjects();
  });
}

if (showMoreSkillsBtn) {
  showMoreSkillsBtn.addEventListener("click", () => {
    skillsExpanded = !skillsExpanded;
    updateSkillCards();
  });
}

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = modal.querySelector(".modal-backdrop");

// Close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
  stopAutoSlide();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

const slider = document.getElementById("modalSlider");
const prevBtn = document.getElementById("sliderPrev");
const nextBtn = document.getElementById("sliderNext");
const dotsContainer = document.getElementById("sliderDots");

let currentIndex = 0;
let autoSlideInterval = null;
const AUTO_SLIDE_INTERVAL = 5000; // Auto-slide every 5 seconds

function getSlides() {
  return document.querySelectorAll(".modal-slide");
}

function getDots() {
  return document.querySelectorAll(".dot");
}

function updateSlider() {
  const slides = getSlides();
  const dots = getDots();

  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  // Pause videos if sliding away from them to preserve audio processing
  slides.forEach((slide, idx) => {
    const vid = slide.querySelector("video");
    if (vid && idx !== currentIndex) vid.pause();
  });

  // Restart auto-slide timer
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

function goToSlide(index) {
  const slides = getSlides();
  currentIndex = index % slides.length;
  updateSlider();
}

function startAutoSlide() {
  const slides = getSlides();
  if (slides.length <= 1) return;

  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    const dots = getDots();
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, AUTO_SLIDE_INTERVAL);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

nextBtn.addEventListener("click", () => {
  const slides = getSlides();
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  const slides = getSlides();
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
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

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTop");

if (scrollToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
