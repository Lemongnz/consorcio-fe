import { useEffect } from 'react'
import { Plus, Search, Calendar, Building2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useInspectionsStore } from '../store/inspections-store'
import { INSPECTION_STATUS_LABELS, INSPECTION_TYPE_LABELS } from '../types/inspection'

export function InspectionsPage() {
  const {
    inspections,
    isLoading,
    error,
    fetchInspections,
    updateInspectionStatus,
    deleteInspection,
    clearError
  } = useInspectionsStore()

  useEffect(() => {
    fetchInspections()
  }, [fetchInspections])

  const handleStatusChange = async (inspectionId: string, newStatus: any) => {
    await updateInspectionStatus(inspectionId, newStatus)
  }

  const handleDeleteInspection = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta inspección?')) {
      await deleteInspection(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inspecciones</h1>
          <p className="text-muted-foreground">
            Gestión de inspecciones y auditorías
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Inspección
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
              <p className="text-2xl font-bold text-blue-600">
                {inspections.filter(i => i.status === 'scheduled').length}
              </p>
              <p className="text-sm text-muted-foreground">Programadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {inspections.filter(i => i.status === 'in_progress').length}
              </p>
              <p className="text-sm text-muted-foreground">En Progreso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {inspections.filter(i => i.status === 'completed').length}
              </p>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {inspections.length}
              </p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p>Cargando inspecciones...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {inspections.map((inspection) => (
            <Card key={inspection.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    {inspection.title}
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(inspection.priority)}`}>
                      {inspection.priority.toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(inspection.status)}`}>
                      {INSPECTION_STATUS_LABELS[inspection.status]}
                    </span>
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {inspection.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{inspection.buildingName}</span>
                    {inspection.unitNumber && (
                      <span className="text-muted-foreground">- Unidad {inspection.unitNumber}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{inspection.inspectorName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {inspection.scheduledDate.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span>{INSPECTION_TYPE_LABELS[inspection.type]}</span>
                  </div>

                  {inspection.completedDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completada:</span>
                      <span>
                        {inspection.completedDate.toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  )}

                  {inspection.findings && (
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-1">Hallazgos:</p>
                      <p className="text-sm text-muted-foreground">{inspection.findings}</p>
                    </div>
                  )}

                  {inspection.recommendations && (
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-1">Recomendaciones:</p>
                      <p className="text-sm text-muted-foreground">{inspection.recommendations}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <select
                      value={inspection.status}
                      onChange={(e) => handleStatusChange(inspection.id, e.target.value)}
                      className="flex-1 text-xs px-2 py-1 border rounded"
                      disabled={isLoading}
                    >
                      {Object.entries(INSPECTION_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteInspection(inspection.id)}
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

      {inspections.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay inspecciones</h3>
          <p className="text-muted-foreground">
            Comienza programando la primera inspección
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Crear Inspección
          </Button>
        </div>
      )}
    </div>
  )
}
