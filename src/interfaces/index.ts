export interface Team {
  id: number
  name: string
  country: string
  founded: number
  logo: string
}

export interface Venue {
  id: number
  name: string
  city: string
  capacity: number
  surface: string
  image: string
}

interface FixtureStats {
  casa: number
  fora: number
  total: number
}

interface GoalDetails {
  total: number | null
  porcentagem: string | null
}

interface GoalMinutes {
  '0-15': GoalDetails
  '16-30': GoalDetails
  '31-45': GoalDetails
  '46-60': GoalDetails
  '61-75': GoalDetails
  '76-90': GoalDetails
  '91-105': GoalDetails
  '106-120': GoalDetails
}

interface GoalStats {
  total: {
    casa: number
    fora: number
    total: number
  }
  media: {
    casa: string
    fora: string
    total: string
  }
  minutos: GoalMinutes
}

// Player related interfaces
interface Nascimento {
  data: string
  local: string | null
  pais: string
}

interface Jogador {
  id: number
  nome: string
  primeiro_nome: string
  sobrenome: string
  idade: number
  nascimento: Nascimento
  nacionalidade: string
  altura: string | null
  peso: string | null
  foto: string
}

interface TimeEstatistica {
  id: number
  nome: string
  logo: string
}

interface Liga {
  id: number
  nome: string
  pais: string
  logo: string
  bandeira: string
  temporada: number
}

interface Jogos {
  aparicoes: number | null
  titulares: number | null
  minutos: number | null
  numero: number | null
  posicao: string
  avaliacao: string | null
  capitao: boolean
}

interface Substituicoes {
  entrou: number | null
  saiu: number | null
  banco: number | null
}

interface Chutes {
  total: number | null
  no_gol: number | null
}

interface GolsJogador {
  total: number | null
  sofridos: number | null
  assistencias: number | null
  defesas: number | null
}

interface Passes {
  total: number | null
  chave: number | null
  precisao: string | null
}

interface Desarmes {
  total: number | null
  bloqueios: number | null
  interceptacoes: number | null
}

interface Duelos {
  total: number | null
  ganhos: number | null
}

interface Dribles {
  tentativas: number | null
  sucesso: number | null
  superado: number | null
}

interface Faltas {
  sofridas: number | null
  cometidas: number | null
}

interface Cartoes {
  amarelo: number | null
  segundo_amarelo: number | null
  vermelho: number | null
}

interface Penaltis {
  ganhos: number | null
  cometidos: number | null
  convertidos: number | null
  perdidos: number | null
  defendidos: number | null
}

interface EstatisticasJogador {
  time: TimeEstatistica
  liga: Liga
  jogos: Jogos
  substituicoes: Substituicoes
  chutes: Chutes
  gols: GolsJogador
  passes: Passes
  desarmes: Desarmes
  duelos: Duelos
  dribles: Dribles
  faltas: Faltas
  cartoes: Cartoes
  penaltis: Penaltis
}

export interface Player {
  jogador: Jogador
  estatisticas: EstatisticasJogador[]
}

export interface TeamData {
  team: Team
  venue: Venue
  statistics?: {
    league: string
    season: number
    form: string
    fixtures: {
      played: FixtureStats
      wins: FixtureStats
      draws: FixtureStats
      loses: FixtureStats
    }
    goals: {
      for: GoalStats
      against: GoalStats
    }
  }
  players?: Player[]
}
