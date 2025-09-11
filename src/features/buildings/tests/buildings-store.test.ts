import { describe, it, expect, beforeEach } from 'vitest'
import { useBuildingsStore } from '../store/buildings-store'

describe('Buildings Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useBuildingsStore.setState({
      buildings: [],
      selectedBuilding: null,
      isLoading: false,
      error: null,
    })
  })

  it('should initialize with default state', () => {
    const state = useBuildingsStore.getState()
    expect(state.buildings).toEqual([])
    expect(state.selectedBuilding).toBeNull()
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should fetch buildings successfully', async () => {
    const { fetchBuildings } = useBuildingsStore.getState()

    await fetchBuildings()

    const state = useBuildingsStore.getState()
    expect(state.buildings.length).toBe(2)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should create a new building', async () => {
    const { createBuilding } = useBuildingsStore.getState()

    const newBuildingData = {
      name: 'Test Building',
      address: 'Test Address 123',
      city: 'Buenos Aires',
      country: 'Argentina',
      notes: 'Test building description',
      totalUnits: 20,
      totalFloors: 5,
    }

    await createBuilding(newBuildingData)

    const state = useBuildingsStore.getState()
    expect(state.buildings.length).toBe(1)
    expect(state.buildings[0].name).toBe('Test Building')
    expect(state.buildings[0].address).toBe('Test Address 123')
  })

  it('should update a building', async () => {
    // First create a building
    const { createBuilding, updateBuilding } = useBuildingsStore.getState()

    const newBuildingData = {
      name: 'Original Building',
      address: 'Original Address',
      city: 'Buenos Aires',
      country: 'Argentina',
      notes: 'Original description',
      totalUnits: 6,
      totalFloors: 3,
    }

    await createBuilding(newBuildingData)

    const buildingId = useBuildingsStore.getState().buildings[0].id

    const updateData = {
      name: 'Updated Building',
      notes: 'Updated description',
    }

    await updateBuilding(buildingId, updateData)

    const state = useBuildingsStore.getState()
    expect(state.buildings[0].name).toBe('Updated Building')
    expect(state.buildings[0].notes).toBe('Updated description')
    expect(state.buildings[0].address).toBe('Original Address') // Should remain unchanged
  })

  it('should delete a building', async () => {
    // First create a building
    const { createBuilding, deleteBuilding } = useBuildingsStore.getState()

    const newBuildingData = {
      name: 'Building to Delete',
      address: 'Delete Address',
      city: 'Buenos Aires',
      country: 'Argentina',
      notes: 'Building to be deleted',
      totalUnits: 4,
      totalFloors: 2,
    }

    await createBuilding(newBuildingData)

    const buildingId = useBuildingsStore.getState().buildings[0].id

    await deleteBuilding(buildingId)

    const state = useBuildingsStore.getState()
    expect(state.buildings.length).toBe(0)
  })

  it('should select a building', () => {
    const mockBuilding = {
      id: '1',
      name: 'Test Building',
      address: 'Test Address',
      city: 'Buenos Aires',
      country: 'Argentina',
      notes: 'Test description',
      totalUnits: 6,
      totalFloors: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const { selectBuilding } = useBuildingsStore.getState()
    selectBuilding(mockBuilding)

    const state = useBuildingsStore.getState()
    expect(state.selectedBuilding).toEqual(mockBuilding)
  })

  it('should select and deselect buildings', () => {
    const mockBuilding = {
      id: '1',
      name: 'Test Building',
      address: 'Test Address',
      city: 'Buenos Aires',
      country: 'Argentina',
      notes: 'Test description',
      totalUnits: 6,
      totalFloors: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const { selectBuilding } = useBuildingsStore.getState()
    selectBuilding(mockBuilding)
    expect(useBuildingsStore.getState().selectedBuilding).toEqual(mockBuilding)

    selectBuilding(null)
    expect(useBuildingsStore.getState().selectedBuilding).toBeNull()
  })

  it('should clear error', () => {
    // Set an error
    useBuildingsStore.setState({ error: 'Test error' })
    expect(useBuildingsStore.getState().error).toBe('Test error')

    // Clear error
    const { clearError } = useBuildingsStore.getState()
    clearError()

    expect(useBuildingsStore.getState().error).toBeNull()
  })

  it('should handle loading states correctly', async () => {
    const { fetchBuildings } = useBuildingsStore.getState()

    // Start fetch (should set loading to true)
    const fetchPromise = fetchBuildings()

    // Check loading state immediately
    expect(useBuildingsStore.getState().isLoading).toBe(true)

    // Wait for completion
    await fetchPromise

    // Check final state
    expect(useBuildingsStore.getState().isLoading).toBe(false)
  })
})
