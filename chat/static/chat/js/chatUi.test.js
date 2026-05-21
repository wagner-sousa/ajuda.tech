import { describe, it, expect, beforeEach } from 'vitest';
import {
  renderMessages,
  showError,
  clearError,
  setTypingVisible,
  setSendDisabled,
} from './chatUi.js';

describe('chatUi', () => {
  let container;
  let errorEl;
  let typingEl;
  let sendBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="chat-messages"></div>
      <p id="chat-error" hidden></p>
      <p id="chat-typing" hidden>Digitando...</p>
      <button id="chat-send" type="button">Enviar</button>
    `;
    container = document.getElementById('chat-messages');
    errorEl = document.getElementById('chat-error');
    typingEl = document.getElementById('chat-typing');
    sendBtn = document.getElementById('chat-send');
  });

  it('renderMessages creates N elements with user/bot classes', () => {
    renderMessages(container, [
      { role: 'bot', text: 'Olá' },
      { role: 'user', text: 'Oi' },
    ]);
    const items = container.querySelectorAll('.chat-message');
    expect(items).toHaveLength(2);
    expect(items[0].classList.contains('chat-message--bot')).toBe(true);
    expect(items[1].classList.contains('chat-message--user')).toBe(true);
    expect(items[0].textContent).toBe('Olá');
    expect(items[1].textContent).toBe('Oi');
  });

  it('showError displays text and clears with clearError', () => {
    showError(errorEl, 'Mensagem de erro');
    expect(errorEl.hidden).toBe(false);
    expect(errorEl.textContent).toBe('Mensagem de erro');
    clearError(errorEl);
    expect(errorEl.hidden).toBe(true);
    expect(errorEl.textContent).toBe('');
  });

  it('setTypingVisible toggles visibility', () => {
    setTypingVisible(typingEl, true);
    expect(typingEl.hidden).toBe(false);
    setTypingVisible(typingEl, false);
    expect(typingEl.hidden).toBe(true);
  });

  it('setSendDisabled toggles button disabled state', () => {
    setSendDisabled(sendBtn, true);
    expect(sendBtn.disabled).toBe(true);
    setSendDisabled(sendBtn, false);
    expect(sendBtn.disabled).toBe(false);
  });
});
