import { Plus, FileText, Calendar, DollarSign, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockInvoices = [
  {
    id: '1',
    number: 'FAC-2024-001',
    vendor: 'Plomería Rodríguez',
    buildingName: 'Edificio San Martín',
    description: 'Reparación filtración baño 3A',
    amount: 15000,
    status: 'pending',
    dueDate: new Date('2024-02-15'),
    issueDate: new Date('2024-01-15'),
    category: 'Mantenimiento',
  },
  {
    id: '2',
    number: 'FAC-2024-002',
    vendor: 'Electricidad Moderna',
    buildingName: 'Torre Libertador',
    description: 'Instalación luces LED hall principal',
    amount: 8500,
    status: 'approved',
    dueDate: new Date('2024-02-20'),
    issueDate: new Date('2024-01-20'),
    category: 'Mejoras',
  },
  {
    id: '3',
    number: 'FAC-2024-003',
    vendor: 'Limpieza Total',
    buildingName: 'Complejo Norte',
    description: 'Servicio de limpieza mensual',
    amount: 12000,
    status: 'paid',
    dueDate: new Date('2024-01-30'),
    issueDate: new Date('2024-01-01'),
    paidDate: new Date('2024-01-28'),
    category: 'Servicios',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'approved':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'paid':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendiente'
    case 'approved':
      return 'Aprobada'
    case 'paid':
      return 'Pagada'
    case 'rejected':
      return 'Rechazada'
    default:
      return status
  }
}

export function InvoicesPage() {
  const pendingAmount = mockInvoices
    .filter((i) => i.status === 'pending' || i.status === 'approved')
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Facturas</h1>
          <p className="text-muted-foreground">Gestión de facturas y pagos</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Factura
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {mockInvoices.filter((i) => i.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {mockInvoices.filter((i) => i.status === 'approved').length}
              </p>
              <p className="text-sm text-muted-foreground">Aprobadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockInvoices.filter((i) => i.status === 'paid').length}
              </p>
              <p className="text-sm text-muted-foreground">Pagadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                ${pendingAmount.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Por Pagar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {mockInvoices.map((invoice) => (
          <Card key={invoice.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {invoice.number}
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(invoice.status)}`}
                >
                  {getStatusLabel(invoice.status)}
                </span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{invoice.vendor}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{invoice.buildingName}</span>
                </div>

                <p className="text-sm">{invoice.description}</p>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-semibold">
                    ${invoice.amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Emitida: {invoice.issueDate.toLocaleDateString('es-ES')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Vence: {invoice.dueDate.toLocaleDateString('es-ES')}
                  </span>
                </div>

                {invoice.paidDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Pagada: {invoice.paidDate.toLocaleDateString('es-ES')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Categoría:</span>
                  <span>{invoice.category}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  {invoice.status === 'pending' && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        Aprobar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Rechazar
                      </Button>
                    </>
                  )}
                  {invoice.status === 'approved' && (
                    <Button size="sm" className="flex-1">
                      Marcar como Pagada
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Ver PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockInvoices.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay facturas</h3>
          <p className="text-muted-foreground">
            Comienza agregando la primera factura
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Crear Factura
          </Button>
        </div>
      )}
    </div>
  )
}
