import { create } from 'zustand'
import { Inspection, CreateInspectionData, UpdateInspectionData, InspectionStatus } from '../types/inspection'

interface InspectionsState {
  inspections: Inspection[]
  selectedInspection: Inspection | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchInspections: () => Promise<void>
  createInspection: (data: CreateInspectionData) => Promise<void>
  updateInspection: (data: UpdateInspectionData) => Promise<void>
  updateInspectionStatus: (id: string, status: InspectionStatus) => Promise<void>
  deleteInspection: (id: string) => Promise<void>
  selectInspection: (inspection: Inspection | null) => void
  clearError: () => void
}

// Mock data
const mockInspections: Inspection[] = [
  {
    id: '1',
    title: 'Inspección de Seguridad Anual',
    description: 'Revisión completa de sistemas de seguridad del edificio',
    type: 'safety',
    status: 'scheduled',
    buildingId: '1',
    buildingName: 'Edificio San Martín',
    inspectorName: 'Carlos Rodríguez',
    inspectorEmail: 'carlos.rodriguez@inspector.com',
    scheduledDate: new Date('2024-02-15T10:00:00'),
    priority: 'high',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    title: 'Mantenimiento de Ascensores',
    description: 'Inspección mensual de ascensores',
    type: 'maintenance',
    status: 'completed',
    buildingId: '2',
    buildingName: 'Torre Libertador',
    inspectorName: 'Ana Martínez',
    inspectorEmail: 'ana.martinez@inspector.com',
    scheduledDate: new Date('2024-01-20T14:00:00'),
    completedDate: new Date('2024-01-20T16:30:00'),
    findings: 'Ascensor 1: Funcionamiento normal. Ascensor 2: Ruido en motor, requiere lubricación.',
    recommendations: 'Programar mantenimiento preventivo para ascensor 2 en los próximos 15 días.',
    priority: 'medium',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20')
  }
]

export const useInspectionsStore = create<InspectionsState>((set) => ({
  inspections: [],
  selectedInspection: null,
  isLoading: false,
  error: null,

  fetchInspections: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ inspections: mockInspections, isLoading: false })
    } catch (_error) {
      set({ error: 'Error al cargar inspecciones', isLoading: false })
    }
  },

  createInspection: async (data: CreateInspectionData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newInspection: Inspection = {
        ...data,
        id: Date.now().toString(),
        buildingName: 'Edificio Ejemplo',
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      set(state => ({
        inspections: [...state.inspections, newInspection],
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al crear inspección', isLoading: false })
    }
  },

  updateInspection: async (data: UpdateInspectionData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        inspections: state.inspections.map(inspection =>
          inspection.id === data.id
            ? { ...inspection, ...data, updatedAt: new Date() }
            : inspection
        ),
        selectedInspection: state.selectedInspection?.id === data.id
          ? { ...state.selectedInspection, ...data, updatedAt: new Date() }
          : state.selectedInspection,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al actualizar inspección', isLoading: false })
    }
  },

  updateInspectionStatus: async (id: string, status: InspectionStatus) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const updateData: any = { status, updatedAt: new Date() }
      if (status === 'completed') {
        updateData.completedDate = new Date()
      }
      
      set(state => ({
        inspections: state.inspections.map(inspection =>
          inspection.id === id ? { ...inspection, ...updateData } : inspection
        ),
        selectedInspection: state.selectedInspection?.id === id
          ? { ...state.selectedInspection, ...updateData }
          : state.selectedInspection,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al actualizar estado de la inspección', isLoading: false })
    }
  },

  deleteInspection: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        inspections: state.inspections.filter(inspection => inspection.id !== id),
        selectedInspection: state.selectedInspection?.id === id ? null : state.selectedInspection,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al eliminar inspección', isLoading: false })
    }
  },

  selectInspection: (inspection: Inspection | null) => {
    set({ selectedInspection: inspection })
  },

  clearError: () => {
    set({ error: null })
  }
}))
