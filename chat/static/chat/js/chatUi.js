const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

function createCopyButton(getText) {
  const btn = document.createElement('button');
  btn.className = 'chat-copy-btn';
  btn.setAttribute('aria-label', 'Copiar mensagem');
  btn.type = 'button';
  btn.innerHTML = COPY_ICON;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(getText());
      btn.innerHTML = CHECK_ICON;
      btn.classList.add('chat-copy-btn--copied');
      btn.setAttribute('aria-label', 'Copiado!');
      setTimeout(() => {
        btn.innerHTML = COPY_ICON;
        btn.classList.remove('chat-copy-btn--copied');
        btn.setAttribute('aria-label', 'Copiar mensagem');
      }, 2000);
    } catch {
      // clipboard API indisponível — falha silenciosa
    }
  });

  return btn;
}

export function renderMessages(container, messages, parseMarkdown = (text) => text) {
  container.innerHTML = '';
  for (const msg of messages) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-message-wrapper chat-message-wrapper--${msg.role}`;

    const el = document.createElement('div');
    el.className = `chat-message chat-message--${msg.role}`;
    if (msg.role === 'bot') {
      el.innerHTML = parseMarkdown(msg.text);
    } else {
      el.textContent = msg.text;
    }

    wrapper.appendChild(el);
    wrapper.appendChild(createCopyButton(() => el.textContent));
    container.appendChild(wrapper);
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
