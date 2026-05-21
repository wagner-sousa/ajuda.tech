import { describe, it, expect } from 'vitest';
import { toggleTheme, getThemeToggleLabel, getThemeIconHtml } from './chatTheme.js';

describe('toggleTheme', () => {
  it('switches light to dark', () => {
    expect(toggleTheme('light')).toBe('dark');
  });

  it('switches dark to light', () => {
    expect(toggleTheme('dark')).toBe('light');
  });
});

describe('getThemeToggleLabel', () => {
  it('returns label to switch to light when theme is dark', () => {
    expect(getThemeToggleLabel('dark')).toMatch(/claro/i);
  });

  it('returns label to switch to dark when theme is light', () => {
    expect(getThemeToggleLabel('light')).toMatch(/escuro/i);
  });
});

describe('getThemeIconHtml', () => {
  it('shows sun icon when light mode is active', () => {
    expect(getThemeIconHtml('light')).toContain('<circle');
  });

  it('shows moon icon when dark mode is active', () => {
    expect(getThemeIconHtml('dark')).toContain('12.79');
  });
});
