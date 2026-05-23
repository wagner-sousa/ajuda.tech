export function renderMessages(container, messages, parseMarkdown = (text) => text) {
  container.innerHTML = '';
  for (const msg of messages) {
    const el = document.createElement('div');
    el.className = `chat-message chat-message--${msg.role}`;
    if (msg.role === 'bot') {
      el.innerHTML = parseMarkdown(msg.text);
    } else {
      el.textContent = msg.text;
    }
    container.appendChild(el);
  }
}

export function showError(el, text) {
  el.textContent = text;
  el.hidden = false;
}

export function clearError(el) {
  el.textContent = '';
  el.hidden = true;
}

export function setTypingVisible(el, visible) {
  el.hidden = !visible;
}

export function setSendDisabled(button, disabled) {
  button.disabled = disabled;
}

export function setInputDisabled(input, disabled) {
  input.disabled = disabled;
}
