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
      units: 20,
      floors: 5,
      administrator: 'Test Admin',
      phone: '+54 11 1234-5678',
      email: 'admin@test.com',
      description: 'Test building description',
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
      units: 6,
      floors: 3,
      administrator: 'Original Admin',
      phone: '+54 11 1111-1111',
      email: 'original@test.com',
      description: 'Original description',
    }

    await createBuilding(newBuildingData)

    const buildingId = useBuildingsStore.getState().buildings[0].id

    const updateData = {
      id: buildingId,
      name: 'Updated Building',
      description: 'Updated description',
    }

    await updateBuilding(updateData)

    const state = useBuildingsStore.getState()
    expect(state.buildings[0].name).toBe('Updated Building')
    expect(state.buildings[0].description).toBe('Updated description')
    expect(state.buildings[0].address).toBe('Original Address') // Should remain unchanged
  })

  it('should delete a building', async () => {
    // First create a building
    const { createBuilding, deleteBuilding } = useBuildingsStore.getState()

    const newBuildingData = {
      name: 'Building to Delete',
      address: 'Delete Address',
      units: 4,
      floors: 2,
      administrator: 'Delete Admin',
      phone: '+54 11 2222-2222',
      email: 'delete@test.com',
      description: 'Building to be deleted',
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
      units: 6,
      floors: 3,
      administrator: 'Test Admin',
      phone: '+54 11 1234-5678',
      email: 'admin@test.com',
      description: 'Test description',
      createdAt: new Date(),
      updatedAt: new Date(),
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
      units: 6,
      floors: 3,
      administrator: 'Test Admin',
      phone: '+54 11 1234-5678',
      email: 'admin@test.com',
      description: 'Test description',
      createdAt: new Date(),
      updatedAt: new Date(),
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
