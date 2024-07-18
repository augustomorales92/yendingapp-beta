export interface JoinRequest {
  id: string
  attendands: number
  intentions: string
  photos: string[]
  status: string
  user_id: string
}

export interface Previas {
  join_requests: JoinRequest[]
  id: string
  v: number
  createdAt: Date
  creator: string
  date: Date
  description: string
  images_previa_url: string[]
  location: string
  participants: number
  passCode: string
  place_details: string
  previa_id: string
  show_location: boolean
  startTime: string
  updatedAt: Date
}
