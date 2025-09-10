export interface Building {
  id: string
  name: string
  address: string
  description: string
  units: number
  floors: number
  administrator: string
  phone: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateBuildingData {
  name: string
  address: string
  description: string
  units: number
  floors: number
  administrator: string
  phone: string
  email: string
}

export interface UpdateBuildingData extends Partial<CreateBuildingData> {
  id: string
}
