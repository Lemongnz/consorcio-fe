import { create } from 'zustand'
import {
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
  updateTicket: (data: UpdateTicketData) => Promise<void>
  updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>
  deleteTicket: (id: string) => Promise<void>
  selectTicket: (ticket: Ticket | null) => void
  clearError: () => void
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Filtración en el techo del 5to piso',
    description:
      'Se observa una filtración de agua en el pasillo del 5to piso, cerca del ascensor. El agua está goteando y puede ser peligroso.',
    status: 'open',
    priority: 'high',
    category: 'maintenance',
    building: 'Edificio San Martín',
    unit: '5A',
    reporter: 'María García',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    title: 'Ruidos molestos en la unidad 3B',
    description:
      'Los vecinos de la unidad 3B están haciendo ruidos excesivos durante las noches, afectando el descanso de otros residentes.',
    status: 'in_progress',
    priority: 'medium',
    category: 'complaint',
    building: 'Torre Libertador',
    unit: '3B',
    reporter: 'Carlos López',
    assignee: 'Administración',
    createdAt: new Date('2024-01-14T16:45:00'),
    updatedAt: new Date('2024-01-15T09:15:00'),
  },
  {
    id: '3',
    title: 'Solicitud de reparación del portón',
    description:
      'El portón principal no está cerrando correctamente. Se necesita revisión del mecanismo automático.',
    status: 'resolved',
    priority: 'medium',
    category: 'request',
    building: 'Edificio San Martín',
    reporter: 'Portería',
    assignee: 'Técnico Especializado',
    createdAt: new Date('2024-01-12T08:20:00'),
    updatedAt: new Date('2024-01-14T14:30:00'),
    resolvedAt: new Date('2024-01-14T14:30:00'),
  },
]

export const useTicketsStore = create<TicketsState>((set) => ({
  tickets: [],
  selectedTicket: null,
  isLoading: false,
  error: null,

  fetchTickets: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      set({ tickets: mockTickets, isLoading: false })
    } catch (error) {
      set({ error: 'Error al cargar tickets', isLoading: false })
    }
  },

  createTicket: async (data: CreateTicketData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newTicket: Ticket = {
        ...data,
        id: Date.now().toString(),
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      set((state) => ({
        tickets: [newTicket, ...state.tickets],
        isLoading: false,
      }))
    } catch (error) {
      set({ error: 'Error al crear ticket', isLoading: false })
    }
  },

  updateTicket: async (data: UpdateTicketData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === data.id
            ? { ...ticket, ...data, updatedAt: new Date() }
            : ticket
        ),
        selectedTicket:
          state.selectedTicket?.id === data.id
            ? { ...state.selectedTicket, ...data, updatedAt: new Date() }
            : state.selectedTicket,
        isLoading: false,
      }))
    } catch (error) {
      set({ error: 'Error al actualizar ticket', isLoading: false })
    }
  },

  updateTicketStatus: async (id: string, status: TicketStatus) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const now = new Date()
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === id
            ? {
                ...ticket,
                status,
                updatedAt: now,
                resolvedAt: status === 'resolved' ? now : ticket.resolvedAt,
              }
            : ticket
        ),
        selectedTicket:
          state.selectedTicket?.id === id
            ? {
                ...state.selectedTicket,
                status,
                updatedAt: now,
                resolvedAt:
                  status === 'resolved' ? now : state.selectedTicket.resolvedAt,
              }
            : state.selectedTicket,
        isLoading: false,
      }))
    } catch (error) {
      set({ error: 'Error al actualizar estado del ticket', isLoading: false })
    }
  },

  deleteTicket: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        tickets: state.tickets.filter((ticket) => ticket.id !== id),
        selectedTicket:
          state.selectedTicket?.id === id ? null : state.selectedTicket,
        isLoading: false,
      }))
    } catch (error) {
      set({ error: 'Error al eliminar ticket', isLoading: false })
    }
  },

  selectTicket: (ticket: Ticket | null) => {
    set({ selectedTicket: ticket })
  },

  clearError: () => {
    set({ error: null })
  },
}))
