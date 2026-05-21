export function renderMessages(container, messages) {
  container.innerHTML = '';
  for (const msg of messages) {
    const el = document.createElement('div');
    el.className = `chat-message chat-message--${msg.role}`;
    el.textContent = msg.text;
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
