export interface DashboardStats {
  totalBuildings: number
  totalUnits: number
  totalTickets: number
  openTickets: number
  inProgressTickets: number
  resolvedTickets: number
  totalInvoices: number
  pendingInvoices: number
  totalWorkOrders: number
  activeWorkOrders: number
  totalMeetings: number
  upcomingMeetings: number
}

export interface RecentActivity {
  id: string
  type: 'ticket' | 'invoice' | 'workorder' | 'meeting' | 'building'
  title: string
  description: string
  timestamp: Date
  status?: string
  priority?: string
}

export interface MonthlyData {
  month: string
  tickets: number
  invoices: number
  workOrders: number
  meetings: number
}

export interface BuildingSummary {
  id: string
  name: string
  totalUnits: number
  occupiedUnits: number
  openTickets: number
  monthlyRevenue: number
}
