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
│   ├── asgi.py                    # Configuração ASGI para async
│   └── wsgi.py                    # Configuração WSGI para produção
├── chat/                          # App Django principal (única app necessária)
│   ├── templates/chat/            # Templates da app de chat
│   │   ├── chat.html              # Interface do chatbot
│   │   └── components/            # Componentes reutilizáveis
│   │       ├── message_user.html
│   │       └── message_bot.html
│   ├── static/chat/               # Arquivos estáticos da app de chat
│   │   ├── css/
│   │   │   └── chat.css
│   │   └── js/
│   │       └── chat.js            # Lógica frontend do chat
│   ├── admin.py                   # (Vazio - sem models persistentes)
│   ├── apps.py                    # Configuração da app
│   ├── views.py                   # Views do chat
│   ├── urls.py                    # Rotas da app de chat
│   ├── services.py                # Lógica de comunicação com OpenRouter
│   ├── prompts.py                 # Gerenciamento de System Prompts
│   ├── consumers.py               # Consumers para Django Channels (opcional)
│   ├── routing.py                 # Configuração de roteamento WebSocket
│   └── tests.py                   # Testes unitários
├── static/                        # Arquivos estáticos globais
│   ├── css/
│   └── js/
├── templates/                     # Templates globais
│   └── base.html                  # Template base
├── .env.example                   # Exemplo de variáveis de ambiente
├── requirements.txt               # Dependências do projeto
├── Dockerfile                     # Configuração do container Docker
├── manage.py                      # Script de gerenciamento do Django
├── pytest.ini                     # Configuração do pytest
└── README.md                      # Documentação do projeto
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

### `.env.example`
```bash
# OpenRouter API
OPENROUTER_API_KEY=sua_chave_api_aqui
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# Configurações do Django
DEBUG=True
SECRET_KEY=sua_chave_secreta_aqui
ALLOWED_HOSTS=localhost,127.0.0.1

# Configuração de Sessão (memória)
SESSION_ENGINE=django.contrib.sessions.backends.signed_cookies
```

### `requirements.txt`
```
Django>=5.0,<6.0
djangorestframework>=3.14.0
channels>=4.0.0          # Opcional - apenas se usar WebSocket
openai>=1.0.0
python-dotenv>=1.0.0
pytest>=7.4.0
pytest-django>=4.5.0
```

### `Dockerfile`
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Instala dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copia e instala dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia código da aplicação
COPY . .

# Expose porta do Django
EXPOSE 8000

# Comando de inicialização
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

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