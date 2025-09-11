import { create } from 'zustand'
import {
  DashboardStats,
  RecentActivity,
  MonthlyData,
  BuildingSummary,
} from '../types/dashboard'

interface DashboardState {
  stats: DashboardStats | null
  recentActivity: RecentActivity[]
  monthlyData: MonthlyData[]
  buildingSummaries: BuildingSummary[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchDashboardData: () => Promise<void>
  clearError: () => void
}

// Mock data
const mockStats: DashboardStats = {
  totalBuildings: 12,
  totalUnits: 456,
  totalTickets: 89,
  openTickets: 23,
  inProgressTickets: 15,
  resolvedTickets: 51,
  totalInvoices: 234,
  pendingInvoices: 45,
  totalWorkOrders: 67,
  activeWorkOrders: 12,
  totalMeetings: 34,
  upcomingMeetings: 3,
}

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'ticket',
    title: 'Nuevo ticket creado',
    description: 'Filtración en el techo del 5to piso - Edificio San Martín',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'open',
    priority: 'high',
  },
  {
    id: '2',
    type: 'invoice',
    title: 'Factura aprobada',
    description: 'Mantenimiento de ascensores - $15,000',
    timestamp: new Date('2024-01-15T09:15:00'),
    status: 'approved',
  },
  {
    id: '3',
    type: 'workorder',
    title: 'Orden de trabajo completada',
    description: 'Reparación del portón principal',
    timestamp: new Date('2024-01-14T16:45:00'),
    status: 'completed',
  },
  {
    id: '4',
    type: 'meeting',
    title: 'Reunión programada',
    description: 'Asamblea mensual - Torre Libertador',
    timestamp: new Date('2024-01-14T14:20:00'),
    status: 'scheduled',
  },
  {
    id: '5',
    type: 'building',
    title: 'Nuevo edificio agregado',
    description: 'Complejo Residencial Norte',
    timestamp: new Date('2024-01-13T11:30:00'),
  },
]

const mockMonthlyData: MonthlyData[] = [
  { month: 'Ene', tickets: 45, invoices: 23, workOrders: 12, meetings: 3 },
  { month: 'Feb', tickets: 52, invoices: 28, workOrders: 15, meetings: 4 },
  { month: 'Mar', tickets: 38, invoices: 31, workOrders: 18, meetings: 2 },
  { month: 'Abr', tickets: 61, invoices: 25, workOrders: 14, meetings: 5 },
  { month: 'May', tickets: 43, invoices: 29, workOrders: 16, meetings: 3 },
  { month: 'Jun', tickets: 55, invoices: 33, workOrders: 19, meetings: 4 },
]

const mockBuildingSummaries: BuildingSummary[] = [
  {
    id: '1',
    name: 'Edificio San Martín',
    totalUnits: 32,
    occupiedUnits: 28,
    openTickets: 5,
    monthlyRevenue: 45000,
  },
  {
    id: '2',
    name: 'Torre Libertador',
    totalUnits: 60,
    occupiedUnits: 55,
    openTickets: 8,
    monthlyRevenue: 78000,
  },
  {
    id: '3',
    name: 'Complejo Norte',
    totalUnits: 24,
    occupiedUnits: 22,
    openTickets: 2,
    monthlyRevenue: 32000,
  },
]

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  recentActivity: [],
  monthlyData: [],
  buildingSummaries: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      set({
        stats: mockStats,
        recentActivity: mockRecentActivity,
        monthlyData: mockMonthlyData,
        buildingSummaries: mockBuildingSummaries,
        isLoading: false,
      })
    } catch (_error) {
      set({ error: 'Error al cargar datos del dashboard', isLoading: false })
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))
