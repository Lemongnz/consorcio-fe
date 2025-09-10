import { describe, it, expect, beforeEach } from 'vitest'
import { useUnitsStore } from '../store/units-store'

describe('Units Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUnitsStore.setState({
      units: [],
      selectedUnit: null,
      isLoading: false,
      error: null
    })
  })

  it('should initialize with default state', () => {
    const state = useUnitsStore.getState()
    expect(state.units).toEqual([])
    expect(state.selectedUnit).toBeNull()
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should fetch units successfully', async () => {
    const { fetchUnits } = useUnitsStore.getState()
    
    await fetchUnits()
    
    const state = useUnitsStore.getState()
    expect(state.units.length).toBe(3)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should fetch units by building', async () => {
    const { fetchUnitsByBuilding } = useUnitsStore.getState()
    
    await fetchUnitsByBuilding('1')
    
    const state = useUnitsStore.getState()
    expect(state.units.length).toBe(2) // Mock data has 2 units for building '1'
    expect(state.units.every(unit => unit.buildingId === '1')).toBe(true)
  })

  it('should create a new unit', async () => {
    const { createUnit } = useUnitsStore.getState()
    
    const newUnitData = {
      number: '1A',
      buildingId: '1',
      floor: 1,
      type: 'apartment' as const,
      area: 85,
      bedrooms: 2,
      bathrooms: 2,
      owner: 'Test Owner',
      ownerEmail: 'owner@test.com',
      ownerPhone: '+54 11 1234-5678',
      monthlyExpenses: 8500
    }
    
    await createUnit(newUnitData)
    
    const state = useUnitsStore.getState()
    expect(state.units.length).toBe(1)
    expect(state.units[0].number).toBe('1A')
    expect(state.units[0].status).toBe('vacant')
  })

  it('should update a unit', async () => {
    // First create a unit
    const { createUnit, updateUnit } = useUnitsStore.getState()
    
    const newUnitData = {
      number: '2B',
      buildingId: '1',
      floor: 2,
      type: 'apartment' as const,
      area: 90,
      bedrooms: 3,
      bathrooms: 2,
      owner: 'Original Owner',
      ownerEmail: 'original@test.com',
      ownerPhone: '+54 11 1111-1111',
      monthlyExpenses: 9000
    }
    
    await createUnit(newUnitData)
    
    const unitId = useUnitsStore.getState().units[0].id
    
    const updateData = {
      id: unitId,
      owner: 'Updated Owner',
      ownerEmail: 'updated@test.com',
      tenant: 'New Tenant',
      tenantEmail: 'tenant@test.com',
      monthlyRent: 50000
    }
    
    await updateUnit(updateData)
    
    const state = useUnitsStore.getState()
    expect(state.units[0].owner).toBe('Updated Owner')
    expect(state.units[0].tenant).toBe('New Tenant')
    expect(state.units[0].monthlyRent).toBe(50000)
  })

  it('should update unit status', async () => {
    // First create a unit
    const { createUnit, updateUnitStatus } = useUnitsStore.getState()
    
    const newUnitData = {
      number: '3C',
      buildingId: '1',
      floor: 3,
      type: 'apartment' as const,
      area: 75,
      owner: 'Status Test Owner',
      ownerEmail: 'status@test.com',
      ownerPhone: '+54 11 2222-2222',
      monthlyExpenses: 7500
    }
    
    await createUnit(newUnitData)
    
    const unitId = useUnitsStore.getState().units[0].id
    
    await updateUnitStatus(unitId, 'occupied')
    
    const state = useUnitsStore.getState()
    expect(state.units[0].status).toBe('occupied')
  })

  it('should delete a unit', async () => {
    // First create a unit
    const { createUnit, deleteUnit } = useUnitsStore.getState()
    
    const newUnitData = {
      number: '4D',
      buildingId: '1',
      floor: 4,
      type: 'apartment' as const,
      area: 80,
      owner: 'Delete Test Owner',
      ownerEmail: 'delete@test.com',
      ownerPhone: '+54 11 3333-3333',
      monthlyExpenses: 8000
    }
    
    await createUnit(newUnitData)
    
    const unitId = useUnitsStore.getState().units[0].id
    
    await deleteUnit(unitId)
    
    const state = useUnitsStore.getState()
    expect(state.units.length).toBe(0)
  })

  it('should select a unit', () => {
    const mockUnit = {
      id: '1',
      number: '1A',
      buildingId: '1',
      buildingName: 'Test Building',
      floor: 1,
      type: 'apartment' as const,
      status: 'occupied' as const,
      area: 85,
      bedrooms: 2,
      bathrooms: 2,
      owner: 'Test Owner',
      ownerEmail: 'owner@test.com',
      ownerPhone: '+54 11 1234-5678',
      monthlyExpenses: 8500,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const { selectUnit } = useUnitsStore.getState()
    selectUnit(mockUnit)
    
    const state = useUnitsStore.getState()
    expect(state.selectedUnit).toEqual(mockUnit)
  })

  it('should clear error', () => {
    // Set an error
    useUnitsStore.setState({ error: 'Test error' })
    expect(useUnitsStore.getState().error).toBe('Test error')
    
    // Clear error
    const { clearError } = useUnitsStore.getState()
    clearError()
    
    expect(useUnitsStore.getState().error).toBeNull()
  })

  it('should handle loading states correctly', async () => {
    const { fetchUnits } = useUnitsStore.getState()
    
    // Start fetch (should set loading to true)
    const fetchPromise = fetchUnits()
    
    // Check loading state immediately
    expect(useUnitsStore.getState().isLoading).toBe(true)
    
    // Wait for completion
    await fetchPromise
    
    // Check final state
    expect(useUnitsStore.getState().isLoading).toBe(false)
  })

  it('should validate unit types and statuses', async () => {
    const { createUnit } = useUnitsStore.getState()
    
    // Test different unit types
    const apartmentData = {
      number: 'APT1',
      buildingId: '1',
      floor: 1,
      type: 'apartment' as const,
      area: 85,
      owner: 'Apartment Owner',
      ownerEmail: 'apt@test.com',
      ownerPhone: '+54 11 1111-1111',
      monthlyExpenses: 8500
    }
    
    const commercialData = {
      number: 'COM1',
      buildingId: '1',
      floor: 0,
      type: 'commercial' as const,
      area: 120,
      owner: 'Commercial Owner',
      ownerEmail: 'com@test.com',
      ownerPhone: '+54 11 2222-2222',
      monthlyExpenses: 12000
    }
    
    await createUnit(apartmentData)
    await createUnit(commercialData)
    
    const state = useUnitsStore.getState()
    expect(state.units.length).toBe(2)
    expect(state.units[0].type).toBe('apartment')
    expect(state.units[1].type).toBe('commercial')
  })
})
