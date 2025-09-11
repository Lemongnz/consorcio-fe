import { z } from 'zod'

export const buildingSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  city: z.string().min(1, 'La ciudad es requerida').default('Buenos Aires'),
  country: z.string().default('Argentina'),
  notes: z.string().optional(),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  totalFloors: z.number().min(1, 'Debe tener al menos 1 piso').optional(),
  totalUnits: z.number().min(1, 'Debe tener al menos 1 unidad').optional(),
})

export type BuildingFormData = z.infer<typeof buildingSchema>

// Legacy compatibility schema for existing forms
export const legacyBuildingSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  description: z.string().optional(),
  units: z.number().min(1, 'Debe tener al menos 1 unidad').optional(),
  floors: z.number().min(1, 'Debe tener al menos 1 piso').optional(),
  administrator: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
})

export type LegacyBuildingFormData = z.infer<typeof legacyBuildingSchema>

// Helper function to convert legacy form data to API format
export const convertLegacyToApi = (data: LegacyBuildingFormData): BuildingFormData => ({
  name: data.name,
  address: data.address,
  city: 'Buenos Aires',
  country: 'Argentina',
  notes: data.description,
  totalFloors: data.floors,
  totalUnits: data.units,
})
