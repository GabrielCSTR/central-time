# API SportMetrics - Documentação de Integração

Este documento demonstra como integrar a **API SportMetrics** em seu projeto, usando o Central Time como exemplo prático.

## 🚀 Sobre a API SportMetrics

A **API SportMetrics** é a API brasileira mais completa para dados de futebol, oferecendo:

- ✅ **Dados de Times**: Informações completas, logos, história
- ✅ **Estatísticas**: Performance, vitórias, empates, derrotas
- ✅ **Jogadores**: Elenco atual com estatísticas individuais
- ✅ **Estádios**: Capacidade, localização, fotos
- ✅ **Competições**: Brasileirão, Copa do Brasil, Libertadores
- ✅ **Gratuita**: 100 requisições por dia na versão gratuita

**[🔗 Acesse a API SportMetrics](https://sportmetrics.com.br/)**

## 📋 Como Obter Sua Chave da API

1. Acesse [https://sportmetrics.com.br/](https://sportmetrics.com.br/)
2. Registre-se para uma conta gratuita
3. Obtenha sua chave de API no dashboard
4. A versão gratuita permite 100 requisições por dia

## 🔧 Configuração Básica

### 1. Instalar Dependências

```bash
npm install axios
# ou
yarn add axios
```

### 2. Configurar Variáveis de Ambiente

```env
# .env.local
VIT_API_FOOTBALL_KEY=sua_chave_api_aqui
```

### 3. Configurar Cliente HTTP

```typescript
// config/api.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.sportmetrics.com.br/api/v1',
  headers: {
    Authorization: `Bearer ${process.env.VIT_API_FOOTBALL_KEY}`,
    'Content-Type': 'application/json',
  },
})

export default apiClient
```

## 📡 Endpoints Principais

### 1. Buscar Dados de um Time

```typescript
// Buscar informações completas de um time
const getTeamData = async (teamName: string) => {
  try {
    const response = await apiClient.get(`/times/${teamName}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar dados do time:', error)
    throw error
  }
}
```

**Resposta:**

```json
{
  "time_id": 121,
  "nome": "Palmeiras",
  "pais": "Brazil",
  "fundacao": 1914,
  "estadio": {
    "id": 456,
    "nome": "Allianz Parque",
    "cidade": "São Paulo",
    "capacidade": 43713,
    "superficie": "Grama"
  }
}
```

### 2. Obter Estatísticas

```typescript
// Buscar estatísticas da temporada
const getTeamStats = async (teamId: number, competitionId: number, season: number) => {
  try {
    const response = await apiClient.get('/times/estatisticas', {
      params: {
        time_id: teamId,
        competicao_id: competitionId,
        temporada: season,
      },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    throw error
  }
}
```

**Resposta:**

```json
{
  "liga": {
    "nome": "Brasileirão",
    "temporada": 2024
  },
  "partidas": {
    "disputadas": 38,
    "vitorias": 25,
    "empates": 8,
    "derrotas": 5
  },
  "gols": {
    "marcados": 67,
    "sofridos": 28
  },
  "historico": "VVVVE"
}
```

### 3. Listar Jogadores

```typescript
// Buscar jogadores do time
const getTeamPlayers = async (teamId: number, competitionId: number, season: number) => {
  try {
    const response = await apiClient.get('/jogador/estatisticas', {
      params: {
        time_id: teamId,
        competicao_id: competitionId,
        temporada: season,
      },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error)
    throw error
  }
}
```

**Resposta:**

```json
[
  {
    "jogador_id": 123,
    "nome": "Endrick",
    "posicao": "Atacante",
    "nacionalidade": "Brasil",
    "idade": 18,
    "gols": 12,
    "assistencias": 8
  }
]
```

## 🛠️ Exemplo de Implementação Completa

### Serverless Function (Vercel)

```javascript
// api/times.js
import axios from 'axios'

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const { teamName } = req.query
  const apiKey = process.env.VIT_API_FOOTBALL_KEY

  if (!teamName) {
    return res.status(400).json({ message: 'Nome do time é obrigatório' })
  }

  if (!apiKey) {
    return res.status(500).json({ message: 'Chave da API não configurada' })
  }

  try {
    // Buscar dados do time
    const teamResponse = await axios.get(
      `https://api.sportmetrics.com.br/api/v1/times/${teamName}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      },
    )

    const team = teamResponse.data
    const teamId = team.time_id

    // Buscar estatísticas
    let statistics = null
    try {
      const statsResponse = await axios.get(
        'https://api.sportmetrics.com.br/api/v1/times/estatisticas',
        {
          params: {
            time_id: teamId,
            competicao_id: 71, // Brasileirão
            temporada: new Date().getFullYear(),
          },
          headers: { Authorization: `Bearer ${apiKey}` },
        },
      )
      statistics = statsResponse.data
    } catch (error) {
      console.log('Estatísticas não disponíveis')
    }

    // Buscar jogadores
    let players = []
    try {
      const playersResponse = await axios.get(
        'https://api.sportmetrics.com.br/api/v1/jogador/estatisticas',
        {
          params: {
            time_id: teamId,
            competicao_id: 71,
            temporada: new Date().getFullYear(),
          },
          headers: { Authorization: `Bearer ${apiKey}` },
        },
      )
      players = playersResponse.data.slice(0, 20)
    } catch (error) {
      console.log('Jogadores não disponíveis')
    }

    // Montar resposta completa
    const completeTeamData = {
      team: {
        id: team.time_id,
        name: team.nome,
        country: team.pais,
        founded: team.fundacao,
        logo: `https://media.api-sports.io/football/teams/${team.time_id}.png`,
      },
      venue: {
        id: team.estadio.id,
        name: team.estadio.nome,
        city: team.estadio.cidade,
        capacity: team.estadio.capacidade,
        surface: team.estadio.superficie,
      },
      statistics: statistics
        ? {
            league: statistics.liga.nome,
            season: statistics.liga.temporada,
            form: statistics.historico,
            fixtures: {
              played: statistics.partidas.disputadas,
              wins: statistics.partidas.vitorias,
              draws: statistics.partidas.empates,
              loses: statistics.partidas.derrotas,
            },
            goals: {
              for: statistics.gols.marcados,
              against: statistics.gols.sofridos,
            },
          }
        : null,
      players: players.length > 0 ? players : null,
    }

    res.status(200).json(completeTeamData)
  } catch (error) {
    console.error('Erro na API:', error.response?.data || error.message)

    if (error.response?.status === 429) {
      return res.status(429).json({
        message: 'Limite de requisições excedido. Tente novamente em alguns minutos.',
      })
    }

    res.status(500).json({
      message: 'Erro interno do servidor ao buscar dados do time.',
    })
  }
}
```

### Frontend (Vue.js)

```vue
<!-- TeamView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const teamData = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchTeamData = async () => {
  try {
    loading.value = true
    const response = await fetch(
      `/api/times?teamName=${encodeURIComponent(route.params.nomeDoTime)}`,
    )

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do time')
    }

    teamData.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTeamData()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-500 mx-auto"></div>
      <p class="mt-4 text-lg">Carregando dados do time...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="teamData" class="space-y-8">
      <!-- Informações do Time -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex items-center space-x-4">
          <img :src="teamData.team.logo" :alt="teamData.team.name" class="w-16 h-16" />
          <div>
            <h1 class="text-3xl font-bold">{{ teamData.team.name }}</h1>
            <p class="text-gray-600">Fundado em {{ teamData.team.founded }}</p>
          </div>
        </div>
      </div>

      <!-- Estatísticas -->
      <div v-if="teamData.statistics" class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Estatísticas da Temporada</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-accent-600">
              {{ teamData.statistics.fixtures.played }}
            </div>
            <div class="text-sm text-gray-600">Jogos</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">
              {{ teamData.statistics.fixtures.wins }}
            </div>
            <div class="text-sm text-gray-600">Vitórias</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ teamData.statistics.fixtures.draws }}
            </div>
            <div class="text-sm text-gray-600">Empates</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">
              {{ teamData.statistics.fixtures.loses }}
            </div>
            <div class="text-sm text-gray-600">Derrotas</div>
          </div>
        </div>
      </div>

      <!-- Jogadores -->
      <div v-if="teamData.players" class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Jogadores</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="player in teamData.players"
            :key="player.jogador_id"
            class="border rounded-lg p-4"
          >
            <h3 class="font-bold">{{ player.nome }}</h3>
            <p class="text-sm text-gray-600">{{ player.posicao }} • {{ player.nacionalidade }}</p>
            <p class="text-sm text-gray-600">{{ player.idade }} anos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

