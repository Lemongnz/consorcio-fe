import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Ticket, Wrench, FileText, Settings } from 'lucide-react'

const stats = [
  {
    title: 'Tickets Abiertos',
    value: '12',
    icon: Ticket,
    color: 'text-red-600',
  },
  {
    title: 'Órdenes en Progreso',
    value: '8',
    icon: Wrench,
    color: 'text-blue-600',
  },
  {
    title: 'Facturas Pendientes',
    value: '5',
    icon: FileText,
    color: 'text-yellow-600',
  },
  {
    title: 'Tareas Preventivas',
    value: '3',
    icon: Settings,
    color: 'text-green-600',
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Vista general del sistema de consorcios
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tickets Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Problema con ascensor - Edificio A</span>
                <span className="text-xs text-muted-foreground">Hace 2h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Filtración en terraza - Edificio B</span>
                <span className="text-xs text-muted-foreground">Hace 4h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Portero eléctrico sin funcionar</span>
                <span className="text-xs text-muted-foreground">Hace 1d</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Inspecciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Inspección de ascensores</span>
                <span className="text-xs text-muted-foreground">Mañana</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Revisión de bombas</span>
                <span className="text-xs text-muted-foreground">En 3 días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mantenimiento de portones</span>
                <span className="text-xs text-muted-foreground">En 1 semana</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
