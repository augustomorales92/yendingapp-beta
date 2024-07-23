export interface JoinRequest {
  id: string
  attendands: number
  intentions: string
  photos: string[]
  status: string
  user_id: string
}

export interface Creator {
  id: string
  name: string
  email: string
  photo: string
}

export interface Previas {
  join_requests?: JoinRequest[]
  id?: string
  v?: number
  createdAt?: Date
  creator?: Creator
  date?: Date
  description?: string
  images_previa_url?: string[] | string
  location?: string
  participants?: string
  passCode?: string
  place_details?: string
  previa_id?: string
  show_location?: boolean
  startTime?: string
  updatedAt?: Date
}

export type UpdateJoinRequest = {
  previaId?: string
  userId: string
  status: 'accepted' | 'rejected'
}