## 🔍 Tratamento de Erros

### Códigos de Status Comuns

- **200**: Sucesso
- **400**: Parâmetros inválidos
- **401**: Chave da API inválida
- **404**: Time não encontrado
- **429**: Limite de requisições excedido
- **500**: Erro interno do servidor

### Exemplo de Tratamento

```typescript
const handleApiError = (error: any) => {
  if (error.response?.status === 429) {
    return 'Limite de requisições excedido. Tente novamente em alguns minutos.'
  }

  if (error.response?.status === 404) {
    return 'Time não encontrado. Verifique o nome e tente novamente.'
  }

  if (error.response?.status === 401) {
    return 'Chave da API inválida. Verifique suas credenciais.'
  }

  return 'Erro interno. Tente novamente mais tarde.'
}
```

## 📊 Planos e Limites

| Plano      | Requisições/Dia | Preço        | Recursos            |
| ---------- | --------------- | ------------ | ------------------- |
| Gratuito   | 100             | R$ 0         | Dados básicos       |
| Pro        | 1.000           | R$ 49        | Dados históricos    |
| Enterprise | Ilimitado       | Sob consulta | Dados em tempo real |

## 🚀 Próximos Passos

1. **[Registre-se na API SportMetrics](https://sportmetrics.com.br/)**
2. **Obtenha sua chave gratuita**
3. **Teste os endpoints**
4. **Implemente em seu projeto**
5. **Compartilhe sua experiência**

## 📞 Suporte

- **Website**: [https://sportmetrics.com.br/](https://sportmetrics.com.br/)
- **Documentação**: Disponível no dashboard
- **Email**: <suporte@sportmetrics.com.br>

---

**Central Time** é uma demonstração da API SportMetrics. Para mais informações sobre a API, visite [sportmetrics.com.br](https://sportmetrics.com.br/).
