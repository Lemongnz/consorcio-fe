import { apiClient } from '@/lib/api'
import type {
  Building,
  CreateBuildingDto,
  UpdateBuildingDto,
  ApiResponse,
} from '@/lib/types/api'

class BuildingsService {
  async getAll(): Promise<Building[]> {
    const response = await apiClient.get<ApiResponse<Building[]>>('/buildings')
    return response.data.data
  }

  async getById(id: string): Promise<Building> {
    const response = await apiClient.get<ApiResponse<Building>>(`/buildings/${id}`)
    return response.data.data
  }

  async create(data: CreateBuildingDto): Promise<Building> {
    const response = await apiClient.post<ApiResponse<Building>>('/buildings', data)
    return response.data.data
  }

  async update(id: string, data: UpdateBuildingDto): Promise<Building> {
    const response = await apiClient.put<ApiResponse<Building>>(`/buildings/${id}`, data)
    return response.data.data
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/buildings/${id}`)
  }
}

export const buildingsService = new BuildingsService()
