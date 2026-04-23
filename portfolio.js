const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
          entry.target.dataset.done = 'true';
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const dur = 1400;
          const start = performance.now();
          const step = now => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(ease * target);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target;
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // ─── THEME TOGGLE ───
    let currentTheme = 'dark';
    const btn = document.getElementById('themeToggle');
    const label = document.getElementById('themeLabel');
    const applyTheme = theme => {
      currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    };
    applyTheme('dark');
    btn.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });