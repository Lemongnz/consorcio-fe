import { useEffect } from 'react'
import { Plus, Wrench, Calendar, Building2, User, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWorkOrdersStore } from '../store/workorders-store'
import { WORKORDER_STATUS_LABELS, WORKORDER_PRIORITY_LABELS, WORKORDER_CATEGORY_LABELS } from '../types/workorder'

export function WorkOrdersPage() {
  const {
    workOrders,
    isLoading,
    error,
    fetchWorkOrders,
    updateWorkOrderStatus,
    deleteWorkOrder,
    clearError
  } = useWorkOrdersStore()

  useEffect(() => {
    fetchWorkOrders()
  }, [fetchWorkOrders])

  const handleStatusChange = async (workOrderId: string, newStatus: any) => {
    await updateWorkOrderStatus(workOrderId, newStatus)
  }

  const handleDeleteWorkOrder = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta orden de trabajo?')) {
      await deleteWorkOrder(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'assigned':
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
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
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
          <h1 className="text-3xl font-bold">Órdenes de Trabajo</h1>
          <p className="text-muted-foreground">
            Gestión de mantenimiento y reparaciones
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Orden
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">
                {workOrders.filter(w => w.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {workOrders.filter(w => w.status === 'assigned').length}
              </p>
              <p className="text-sm text-muted-foreground">Asignadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {workOrders.filter(w => w.status === 'in_progress').length}
              </p>
              <p className="text-sm text-muted-foreground">En Progreso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {workOrders.filter(w => w.status === 'completed').length}
              </p>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {workOrders.length}
              </p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p>Cargando órdenes de trabajo...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workOrders.map((workOrder) => (
            <Card key={workOrder.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    {workOrder.title}
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                      {WORKORDER_PRIORITY_LABELS[workOrder.priority]}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(workOrder.status)}`}>
                      {WORKORDER_STATUS_LABELS[workOrder.status]}
                    </span>
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {workOrder.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{workOrder.buildingName}</span>
                    {workOrder.unitNumber && (
                      <span className="text-muted-foreground">- Unidad {workOrder.unitNumber}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Categoría:</span>
                    <span>{WORKORDER_CATEGORY_LABELS[workOrder.category]}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Solicitado por: {workOrder.requestedBy}</span>
                  </div>

                  {workOrder.assignedTo && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Asignado a: {workOrder.assignedTo}</span>
                    </div>
                  )}

                  {workOrder.scheduledDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Programada: {workOrder.scheduledDate.toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}

                  {workOrder.completedDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Completada: {workOrder.completedDate.toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    {workOrder.estimatedCost && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Estimado: ${workOrder.estimatedCost.toLocaleString()}</span>
                      </div>
                    )}
                    {workOrder.actualCost && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Real: ${workOrder.actualCost.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {workOrder.notes && (
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-1">Notas:</p>
                      <p className="text-sm text-muted-foreground">{workOrder.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <select
                      value={workOrder.status}
                      onChange={(e) => handleStatusChange(workOrder.id, e.target.value)}
                      className="flex-1 text-xs px-2 py-1 border rounded"
                      disabled={isLoading}
                    >
                      {Object.entries(WORKORDER_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteWorkOrder(workOrder.id)}
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

      {workOrders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay órdenes de trabajo</h3>
          <p className="text-muted-foreground">
            Comienza creando la primera orden de trabajo
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Crear Orden
          </Button>
        </div>
      )}
    </div>
  )
}
