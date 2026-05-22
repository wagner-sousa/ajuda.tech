/**
 * Testes de borda para chatState.
 *
 * chatState.test.js (branch fontend) cobre os cenários principais.
 * Este arquivo cobre os casos ausentes:
 *   - validateMessage com null/undefined
 *   - validateMessage com apenas espaços em branco variados
 *   - Imutabilidade do estado ao encadear appendMessage
 *   - WELCOME_MESSAGE tem conteúdo mínimo esperado
 */

import { describe, it, expect } from 'vitest';
import {
  validateMessage,
  createInitialState,
  appendMessage,
  WELCOME_MESSAGE,
  EMPTY_MESSAGE_ERROR,
} from './chatState.js';

// ─── validateMessage — entradas inesperadas ───────────────────────────────────

describe('validateMessage — entradas inesperadas', () => {
  it('trata null como mensagem vazia', () => {
    expect(validateMessage(null).valid).toBe(false);
    expect(validateMessage(null).error).toBe(EMPTY_MESSAGE_ERROR);
  });

  it('trata undefined como mensagem vazia', () => {
    expect(validateMessage(undefined).valid).toBe(false);
    expect(validateMessage(undefined).error).toBe(EMPTY_MESSAGE_ERROR);
  });

  it('rejeita string com apenas tabs', () => {
    expect(validateMessage('\t\t\t').valid).toBe(false);
  });

  it('rejeita string com apenas newlines', () => {
    expect(validateMessage('\n\n').valid).toBe(false);
  });

  it('aceita mensagem com espaços nas bordas (trim interno)', () => {
    expect(validateMessage('  mensagem válida  ').valid).toBe(true);
  });

  it('não retorna chave error quando mensagem é válida', () => {
    const result = validateMessage('ok');
    expect(result).not.toHaveProperty('error');
  });
});

// ─── WELCOME_MESSAGE — conteúdo mínimo ───────────────────────────────────────

describe('WELCOME_MESSAGE', () => {
  it('é uma string não-vazia', () => {
    expect(typeof WELCOME_MESSAGE).toBe('string');
    expect(WELCOME_MESSAGE.trim().length).toBeGreaterThan(0);
  });

  it('menciona Herbert', () => {
    expect(WELCOME_MESSAGE).toContain('Herbert');
  });

  it('contém uma pergunta (orienta o usuário a responder)', () => {
    expect(WELCOME_MESSAGE).toMatch(/\?/);
  });

  it('não usa jargão técnico', () => {
    expect(WELCOME_MESSAGE).not.toMatch(/RAM|SSD|processador|GPU|GHz/i);
  });
});

// ─── appendMessage — imutabilidade ───────────────────────────────────────────

describe('appendMessage — imutabilidade', () => {
  it('não muta o estado original', () => {
    const original = createInitialState();
    const snapLength = original.messages.length;

    appendMessage(original, { role: 'user', text: 'nova' });

    expect(original.messages).toHaveLength(snapLength);
  });

  it('encadear múltiplos appends acumula todas as mensagens', () => {
    const s0 = createInitialState();               // 1 msg (boas-vindas)
    const s1 = appendMessage(s0, { role: 'user', text: 'msg1' }); // 2
    const s2 = appendMessage(s1, { role: 'bot', text: 'msg2' });  // 3
    const s3 = appendMessage(s2, { role: 'user', text: 'msg3' }); // 4

    expect(s3.messages).toHaveLength(4);
    expect(s0.messages).toHaveLength(1); // original intacto
  });

  it('preserva a ordem de inserção das mensagens', () => {
    const s0 = createInitialState();
    const s1 = appendMessage(s0, { role: 'user', text: 'primeiro' });
    const s2 = appendMessage(s1, { role: 'bot', text: 'segundo' });

    expect(s2.messages[1].text).toBe('primeiro');
    expect(s2.messages[2].text).toBe('segundo');
  });
});
