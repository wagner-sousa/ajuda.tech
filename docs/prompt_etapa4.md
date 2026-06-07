# Prompt
    Prompts utilizados na etapa 4

## Prompt de Diagrama sequencial

Atue como um Engenheiro de Software Sênior e Projetista de Sistemas.

Contexto do Projeto:

"ajuda.tech" - Fluxo de processamento de mensagem de um usuário leigo. É fundamental modelar o ciclo de vida da requisição para entender como o texto informal vira uma consulta à LLM e retorna como uma recomendação estruturada que o Django vai renderizar de forma amigável na tela.

Tarefa:

Gere o código de um Diagrama de Sequência utilizando a sintaxe PlantUML.

O fluxo deve mapear a seguinte sequência:

1. O Usuário Leigo digita uma mensagem simples na interface de chat (Frontend).

2. O Frontend envia via requisição (POST/AJAX) para a View do Django.

3. O Django intercepta a mensagem, abre uma transação no Banco de Dados para recuperar as mensagens anteriores daquela sessão (contexto) e salvar a nova mensagem do usuário.

4. O Django aciona um módulo interno de serviço de IA, que combina o histórico do usuário + a nova mensagem + o System Prompt de tradução técnica.

5. Este serviço dispara uma requisição HTTP síncrona para a API do OpenRouter.

6. O OpenRouter responde com o texto formatado (contendo as recomendações).

7. O Django recebe a resposta, salva a mensagem da IA no Banco de Dados e processa o texto para separar o que é explicação simples (para renderizar em destaque) do que é especificação técnica (para esconder em um colapso/dropdown).

8. O resultado final é renderizado na tela para o usuário.

Forneça exclusivamente o código delimitado por @startuml e @enduml.



Gere arquivo .md e me explique como visualizar o diagrama,considere que tenho a extenção PlantUML instalada

## Prompt de Estrutura do Projeto

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

4. Arquivos essenciais de ambiente: .env, requirements.txt e package.json para garantir a reprodutibilidade do ambiente de desenvolvimento.

Insira breves comentários explicativos ao lado dos diretórios e arquivos críticos criados para a integração com a LLM.



Gere um arquivo.md , não deve gerar a estrutura nesse momento

## Prompt User Stories

Atue como um Product Owner (PO) experiente em produtos digitais de alta usabilidade e e-commerce assistido por IA.

Contexto do Projeto:
"ajuda.tech" - MVP de um chat inteligente voltado a pessoas que não entendem de tecnologia, ajudando-as a comprar o computador correto.

Tarefa:
Gere 3 User Stories focadas nos problemas reais do público leigo. Cada história deve seguir a estrutura padrão (Como um... Quero... Para...) e conter Critérios de Aceitação rigorosos escritos no formato BDD (Dado que, Quando, Então).

As histórias devem cobrir:
1. US01 - Expressar Necessidade em Linguagem Natural: O usuário leigo descrevendo sua rotina ou desejos (Ex: "Quero um computador para minha filha estudar e que não trave") e o sistema aceitando isso sem exigir termos técnicos.
2. US02 - Recepção de Recomendação Mastigada: O usuário recebendo uma resposta clara que foca no custo-benefício e na usabilidade prática do computador, explicando didaticamente o porquê daquela escolha.
3. US03 - Ajuste de Orçamento Assistido: Como o usuário reage e como o sistema se comporta quando o usuário diz que quer um computador gamer de última geração, mas só tem R$ 2.000 para gastar. A IA deve reorientar o usuário sem jargões.

Apresente o resultado em Markdown estruturado.

## Fluxo de Usuário

Atue como um Arquiteto de Software Sênior especialista em Sistemas Baseados em IA e UX Conversacional.

Contexto do Projeto:

Estou desenvolvendo o "ajuda.tech", um sistema web (Python + Django + OpenRouter API) onde usuários totalmente leigos em informática recebem ajuda de uma IA para escolher o computador ideal. O foco absoluto é a simplicidade: o usuário não sabe o que é RAM, SSD ou Processador; ele sabe apenas o uso que dará ao computador e quanto pode gastar.

Tarefa:

Gere o código de um fluxograma utilizando a sintaxe Mermaid.js (graph TD) focado na jornada deste usuário leigo.

O fluxo deve conter de forma explícita:

1. Entrada do usuário na Landing Page com uma chamada acolhedora e simples.

2. Início do chat sem a obrigatoriedade de login (para diminuir a fricção).

3. Coleta de requisitos por meio de metáforas ou perguntas cotidianas feitas pela IA (Ex: Quais programas vai usar? Precisa levar o computador para a faculdade/trabalho ou vai ficar fixo na mesa?).

4. Validação de Orçamento (O usuário informa o limite de preço).

5. Processamento no Django (Envio do histórico de linguagem natural para o OpenRouter).

6. Exibição da Recomendação "Traduzida": Mostrar o computador recomendado focando nos benefícios práticos (Ex: "Este liga em 5 segundos", "Roda seus jogos sem travar") e escondendo os termos técnicos pesados sob um botão de "Ver especificações avançadas".

7. Fluxo de tratamento quando o orçamento é incompatível com o uso desejado, mostrando como a IA sugere alternativas ou ajusta as expectativas de forma gentil.

Gere apenas o bloco de código Mermaid.js, sem explicações adicionais.



Gere arquivo .md


## Prompt de atualização

#USER_STORIES.md #DIAGRAMA_SEQUENCIA.md #ESTRUTURA_PROJETO.md #FLUXO_USUARIO.md 

Considerando esses arquivos, pode refaser considerando que não vai ter login e não vai precisar de banco de dados.


