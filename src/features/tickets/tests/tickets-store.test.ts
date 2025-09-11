import { describe, it, expect, beforeEach } from 'vitest'
import { useTicketsStore } from '../store/tickets-store'

describe('Tickets Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTicketsStore.setState({
      tickets: [],
      selectedTicket: null,
      isLoading: false,
      error: null,
    })
  })

  it('should initialize with default state', () => {
    const state = useTicketsStore.getState()
    expect(state.tickets).toEqual([])
    expect(state.selectedTicket).toBeNull()
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should fetch tickets successfully', async () => {
    const { fetchTickets } = useTicketsStore.getState()

    await fetchTickets()

    const state = useTicketsStore.getState()
    expect(state.tickets.length).toBe(3)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should create a new ticket', async () => {
    const { createTicket } = useTicketsStore.getState()

    const newTicketData = {
      title: 'Test Ticket',
      description: 'Test ticket description',
      buildingId: 'building-1',
      type: 'MAINTENANCE' as const,
      priority: 'MEDIUM' as const,
    }

    await createTicket(newTicketData)

    const state = useTicketsStore.getState()
    expect(state.tickets.length).toBe(1)
    expect(state.tickets[0].title).toBe('Test Ticket')
    expect(state.tickets[0].status).toBe('open')
  })

  it('should update ticket status', async () => {
    // First create a ticket
    const { createTicket, updateTicketStatus } = useTicketsStore.getState()

    const newTicketData = {
      title: 'Status Test Ticket',
      description: 'Test description',
      buildingId: 'building-1',
      type: 'COMPLAINT' as const,
      priority: 'HIGH' as const,
    }

    await createTicket(newTicketData)

    const ticketId = useTicketsStore.getState().tickets[0].id

    await updateTicketStatus(ticketId, 'IN_PROGRESS')

    const state = useTicketsStore.getState()
    expect(state.tickets[0].status).toBe('IN_PROGRESS')
    expect(state.tickets[0].updatedAt).toBeInstanceOf(Date)
  })

  it('should update ticket status to resolved', async () => {
    // First create a ticket
    const { createTicket, updateTicketStatus } = useTicketsStore.getState()

    const newTicketData = {
      title: 'Resolve Test Ticket',
      description: 'Test description',
      buildingId: 'building-1',
      type: 'REPAIR' as const,
      priority: 'LOW' as const,
    }

    await createTicket(newTicketData)

    const ticketId = useTicketsStore.getState().tickets[0].id

    await updateTicketStatus(ticketId, 'COMPLETED')

    const state = useTicketsStore.getState()
    expect(state.tickets[0].status).toBe('COMPLETED')
    expect(state.tickets[0].resolvedAt).toBeInstanceOf(Date)
  })

  it('should delete a ticket', async () => {
    // First create a ticket
    const { createTicket, deleteTicket } = useTicketsStore.getState()

    const newTicketData = {
      title: 'Ticket to Delete',
      description: 'This ticket will be deleted',
      buildingId: 'building-1',
      type: 'MAINTENANCE' as const,
      priority: 'MEDIUM' as const,
    }

    await createTicket(newTicketData)

    const ticketId = useTicketsStore.getState().tickets[0].id

    await deleteTicket(ticketId)

    const state = useTicketsStore.getState()
    expect(state.tickets.length).toBe(0)
  })

  it('should select a ticket', () => {
    const mockTicket = {
      id: '1',
      title: 'Test Ticket',
      description: 'Test description',
      status: 'OPEN' as const,
      priority: 'MEDIUM' as const,
      type: 'MAINTENANCE' as const,
      buildingId: 'building-1',
      channel: 'EMAIL' as const,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const { selectTicket } = useTicketsStore.getState()
    selectTicket(mockTicket)

    const state = useTicketsStore.getState()
    expect(state.selectedTicket).toEqual(mockTicket)
  })

  it('should clear error', () => {
    // Set an error
    useTicketsStore.setState({ error: 'Test error' })
    expect(useTicketsStore.getState().error).toBe('Test error')

    // Clear error
    const { clearError } = useTicketsStore.getState()
    clearError()

    expect(useTicketsStore.getState().error).toBeNull()
  })

  it('should handle loading states correctly', async () => {
    const { fetchTickets } = useTicketsStore.getState()

    // Start fetch (should set loading to true)
    const fetchPromise = fetchTickets()

    // Check loading state immediately
    expect(useTicketsStore.getState().isLoading).toBe(true)

    // Wait for completion
    await fetchPromise

    // Check final state
    expect(useTicketsStore.getState().isLoading).toBe(false)
  })

  it('should validate ticket status transitions', async () => {
    const { createTicket, updateTicketStatus } = useTicketsStore.getState()

    const newTicketData = {
      title: 'Status Transition Test',
      description: 'Test status transitions',
      buildingId: 'building-1',
      type: 'EMERGENCY' as const,
      priority: 'HIGH' as const,
    }

    await createTicket(newTicketData)
    const ticketId = useTicketsStore.getState().tickets[0].id

    // Test status progression: OPEN -> IN_PROGRESS -> COMPLETED -> CLOSED
    await updateTicketStatus(ticketId, 'IN_PROGRESS')
    expect(useTicketsStore.getState().tickets[0].status).toBe('IN_PROGRESS')

    await updateTicketStatus(ticketId, 'COMPLETED')
    expect(useTicketsStore.getState().tickets[0].status).toBe('COMPLETED')

    await updateTicketStatus(ticketId, 'CLOSED')
    expect(useTicketsStore.getState().tickets[0].status).toBe('CLOSED')
  })
})
