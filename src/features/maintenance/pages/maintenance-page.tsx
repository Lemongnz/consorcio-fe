import { Plus, Settings, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockMaintenanceTasks = [
  {
    id: '1',
    title: 'Revisión mensual de ascensores',
    description: 'Inspección y mantenimiento preventivo de todos los ascensores',
    building: 'Torre Libertador',
    frequency: 'Mensual',
    lastCompleted: new Date('2024-01-15'),
    nextDue: new Date('2024-02-15'),
    status: 'scheduled',
    priority: 'high',
    assignedTo: 'Ascensores SA'
  },
  {
    id: '2',
    title: 'Limpieza de tanques de agua',
    description: 'Limpieza y desinfección de tanques de agua potable',
    building: 'Edificio San Martín',
    frequency: 'Semestral',
    lastCompleted: new Date('2023-08-15'),
    nextDue: new Date('2024-02-15'),
    status: 'overdue',
    priority: 'urgent',
    assignedTo: 'Servicios Sanitarios'
  },
  {
    id: '3',
    title: 'Mantenimiento de bombas de agua',
    description: 'Revisión y mantenimiento de bombas de presión',
    building: 'Complejo Norte',
    frequency: 'Trimestral',
    lastCompleted: new Date('2024-01-10'),
    nextDue: new Date('2024-04-10'),
    status: 'completed',
    priority: 'medium',
    assignedTo: 'Plomería Rodríguez'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'Programado'
    case 'overdue':
      return 'Vencido'
    case 'completed':
      return 'Completado'
    case 'in_progress':
      return 'En Progreso'
    default:
      return status
  }
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case 'medium':
      return <Settings className="h-4 w-4 text-yellow-600" />
    case 'low':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    default:
      return <Settings className="h-4 w-4 text-gray-600" />
  }
}

export function MaintenancePage() {
  const overdueTasks = mockMaintenanceTasks.filter(task => task.status === 'overdue').length
  const scheduledTasks = mockMaintenanceTasks.filter(task => task.status === 'scheduled').length
  const completedTasks = mockMaintenanceTasks.filter(task => task.status === 'completed').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mantenimiento</h1>
          <p className="text-muted-foreground">
            Gestión de mantenimiento preventivo y correctivo
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
              <p className="text-sm text-muted-foreground">Vencidas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{scheduledTasks}</p>
              <p className="text-sm text-muted-foreground">Programadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{mockMaintenanceTasks.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockMaintenanceTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getPriorityIcon(task.priority)}
                  {task.title}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                  {getStatusLabel(task.status)}
                </span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Edificio:</span>
                  <span>{task.building}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frecuencia:</span>
                  <span>{task.frequency}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Asignado a:</span>
                  <span>{task.assignedTo}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Último: {task.lastCompleted.toLocaleDateString('es-ES')}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className={task.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                    Próximo: {task.nextDue.toLocaleDateString('es-ES')}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  {task.status === 'scheduled' && (
                    <Button size="sm" className="flex-1">
                      Marcar como Completado
                    </Button>
                  )}
                  {task.status === 'overdue' && (
                    <Button size="sm" variant="destructive" className="flex-1">
                      Completar Urgente
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Historial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockMaintenanceTasks.length === 0 && (
        <div className="text-center py-12">
          <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay tareas de mantenimiento</h3>
          <p className="text-muted-foreground">
            Comienza creando la primera tarea de mantenimiento
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Crear Tarea
          </Button>
        </div>
      )}
    </div>
  )
}
