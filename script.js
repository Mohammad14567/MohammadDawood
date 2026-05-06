// ===== OWL MASCOT & SPEECH BUBBLES =====
const owlMessages = {
  hero: "Hi! I'm Mo's owl 🦉",
  about: "Get to know the human! 🧡",
  projects: "Ooh, good stuff in here! 👀",
  skills: "He knows a LOT of tricks!",
  experience: "Quite the journey! 🗺️",
  contact: "Don't be shy, say hello!"
};

let currentSection = 'hero';
let lastScrollY = 0;
let owlClicked = false;
let bubbleTimeout = null;
let hootBuffer = '';

document.addEventListener('DOMContentLoaded', () => {
  const owlContainer = document.getElementById('owl-container');
  const owlMascot = document.getElementById('owl-mascot');
  const bubble = document.querySelector('.speech-bubble');

  // Fly-in animation on load
  owlContainer.classList.add('fly-in');
  setTimeout(() => {
    owlContainer.classList.remove('fly-in');
    owlContainer.classList.add('idle');
  }, 1000);

  // Owl blink
  setInterval(() => {
    owlMascot.classList.add('blink');
    setTimeout(() => owlMascot.classList.remove('blink'), 200);
  }, 3000);

  function showBubble(msg) {
    bubble.textContent = msg;
    bubble.classList.add('show');
    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => bubble.classList.remove('show'), 3000);
  }

  // Click owl
  owlContainer.addEventListener('click', () => {
    if (owlClicked) return;
    owlClicked = true;
    owlContainer.classList.remove('idle');
    owlContainer.classList.add('spin');
    showBubble("Hoot hoot! 🎉");
    setTimeout(() => {
      owlContainer.classList.remove('spin');
      owlContainer.classList.add('idle');
      owlClicked = false;
    }, 800);
  });

  // Scroll: owl direction + section detection
  window.addEventListener('scroll', () => {
    const dir = window.scrollY > lastScrollY ? 1 : -1;
    owlMascot.style.transform = dir > 0 ? 'scaleX(1)' : 'scaleX(-1)';
    lastScrollY = window.scrollY;

    // Scroll progress
    const h = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('scroll-progress').style.width = (window.scrollY / h * 100) + '%';
  });

  // Section observer for owl messages
  const sections = document.querySelectorAll('section[id]');
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        if (id !== currentSection) {
          currentSection = id;
          if (owlMessages[id]) showBubble(owlMessages[id]);
        }
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => secObs.observe(s));

  // Animate elements on scroll
  const animObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.section-title, .stat-card, .project-card, .skill-card, .tl-item').forEach(el => animObs.observe(el));

  // Typewriter
  const words = ['React Developer', 'Node.js Engineer', 'Problem Solver', 'Full Stack Dev'];
  let wi = 0, ci = 0, deleting = false;
  const twEl = document.getElementById('typewriter');
  function typewrite() {
    const word = words[wi];
    if (!deleting) {
      twEl.textContent = word.substring(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(typewrite, 1800); return; }
      setTimeout(typewrite, 80);
    } else {
      twEl.textContent = word.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(typewrite, 400); return; }
      setTimeout(typewrite, 40);
    }
  }
  typewrite();

  // Email copy
  document.getElementById('copy-email')?.addEventListener('click', () => {
    navigator.clipboard.writeText('mohdawood@dev.com');
    showBubble("Copied! ✉️");
  });

  // Easter egg: type "hoot"
  document.addEventListener('keydown', (e) => {
    hootBuffer += e.key.toLowerCase();
    if (hootBuffer.length > 10) hootBuffer = hootBuffer.slice(-10);
    if (hootBuffer.includes('hoot')) {
      hootBuffer = '';
      owlRain();
    }
  });

  function owlRain() {
    for (let i = 0; i < 30; i++) {
      const owl = document.createElement('div');
      owl.className = 'rain-owl';
      owl.textContent = '🦉';
      owl.style.left = Math.random() * 100 + 'vw';
      owl.style.animationDuration = (2 + Math.random() * 2) + 's';
      owl.style.animationDelay = (Math.random() * 1.5) + 's';
      owl.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
      document.body.appendChild(owl);
      setTimeout(() => owl.remove(), 5000);
    }
    showBubble("HOOT HOOT HOOT! 🎉🦉");
  }

  // Create pixel stars in hero
  const hero = document.getElementById('hero');
  for (let i = 0; i < 12; i++) {
    const star = document.createElement('div');
    star.className = 'pixel-star';
    star.style.top = (10 + Math.random() * 80) + '%';
    star.style.left = (5 + Math.random() * 90) + '%';
    star.style.animationDelay = (Math.random() * 3) + 's';
    star.style.width = (6 + Math.random() * 6) + 'px';
    star.style.height = star.style.width;
    hero.appendChild(star);
  }
  // Pixel brackets
  ['{', '}', '<', '>', '/', ';'].forEach((ch, i) => {
    const b = document.createElement('div');
    b.className = 'pixel-bracket';
    b.textContent = ch;
    b.style.top = (15 + Math.random() * 70) + '%';
    b.style.left = (5 + Math.random() * 90) + '%';
    b.style.animationDelay = (i * 0.5) + 's';
    b.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
    hero.appendChild(b);
  });
});
