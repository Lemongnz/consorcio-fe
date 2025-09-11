import { useEffect, useState } from 'react'
import { Plus, Ticket, Building2, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTicketsStore } from '../store/tickets-store'
import { TicketForm } from '../components/ticket-form'
import {
  TicketStatusBadge,
  TicketPriorityBadge,
} from '../components/ticket-status-badge'
import { CreateTicketData, TicketStatus } from '../types/ticket'

type ViewMode = 'list' | 'create'

export function TicketsPage() {
  const {
    tickets,
    isLoading,
    error,
    fetchTickets,
    createTicket,
    updateTicketStatus,
    deleteTicket,
    clearError,
  } = useTicketsStore()

  const [viewMode, setViewMode] = useState<ViewMode>('list')

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const handleCreateTicket = async (data: CreateTicketData) => {
    await createTicket(data)
    if (!error) {
      setViewMode('list')
    }
  }

  const handleStatusChange = async (
    ticketId: string,
    newStatus: TicketStatus
  ) => {
    await updateTicketStatus(ticketId, newStatus)
  }

  const handleDeleteTicket = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este ticket?')) {
      await deleteTicket(id)
    }
  }

  const handleBackToList = () => {
    setViewMode('list')
    clearError()
  }

  if (viewMode === 'create') {
    return (
      <div>
        <TicketForm
          onSubmit={handleCreateTicket}
          onCancel={handleBackToList}
          isLoading={isLoading}
        />
        {error && (
          <div className="mt-4 rounded-md bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tickets</h1>
          <p className="text-muted-foreground">
            Gestión de reclamos, solicitudes y mantenimiento
          </p>
        </div>
        <Button onClick={() => setViewMode('create')}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Ticket
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {tickets.filter((t) => t.status === 'OPEN').length}
              </p>
              <p className="text-sm text-muted-foreground">Abiertos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {tickets.filter((t) => t.status === 'IN_PROGRESS').length}
              </p>
              <p className="text-sm text-muted-foreground">En Progreso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {tickets.filter((t) => t.status === 'COMPLETED').length}
              </p>
              <p className="text-sm text-muted-foreground">Resueltos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {tickets.length}
              </p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <p>Cargando tickets...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{ticket.title}</h3>
                      <TicketStatusBadge status={ticket.status} />
                      <TicketPriorityBadge priority={ticket.priority} />
                    </div>

                    <p className="mb-3 line-clamp-2 text-muted-foreground">
                      {ticket.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        Edificio {ticket.buildingId}
                        {ticket.unitId && ` - ${ticket.unitId}`}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Usuario
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Change Buttons */}
                    <div className="flex gap-1">
                      {ticket.status !== 'IN_PROGRESS' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(ticket.id, 'IN_PROGRESS')
                          }
                          disabled={isLoading}
                        >
                          En Progreso
                        </Button>
                      )}
                      {ticket.status !== 'COMPLETED' &&
                        ticket.status !== 'CLOSED' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(ticket.id, 'COMPLETED')
                            }
                            disabled={isLoading}
                          >
                            Resolver
                          </Button>
                        )}
                      {ticket.status === 'COMPLETED' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(ticket.id, 'CLOSED')
                          }
                          disabled={isLoading}
                        >
                          Cerrar
                        </Button>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTicket(ticket.id)}
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

      {tickets.length === 0 && !isLoading && (
        <div className="py-12 text-center">
          <Ticket className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay tickets</h3>
          <p className="text-muted-foreground">
            Comienza creando tu primer ticket
          </p>
          <Button className="mt-4" onClick={() => setViewMode('create')}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Ticket
          </Button>
        </div>
      )}
    </div>
  )
}
