# 🚀 Guia de Deploy - Central Time

Este guia explica como fazer deploy da aplicação Central Time no Vercel.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [API-Football](https://www.api-football.com/)
- Repositório Git configurado

## 🔧 Configuração Inicial

### 1. Obter Chave da API

1. Acesse [https://www.api-football.com/](https://www.api-football.com/)
2. Registre-se para uma conta gratuita
3. Obtenha sua chave de API no dashboard
4. A versão gratuita permite 100 requisições por dia

### 2. Configurar Variáveis de Ambiente

#### No Vercel Dashboard

1. Acesse [vercel.com](https://vercel.com)
2. Vá para seu projeto
3. Clique em "Settings" > "Environment Variables"
4. Adicione:
   - **Name**: `API_FOOTBALL_KEY`
   - **Value**: sua chave da API
   - **Environment**: Production, Preview, Development

## 🚀 Deploy Automático (Recomendado)

### 1. Conectar Repositório

1. No dashboard do Vercel, clique em "New Project"
2. Conecte seu repositório (GitHub, GitLab, Bitbucket)
3. Selecione o repositório `central-time`

### 2. Configurar Projeto

O Vercel detectará automaticamente que é um projeto Vue.js. As configurações padrão são:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Sua aplicação estará disponível em `https://seu-projeto.vercel.app`

## 🛠️ Deploy Manual

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Fazer Login

```bash
vercel login
```

### 3. Deploy

```bash
# Deploy para preview
vercel

# Deploy para produção
vercel --prod
```

## 🔍 Verificação do Deploy

### 1. Testar API

Após o deploy, teste a API:

```bash
curl https://seu-projeto.vercel.app/api/time/palmeiras
```

### 2. Verificar Logs

No dashboard do Vercel:

1. Vá para "Functions"
2. Clique na função `/api/time/[teamName]`
3. Verifique os logs para erros

### 3. Testar Frontend

1. Acesse a URL do seu projeto
2. Digite "palmeiras" no campo de busca
3. Verifique se os dados são carregados

## 🐛 Solução de Problemas

### Erro 500 - API Key não configurada

**Sintoma**: Erro 500 ao acessar `/api/time/[teamName]`

**Solução**:

1. Verifique se `API_FOOTBALL_KEY` está configurada no Vercel
2. Reinicie o deploy após adicionar a variável

### Erro 429 - Limite de requisições

**Sintoma**: Erro 429 ao acessar a API

**Solução**:

1. Aguarde algumas horas (limite diário)
2. Faça upgrade da conta na API-Football

### Erro de CORS

**Sintoma**: Erro de CORS no navegador

**Solução**:

1. Verifique se os headers CORS estão configurados no `vercel.json`
2. Reinicie o deploy

### Build falha

**Sintoma**: Erro durante o build

**Solução**:

1. Verifique os logs do build no Vercel
2. Teste localmente: `npm run build`
3. Corrija erros de TypeScript: `npm run type-check`

## 📊 Monitoramento

### Logs em Tempo Real

```bash
vercel logs --follow
```

### Métricas

No dashboard do Vercel:

- **Analytics**: Visualizações e performance
- **Functions**: Execuções e erros das APIs
- **Speed Insights**: Performance do frontend

## 🔄 Atualizações

### Deploy Automático

A cada push para a branch principal:

1. O Vercel detecta as mudanças
2. Executa o build automaticamente
3. Faz deploy da nova versão

### Deploy Manual

```bash
# Após fazer mudanças
git add .
git commit -m "Atualização"
git push

# Ou deploy manual
vercel --prod
```

## 🎯 Otimizações

### Performance

1. **Cache**: Configure cache para as APIs
2. **CDN**: O Vercel usa CDN global automaticamente
3. **Compressão**: Ativada automaticamente

### Custo

- **Hobby Plan**: Gratuito
- **Pro Plan**: $20/mês (se necessário)
- **Enterprise**: Contato direto

## 📞 Suporte

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **API-Football Docs**: [api-football.com/documentation](https://www.api-football.com/documentation)
- **Issues**: Abra uma issue no repositório

---

🎉 **Parabéns!** Sua aplicação está no ar e funcionando!
