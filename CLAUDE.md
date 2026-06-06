# CLAUDE.md — Ajuda Tech

## Visão Geral do Projeto

**Ajuda Tech** é uma aplicação web com IA integrada que ajuda usuários leigos a escolherem o computador ideal (PC ou Notebook) através de uma conversa natural. O assistente se chama **Herbert** e nunca usa jargões técnicos com o usuário.

**Proposta de valor:** "Você descreve o que quer fazer. Nós indicamos o computador certo para você."

---

## Stack Técnica (MVP)

| Camada       | Tecnologia                                                                 |
|--------------|----------------------------------------------------------------------------|
| Linguagem    | Python 3.12+                                                               |
| Framework    | Django 5.x                                                                 |
| Banco        | SQLite configurado para o projeto, mas o histórico de chat não é persistido |
| IA           | OpenRouter API (via `requests` + Bearer token)                             |
| Frontend     | Django Templates + HTML/CSS + JS modular (ESM)                             |
| Sessão       | `django.contrib.sessions.backends.signed_cookies`                           |
| Testes PY    | pytest + pytest-django                                                     |
| Testes JS    | Vitest (`chat/static/chat/js/*.test.js`)                                  |

**Sem login, sem autenticação de usuário — o MVP acessa o chat diretamente via sessão.**

---

## Estrutura do Projeto

```
ajuda.tech-wagner/
├── ajuda_tech/              # Configurações Django
│   ├── settings.py          # Apps, Middleware, DB, LLM, Logging
│   ├── urls.py              # Raiz → include("chat.urls")
│   └── wsgi.py
├── chat/                    # App principal
│   ├── views.py             # ChatView | SendMessageView | RecommendView
│   ├── services.py          # OpenRouterClient (HTTP, retry, backoff)
│   ├── prompts.py           # SYSTEM_PROMPT e PRODUCT_EXTRACTION_PROMPT
│   ├── models.py            # Contém classes de persistência comentadas; histórico atual em sessão
│   ├── exceptions.py        # Hierarquia: OpenRouterError → Auth/RateLimit/Unavailable/Invalid
│   ├── urls.py              # / | /send/ | /recommend/
│   ├── admin.py             # Desabilitado
│   ├── templates/chat/chat.html
│   ├── static/chat/
│   │   ├── css/chat.css
│   │   ├── index.html       # Preview standalone (sem Django)
│   │   └── js/
│   │       ├── chatApp.js   # Orquestrador principal
│   │       ├── chatApi.js   # HTTP + CSRF
│   │       ├── chatUi.js    # Manipulação DOM
│   │       ├── chatState.js # Estado da conversa
│   │       ├── chatTheme.js # Dark/Light mode
│   │       └── *.test.js    # Testes Vitest
│   └── tests/               # Testes pytest
│       ├── test_views.py
│       ├── test_services.py
│       ├── test_models.py
│       ├── test_prompts.py
│       └── test_limits.py
├── core/                    # App auxiliar (não roteada no urls.py raiz)
│   ├── views.py             # IndexView (TemplateView)
│   └── templates/core/index.html
├── docs/                    # PRD, User Stories, Diagramas, Fluxo
├── prompts/                 # Histórico de prompts de sessão
├── prompts-mini-projeto/    # Sessões anteriores de desenvolvimento
├── prompts.md               # Documentação dos system prompts
├── VIABILIDADE.md           # Análise de viabilidade técnica e de negócio
├── AGENTS.md                # Instruções para agentes de IA
├── .env                     # Variáveis de ambiente (não commitar chaves reais)
├── requirements.txt
├── package.json             # Dependências JS (vitest, dompurify, marked)
├── pytest.ini
├── vitest.config.js
└── manage.py
```

---

## Arquivos Críticos

### `chat/services.py` — `OpenRouterClient`
Toda comunicação com OpenRouter. Implementado:
- Autenticação via `Bearer {LLM_API_KEY}`
- Timeout configurável via `LLM_TIMEOUT` (default: 30s)
- Retry com exponential backoff para erros 5xx e Timeout (default: 2 retries)
- Retry separado para 429 com `Retry-After` (default: até 10 tentativas)
- Sem retry para erros permanentes: 401, 402, 4xx inesperado
- Detecção automática de extração de produtos para ajustar `max_tokens`
- Remoção de blocos `<think>...</think>` (DeepSeek reasoning)

### `chat/prompts.py`
System prompts isolados. Nunca embutir prompts em `views.py` ou `services.py`.
- `SYSTEM_PROMPT` — instruções do Herbert para conversa
- `PRODUCT_EXTRACTION_PROMPT` — extrai 3 produtos (budget/ideal/premium) em JSON
- `temperature: 0.7` em todas as chamadas
- `max_tokens: 800` para chat normal, `1500` para extração de produtos

### `chat/views.py` — Endpoints
- `GET /` → `ChatView`: renderiza `chat.html`, reinicia sessão (`flush()`) a cada visita
- `POST /send/` → `SendMessageView`: recebe `{"message": "..."}`, armazena o histórico em `request.session`, chama IA, retorna `{"reply": "..."}`
- `POST /recommend/` → `RecommendView`: usa histórico da sessão, retorna `{"products": [...]}`

