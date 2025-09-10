import { Plus, Calendar, Users, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockMeetings = [
  {
    id: '1',
    title: 'Asamblea Ordinaria Mensual',
    description: 'Revisión de gastos mensuales y aprobación de mejoras',
    building: 'Edificio San Martín',
    date: new Date('2024-02-15T19:00:00'),
    duration: 120,
    location: 'Salón de Usos Múltiples',
    organizer: 'Administración',
    attendees: 28,
    maxAttendees: 32,
    status: 'scheduled',
    agenda: [
      'Lectura del acta anterior',
      'Informe de gastos del mes',
      'Propuesta de mejoras en hall principal',
      'Varios'
    ]
  },
  {
    id: '2',
    title: 'Reunión de Consorcistas',
    description: 'Discusión sobre obras de mantenimiento en fachada',
    building: 'Torre Libertador',
    date: new Date('2024-02-20T18:30:00'),
    duration: 90,
    location: 'Oficina de Administración',
    organizer: 'Consejo de Administración',
    attendees: 15,
    maxAttendees: 20,
    status: 'scheduled',
    agenda: [
      'Estado actual de la fachada',
      'Presupuestos recibidos',
      'Cronograma de obras',
      'Financiamiento'
    ]
  },
  {
    id: '3',
    title: 'Asamblea Extraordinaria',
    description: 'Aprobación de obras de emergencia en sistema eléctrico',
    building: 'Complejo Norte',
    date: new Date('2024-01-25T20:00:00'),
    duration: 60,
    location: 'Salón Comunitario',
    organizer: 'Administración',
    attendees: 22,
    maxAttendees: 24,
    status: 'completed',
    agenda: [
      'Situación de emergencia eléctrica',
      'Presupuesto de reparación',
      'Votación de aprobación'
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'Programada'
    case 'completed':
      return 'Completada'
    case 'cancelled':
      return 'Cancelada'
    default:
      return status
  }
}

export function MeetingsPage() {
  const scheduledMeetings = mockMeetings.filter(m => m.status === 'scheduled').length
  const completedMeetings = mockMeetings.filter(m => m.status === 'completed').length
  const totalAttendees = mockMeetings.reduce((sum, meeting) => sum + meeting.attendees, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reuniones</h1>
          <p className="text-muted-foreground">
            Gestión de asambleas y reuniones de consorcio
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Reunión
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{scheduledMeetings}</p>
              <p className="text-sm text-muted-foreground">Programadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completedMeetings}</p>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalAttendees}</p>
              <p className="text-sm text-muted-foreground">Total Asistentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{mockMeetings.length}</p>
              <p className="text-sm text-muted-foreground">Total Reuniones</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockMeetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {meeting.title}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(meeting.status)}`}>
                  {getStatusLabel(meeting.status)}
                </span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{meeting.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Edificio:</span>
                  <span>{meeting.building}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {meeting.date.toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} - {meeting.date.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{meeting.duration} minutos</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{meeting.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{meeting.attendees}/{meeting.maxAttendees} asistentes</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Organiza:</span>
                  <span>{meeting.organizer}</span>
                </div>

                {meeting.agenda && meeting.agenda.length > 0 && (
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium mb-2">Agenda:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {meeting.agenda.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {meeting.status === 'scheduled' && (
                    <>
                      <Button size="sm" className="flex-1">
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </>
                  )}
                  {meeting.status === 'completed' && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        Ver Acta
                      </Button>
                      <Button variant="outline" size="sm">
                        Asistencia
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockMeetings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay reuniones</h3>
          <p className="text-muted-foreground">
            Comienza programando la primera reunión
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Crear Reunión
          </Button>
        </div>
      )}
    </div>
  )
}
