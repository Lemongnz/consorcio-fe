import { create } from 'zustand'
import {
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
  updateBuilding: (data: UpdateBuildingData) => Promise<void>
  deleteBuilding: (id: string) => Promise<void>
  selectBuilding: (building: Building | null) => void
  clearError: () => void
}

// Mock data
const mockBuildings: Building[] = [
  {
    id: '1',
    name: 'Edificio San Martín',
    address: 'Av. San Martín 1234, CABA',
    description:
      'Edificio residencial de 8 pisos con 32 unidades. Construido en 1995, cuenta con portería 24hs, ascensor y cocheras.',
    units: 32,
    floors: 8,
    administrator: 'María González',
    phone: '+54 11 4567-8901',
    email: 'admin@sanmartin.com.ar',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Torre Libertador',
    address: 'Av. del Libertador 5678, CABA',
    description:
      'Moderno edificio de 15 pisos con amenities completos: gimnasio, piscina, salón de usos múltiples y seguridad 24hs.',
    units: 60,
    floors: 15,
    administrator: 'Carlos Rodríguez',
    phone: '+54 11 4567-8902',
    email: 'admin@torrelibertador.com.ar',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-01-05'),
  },
]

export const useBuildingsStore = create<BuildingsState>((set) => ({
  buildings: [],
  selectedBuilding: null,
  isLoading: false,
  error: null,

  fetchBuildings: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      set({ buildings: mockBuildings, isLoading: false })
    } catch (error) {
      set({ error: 'Error al cargar edificios', isLoading: false })
    }
  },

  createBuilding: async (data: CreateBuildingData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newBuilding: Building = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      set((state) => ({
        buildings: [...state.buildings, newBuilding],
        isLoading: false,
      }))
    } catch (error) {
      set({ error: 'Error al crear edificio', isLoading: false })
    }
  },

  updateBuilding: async (data: UpdateBuildingData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        buildings: state.buildings.map((building) =>
          building.id === data.id
            ? { ...building, ...data, updatedAt: new Date() }
            : building
        ),
        selectedBuilding:
          state.selectedBuilding?.id === data.id
            ? { ...state.selectedBuilding, ...data, updatedAt: new Date() }
            : state.selectedBuilding,
        isLoading: false,
      }))
    } catch (error) {
      set({ error: 'Error al actualizar edificio', isLoading: false })
    }
  },

  deleteBuilding: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        buildings: state.buildings.filter((building) => building.id !== id),
        selectedBuilding:
          state.selectedBuilding?.id === id ? null : state.selectedBuilding,
        isLoading: false,
      }))
    } catch (error) {
      set({ error: 'Error al eliminar edificio', isLoading: false })
    }
  },

  selectBuilding: (building: Building | null) => {
    set({ selectedBuilding: building })
  },

  clearError: () => {
    set({ error: null })
  },
}))
