import { create } from 'zustand'
import { ticketsService } from '@/services/tickets.service'
import type {
  Ticket,
  CreateTicketData,
  UpdateTicketData,
  TicketStatus,
} from '../types/ticket'

interface TicketsState {
  tickets: Ticket[]
  selectedTicket: Ticket | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchTickets: () => Promise<void>
  createTicket: (data: CreateTicketData) => Promise<void>
  updateTicket: (id: string, data: UpdateTicketData) => Promise<void>
  updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>
  deleteTicket: (id: string) => Promise<void>
  selectTicket: (ticket: Ticket | null) => void
  clearError: () => void
}

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message
  }
  const apiError = error as { response?: { data?: { message?: string } } }
  return apiError?.response?.data?.message || defaultMessage
}

export const useTicketsStore = create<TicketsState>((set) => ({
  tickets: [],
  selectedTicket: null,
  isLoading: false,
  error: null,

  fetchTickets: async () => {
    set({ isLoading: true, error: null })
    try {
      const tickets = await ticketsService.getAll()
      set({ tickets, isLoading: false })
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al cargar tickets'),
        isLoading: false,
      })
    }
  },

  createTicket: async (data: CreateTicketData) => {
    set({ isLoading: true, error: null })
    try {
      const newTicket = await ticketsService.create(data)
      set((state) => ({
        tickets: [newTicket, ...state.tickets],
        isLoading: false,
      }))
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al crear ticket'),
        isLoading: false,
      })
    }
  },

  updateTicket: async (id: string, data: UpdateTicketData) => {
    set({ isLoading: true, error: null })
    try {
      const updatedTicket = await ticketsService.update(id, data)
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === id ? updatedTicket : ticket
        ),
        selectedTicket:
          state.selectedTicket?.id === id
            ? updatedTicket
            : state.selectedTicket,
        isLoading: false,
      }))
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al actualizar ticket'),
        isLoading: false,
      })
    }
  },

  updateTicketStatus: async (id: string, status: TicketStatus) => {
    set({ isLoading: true, error: null })
    try {
      const updatedTicket = await ticketsService.updateStatus(id, status)
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === id ? updatedTicket : ticket
        ),
        selectedTicket:
          state.selectedTicket?.id === id
            ? updatedTicket
            : state.selectedTicket,
        isLoading: false,
      }))
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al actualizar estado del ticket'),
        isLoading: false,
      })
    }
  },

  deleteTicket: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await ticketsService.delete(id)
      set((state) => ({
        tickets: state.tickets.filter((ticket) => ticket.id !== id),
        selectedTicket:
          state.selectedTicket?.id === id ? null : state.selectedTicket,
        isLoading: false,
      }))
    } catch (_error) {
      set({
        error: getErrorMessage(error, 'Error al eliminar ticket'),
        isLoading: false,
      })
    }
  },

  selectTicket: (ticket: Ticket | null) => {
    set({ selectedTicket: ticket })
  },

  clearError: () => {
    set({ error: null })
  },
}))
