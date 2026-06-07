# Ajuda Tech - Instrucoes de Code Review para o Copilot

## Objetivo

Estas instrucoes orientam o Copilot Code Review neste repositorio. Priorize riscos reais para usuario, seguranca, estabilidade e regressoes funcionais.

## Como priorizar achados

- `Bloqueante`: vulnerabilidade, segredo exposto, quebra de endpoint, perda de funcionalidade central.
- `Alta`: regressao de comportamento, risco de indisponibilidade, falha de validacao relevante.
- `Media`: problema de manutencao que aumenta risco de bug.
- `Baixa`: estilo e melhorias nao funcionais.

## Escopo do review

- Desconsidere alteracoes em `prompts/` e `prompts-mini-projeto/`, exceto se a mudanca afetar diretamente regras de seguranca, privacidade ou conformidade.
- Priorize arquivos de produto em `chat/`, `ajuda_tech/`, `core/`, `.github/` e testes relacionados.

## Regras de arquitetura (obrigatorias)

- `chat/prompts.py` e o unico local para System Prompts.
- `chat/services.py` e o unico ponto de integracao com OpenRouter.
- `chat/views.py` nao deve chamar API de LLM diretamente.
- Preserve separacao entre explicacao simples e especificacoes tecnicas na resposta final.
- O produto deve continuar respondendo em portugues do Brasil e sem jargao tecnico para usuario final.

## Segurança e privacidade

- Nunca aceite chaves hardcoded (`LLM_API_KEY`, `SECRET_KEY`, tokens, segredos).
- Verifique protecao CSRF em todos os fluxos POST do Django.
- Verifique sanitizacao de conteudo renderizado no frontend (ex.: Markdown com DOMPurify).
- Exija validacao de entrada no servidor; nao confiar apenas no frontend.
- Sinalize qualquer coleta ou persistencia de dados sensiveis fora do escopo MVP.

## Backend (Python/Django)

- Preserve a hierarquia de excecoes em `chat/exceptions.py`.
- Em `chat/services.py`, valide timeout, retry, backoff e tratamento de 429/5xx sem mascarar erros permanentes (4xx).
- Em alteracoes de sessao, revise impacto em `request.session["chat_history"]` e risco de regressao no fluxo conversacional.
- Garanta que endpoints `/`, `/send/` e `/recommend/` mantenham contrato esperado.

## Frontend (HTML/CSS/JS)

- Evite injecao de HTML nao sanitizado.
- Preserve responsividade e acessibilidade basica (teclado, foco, contraste, sem quebra de interacao).
- Revise regressao de estado da conversa, tema e manipulacao de DOM nos modulos JS.

## Testes esperados por mudanca

- Mudancas em backend devem atualizar/adicionar testes em `chat/tests/` com `pytest` e mocks para OpenRouter quando aplicavel.
- Mudancas em frontend devem atualizar/adicionar testes Vitest em `chat/static/chat/js/*.test.js`.
- Sinalize quando a mudanca relevante vier sem cobertura de teste.

## Estilo do review

- Seja objetivo e acionavel: descreva risco, impacto e sugestao concreta.
- Liste achados por severidade.
- Evite comentarios de baixo valor quando nao houver risco funcional, de seguranca ou manutencao.
