import { describe, it, expect } from 'vitest';
import {
  validateMessage,
  createInitialState,
  appendMessage,
  resetConversation,
  EMPTY_MESSAGE_ERROR,
} from './chatState.js';

describe('validateMessage', () => {
  it('rejects empty string with friendly PT-BR error and example', () => {
    const result = validateMessage('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe(EMPTY_MESSAGE_ERROR);
    expect(result.error).toMatch(/exemplo/i);
    expect(result.error).not.toMatch(/RAM|SSD|processador/i);
  });

  it('rejects whitespace-only string', () => {
    const result = validateMessage('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe(EMPTY_MESSAGE_ERROR);
  });

  it('accepts non-empty trimmed message', () => {
    const result = validateMessage('Quero um PC para estudar');
    expect(result).toEqual({ valid: true });
  });
});

describe('createInitialState', () => {
  it('starts with one bot welcome mentioning Herbert', () => {
    const state = createInitialState();
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].role).toBe('bot');
    expect(state.messages[0].text).toContain('Herbert');
  });
});

describe('appendMessage', () => {
  it('adds message preserving order', () => {
    const initial = createInitialState();
    const next = appendMessage(initial, { role: 'user', text: 'oi' });
    expect(next.messages).toHaveLength(2);
    expect(next.messages[0].role).toBe('bot');
    expect(next.messages[1]).toEqual({ role: 'user', text: 'oi' });
    expect(initial.messages).toHaveLength(1);
  });
});

describe('resetConversation', () => {
  it('returns initial state with only welcome', () => {
    let state = createInitialState();
    state = appendMessage(state, { role: 'user', text: 'teste' });
    state = appendMessage(state, { role: 'bot', text: 'resposta' });
    const reset = resetConversation();
    expect(reset.messages).toHaveLength(1);
    expect(reset.messages[0].role).toBe('bot');
    expect(reset.messages[0].text).toContain('Herbert');
  });
});
