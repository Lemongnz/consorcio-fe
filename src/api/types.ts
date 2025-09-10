// Common types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Building types
export interface Building {
  id: string
  name: string
  address: string
  units: number
  createdAt: string
  updatedAt: string
}

// Unit types
export interface Unit {
  id: string
  buildingId: string
  number: string
  type: 'apartment' | 'commercial' | 'parking'
  ownerId?: string
  tenantId?: string
  createdAt: string
  updatedAt: string
}

// Ticket types
export interface Ticket {
  id: string
  title: string
  description: string
  buildingId: string
  unitId?: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  reporterId: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

// WorkOrder types
export interface WorkOrder {
  id: string
  ticketId?: string
  title: string
  description: string
  buildingId: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  vendorId?: string
  scheduledDate?: string
  completedDate?: string
  createdAt: string
  updatedAt: string
}

// Vendor types
export interface Vendor {
  id: string
  name: string
  category: string
  email: string
  phone: string
  rating: number
  availability: {
    [key: string]: boolean // day of week
  }
  createdAt: string
  updatedAt: string
}

// Invoice types
export interface Invoice {
  id: string
  vendorId: string
  workOrderId?: string
  amount: number
  status: 'received' | 'approved' | 'scheduled' | 'paid' | 'rejected'
  dueDate: string
  paidDate?: string
  createdAt: string
  updatedAt: string
}
