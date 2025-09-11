// API Response wrapper
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
}

// Auth types
export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponseDto {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: User
}

export interface RefreshTokenDto {
  refreshToken: string
}

// User types
export type UserRole = 
  | 'SUPERADMIN'
  | 'ADMIN_OWNER'
  | 'STAFF'
  | 'INSPECTOR'
  | 'PORTER'
  | 'CLEANING_STAFF'
  | 'VENDOR'
  | 'OWNER'
  | 'TENANT'
  | 'READONLY'

export interface User {
  id: string
  email: string
  phone: string
  fullName: string
  roles: UserRole[]
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  email: string
  phone: string
  password: string
  fullName: string
  roles: UserRole[]
  status?: string
}

export interface UpdateUserDto {
  email?: string
  phone?: string
  password?: string
  fullName?: string
  roles?: UserRole[]
  status?: string
}

// Building types
export interface Building {
  id: string
  name: string
  address: string
  city: string
  country: string
  notes?: string
  zipCode?: string
  latitude?: number
  longitude?: number
  totalFloors?: number
  totalUnits?: number
  createdAt: string
  updatedAt: string
}

export interface CreateBuildingDto {
  name: string
  address: string
  city: string
  country?: string
  notes?: string
  zipCode?: string
  latitude?: number
  longitude?: number
  totalFloors?: number
  totalUnits?: number
}

export interface UpdateBuildingDto {
  name?: string
  address?: string
  city?: string
  country?: string
  notes?: string
  zipCode?: string
  latitude?: number
  longitude?: number
  totalFloors?: number
  totalUnits?: number
}

// Unit types
export type UnitType = 'apartment' | 'store' | 'garage'

export interface Unit {
  id: string
  buildingId: string
  label: string
  type: UnitType
  floor: number
  m2: number
  isRented: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateUnitDto {
  buildingId: string
  label: string
  type: UnitType
  floor: number
  m2: number
  isRented?: boolean
}

export interface UpdateUnitDto {
  buildingId?: string
  label?: string
  type?: UnitType
  floor?: number
  m2?: number
  isRented?: boolean
}

export interface CreateUnitOccupancyDto {
  ownerUserId?: string
  tenantUserId?: string
  startDate: string
  endDate?: string
}

// Ticket types
export type TicketType = 
  | 'MAINTENANCE'
  | 'REPAIR'
  | 'COMPLAINT'
  | 'EMERGENCY'
  | 'CLEANING'
  | 'SECURITY'
  | 'OTHER'

export type TicketChannel = 
  | 'WEB'
  | 'MOBILE'
  | 'PHONE'
  | 'EMAIL'
  | 'WHATSAPP'
  | 'IN_PERSON'

export type TicketPriority = 
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT'
  | 'EMERGENCY'

export type TicketStatus = 
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'PENDING_INSPECTION'
  | 'PENDING_QUOTE'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CLOSED'
  | 'CANCELLED'

export interface AttachmentDto {
  filename: string
  url: string
  mimeType: string
  size: number
}

export interface Ticket {
  id: string
  buildingId: string
  unitId?: string
  type: TicketType
  channel: TicketChannel
  title: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  attachments?: AttachmentDto[]
  dueDate?: string
  estimatedCost?: number
  currency: string
  resolution?: string
  resolvedAt?: string
  resolvedByUserId?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTicketDto {
  buildingId: string
  unitId?: string
  type: TicketType
  channel?: TicketChannel
  title: string
  description: string
  priority?: TicketPriority
  attachments?: AttachmentDto[]
  dueDate?: string
  estimatedCost?: number
  currency?: string
}

export interface UpdateTicketDto {
  buildingId?: string
  unitId?: string
  type?: TicketType
  channel?: TicketChannel
  title?: string
  description?: string
  priority?: TicketPriority
  attachments?: AttachmentDto[]
  dueDate?: string
  estimatedCost?: number
  currency?: string
  status?: TicketStatus
  resolution?: string
  resolvedAt?: string
  resolvedByUserId?: string
}

export interface AssignInspectorDto {
  inspectorUserId: string
  scheduledAt: string
  notes?: string
}

// Vendor types
export interface Vendor {
  id: string
  legalName: string
  trade: string
  email: string
  phone: string
  whatsapp?: string
  ratingAvg?: number
  createdAt: string
  updatedAt: string
}

export interface CreateVendorDto {
  legalName: string
  trade: string
  email: string
  phone: string
  whatsapp?: string
  ratingAvg?: number
}

export interface UpdateVendorDto {
  legalName?: string
  trade?: string
  email?: string
  phone?: string
  whatsapp?: string
  ratingAvg?: number
}

export type VendorWeekday = 
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface CreateVendorAvailabilityDto {
  weekday: VendorWeekday
  from: string
  to: string
}

export interface UpdateVendorAvailabilityDto {
  weekday?: VendorWeekday
  from?: string
  to?: string
}

// Message types
export type MessageEntityType = 
  | 'TICKET'
  | 'WORK_ORDER'
  | 'INSPECTION'
  | 'MEETING'
  | 'BUILDING'
  | 'UNIT'

export type MessageDirection = 
  | 'INBOUND'
  | 'OUTBOUND'
  | 'INTERNAL'

export type MessageChannel = 
  | 'WEB'
  | 'MOBILE'
  | 'EMAIL'
  | 'WHATSAPP'
  | 'SMS'
  | 'PHONE'
  | 'SYSTEM'

export interface Message {
  id: string
  entityType: MessageEntityType
  entityId: string
  direction: MessageDirection
  channel: MessageChannel
  body: string
  attachments?: AttachmentDto[]
  subject?: string
  fromEmail?: string
  toEmail?: string
  fromPhone?: string
  toPhone?: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateMessageDto {
  entityType: MessageEntityType
  entityId: string
  direction: MessageDirection
  channel: MessageChannel
  body: string
  attachments?: AttachmentDto[]
  subject?: string
  fromEmail?: string
  toEmail?: string
  fromPhone?: string
  toPhone?: string
}

// Administration types
export type PlanTier = 'BASIC' | 'STANDARD' | 'PREMIUM' | 'ENTERPRISE'

export interface Administration {
  id: string
  name: string
  cuit: string
  email: string
  phone?: string
  address?: string
  planTier: PlanTier
  createdAt: string
  updatedAt: string
}

export interface CreateAdministrationDto {
  name: string
  cuit: string
  email: string
  phone?: string
  address?: string
  planTier?: PlanTier
}

export interface UpdateAdministrationDto {
  name?: string
  email?: string
  phone?: string
  address?: string
  planTier?: PlanTier
}
