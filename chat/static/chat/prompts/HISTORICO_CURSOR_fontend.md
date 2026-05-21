# Histórico da sessão Cursor — Front-end do chat

| Campo | Valor |
|-------|--------|
| **Projeto** | ajuda.tech (Ajuda Tech) |
| **Branch** | `frontend` |
| **Commit (curto)** | `badc592` |
| **Data** | Maio de 2026 |
| **Escopo** | Front-end do chat (MVP), sem Django nesta etapa |

Este arquivo registra o histórico de desenvolvimento da sessão no **Cursor** (assistente de código), não as conversas do usuário final com o Herbert no produto.

---

## 1. Objetivo inicial

- Analisar o repositório (inicialmente só documentação em `docs/`, `README.md`, `prompts.md`).
- Planejar e implementar a **página de chat** com **TDD (Vitest)** antes de conectar ao backend Django/OpenRouter.
- Alinhar com US01 básica (`docs/USER_STORIES.md`) e contrato futuro `POST /api/chat/send/` (`docs/DIAGRAMA_SEQUENCIA.md`).

---

## 2. Cronologia das entregas

### 2.1 Chat front-end com TDD

- Configuração: `package.json`, `vitest.config.js`, `.gitignore`, dependências `vitest` + `jsdom`.
- Módulos ES em `chat/static/chat/js/`:
  - `chatState.js` — validação, estado inicial (boas-vindas Herbert), append, reset.
  - `chatApi.js` — `postChat()` + `postChatMock()` (delay 100 ms).
  - `chatUi.js` — render de mensagens, erro, typing, botão desabilitado.
  - `chatApp.js` — orquestração, Enter para enviar, nova conversa.
- Página estática: `index.html`, `css/chat.css`.
- **12 testes** iniciais passando; preview com `npx serve chat/static/chat`.
- Atualização do `README.md` com instruções de preview local.

### 2.2 Dark mode

- Variáveis CSS em `:root` e `[data-theme='dark']`.
- `chatTheme.js` — toggle, `localStorage` (`ajudatech-theme`), preferência do sistema na primeira visita (versão inicial).
- Botão de tema no header; testes em `chatTheme.test.js`.

### 2.3 Ajustes de tema (iterações do usuário)

- Pedido: **modo escuro como padrão** + ícones sol/lua.
- Implementado: `DEFAULT_THEME = 'dark'`, script no `<head>` para evitar flash claro, ícones SVG.
- Pedido: **sol = modo claro ativo**, **lua = modo escuro ativo** (ícone representa o tema atual, não o destino do clique).
- `getThemeIconHtml(theme)`: `light` → sol, `dark` → lua; `aria-label` descreve a ação de alternar.
- Estado final do branch: preferência do sistema ou `light` como fallback (sem `DEFAULT_THEME` fixo em escuro na versão revertida posterior).

### 2.4 Markdown (adicionado e revertido)

- Pedido: front preparado para mensagens em Markdown (entrada e resposta).
- Implementado: `marked`, `isomorphic-dompurify`, `chatMarkdown.js`, render HTML sanitizado em `chatUi.js`, estilos e mock em Markdown.
- Pedido seguinte: **reverter** essas alterações.
- Removidos: dependências, `chatMarkdown.js`, testes e estilos; mensagens voltaram a `textContent` plano.
- **18 testes** após reversão.

### 2.5 Servidor local

- Várias reinicializações de `npx serve chat/static/chat` (porta 3000 ou porta alternativa quando ocupada).
- Encerramento de processos antigos ao reiniciar é comportamento esperado (exit code do shell ao matar o processo).

---

## 3. Testes

| Momento | Total de testes |
|---------|-----------------|
| Após chat TDD | 12 |
| Após tema + ícones | 18 |
| Após Markdown (antes do revert) | 22 |
| **Estado final (sem Markdown)** | **18** |

Comando: `npm test`

Arquivos de teste:

- `chatState.test.js`
- `chatApi.test.js`
- `chatUi.test.js`
- `chatTheme.test.js`

---

## 4. Decisões técnicas

| Decisão | Detalhe |
|---------|---------|
| Front isolado | Sem Django na etapa; `index.html` servido estaticamente. |
| API mock | `USE_MOCK = true` em `chatApp.js`; contrato JSON preparado para integração. |
| Endpoint futuro | `POST /api/chat/send/` com `{ message, session_id }`. |
| Mensagens | Texto plano (Markdown revertido). |
| Tema | `data-theme` no `<html>`; persistência em `localStorage`. |
| Ícones | Sol (tema claro ativo), lua (tema escuro ativo). |
| Acessibilidade | `aria-live` nas mensagens, `aria-label` no toggle de tema. |

---

## 5. Arquivos principais (estado final da branch)

```
ajuda.tech/
├── package.json
├── vitest.config.js
├── README.md
└── chat/static/chat/
    ├── index.html
    ├── css/chat.css
    ├── js/
    │   ├── chatState.js / .test.js
    │   ├── chatApi.js / .test.js
    │   ├── chatUi.js / .test.js
    │   ├── chatTheme.js / .test.js
    │   └── chatApp.js
    └── prompts/
        └── HISTORICO_CURSOR_fontend.md   ← este arquivo
```

---

## 6. Critérios US01 cobertos (front)

- Chat sem login; boas-vindas do Herbert ao abrir.
- Rejeição de mensagem vazia com texto amigável em PT-BR.
- Mensagem do usuário visível na lista (bolha).
- Indicador "Digitando..." durante o mock da API.
- Botão "Nova conversa" restaura o estado inicial.

---

## 7. Próximos passos sugeridos

1. Scaffold Django (`ajuda_tech` + app `chat`) conforme `docs/ESTRUTURA_PROJETO.md`.
2. View GET para servir template; view POST `/api/chat/send/` com session e OpenRouter.
3. Trocar `postChatMock` por `postChat` real e CSRF.
4. Mover markup de `index.html` para `chat/templates/chat/chat.html` com `{% static %}`.
5. (Opcional) Reintroduzir Markdown com sanitização, se o backend passar a responder em MD.

---

## 8. Referências no repositório

- [`docs/USER_STORIES.md`](../../../docs/USER_STORIES.md)
- [`docs/DIAGRAMA_SEQUENCIA.md`](../../../docs/DIAGRAMA_SEQUENCIA.md)
- [`docs/ESTRUTURA_PROJETO.md`](../../../docs/ESTRUTURA_PROJETO.md)
- [`prompts.md`](../../../prompts.md) — system prompt do Herbert (backend/IA)
