export const THEME_STORAGE_KEY = 'ajudatech-theme';

const ICON_SUN = `<svg class="chat-theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

const ICON_MOON = `<svg class="chat-theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

export function toggleTheme(current) {
  return current === 'dark' ? 'light' : 'dark';
}

export function getThemeToggleLabel(theme) {
  return theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
}

export function getThemeIconHtml(theme) {
  return theme === 'light' ? ICON_SUN : ICON_MOON;
}

export function getPreferredTheme(storage = localStorage, media = window) {
  const stored = storage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  if (media.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme, doc = document) {
  doc.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
}

export function saveTheme(theme, storage = localStorage) {
  storage.setItem(THEME_STORAGE_KEY, theme);
}

export function updateThemeToggleButton(button, theme) {
  if (!button) return;
  button.innerHTML = getThemeIconHtml(theme);
  button.setAttribute('aria-label', getThemeToggleLabel(theme));
  button.title = getThemeToggleLabel(theme);
}

export function initTheme(toggleBtn, options = {}) {
  const storage = options.storage ?? localStorage;
  const doc = options.document ?? document;
  const media = options.window ?? window;

  let theme = getPreferredTheme(storage, media);
  applyTheme(theme, doc);
  updateThemeToggleButton(toggleBtn, theme);

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    theme = toggleTheme(theme);
    applyTheme(theme, doc);
    saveTheme(theme, storage);
    updateThemeToggleButton(toggleBtn, theme);
  });
}
