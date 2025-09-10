import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { Ticket, ApiResponse, PaginatedResponse } from '@/api/types'

// Query keys
export const ticketKeys = {
  all: ['tickets'] as const,
  lists: () => [...ticketKeys.all, 'list'] as const,
  list: (filters: string) => [...ticketKeys.lists(), { filters }] as const,
  details: () => [...ticketKeys.all, 'detail'] as const,
  detail: (id: string) => [...ticketKeys.details(), id] as const,
}

// API functions
const ticketsApi = {
  getAll: async (params?: {
    status?: string
    priority?: string
    buildingId?: string
  }): Promise<PaginatedResponse<Ticket>> => {
    const { data } = await apiClient.get('/tickets', { params })
    return data
  },

  getById: async (id: string): Promise<ApiResponse<Ticket>> => {
    const { data } = await apiClient.get(`/tickets/${id}`)
    return data
  },

  create: async (
    ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Ticket>> => {
    const { data } = await apiClient.post('/tickets', ticket)
    return data
  },

  update: async ({
    id,
    ...ticket
  }: Partial<Ticket> & { id: string }): Promise<ApiResponse<Ticket>> => {
    const { data } = await apiClient.put(`/tickets/${id}`, ticket)
    return data
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete(`/tickets/${id}`)
    return data
  },
}

// Hooks
export const useTickets = (filters?: {
  status?: string
  priority?: string
  buildingId?: string
}) => {
  return useQuery({
    queryKey: ticketKeys.list(JSON.stringify(filters || {})),
    queryFn: () => ticketsApi.getAll(filters),
  })
}

export const useTicket = (id: string) => {
  return useQuery({
    queryKey: ticketKeys.detail(id),
    queryFn: () => ticketsApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ticketsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
    },
  })
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ticketsApi.update,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: ticketKeys.detail(variables.id),
      })
    },
  })
}

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ticketsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
    },
  })
}
