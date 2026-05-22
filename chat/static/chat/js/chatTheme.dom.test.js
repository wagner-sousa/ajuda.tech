/**
 * Testes para as funções de chatTheme que interagem com DOM/storage.
 *
 * chatTheme.test.js (branch fontend) cobre:
 *   toggleTheme, getThemeToggleLabel, getThemeIconHtml
 *
 * Este arquivo cobre as funções ausentes:
 *   getPreferredTheme, applyTheme, saveTheme,
 *   updateThemeToggleButton, initTheme
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  THEME_STORAGE_KEY,
  getPreferredTheme,
  applyTheme,
  saveTheme,
  updateThemeToggleButton,
  initTheme,
} from './chatTheme.js';

// ─── getPreferredTheme ────────────────────────────────────────────────────────

describe('getPreferredTheme', () => {
  it('retorna "dark" quando armazenado no storage', () => {
    const storage = { getItem: () => 'dark' };
    expect(getPreferredTheme(storage, {})).toBe('dark');
  });

  it('retorna "light" quando armazenado no storage', () => {
    const storage = { getItem: () => 'light' };
    expect(getPreferredTheme(storage, {})).toBe('light');
  });

  it('ignora valor inválido no storage e consulta preferência do sistema', () => {
    const storage = { getItem: () => 'invalid-value' };
    const media = { matchMedia: () => ({ matches: false }) };
    expect(getPreferredTheme(storage, media)).toBe('light');
  });

  it('retorna "dark" quando storage está vazio e sistema prefere dark', () => {
    const storage = { getItem: () => null };
    const media = { matchMedia: () => ({ matches: true }) };
    expect(getPreferredTheme(storage, media)).toBe('dark');
  });

  it('retorna "light" quando storage está vazio e sistema não prefere dark', () => {
    const storage = { getItem: () => null };
    const media = { matchMedia: () => ({ matches: false }) };
    expect(getPreferredTheme(storage, media)).toBe('light');
  });

  it('storage tem precedência sobre preferência do sistema', () => {
    const storage = { getItem: () => 'light' };
    // Sistema prefere dark, mas storage diz light
    const media = { matchMedia: () => ({ matches: true }) };
    expect(getPreferredTheme(storage, media)).toBe('light');
  });
});

// ─── applyTheme ───────────────────────────────────────────────────────────────

describe('applyTheme', () => {
  it('define data-theme="dark" no elemento raiz', () => {
    const doc = { documentElement: { setAttribute: vi.fn() } };
    applyTheme('dark', doc);
    expect(doc.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  it('define data-theme="light" no elemento raiz', () => {
    const doc = { documentElement: { setAttribute: vi.fn() } };
    applyTheme('light', doc);
    expect(doc.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('aplica no document real do jsdom sem lançar erro', () => {
    expect(() => applyTheme('dark', document)).not.toThrow();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

// ─── saveTheme ────────────────────────────────────────────────────────────────

describe('saveTheme', () => {
  it('salva o tema usando a chave correta', () => {
    const storage = { setItem: vi.fn() };
    saveTheme('dark', storage);
    expect(storage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, 'dark');
  });

  it('a chave de storage é "ajudatech-theme"', () => {
    expect(THEME_STORAGE_KEY).toBe('ajudatech-theme');
  });

  it('salva "light" sem erro', () => {
    const storage = { setItem: vi.fn() };
    expect(() => saveTheme('light', storage)).not.toThrow();
  });
});

// ─── updateThemeToggleButton ──────────────────────────────────────────────────

describe('updateThemeToggleButton', () => {
  it('não lança erro quando botão é null', () => {
    expect(() => updateThemeToggleButton(null, 'dark')).not.toThrow();
  });

  it('define aria-label para alternar para claro quando tema é dark', () => {
    const btn = document.createElement('button');
    updateThemeToggleButton(btn, 'dark');
    expect(btn.getAttribute('aria-label')).toMatch(/claro/i);
  });

  it('define aria-label para alternar para escuro quando tema é light', () => {
    const btn = document.createElement('button');
    updateThemeToggleButton(btn, 'light');
    expect(btn.getAttribute('aria-label')).toMatch(/escuro/i);
  });

  it('define title igual ao aria-label', () => {
    const btn = document.createElement('button');
    updateThemeToggleButton(btn, 'dark');
    expect(btn.title).toBe(btn.getAttribute('aria-label'));
  });

  it('preenche o innerHTML com ícone SVG', () => {
    const btn = document.createElement('button');
    updateThemeToggleButton(btn, 'dark');
    expect(btn.innerHTML).toContain('<svg');
  });
});

// ─── initTheme ────────────────────────────────────────────────────────────────

describe('initTheme', () => {
  let btn;
  let mockStorage;
  let mockDoc;

  beforeEach(() => {
    btn = document.createElement('button');
    mockStorage = {
      _data: {},
      getItem(k) { return this._data[k] ?? null; },
      setItem(k, v) { this._data[k] = v; },
    };
    mockDoc = { documentElement: { setAttribute: vi.fn() } };
  });

  it('aplica o tema do storage ao inicializar', () => {
    mockStorage.setItem(THEME_STORAGE_KEY, 'dark');
    initTheme(btn, { storage: mockStorage, document: mockDoc, window: {} });
    expect(mockDoc.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  it('atualiza o botão ao inicializar', () => {
    mockStorage.setItem(THEME_STORAGE_KEY, 'light');
    initTheme(btn, { storage: mockStorage, document: mockDoc, window: {} });
    expect(btn.innerHTML).toContain('<svg');
  });

  it('não lança erro quando botão é null', () => {
    expect(() =>
      initTheme(null, { storage: mockStorage, document: mockDoc, window: {} }),
    ).not.toThrow();
  });

  it('clique no botão alterna o tema', () => {
    mockStorage.setItem(THEME_STORAGE_KEY, 'light');
    initTheme(btn, { storage: mockStorage, document: mockDoc, window: {} });

    btn.click();

    expect(mockDoc.documentElement.setAttribute).toHaveBeenLastCalledWith('data-theme', 'dark');
  });

  it('clique no botão salva o novo tema no storage', () => {
    mockStorage.setItem(THEME_STORAGE_KEY, 'light');
    initTheme(btn, { storage: mockStorage, document: mockDoc, window: {} });

    btn.click();

    expect(mockStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });
});
