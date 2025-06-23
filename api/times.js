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

  if (!teamName) {
    return res.status(400).json({ message: 'Nome do time é obrigatório' })
  }

  const apiKey = process.env.VIT_API_FOOTBALL_KEY

  if (!apiKey) {
    return res.status(500).json({
      message:
        'Chave da API não configurada. Configure a variável de ambiente VIT_API_FOOTBALL_KEY.',
    })
  }

  try {
    const teamOptions = {
      method: 'GET',
      url: `https://api.sportmetrics.com.br/api/v1/times/${teamName}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    // Buscar informações do time pelo nome
    const teamResponse = await axios.request(teamOptions)
    if (teamResponse.data.length === 0) {
      return res.status(404).json({
        message: `Time "${teamName}" não encontrado. Tente buscar por outro nome.`,
      })
    }

    const team = teamResponse.data
    const teamId = team.time_id

    // Buscar estatísticas da temporada atual
    let statistics = null
    try {
      const statsOptions = {
        method: 'GET',
        url: 'https://api.sportmetrics.com.br/api/v1/times/estatisticas',
        params: {
          time_id: teamId,
          competicao_id: 71, // Brasileirão
          temporada: new Date().getFullYear(),
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
      const statsResponse = await axios.request(statsOptions)
      if (statsResponse.data) {
        statistics = statsResponse.data
      }
    } catch {
      console.log('Estatísticas não disponíveis para este time')
    }

    // Buscar jogadores do time
    let players = []
    try {
      const playersOptions = {
        method: 'GET',
        url: 'https://api.sportmetrics.com.br/api/v1/jogador/estatisticas',
        params: {
          time_id: +teamId,
          competicao_id: 71, // Brasileirão
          temporada: new Date().getFullYear(),
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }

      const playersResponse = await axios.request(playersOptions)
      if (playersResponse.data.length > 0) {
        players = playersResponse.data.slice(0, 20)
      }
    } catch {
      console.log('Jogadores não disponíveis para este time')
    }

    // Buscar próximos jogos
    let upcomingFixtures = []
    try {
      const fixturesOptions = {
        method: 'GET',
        url: `https://api.sportmetrics.com.br/api/v1/${team.time_id}/proximos-jogos`,
        params: {
          time_id: teamId,
        },
        headers: { Authorization: `Bearer ${apiKey}` },
      }
      const fixturesResponse = await axios.request(fixturesOptions)
      console.log('Próximos jogos:', fixturesResponse.data)

      if (fixturesResponse.data?.length > 0) {
        upcomingFixtures = fixturesResponse.data
      }
    } catch {
      console.log('Próximos jogos não disponíveis')
    }

    // Montar resposta completa
    const completeTeamData = {
      team: {
        id: team.time_id,
        name: team.nome,
        country: team.pais,
        founded: team.fundacao,
        logo: `https://cdn.sportmetrics.com.br/football/teams/${team.time_id}.png`,
      },
      venue: {
        id: team.estadio.id,
        name: team.estadio.nome,
        city: team.estadio.cidade,
        capacity: team.estadio.capacidade,
        surface: team.estadio.superficie,
        image: `https://cdn.sportmetrics.com.br/football/venues/${team.estadio.id}.png`,
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
      upcoming_fixtures: upcomingFixtures.length > 0 ? upcomingFixtures : null,
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
