// ============================================
// NOISE CANVAS (very subtle texture only)
// ============================================
(function generateNoise() {
  const canvas = document.getElementById('noiseCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(canvas.width, canvas.height);
  for (let i = 0; i < img.data.length; i += 4) {
    const val = Math.floor(Math.random() * 255);
    img.data[i] = val;
    img.data[i+1] = val;
    img.data[i+2] = val;
    img.data[i+3] = 12; // Very low alpha — nearly invisible
  }
  ctx.putImageData(img, 0, 0);
  // Do NOT apply to body background
})();

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let cursorTimeout;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';

  // Show cursor on move
  document.body.classList.add('cursor-active');

  // Hide after idle
  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(() => {
    document.body.classList.remove('cursor-active');
  }, 2000);
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .project-card, .social-card, .tab').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    cursorFollower.style.borderColor = 'rgba(79,142,255,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.borderColor = 'rgba(79,142,255,0.4)';
  });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// 3D CARD TILT (Hero Card)
// ============================================
const heroCard = document.querySelector('.hero-card-3d');
if (heroCard) {
  const inner = heroCard.querySelector('.card-inner');
  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    inner.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 22}deg) translateZ(10px)`;
    inner.style.boxShadow = `${-x * 20}px ${y * 20}px 60px rgba(0,0,0,0.6), 0 0 40px rgba(79,142,255,0.15)`;
  });
  heroCard.addEventListener('mouseleave', () => {
    inner.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
    inner.style.boxShadow = '';
  });
}

// ============================================
// PROJECT CARD TILT
// ============================================
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const inner = card.querySelector('.project-card-inner');
    if (inner) {
      inner.style.transform = `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.project-card-inner');
    if (inner) inner.style.transform = '';
  });
});

// ============================================
// PROJECT FILTER TABS
// ============================================
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.project-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.tab;
    cards.forEach((card, i) => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      if (show) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${i * 0.05}s`;
        card.style.animation = 'fadeSlideUp 0.5s ease both';
      } else {
        card.classList.add('hidden');
        card.style.animation = '';
      }
    });
  });
});

// ============================================
// SCROLL REVEAL
// ============================================
const revealEls = document.querySelectorAll(
  'section, .project-card, .social-card, .about-grid, .contact-item, .skill-pill'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// STAGGERED SKILL PILLS
// ============================================
const skillPills = document.querySelectorAll('.skill-pill');
skillPills.forEach((pill, i) => {
  pill.style.transitionDelay = `${i * 0.04}s`;
});

// ============================================
// TYPING EFFECT FOR HERO (runs after page load)
// ============================================
window.addEventListener('load', () => {
  // Subtle gradient text shimmer on hero title
  const title = document.querySelector('.hero-title');
  if (title) {
    title.style.opacity = '1';
  }
});

// ============================================
// ACTIVE NAV HIGHLIGHT ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));

console.log('%c Abdul Wasay Portfolio ', 'background: linear-gradient(135deg,#4f8eff,#00d4ff); color:#fff; font-size:16px; padding:8px 16px; border-radius:8px; font-weight:700;');
