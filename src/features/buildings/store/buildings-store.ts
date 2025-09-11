import { create } from 'zustand'
import { buildingsService } from '@/services/buildings.service'
import type {
  Building,
  CreateBuildingData,
  UpdateBuildingData,
} from '../types/building'

interface BuildingsState {
  buildings: Building[]
  selectedBuilding: Building | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchBuildings: () => Promise<void>
  createBuilding: (data: CreateBuildingData) => Promise<void>
  updateBuilding: (id: string, data: UpdateBuildingData) => Promise<void>
  deleteBuilding: (id: string) => Promise<void>
  selectBuilding: (building: Building | null) => void
  clearError: () => void
}

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message
  }
  const apiError = error as { response?: { data?: { message?: string } } }
  return apiError?.response?.data?.message || defaultMessage
}

export const useBuildingsStore = create<BuildingsState>((set) => ({
  buildings: [],
  selectedBuilding: null,
  isLoading: false,
  error: null,

  fetchBuildings: async () => {
    set({ isLoading: true, error: null })
    try {
      const buildings = await buildingsService.getAll()
      set({ buildings, isLoading: false })
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al cargar edificios'),
        isLoading: false,
      })
    }
  },

  createBuilding: async (data: CreateBuildingData) => {
    set({ isLoading: true, error: null })
    try {
      const newBuilding = await buildingsService.create(data)
      set((state) => ({
        buildings: [...state.buildings, newBuilding],
        isLoading: false,
      }))
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al crear edificio'),
        isLoading: false,
      })
    }
  },

  updateBuilding: async (id: string, data: UpdateBuildingData) => {
    set({ isLoading: true, error: null })
    try {
      const updatedBuilding = await buildingsService.update(id, data)
      set((state) => ({
        buildings: state.buildings.map((building) =>
          building.id === id ? updatedBuilding : building
        ),
        selectedBuilding:
          state.selectedBuilding?.id === id
            ? updatedBuilding
            : state.selectedBuilding,
        isLoading: false,
      }))
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al actualizar edificio'),
        isLoading: false,
      })
    }
  },

  deleteBuilding: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await buildingsService.delete(id)
      set((state) => ({
        buildings: state.buildings.filter((building) => building.id !== id),
        selectedBuilding:
          state.selectedBuilding?.id === id ? null : state.selectedBuilding,
        isLoading: false,
      }))
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al eliminar edificio'),
        isLoading: false,
      })
    }
  },

  selectBuilding: (building: Building | null) => {
    set({ selectedBuilding: building })
  },

  clearError: () => {
    set({ error: null })
  },
}))
