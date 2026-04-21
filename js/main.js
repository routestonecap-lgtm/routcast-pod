// Nav scroll effect
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Mobile menu toggle
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
}

// Active nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.ep-card, .ep-card-full, .pillar, .about-stat, .sidebar-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Platform pill clicks
document.querySelectorAll('.platform-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const platform = pill.dataset.platform;
    const messages = {
      spotify: 'Coming soon on Spotify!',
      apple: 'Coming soon on Apple Podcasts!',
      youtube: 'Coming soon on YouTube!'
    };
    showToast(messages[platform] || 'Coming soon!');
  });
});

// Play button clicks
document.querySelectorAll('.ep-play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('Episode player coming soon — find us on Spotify or Apple Podcasts!');
  });
});

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: #192028; border: 1px solid #1e2d3a; color: #d0dae4;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 600;
    font-size: 0.9rem; letter-spacing: 0.08em;
    padding: 14px 28px; z-index: 9999; white-space: nowrap;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: toastIn 0.3s ease;
  `;
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    </style>
  `);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
