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
      building: 'Test Building',
      reporter: 'Test Reporter',
      priority: 'medium' as const,
      category: 'maintenance' as const,
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
      building: 'Test Building',
      reporter: 'Test Reporter',
      priority: 'high' as const,
      category: 'complaint' as const,
    }

    await createTicket(newTicketData)

    const ticketId = useTicketsStore.getState().tickets[0].id

    await updateTicketStatus(ticketId, 'in_progress')

    const state = useTicketsStore.getState()
    expect(state.tickets[0].status).toBe('in_progress')
    expect(state.tickets[0].updatedAt).toBeInstanceOf(Date)
  })

  it('should update ticket status to resolved', async () => {
    // First create a ticket
    const { createTicket, updateTicketStatus } = useTicketsStore.getState()

    const newTicketData = {
      title: 'Resolve Test Ticket',
      description: 'Test description',
      building: 'Test Building',
      reporter: 'Test Reporter',
      priority: 'low' as const,
      category: 'request' as const,
    }

    await createTicket(newTicketData)

    const ticketId = useTicketsStore.getState().tickets[0].id

    await updateTicketStatus(ticketId, 'resolved')

    const state = useTicketsStore.getState()
    expect(state.tickets[0].status).toBe('resolved')
    expect(state.tickets[0].resolvedAt).toBeInstanceOf(Date)
  })

  it('should delete a ticket', async () => {
    // First create a ticket
    const { createTicket, deleteTicket } = useTicketsStore.getState()

    const newTicketData = {
      title: 'Ticket to Delete',
      description: 'This ticket will be deleted',
      building: 'Test Building',
      reporter: 'Test Reporter',
      priority: 'medium' as const,
      category: 'maintenance' as const,
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
      status: 'open' as const,
      priority: 'medium' as const,
      category: 'maintenance' as const,
      building: 'Test Building',
      reporter: 'Test Reporter',
      createdAt: new Date(),
      updatedAt: new Date(),
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
      building: 'Test Building',
      reporter: 'Test Reporter',
      priority: 'high' as const,
      category: 'emergency' as const,
    }

    await createTicket(newTicketData)
    const ticketId = useTicketsStore.getState().tickets[0].id

    // Test status progression: open -> in_progress -> resolved -> closed
    await updateTicketStatus(ticketId, 'in_progress')
    expect(useTicketsStore.getState().tickets[0].status).toBe('in_progress')

    await updateTicketStatus(ticketId, 'resolved')
    expect(useTicketsStore.getState().tickets[0].status).toBe('resolved')

    await updateTicketStatus(ticketId, 'closed')
    expect(useTicketsStore.getState().tickets[0].status).toBe('closed')
  })
})
