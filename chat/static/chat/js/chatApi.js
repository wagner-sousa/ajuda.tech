export const CHAT_ENDPOINT = '/api/chat/send/';

const MOCK_RESPONSE =
  'Obrigado! Em breve conectaremos ao assistente. Por enquanto, continue me contando o que você precisa.';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function postChat(message, sessionId, { fetchFn = fetch } = {}) {
  const response = await fetchFn(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar mensagem');
  }

  return response.json();
}

export async function postChatMock(_message) {
  await delay(100);
  return { message: MOCK_RESPONSE };
}
