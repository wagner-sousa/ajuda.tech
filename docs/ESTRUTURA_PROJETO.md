# Estrutura do Projeto "ajuda.tech" (MVP Simplificado)

Este documento apresenta a estrutura de pastas e arquivos do projeto, seguindo o padrão de arquitetura modular do Django com separação clara para a lógica de negócio de IA.

**Simplificações do MVP:**
- Sem login obrigatório
- Sem banco de dados (histórico em memória/session)
- Arquitetura mínima para máxima velocidade de desenvolvimento

```
ajuda.tech/
├── ajuda_tech/                    # Configurações principais do Django
│   ├── __init__.py
│   ├── settings.py                # Configurações do projeto
│   ├── urls.py                    # Rotas principais do projeto
│   └── wsgi.py                    # Configuração WSGI para produção
├── chat/                          # App Django principal
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── exceptions.py
│   ├── models.py                  # Classes de persistência comentadas; histórico atual em sessão
│   ├── prompts.py                 # Gerenciamento de System Prompts
│   ├── services.py                # Lógica de comunicação com OpenRouter
│   ├── urls.py                    # Rotas do chat
│   ├── views.py                   # ChatView, SendMessageView, RecommendView
│   ├── migrations/
│   │   └── __init__.py
│   ├── templates/chat/chat.html
│   └── static/chat/
│       ├── css/chat.css
│       ├── index.html             # Preview standalone (sem Django)
│       └── js/
│           ├── chatApp.js
│           ├── chatApi.js
│           ├── chatUi.js
│           ├── chatState.js
│           └── chatTheme.js
├── core/                          # App auxiliar (landing page / não roteada)
│   ├── __init__.py
│   ├── apps.py
│   ├── urls.py
│   ├── views.py
│   └── templates/core/index.html
├── docs/                          # Documentação do projeto
│   ├── DIAGRAMA_SEQUENCIA.md
│   ├── ESTRUTURA_PROJETO.md
│   ├── FLUXO_USUARIO.md
│   ├── PRD.md
│   └── USER_STORIES.md
├── prompts/                       # Histórico de prompts de sessão
├── prompts-mini-projeto/          # Sessões anteriores de desenvolvimento
├── .gitignore
├── AGENTS.md
├── requirements.txt
├── package.json
├── pytest.ini
├── vitest.config.js
├── db.sqlite3
└── manage.py
```

## Descrição dos Componentes Críticos para Integração com LLM

### `chat/services.py`
Responsável pela comunicação direta com a API do OpenRouter. Deve implementar:
- **Timeout handling**: Configuração de timeouts apropriados para requisições HTTP
- **Retry logic**: Mecanismo de retentativas em caso de falhas (exponential backoff)
- **Error handling**: Tratamento graceful de erros da API
- **Rate limiting**: Controle de taxa de requisições para evitar bloqueios

### `chat/prompts.py`
Arquivo isolado para gerenciamento dos System Prompts. Deve conter:
- **System Prompt Principal**: Instruções rígidas para traduzir termos leigos para especificações técnicas
- **Prompts de Contexto**: Informações sobre hardware, preços, compatibilidade
- **Templates de Resposta**: Formatação padronizada das respostas ao usuário
- **Versionamento**: Controle de versões dos prompts para facilitar ajustes

### `chat/views.py`
Views do chat que gerenciam:
- **Recebimento de mensagens**: Endpoint POST para receber mensagens do usuário
- **Gerenciamento de sessão**: Recuperação e armazenamento do histórico em memória
- **Resposta formatada**: Retorno de explicação + especificações técnicas

### `chat/consumers.py` (Opcional)
Implementação de WebSocket para comunicação em tempo real:
- **AsyncWebsocketConsumer**: Consumer assíncrono para melhor performance
- **Gerenciamento de estado**: Manutenção do contexto da conversa em memória

## Arquivos de Ambiente

### `.env`
O projeto não inclui um arquivo `.env` no repositório. Crie um arquivo local com as variáveis necessárias.

```bash
SECRET_KEY=sua_chave_secreta_aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
LLM_API_KEY=sua_chave_de_api_aqui
LLM_PROVIDER=openai
LLM_MODEL=deepseek/deepseek-v4-flash:free
LLM_TIMEOUT=30
SITE_URL=http://localhost:8000
SITE_NAME=Ajuda Tech
LOG_LEVEL=INFO
```

### `requirements.txt`
```
Django>=5.0,<6.0
python-decouple>=3.8
requests>=2.31.0
django-cors-headers>=4.0.0
pytest>=8.0.0
pytest-django>=4.8.0
pytest-cov>=5.0.0
```

### Docker / Container
Este repositório não inclui um `Dockerfile` atualmente.

## Convenções de Nomenclatura

- **Apps Django**: Nomes em minúsculo (chat)
- **Views e URLs**: snake_case (chat_view, user_messages)
- **Templates**: snake_case com extensão .html
- **Commits Git**: Português ou Inglês, descritivos e concisos

## Diferenças do MVP Simplificado

### Removido
- ~~App `core`~~ (não há landing page separada)
- ~~App `auth`~~ (sem login)
- ~~Models de banco~~ (sem persistência)
- ~~Migrações~~ (sem banco de dados)
- ~~Admin Django~~ (sem dados para gerenciar)
- ~~Pasta `locale`~~ (internacionalização futura)

### Simplificado
- **1 única app** (`chat`) em vez de múltiplas apps
- **Session em memória** em vez de banco de dados
- **Cookies assinados** para manter sessão do usuário

## Próximos Passos

1. Criar o projeto Django com `django-admin startproject ajuda_tech`
2. Criar a app com `python manage.py startapp chat`
3. Implementar o serviço de comunicação com OpenRouter
4. Criar a interface do chatbot com Django Templates
5. Configurar sessão em memória para histórico
6. Escrever testes unitários e de integração