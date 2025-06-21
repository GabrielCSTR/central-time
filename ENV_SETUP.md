# Configuração de Variáveis de Ambiente

## Para Desenvolvimento Local

Crie um arquivo `.env.local` na raiz do projeto com:

```env
API_FOOTBALL_KEY=sua_chave_api_aqui
```

## Para Produção (Vercel)

1. Acesse o dashboard do Vercel
2. Vá para o seu projeto
3. Clique em "Settings" > "Environment Variables"
4. Adicione a variável:
   - **Name**: `API_FOOTBALL_KEY`
   - **Value**: sua chave da API do Football API
   - **Environment**: Production (e Preview se desejar)

## Como obter a chave da API

1. Acesse [https://www.api-football.com/](https://www.api-football.com/)
2. Registre-se para uma conta gratuita
3. Obtenha sua chave de API no dashboard
4. A versão gratuita permite 100 requisições por dia

## Estrutura das Variáveis

- `API_FOOTBALL_KEY`: Chave necessária para acessar a API de dados de futebol
- `NODE_ENV`: Ambiente de execução (development/production)
