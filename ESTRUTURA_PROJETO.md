# Prontp 
Atue como um Arquiteto de Software Especialista na Stack Python/Django.

Contexto do Projeto:

Projeto "ajuda.tech" (Chatbot para usuários leigos comprarem computadores). Stack: Python, Django, Banco de Dados Relacional e OpenRouter API. O coração do sistema consiste em interceptar as mensagens informais do usuário, enriquecê-las com um prompt de sistema (System Prompt) rígido que traduz termos leigos para especificações de hardware, e salvar esse histórico de forma relacional.

Tarefa:

Crie a estrutura de pastas e arquivos inicial do projeto no formato de árvore de diretórios (ASCII tree).

A estrutura deve seguir o padrão de arquitetura modular do Django, mas contendo separações claras para a lógica de negócio de IA:

1. Uma app core (para a landing page e autenticação opcional).

2. Uma app de chat contendo módulos específicos para:

   - `services.py` ou `llm_client.py`: Onde ficará a lógica de comunicação direta com o OpenRouter, tratamento de timeouts e retentativas.

   - `prompts.py`: Um arquivo isolado apenas para gerenciar as instruções de sistema (System Prompts) de tradução técnica para o usuário.

3. Organização de arquivos estáticos e templates utilizando a convenção do Django.

4. Arquivos essenciais de ambiente: .env.example, requirements.txt e Dockerfile para garantir a reprodutibilidade do ambiente de desenvolvimento.

Insira breves comentários explicativos ao lado dos diretórios e arquivos críticos criados para a integração com a LLM.



Gere um arquivo.md , não deve gerar a estrutura nesse momento



# Estrutura do Projeto "ajuda.tech"

Este documento apresenta a estrutura de pastas e arquivos inicial do projeto, seguindo o padrão de arquitetura modular do Django com separação clara para a lógica de negócio de IA.

```
ajuda.tech/
├── ajuda_tech/                    # Configurações principais do Django (settings.py, urls.py, wsgi.py)
│   ├── __init__.py
│   ├── settings.py                # Configurações do projeto (DATABASES, INSTALLED_APPS, etc.)
│   ├── urls.py                    # Rotas principais do projeto
│   ├── asgi.py                    # Configuração ASGI para async
│   └── wsgi.py                    # Configuração WSGI para produção
├── core/                          # App Django para landing page e autenticação opcional
│   ├── migrations/                # Migrações do banco de dados
│   │   └── __init__.py
│   ├── templates/core/            # Templates específicos da app core
│   │   ├── base.html              # Template base (herança)
│   │   └── landing.html           # Landing page pública
│   ├── static/core/               # Arquivos estáticos da app core
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── images/
│   ├── admin.py                   # Configuração do Django Admin
│   ├── apps.py                    # Configuração da app
│   ├── models.py                  # Modelos de dados (usuários, sessões, etc.)
│   ├── views.py                   # Views para landing page e autenticação
│   ├── urls.py                    # Rotas da app core
│   ├── forms.py                   # Formulários de autenticação
│   └── tests.py                   # Testes unitários
├── chat/                          # App Django para o chatbot de IA
│   ├── migrations/                # Migrações do banco de dados
│   │   └── __init__.py
│   ├── templates/chat/            # Templates específicos da app de chat
│   │   ├── chat.html              # Interface do chatbot
│   │   └── components/            # Componentes reutilizáveis
│   │       ├── message_user.html
│   │       └── message_bot.html
│   ├── static/chat/               # Arquivos estáticos da app de chat
│   │   ├── css/
│   │   │   └── chat.css
│   │   └── js/
│   │       └── chat.js            # Lógica frontend do chat (WebSocket/AJAX)
│   ├── admin.py                   # Configuração do Django Admin para chat
│   ├── apps.py                    # Configuração da app
│   ├── models.py                  # Modelos: Conversation, Message, etc.
│   ├── views.py                   # Views do chat
│   ├── urls.py                    # Rotas da app de chat
│   ├── services.py                # Lógica de comunicação com OpenRouter (timeout, retries)
│   ├── prompts.py                 # Gerenciamento de System Prompts para tradução técnica
│   ├── consumers.py               # Consumers para Django Channels (WebSocket)
│   ├── routing.py                 # Configuração de roteamento WebSocket
│   └── tests.py                   # Testes unitários e de integração
├── static/                        # Arquivos estáticos globais (collectstatic)
│   ├── css/
│   ├── js/
│   └── images/
├── media/                         # Arquivos de mídia (uploads de usuários)
├── locale/                        # Arquivos de internacionalização (i18n)
├── .env.example                   # Exemplo de variáveis de ambiente
├── requirements.txt               # Dependências do projeto
├── Dockerfile                     # Configuração do container Docker
├── docker-compose.yml             # Orquestração de containers (Django + DB)
├── manage.py                      # Script de gerenciamento do Django
├── pytest.ini                     # Configuração do pytest
├── .gitignore                     # Arquivos ignorados pelo Git
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

### `chat/models.py`
Modelos relacionais para persistência do histórico:
- **Conversation**: Armazena sessões de chat
- **Message**: Armazena mensagens individuais (usuário e IA)
- **HardwareSpec**: Especificações técnicas traduzidas

### `chat/consumers.py` (Django Channels)
Implementação de WebSocket para comunicação em tempo real:
- **AsyncWebsocketConsumer**: Consumer assíncrono para melhor performance
- **Conexão em tempo real**: Mensagens instantâneas sem polling
- **Gerenciamento de estado**: Manutenção do contexto da conversa

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

# Banco de Dados
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ajudatech
DB_USER=postgres
DB_PASSWORD=senha
DB_HOST=localhost
DB_PORT=5432

# Django Channels (Redis para produção)
CHANNEL_LAYER=channels.layers.InMemoryChannelLayer
```

### `requirements.txt`
```
Django>=4.2,<5.0
djangorestframework>=3.14.0
channels>=4.0.0
channels-redis>=4.1.0
openai>=1.0.0
python-dotenv>=1.0.0
psycopg2-binary>=2.9.9
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

- **Apps Django**: Nomes em minúsculo (core, chat)
- **Models**: PascalCase (Conversation, Message, HardwareSpec)
- **Views e URLs**: snake_case (chat_view, user_messages)
- **Templates**: snake_case com extensão .html
- **Commits Git**: Português ou Inglês, descritivos e concisos

## Próximos Passos

1. Criar o projeto Django com `django-admin startproject ajuda_tech`
2. Criar as apps com `python manage.py startapp core` e `python manage.py startapp chat`
3. Configurar o banco de dados PostgreSQL
4. Implementar os services de comunicação com OpenRouter
5. Desenvolver os modelos de dados para persistência do histórico
6. Criar a interface do chatbot com Django Templates
7. Configurar Django Channels para WebSocket
8. Escrever testes unitários e de integração