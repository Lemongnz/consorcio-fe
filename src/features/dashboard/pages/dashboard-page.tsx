import { useEffect } from 'react'
import {
  Building2,
  Ticket,
  FileText,
  Wrench,
  Calendar,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardStore } from '../store/dashboard-store'
import { StatsCard } from '../components/stats-card'
import { RecentActivityComponent } from '../components/recent-activity'

export function DashboardPage() {
  const {
    stats,
    recentActivity,
    buildingSummaries,
    isLoading,
    error,
    fetchDashboardData,
    clearError,
  } = useDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Vista general del sistema de consorcios
          </p>
        </div>
        <div className="py-12 text-center">
          <p>Cargando datos del dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Vista general del sistema de consorcios
          </p>
        </div>
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
          {error}
          <button
            onClick={clearError}
            className="ml-2 underline hover:no-underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Vista general del sistema de consorcios
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Edificios"
            value={stats.totalBuildings}
            subtitle={`${stats.totalUnits} unidades`}
            icon={Building2}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Tickets Abiertos"
            value={stats.openTickets}
            subtitle={`${stats.totalTickets} total`}
            icon={Ticket}
            trend={{ value: 2.1, isPositive: false }}
          />
          <StatsCard
            title="Facturas Pendientes"
            value={stats.pendingInvoices}
            subtitle={`${stats.totalInvoices} total`}
            icon={FileText}
            trend={{ value: 5.4, isPositive: true }}
          />
          <StatsCard
            title="Órdenes Activas"
            value={stats.activeWorkOrders}
            subtitle={`${stats.totalWorkOrders} total`}
            icon={Wrench}
            trend={{ value: 12.3, isPositive: true }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivityComponent activities={recentActivity} />
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Tickets Summary */}
          {stats && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Estado de Tickets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Abiertos
                  </span>
                  <span className="font-medium text-blue-600">
                    {stats.openTickets}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    En Progreso
                  </span>
                  <span className="font-medium text-yellow-600">
                    {stats.inProgressTickets}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Resueltos
                  </span>
                  <span className="font-medium text-green-600">
                    {stats.resolvedTickets}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Meetings */}
          {stats && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximas Reuniones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stats.upcomingMeetings}
                  </p>
                  <p className="text-sm text-muted-foreground">Esta semana</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Building Summaries */}
      {buildingSummaries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Resumen por Edificio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {buildingSummaries.map((building) => (
                <div key={building.id} className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold">{building.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ocupación</span>
                      <span>
                        {building.occupiedUnits}/{building.totalUnits}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tickets</span>
                      <span
                        className={
                          building.openTickets > 5
                            ? 'text-red-600'
                            : 'text-green-600'
                        }
                      >
                        {building.openTickets}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ingresos</span>
                      <span className="font-medium">
                        ${building.monthlyRevenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
