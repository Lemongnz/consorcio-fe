export type UnitStatus = 'occupied' | 'vacant' | 'maintenance'
export type UnitType = 'apartment' | 'office' | 'commercial' | 'parking'

export interface Unit {
  id: string
  number: string
  buildingId: string
  buildingName: string
  floor: number
  type: UnitType
  status: UnitStatus
  area: number // in square meters
  bedrooms?: number
  bathrooms?: number
  owner: string
  ownerEmail: string
  ownerPhone: string
  tenant?: string
  tenantEmail?: string
  tenantPhone?: string
  monthlyRent?: number
  monthlyExpenses: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateUnitData {
  number: string
  buildingId: string
  floor: number
  type: UnitType
  area: number
  bedrooms?: number
  bathrooms?: number
  owner: string
  ownerEmail: string
  ownerPhone: string
  tenant?: string
  tenantEmail?: string
  tenantPhone?: string
  monthlyRent?: number
  monthlyExpenses: number
}

export interface UpdateUnitData extends Partial<CreateUnitData> {
  id: string
  status?: UnitStatus
}

export const UNIT_STATUS_LABELS: Record<UnitStatus, string> = {
  occupied: 'Ocupada',
  vacant: 'Vacante',
  maintenance: 'Mantenimiento'
}

export const UNIT_TYPE_LABELS: Record<UnitType, string> = {
  apartment: 'Departamento',
  office: 'Oficina',
  commercial: 'Local Comercial',
  parking: 'Cochera'
}
