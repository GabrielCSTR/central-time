# Central Time - Aplicação de Dados de Futebol

Uma aplicação Vue.js para buscar e exibir informações detalhadas sobre times de futebol, incluindo estatísticas, jogadores e informações do estádio.

## 🚀 Tecnologias

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: Vercel Functions (Serverless)
- **Styling**: Tailwind CSS
- **API Externa**: SportMetrics API (api.sportmetrics.com.br)
- **Estado**: Pinia
- **Roteamento**: Vue Router 4
- **HTTP Client**: Axios
- **Linting**: ESLint + Prettier

## 📋 Pré-requisitos

- Node.js 18+ (recomendado: Node.js 22)
- npm ou yarn
- Conta no Vercel
- Chave da API do SportMetrics

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
# Desenvolvimento local (apenas frontend)
npm run dev

# Desenvolvimento completo (frontend + API serverless)
npm run vercel-dev

# Desenvolvimento limpo (mata portas e inicia)
npm run dev-clean
```

## 🔧 Configuração da API

### Obter chave da API

1. Acesse [https://sportmetrics.com.br/](https://sportmetrics.com.br/)
2. Registre-se para uma conta gratuita
3. Obtenha sua chave de API no dashboard
4. A versão gratuita permite 100 requisições por dia

### Variáveis de Ambiente

#### Desenvolvimento Local

Crie um arquivo `.env.local`:

```env
VIT_API_FOOTBALL_KEY=sua_chave_api_aqui
```

#### Produção (Vercel)

1. Acesse o dashboard do Vercel
2. Vá para o seu projeto
3. Clique em "Settings" > "Environment Variables"
4. Adicione:
   - **Name**: `VIT_API_FOOTBALL_KEY`
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
├── api/                   # Funções serverless do Vercel
│    └── times.js          # API para buscar dados do time
├── src/
│   ├── views/             # Páginas da aplicação
│   │   ├── HomeView.vue   # Página inicial com busca
│   │   └── TeamView.vue   # Página de detalhes do time
│   ├── config/            # Configurações (API, etc.)
│   │   └── api.ts         # Configuração da API
│   ├── interfaces/        # Tipos TypeScript
│   │   └── index.ts       # Interfaces do projeto
│   ├── stores/            # Estado global (Pinia)
│   │   └── counter.ts     # Store de exemplo
│   ├── router/            # Configuração de rotas
│   │   └── index.ts       # Rotas da aplicação
│   ├── assets/            # Recursos estáticos
│   │   ├── main.css       # Estilos globais
│   │   ├── base.css       # Estilos base
│   │   └── stadium-bg.jpg # Imagem de fundo
│   ├── App.vue            # Componente raiz
│   └── main.ts            # Ponto de entrada
├── public/                # Arquivos públicos
├── .vscode/               # Configurações do VS Code
├── .vercel/               # Configurações do Vercel
├── vercel.json            # Configuração do Vercel
├── vite.config.ts         # Configuração do Vite
├── tailwind.config.js     # Configuração do Tailwind
├── tsconfig.json          # Configuração do TypeScript
├── eslint.config.ts       # Configuração do ESLint
├── .prettierrc.json       # Configuração do Prettier
├── env.example            # Exemplo de variáveis de ambiente
├── DEPLOY.md              # Guia detalhado de deploy
└── ENV_SETUP.md           # Guia de configuração de ambiente
```

## 📄 Arquivos Importantes

### Configuração

- **`.env.local`**: Variáveis de ambiente locais (não versionado)
- **`env.example`**: Exemplo de variáveis de ambiente
- **`vercel.json`**: Configuração do Vercel (funções, rewrites, headers)
- **`vite.config.ts`**: Configuração do Vite
- **`tailwind.config.js`**: Configuração do Tailwind CSS
- **`tsconfig.json`**: Configuração do TypeScript

### Desenvolvimento

- **`.gitignore`**: Arquivos ignorados pelo Git
- **`.prettierrc.json`**: Configuração de formatação
- **`eslint.config.ts`**: Configuração de linting
- **`test-api.js`**: Script de teste da API

### Documentação

- **`README.md`**: Documentação principal
- **`DEPLOY.md`**: Guia detalhado de deploy
- **`ENV_SETUP.md`**: Configuração de ambiente

## 🔌 Endpoints da API

### GET /api/times?teamName=[teamName]

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
    "id": 456,
    "name": "Allianz Parque",
    "city": "São Paulo",
    "capacity": 43713,
    "surface": "Grama",
    "image": "https://..."
  },
  "statistics": {
    "league": "Brasileirão",
    "season": 2024,
    "form": "WWDLW",
    "fixtures": {
      "played": { "total": 20 },
      "wins": { "total": 15 },
      "draws": { "total": 3 },
      "loses": { "total": 2 }
    },
    "goals": {
      "for": { "total": 45 },
      "against": { "total": 18 }
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
- ✅ Lista de jogadores com estatísticas
- ✅ Interface responsiva
- ✅ Loading states e tratamento de erros
- ✅ Times populares na página inicial
- ✅ Navegação por rotas

## 🛠️ Scripts Disponíveis

```bash
npm run dev              # Desenvolvimento local (apenas frontend)
npm run vercel-dev       # Desenvolvimento completo (frontend + API)
npm run dev-clean        # Desenvolvimento limpo (mata portas e inicia)
npm run build            # Build para produção
npm run preview          # Preview do build
npm run type-check       # Verificação de tipos TypeScript
npm run lint             # Lint do código
npm run format           # Formatação do código
npm run deploy           # Deploy no Vercel
npm run test-api         # Teste da API local
```

## 🔍 Como Usar

1. Acesse a aplicação
2. Digite o nome de um time no campo de busca
3. Clique em "Buscar" ou pressione Enter
4. Ou clique em um dos times populares na página inicial
5. Visualize as informações detalhadas do time

## 🐛 Solução de Problemas

### Erro 500 - Chave da API não configurada

- Verifique se a variável `VIT_API_FOOTBALL_KEY` está configurada
- No Vercel: Settings > Environment Variables

### Erro 429 - Limite de requisições excedido

- A versão gratuita da API tem limite de 100 requisições/dia
- Aguarde algumas horas ou faça upgrade da conta

### Time não encontrado

- Tente nomes diferentes (ex: "palmeiras" em vez de "Palmeiras")
- Verifique se o time existe na base de dados da API

### Erro de CORS

- Verifique se está usando `npm run vercel-dev` para desenvolvimento completo
- As configurações CORS estão no `vercel.json`

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📚 Documentação Adicional

- [Guia de Deploy](./DEPLOY.md) - Instruções detalhadas para deploy
- [Configuração de Ambiente](./ENV_SETUP.md) - Guia de variáveis de ambiente
