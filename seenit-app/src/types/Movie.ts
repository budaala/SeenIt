export type Movie = {
  id: string
  title: string
  year: number
  cover: string
  description: string
  trailer: string
  imdbRating: number
  personalRating: number | null
  status: 'watched' | 'toWatch'
  streaming: string[]
  inCollection: boolean
}