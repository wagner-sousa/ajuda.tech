import {
  validateMessage,
  createInitialState,
  appendMessage,
  resetConversation,
} from './chatState.js';
import { postChat, postChatMock } from './chatApi.js';
import {
  renderMessages,
  showError,
  clearError,
  setTypingVisible,
  setSendDisabled,
} from './chatUi.js';
import { initTheme } from './chatTheme.js';

const USE_MOCK = true;

export function initChatApp(root = document) {
  initTheme(root.getElementById('chat-theme-toggle'), { document: root });

  const messagesEl = root.getElementById('chat-messages');
  const inputEl = root.getElementById('chat-input');
  const sendBtn = root.getElementById('chat-send');
  const errorEl = root.getElementById('chat-error');
  const typingEl = root.getElementById('chat-typing');
  const newBtn = root.getElementById('chat-new');

  let state = createInitialState();

  function refresh() {
    renderMessages(messagesEl, state.messages);
  }

  async function handleSend() {
    const text = inputEl.value;
    const validation = validateMessage(text);

    if (!validation.valid) {
      showError(errorEl, validation.error);
      return;
    }

    clearError(errorEl);
    const userText = text.trim();
    inputEl.value = '';

    state = appendMessage(state, { role: 'user', text: userText });
    refresh();

    setTypingVisible(typingEl, true);
    setSendDisabled(sendBtn, true);

    try {
      const response = USE_MOCK
        ? await postChatMock(userText)
        : await postChat(userText, null);
      state = appendMessage(state, { role: 'bot', text: response.message });
      refresh();
    } finally {
      setTypingVisible(typingEl, false);
      setSendDisabled(sendBtn, false);
      inputEl.focus();
    }
  }

  function handleNewConversation() {
    state = resetConversation();
    clearError(errorEl);
    setTypingVisible(typingEl, false);
    inputEl.value = '';
    refresh();
    inputEl.focus();
  }

  sendBtn.addEventListener('click', handleSend);
  newBtn.addEventListener('click', handleNewConversation);

  inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  });

  refresh();
  inputEl.focus();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initChatApp(document));
}
