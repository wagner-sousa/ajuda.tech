# Ajuda Tech — Agent Instructions

Assistente conversacional com IA que ajuda usuários leigos a escolher o computador ideal.
Stack: **Python 3.12+, Django 5.x, OpenRouter API**.

## Documentação de referência

- Requisitos e personas: [docs/PRD.md](docs/PRD.md)
- Estrutura de pastas: [docs/ESTRUTURA_PROJETO.md](docs/ESTRUTURA_PROJETO.md)
- Fluxo do usuário: [docs/FLUXO_USUARIO.md](docs/FLUXO_USUARIO.md)
- Diagrama de sequência (PlantUML): [docs/DIAGRAMA_SEQUENCIA.md](docs/DIAGRAMA_SEQUENCIA.md)
- User Stories (BDD): [docs/USER_STORIES.md](docs/USER_STORIES.md)

## Arquitetura

```text
ajuda_tech/        # Configurações Django (settings, urls, wsgi)
core/              # Landing page e autenticação opcional
chat/
  services.py      # Cliente OpenRouter — timeout, retentativas, streaming
  prompts.py       # System Prompts de tradução leigo→técnico (NUNCA expor ao usuário)
  views.py         # Endpoints /, /send/, /recommend/
  models.py        # Modelos desativados; histórico em request.session
```

## Comandos de desenvolvimento

```bash
python -m venv venv && source venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env          # preencher LLM_API_KEY e SECRET_KEY
python manage.py migrate
python manage.py runserver     # http://localhost:8000
pytest                         # rodar testes
npm test                        # rodar testes do frontend
```

## Variáveis de ambiente obrigatórias

| Variável       | Descrição                            |
|----------------|--------------------------------------|
| `SECRET_KEY`   | Chave secreta do Django              |
| `LLM_API_KEY`  | Chave da API do provedor LLM         |
| `LLM_PROVIDER` | `openai` ou `gemini` (via OpenRouter)|
| `DEBUG`        | `True` (desenvolvimento) / `False`   |

**Nunca hardcode chaves de API.** Sempre usar variáveis de ambiente via `python-decouple` ou `os.environ`.

## Convenções críticas

- **`prompts.py`** é o único lugar onde os System Prompts residem. Toda lógica de tradução leigo→técnico fica aqui.
- **`services.py`** é o único ponto de contato com o OpenRouter. Views nunca chamam a API diretamente.
- Respostas da IA devem separar **explicação simples** (renderizada em destaque) de **especificações técnicas** (em accordion/collapse).
- A interface jamais deve expor jargões técnicos ao usuário final — isso é feito internamente pelo System Prompt.
- Proteger todos os formulários Django com CSRF. Não coletar ou armazenar dados pessoais sensíveis.

## Testes

Usar `pytest` com `pytest-django`. Mocks para chamadas ao OpenRouter via `unittest.mock`. Os testes backend ficam em `chat/tests/`.

Testes frontend usam Vitest em `chat/static/chat/js/*.test.js`.
