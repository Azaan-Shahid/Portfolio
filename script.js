// Mode 
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
  }

  // Toggle theme
  function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
  }

  // Event listeners
  themeToggle.addEventListener('click', toggleTheme);
  
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      document.body.classList.toggle('light-mode', e.newValue === 'light');
      themeToggle.textContent = e.newValue === 'light' ? '🌙' : '☀️';
    }
  });

  
  // Scroll
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Effects
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('mouseenter', () => {
      project.style.transform = 'translateY(-10px)';
      project.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    project.addEventListener('mouseleave', () => {
      project.style.transform = '';
      project.style.boxShadow = '';
    });
  });
});

// Typing Animation
document.addEventListener("DOMContentLoaded", function () {
  const phrases = [
    "Electrical Engineer",
    "Embedded Engineer",
    "Web Developer"
  ];

  const typedText = document.getElementById("typed-text");
  const cursor = document.querySelector(".cursor");

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  const typingDelay = 100;
  const erasingDelay = 60;
  const delayBetweenPhrases = 1500;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
    } else {
      typedText.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
    }

    if (!isDeleting && letterIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenPhrases);
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }

  if (typedText) {
    setTimeout(type,500);
  }
});
