# Central Time - Aplicação de Dados de Futebol

Uma aplicação Vue.js para buscar e exibir informações detalhadas sobre times de futebol, incluindo estatísticas, jogadores e informações do estádio.

## 🚀 Tecnologias

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: Vercel Functions (Serverless)
- **Styling**: Tailwind CSS
- **API Externa**: Football API (api-football.com)

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Vercel
- Chave da API do Football API

## 🛠️ Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd central-time
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie um arquivo .env.local na raiz do projeto
cp .env.example .env.local
# Edite o arquivo e adicione sua chave da API
```

4. **Execute em desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

## 🔧 Configuração da API

### Obter chave da API

1. Acesse [https://www.api-football.com/](https://www.api-football.com/)
2. Registre-se para uma conta gratuita
3. Obtenha sua chave de API no dashboard
4. A versão gratuita permite 100 requisições por dia

### Variáveis de Ambiente

#### Desenvolvimento Local

Crie um arquivo `.env.local`:

```env
API_FOOTBALL_KEY=sua_chave_api_aqui
```

#### Produção (Vercel)

1. Acesse o dashboard do Vercel
2. Vá para o seu projeto
3. Clique em "Settings" > "Environment Variables"
4. Adicione:
   - **Name**: `API_FOOTBALL_KEY`
   - **Value**: sua chave da API
   - **Environment**: Production

## 🚀 Deploy no Vercel

### Deploy Automático

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. O deploy será automático a cada push

### Deploy Manual

```bash
# Instale o Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel --prod
```

## 📁 Estrutura do Projeto

```
central-time/
├── api/                    # Funções serverless do Vercel
│   └── team/
│       └── [teamName].mjs  # API para buscar dados do time
├── src/
│   ├── components/         # Componentes Vue
│   ├── views/             # Páginas da aplicação
│   ├── config/            # Configurações (API, etc.)
│   ├── interfaces/        # Tipos TypeScript
│   └── stores/            # Estado global (Pinia)
├── vercel.json            # Configuração do Vercel
└── vite.config.ts         # Configuração do Vite
```

## 🔌 Endpoints da API

### GET /api/team/[teamName]

Busca informações completas de um time.

**Parâmetros:**

- `teamName` (string): Nome do time (ex: "palmeiras", "flamengo")

**Resposta:**

```json
{
  "team": {
    "id": 123,
    "name": "Palmeiras",
    "country": "Brazil",
    "founded": 1914,
    "logo": "https://..."
  },
  "venue": {
    "name": "Allianz Parque",
    "city": "São Paulo",
    "capacity": 43713
  },
  "statistics": {
    "league": "Brasileirão",
    "season": 2024,
    "fixtures": {
      "played": 20,
      "wins": 15,
      "draws": 3,
      "loses": 2
    }
  },
  "players": [...]
}
```

## 🎨 Funcionalidades

- ✅ Busca de times por nome
- ✅ Informações detalhadas do time
- ✅ Dados do estádio
- ✅ Estatísticas da temporada
- ✅ Lista de jogadores
- ✅ Interface responsiva
- ✅ Loading states e tratamento de erros

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento local
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Lint do código
npm run format       # Formatação do código
npm run deploy       # Deploy no Vercel
```

## 🔍 Como Usar

1. Acesse a aplicação
2. Digite o nome de um time no campo de busca
3. Clique em "Buscar" ou pressione Enter
4. Visualize as informações detalhadas do time

## 🐛 Solução de Problemas

### Erro 500 - Chave da API não configurada

- Verifique se a variável `API_FOOTBALL_KEY` está configurada
- No Vercel: Settings > Environment Variables

### Erro 429 - Limite de requisições excedido

- A versão gratuita da API tem limite de 100 requisições/dia
- Aguarde algumas horas ou faça upgrade da conta

### Time não encontrado

- Tente nomes diferentes (ex: "palmeiras" em vez de "Palmeiras")
- Verifique se o time existe na base de dados da API

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
