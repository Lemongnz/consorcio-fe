export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketCategory = 'maintenance' | 'complaint' | 'request' | 'emergency'

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  building: string
  unit?: string
  reporter: string
  assignee?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}

export interface CreateTicketData {
  title: string
  description: string
  priority: TicketPriority
  category: TicketCategory
  building: string
  unit?: string
  reporter: string
}

export interface UpdateTicketData extends Partial<CreateTicketData> {
  id: string
  status?: TicketStatus
  assignee?: string
}

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Abierto',
  in_progress: 'En Progreso',
  resolved: 'Resuelto',
  closed: 'Cerrado'
}

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  urgent: 'Urgente'
}

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  maintenance: 'Mantenimiento',
  complaint: 'Reclamo',
  request: 'Solicitud',
  emergency: 'Emergencia'
}
