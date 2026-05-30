# 💻 Ajuda Tech — Assistente Inteligente para Compra de Computadores

Ajuda Tech é uma aplicação web com IA integrada que auxilia usuários leigos a encontrarem o computador ideal (PC ou Notebook) de acordo com sua necessidade e orçamento — sem precisar entender de tecnologia.

<img width="821" height="948" alt="ajudatech-ai" src="https://github.com/user-attachments/assets/d6c5d397-0ccb-4011-bda1-3ea6eec01aac" />

---

## 🎯 Objetivo

Muitas pessoas têm dificuldade em escolher um computador porque não entendem as especificações técnicas. O Ajuda Tech resolve isso com uma conversa simples: o usuário descreve o que quer fazer com o computador e a IA recomenda a melhor opção.

---

## 🚀 Funcionalidades

- Chat interativo com IA para coleta de necessidades do usuário
- Recomendação personalizada de PC ou Notebook com base no perfil do usuário
- Explicações em linguagem simples, sem jargões técnicos
- Histórico de conversas por sessão
- Interface web responsiva e acessível

---

## 🛠️ Tecnologias (MVP)

| Camada         | Tecnologia                   |
| -------------- | ---------------------------- |
| Backend        | Python 3.12+                 |
| Framework      | Django 5.x                   |
| IA             | API de LLM (Open Router) |
| Frontend       | Django Templates + HTML/CSS  |

---

## 📦 Instalação e Configuração

### Pré-requisitos

- Python 3.12 ou superior
- pip (recomendado usar python -m pip)
- Chave de API do provedor de LLM (Open Router)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/Ajuda Tech.git
cd ajudatech

# 2. Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate   # Windows

# 3. Instale as dependências
# Recomendação: utilize o gerenciador de pacotes pip via python -m pip
python -m pip install -r requirements.txt

# 4. Configure as variáveis de ambiente
# Edite o arquivo .env (já incluso no repositório) e preencha conforme seu ambiente.

# 5. Aplique as migrações
python manage.py migrate

# 6. Execute testes (opcional)
pytest

# 7. Inicie o servidor de desenvolvimento
python manage.py runserver
```

Acesse em: `http://localhost:8000`

### Front-end do chat (preview local, sem Django)

```bash
npm install
npm test
npx serve chat/static/chat
```

Abra a URL exibida (ex.: `http://localhost:3000`) para ver a página de chat com API mockada.

---

## ⚙️ Variáveis de Ambiente

```env
SECRET_KEY=sua_chave_secreta_django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
LLM_API_KEY=sua_chave_de_api_da_ia
LLM_PROVIDER=openrouter  # ou openrouter
```

Observação: o projeto inclui um arquivo `.env` com valores de exemplo; não comite chaves reais. Para variáveis sensíveis em desenvolvimento, prefira usar um arquivo `.env.local` (listado no .gitignore) e rotacione chaves caso ocorram exposições.

---

## 📁 Estrutura do Projeto

```
ajudatech/
├── core/                   # App principal do Django
│   ├── models.py           # Modelos: Sessão, Mensagem, Recomendação
│   ├── views.py            # Views do chat e resultado
│   ├── urls.py
│   └── services/
│       └── ai_service.py   # Integração com a API de LLM
├── templates/              # Templates HTML
├── static/                 # CSS, JS, imagens
├── ajudatech/               # Configurações do projeto Django
│   ├── settings.py
│   └── urls.py
├── docs/                   # Documentação do projeto
├── manage.py
├── requirements.txt
├── .env.example
└── README.md
```

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
