import { apiClient } from '@/lib/api'
import type {
  Ticket,
  CreateTicketDto,
  UpdateTicketDto,
  TicketStatus,
  ApiResponse,
} from '@/lib/types/api'

class TicketsService {
  async getAll(): Promise<Ticket[]> {
    const response = await apiClient.get<ApiResponse<Ticket[]>>('/tickets')
    return response.data.data
  }

  async getById(id: string): Promise<Ticket> {
    const response = await apiClient.get<ApiResponse<Ticket>>(`/tickets/${id}`)
    return response.data.data
  }

  async create(data: CreateTicketDto): Promise<Ticket> {
    const response = await apiClient.post<ApiResponse<Ticket>>('/tickets', data)
    return response.data.data
  }

  async update(id: string, data: UpdateTicketDto): Promise<Ticket> {
    const response = await apiClient.put<ApiResponse<Ticket>>(`/tickets/${id}`, data)
    return response.data.data
  }

  async updateStatus(id: string, status: TicketStatus): Promise<Ticket> {
    const response = await apiClient.patch<ApiResponse<Ticket>>(`/tickets/${id}/status`, { status })
    return response.data.data
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/tickets/${id}`)
  }

  async getByBuilding(buildingId: string): Promise<Ticket[]> {
    const response = await apiClient.get<ApiResponse<Ticket[]>>(`/tickets?buildingId=${buildingId}`)
    return response.data.data
  }

  async assignInspector(id: string, inspectorId: string): Promise<Ticket> {
    const response = await apiClient.patch<ApiResponse<Ticket>>(`/tickets/${id}/assign`, { inspectorId })
    return response.data.data
  }

  async getStatistics(): Promise<Record<string, unknown>> {
    const response = await apiClient.get<ApiResponse<Record<string, unknown>>>(
      '/tickets/statistics'
    )
    return response.data.data
  }
}

export const ticketsService = new TicketsService()
