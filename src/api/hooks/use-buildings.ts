import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { Building, ApiResponse, PaginatedResponse } from '@/api/types'

// Query keys
export const buildingKeys = {
  all: ['buildings'] as const,
  lists: () => [...buildingKeys.all, 'list'] as const,
  list: (filters: string) => [...buildingKeys.lists(), { filters }] as const,
  details: () => [...buildingKeys.all, 'detail'] as const,
  detail: (id: string) => [...buildingKeys.details(), id] as const,
}

// API functions
const buildingsApi = {
  getAll: async (): Promise<PaginatedResponse<Building>> => {
    const { data } = await apiClient.get('/buildings')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<Building>> => {
    const { data } = await apiClient.get(`/buildings/${id}`)
    return data
  },

  create: async (
    building: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Building>> => {
    const { data } = await apiClient.post('/buildings', building)
    return data
  },

  update: async ({
    id,
    ...building
  }: Partial<Building> & { id: string }): Promise<ApiResponse<Building>> => {
    const { data } = await apiClient.put(`/buildings/${id}`, building)
    return data
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete(`/buildings/${id}`)
    return data
  },
}

// Hooks
export const useBuildings = () => {
  return useQuery({
    queryKey: buildingKeys.lists(),
    queryFn: buildingsApi.getAll,
  })
}

export const useBuilding = (id: string) => {
  return useQuery({
    queryKey: buildingKeys.detail(id),
    queryFn: () => buildingsApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: buildingsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: buildingKeys.lists() })
    },
  })
}

export const useUpdateBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: buildingsApi.update,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: buildingKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: buildingKeys.detail(variables.id),
      })
    },
  })
}

export const useDeleteBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: buildingsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: buildingKeys.lists() })
    },
  })
}
