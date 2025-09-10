export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  BUILDINGS: '/buildings',
  UNITS: '/units',
  TICKETS: '/tickets',
  INSPECTIONS: '/inspections',
  WORKORDERS: '/workorders',
  VENDORS: '/vendors',
  INVOICES: '/invoices',
  MAINTENANCE: '/maintenance',
  MEETINGS: '/meetings',
  DOCUMENTS: '/documents',
  SETTINGS: '/settings',
} as const

export const TICKET_STATUSES = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const

export const TICKET_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const

export const WORKORDER_STATUSES = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const INVOICE_STATUSES = {
  RECEIVED: 'received',
  APPROVED: 'approved',
  SCHEDULED: 'scheduled',
  PAID: 'paid',
  REJECTED: 'rejected',
} as const

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  INSPECTOR: 'inspector',
  OWNER: 'owner',
  TENANT: 'tenant',
} as const
