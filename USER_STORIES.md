# User Stories - ajuda.tech (MVP)

Este documento apresenta as 3 User Stories prioritárias para o MVP do ajuda.tech, focadas nos problemas reais do público leigo em tecnologia.

---

## US01 - Expressar Necessidade em Linguagem Natural

**Título:** O Usuário Descreve Sua Rotina sem Precisar Conhecer Terminologia Técnica

**Narrativa:**
```
Como pai/mãe ou profissional leigo em tecnologia
Quero descrever em minhas próprias palavras o que preciso fazer no computador
Para que eu possa obter uma recomendação sem precisar aprender termos técnicos como "RAM", "SSD" ou "processador"
```

### Critérios de Aceitação (BDD)

**Cenário 1: Usuário descreve uso geral do computador**

```
Dado que o usuário acessou o chat do ajuda.tech
E está na tela inicial de conversa
Quando ele digitar uma mensagem como "Quero um computador para minha filha estudar e fazer trabalhos de escola"
Então o sistema deve aceitar a mensagem sem solicitar esclarecimentos sobre especificações técnicas
E deve responder com uma pergunta de aprofundamento relevante ao contexto educacional
```

**Cenário 2: Usuário menciona programas específicos sem saber requisitos**

```
Dado que o usuário mencionou programas que pretende usar
Quando ele escrever "Vou usar para editar fotos no Photoshop e assistir Netflix"
Então o sistema deve interpretar corretamente a intenção de edição de imagens e streaming
E deve perguntar sobre frequência de uso, não sobre requisitos técnicos
```

**Cenário 3: Usuário usa termos coloquiais ou incorretos**

```
Dado que o usuário utiliza termos leigos ou incorretos
Quando ele escrever "Quero um computador rápido que não trave quando abrir várias abas"
Então o sistema deve interpretar "rápido" como necessidade de performance
E deve interpretar "travar" como instabilidade ou pouca memória
E deve reformular em linguagem técnica apenas internamente, nunca para o usuário
```

**Cenário 4: Sistema rejeita mensagens vazias ou incompreensíveis**

```
Dado que o usuário tentou enviar uma mensagem vazia ou apenas emojis sem contexto
Quando ele clicar em enviar
Então o sistema deve exibir uma mensagem amigável solicitando mais detalhes
E deve dar exemplos de informações úteis sem usar jargões técnicos
```

---

## US02 - Recepção de Recomendação Mastigada

**Título:** O Usuário Recebe uma Explicação Clara Focada em Benefícios Práticos

**Narrativa:**
```
Como pessoa que nunca comprou computador
Quero entender claramente por que o modelo recomendado é bom para mim
Para que eu possa tomar uma decisão de compra confiante, sabendo exatamente o que estou levando
```

### Critérios de Aceitação (BDD)

**Cenário 1: Recomendação foca em benefícios, não especificações**

```
Dado que o sistema processou as necessidades do usuário
Quando apresentar a recomendação do computador
Então deve mostrar primeiro os benefícios práticos como:
  - "Este computador liga em 5 segundos"
  - "Roda seus programas sem travar"
  - "Bateria dura o dia todo"
E as especificações técnicas (RAM, SSD, Processador) devem estar ocultas
```

**Cenário 2: Explicação didática do porquê da escolha**

```
Dado que o usuário recebeu uma recomendação
Quando ele expandir a seção "Por que este computador?"
Então deve ver uma explicação em linguagem simples como:
  "Escolhemos este porque você disse que vai usar para estudos.
   Ele tem processador suficiente para abrir várias abas do navegador
   e o SSD de 256GB guarda todos os seus trabalhos sem travar."
```

**Cenário 3: Comparação acessível com alternativas**

```
Dado que existem opções próximas ao orçamento
Quando o usuário solicitar mais informações
Então o sistema deve apresentar comparações em termos de benefícios:
  "Este é R$ 200 mais barato e tem a mesma velocidade,
   mas a tela é menor. Para estudos em casa, a tela maior
   pode ser mais confortável."
```

