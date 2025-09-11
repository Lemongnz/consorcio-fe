import { create } from 'zustand'
import { Unit, CreateUnitData, UpdateUnitData, UnitStatus } from '../types/unit'

interface UnitsState {
  units: Unit[]
  selectedUnit: Unit | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchUnits: () => Promise<void>
  fetchUnitsByBuilding: (buildingId: string) => Promise<void>
  createUnit: (data: CreateUnitData) => Promise<void>
  updateUnit: (data: UpdateUnitData) => Promise<void>
  updateUnitStatus: (id: string, status: UnitStatus) => Promise<void>
  deleteUnit: (id: string) => Promise<void>
  selectUnit: (unit: Unit | null) => void
  clearError: () => void
}

// Mock data
const mockUnits: Unit[] = [
  {
    id: '1',
    number: '1A',
    buildingId: '1',
    buildingName: 'Edificio San Martín',
    floor: 1,
    type: 'apartment',
    status: 'occupied',
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    owner: 'Juan Pérez',
    ownerEmail: 'juan.perez@email.com',
    ownerPhone: '+54 11 1234-5678',
    tenant: 'María García',
    tenantEmail: 'maria.garcia@email.com',
    tenantPhone: '+54 11 8765-4321',
    monthlyRent: 45000,
    monthlyExpenses: 8500,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    number: '2B',
    buildingId: '1',
    buildingName: 'Edificio San Martín',
    floor: 2,
    type: 'apartment',
    status: 'vacant',
    area: 92,
    bedrooms: 3,
    bathrooms: 2,
    owner: 'Ana López',
    ownerEmail: 'ana.lopez@email.com',
    ownerPhone: '+54 11 2345-6789',
    monthlyExpenses: 9200,
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '3',
    number: 'PB1',
    buildingId: '2',
    buildingName: 'Torre Libertador',
    floor: 0,
    type: 'commercial',
    status: 'occupied',
    area: 120,
    owner: 'Comercial SA',
    ownerEmail: 'info@comercialsa.com',
    ownerPhone: '+54 11 3456-7890',
    tenant: 'Farmacia Central',
    tenantEmail: 'farmacia@central.com',
    tenantPhone: '+54 11 9876-5432',
    monthlyRent: 85000,
    monthlyExpenses: 12000,
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2024-01-08')
  }
]

export const useUnitsStore = create<UnitsState>((set) => ({
  units: [],
  selectedUnit: null,
  isLoading: false,
  error: null,

  fetchUnits: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ units: mockUnits, isLoading: false })
    } catch (_error) {
      set({ error: 'Error al cargar unidades', isLoading: false })
    }
  },

  fetchUnitsByBuilding: async (buildingId: string) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const filteredUnits = mockUnits.filter(unit => unit.buildingId === buildingId)
      set({ units: filteredUnits, isLoading: false })
    } catch (_error) {
      set({ error: 'Error al cargar unidades del edificio', isLoading: false })
    }
  },

  createUnit: async (data: CreateUnitData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newUnit: Unit = {
        ...data,
        id: Date.now().toString(),
        buildingName: 'Edificio Ejemplo', // En una app real, se obtendría del building
        status: 'vacant',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      set(state => ({
        units: [...state.units, newUnit],
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al crear unidad', isLoading: false })
    }
  },

  updateUnit: async (data: UpdateUnitData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        units: state.units.map(unit =>
          unit.id === data.id
            ? { ...unit, ...data, updatedAt: new Date() }
            : unit
        ),
        selectedUnit: state.selectedUnit?.id === data.id
          ? { ...state.selectedUnit, ...data, updatedAt: new Date() }
          : state.selectedUnit,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al actualizar unidad', isLoading: false })
    }
  },

  updateUnitStatus: async (id: string, status: UnitStatus) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      set(state => ({
        units: state.units.map(unit =>
          unit.id === id
            ? { ...unit, status, updatedAt: new Date() }
            : unit
        ),
        selectedUnit: state.selectedUnit?.id === id
          ? { ...state.selectedUnit, status, updatedAt: new Date() }
          : state.selectedUnit,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al actualizar estado de la unidad', isLoading: false })
    }
  },

  deleteUnit: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        units: state.units.filter(unit => unit.id !== id),
        selectedUnit: state.selectedUnit?.id === id ? null : state.selectedUnit,
        isLoading: false
      }))
    } catch (_error) {
      set({ error: 'Error al eliminar unidad', isLoading: false })
    }
  },

  selectUnit: (unit: Unit | null) => {
    set({ selectedUnit: unit })
  },

  clearError: () => {
    set({ error: null })
  }
}))
