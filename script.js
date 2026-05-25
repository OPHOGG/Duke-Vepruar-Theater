(function () {
  'use strict';

  // ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // ===== SMOOTH NAV SCROLL =====
  document.querySelectorAll('nav a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== PARALLAX SPOTLIGHTS =====
  var spotlights = document.querySelectorAll('.spotlight');
  if (spotlights.length) {
    document.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 2;
      var y = (e.clientY / window.innerHeight - 0.5) * 2;
      spotlights.forEach(function (spot, i) {
        var speed = 8 + i * 4;
        spot.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed * 0.3) + 'px)';
      });
    });
  }

  // ===== DYNAMIC CURTAIN SHADOW ON SCROLL =====
  var curtain = document.querySelector('.curtain-top');
  if (curtain) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var opacity = Math.min(scrollY / 400, 0.6);
      curtain.style.boxShadow = '0 0 20px rgba(139, 0, 0, ' + (0.6 - opacity) + ')';
      curtain.style.opacity = 1 - Math.min(scrollY / 600, 0.5);
    });
  }

  // ===== TYPEWRITER EFFECT ON TAGLINE =====
  var tagline = document.querySelector('.hero .tagline');
  if (tagline) {
    var originalText = tagline.textContent;
    tagline.textContent = '';
    var charIndex = 0;
    function typeWriter() {
      if (charIndex < originalText.length) {
        tagline.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 30);
      }
    }
    setTimeout(typeWriter, 1800);
  }

  // ===== COUNTDOWN TO LAUNCH =====
  var bannerDots = document.querySelector('.banner-dots');
  if (bannerDots) {
    var countEl = document.createElement('p');
    countEl.style.cssText = 'font-family: var(--font-display); font-size: 1rem; color: var(--crimson-light); letter-spacing: 3px; margin-top: 16px; font-variant-numeric: tabular-nums;';
    bannerDots.parentNode.insertBefore(countEl, bannerDots.nextSibling);

    var launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 3);

    function updateCountdown() {
      var now = new Date();
      var diff = launchDate - now;
      if (diff <= 0) {
        countEl.textContent = 'LAUNCHING SOON';
        return;
      }
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var secs = Math.floor((diff % (1000 * 60)) / 1000);
      countEl.textContent = days + 'd ' + hours + 'h ' + mins + 'm ' + secs + 's';
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ===== TICKET MODAL =====
  var modal = document.getElementById('ticketModal');
  var modalBody = document.getElementById('modalBody');
  var modalSuccess = document.getElementById('modalSuccess');
  var successText = document.getElementById('successText');
  var emailField = document.getElementById('emailField');
  var subscribeForm = document.getElementById('subscribeForm');

  function openModal() {
    modalBody.style.display = 'block';
    modalSuccess.style.display = 'none';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.getElementById('ticketBtn').addEventListener('click', openModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });

  subscribeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = emailField.value.trim();
    if (email) {
      successText.textContent = 'Thank you, ' + email + '. We\'ll be in touch when the curtain rises.';
      modalBody.style.display = 'none';
      modalSuccess.style.display = 'block';
    }
  });

})();
