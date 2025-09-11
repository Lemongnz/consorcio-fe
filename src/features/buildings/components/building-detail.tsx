import {
  Building2,
  MapPin,
  Users,
  Layers,
  User,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building } from '../types/building'

interface BuildingDetailProps {
  building: Building
  onEdit: () => void
  onBack: () => void
}

export function BuildingDetail({
  building,
  onEdit,
  onBack,
}: BuildingDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack}>
            ← Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{building.name}</h1>
            <p className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {building.address}
            </p>
          </div>
        </div>
        <Button onClick={onEdit}>Editar Edificio</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Unidades</p>
                <p className="font-medium">{building.totalUnits || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Pisos</p>
                <p className="font-medium">{building.totalFloors || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Creado</p>
                <p className="font-medium">
                  {new Date(building.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Administrador */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Administrador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nombre</p>
              <p className="font-medium">No disponible</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">No disponible</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">No disponible</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Descripción */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Descripción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">
              {building.notes || 'Sin descripción disponible'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {building.totalUnits || 0}
              </p>
              <p className="text-sm text-muted-foreground">Total Unidades</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {building.totalFloors || 0}
              </p>
              <p className="text-sm text-muted-foreground">Pisos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {Math.round(
                  (building.totalUnits || 0) / (building.totalFloors || 1)
                )}
              </p>
              <p className="text-sm text-muted-foreground">Unidades por Piso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {Math.floor(
                  (Date.now() - new Date(building.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24 * 365)
                )}
              </p>
              <p className="text-sm text-muted-foreground">Años en Sistema</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
