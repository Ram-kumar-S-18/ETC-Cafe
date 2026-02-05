/**
 * ETC Café - Premium Interactive Experience
 * Luxury coffee experience with refined animations
 * Mobile-optimized version
 */

document.addEventListener('DOMContentLoaded', () => {

  // Detect mobile/touch devices
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isMobile = window.innerWidth <= 768;

  // ═══════════════════════════════════════════════════════════════════════════
  // CUSTOM CURSOR (Desktop Only - Touch devices get native cursor)
  // ═══════════════════════════════════════════════════════════════════════════

  if (!isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    function animateCursor() {
      const dx = cursorX - dotX;
      const dy = cursorY - dotY;
      dotX += dx * 0.15;
      dotY += dy * 0.15;

      cursor.style.transform = `translate(${dotX - 20}px, ${dotY - 20}px)`;
      cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('dot-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('dot-hover');
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MOBILE MENU
  // ═══════════════════════════════════════════════════════════════════════════

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = mobileMenuBtn?.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn?.querySelector('.close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.add('open');
      menuIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      // Animate links in sequence
      mobileLinks.forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        setTimeout(() => {
          link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 100 + i * 80);
      });
    } else {
      mobileMenu.classList.remove('open');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn?.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER SCROLL EFFECTS
  // ═══════════════════════════════════════════════════════════════════════════

  const header = document.getElementById('header');
  let lastScroll = 0;

  function updateHeader() {
    const scrollY = window.scrollY;

    // Solid background after scroll
    if (scrollY > 50) {
      header.classList.add('header-solid');
    } else {
      header.classList.remove('header-solid');
    }

    // Hide/show on scroll direction (desktop and mobile)
    if (scrollY > 300) {
      if (scrollY > lastScroll + 5) {
        header.style.transform = 'translateY(-100%)';
      } else if (scrollY < lastScroll - 5) {
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ═══════════════════════════════════════════════════════════════════════════
  // NAVIGATION HIGHLIGHT ON SCROLL
  // ═══════════════════════════════════════════════════════════════════════════

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ═══════════════════════════════════════════════════════════════════════════
  // PARALLAX EFFECTS (Optimized for all devices)
  // ═══════════════════════════════════════════════════════════════════════════

  const heroImage = document.querySelector('.hero-bg-image');

  function updateParallax() {
    const scrollY = window.scrollY;

    // Hero parallax - works on all devices
    if (heroImage && scrollY < window.innerHeight) {
      const parallaxSpeed = isMobile ? 0.15 : 0.3;
      heroImage.style.transform = `scale(1.1) translateY(${scrollY * parallaxSpeed}px)`;
    }
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  // ═══════════════════════════════════════════════════════════════════════════
  // INTERSECTION OBSERVER - SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Stagger children if present
        const staggerChildren = entry.target.querySelectorAll('.stagger-child');
        staggerChildren.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, i * 100);
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TILT CARDS (Touch + Mouse support)
  // ═══════════════════════════════════════════════════════════════════════════

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    // Mouse events
    card.addEventListener('mousemove', (e) => {
      if (isTouchDevice) return;
      applyTilt(card, e.clientX, e.clientY);
    });

    card.addEventListener('mouseleave', () => {
      resetTilt(card);
    });

    // Touch events for mobile
    card.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      applyTilt(card, touch.clientX, touch.clientY);
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      applyTilt(card, touch.clientX, touch.clientY);
    }, { passive: true });

    card.addEventListener('touchend', () => {
      resetTilt(card);
    });
  });

  function applyTilt(card, clientX, clientY) {
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function resetTilt(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAGNETIC BUTTONS (Touch + Mouse support)
  // ═══════════════════════════════════════════════════════════════════════════

  const magneticButtons = document.querySelectorAll('.magnetic');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      if (isTouchDevice) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });

    // Touch feedback for mobile
    btn.addEventListener('touchstart', () => {
      btn.style.transform = 'scale(0.95)';
    }, { passive: true });

    btn.addEventListener('touchend', () => {
      btn.style.transform = 'scale(1)';
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SMOOTH SCROLLING WITH OFFSET
  // ═══════════════════════════════════════════════════════════════════════════

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = isMobile ? 80 : 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // GET DIRECTIONS - GOOGLE MAPS
  // ═══════════════════════════════════════════════════════════════════════════

  const directionsBtn = document.getElementById('get-directions-btn');
  if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
      window.open('https://www.google.com/maps/search/?api=1&query=Cubbonpet+Bangalore+Karnataka+India', '_blank');
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // IMAGE REVEAL ON SCROLL
  // ═══════════════════════════════════════════════════════════════════════════

  const imageReveals = document.querySelectorAll('.image-reveal');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        imageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

  imageReveals.forEach(img => imageObserver.observe(img));

  // ═══════════════════════════════════════════════════════════════════════════
  // COUNTER ANIMATION
  // ═══════════════════════════════════════════════════════════════════════════

  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ═══════════════════════════════════════════════════════════════════════════
  // SCROLL PROGRESS INDICATOR
  // ═══════════════════════════════════════════════════════════════════════════

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  // ═══════════════════════════════════════════════════════════════════════════
  // TOUCH RIPPLE EFFECT FOR MOBILE
  // ═══════════════════════════════════════════════════════════════════════════

  if (isTouchDevice) {
    const rippleElements = document.querySelectorAll('.btn-primary, .btn-secondary, .offering-card');

    rippleElements.forEach(el => {
      el.style.position = 'relative';
      el.style.overflow = 'hidden';

      el.addEventListener('touchstart', function (e) {
        const rect = el.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'touch-ripple';
        ripple.style.cssText = `
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: rippleEffect 0.6s ease-out forwards;
          pointer-events: none;
          left: ${x}px;
          top: ${y}px;
        `;

        el.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      }, { passive: true });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleEffect {
        to {
          transform: translate(-50%, -50%) scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HAPTIC-STYLE FEEDBACK (Visual) FOR MOBILE
  // ═══════════════════════════════════════════════════════════════════════════

  if (isTouchDevice) {
    const interactiveElements = document.querySelectorAll('a, button');

    interactiveElements.forEach(el => {
      el.addEventListener('touchstart', () => {
        el.style.transition = 'transform 0.1s ease';
        el.style.transform = 'scale(0.97)';
      }, { passive: true });

      el.addEventListener('touchend', () => {
        el.style.transform = 'scale(1)';
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZE ANIMATIONS ON PAGE LOAD
  // ═══════════════════════════════════════════════════════════════════════════

  // Reveal hero content immediately
  setTimeout(() => {
    document.querySelectorAll('.hero-content .fade-in-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 200);
    });
  }, 300);

  // Add loaded class to body
  document.body.classList.add('loaded');

  // Handle resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Update mobile state on resize
      window.location.reload();
    }, 500);
  });

  console.log('ETC Café Experience Initialized ✨');
  console.log(`Device: ${isTouchDevice ? 'Touch' : 'Desktop'}, Mobile: ${isMobile}`);
});
