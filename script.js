// Display current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Dynamic project data
// Each project: title, description, tech (optional), image (optional), links (optional list of {label, url})
const projects = [
  {
    title: "SmartPlate",
    description: "Full-stack nutrition app with three Claude API features: a chatbot, a personalized meal plan generator, and a shopping list builder with PDF export. I led a team of five and built the database, dashboard, user authentication (hashed passwords and session handling), and Railway deployment. I'm still improving it.",
    tech: "PHP, MySQL, JavaScript, Bootstrap, Claude API",
    links: [
      // TODO: add your Railway URL and repo, e.g. { label: "Live Site", url: "https://..." },
      // { label: "View Code", url: "https://github.com/kemi-lee/..." }
    ]
  },
  {
    title: "SmartPlate Test Suite",
    description: "Automated tests for SmartPlate covering signup, login, logout, dashboard access, shopping list, and the AI meal plan. It caught real bugs, including a missing login redirect that I fixed, and I documented them in a test plan and bug reports.",
    tech: "Playwright, JavaScript",
    links: [
      // TODO: add your smartplate-tests repo, e.g. { label: "View Code", url: "https://github.com/kemi-lee/smartplate-tests" }
    ]
  },
  {
    title: "Stylz",
    description: "Desktop outfit planner built by a team of four. I built the JavaFX screens and the Firebase user authentication: signup, login, and password reset, with emails sent after signup and during account recovery. I also created the unit tests and wrote the project documentation.",
    tech: "Java, JavaFX, Firebase",
    links: [
      // TODO: add your Stylz repo, e.g. { label: "View Code", url: "https://github.com/kemi-lee/..." }
    ]
  },
  {
    title: "WNBA Mini Data Jam",
    description: "Our team won the fan route at this Girls Who Code event hosted by the WNBA with AWS. We turned the Gravity stat into an animated story and a 5-minute pitch. I wrote the story and pitch.",
    tech: "Data storytelling, GitHub Pages",
    links: [
      { label: "View Site", url: "https://nehasaji28.github.io/GravityFalls/" }
    ]
  },
  {
    title: "Button Demo",
    description: "Java GUI counter with color-changing buttons.",
    image: "button-demo.png",
    links: [
      { label: "View Code", url: "https://github.com/kemi-lee/kemi-lee/blob/main/ButtonDemo.java" }
    ]
  },
  {
    title: "Coffee Shop",
    description: "Coffee store site with responsive design and order flow",
    image: "coffeeshop.png",
    links: [
      { label: "View Code", url: "https://github.com/kemi-lee/kemi-lee/blob/main/ChrisLau.zip" }
    ]
  },
  {
    title: "NumTable",
    description: "jQuery app that builds a number table with styled even/odd rows.",
    image: "table.jpeg",
    links: [
      { label: "View Code", url: "https://github.com/kemi-lee/kemi-lee/blob/main/BuildTable" }
    ]
  }
];

// Inject project cards
const container = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";

  const image = project.image
    ? `<img src="${project.image}" alt="${project.title}">`
    : "";
  const tech = project.tech
    ? `<p class="project-tech">${project.tech}</p>`
    : "";
  const links = (project.links || []).length
    ? `<div class="project-links">${project.links
        .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
        .join("")}</div>`
    : "";

  card.innerHTML = `
    ${image}
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    ${tech}
    ${links}
  `;
  container.appendChild(card);
});

// Scroll animation
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.9;

    elements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // initial check
});

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    const response = await fetch("https://formspree.io/f/mldnyode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      form.reset();

      const success = document.getElementById("success-message");
      success.classList.remove("hidden");
      success.innerText = "✅ Thank you! Your message has been sent.";

      setTimeout(() => {
        success.classList.add("hidden");
      }, 6000);
    } else {
      alert("❌ Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("❌ Submission failed. Check your internet connection.");
    console.error(error);
  }
});
