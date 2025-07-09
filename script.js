// Display current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Dynamic project data with images and links
const projects = [
  {
    title: "Button Demo",
    description: "Java GUI counter with color-changing buttons.",
    image: "button-demo.png",
    link: "https://github.com/kemi-lee/kemi-lee/blob/main/ButtonDemo.java"
  },
  {
    title: "Coffee Shop",
    description: "Coffee store site with responsive design and order flow",
    image: "coffeeshop.png",
    link: "https://github.com/kemi-lee/kemi-lee/blob/main/ChrisLau.zip"
  },
  {
    title: "NumTable",
    description: "jQuery app that builds a number table with styled even/odd rows.",
    image: "table.jpeg",
    link: "https://github.com/kemi-lee/kemi-lee/blob/main/BuildTable"
  }
];

// Inject project cards dynamically
const container = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <a href="${project.link}" target="_blank">View Code</a>
  `;
  container.appendChild(card);
});

// Animate on scroll
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

// Handle form submission with fetch to Formspree
document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault(); // prevent default form submission

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
      // Clear form
      form.reset();

      // Show success message
      const success = document.getElementById("success-message");
      success.classList.remove("hidden");
      success.innerText = "✅ Thank you! Your message has been sent.";

      // Hide after a few seconds
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
