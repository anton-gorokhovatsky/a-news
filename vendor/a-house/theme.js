(() => {
  const storageKey = 'a-news:theme';
  const root = document.documentElement;
  let preference = 'system';
  let controls = [];

  function readPreference() {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === 'dark' || saved === 'light' ? saved : 'system';
    } catch {
      return preference;
    }
  }

  function apply(value) {
    preference = value;
    if (value === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = value;
    for (const control of controls) {
      control.querySelector('input[value="' + value + '"]').checked = true;
    }
  }

  apply(readPreference());

  document.addEventListener('DOMContentLoaded', () => {
    controls = document.querySelectorAll('[data-site-theme]');
    apply(preference);
    for (const control of controls) {
      control.hidden = false;
      control.addEventListener('focus', () => {
        requestAnimationFrame(() => {
          if (document.activeElement === control) control.querySelector(':checked').focus({ preventScroll: true });
        });
      });
      control.addEventListener('change', event => {
        apply(event.target.value);
        try {
          if (preference === 'system') localStorage.removeItem(storageKey);
          else localStorage.setItem(storageKey, preference);
        } catch {
          // A browser can disallow storage while the current page remains usable.
        }
      });
    }
  });

  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) apply(readPreference());
  });
  window.addEventListener('pageshow', () => apply(readPreference()));
})();
