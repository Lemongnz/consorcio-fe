import { z } from 'zod'

export const ticketSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  buildingId: z.string().min(1, 'El edificio es requerido'),
  type: z.enum(['MAINTENANCE', 'REPAIR', 'COMPLAINT', 'EMERGENCY', 'CLEANING']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  unitId: z.string().optional(),
  channel: z
    .enum(['WEB', 'MOBILE', 'PHONE', 'EMAIL', 'WHATSAPP'])
    .default('WEB'),
  currency: z.string().default('ARS'),
  estimatedCost: z.number().optional(),
  dueDate: z.string().optional(),
  attachments: z
    .array(
      z.object({
        filename: z.string(),
        url: z.string(),
        size: z.number(),
        mimeType: z.string(),
      })
    )
    .optional(),
})

export type TicketFormData = z.infer<typeof ticketSchema>

// Legacy compatibility schema for existing forms
export const legacyTicketSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  category: z.enum(['maintenance', 'complaint', 'request', 'emergency']),
  building: z.string().min(1, 'El edificio es requerido'),
  unit: z.string().optional(),
  reporter: z.string().min(1, 'El reportero es requerido'),
})

export type LegacyTicketFormData = z.infer<typeof legacyTicketSchema>

// Helper function to convert legacy form data to API format
export const convertLegacyToApi = (
  data: LegacyTicketFormData
): TicketFormData => {
  // Map legacy categories to API types
  const typeMap: Record<
    string,
    'MAINTENANCE' | 'REPAIR' | 'COMPLAINT' | 'EMERGENCY' | 'CLEANING'
  > = {
    maintenance: 'MAINTENANCE',
    complaint: 'COMPLAINT',
    request: 'REPAIR', // Map request to REPAIR
    emergency: 'EMERGENCY',
  }

  // Map legacy priorities to API priorities
  const priorityMap: Record<string, 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'> = {
    low: 'LOW',
    medium: 'MEDIUM',
    high: 'HIGH',
    urgent: 'URGENT',
  }

  return {
    title: data.title,
    description: data.description,
    buildingId: data.building, // Assuming building is actually buildingId
    type: typeMap[data.category] || 'MAINTENANCE',
    priority: priorityMap[data.priority] || 'MEDIUM',
    unitId: data.unit,
    channel: 'WEB' as const,
    currency: 'ARS',
  }
}