**Cenário 4: Botão de especificações técnicas ocultas**

```
Dado que o usuário quer ver os detalhes técnicos
Quando ele clicar em "Ver especificações avançadas"
Então deve revelar uma seção colapsada contendo:
  - Processador (modelo e geração)
  - Memória RAM (quantidade e velocidade)
  - Armazenamento (tipo e capacidade)
  - Placa de vídeo (se aplicável)
E deve manter a linguagem técnica apenas nesta seção opcional
```

---

## US03 - Ajuste de Orçamento Assistido

**Título:** O Sistema Reorienta o Usuário Gentilmente Quando o Orçamento é Incompatível

**Narrativa:**
```
Como usuário com orçamento limitado
Quero receber sugestões alternativas quando minha escolha excede meu dinheiro
Para que eu não me sinta frustrado ou abandone o processo por não poder pagar
```

### Critérios de Aceitação (BDD)

**Cenário 1: Orçamento incompatível com uso gamer**

```
Dado que o usuário disse querer um "computador gamer de última geração"
E informou orçamento de R$ 2.000
Quando o sistema processar esta combinação
Então deve identificar a incompatibilidade
E deve responder de forma empática, nunca rejeitante:
  "Entendi! Com R$ 2.000, os computadores gamers novos
   ficam um pouco acima do orçamento. Mas tenho algumas
   opções para te mostrar!"
```

**Cenário 2: Apresentação de alternativas reais**

```
Dado que o orçamento é incompatível com a solicitação original
Quando o sistema apresentar alternativas
Deve mostrar opções como:
  - Computadores seminovos com garantia
  - Modelos anteriores com bom desempenho
  - Possibilidade de upgrade futuro
E deve explicar cada alternativa em termos de benefícios
```

**Cenário 3: Reorientação sem jargões técnicos**

```
Dado que o sistema precisa explicar limitações de orçamento
Quando descrever as alternativas
Não deve usar termos como "GPU dedicada", "VRAM" ou "overclock"
Deve usar linguagem como:
  "Este modelo roda jogos mais antigos com facilidade,
   e para os mais novos, você pode aumentar a memória
   depois quando tiver mais orçamento."
```

**Cenário 4: Usuário recusa alternativas**

```
Dado que o sistema apresentou alternativas
Quando o usuário indicar que não quer as opções oferecidas
Então deve respeitar a decisão sem insistência
E deve deixar a porta aberta para retorno:
  "Sem problemas! Quando seu orçamento permitir,
   volte aqui e continuamos a busca. Enquanto isso,
   posso te passar dicas de como guardar para o
   computador dos sonhos?"
```

**Cenário 5: Usuário aceita reorientação**

```
Dado que o usuário aceitou as alternativas apresentadas
Quando ele confirmar interesse em uma opção
Então o sistema deve prosseguir com a recomendação detalhada
E deve celebrar a escolha de forma positiva:
  "Ótima escolha! Este computador vai te atender
   muito bem para o que você precisa."
```

---

## Priorização (MoSCoW)

| User Story | Prioridade | Sprint |
|------------|------------|--------|
| US01 - Linguagem Natural | Must Have | Sprint 1 |
| US02 - Recomendação Mastigada | Must Have | Sprint 1 |
| US03 - Ajuste de Orçamento | Should Have | Sprint 2 |

---

## Notas de Design

1. **Tom da Comunicação**: Sempre empático, paciente e encorajador. Nunca condescendente.

2. **Exemplos de Entrada**: O sistema deve oferecer exemplos de como descrever necessidades quando o usuário hesitar.

3. **Feedback Visual**: Indicadores de progresso e confirmação de que a mensagem foi entendida.

4. **Fallback**: Quando em dúvida, perguntar mais, nunca assumir incorretamente.