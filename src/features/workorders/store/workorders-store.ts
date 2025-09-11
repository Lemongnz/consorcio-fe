import { create } from 'zustand'
import { WorkOrder, CreateWorkOrderData, UpdateWorkOrderData, WorkOrderStatus } from '../types/workorder'

interface WorkOrdersState {
  workOrders: WorkOrder[]
  selectedWorkOrder: WorkOrder | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchWorkOrders: () => Promise<void>
  createWorkOrder: (data: CreateWorkOrderData) => Promise<void>
  updateWorkOrder: (data: UpdateWorkOrderData) => Promise<void>
  updateWorkOrderStatus: (id: string, status: WorkOrderStatus) => Promise<void>
  deleteWorkOrder: (id: string) => Promise<void>
  selectWorkOrder: (workOrder: WorkOrder | null) => void
  clearError: () => void
}

// Mock data
const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    title: 'Reparación de filtración en baño',
    description: 'Filtración en el techo del baño principal, unidad 3A',
    category: 'plumbing',
    priority: 'high',
    status: 'assigned',
    buildingId: '1',
    buildingName: 'Edificio San Martín',
    unitId: '3',
    unitNumber: '3A',
    assignedTo: 'Pedro Plomero',
    assignedEmail: 'pedro@plomeria.com',
    requestedBy: 'María García',
    requestedByEmail: 'maria.garcia@email.com',
    estimatedCost: 15000,
    scheduledDate: new Date('2024-01-20T09:00:00'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '2',
    title: 'Mantenimiento de ascensor',
    description: 'Revisión mensual y lubricación del ascensor principal',
    category: 'general',
    priority: 'medium',
    status: 'completed',
    buildingId: '2',
    buildingName: 'Torre Libertador',
    assignedTo: 'Ascensores SA',
    assignedEmail: 'servicio@ascensores.com',
    requestedBy: 'Administración',
    requestedByEmail: 'admin@torre.com',
    estimatedCost: 8000,
    actualCost: 7500,
    scheduledDate: new Date('2024-01-10T14:00:00'),
    completedDate: new Date('2024-01-10T16:30:00'),
    notes: 'Mantenimiento completado sin inconvenientes. Próxima revisión en 30 días.',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10')
  }
]

export const useWorkOrdersStore = create<WorkOrdersState>((set) => ({
  workOrders: [],
  selectedWorkOrder: null,
  isLoading: false,
  error: null,

  fetchWorkOrders: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ workOrders: mockWorkOrders, isLoading: false })
    } catch (_error) {
      set({ error: 'Error al cargar órdenes de trabajo', isLoading: false })
    }
  },

  createWorkOrder: async (data: CreateWorkOrderData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newWorkOrder: WorkOrder = {
        ...data,
        id: Date.now().toString(),
        buildingName: 'Edificio Ejemplo',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      set(state => ({
        workOrders: [...state.workOrders, newWorkOrder],
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al crear orden de trabajo', isLoading: false })
    }
  },

  updateWorkOrder: async (data: UpdateWorkOrderData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        workOrders: state.workOrders.map(workOrder =>
          workOrder.id === data.id
            ? { ...workOrder, ...data, updatedAt: new Date() }
            : workOrder
        ),
        selectedWorkOrder: state.selectedWorkOrder?.id === data.id
          ? { ...state.selectedWorkOrder, ...data, updatedAt: new Date() }
          : state.selectedWorkOrder,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al actualizar orden de trabajo', isLoading: false })
    }
  },

  updateWorkOrderStatus: async (id: string, status: WorkOrderStatus) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const updateData: any = { status, updatedAt: new Date() }
      if (status === 'completed') {
        updateData.completedDate = new Date()
      }
      
      set(state => ({
        workOrders: state.workOrders.map(workOrder =>
          workOrder.id === id ? { ...workOrder, ...updateData } : workOrder
        ),
        selectedWorkOrder: state.selectedWorkOrder?.id === id
          ? { ...state.selectedWorkOrder, ...updateData }
          : state.selectedWorkOrder,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al actualizar estado de la orden', isLoading: false })
    }
  },

  deleteWorkOrder: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        workOrders: state.workOrders.filter(workOrder => workOrder.id !== id),
        selectedWorkOrder: state.selectedWorkOrder?.id === id ? null : state.selectedWorkOrder,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al eliminar orden de trabajo', isLoading: false })
    }
  },

  selectWorkOrder: (workOrder: WorkOrder | null) => {
    set({ selectedWorkOrder: workOrder })
  },

  clearError: () => {
    set({ error: null })
  }
}))
