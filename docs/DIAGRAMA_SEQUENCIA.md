# Diagrama de Sequência - Fluxo de Processamento de Mensagem

**Simplificação do MVP:** Sem banco de dados, sem login.

## Código PlantUML

```plantuml
@startuml
title Fluxo de Processamento de Mensagem - ajuda.tech (MVP Simplificado)

actor "Usuário Leigo" as User
participant "Frontend\n(Chat Interface)" as Frontend
participant "Django View\n(chat/views.py)" as DjangoView
participant "Session\n(Memória)" as Session
participant "LLM Service\n(chat/services.py)" as LLMService
participant "System Prompt\n(chat/prompts.py)" as SystemPrompt
participant "OpenRouter API" as OpenRouter
participant "Text Processor\n(chat/utils.py)" as TextProcessor

== Etapa 1: Envio da Mensagem ==
User ->> Frontend: Digita mensagem informal
Frontend ->> Frontend: Valida entrada\n(texto não vazio)
Frontend ->> DjangoView: POST /api/chat/send/\n(JSON: {message, session_id})

== Etapa 2: Recuperação do Histórico (Memória) ==
DjangoView ->> Session: GET histórico da sessão\n(session_id)
Session -->> DjangoView: Lista de mensagens\nanteriores (em memória)

== Etapa 3: Processamento pela LLM ==
DjangoView ->> LLMService: process_message(\nhistory, new_message)
LLMService ->> SystemPrompt: get_system_prompt()
SystemPrompt -->> LLMService: System Prompt\n(tradução técnica)
LLMService ->> LLMService: Constrói prompt completo:\nHistórico + Nova Mensagem + System Prompt
LLMService ->> OpenRouter: POST /chat/completions\n(Headers: Authorization: Bearer API_KEY)
OpenRouter ->> OpenRouter: Processa requisição\n(seleciona modelo LLM)
OpenRouter -->> LLMService: Response JSON\n(texto formatado com recomendações)

== Etapa 4: Processamento da Resposta ==
LLMService -->> DjangoView: Texto formatado\nda LLM
DjangoView ->> Session: Salva mensagem do usuário\ne resposta da IA\n(em memória)
Session -->> DjangoView: Confirmação de salvamento

DjangoView ->> TextProcessor: parse_response(\nllm_response)
TextProcessor ->> TextProcessor: Separa:\n- Explicação simples\n- Especificação técnica
TextProcessor -->> DjangoView: StructuredResponse\n{explanation, specs}

== Etapa 5: Renderização ==
DjangoView -->> Frontend: JSON Response\n{message, explanation, specs}
Frontend ->> Frontend: Renderiza mensagem\ncom formatação especial
Frontend -->> User: Exibe:\n- Texto explicativo em destaque\n- Especificações em dropdown\n(collapsible)

@enduml
```

## Como Visualizar o Diagrama

Com a extensão **PlantUML** instalada no seu editor (VS Code, IntelliJ, etc.), você tem as seguintes opções:

### Opção 1: Visualização Direta no Editor
1. Abra o arquivo `DIAGRAMA_SEQUENCIA.md` no seu editor
2. O diagrama será renderizado automaticamente se a extensão PlantUML estiver ativa
3. Caso não renderize automaticamente, clique com o botão direito no código PlantUML e selecione **"Preview PlantUML"** ou **"Open Preview to the Side"**

### Opção 2: Atalhos do VS Code
- **Windows/Linux**: `Ctrl + Shift + P` → Digite "PlantUML" → Selecione "Preview Current Diagram"
- **Mac**: `Cmd + Shift + P` → Mesmo processo

### Opção 3: Exportar como Imagem
1. Com a extensão PlantUML instalada, você também pode:
   - Clicar com botão direito no diagrama
   - Selecionar **"Export Current Diagram"**
   - Escolher o formato (PNG, SVG, etc.)

### Dependências da Extensão
A extensão PlantUML geralmente requer:
- **Java** instalado (para executar o servidor PlantUML local)
- **Graphviz** (instalado separadamente para renderização)

Se o diagrama não aparecer, verifique se essas dependências estão instaladas corretamente.

## Descrição do Fluxo (MVP Simplificado)

| Etapa | Ator/Componente | Descrição |
|-------|-----------------|-----------|
| 1 | Usuário Leigo | Usuário digita mensagem informal no frontend |
| 2 | Frontend | Interface valida e envia via AJAX para Django |
| 3 | Session (Memória) | Recupera histórico da conversa (sem banco de dados) |
| 4 | LLM Service | Combina contexto + System Prompt para enviar à API |
| 5 | OpenRouter | Gateway que gerencia múltiplos modelos de LLM |
| 6 | Text Processor | Parser que separa explicação amigável de specs técnicas |
| 7 | Frontend | Renderiza com destaque para explicação e dropdown para specs |

## Alterações do MVP Simplificado

### Removido
- ~~Banco de Dados PostgreSQL~~
- ~~Transações de banco~~
- ~~Models de usuário~~
- ~~Sistema de autenticação~~
- ~~Migrações de banco~~

### Adicionado
- **Session (Memória)**: Armazenamento temporário do histórico da conversa
- **Cookie de sessão**: Para manter o contexto entre requisições
- **Limite de mensagens**: 50 mensagens por sessão (para evitar abusos)

## Elementos do Diagrama

- **Seta sólida (→)**: Fluxo síncrono de requisição/resposta
- **Seta tracejada (--)**: Retorno de dados ou resposta
- **Caixas empilhadas**: Instâncias paralelas do mesmo componente
- **Notas**: Informações adicionais sobre cada etapa