### `chat/models.py`
- `Conversation` — classe comentada como referência, não utilizada na implementação atual
- `Message` — classe comentada como referência, não utilizada na implementação atual
- O histórico de conversa atual é mantido em `request.session['chat_history']`

### `chat/exceptions.py`
```
OpenRouterError
├── AuthenticationError   (401/403)
├── RateLimitError        (429) — tem atributo retry_after
├── ServiceUnavailableError (5xx, timeout, connection error)
└── InvalidResponseError  (JSON inválido, estrutura inesperada)
```

---

## Comportamento da IA (Herbert)

O assistente **deve coletar estas 4 informações antes de recomendar**:
1. Finalidade (trabalho, estudo, jogos, uso básico, design)
2. Mobilidade (fica em casa ou precisa carregar)
3. Orçamento aproximado
4. Exigência especial (durabilidade, tela grande, bateria longa)

**Regras de comportamento:**
- Fazer **UMA pergunta por vez**
- Nunca recomendar antes de ter as informações essenciais
- Fallback após 8 trocas: recomendar com o que tem
- Redirecionar gentilmente se o usuário fugir do tema
- Sempre responder em português do Brasil
- Nunca exibir raciocínio interno antes da resposta

**Formato da recomendação final — sempre 3 opções (via `/recommend/`):**
- `budget` — Opção Mais Barata (mínimo que resolve o problema)
- `ideal` — Opção Ideal (melhor custo-benefício)
- `premium` — Opção Mais Cara (durabilidade e desempenho futuros)

---

## Variáveis de Ambiente

```env
SECRET_KEY=               # Chave secreta Django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
LLM_API_KEY=              # Chave da API OpenRouter (obrigatória)
LLM_PROVIDER=openrouter   # Apenas informativo; URL é hardcoded
LLM_MODEL=deepseek/deepseek-v4-flash:free  # Modelo padrão
LLM_TIMEOUT=30            # Timeout em segundos
SITE_URL=http://localhost:8000
SITE_NAME=Ajuda Tech
LOG_LEVEL=INFO
```

**Nunca hardcodar chaves no código-fonte. O `.env` já existe no repositório com valores de exemplo — não commitar chaves reais.**

---

## Como Rodar o Projeto

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows
python -m pip install -r requirements.txt
# Editar .env e preencher LLM_API_KEY
python manage.py migrate
python manage.py runserver
# Acesse: http://localhost:8000
```

### Testes

```bash
# Python (pytest)
pytest

# JavaScript (Vitest)
npm install
npm test

# Preview do frontend sem Django
npx serve chat/static/chat
```

---

## Convenções

- **Apps Django:** minúsculo (`chat`, `core`)
- **Views e URLs:** snake_case (`chat_view`, `send_message`)
- **Templates:** snake_case + `.html`
- **Commits:** descritivos em português ou inglês (prefixo `feat:`, `fix:`, `docs:`)
- **Branches:** `feature/<nome>`, `fix/<nome>`, `docs/<nome>`

---

## Segurança

- Proteção CSRF ativa em todos os formulários e requisições AJAX
- Nenhum dado pessoal sensível coletado ou armazenado
- Validação de input do lado do servidor (não confiar apenas no frontend)
- Sanitização de HTML via `DOMPurify` no frontend (renderização de Markdown)
- Sem admin Django habilitado (`admin.py` não registra models)

---

## Escopo do MVP

**Dentro do escopo:**
- Chat conversacional com IA (Herbert)
- Recomendação ao final da conversa (3 opções em JSON via `/recommend/`)
- Histórico de sessão mantido no cookie assinado e em `request.session`
- Interface responsiva com suporte a dark/light mode
- Renderização de Markdown nas respostas do assistente

**Fora do escopo (pós-MVP):**
- Login / histórico persistente entre sessões
- Links de afiliados / comparativo de produtos reais
- App mobile nativo
- Múltiplos idiomas
- Limite de mensagens por sessão (não implementado)
- Rate limiting por sessão no servidor (não implementado)

---

## Documentação Interna

| Arquivo                         | Conteúdo                                    |
|---------------------------------|---------------------------------------------|
| `docs/PRD.md`                   | Requisitos funcionais e não-funcionais      |
| `docs/USER_STORIES.md`          | 3 User Stories com critérios BDD            |
| `docs/ESTRUTURA_PROJETO.md`     | Estrutura de pastas detalhada               |
| `docs/DIAGRAMA_SEQUENCIA.md`    | Fluxo de uma mensagem (PlantUML)            |
| `docs/FLUXO_USUARIO.md`         | Jornada do usuário (Mermaid)                |
| `prompts.md`                    | System prompt do Herbert + exemplos few-shot |
| `VIABILIDADE.md`                | Análise de viabilidade técnica e de negócio |
| `AGENTS.md`                     | Instruções para agentes de IA               |
