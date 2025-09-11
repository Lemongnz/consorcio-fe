import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, CreateBuildingData } from '../types/building'
import {
  legacyBuildingSchema,
  LegacyBuildingFormData,
  convertLegacyToApi,
} from '../schemas/building-schema'

interface BuildingFormProps {
  building?: Building
  onSubmit: (data: CreateBuildingData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function BuildingForm({
  building,
  onSubmit,
  onCancel,
  isLoading,
}: BuildingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LegacyBuildingFormData>({
    resolver: zodResolver(legacyBuildingSchema),
    defaultValues: building
      ? {
          name: building.name,
          address: building.address,
          description: building.notes || '',
          units: building.totalUnits || 0,
          floors: building.totalFloors || 0,
          administrator: '',
          phone: '',
          email: '',
        }
      : undefined,
  })

  const handleFormSubmit = (data: LegacyBuildingFormData) => {
    const apiData = convertLegacyToApi(data)
    onSubmit(apiData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{building ? 'Editar Edificio' : 'Nuevo Edificio'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <Input {...register('name')} placeholder="Nombre del edificio" />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Dirección</label>
              <Input
                {...register('address')}
                placeholder="Dirección completa"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Descripción</label>
              <textarea
                {...register('description')}
                placeholder="Descripción del edificio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Unidades</label>
              <Input
                {...register('units', { valueAsNumber: true })}
                type="number"
                placeholder="Número de unidades"
              />
              {errors.units && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.units.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Pisos</label>
              <Input
                {...register('floors', { valueAsNumber: true })}
                type="number"
                placeholder="Número de pisos"
              />
              {errors.floors && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.floors.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Administrador</label>
              <Input
                {...register('administrator')}
                placeholder="Nombre del administrador"
              />
              {errors.administrator && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.administrator.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <Input
                {...register('phone')}
                placeholder="Teléfono de contacto"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email de contacto"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : building ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
