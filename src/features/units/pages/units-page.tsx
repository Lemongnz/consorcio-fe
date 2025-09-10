import { useEffect } from 'react'
import { Plus, Home, Building2, User, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUnitsStore } from '../store/units-store'
import { UNIT_STATUS_LABELS, UNIT_TYPE_LABELS } from '../types/unit'

export function UnitsPage() {
  const {
    units,
    isLoading,
    error,
    fetchUnits,
    updateUnitStatus,
    deleteUnit,
    clearError
  } = useUnitsStore()

  useEffect(() => {
    fetchUnits()
  }, [fetchUnits])

  const handleStatusChange = async (unitId: string, newStatus: any) => {
    await updateUnitStatus(unitId, newStatus)
  }

  const handleDeleteUnit = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta unidad?')) {
      await deleteUnit(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'vacant':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'maintenance':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Unidades</h1>
          <p className="text-muted-foreground">
            Gestión de unidades y propietarios
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Unidad
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
          <Button
            variant="outline"
            size="sm"
            onClick={clearError}
            className="ml-2"
          >
            Cerrar
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {units.filter(u => u.status === 'occupied').length}
              </p>
              <p className="text-sm text-muted-foreground">Ocupadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {units.filter(u => u.status === 'vacant').length}
              </p>
              <p className="text-sm text-muted-foreground">Vacantes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {units.filter(u => u.status === 'maintenance').length}
              </p>
              <p className="text-sm text-muted-foreground">Mantenimiento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {units.length}
              </p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p>Cargando unidades...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <Card key={unit.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Unidad {unit.number}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(unit.status)}`}>
                    {UNIT_STATUS_LABELS[unit.status]}
                  </span>
                </CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {unit.buildingName} - Piso {unit.floor}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span>{UNIT_TYPE_LABELS[unit.type]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Área:</span>
                    <span>{unit.area} m²</span>
                  </div>
                  {unit.bedrooms && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dormitorios:</span>
                      <span>{unit.bedrooms}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Propietario</span>
                    </div>
                    <p className="text-sm">{unit.owner}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {unit.ownerEmail}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {unit.ownerPhone}
                      </div>
                    </div>
                  </div>

                  {unit.tenant && (
                    <div className="border-t pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Inquilino</span>
                      </div>
                      <p className="text-sm">{unit.tenant}</p>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Alquiler:</span>
                        <span className="font-medium">${unit.monthlyRent?.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-sm border-t pt-3">
                    <span className="text-muted-foreground">Expensas:</span>
                    <span className="font-medium">${unit.monthlyExpenses.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <select
                      value={unit.status}
                      onChange={(e) => handleStatusChange(unit.id, e.target.value)}
                      className="flex-1 text-xs px-2 py-1 border rounded"
                      disabled={isLoading}
                    >
                      {Object.entries(UNIT_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUnit(unit.id)}
                      disabled={isLoading}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {units.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Home className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay unidades</h3>
          <p className="text-muted-foreground">
            Comienza agregando la primera unidad
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Crear Unidad
          </Button>
        </div>
      )}
    </div>
  )
}
