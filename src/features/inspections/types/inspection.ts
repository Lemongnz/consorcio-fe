export type InspectionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
export type InspectionType = 'safety' | 'maintenance' | 'compliance' | 'routine'

export interface Inspection {
  id: string
  title: string
  description: string
  type: InspectionType
  status: InspectionStatus
  buildingId: string
  buildingName: string
  unitId?: string
  unitNumber?: string
  inspectorName: string
  inspectorEmail: string
  scheduledDate: Date
  completedDate?: Date
  findings?: string
  recommendations?: string
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

export interface CreateInspectionData {
  title: string
  description: string
  type: InspectionType
  buildingId: string
  unitId?: string
  inspectorName: string
  inspectorEmail: string
  scheduledDate: Date
  priority: 'low' | 'medium' | 'high'
}

export interface UpdateInspectionData extends Partial<CreateInspectionData> {
  id: string
  status?: InspectionStatus
  findings?: string
  recommendations?: string
  completedDate?: Date
}

export const INSPECTION_STATUS_LABELS: Record<InspectionStatus, string> = {
  scheduled: 'Programada',
  in_progress: 'En Progreso',
  completed: 'Completada',
  cancelled: 'Cancelada'
}

export const INSPECTION_TYPE_LABELS: Record<InspectionType, string> = {
  safety: 'Seguridad',
  maintenance: 'Mantenimiento',
  compliance: 'Cumplimiento',
  routine: 'Rutina'
}
