# Análise de Viabilidade

## Ajuda Tech: Assistente Inteligente para Compra de Computadores

**Data:** Maio de 2026  
**Autor:** Equipe do Projeto

---

## 1. Resumo Executivo

Este documento analisa a viabilidade técnica, de negócio e operacional do Ajuda Tech no escopo do MVP. A conclusão é que o projeto é **viável**, com baixa complexidade técnica para o MVP e um problema real bem delimitado.

---

## 2. Viabilidade Técnica

### 2.1 Stack do MVP

| Componente     | Tecnologia                    | Justificativa                                          |
| -------------- | ----------------------------- | ------------------------------------------------------ |
| Linguagem      | Python 3.12                   | Maturidade, suporte a LLMs, ecossistema rico           |
| Framework web  | Django 5.x                    | Inclui ORM, admin, autenticação e segurança por padrão |
| IA             | API Open Router | APIs maduras, documentação extensa, pay-as-you-go      |
| Frontend       | Django Templates              | Sem necessidade de framework JS separado no MVP        |

### 2.2 Complexidade Técnica

| Item                      | Nível       | Observação                                     |
| ------------------------- | ----------- | ---------------------------------------------- |
| Setup do Django           | Baixo       | Framework maduro, bem documentado              |
| Integração com API de LLM | Baixo-Médio | SDKs disponíveis (openai, google-generativeai) |
| Interface de chat         | Médio       | Requer AJAX ou polling para UX fluida          |
| Persistência de sessão    | Baixo       | Django Session Framework nativo                |
| Deploy local (dev)        | Baixo       | `manage.py runserver`                          |

### 2.3 Riscos Técnicos

| Risco                        | Probabilidade | Impacto | Mitigação                                              |
| ---------------------------- | ------------- | ------- | ------------------------------------------------------ |
| Respostas imprecisas da IA   | Média         | Alto    | Engenharia de prompt cuidadosa (ver prompts.md)        |
| Latência da API de LLM       | Baixa         | Médio   | Indicador de carregamento na UI                        |
| Custo elevado de API         | Baixa         | Médio   | Limitar tokens por requisição, usar modelos menores    |
| Contexto de conversa perdido | Baixa         | Alto    | Enviar histórico completo da sessão em cada requisição |

---

## 3. Viabilidade de Negócio

### 3.1 Problema de Mercado

- Mercado de computadores no Brasil movimenta bilhões de reais anualmente
- Grande parcela dos compradores é leiga em tecnologia
- Lojas físicas e e-commerces não oferecem orientação personalizada e neutra
- Assistentes genéricos (como ChatGPT) não têm foco no problema específico

### 3.2 Proposta de Valor

> "Você descreve o que quer fazer. Nós indicamos o computador certo para você."

- Gratuito para o usuário final (modelo freemium ou B2B possível no futuro)
- Neutro: não vinculado a nenhuma marca ou loja específica no MVP
- Simples: sem cadastro, sem complicação

### 3.3 Potencial de Evolução (Pós-MVP)

| Funcionalidade                            | Potencial de Monetização |
| ----------------------------------------- | ------------------------ |
| Links de afiliados para lojas             | Comissão por venda       |
| Versão white-label para lojas             | SaaS B2B                 |
| Anúncios de fabricantes                   | CPM / CPC                |
| Plano premium com comparativos detalhados | Assinatura               |

---

## 4. Conclusão

| Critério                | Avaliação      |
| ----------------------- | -------------- |
| Viabilidade técnica     | ✅ Alta        |
| Viabilidade de negócio  | ✅ Alta        |
| Viabilidade operacional | ✅ Alta        |
| Risco geral             | 🟡 Baixo-Médio |

O Ajuda Tech é um projeto **viável e recomendado para execução**. O MVP pode ser entregue em menos de 2 semanas com uma equipe enxuta, custo baixo e tecnologias consolidadas. O problema é real, o mercado é amplo e a solução é diferenciada pelo foco e pela simplicidade.

**Recomendação: avançar para o desenvolvimento do MVP.**
