import type {
  Building as ApiBuilding,
  CreateBuildingDto,
  UpdateBuildingDto,
} from '@/lib/types/api'

// Use API types directly
export type Building = ApiBuilding
export type CreateBuildingData = CreateBuildingDto
export type UpdateBuildingData = UpdateBuildingDto

// Legacy compatibility helpers
export const mapLegacyBuilding = (building: Building) => ({
  ...building,
  floors: building.totalFloors || 0,
  units: building.totalUnits || 0,
  description: building.notes || '',
  administrator: '', // Not in API
  phone: '', // Not in API
  email: '', // Not in API
})

export const mapToApiBuilding = (data: {
  name: string
  address: string
  city?: string
  description?: string
  units?: number
  floors?: number
}): CreateBuildingDto => ({
  name: data.name,
  address: data.address,
  city: data.city || 'Buenos Aires',
  country: 'Argentina',
  notes: data.description,
  totalFloors: data.floors,
  totalUnits: data.units,
})
