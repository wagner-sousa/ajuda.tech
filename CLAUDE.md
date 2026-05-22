# CLAUDE.md — Ajuda Tech

## Visão Geral do Projeto

**Ajuda Tech** é uma aplicação web com IA integrada que ajuda usuários leigos a escolherem o computador ideal (PC ou Notebook) através de uma conversa natural. O assistente se chama **Herbert** e nunca usa jargões técnicos com o usuário.

**Proposta de valor:** "Você descreve o que quer fazer. Nós indicamos o computador certo para você."

---

## Stack Técnica (MVP)

| Camada       | Tecnologia                          |
|--------------|-------------------------------------|
| Linguagem    | Python 3.12+                        |
| Framework    | Django 5.x                          |
| Banco        | SQLite (sem persistência entre sessões) |
| IA           | OpenRouter API (via SDK `openai`)   |
| Frontend     | Django Templates + HTML/CSS + AJAX  |
| Sessão       | Django Session com cookies assinados (em memória) |

**Sem login, sem banco de dados de usuários — o MVP acessa o chat diretamente.**

---

## Estrutura do Projeto

```
ajuda.tech/
├── ajuda_tech/          # Configurações Django (settings, urls, wsgi, asgi)
├── chat/                # Única app Django
│   ├── views.py         # Recebe POST /api/chat/send/, gerencia sessão
│   ├── services.py      # Comunicação com OpenRouter (timeout, retry, rate limit)
│   ├── prompts.py       # System prompts e versionamento — NÃO misturar com services
│   ├── urls.py
│   ├── tests.py
│   ├── templates/chat/
│   │   ├── chat.html
│   │   └── components/  # message_user.html, message_bot.html
│   └── static/chat/css/ e js/
├── templates/base.html
├── static/
├── docs/                # PRD, User Stories, Diagramas, Fluxo
├── prompts.md           # Documentação dos prompts de sistema
├── .env.example
├── requirements.txt
└── manage.py
```

---

## Arquivos Críticos

### `chat/services.py`
Toda a comunicação com OpenRouter. Deve ter:
- Timeout handling nas requisições HTTP
- Retry com exponential backoff
- Rate limiting (máx. 10 msgs/min por sessão)
- Limite de histórico: **20 mensagens** (janela de contexto)

### `chat/prompts.py`
System prompts isolados aqui. Nunca embutir prompts em `views.py` ou `services.py`.
- Versionar os prompts (ex: `SYSTEM_PROMPT_V1`)
- `temperature: 0.7`, `max_tokens: 500` nas perguntas / `800` na recomendação

### `chat/views.py`
- Endpoint: `POST /api/chat/send/` (recebe `{message, session_id}`)
- Recupera histórico da sessão Django
- Chama `services.process_message(history, new_message)`
- Salva par usuário/resposta na sessão
- Limite: **50 mensagens por sessão**

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

**Formato da recomendação final — sempre 3 opções:**
- Opção Ideal (melhor custo-benefício)
- Opção Mais Barata (mínimo que resolve o problema)
- Opção Mais Cara (durabilidade e desempenho futuros)

---

## Variáveis de Ambiente

```env
OPENROUTER_API_KEY=           # Chave da API OpenRouter
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
SECRET_KEY=                   # Chave secreta Django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
SESSION_ENGINE=django.contrib.sessions.backends.signed_cookies
```

**Nunca hardcodar chaves no código-fonte.**

---

## Como Rodar o Projeto

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
pip install -r requirements.txt
cp .env.example .env            # preencher com sua API key
python manage.py migrate        # apenas se houver models
python manage.py runserver
# Acesse: http://localhost:8000
```

---

## Convenções

- **Apps Django:** minúsculo (`chat`)
- **Views e URLs:** snake_case (`chat_view`, `send_message`)
- **Templates:** snake_case + `.html`
- **Commits:** descritivos em português ou inglês (prefixo `feat:`, `fix:`, `docs:`)
- **Branches:** `feature/<nome>`, `fix/<nome>`, `docs/<nome>`

---

## Segurança

- Proteção CSRF ativa em todos os formulários Django
- Nenhum dado pessoal sensível coletado ou armazenado
- Validação de input do lado do servidor (não confiar apenas no frontend)
- Sanitizar entradas para evitar prompt injection

---

## Escopo do MVP

**Dentro do escopo:**
- Chat conversacional com IA
- Recomendação ao final da conversa (3 opções)
- Histórico de sessão em memória
- Interface responsiva (desktop + mobile)

**Fora do escopo (pós-MVP):**
- Login / histórico persistente entre sessões
- Links de afiliados / comparativo de produtos reais
- App mobile nativo
- Múltiplos idiomas

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
