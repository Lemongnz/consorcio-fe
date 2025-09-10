import { describe, it, expect, beforeEach } from 'vitest'
import { useDashboardStore } from '../store/dashboard-store'

describe('Dashboard Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useDashboardStore.setState({
      stats: null,
      recentActivity: [],
      monthlyData: [],
      buildingSummaries: [],
      isLoading: false,
      error: null
    })
  })

  it('should initialize with default state', () => {
    const state = useDashboardStore.getState()
    expect(state.stats).toBeNull()
    expect(state.recentActivity).toEqual([])
    expect(state.monthlyData).toEqual([])
    expect(state.buildingSummaries).toEqual([])
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should set loading state when fetching data', async () => {
    const { fetchDashboardData } = useDashboardStore.getState()
    
    // Start fetch (should set loading to true)
    const fetchPromise = fetchDashboardData()
    
    // Check loading state immediately
    expect(useDashboardStore.getState().isLoading).toBe(true)
    
    // Wait for completion
    await fetchPromise
    
    // Check final state
    const finalState = useDashboardStore.getState()
    expect(finalState.isLoading).toBe(false)
    expect(finalState.stats).not.toBeNull()
    expect(finalState.recentActivity.length).toBeGreaterThan(0)
  })

  it('should load dashboard data successfully', async () => {
    const { fetchDashboardData } = useDashboardStore.getState()
    
    await fetchDashboardData()
    
    const state = useDashboardStore.getState()
    expect(state.stats).toBeDefined()
    expect(state.stats?.totalBuildings).toBe(12)
    expect(state.stats?.totalTickets).toBe(89)
    expect(state.recentActivity.length).toBe(5)
    expect(state.monthlyData.length).toBe(6)
    expect(state.buildingSummaries.length).toBe(3)
  })

  it('should clear error', () => {
    // Set an error
    useDashboardStore.setState({ error: 'Test error' })
    expect(useDashboardStore.getState().error).toBe('Test error')
    
    // Clear error
    const { clearError } = useDashboardStore.getState()
    clearError()
    
    expect(useDashboardStore.getState().error).toBeNull()
  })

  it('should have correct stats structure', async () => {
    const { fetchDashboardData } = useDashboardStore.getState()
    await fetchDashboardData()
    
    const { stats } = useDashboardStore.getState()
    expect(stats).toHaveProperty('totalBuildings')
    expect(stats).toHaveProperty('totalUnits')
    expect(stats).toHaveProperty('totalTickets')
    expect(stats).toHaveProperty('openTickets')
    expect(stats).toHaveProperty('inProgressTickets')
    expect(stats).toHaveProperty('resolvedTickets')
    expect(stats).toHaveProperty('totalInvoices')
    expect(stats).toHaveProperty('pendingInvoices')
    expect(stats).toHaveProperty('totalWorkOrders')
    expect(stats).toHaveProperty('activeWorkOrders')
    expect(stats).toHaveProperty('totalMeetings')
    expect(stats).toHaveProperty('upcomingMeetings')
  })

  it('should have recent activity with correct structure', async () => {
    const { fetchDashboardData } = useDashboardStore.getState()
    await fetchDashboardData()
    
    const { recentActivity } = useDashboardStore.getState()
    expect(recentActivity.length).toBeGreaterThan(0)
    
    const firstActivity = recentActivity[0]
    expect(firstActivity).toHaveProperty('id')
    expect(firstActivity).toHaveProperty('type')
    expect(firstActivity).toHaveProperty('title')
    expect(firstActivity).toHaveProperty('description')
    expect(firstActivity).toHaveProperty('timestamp')
    expect(firstActivity.timestamp).toBeInstanceOf(Date)
  })
})
