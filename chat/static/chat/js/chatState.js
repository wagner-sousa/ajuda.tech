export const WELCOME_MESSAGE =
  'Olá! Me chamo Herbert e vou te ajudar a encontrar o computador perfeito para você. Me conta: para que você pretende usar o computador?';

export const EMPTY_MESSAGE_ERROR =
  'Conte um pouco mais sobre o que você precisa. Exemplo: "Quero um computador para minha filha estudar e fazer trabalhos de escola".';

export function validateMessage(text) {
  const trimmed = (text ?? '').trim();
  if (!trimmed) {
    return { valid: false, error: EMPTY_MESSAGE_ERROR };
  }
  return { valid: true };
}

export function createInitialState() {
  return {
    messages: [{ role: 'bot', text: WELCOME_MESSAGE }],
  };
}

export function appendMessage(state, message) {
  return {
    ...state,
    messages: [...state.messages, message],
  };
}

export function resetConversation() {
  return createInitialState();
}
