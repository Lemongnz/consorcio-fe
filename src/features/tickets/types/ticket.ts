import type {
  Ticket as ApiTicket,
  TicketStatus as ApiTicketStatus,
  TicketPriority as ApiTicketPriority,
  TicketType as ApiTicketType,
  CreateTicketDto,
  UpdateTicketDto,
} from '@/lib/types/api'

// Use API types directly
export type Ticket = ApiTicket
export type TicketStatus = ApiTicketStatus
export type TicketPriority = ApiTicketPriority
export type TicketType = ApiTicketType
export type CreateTicketData = CreateTicketDto
export type UpdateTicketData = UpdateTicketDto

// Legacy compatibility - map old status to new status
export const mapLegacyStatus = (status: string): TicketStatus => {
  const statusMap: Record<string, TicketStatus> = {
    open: 'OPEN',
    in_progress: 'IN_PROGRESS',
    resolved: 'COMPLETED',
    closed: 'CLOSED',
  }
  return statusMap[status] || 'OPEN'
}

// Map API status to legacy for display
export const mapApiStatusToLegacy = (status: TicketStatus): string => {
  const statusMap: Record<TicketStatus, string> = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    PENDING_INSPECTION: 'in_progress',
    PENDING_QUOTE: 'in_progress',
    PENDING_APPROVAL: 'in_progress',
    APPROVED: 'in_progress',
    REJECTED: 'closed',
    COMPLETED: 'resolved',
    CLOSED: 'closed',
    CANCELLED: 'closed',
  }
  return statusMap[status] || 'open'
}

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Abierto',
  IN_PROGRESS: 'En Progreso',
  PENDING_INSPECTION: 'Pendiente Inspección',
  PENDING_QUOTE: 'Pendiente Cotización',
  PENDING_APPROVAL: 'Pendiente Aprobación',
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
  COMPLETED: 'Completado',
  CLOSED: 'Cerrado',
  CANCELLED: 'Cancelado',
}

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
  EMERGENCY: 'Emergencia',
}

export const TICKET_TYPE_LABELS: Record<TicketType, string> = {
  MAINTENANCE: 'Mantenimiento',
  REPAIR: 'Reparación',
  COMPLAINT: 'Reclamo',
  EMERGENCY: 'Emergencia',
  CLEANING: 'Limpieza',
  SECURITY: 'Seguridad',
  OTHER: 'Otro',
}
