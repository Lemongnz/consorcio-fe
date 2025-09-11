import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateTicketData, TICKET_PRIORITY_LABELS } from '../types/ticket'
import {
  legacyTicketSchema,
  LegacyTicketFormData,
  convertLegacyToApi,
} from '../schemas/ticket-schema'

interface TicketFormProps {
  onSubmit: (data: CreateTicketData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function TicketForm({ onSubmit, onCancel, isLoading }: TicketFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LegacyTicketFormData>({
    resolver: zodResolver(legacyTicketSchema),
    defaultValues: {
      priority: 'medium',
      category: 'request',
    },
  })

  const handleFormSubmit = (data: LegacyTicketFormData) => {
    const apiData = convertLegacyToApi(data)
    onSubmit(apiData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuevo Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Título</label>
              <Input {...register('title')} placeholder="Título del ticket" />
              {errors.title && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Descripción</label>
              <textarea
                {...register('description')}
                placeholder="Describe el problema o solicitud en detalle"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Prioridad</label>
              <select
                {...register('priority')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {Object.entries(TICKET_PRIORITY_LABELS).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Categoría</label>
              <select
                {...register('category')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="maintenance">Mantenimiento</option>
                <option value="complaint">Reclamo</option>
                <option value="request">Solicitud</option>
                <option value="emergency">Emergencia</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Edificio</label>
              <Input
                {...register('building')}
                placeholder="Nombre del edificio"
              />
              {errors.building && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.building.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Unidad (Opcional)</label>
              <Input {...register('unit')} placeholder="Ej: 3A, PB2, etc." />
              {errors.unit && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.unit.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Reportado por</label>
              <Input
                {...register('reporter')}
                placeholder="Nombre de quien reporta"
              />
              {errors.reporter && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.reporter.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Crear Ticket'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
