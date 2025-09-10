export type WorkOrderStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'urgent'
export type WorkOrderCategory = 'plumbing' | 'electrical' | 'hvac' | 'general' | 'cleaning'

export interface WorkOrder {
  id: string
  title: string
  description: string
  category: WorkOrderCategory
  priority: WorkOrderPriority
  status: WorkOrderStatus
  buildingId: string
  buildingName: string
  unitId?: string
  unitNumber?: string
  assignedTo?: string
  assignedEmail?: string
  requestedBy: string
  requestedByEmail: string
  estimatedCost?: number
  actualCost?: number
  scheduledDate?: Date
  completedDate?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateWorkOrderData {
  title: string
  description: string
  category: WorkOrderCategory
  priority: WorkOrderPriority
  buildingId: string
  unitId?: string
  requestedBy: string
  requestedByEmail: string
  estimatedCost?: number
  scheduledDate?: Date
}

export interface UpdateWorkOrderData extends Partial<CreateWorkOrderData> {
  id: string
  status?: WorkOrderStatus
  assignedTo?: string
  assignedEmail?: string
  actualCost?: number
  completedDate?: Date
  notes?: string
}

export const WORKORDER_STATUS_LABELS: Record<WorkOrderStatus, string> = {
  pending: 'Pendiente',
  assigned: 'Asignada',
  in_progress: 'En Progreso',
  completed: 'Completada',
  cancelled: 'Cancelada'
}

export const WORKORDER_PRIORITY_LABELS: Record<WorkOrderPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  urgent: 'Urgente'
}

export const WORKORDER_CATEGORY_LABELS: Record<WorkOrderCategory, string> = {
  plumbing: 'Plomería',
  electrical: 'Electricidad',
  hvac: 'Climatización',
  general: 'General',
  cleaning: 'Limpieza'
}
