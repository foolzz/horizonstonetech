/* Horizonstone Technology — High-Tech Interactions */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. Nav scroll effect
  // ============================================================
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================================
  // 2. Mobile menu toggle
  // ============================================================
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ============================================================
  // 3. Smooth scroll for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // 4. Particle Network Canvas (neural network effect)
  // ============================================================
  const canvas = document.getElementById('particle-network');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 180;
    const accentRGB = { r: 14, g: 165, b: 233 }; // --accent #0ea5e9

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.strokeStyle = `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.fillStyle = `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b},0.4)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  // ============================================================
  // 5. Terminal Typing Animation
  // ============================================================
  const terminalBody = document.getElementById('terminal-body');
  if (terminalBody) {
    const lines = [
      { text: '$ horizonstone deploy --client=acme', cls: 'prompt', delay: 400 },
      { text: '→ provisioning agent ...', cls: 'response', delay: 600 },
      { text: '→ ingesting 1,247 docs ...', cls: 'response', delay: 700 },
      { text: '→ training retrieval index ...', cls: 'response', delay: 800 },
      { text: '✓ ready in 4.2s', cls: 'success', delay: 500 },
      { text: '', cls: 'spacer', delay: 200 },
      { text: '$ measure --window=30d', cls: 'prompt', delay: 400 },
    ];

    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= lines.length) return;
      const line = lines[lineIndex];
      lineIndex++;

      if (line.cls === 'spacer') {
        setTimeout(typeLine, line.delay);
        return;
      }

      const el = document.createElement('div');
      el.className = line.cls;
      if (lineIndex === lines.length) el.style.marginTop = '14px';
      terminalBody.appendChild(el);

      let charIndex = 0;
      const speed = line.cls === 'prompt' ? 25 : 12;

      function typeChar() {
        if (charIndex < line.text.length) {
          el.textContent = line.text.substring(0, charIndex + 1);
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          setTimeout(typeLine, line.delay);
        }
      }
      typeChar();
    }

    // Start typing after a short delay
    setTimeout(typeLine, 800);
  }

  // ============================================================
  // 6. Animated Counters
  // ============================================================
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || '0');
        const duration = 2000;
        const start = performance.now();

        function updateCounter(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
          if (progress < 1) requestAnimationFrame(updateCounter);
        }
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ============================================================
  // 7. Scroll Reveal Animations
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================================
  // 8. SVG Chart Line Draw Animation
  // ============================================================
  const chartLine = document.querySelector('.hero-chart path:nth-child(2)');
  const chartFill = document.querySelector('.hero-chart path:first-child');
  const chartDots = document.querySelectorAll('.hero-chart circle');
  if (chartLine) {
    const length = chartLine.getTotalLength();
    chartLine.style.strokeDasharray = length;
    chartLine.style.strokeDashoffset = length;
    chartLine.style.transition = 'stroke-dashoffset 2s ease-out 1.5s';
    if (chartFill) {
      chartFill.style.opacity = '0';
      chartFill.style.transition = 'opacity 1s ease-out 2.5s';
    }
    chartDots.forEach((dot, i) => {
      dot.style.opacity = '0';
      dot.style.transition = `opacity 0.3s ease-out ${1.8 + i * 0.15}s`;
    });

    // Trigger after page load
    setTimeout(() => {
      chartLine.style.strokeDashoffset = '0';
      if (chartFill) chartFill.style.opacity = '1';
      chartDots.forEach(dot => dot.style.opacity = '1');
    }, 100);
  }
});
