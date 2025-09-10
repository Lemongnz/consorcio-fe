import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, AlertCircle, Clock, CheckCircle } from 'lucide-react'

const tickets = [
  {
    id: '1',
    title: 'Problema con ascensor',
    building: 'Edificio Central',
    unit: 'Piso 5A',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Filtración en terraza',
    building: 'Torre Norte',
    unit: 'Terraza',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Portero eléctrico',
    building: 'Complejo Sur',
    unit: 'Entrada',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-01-13',
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open':
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case 'in_progress':
      return <Clock className="h-4 w-4 text-yellow-500" />
    case 'resolved':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    default:
      return null
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'open':
      return 'Abierto'
    case 'in_progress':
      return 'En Progreso'
    case 'resolved':
      return 'Resuelto'
    default:
      return status
  }
}

export function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tickets</h1>
          <p className="text-muted-foreground">
            Gestión de reclamos y solicitudes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Ticket
        </Button>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{ticket.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(ticket.status)}
                  <span className="text-sm">{getStatusText(ticket.status)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{ticket.building} - {ticket.unit}</span>
                <span>Creado: {ticket.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
